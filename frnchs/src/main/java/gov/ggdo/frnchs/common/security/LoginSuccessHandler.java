package gov.ggdo.frnchs.common.security;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		SecurityContextHolder.getContext().setAuthentication(authentication);

		ObjectMapper om = new ObjectMapper();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", "success");
		map.put("returnUrl", getReturnUrl(request));

		String jsonString = om.writeValueAsString(map);

		OutputStream out = response.getOutputStream();
		out.write(jsonString.getBytes());


	}

	/**
	 * 로그인 후 URL 위치 - HJP 20.12.14
	 * 로그인페이지 이전 페이지 이동 처리 - 21.01.07
	 * @param request
	 * @param response
	 * @return
	 */
	private String getReturnUrl(HttpServletRequest request) {
		HttpSession session = request.getSession();
//        if (session != null) {
//            String returnUrl = (String) session.getAttribute("prevPage");
//            if (returnUrl != null) {
//                session.removeAttribute("prevPage");
//                return returnUrl;
//            }
//        }
        return "/"; // 메인페이지
	}


}
