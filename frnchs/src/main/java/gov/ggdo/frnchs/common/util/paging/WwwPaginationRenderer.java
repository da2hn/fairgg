package gov.ggdo.frnchs.common.util.paging;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ServletContextAware;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

/**
 * ImagePaginationRenderer.java 클래스
 */
public class WwwPaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{
   private static final Logger LOGGER = LoggerFactory.getLogger(WwwPaginationRenderer.class);

   private ServletContext servletContext;

   public WwwPaginationRenderer() {
   }

   public void initVariables(){
//	   firstPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"prev2\" >처음</a>&#160;";
//	   previousPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"prev\" >이전</a>&#160;";
//	   currentPageLabel = "<strong>{0}</strong>&#160;";
//	   otherPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\">{2}</a>&#160;";
//	   nextPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"next\" >다음</a>&#160;";
//	   lastPageLabel = "<a href=\"javascript:void(0);\" onclick=\"{0}({1}); return false;\" class=\"next2\" >끝</a>&#160;";

	   firstPageLabel = "<a title=\"처음 리스트\" href=\"javascript:void(0)\" onclick=\"{0}({1}); return false;\" class=\"first\">처음으로</a>&#160;";
	   previousPageLabel = "<a title=\"이전 리스트\" href=\"javascript:void(0)\" onclick=\"{0}({1}); return false;\" class=\"prev\">이전</a>&#160;";
	   currentPageLabel = "<a title=\"현재페이지\" href=\"javascript:void(0)\" class=\"selected\">{0}</a>&#160;";
	   otherPageLabel = "<a title=\"{1} 페이지\" href=\"javascript:void(0)\" onclick=\"{0}({1}); return false;\">{2}</a>&#160;";
	   nextPageLabel = "<a title=\"다음 리스트\" href=\"javascript:void(0)\"  onclick=\"{0}({1}); return false;\" class=\"next\">다음</a>&#160;";
	   lastPageLabel = "<a title=\"마지막 리스트\" href=\"javascript:void(0)\"  onclick=\"{0}({1}); return false;\" class=\"last\">마지막으로</a>&#160;";

   }



   public void setServletContext(ServletContext servletContext) {
      this.servletContext = servletContext;
      LOGGER.debug(this.servletContext.getContextPath());
      initVariables();
   }

}