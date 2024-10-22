package gov.ggdo.frnchs.common.log;

import java.lang.reflect.Field;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ReflectionUtils.FieldCallback;

/**
 * @Class Name : LoggerPostProcessor.java
 * @Description : 
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
@Component
public class LoggerPostProcessor implements BeanPostProcessor {
	
	public Object postProcessAfterInitialization(Object bean, String beanName)
			throws BeansException {
		return bean;
	}

	public Object postProcessBeforeInitialization(final Object bean, String beanName)
			throws BeansException {		
				
		ReflectionUtils.doWithFields(bean.getClass(), new FieldCallback(){

			public void doWith(Field field) throws IllegalArgumentException,
					IllegalAccessException {
				ReflectionUtils.makeAccessible(field);
				if(field.getAnnotation(Log.class) != null){
					//Log logAnnotation = field.getAnnotation(Log.class);
					Logger logger = LoggerFactory.getLogger(bean.getClass());
					field.set(bean, logger);
				}
			}});
		return bean;
	}
}
