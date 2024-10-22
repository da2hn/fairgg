package gov.ggdo.frnchs.ui.surv.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.aop.LoginCheck;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.ui.surv.service.SurvService;

@Controller
public class SurvController {
	@Log Logger logger;
	@Autowired SurvService survService;

	/**
	 * 실태조사 조회 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/surv/surv/survInfo.do")
	@LoginCheck(resultType = "url")
	public ModelAndView survList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/surv/surv/survInfo.content");
		modelAndView.addObject("qustnrSn", reqParam.get("val"));
		return modelAndView;
	}

	/**
	 * 기간내 설문조사 조회
	 * @param reqParam
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/surv/surv/selectQustnrSn.ajax")
	public ModelAndView selectQustnrSn(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("qustnrSn", survService.selectQustnrSn(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectQustnrSn method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "현재 진행중인 설문이 없습니다.");
		}
	
		return modelAndView;
	}
	
	/**
	 * 설문조사 목록 조회 
	 * @param reqParam
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/surv/surv/selectQustnrQestnList.ajax")
	public ModelAndView selectQustnrQestnList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("qustnList", survService.selectQustnQestnList(paramMap));
			modelAndView.addObject("aswerList", survService.selectQustnAnswerList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectSvcExaminIemList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문조사 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/**
	 * 실태조사 결과 저장
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/surv/surv/mergeQustnResult.ajax")
	public ModelAndView mergeQustnResult(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if("Y".equals(survService.selectQustnResultAt(paramMap))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "이미 설문을 완료하였습니다.");
			} else {
				survService.mergeQustnResult(paramMap);
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "설문에 응해주셔서 대단히 감사합니다.");
			}
		} catch (DataAccessException | SQLException | IOException e) {
			logger.error("mergeQustnResult method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문조사 결과 저장 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

}
