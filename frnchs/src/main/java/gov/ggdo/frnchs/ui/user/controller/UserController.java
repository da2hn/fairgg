package gov.ggdo.frnchs.ui.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.mail.service.MailSendService;
import gov.ggdo.frnchs.ui.main.service.MainService;
import gov.ggdo.frnchs.ui.user.service.UserService;

@Controller
public class UserController {

	@Log Logger logger;

	@Autowired UserService userService;
	@Autowired ComCodeService comCodeService;
	@Autowired private MailSendService mss;
	@Autowired private MainService mainService;

	/**
	 * 로그인 페이지
	 * 로그인페이지 이전 페이지 위한 referer저장 - 21.01.07
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/loginPage.do")
	public ModelAndView loginPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/user/login.main");

		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		request.getSession().setAttribute("prevPage", request.getHeader("referer"));

		return modelAndView;
	}

	/**
	 * 로그인 팝업
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/loginPopup.do")
	public ModelAndView loginPopup(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/ui/common/loginPopup");

		return modelAndView;
	}

	/**
	 * 로그인 처리
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/login.do")
	public ModelAndView login(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/main/main.main");

//		System.out.println("id : " + reqParam.get("userId"));
//		System.out.println("pw : " + reqParam.get("userPw"));

		try {
			//modelAndView.addObject("codeList", userService.selectCodeList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			
			// 메인 보낼시 뉴스 추가 - 21.05.17
			modelAndView.addObject("ggNewsList", mainService.getGgNews(""));
			modelAndView.addObject("ggBbsList", mainService.getGgBbs(""));
		} catch (Exception e) {
			logger.error("login method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "코드 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 회원가입 페이지
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/joinForm.do")
	public ModelAndView joinForm(@ReqParam Map<String, Object> reqParam) {
		String returnPage;
		if("Y".equals(reqParam.get("agreeYn"))){
			if("basic".equals(reqParam.get("userType"))){
				returnPage = "ui/user/joinForm.main";
			}else if("brand".equals(reqParam.get("userType"))) {
				returnPage = "ui/user/joinBrandForm.main";
			}else {
				returnPage="ui/main/main.main";
			}
		}else {
			returnPage = "ui/user/agreeForm.main";
		}
		ModelAndView modelAndView = new ModelAndView(returnPage);

		try {
			Map<String, Object> codeMap = new HashMap<>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);

			// 메인 보낼시 뉴스 추가 - 21.05.17
			if("ui/main/main.main".equals(returnPage)) {
				modelAndView.addObject("ggNewsList", mainService.getGgNews(""));
				modelAndView.addObject("ggBbsList", mainService.getGgBbs(""));
			}
		} catch (Exception e) {
			logger.error("joinForm method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원가입 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 회원가입 처리
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/joinUser.ajax")
	public ModelAndView joinUser(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			//브랜드관리자
			String brandStr = "brand";
			if("US03".equals(reqParam.get("userSeCode"))) {
				userService.joinBrandUser(reqParam, atchFile);
			}else {
				userService.joinUser(reqParam);
				brandStr = "";
			}

			//임의의 authKey 생성 & 이메일 발송
			String crtfcKey = mss.sendAuthMail((String)reqParam.get("emailAdres"),brandStr);
			reqParam.put("crtfcKey",crtfcKey);

			//DB에 crtfcKey 업데이트
			if("US03".equals(reqParam.get("userSeCode"))) {
				userService.updateBrandCrtfcKey(reqParam);
			}else {
				userService.updateCrtfcKey(reqParam);
			}
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원가입 인증메일이 발송되었습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("joinUser method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원가입 처리 중 에러가 발생하였습니다.");
		}
 
		return modelAndView;
	} 

	@RequestMapping("/user/joinConfirm.do")
    public ModelAndView signUp(@ReqParam Map<String, Object> reqParam){
		ModelAndView modelAndView = new ModelAndView("ui/main/main.main");

	    try {
	    	//email, crtfcKey 가 일치할경우 crtfcAt 업데이트
		    userService.updateAuthStatus(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			
			// 메인 보낼시 뉴스 추가 - 21.05.17
			modelAndView.addObject("ggNewsList", mainService.getGgNews(""));
			modelAndView.addObject("ggBbsList", mainService.getGgBbs(""));
		} catch (Exception e) {
			logger.error("joinUser method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "코드 조회 중 에러가 발생하였습니다.");
		}

	    return modelAndView;

 	}

	/**
	 * 이메일 확인
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/chkEmailAdres.ajax")
	public ModelAndView chkEmailAdres(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			EgovMap resultMap = userService.chkEmailAdres(reqParam);

			modelAndView.addObject("resultCount", resultMap.get("mailCnt"));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("chkEmailAdres method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "이메일체크 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 가입완료화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping("/user/joinComplete.do")
    public ModelAndView joinComplete(@ReqParam Map<String, Object> reqParam){
		ModelAndView modelAndView = new ModelAndView("ui/user/joinComplete.content");

	    try {
	    	modelAndView.addObject("userSeCode", reqParam.get("userSeCode"));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("joinComplete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "코드 조회 중 에러가 발생하였습니다.");
		}

	    return modelAndView;

 	}

	/**
	 * 비밀번호 찾기
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/findUserPw.ajax")
	public ModelAndView findUserPw(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			String returnMsg = "";
			if(userService.findUserPw(reqParam)) {
//				System.out.println("출력2" + reqParam);
				returnMsg = "변경된 비밀번호가 메일로 발송되었습니다.";
			}else {
//				System.out.println("출력3" + reqParam);
				returnMsg = "등록된 정보를 찾을수 없습니다.";
			}
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, returnMsg);
		} catch (Exception e) {
			logger.error("findUserPw method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "비밀번호 찾기 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 유저별 담당 프렌차이즈 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/selectUserChrgBrandList.ajax")
	public ModelAndView selectUserChrgBrandList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("userChrgBrandList", userService.selectUserChrgBrandList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("saveUserInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "유저별 담당 프렌차이즈 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
}
