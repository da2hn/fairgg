package gov.ggdo.frnchs.common.util.paging;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ServletContextAware;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

/**
 * ImagePaginationRenderer.java 클래스
 */
public class AdminPaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{
   private static final Logger LOGGER = LoggerFactory.getLogger(AdminPaginationRenderer.class);

   private ServletContext servletContext;

   public AdminPaginationRenderer() {
   }

   public void initVariables(){
	   firstPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"first\" >처음</a>&#160;";
	   previousPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"prev\" >이전</a>&#160;";
	   currentPageLabel = "<a href=\"javascript:void(0);\" class=\"selected\" >{0}</a>&#160;";
	   otherPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\">{2}</a>&#160;";
	   nextPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"next\" >다음</a>&#160;";
	   lastPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"last\" >끝</a>&#160;";
//	   <a href="###" class="first">처음으로</a>
//		<a href="###" class="prev">이전</a>
//		<a href="###">1</a>
//		<a href="###" class="selected">2</a>
//		<a href="###">3</a>
//		<a href="###">4</a>
//		<a href="###">5</a>
//		<a href="###" class="next">다음</a>
//		<a href="###" class="last">마지막으로</a>
   }



   public void setServletContext(ServletContext servletContext) {
      this.servletContext = servletContext;
      LOGGER.debug(this.servletContext.getContextPath());
      initVariables();
   }

}