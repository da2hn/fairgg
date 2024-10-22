package gov.ggdo.frnchs.common.security;

import gov.ggdo.frnchs.common.log.Log;
import org.slf4j.Logger;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import lombok.extern.slf4j.Slf4j;
 
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	@Log Logger log;
	
	@Override
	public void handle(HttpServletRequest request,  HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
		 
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		response.setCharacterEncoding("UTF-8");
		
		if(isAjaxRequest(request)){
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			log.debug(">>> SC_BAD_REQUEST");
		}else{
			response.sendRedirect("/main/main.do");
			log.debug(">>> ajax아님");
		}
	}
	
	private boolean isAjaxRequest(HttpServletRequest req) {
		log.debug(">>> ajax str:"+req.getHeader("AJAX")+", x-requested-with:"+req.getHeader("x-requested-with"));
		return "XMLHttpRequest".equals(req.getHeader("x-requested-with")) || req.getHeader("AJAX") != null && req.getHeader("AJAX").equals(Boolean.TRUE.toString());
	}
 
}