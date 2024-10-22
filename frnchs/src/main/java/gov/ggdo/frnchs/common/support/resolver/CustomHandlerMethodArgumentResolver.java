package gov.ggdo.frnchs.common.support.resolver;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.security.EgovUserDetailsHelper;
import gov.ggdo.frnchs.common.security.UserVO;


/**
 * @Class Name : CustomHandlerMethodArgumentResolver.java
 * @Description : GirsParam HttpServletRequest 파라미터외 세션정보를 파라미터로 전달
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
public class CustomHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public Object resolveArgument(MethodParameter parameter,
			ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
			WebDataBinderFactory binderFactory) throws IOException, RuntimeException, IndexOutOfBoundsException {

		HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
		@SuppressWarnings("rawtypes")
		Enumeration attributes = request.getParameterNames();
		Map<String, Object> map = new HashMap<String, Object>();

		while (attributes.hasMoreElements()) {
			String name = attributes.nextElement().toString();
			Object value = request.getParameter(name);
			map.put(name, value);
		}

		UserVO userVO = (UserVO)EgovUserDetailsHelper.getAuthenticatedUser();
		if (userVO != null) {
			map.put("ssUserNo",  			userVO.getUserNo());
			map.put("ssUserNm",  			userVO.getUserNm());
			map.put("ssAuthorities",  		userVO.getAuthorities());
			map.put("ssAuthority",  		userVO.getAuthority());
			map.put("ssUserSeCode", 		userVO.getUserSeCode());
			map.put("ssDeptNm",				userVO.getDeptNm());
			map.put("ssEmailAdres", 		userVO.getEmailAdres());
		}
		map.put("userIp",  			request.getRemoteHost());

		return map;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		ReqParam param = parameter.getParameterAnnotation(ReqParam.class);
		if (param != null) {
			return true;
		} else {
			return false;
		}
	}

}
