package gov.ggdo.frnchs.ui.fran.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.file.service.FileService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.ui.fran.dao.FranDao;
import gov.ggdo.frnchs.ui.main.service.MainService;

@Service("franService")
public class FranService {

	@Log Logger logger;

	@Autowired private FranDao franDao;
	@Autowired private FileService fileService;
	@Autowired private EncryptService encryptService;
	@Autowired private MainService mainService;

	/**
	 * 본사 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsHedofc(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsHedofc method run start!!");
		return franDao.selectFrnchsHedofc(paramMap);
	}
	/**
	 * 본사 조회 모바일
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsHedofcM(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsHedofc method run start!!");
		return franDao.selectFrnchsHedofcM(paramMap);
	}
	/**
	 * 프랜차이즈 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsInfo method run start!!");
		return franDao.selectFrnchsInfo(paramMap);
	}
	/**
	 * 본사, 업종별 상호명 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectBsnSgnalList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectBsnSgnalList method run start!!");
		return franDao.selectBsnSgnalList(paramMap);
	}

	/**
	 * 본사에 존재하는 프랜차이즈 대분류 업종
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectHedofcNoFranchLclasList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectHedofcNoFranchLclasList method run start!!");
		return franDao.selectHedofcNoFranchLclasList(paramMap);
	}
	/**
	 * 본사에 존재하는 프랜차이즈 중분류 업종
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectHedofcNoFrnchsMlsfcList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectHedofcNoFrnchsMlsfcList method run start!!");
		return franDao.selectHedofcNoFrnchsMlsfcList(paramMap);
	}
	/**
	 * 프랜차이즈 부가정보 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsAdiInfo method run start!!");
		return franDao.selectFrnchsAdiInfo(paramMap);
	}
	/**
	 * 프랜차이즈 인기키웓 TOP10
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectPopularityKeyword(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectPopularityKeyword method run start!!");
		return franDao.selectPopularityKeyword(paramMap);
	}

	/**
	 * 통합검색시 프랜차이즈 번호 조회 22.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectSearchFrnchsNo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectSearchFrnchsNo(paramMap);
	}

	/**
	 * 관심프랜차이즈 정보...
	 */
	public List<EgovMap> selectFrnchsInfoByFrchsNo(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		logger.debug("selectFrnchsInfoByFrchsNo");
		List<EgovMap> list = franDao.selectFrnchsInfoByFrchsNo(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		for (int i = 0; i < list.size(); i++) {
			EgovMap map = list.get(i);
			if(map.get("atchmnflNo")!=null) {
				Object atchmnflNo = map.get("atchmnflNo");
//				String fileSn = "1";
				Object fileSn =  map.get("fileSn");
				String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
				String encFileKey = encryptService.encryptedStr(fileKey);
				map.put("fileKey", encFileKey);	
			}
			newList.add(i, map);
		}
		return newList;
	}
	public List<EgovMap> selectFrnchsInfoByYear(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsInfoByYear");
		List<EgovMap> list = franDao.selectFrnchsInfoByYear(paramMap);
		return list;
	}
	
	public List<EgovMap> selectFrnchsCompareByYear(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsInfoByYear");
		List<EgovMap> list = franDao.selectFrnchsInfoByYear(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		boolean check = false; //i번째 년도와 다음년도가 일치할때 한번 건너뛰는 플래그 
		boolean finalCheck = false; //마지막 행 여부 (i+1 인식안되서 플래그)
		if(list != null && !list.isEmpty()){
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				EgovMap nextMap = new EgovMap();
				EgovMap lastMap = new EgovMap();
				Object thisYear = "";
				Object nextYear = "";
				Object lastYear = "";
				if(i < list.size()-1){
					nextMap = list.get(i+1);
					thisYear = map.get("year");
					nextYear = nextMap.get("year");
				}else{
					lastMap = list.get(i-1);
					lastYear = lastMap.get("year");
					thisYear = map.get("year");
					if(lastYear == thisYear){
						finalCheck = true;
					}
				}
				if(!finalCheck){
					if(!thisYear.equals(nextYear) && !check){
						continue;
					}else{
						newList.add(map);
						if(check){
							check = false;
						}else{
							check = true;
						}
					}
				}else{
					newList.add(map);
				}
			}
		}
		return newList;
	}
	public List<EgovMap> selectFrnchsInfoBySido(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsInfoByFrchsNo");
		return franDao.selectFrnchsInfoBySido(paramMap);
	}

	public int selectAttnFrnchsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectAttnFrnchsListCount method run start!!");
		return franDao.selectAttnFrnchsListCount(paramMap);
	}

	public List<EgovMap> selectAttnFrnchsList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		logger.debug("selectAttnFrnchsList");
		
		List<EgovMap> list = franDao.selectAttnFrnchsList(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				Object atchmnflNo = map.get("atchmnflNo");
				Object fileSn =  map.get("fileSn");
				String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
				String encFileKey = encryptService.encryptedStr(fileKey);
				map.put("fileKey", encFileKey);
				newList.add(i, map);
			}
		}
		return newList; 
	}

	public List<EgovMap> selectDensityInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectDensityInfo");
		return franDao.selectDensityInfo(paramMap);
	}

	public List<EgovMap> selectDensityTrend(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectDensityTrend");
		return franDao.selectDensityTrend(paramMap);
	}
	public int selectIntrstFrnchsListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		logger.debug(">>>> selectIntrstFrnchsListCount");
		return franDao.selectIntrstFrnchsListCount(reqParam);
	}
	public List<EgovMap> selectIntrstFrnchsList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		logger.debug(">>>> selectIntrstFrnchsList");
		return franDao.selectIntrstFrnchsList(reqParam);
	}

	/**
	 * 착한 프랜차이즈 본사 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectGoodFrnchsExprnRegistListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectGoodFrnchsExprnRegistListCount(paramMap);
	}
	/**
	 * 착한 프랜차이즈 본사 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectGoodFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectGoodFrnchsExprnRegistList(paramMap);
	}
	/**
	 * 착한 프랜차이즈 본사 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectGoodFrnchsAdiInfo(paramMap);
	}
	/**
	 * 착한 프랜차이즈 본사 지정 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.insertGoodFrnchsAdiInfo(paramMap);
	}
	/**
	 * 착한 프랜차이즈 본사 지정 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.updateGoodFrnchsAdiInfo(paramMap);
	}

	/**
	 * 내 프랜차이즈 관리 목록 갯수 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsInfoListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return franDao.selectFrnchsInfoListCount(reqParam);
	}

	/**
	 * 내 프랜차이즈 관리 목록 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsInfoList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return franDao.selectFrnchsInfoList(reqParam);
	}
	/**
	 * 착한 프랜차이즈 본사 지정 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectGoodFrnchsAdiList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectGoodFrnchsAdiList(paramMap);
	}

	/**
	 * 프랜차이즈 상세 정보 목록 - 21.01.25
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public EgovMap selectFrnchsInfoForAdi(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		EgovMap returnMap = franDao.selectFrnchsInfoForAdi(reqParam);
//		logger.debug(">>> a:" + !ObjectUtils.isEmpty(returnMap));
//		logger.debug(">>> b:" + !ObjectUtils.isEmpty(returnMap.get("frnchsImageFileNo")));
		if(!ObjectUtils.isEmpty(returnMap) && !ObjectUtils.isEmpty(returnMap.get("frnchsImageFileNo"))) {
			String atchmnflNo = String.valueOf(returnMap.get("frnchsImageFileNo"));
			String fileSn = String.valueOf(returnMap.get("fileSn"));
			String fileKey = atchmnflNo + "_" + fileSn;
//			logger.debug(">>> fileKey:" + fileKey);
			String encFileKey = encryptService.encryptedStr(fileKey);
			returnMap.put("frnchsImageFileKey", encFileKey);
		}
		return returnMap;
	}

	/**
	 * 프랜차이즈 상세 정보 수정 - 21.01.25
	 * @param paramMap
	 * @param frnchsImageFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int modifyFrnchsInfo(Map<String, Object> paramMap, MultipartFile frnchsImageFile) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		if(frnchsImageFile != null) {
			logger.debug(">>> 파일있음");
			if(!ObjectUtils.isEmpty(paramMap.get("frnchsImageFileNo"))) {
				fileService.deleteFileByatchmnflNo(paramMap, "frnchsImageFileNo");
				logger.debug(">>> 이전파일 삭제");
			}

			String frnchsImageFileNo = frnchsImageFile == null ? (ObjectUtils.isEmpty(paramMap.get("frnchsImageFileNo")) ? "" : paramMap.get("frnchsImageFileNo").toString()) : fileService.insertFlie(frnchsImageFile, paramMap, "basic", "frnchsImageFileNo", "FS02");
			logger.debug(">>> frnchsImageFileNo:"+frnchsImageFileNo);
			paramMap.put("frnchsImageFileNo", frnchsImageFileNo);
		}

		int result = franDao.modifyFrnchsInfoForAdi(paramMap);

		return result;
	}

	public List<EgovMap> selectLegendInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {

		List<EgovMap> returnList;

		if( paramMap.get("id").equals("frc_dynmc_popltn_blck") ){
			returnList = franDao.selectPopulLegendInfo(paramMap);
		}else if( paramMap.get("id").equals("frc_card_selng_blck") ) {
			returnList = franDao.selectCardLegendInfo(paramMap);
		}else {
			returnList = franDao.selectOvpopLegendInfo(paramMap);
		}


		return returnList;
	}

	public List<EgovMap> selectLegendInfo2(Map<String, Object> paramMap) throws DataAccessException, SQLException {

		List<EgovMap> returnList;

		if( paramMap.get("id").equals("popul") ){
//			returnList = franDao.selectPopulLegendInfo2(paramMap);
			returnList = franDao.selectWorkerInfo(paramMap);
		}else {
//			returnList = franDao.selectCardLegendInfo2(paramMap);
			returnList = franDao.selectRevenueInfo(paramMap);
		}


		return returnList;
	}


	public String getNewsList(Map<String, Object> paramMap) {
		BufferedReader br = null;
		String rtnObject = null;
		try { 
			String text = URLEncoder.encode(paramMap.get("param")+"프랜차이즈", "UTF-8");
			// 새로운 방식 - 21.04.02
			String apiURL = "https://110.93.147.11/v1/search/news?query="+ text + "&sort=sim&start=1&display=" + paramMap.get("display"); // json 결과 
			if(apiURL.contains("https")) {
				logger.debug(">>>> ssl");
				mainService.setSSL();
			}
//			String apiURL = "https://openapi.naver.com/v1/search/news?query="+ text + "&sort=sim&start=1&display=" + paramMap.get("display"); // json 결과 // 이전방식
			//String apiURL = "https://openapi.naver.com/v1/search/blog.xml?query="+ text; // xml 결과
			URL url = new URL(apiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setConnectTimeout(7 * 1000);
			con.setRequestMethod("GET");
			con.setRequestProperty("X-Naver-Client-Id", paramMap.get("clientId").toString());
			con.setRequestProperty("X-Naver-Client-Secret", paramMap.get("clientSecret").toString());
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

	public String getBlogList(Map<String, Object> paramMap) {
		BufferedReader br = null;
		String rtnObject = null;
		try {
			String text = URLEncoder.encode(paramMap.get("param")+"프랜차이즈", "UTF-8");
			// 새로운 방식 - 21.04.02
			String apiURL = "https://110.93.147.11/v1/search/blog?query="+ text+"&display="+paramMap.get("display"); // xml 결과
			if(apiURL.contains("https")) {
				logger.debug(">>>> ssl2");
//				mainService.setSSL();
			}
//			String apiURL = "https://openapi.naver.com/v1/search/news?query="+ text + "&sort=sim&start=1&display=" + display; // json 결과
//			String apiURL = "https://openapi.naver.com/v1/search/blog?query="+ text+"&display="+paramMap.get("display"); // xml 결과
			URL url = new URL(apiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("X-Naver-Client-Id", paramMap.get("clientId").toString());
			con.setRequestProperty("X-Naver-Client-Secret", paramMap.get("clientSecret").toString());
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
		} catch (UnsupportedEncodingException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UnsupportedEncodingException Occured");
			e.printStackTrace();
		} catch (MalformedURLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method MalformedURLException Occured");
			e.printStackTrace();
		} catch (IOException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method IOException Occured");
			e.printStackTrace();
//		} catch (NoSuchAlgorithmException e) {
//			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NoSuchAlgorithmException Occured");
//			e.printStackTrace();
//		} catch (KeyManagementException e) {
//			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method KeyManagementException Occured");
//			e.printStackTrace();
		} finally {
			if(br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method IOException Occured");
				}
			}
		}
		return rtnObject;
	}

	public EgovMap selectBsnSgnal(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectBsnSgnal(paramMap);
	}
	
	/**
	 * 브랜드 정보 관리 목록 갯수
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectBrandInfoListCnt(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return franDao.selectBrandInfoListCnt(reqParam);
	}
	
	/**
	 * 브랜드 정보 관리 목록
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectBrandInfoList(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		logger.debug("selectBrandInfoList");
		List<EgovMap> list = franDao.selectBrandInfoList(reqParam);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				Object atchmnflNo = map.get("frnchsImageFileNo");
				Object fileSn =  map.get("fileSn");
				if(map.get("frnchsImageFileNo") != null) {					
					String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
					String encFileKey = encryptService.encryptedStr(fileKey);
					map.put("fileKey", encFileKey);
				}
				if(map.get("entrprsIntrcnFileNo") != null) {
					map.put("entFileKey", encryptService.encryptedStr(map.get("entrprsIntrcnFileNo") + "_" + "1"));
				}
				newList.add(i, map);
			}
		}
		return newList;
	}
	
	/**
	 * 브랜드 상세 정보 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public EgovMap selectBrandInfoForAdi(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		EgovMap returnMap = franDao.selectBrandInfoForAdi(reqParam);
		if(!ObjectUtils.isEmpty(returnMap) && !ObjectUtils.isEmpty(returnMap.get("frnchsImageFileNo"))) {
			String atchmnflNo = String.valueOf(returnMap.get("frnchsImageFileNo"));
			String fileSn = String.valueOf(returnMap.get("fileSn"));
			String fileKey = atchmnflNo + "_" + fileSn;
//			logger.debug(">>> fileKey:" + fileKey);
			String encFileKey = encryptService.encryptedStr(fileKey);
			returnMap.put("frnchsImageFileKey", encFileKey);
		}
		return returnMap;
	}

	/**
	 * 브랜드정보 삭제
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteBrandAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		int cnt = 0;
		String chkRowSn = (String)paramMap.get("chkRowSn");
		String[] list = chkRowSn.split(",");
		for(int i=0; i<list.length; i++){
			Map<String, Object> insertMap = new HashMap<String, Object>();
			insertMap.put("frnchsNo", list[i]);
			insertMap.put("ssUserNo", paramMap.get("ssUserNo"));
			franDao.deleteBrandAdiInfo(insertMap);
			cnt++;
		}
		return cnt;
	}
	
	/**
	 * 브랜드 통합검색 - 자동완성 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */	
	public List<EgovMap> selectSchBrandAutoCmptList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectSchBrandAutoCmptList");
		return franDao.selectSchBrandAutoCmptList(paramMap);
	}
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 저장 - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertSchBrandHistory(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.insertSchBrandHistory(paramMap);
	}
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 조회 - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectSchBrandHistoryList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectSchBrandHistoryList(paramMap);
	}
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 삭제(수정) - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateSchBrandHistoryInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.updateSchBrandHistoryInfo(paramMap);
	}
	
	/**
	 * 프랜차이즈 본사 상벌 관리 목록 조회 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectRewardList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectRewardList(paramMap);
	}
	
	/**
	 * 프랜차이즈 본사 상벌 관리 목록 수 조회 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectRewardListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return franDao.selectRewardListCount(paramMap);
	}
	
	/**
	 * 프랜차이즈 본사 상벌 관리 삭제 - 21.12.08 주한별
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void updateRewardDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		franDao.updateRewardDelete(paramMap);
	}
	
	/**
	 * 프랜차이즈 본사 상벌 관리 등록 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateRewardInsert(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return franDao.updateRewardInsert(paramMap);
	}
	
	/**
	 * 프랜차이즈 본사 상벌 관리 정보 조회 - 21.12.08 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectRewardInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return franDao.selectRewardInfo(reqParam);
	}
	/**
	 * 본사팝업창 count
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsHedofcCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return franDao.selectFrnchsHedofcCount(paramMap);
	}
}
