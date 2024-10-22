package gov.ggdo.frnchs.common.log;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @Class Name : Log.java
 * @Description : 로그출력 Annotion
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
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {

}
