package gov.ggdo.frnchs.common.interceptor;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.dao.DataAccessException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.sun.mail.iap.BadCommandException;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;


/**
 * @Class Name : CommonInterceptor.java
 * @Description : 컨트롤러 수행 전후 처리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 20.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 20.
 * @version 1.0
 * @see
 *
 *  
 */
public class CommonInterceptor implements HandlerInterceptor {

	@Log Logger logger;


	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException, ParseException{

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException, ParseException{
		modelAndView.addObject("contextPath", request.getContextPath());
		modelAndView.addObject("currMenuId", request.getParameter("menuId"));
		List<Map<String, Object>> popupList = new ArrayList<Map<String, Object>>(); 
//		if(!request.getRequestURI().contains("/sysMngr") && !request.getRequestURI().contains(".ajax") && !request.getRequestURI().contains("geoData.do")) { // 관리자와 ajax 제외 - 21.01.11, geoData.do 제외 - 21.04.02
			long endTime = System.currentTimeMillis();
			logger.debug("requestURI is ["+request.getRequestURI()+"] endTime time is ["+endTime+"] ms");
			logger.debug(">>>> menuId:"+request.getParameter("menuId")+", menuCode:"+request.getParameter("menuCode"));
			logger.debug(">>>> uri:"+request.getRequestURI());
			logger.debug(">>>> sz:"+Constants.POPUP_LIST.size());
			
			for (Map<String, Object> popup : Constants.POPUP_LIST) {
				logger.info(">>>> menuUrl:"+popup.get("menuUrl"));
				if(request.getRequestURI().equals(popup.get("menuUrl")) 
					|| popup.get("menuCode").equals(request.getParameter("menuId"))
					|| (popup.get("menuCode").equals("main") && Arrays.asList(new String[] {"/","/index.do"}).contains(request.getRequestURI())) // 메인 영역 추가 - 21.02.08
					|| (popup.get("menuCode").equals("all") ) // 전체팝업 추가 - 21.12.20
				) {
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					long nowDate = new Date().getTime();
					long startDate = format.parse(popup.get("ntceBeginDe")+" 00:00:00").getTime();
					long endDate = format.parse(popup.get("ntceEndDe")+" 23:59:59").getTime();
					if(startDate < nowDate && endDate > nowDate) {
						popupList.add(popup);
					}
				}
			}
//		} else {
//			logger.debug(">>> sysMngr popup except");
//		}
		modelAndView.addObject("popupList", popupList);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException, ParseException{

	}

}
