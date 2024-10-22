package gov.ggdo.frnchs.common.aop;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ibm.icu.util.Calendar;

import gov.ggdo.frnchs.common.aop.service.LoggerService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.security.EgovUserDetailsHelper;
import gov.ggdo.frnchs.common.security.UserVO;
import gov.ggdo.frnchs.common.util.detector.BrowserDetector;
import gov.ggdo.frnchs.common.util.detector.RefererDetector;
import gov.ggdo.frnchs.common.util.detector.UserAgentDetector;

@Component
@Aspect
public class LoggerAOP {

	@Log Logger logger;
	@Autowired LoggerService loggerService;

	@Pointcut("execution(* gov.ggdo.frnchs.ui..controller.*Controller.*(..))") // 이런 패턴이 실행될 경우 수행
	public void loggerPointCut() {
	}

	@Around("loggerPointCut()")
	public Object methodLogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

		Object result = null;
		// request 정보를 가져온다.
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
//		System.out.println(">>> jsession:"+request.getSession().getId());
		if(!request.getRequestURI().contains(".ajax")) { // ajax 제외 - 21.01.11
			try {
				try {
					Calendar today = Calendar.getInstance();
					RefererDetector refererDetector = new RefererDetector();
					BrowserDetector browserDetector = new BrowserDetector(request.getHeader("user-agent"));
					Map<String, Object> paramMap = new HashMap<String, Object>();
					paramMap.put("connYear", today.get(Calendar.YEAR));					//접속연도
					paramMap.put("connMonth", today.get(Calendar.MONTH)+1);				//접속월
					paramMap.put("connDay", today.get(Calendar.DAY_OF_MONTH)+1);		//접속일
					paramMap.put("connHour", today.get(Calendar.HOUR_OF_DAY));			//접속시간
					paramMap.put("connMin", today.get(Calendar.MINUTE));				//접속분
					paramMap.put("connSec", today.get(Calendar.SECOND));				//접속초
					paramMap.put("conectrIp", request.getRemoteAddr());					//접속자 IP
					paramMap.put("conectrEnvrn", request.getHeader("user-agent"));			//접속사용자환경
					paramMap.put("conectrInflowCours", request.getHeader("referer"));				//접속자유입경로
					if (StringUtils.indexOf(request.getHeader("referer"), request.getServerName()) != -1) {
						paramMap.put("refererSiteNm", request.getServerName());			//접속자 유입경로 사이트명
					} else {
						paramMap.put("refererSiteNm", refererDetector.getRefererSiteName(request.getHeader("referer")));	//접속자 유입경로 사이트 명
					}
					paramMap.put("conectrBrwsrNm", browserDetector.getBrowserName()); 			//접속자 브라우저명
					paramMap.put("conectrBrwsrVer", browserDetector.getBrowserVersion());	//접속자 브라우저 버전
					paramMap.put("conectrBrwsrPltfom", browserDetector.getBrowserPlatform());	//접속자 브라우저 플랫폼
	
					UserAgentDetector userAgentDetector = new UserAgentDetector(request.getHeader("user-agent"), request.getHeader("accept"));
	
					//스마트폰
					if (userAgentDetector.detectSmartphone()) {
						paramMap.put("conectrDeviceSe", "PHONE");							//접속자 디바이스 구분
						paramMap.put("conectrDeviceNm", userAgentDetector.getDeviceName());	//접속자 디바이스 명
					//테블릿
					} else if (userAgentDetector.detectSmartphone()) {
						paramMap.put("conectrDeviceSe", "TABLET");							//접속자 디바이스 구분
						paramMap.put("conectrDeviceNm", userAgentDetector.getDeviceName());	//접속자 디바이스 명
					//PC
					} else {
						paramMap.put("conectrDeviceSe", "PC");								//접속자 디바이스 구분
						paramMap.put("conectrDeviceNm", "PC");									//접속자 디바이스 명
					}
					paramMap.put("conectrAct", request.getRequestURI());					//사용자 액션 url
	
					//사용자 액션 url로 메뉴명을 알 수 있다면 구현 바람
	
	
					//동일 접속사용자 구분
					HttpSession session = request.getSession();
					String jSessionId = session.getId();
					paramMap.put("sesionId", jSessionId);
	
	
					//로그인ID 입력 구현
					UserVO userVO = (UserVO)EgovUserDetailsHelper.getAuthenticatedUser();
					if(userVO != null) {
						paramMap.put("loginId", userVO.getUserNo());						
					} else {
						paramMap.put("loginId", 0);		
					}
	
	
					//접속일시
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String connDt = dateFormat.format(new Date());
					paramMap.put("conectDt", connDt);		//sysdate 로 처리할 수 있음 그렇게 해도 됨
	
					//여기에 로그 입력 서비스 호출 구현
					loggerService.insertMethodLog(paramMap);
				} catch (DataAccessException e) {
					logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method DataAccessException Occured");
				} catch (SQLException e) {
					logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method SQLException Occured");
				}
				Signature signature = proceedingJoinPoint.getSignature();
				String signatureNm = signature.getName();
				long startTime = System.currentTimeMillis();
				long endTime = System.currentTimeMillis();
				long processTime = endTime-startTime;
	
				logger.debug("requestURI["+request.getRequestURL()+"] ["+signatureNm+"] processTime is ["+processTime+"] ms");
			} catch (NullPointerException e) {
				logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NullPointerException Occured");
			} catch (RuntimeException e) {
				logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method RuntimeException Occured");
			}
		} else {
			logger.debug(">>>> aop ajax except");
		}
		result = proceedingJoinPoint.proceed();
		return result;
	}

}
