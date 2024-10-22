package gov.ggdo.frnchs.common.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

/**
 *
 * @author 공통서비스 개발팀 서준식
 * @since 2011. 6. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * 개정이력(Modification Information)
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011. 8. 12.    서준식        최초생성
 *
 *  </pre>
 */

public class EgovUserDetailsSessionServiceImpl implements EgovUserDetailsService {
	private static final Logger logger = LoggerFactory.getLogger(EgovUserDetailsSessionServiceImpl.class);

	public Object getAuthenticatedUser() {
		if (RequestContextHolder.getRequestAttributes() == null || RequestContextHolder.getRequestAttributes().getAttribute("user", RequestAttributes.SCOPE_SESSION) == null) {
			return null;
		}
		logger.debug("SCOPE_SESSION");
		logger.debug(RequestContextHolder.getRequestAttributes().getAttribute("user", RequestAttributes.SCOPE_SESSION).toString());
		return RequestContextHolder.getRequestAttributes().getAttribute("user", RequestAttributes.SCOPE_SESSION);

	}

	public List<String> getAuthorities() {

		// 권한 설정을 리턴한다.
		List<String> listAuth = new ArrayList<String>();
		listAuth.add("ROLE_USER");

		return listAuth;
	}

	public Boolean isAuthenticated() {
		// 인증된 유저인지 확인한다.

		if (RequestContextHolder.getRequestAttributes() == null) {
			return false;
		} else {

			if (RequestContextHolder.getRequestAttributes().getAttribute("user", RequestAttributes.SCOPE_SESSION) == null) {
				return false;
			} else {
				return true;
			}
		}

	}

}
