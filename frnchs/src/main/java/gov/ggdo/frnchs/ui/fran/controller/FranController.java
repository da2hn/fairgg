package gov.ggdo.frnchs.ui.fran.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.fran.service.FranService;

@Controller
public class FranController {

	@Log Logger logger;

	@Autowired FranService franService;
	@Autowired ComCodeService comCodeService;
	@Autowired private EncryptService encryptService;

	@Value("#{globalconfig['naver.clientId']}")
	private String globalClientId;
	@Value("#{globalconfig['naver.clientSecret']}")
	private String globalClientSecret;
	
	@Value("#{globalconfig['kakao.key']}")
	private String kakaoKey;
	@Value("#{globalconfig['kakao.link']}")
	private String kakaoLink;

	/**
	 * 본사 조회 pc (페이징 있음)
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectFrnchsHedofc.ajax")
	public ModelAndView selectFrnchsHedofc(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		logger.debug("reqParam :: " + reqParam);
		try {
			int resultCount = franService.selectFrnchsHedofcCount(reqParam);
			PagingUtils.setPaging("www", "hedofcList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("frnchsHedofcList",franService.selectFrnchsHedofc(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectFrnchsHedofc method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 본사 조회 mob (페이징 없음)
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectFrnchsHedofcM.ajax")
	public ModelAndView selectFrnchsHedofcM(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		logger.debug("reqParam :: " + reqParam);
		try {
			modelAndView.addObject("frnchsHedofcList",franService.selectFrnchsHedofcM(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectFrnchsHedofc method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사 조회 중 에러가 발생하였습니다.");
		}
		
		return modelAndView;
	}
	/**
	 * 프랜차이즈 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectFrnchsInfo.ajax")
	public ModelAndView selectFrnchsInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("frnchsInfoList",franService.selectFrnchsInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectFrnchsInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 본사, 업종별 상호명 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectBsnSgnalList.ajax")
	public ModelAndView selectBsnSgnalList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("bsnSgnalList",franService.selectBsnSgnalList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectBsnSgnalList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사, 업종별 상호명 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 본사에 존재하는 프렌차이즈 대분류 업종
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectHedofcNoFranchLclasList.ajax")
	public ModelAndView selectHedofcNoFranchLclasList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("hedofcNoFranchLclasList",franService.selectHedofcNoFranchLclasList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFranchLclasList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 대분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 본사에 존재하는 프렌차이즈 중분류 업종
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectHedofcNoFrnchsMlsfcList.ajax")
	public ModelAndView selectHedofcNoFrnchsMlsfcList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("hedofcNoFrnchsMlsfcList",franService.selectHedofcNoFrnchsMlsfcList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	//
	/**
	 * 관심프랜차이즈 찾기 시작
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/search/searchList.do")
	public ModelAndView infoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/searchList.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}

	/**
	 * 브랜드비교
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/search/compareBrand.do")
	public ModelAndView compareBrand(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/compareBrand.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}

	/**
	 * 과밀도
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/search/densityBrand.do")
	public ModelAndView densityBrand(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/densityBrand.content");
		try {
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject("headerTxt", "점포 과밀도 안내");
			modelAndView.addObject("layerPopupType", "densityBrandPopup");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e){
			e.printStackTrace();
			modelAndView.addObject("result", "fail");
			modelAndView.addObject("resultMsg", "점포 과밀도 안내 조회중 오류가 발생하였습니다.");
		}
		return modelAndView;
	}


	/**
	 * 관심 프랜차이즈...
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectBrandCompare.ajax")
	public ModelAndView selectBrandCompareAjax(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());


		System.out.println("selectBrandCompare.ajax param : " + reqParam);
		try {
			modelAndView.addObject("frchsList",franService.selectFrnchsInfoByFrchsNo(reqParam));
			modelAndView.addObject("yearList",franService.selectFrnchsCompareByYear(reqParam));
			modelAndView.addObject("sidoList",franService.selectFrnchsInfoBySido(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	 /* 프랜차이즈 정보
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectBrandInfo.ajax")
	public ModelAndView selectBrandInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("frchsList",franService.selectFrnchsInfoByFrchsNo(reqParam));
			modelAndView.addObject("yearList",franService.selectFrnchsInfoByYear(reqParam));
			modelAndView.addObject("sidoList",franService.selectFrnchsInfoBySido(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 정보 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/* 프랜차이즈 인기키워드 TOP10
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectPopularityKeyword.ajax")
	public ModelAndView selectPopularityKeyword(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("PopularityList",franService.selectPopularityKeyword(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectPopularityKeyword method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 정보 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/* 카카오 인증정보 획득
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectKakaoConfig.ajax")
	public ModelAndView selectKakaoConfig(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		
		EgovMap resultMap = new EgovMap();		
		resultMap.put("key", kakaoKey);
		resultMap.put("link", kakaoLink);
		
		try {
			modelAndView.addObject("kakaoConfig",resultMap);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectKakaoConfig method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "카카오 인증정보에 오류가 있습니다.");
		}
		return modelAndView;
	}


	/**
	 * 관심 프랜차이즈 검색 목록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectAttnFrnchsList.ajax")
	public ModelAndView selectAttnFrnchsListAjax(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			reqParam.put("ctprvnCodeArr", reqParam.get("ctprvnCodeArr").toString().split(","));
			// 시도 배열 정렬 추가 - 21.02.10
			logger.debug(">>>> sido:"+StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()));
			reqParam.put("sortSidoArr", StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()) ? null : reqParam.get("sortSidoArr").toString().split(","));


			int resultCount = franService.selectAttnFrnchsListCount(reqParam);

			PagingUtils.setPaging("www", "search_frchs", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);

			System.out.println("selectAttnFrnchsList.ajax param########### : " + reqParam);

			modelAndView.addObject("frchsList",franService.selectAttnFrnchsList(reqParam));
			
//			List frchsList = franService.selectAttnFrnchsList(reqParam);
//			modelAndView.addObject("frchsList", frchsList);
//			
//			List<Map<String, Object>> listMap = frchsList; 
//			String tot_cnt = listMap.get(0).get("tot_cnt").toString();
//			int resultCount = Integer.parseInt(tot_cnt);
//			PagingUtils.setPaging("www", "search_frchs", resultCount, reqParam, modelAndView);
//			modelAndView.addObject("resultCount", resultCount);
			
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 과밀도 어쩌구
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectDensityInfo.ajax")
	public ModelAndView selectDensityInfoAjax(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());


		System.out.println("selectBrandCompare.ajax param : " + reqParam);
		try {
			modelAndView.addObject("frchsList",franService.selectDensityInfo(reqParam));
			modelAndView.addObject("frchsTrend",franService.selectDensityTrend(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	/**
	 *
	 * @param request
	 * @param model
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
	@RequestMapping(value = "/fran/selectNewsReview.ajax")
	public ModelAndView mainNews(HttpServletRequest request, ModelMap model, @ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		reqParam.put("clientId", globalClientId);
		reqParam.put("clientSecret", globalClientSecret);
        reqParam.put("display","3");//걍 박아서넣어둠

        //프랜차이즈 번호로 프랜차이즈 명 조회

        reqParam.put("frnchsNo",reqParam.get("param3"));
        String bsnSgnal1 = franService.selectBsnSgnal(reqParam).get("bsnSgnal").toString();
        
        if(reqParam.get("param4") != null) {
        	reqParam.put("frnchsNo",reqParam.get("param4"));
            String bsnSgnal2 = franService.selectBsnSgnal(reqParam).get("bsnSgnal").toString();
            reqParam.put("param", bsnSgnal2);
            modelAndView.addObject("news2",franService.getNewsList(reqParam));
            modelAndView.addObject("blog2",franService.getBlogList(reqParam));
        }

        reqParam.put("param", bsnSgnal1);
        modelAndView.addObject("news1",franService.getNewsList(reqParam));
        modelAndView.addObject("blog1",franService.getBlogList(reqParam));

        return modelAndView;
    }

	/**
	 * 착한프랜차이즈 홍보
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/promo/promoList.do")
	public ModelAndView promoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fran/promo/promoList.content");

		try {

			List<EgovMap> goodFrnchsAdiList = franService.selectGoodFrnchsAdiList(reqParam);

			for(EgovMap tmpMap : goodFrnchsAdiList) {
				//유튜브 주소 추출
				if(tmpMap.get("youtubeMvpLink") != null && !"".equals(tmpMap.get("youtubeMvpLink"))) {
					String[] youtubeMvpLinkArr = tmpMap.get("youtubeMvpLink").toString().split("//");
					String[] tmpStrArr = youtubeMvpLinkArr[1].split("/");
					tmpMap.put("youtubeMvpLinkKey", tmpStrArr[tmpStrArr.length-1].toString());
				}else {
					tmpMap.put("youtubeMvpLinkKey", "");
					//이미지 주소 추출
					if(tmpMap.get("frnchsImageFileKey") != null) {
						String fileKey = tmpMap.get("frnchsImageFileKey").toString();
						String[] tmpArr = tmpMap.get("frnchsImageFileKey").toString().split("_");
						String atchmnflNo = tmpArr[0];
						String fileSn = tmpArr[1];
						String encFileKey = encryptService.encryptedStr(fileKey);
						tmpMap.put("fileKey", encFileKey);
						tmpMap.put("atchmnflNo", atchmnflNo);
						tmpMap.put("fileSn", fileSn);
					}
				}
			}

			modelAndView.addObject("goodFrnchsAdiList",goodFrnchsAdiList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("promoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "착한프랜차이즈 홍보 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	/**
	 * 범례 3개짜리
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectLegendInfo.ajax")
	public ModelAndView selectLegendInfoAjax(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		logger.debug("reqParam :: " + reqParam);
		try {
			modelAndView.addObject("legendList",franService.selectLegendInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectFrnchsHedofc method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 범례 2개짜리
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectLegendInfo2.ajax")
	public ModelAndView selectLegendInfoAjax2(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		logger.debug("reqParam :: " + reqParam);
		try {
			modelAndView.addObject("legendList",franService.selectLegendInfo2(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectFrnchsHedofc method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	//TODO 브랜드 통합검색 - 검색기록
	
	//
	/**
	 * 브랜드 통합검색 - 자동완성
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectSchBrandAutoCmptList.ajax")
	public ModelAndView selectSchBrandAutoCmptList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
//			reqParam.put("ctprvnCodeArr", reqParam.get("ctprvnCodeArr").toString().split(","));
//			// 시도 배열 정렬 추가 - 21.02.10
//			logger.debug(">>>> sido:"+StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()));
//			reqParam.put("sortSidoArr", StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()) ? null : reqParam.get("sortSidoArr").toString().split(","));


//			int resultCount = franService.selectAttnFrnchsListCount(reqParam);
//			int resultCount = franService.selectSrchBrandAutoCmptListCount(reqParam);

//			PagingUtils.setPaging("www", "search_frchs", resultCount, reqParam, modelAndView);
//			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("frchsList", franService.selectSchBrandAutoCmptList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			logger.info("통합검색 자동완성 실행 ");
		} catch (Exception e) {
			logger.error("selectSchBrandAutoCmptList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
//	//브랜드 통합검색 - 검색 결과 목록 페이지 /fran/selectSchBrandAutoCmptList.ajax
//	//
//	/**
//	 * 통합검색 브랜드 조회 결과 목록_old
//	 * @param reqParam
//	 * @return
//	 */
//	
//	@RequestMapping(value = "/fran/search/unifiedSearchList.do")
//	public ModelAndView unifiedSearchList(@ReqParam Map<String, Object> reqParam) {
//		ModelAndView modelAndView = new ModelAndView("ui/fran/search/unifiedSearchList.content");
//		try {
//			//창업지원내용구분 콤보
//			Map<String, Object> codeMap = new HashMap<String, Object>();
//			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
//			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
//			
//			modelAndView.addObject("ldClass", reqParam.get("slct_schBrnd"));
//			modelAndView.addObject("bsnSgnal", reqParam.get("txt_schBrnd"));
//			System.out.println("-----------------------------------------------------------");
//			System.out.println("reqParam : " + reqParam);
////			System.out.println("modelAndView : " + modelAndView);
////			System.out.println("ldClass : ");		
////			System.out.println("bsnSgnal : ");
//			System.out.println("-----------------------------------------------------------");
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
//		return modelAndView;
//	}
	
//	/**
//	 * 통합검색 브랜드 조회 결과 상세_old
//	 * @param reqParam
//	 * @return
//	 */
//	@RequestMapping(value = "/fran/selectUnifiedFrnchsList.ajax")
//	public ModelAndView selectUnifiedFrnchsList(@ReqParam Map<String, Object> reqParam) {
//		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
//
//		try {
//
////			reqParam.put("ctprvnCodeArr", reqParam.get("ctprvnCodeArr").toString().split(","));
////			// 시도 배열 정렬 추가 - 21.02.10
////			logger.debug(">>>> sido:"+StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()));
////			reqParam.put("sortSidoArr", StringUtils.isEmpty(reqParam.get("sortSidoArr").toString()) ? null : reqParam.get("sortSidoArr").toString().split(","));
//
//
////			int resultCount = franService.selectAttnFrnchsListCount(reqParam);
//			int resultCount = franService.selectAttnFrnchsListCount(reqParam);
//
//			PagingUtils.setPaging("www", "search_frchs", resultCount, reqParam, modelAndView);
//			modelAndView.addObject("resultCount", resultCount);
//
//			System.out.println("selectUnifiedFrnchsList.ajax param########### : " + reqParam);
//
//
////			modelAndView.addObject("frchsList",franService.selectAttnFrnchsList(reqParam));
//			modelAndView.addObject("frchsList",franService.selectAttnFrnchsList(reqParam));
//			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
//		} catch (Exception e) {
//			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
//			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
//			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
//		}
//
//		return modelAndView;
//	}
	
	/**
	 * 브랜드 정보 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/fran/search/unifiedSearchBrandInteg.do")
	public ModelAndView unifiedSearchBrandInteg(
			@ReqParam Map<String, Object> reqParam,
			@RequestParam(value="frnchsNo", required= false, defaultValue="") String frnchsNo,
			@RequestParam(value="brandYear", required= false, defaultValue="") String brandYear,
			@RequestParam(value="bsnSgnal", required= false, defaultValue="") String bsnSgnal) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/unifiedSearchBrand.content");
		
		//카카오 링크로 접근했을경우 2021-12-24
		if(!frnchsNo.equals("")){
			modelAndView.addObject("frnchsNo",  reqParam.get("frnchsNo"));//프랜차이즈 조회를 위한 필요정보
		} else {
			if(reqParam.get("bsnSgnal") != null || !reqParam.get("bsnSgnal").equals("")) {
				Map<String, Object> map = new HashMap<>();
				map.put("bsnSgnal", reqParam.get("bsnSgnal"));
				EgovMap vo = franService.selectSearchFrnchsNo(map);
				if(vo != null) {					
					modelAndView.addObject("frnchsNo", vo.get("frnchsNo"));
					modelAndView.addObject("brandYear", vo.get("year"));//프랜차이즈 조회를 위한 필요정보
				}
			}
		}
		if(!brandYear.equals("")){
			modelAndView.addObject("brandYear", reqParam.get("brandYear"));//프랜차이즈 조회를 위한 필요정보
		}
		try {
			//selectSearchFrnchsNo 검색시 frnchsNo 없을 경우 검색어로 조회 부분 추가
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject("hnd_schFrnchsNo", reqParam.get("frnchsNo"));//프랜차이즈 번호
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}
	
	/**
	 * 브랜드 정보 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/fran/search/unifiedSearchBrand.do")
	public ModelAndView unifiedSearchBrand(
			@ReqParam Map<String, Object> reqParam,
			@RequestParam(value="exprnRegistNo", required= false, defaultValue="") String exprnRegistNo,
			@RequestParam(value="frnchsNo", required= false, defaultValue="") String frnchsNo,
			@RequestParam(value="brandYear", required= false, defaultValue="") String brandYear) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/unifiedSearchBrand.content");
		if(!exprnRegistNo.equals("")){
			modelAndView.addObject("frnchsNo", exprnRegistNo);//프랜차이즈 조회를 위한 필요정보
		}
		//카카오 링크로 접근했을경우 2021-12-24
		if(!frnchsNo.equals("")){
			modelAndView.addObject("frnchsNo", frnchsNo);//프랜차이즈 조회를 위한 필요정보
		}
		if(!brandYear.equals("")){
			modelAndView.addObject("brandYear", brandYear);//프랜차이즈 조회를 위한 필요정보
		}
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject("hnd_schFrnchsNo", reqParam.get("hnd_schFrnchsNo"));//프랜차이즈 번호
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}
	
	/**
	 * 브랜드 상세 정보
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/search/unifiedBrand.do")
	public ModelAndView unifiedBrand(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fran/search/unifiedBrand.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject("hnd_schFrnchsNo", reqParam.get("hnd_schFrnchsNo"));//프랜차이즈 번호
			modelAndView.addObject("brandYear", reqParam.get("brandYear"));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}
	
	
	/**
	 * 브랜드 통합검색 - 검색결과
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fran/selectUnifiedSearchBrandList.ajax")
	public ModelAndView selectUnifiedSearchBrandList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("frchsList",franService.selectFrnchsInfoByFrchsNo(reqParam));
			modelAndView.addObject("yearList",franService.selectFrnchsInfoByYear(reqParam));
			modelAndView.addObject("sidoList",franService.selectFrnchsInfoBySido(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectUnifiedSearchBrandList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 브랜드 통합검색 > 브랜드 정보 페이지 > 뉴스,리뷰 목록 조회 - 21.11.25 주한별
	 * @param request
	 * @param model
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
	@RequestMapping(value = "/fran/selectBrdNewsReview.ajax")
	public ModelAndView selectBrdNewsReview(HttpServletRequest request, ModelMap model, @ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		reqParam.put("clientId", globalClientId);
		reqParam.put("clientSecret", globalClientSecret);
        reqParam.put("display","3");//걍 박아서넣어둠

        //프랜차이즈 번호로 프랜차이즈 명 조회

        reqParam.put("frnchsNo",reqParam.get("param1"));
        String bsnSgnal = franService.selectBsnSgnal(reqParam).get("bsnSgnal").toString();

        reqParam.put("param", bsnSgnal);
        modelAndView.addObject("news",franService.getNewsList(reqParam));
        modelAndView.addObject("blog",franService.getBlogList(reqParam));

        return modelAndView;
    }

	
	/**
	 * 브랜드 통합검색 > 검색어 내역 저장 - 21.11.25 주한별
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
	@RequestMapping(value = "/fran/saveSchBrandHistory.ajax")
	public ModelAndView saveSchBrandHistory(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException  {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		try {
			if(reqParam.get("frnchsNo") == null || reqParam.get("frnchsNo").equals("")) {
				Map<String, Object> map = new HashMap<>();
				map.put("bsnSgnal", reqParam.get("schBrdWord"));
				EgovMap vo = franService.selectSearchFrnchsNo(map);
				if(vo != null) {
					//검색어로 조회할 경우 컨트롤러단에서 검색내역 저장
					reqParam.put("frnchsNo", vo.get("frnchsNo"));
					reqParam.put("schBrdWord", vo.get("bsnSgnal"));
					reqParam.put("brandYear", vo.get("year"));
					reqParam.put("userNo", reqParam.get("SsUserNo"));
					result = franService.insertSchBrandHistory(reqParam);
				}
			} else {
				result = franService.insertSchBrandHistory(reqParam);
			}
			
			if(result == 1) {
				modelAndView.addObject("dataList",reqParam);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "등록 되었습니다.");				
			} else {
				modelAndView.addObject(Constants.RESULT_MESSAGE, "등록 실패 하였습니다.");	
			}

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("saveSchBrandHistory method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 검색어 내역 등록중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 조회 - 21.11.25 주한별
	 * @param request
	 * @param model
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
	@RequestMapping(value = "/fran/selectSchBrandHistoryList.ajax")
	public ModelAndView selectSchBrandHistoryList(HttpServletRequest request, ModelMap model, @ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("frchsList",franService.selectSchBrandHistoryList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectUnifiedSearchBrandList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

        return modelAndView;
    }
	
	/**
	 * 
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
	@RequestMapping(value = "/fran/updateSchBrandHistory.ajax")
	public ModelAndView updateSchBrandHistory(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException  {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = franService.updateSchBrandHistoryInfo(reqParam);
			if(result == 1) {
				modelAndView.addObject(Constants.RESULT_MESSAGE, "수정 되었습니다.");				
			} else {
				modelAndView.addObject(Constants.RESULT_MESSAGE, "수정 실패 하였습니다.");	
			}
			
			

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("saveSchBrandHistory method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 검색어 내역 수정중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
}
