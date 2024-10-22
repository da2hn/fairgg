package gov.ggdo.frnchs.common.security;

import gov.ggdo.frnchs.common.log.Log;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginFailureHandler implements AuthenticationFailureHandler {
	@Log Logger logger;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		ObjectMapper om = new ObjectMapper();

		Map<String, Object> map = new HashMap<String, Object>();
		if(exception.toString().contains("BadCredentialsException") || exception.toString().contains("UsernameNotFoundException")) {
			map.put("result", "errorUser");
		} else if(exception.toString().contains("DisabledException")) {
			map.put("result", "errorNotAllow");
		} else {
			map.put("result", "error");
		}
		map.put("msg", exception.getMessage());
		
		// {"success" : false, "message" : "..."}
		String jsonString = om.writeValueAsString(map);
		logger.debug(">>> loggin fail : "+exception.getMessage()+"-"+exception.toString());
		OutputStream out = response.getOutputStream();
		out.write(jsonString.getBytes());

	}

}