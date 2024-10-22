package gov.ggdo.frnchs.common.menu.controller;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.menu.service.MenuService;
import gov.ggdo.frnchs.common.param.ReqParam;

@Controller
public class MenuController {

	@Log Logger logger;

	@Autowired MenuService menuService;

	/**
	 * 메뉴목록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/menu/selectMenuList.ajax")
	public ModelAndView selectMenuList(@ReqParam Map<String, Object> paramMap, HttpServletRequest req) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		logger.debug("req.getHeader(\"REFERER\") :: " + req.getHeader("REFERER"));
		String fullURL = req.getHeader("REFERER");
		String refererURI = fullURL.split("//")[1];
		String[] refererURIArr = refererURI.split("/");

		if(refererURIArr.length > 1) {
			if("sysMngr".equals(refererURIArr[1])) {
				paramMap.put("menuSeCode", "A");
			}else {
				paramMap.put("menuSeCode", "U");
			}
		}else {
			paramMap.put("menuSeCode", "U");
		}

		try {
			modelAndView.addObject("menuList", menuService.selectMenuList(paramMap));
			modelAndView.addObject("qustnrList", menuService.selectQustnrList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectMenuList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메뉴 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 메뉴목록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/menu/selectMyPageMenuList.ajax")
	public ModelAndView selectMyPageMenuList(@ReqParam Map<String, Object> paramMap, HttpServletRequest req) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		String refererURI = req.getHeader("REFERER").split("//")[1].split("/")[1];
		if("myPage".equals(refererURI)){
			paramMap.put("menuSeCode", "M");
		}
		try {
			modelAndView.addObject("myPageMenuList", menuService.selectMyPageMenuList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectMenuList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메뉴 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/**
	 * 모바일 메뉴목록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/menu/selectMobMenuList.ajax")
	public ModelAndView selectMobMenuList(@ReqParam Map<String, Object> paramMap, HttpServletRequest req) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("mobMenuList", menuService.selectMobMenuList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectMenuList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메뉴 로드 중 에러가 발생하였습니다.");
		}
		
		return modelAndView;
	}


}
