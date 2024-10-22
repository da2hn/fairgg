package gov.ggdo.frnchs.common.security;

import java.util.Base64;
import java.util.Collection;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.login.LoginService;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
	@Log Logger logger;
//	private static final log log = logFactory.getlog(CustomAuthenticationProvider.class);

	@Autowired
	private LoginService loginService;

	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String userId = authentication.getName();
		String password = (String) authentication.getCredentials();
		
		byte[] decodeId = Base64.getDecoder().decode(userId);
		byte[] decodePw = Base64.getDecoder().decode(password);
		userId = new String(decodeId);
		password = new String(decodePw);
		
		Collection<? extends GrantedAuthority> authorities;
		UserVO user = null;
		try {
			user = loginService.loadUserByUsername(userId);

			String hashedPassword = bcryptPasswordEncoder.encode(password);

			logger.debug("userId : " + userId + " / password : " + password + " / hash password : " + hashedPassword);
			logger.debug("username : " + user.getUsername() + " / confmSttusCode : " + user.getConfmSttusCode());
			
			if (!bcryptPasswordEncoder.matches(password, user.getPassword())){
				throw new BadCredentialsException("ID나 비밀번호가 틀렸습니다.\r\n다시 확인해주세요.");
			}
			
			// 일반사용자 예외 - 20.12.16
			if(!"US01".equals(user.getUserSeCode())) {
				// 승인퀀한 추가 - HJP 20.12.14
				if ("CS02".equals(user.getConfmSttusCode())){
					throw new DisabledException("승인이 반려되었습니다.\r\n담당자에게 문의하세요.");
				} else if ("CS03".equals(user.getConfmSttusCode())){
					throw new DisabledException("승인되지 않은 계정입니다.\r\n다시 확인해주세요.");
				}
			}
			
			authorities = user.getAuthorities();
			RequestContextHolder.getRequestAttributes().setAttribute("user", user, RequestAttributes.SCOPE_SESSION);
		} catch(UsernameNotFoundException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UsernameNotFoundException Occured");
			throw new UsernameNotFoundException("이메일이나 비밀번호가 틀렸습니다.\r\n다시 확인해주세요."); // 이전 접근성시 문구 재수정 - 21.06.29
		} catch(BadCredentialsException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method BadCredentialsException Occured");
			throw new BadCredentialsException("이메일이나 비밀번호가 틀렸습니다.\r\n다시 확인해주세요."); // 이전 접근성시 문구 재수정 - 21.06.29
		} catch(DisabledException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method DisabledException Occured");
			// 이전 접근성시 문구 재수정 - 21.06.29
			if ("CS02".equals(user.getConfmSttusCode())){
				throw new DisabledException("승인이 반려되었습니다.\r\n담당자에게 문의하세요.");
			} else if ("CS03".equals(user.getConfmSttusCode())){
				throw new DisabledException("승인되지 않은 계정입니다.\r\n다시 확인해주세요.");
			} else {
				throw new DisabledException("오류가 발생했습니다");
			}
		} catch(RuntimeException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method RuntimeException Occured");
			throw new RuntimeException("오류가 발생했습니다");
		}
		
		return new UsernamePasswordAuthenticationToken(user, password, authorities);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
//		return false;
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}