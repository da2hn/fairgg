package gov.ggdo.frnchs.common.support.resolver;

import java.util.ArrayList;

import org.springframework.web.method.annotation.MapMethodProcessor;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

public class CustomRequestMappingHandlerAdator extends RequestMappingHandlerAdapter {
	
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		if (getArgumentResolvers() != null) {
			ArrayList<HandlerMethodArgumentResolver> 
			list = new ArrayList<HandlerMethodArgumentResolver>(getArgumentResolvers());
			
			MapMethodProcessor mapMethodProcessor = null;
			
			int size = list.size();
			for (int i = 0; i < size; i++) {
				HandlerMethodArgumentResolver resolver = list.get(i);
				if(resolver instanceof MapMethodProcessor) {
					mapMethodProcessor = (MapMethodProcessor) list.remove(i);
					break;
				}
			}
			
			if (mapMethodProcessor != null) {
				for (int i = 1; i < size; i++) {
					HandlerMethodArgumentResolver resolver = list.get(i);
					if (resolver instanceof CustomHandlerMethodArgumentResolver) {
						if (i + 1 < size) {
							list.add(i+1, mapMethodProcessor);
						} else {
							list.add(i, mapMethodProcessor);
						}
						break;
					}
				}
			}
			
			setArgumentResolvers(list);
		}
	}
}
