package gov.ggdo.frnchs.ui.main.controller;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.ui.board.service.BoardService;
import gov.ggdo.frnchs.ui.main.service.MainService;

import java.sql.SQLException;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@Controller
public class MainController {

	@Log Logger logger; 

	@Autowired MainService mainService;
	@Autowired private BoardService boardService;
	
	/**
	 * 메인페이지
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/main.do")
	public ModelAndView mainPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/main/main.main");

		try {
			/*List<EgovMap> list1 = mainService.getGgNews("0");
			List<EgovMap> list2 = mainService.getGgNews("10");
			List<EgovMap> newsList = new ArrayList<>();
			newsList.addAll(list1);
			newsList.addAll(list2);
			modelAndView.addObject("ggNewsList", newsList);
			List<EgovMap> list3 = mainService.getGgBbs("0");
			List<EgovMap> list4 = mainService.getGgBbs("10");
			List<EgovMap> list5 = mainService.getGgBbs("20");
			List<EgovMap> cardNewsList = new ArrayList<>();
			cardNewsList.addAll(list3);
			cardNewsList.addAll(list4);
			cardNewsList.addAll(list5);
			modelAndView.addObject("ggBbsList", cardNewsList);*/	
			
			modelAndView.addObject("topTenList", mainService.selectTopTen());
			//창업상담 게시판 url 조회
			//reqParam.put("bbsNm", "안심창업상담");
			modelAndView.addObject("urlList",  mainService.selectBoardLc(reqParam));
			
			modelAndView.addObject("education", boardService.selectFairTradePrList(reqParam));
		} catch (Exception e) {
			logger.debug("메인페이지 경기도소식, 경기도 공정국 뉴스 조회 중 에러");
		}
		
		return modelAndView;
	}
	
	/**
	 * 공통 게시판 정보 조회(url, masterNo..) - 22.01.20
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/selectCommonNoticeInfo.ajax")
	public ModelAndView selectCommonNoticeInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("urlList",  mainService.selectBoardLc(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectCommonNoticeInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공통 게시판 정보 조회중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 메인 > 인기프랜차이즈 TOP100 목록 조회 - 22.01.14 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/getTopHundredList.ajax")
	public ModelAndView getTopHundredList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", mainService.selectTopTen());
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("getTopHundredList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "인기프랜차이즈 탑 100 조회중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 법적고지
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/law.do")
	public ModelAndView law(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/main/law.main");

		return modelAndView;
	}
	/**
	 * 개인정보처리방침
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/privacy.do")
	public ModelAndView privacy(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/main/privacy.main");

		return modelAndView;
	}

	/**
	 * 차트 - 관심업종 현황
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/getChartIntrst.ajax")
	public ModelAndView getChartIntrst(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", mainService.selectChartIntrst(reqParam));
			modelAndView.addObject("topNameList", mainService.selectChartIntrstNmList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectChartIntrst method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "관심업종 현황 조회중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	/**
	 * 차트 - 페어북 사용현황
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/getChartFairUsage.ajax")
	public ModelAndView getChartFairUsage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", mainService.selectChartFairUsage(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectChartFairUsage method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "페어북 사용현황 조회중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 에러페이지 신규 추가 - 21.03.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/main/error.do")
	public ModelAndView error(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/ui/main/error");
		return modelAndView;
	}
	
	/**
	 * 지도 데이터 내부 url로 연결 - 21.04.02
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/geoData.ajax")
	public ModelAndView geoData(@ReqParam Map<String, Object> reqParam) {
		logger.debug(">>>> geoData s");
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		Object object = mainService.getGeoJson(reqParam); 
		logger.debug(">>>> geoData object:"+object);
		modelAndView.addObject(object);
		logger.debug(">>>> geoData e");
		
		return modelAndView;
	}
	
	// 한글깨짐으로 produces 추가 - 21.04.12
	@RequestMapping(value = "/geoData.do", produces="application/text; charset=UTF-8")
	public @ResponseBody String geoData2(@ReqParam Map<String, Object> reqParam) {
		logger.debug(">>>>>>>>>>>>> geoData start");
		String jobj = mainService.getGeoJson(reqParam).toString(); 
		logger.debug(">>>>>>>>>>>>> geoData end");
		
		return jobj;
	}
//	public @ResponseBody JSONObject geoData2(@ReqParam Map<String, Object> reqParam) {
//		logger.debug(">>>> geoData s");
//		JSONObject jobj = JSONObject.fromObject(JSONSerializer.toJSON(mainService.getGeoJson(reqParam)));; 
//		logger.debug(">>>> geoData object:"+jobj);
//		logger.debug(">>>> geoData e");
//		
//		return jobj;
//	}
}
