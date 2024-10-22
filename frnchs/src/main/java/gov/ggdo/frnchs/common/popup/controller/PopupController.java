
package gov.ggdo.frnchs.common.popup.controller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.mail.iap.BadCommandException;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.ui.sysMngr.service.SysMngrService;

@Controller
public class PopupController {
	@Log Logger logger;
	@Autowired private SysMngrService sysMngrService;

	@PostConstruct
	public void searchPopupList() {
		try {
			Map<String, Object> emptyParam = new HashMap<String, Object>();
			emptyParam.put("popupType" ,"noPaging");
			Constants.POPUP_LIST = sysMngrService.selectPopupMngList(emptyParam);
		} catch (DataAccessException | SQLException e) {
			logger.debug(">>>> ============= static searchPopupList error =============");
		}
	}

	/**
	 * 회원관리 상세 조회 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/openPopup.do")
	public ModelAndView userInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/popup/popupDefault.popup");
			reqParam.put("popupNo", reqParam.get("no"));
			reqParam.put("menuCode", reqParam.get("code"));
			try {
				modelAndView.addObject("data", sysMngrService.selectPopupMngInfo(reqParam));
			} catch (DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException
					| BadCommandException | SQLException | IOException e) {
				logger.debug("openPopup method Error Occured : ");
			}


		return modelAndView;
	}
	
	/**
	 * 팝업 상세 조회 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectPopupMngInfo.ajax")
	public ModelAndView selectPopupMngInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		reqParam.put("popupNo", reqParam.get("no"));
		reqParam.put("menuCode", reqParam.get("code"));
		try {
			modelAndView.addObject("result", sysMngrService.selectPopupMngInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException
				| BadCommandException | SQLException | IOException e) {
			logger.debug("openPopup method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
		}
		
		
		return modelAndView;
	}

	/**
	 * 주소팝업
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/jusoPopup.do")
	public ModelAndView jusoPopup(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/common/jusoPopup");

		return modelAndView;
	}
}
