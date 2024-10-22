package gov.ggdo.frnchs.ui.main.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.ui.main.dao.MainDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Service("mainService")
public class MainService {

	@Log Logger logger;

	@Autowired private MainDao mainDao;
	
	@Value("${geo.address}")
	private String geoAddress;
	
//	@Value("${news.ggNews}")
	private String ggNews;
	
//	@Value("${news.ggBbs}")
	private String ggBbs;

	public List<EgovMap> selectCodeList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectCodeList method run start!!");
		return mainDao.selectCodeList(paramMap);
	}
	public List<EgovMap> selectChartIntrst(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectChartIntrst method run start!!");
		return mainDao.selectChartIntrst(paramMap);
	}
	public List<EgovMap> selectChartFairUsage(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectChartFairUsage method run start!!");
		return mainDao.selectChartFairUsage(paramMap);
	}

	/**
	 * 경기도소식 조회
	 * @param request
	 * @param model
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException 
	 */
	public List<EgovMap> getGgNews(String page) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		List<EgovMap> returnList = new ArrayList<EgovMap>();
		try {
			setSSL();
//			Document doc = Jsoup.connect("https://27.101.100.185:443/news/gongbo_main.do?s_code=S017&b_code=BO01&type_m=sub").get();
			
			String url = ggNews;
			setSSL();
			Document doc = Jsoup.connect(url)
					.data("s_code","S017")
					.data("b_code","BO01")
					.data("type_m","sub")
					.data("lastmsg",page)
			        .header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
			        .ignoreContentType(true) // json 받아오려면 타입무시를 해야하는듯?
			        .post();

//			Elements newsHeadlines = doc.select("#updates a");
			Elements newsHeadlines = doc.select(".article a");
			int resultCnt = 0;
			for (Element headline : newsHeadlines) {
//				if(resultCnt == 4) {break;}
				EgovMap tmpMap = new EgovMap();
				tmpMap.put("href", ggNews + headline.attr("href"));
				tmpMap.put("subject", headline.select(".subject").text());
				tmpMap.put("date", headline.select(".date").text());
				returnList.add(tmpMap);
				resultCnt++;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("경기도소식 조회 중 에러");
		}

		return returnList;
	}

	/**
	 * 경기도 공정국 뉴스 조회
	 * @param request
	 * @param model
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException 
	 */
	public List<EgovMap> getGgBbs(String page) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		List<EgovMap> returnList = new ArrayList<EgovMap>();
		try {
//			String url = "https://27.101.137.129:443/ajax/board/getList.do";
			String url = ggBbs;
			setSSL();
			Document doc = Jsoup.connect(url)
					.data("bsIdx","464")
					.data("bcIdx","521")
					.data("menuId","1534")
					.data("isManager","false")
					.data("isCharge","false")
					.data("offset",page)
					.data("limit","8")
			        .header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
			        .ignoreContentType(true) // json 받아오려면 타입무시를 해야하는듯?
			        .post();

			JSONObject jObj = JSONObject.fromObject(JSONSerializer.toJSON(doc.select("body").first().text()));
			JSONArray items = jObj.getJSONArray("items");

			int resultCnt = 0;
			for (Object o : items) {
//				if(resultCnt == 4) {break;}
				EgovMap tmpMap = new EgovMap();
		        JSONObject jsonLineItem = (JSONObject) o;
		        String bsIdx = jsonLineItem.getString("BS_IDX");
		        String bcIdx = jsonLineItem.getString("BC_IDX");
		        String bIdx = jsonLineItem.getString("B_IDX");
		        tmpMap.put("subject", jsonLineItem.getString("SUBJECT"));
		        tmpMap.put("href", ggBbs + "?bIdx="+bIdx+"&bsIdx="+bsIdx+"&bcIdx="+bcIdx+"&menuId=1534&isManager=false&isCharge=false&page=1");

		        returnList.add(tmpMap);
		        resultCnt++;
		    }
		} catch (Exception e) {
			logger.debug("경기도 공정국 뉴스 조회 중 에러");
		}

		return returnList;
	}
	
	public Object getGeoJson(Map<String, Object> paramMap) {
		String rtnObject = null;
		BufferedReader br = null;
		try {
			String geoUrl ="";
			if("populBlkUrl".equals(paramMap.get("type"))) {
				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_dynmc_popltn_blck&maxFeatures=50&outputFormat=application%2Fjson";
			} else if("cardBlkUrl".equals(paramMap.get("type"))) {
				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_card_selng_blck&maxFeatures=50&outputFormat=application%2Fjson";
			} else if("ovpopBlkUrl".equals(paramMap.get("type"))) {
				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_stor_ovpop_blck&maxFeatures=50&outputFormat=application%2Fjson";
			} else if("populUrl".equals(paramMap.get("type"))) {
//				logger.debug(">>> 이전");
//				geoUrl = geoAddress+"/geoserver/ggfran/wms?service=WMS&version=1.1.0&request=GetMap&layers=ggfran%3Afrc_dynmc_popltn_signgu&bbox=126.514564526998%2C36.8935327413069%2C127.849469636744%2C38.2832470918473&width=737&height=768&srs=EPSG%3A4326&format=geojson";
//				logger.debug(">>> 이후");
//				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_dynmc_popltn_signgu&maxFeatures=50&outputFormat=application%2Fjson";
//				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3A3Afrc_dynmc_popltn_ctprvn&maxFeatures=50&outputFormat=application%2Fjson";
//				geoUrl = geoAddress+"/geoserver/ggfran/wms?service=WMS&version=1.1.0&request=GetMap&layers=ggfran%3Afrc_dynmc_popltn_ctprvn&bbox=124.60886557%2C33.19393773%2C130.92123154%2C38.615708283&width=1237&height=1268&srs=EPSG%3A4326&format=geojson"; //유동인구
				geoUrl = geoAddress+"/geoserver/ggfran/wms?service=WMS&version=1.1.0&request=GetMap&layers=ggfran%3Avw_tb_kostat_worker_co&bbox=124.60886557%2C33.19393773%2C130.92123154%2C38.615708283&width=1237&height=1268&srs=EPSG%3A4326&format=geojson"; //통계청 종사자수
			} else if("cardUrl".equals(paramMap.get("type"))) {
//				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_card_selng_signgu&maxFeatures=50&outputFormat=application%2Fjson";
//				geoUrl = geoAddress+"/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_card_selng_ctprvn&maxFeatures=50&outputFormat=application%2Fjson"; //카드매출
				geoUrl = geoAddress+"/geoserver/ggfran/wms?service=WMS&version=1.1.0&request=GetMap&layers=ggfran%3Avw_tb_kostat_selng_revn&bbox=124.60886557%2C33.19393773%2C130.92123154%2C38.615708283&width=1237&height=1268&srs=EPSG%3A4326&format=geojson"; //프랜차이즈매출
			}
			
			if(!StringUtils.isEmpty(geoUrl)) {
//				logger.debug("======================= params:"+paramMap.get("VIEWPARAMS"));
				if(geoAddress.contains("https")) {
					logger.debug(">>>> ssl");
					setSSL();
				}
//				logger.debug(">>>>>! "+geoUrl+"&VIEWPARAMS="+paramMap.get("VIEWPARAMS"));
				URL url = new URL(geoUrl+"&VIEWPARAMS="+paramMap.get("VIEWPARAMS"));
				HttpURLConnection con = (HttpURLConnection)url.openConnection();
				con.setRequestMethod("GET");
				con.setRequestProperty("Context-Type", "application/json");
				con.setRequestProperty("Accept-Charset", "UTF-8");
				int responseCode = con.getResponseCode();
				if(responseCode==200) { // 정상 호출
					br = new BufferedReader(new InputStreamReader(con.getInputStream()));
				} else { // 에러 발생
					br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
				}
				String inputLine;
				StringBuffer response = new StringBuffer();
				while ((inputLine = br.readLine()) != null) {
					response.append(inputLine);
				}
				br.close();
				rtnObject = response.toString();
//				logger.debug(">>> rtnObject:"+rtnObject);
//				JSONParser jsonParse = new JSONParser();
//			    jobj =  (JSONObject)jsonParse.parse(rtnObject);
//			    jobj = JSONObject.fromObject(JSONSerializer.toJSON(rtnObject));
			}
		} catch (UnsupportedEncodingException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UnsupportedEncodingException Occured");
			e.printStackTrace();
		} catch (MalformedURLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method MalformedURLException Occured");
			e.printStackTrace();
		} catch (IOException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method IOException Occured");
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NoSuchAlgorithmException Occured");
			e.printStackTrace();
		} catch (KeyManagementException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method KeyManagementException Occured");
			e.printStackTrace();
		} finally {
			if(br != null) {
				try {
					br.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		return rtnObject;
	}
	
	/**
	 * 내부 SSL 무효 - 21.04.01
	 * @throws NoSuchAlgorithmException 
	 * @throws KeyManagementException 
	 * @throws Exception
	 */
	public void setSSL() throws NoSuchAlgorithmException, KeyManagementException {
		TrustManager[] trustAllCerts = new TrustManager[] { 
			new X509TrustManager() {
				
				@Override
				public X509Certificate[] getAcceptedIssuers() {
					// TODO Auto-generated method stub
					return null;
				}
				
				@Override
				public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					// TODO Auto-generated method stub
					
				}
				
				@Override
				public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					// TODO Auto-generated method stub
					
				}
			}
		};
		SSLContext sc = SSLContext.getInstance("SSL"); 
		sc.init(null, trustAllCerts, new SecureRandom()); 
		HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
			
			@Override
			public boolean verify(String hostname, SSLSession session) {
				// TODO Auto-generated method stub
				return true;
			}
		});
		HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory()); 
	}
	
	//인기 프랜차이즈 TOP10 조회 
	public List<EgovMap> selectTopTen()  throws DataAccessException, SQLException {
		//현재 검색내역 중복제외 수가 100 이하이면 쿼리 조건값 바꾸기
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("topListCnt", mainDao.selectTopListNowCount());
		return mainDao.selectTopTen(paramMap);
	}
	
	//관심업종 TOP5 중분류 명
	public List<EgovMap> selectChartIntrstNmList(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return mainDao.selectChartIntrstNmList(paramMap);
	}
	
	//창업상담 게시판 url 조회
	public EgovMap selectBoardLc(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return mainDao.selectBoardLc(paramMap);
	}
}
