package gov.ggdo.frnchs.common.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
//	@Log Logger logger;
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setCharacterEncoding("UTF-8");
		
		if(isAjaxRequest(request)){
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		}else{
			response.sendRedirect("/");
		}
	}
	private boolean isAjaxRequest(HttpServletRequest req) {
//		logger.debug(">>> ajax11:"+req.getHeader("AJAX"));
//		return req.getHeader("AJAX") != null && req.getHeader("AJAX").equals(Boolean.TRUE.toString());
		System.out.println(">>> ajax str:"+req.getHeader("AJAX")+", x-requested-with:"+req.getHeader("x-requested-with"));
		return "XMLHttpRequest".equals(req.getHeader("x-requested-with")) || req.getHeader("AJAX") != null && req.getHeader("AJAX").equals(Boolean.TRUE.toString());
	}
 
}