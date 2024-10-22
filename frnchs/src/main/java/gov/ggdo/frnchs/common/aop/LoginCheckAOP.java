package gov.ggdo.frnchs.common.aop;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.security.EgovUserDetailsHelper;
import gov.ggdo.frnchs.common.security.UserVO;
import gov.ggdo.frnchs.ui.user.dao.UserDao;

/**
 * @Class Name : LoginCheckAOP.java
 * @Description : 컨트롤러 메소드가 실핼될 때 사용자 세션정보를 체크하는 AOP 클래스
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 6.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 6.
 * @version 1.0
 * @see
 *
 *
 */

@Aspect
@Order(1)
public class LoginCheckAOP {

	@Log Logger logger;

	@Autowired
	UserDao userDao;

	@Around("@annotation(LoginCheck) && @annotation(loginCheck)")
	public Object loginCheck(ProceedingJoinPoint joinPoint, LoginCheck loginCheck) throws Throwable {
		Object result = null;
		logger.debug("==== LoginCheckAOP loginCheck mode is ["+loginCheck.resultType()+"] === start ===");
		try {
			logger.debug("loginCheck start!!!!");

			UserVO userVO = (UserVO)EgovUserDetailsHelper.getAuthenticatedUser();
			if (userVO == null) {
				logger.debug("로그인 안됨!!");
				ModelAndView modelAndView = null;
				if ("json".equals(loginCheck.resultType())) {
					modelAndView = new ModelAndView(new MappingJackson2JsonView());
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_NO_AUTH);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "로그인 정보가 없습니다. 로그인 후 다시 사용해 주세요.");
					result = modelAndView;
				} else if("url".equals(loginCheck.resultType())){
					result = joinPoint.proceed();
					if(result instanceof ModelAndView) {
						modelAndView = (ModelAndView)result;
						modelAndView.addObject("layerPopupType", "loginPopup");
					}
				} else if("popup".equals(loginCheck.resultType())) {
					result = joinPoint.proceed();
					if(result instanceof ModelAndView) {
						modelAndView = (ModelAndView)result;
						modelAndView.setViewName("/ui/common/loginPopup");
					}
				} else if("ajax".equals(loginCheck.resultType())) {
					modelAndView = new ModelAndView("/ui/common/loginPopup");
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_NO_AUTH);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "로그인 정보가 없습니다. 로그인 후 다시 사용해 주세요.");
					result = modelAndView;
				} else if("file".equals(loginCheck.resultType())) {
					HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
					String uriStr = request.getHeader("referer").split("//")[1].toString();
					uriStr = "ui/" + uriStr.substring(uriStr.indexOf("/")+1).replace(".do", ".content");

					modelAndView = new ModelAndView(uriStr);
					modelAndView.addObject("layerPopupType", "loginPopup");
					result = modelAndView;
				} else if("fileAjax".equals(loginCheck.resultType())) {
					modelAndView = new ModelAndView(new MappingJackson2JsonView());
					modelAndView.addObject("session", false);
					modelAndView.addObject("loginPopup", "/loginPopup.do");
					result = modelAndView;
				} else if("US01".equals(loginCheck.resultType())) {
					result = joinPoint.proceed();
					if(result instanceof ModelAndView) {
						modelAndView = (ModelAndView)result;
						modelAndView.addObject("layerPopupType", "loginPopup");
					}
				}
			} else {
				logger.debug("로그인 됨!!");
				ModelAndView modelAndView = null;
				result = joinPoint.proceed();
				String signatureNm = joinPoint.getSignature().getName();
				if("popup".equals(loginCheck.resultType())) {
					if(result instanceof ModelAndView) {
						modelAndView = (ModelAndView)result;
						//가맹본사 참여하기는 브랜드 관리자만 가능
						if("ownerRegSave".equals(signatureNm) && !"US03".equals(userVO.getUserSeCode())) {
							modelAndView.addObject("authTxt", "예비창업자/자영업자/컨설턴트/기관관리자는<br> 가맹본사 참여하기 기능을 사용 할 수 없습니다.");
							modelAndView.setViewName("/ui/common/authInfoPopup");
						}else if("ownerReqSaveResult".equals(signatureNm) && !"US01".equals(userVO.getUserSeCode())) {
							modelAndView.addObject("authTxt", "컨설턴트/기관관리자/가맹정본사관리는<br> 프랜차이즈 체 참여하기 기능을 사용 할 수 없습니다.");
							modelAndView.setViewName("/ui/common/authInfoPopup");
						}
					}
				} else if("US01".equals(loginCheck.resultType())) {
					if(result instanceof ModelAndView) {
						modelAndView = (ModelAndView)result;
						//일반사용자만 가능하도록
						if(!"US01".equals(userVO.getUserSeCode())) {
							modelAndView.addObject("authTxt", "컨설턴트/기관관리자/브랜드 본사 관리자는<br> 매물정보 등록 기능을 사용 할 수 없습니다.");
							modelAndView.addObject("closeLink", "/board/trade/tradeList.do");
							//modelAndView.setViewName("/ui/common/authInfoPopup");
						}
					}


				}
				//권한 체크
//				logger.debug("권한체크=========");
//				logger.debug(checkAuth(userVO, signatureNm));
			}

		} catch (Throwable e ) {
			throw e;
		}
		logger.debug("==== LoginCheckAOP loginCheck end ====");
		return result;
	}

	public String checkAuth(UserVO userVO, String signatureNm) {
		String returnStr = "";
		try {
			List<EgovMap> authList = userDao.selectUserAuthorList(userVO);
			for(EgovMap authMap : authList) {
				String tmpStr = "";
				if(authMap.get("menuUrl").toString().indexOf(signatureNm) > -1) {
					if("AC01".equals(authMap.get("authorCode")) && "N".equals(authMap.get("authorAt"))) {
						//조회권한
						tmpStr = authMap.get("authorCodeNm") + "권한이 없습니다.";
					}else if("AC02".equals(authMap.get("authorCode")) && "N".equals(authMap.get("authorAt"))) {
						//신청권한
						tmpStr = authMap.get("authorCodeNm") + "권한이 없습니다.";
					}else if("AC03".equals(authMap.get("authorCode")) && "N".equals(authMap.get("authorAt"))) {
						//쓰기권한
						tmpStr = authMap.get("authorCodeNm") + "권한이 없습니다.";
					}else if("AC04".equals(authMap.get("authorCode")) && "N".equals(authMap.get("authorAt"))) {
						//관심담기권한
						tmpStr = authMap.get("authorCodeNm") + "권한이 없습니다.";
					}else if("AC05".equals(authMap.get("authorCode")) && "N".equals(authMap.get("authorAt"))){
						//삭제권한
						tmpStr = authMap.get("authorCodeNm") + "권한이 없습니다.";
					}
				}
				returnStr = tmpStr;
			}

		} catch (DataAccessException | SQLException e) {
			logger.debug("checkAuth 에러 발생");
		}
		return returnStr;
	}
}
