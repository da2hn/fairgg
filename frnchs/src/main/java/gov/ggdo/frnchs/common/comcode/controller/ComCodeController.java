package gov.ggdo.frnchs.common.comcode.controller;

import java.sql.SQLException;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.aop.LoginCheck;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.security.UserVO;

@Controller
public class ComCodeController {

	@Log Logger logger;

	@Autowired ComCodeService comCodeService;

	/**
	 * 공통코드 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/getComCodeList.ajax")
	public ModelAndView getComCodeList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			String codeId = (String)paramMap.get("codeId");
			modelAndView.addObject(codeId + "_LIST", comCodeService.selectComCodeList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("getComCodeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공통코드 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 업종 대분류 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/selectFranchLclasList.ajax")
	public ModelAndView selectFranchLclasList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("franchLclasList", comCodeService.selectFranchLclasList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFranchLclasList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "업종 대분류 리스트 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 업종 중분류 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/selectFrnchsMlsfcList.ajax")
	public ModelAndView selectFrnchsMlsfcList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("frnchsMlsfcList", comCodeService.selectFrnchsMlsfcList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "업종 중분류 리스트 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 시도 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/selectCtprvnRelmList.ajax")
	public ModelAndView selectCtprvnRelmList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("ctprvnRelmList", comCodeService.selectCtprvnRelmList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectCtprvnRelmList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "시도 리스트 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 시군구 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/selectSignguRelmList.ajax")
	public ModelAndView selectSignguRelmList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("signguRelmList", comCodeService.selectSignguRelmList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectSignguRelmList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "시군구 리스트 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 행정동 리스트
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/selectAdstrdRelmList.ajax")
	public ModelAndView selectAdstrdRelmList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("adstrdRelmList", comCodeService.selectAdstrdRelmList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectAdstrdRelmList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "행정동 리스트 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 과밀도 어쩌구
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/comcode/intrstFrnchs.ajax")
	@LoginCheck(resultType="ajax")
	public ModelAndView intrstFrnchsInsert(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		String confmUserNo = "";

		try {
			confmUserNo = ((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo();
			reqParam.put("userNo", confmUserNo);
			int result = 0;
			if( reqParam.get("flag").equals("N") ) {//추가
				result = comCodeService.insertIntrstFrnchs(reqParam);
			}else {//제거
				result = comCodeService.updateIntrstFrnchs(reqParam);
			}

			if( result > 0 ) {
				//성공
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}else {
				//실패
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			}

		}catch (DataAccessException | SQLException e) {
			logger.error("selectHedofcNoFrnchsMlsfcList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "본사에 존재하는 프렌차이즈 중분류 업종 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


}
