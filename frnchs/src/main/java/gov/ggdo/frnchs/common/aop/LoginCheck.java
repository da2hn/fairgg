package gov.ggdo.frnchs.common.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @Class Name : LoginCheck.java
 * @Description : 사용자 로그인 체크를 하는 Annotation
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
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginCheck {
	String resultType() default "json";
}
