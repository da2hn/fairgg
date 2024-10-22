package gov.ggdo.frnchs.common.util.paging;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.dao.DataAccessException;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.mail.iap.BadCommandException;

import egovframework.rte.ptl.mvc.tags.ui.pagination.DefaultPaginationManager;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationManager;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationRenderer;

public class PagingUtils {
	
	public static Map<String, Object> setPaging(String type, String function, int resultCount, int pageSize, int recordCountPerPage, Map<String, Object> reqParam, ModelAndView mav) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(ObjectUtils.isEmpty(reqParam.get("pageIndex")) ? 1 : Integer.parseInt(reqParam.get("pageIndex").toString()));
		paginationInfo.setTotalRecordCount(resultCount);
		
		if( reqParam.containsKey("recordCountPerPage") && resultCount > 0 ) {
			
			recordCountPerPage = Integer.parseInt((String) reqParam.get("recordCountPerPage"));
		}
		paginationInfo.setPageSize(pageSize);
		paginationInfo.setRecordCountPerPage(recordCountPerPage);
//		System.out.println("############## pageSize : " + pageSize);
//		System.out.println("############## recordCountPerPage : " + recordCountPerPage);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<?, ?> paginationMap = objectMapper.convertValue(paginationInfo, Map.class);
		for ( Object key : paginationMap.keySet() ) {
			reqParam.put(key.toString(), paginationMap.get(key));
//			System.out.println(">>>> key : " + key +" / value : " + paginationMap.get(key));
		}
		
		PaginationManager paginationManager;
		// 빈 찾기
		ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        if (applicationContext.containsBean("paginationManager")) {
        	// 빈 있음
            paginationManager = (PaginationManager) applicationContext.getBean("paginationManager");
//            System.out.println(">>>> 빈 있음");
        } else {
            // 빈 없음
            paginationManager  = new DefaultPaginationManager();
//            System.out.println(">>>> 빈 없음");
        }
		PaginationRenderer paginationRenderer = paginationManager.getRendererType("admin".equals(type) ? type : "www");
		String pagingHtml = paginationRenderer.renderPagination(paginationInfo, function);
//		System.out.println(">>>> contents : " + pagingHtml);
		mav.addObject("pagingHtml", pagingHtml);
		return reqParam;
	}
	
	public static Map<String, Object> setPaging2(String type, String function, int resultCount, int pageSize, int recordCountPerPage, Map<String, Object> reqParam, ModelAndView mav, int NoticeCount) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(ObjectUtils.isEmpty(reqParam.get("pageIndex")) ? 1 : Integer.parseInt(reqParam.get("pageIndex").toString()));
		paginationInfo.setTotalRecordCount(resultCount);
		
		if( reqParam.containsKey("recordCountPerPage") && resultCount > 0 ) {
			
			recordCountPerPage = Integer.parseInt((String) reqParam.get("recordCountPerPage"));
		}
		paginationInfo.setPageSize(pageSize);
		paginationInfo.setRecordCountPerPage(recordCountPerPage - NoticeCount);
//		System.out.println("############## pageSize : " + pageSize);
//		System.out.println("############## recordCountPerPage : " + recordCountPerPage);
		ObjectMapper objectMapper = new ObjectMapper();
		Map<?, ?> paginationMap = objectMapper.convertValue(paginationInfo, Map.class);
		for ( Object key : paginationMap.keySet() ) {
			reqParam.put(key.toString(), paginationMap.get(key));
//			System.out.println(">>>> key : " + key +" / value : " + paginationMap.get(key));
		}
		
		PaginationManager paginationManager;
		// 빈 찾기
		ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
		if (applicationContext.containsBean("paginationManager")) {
			// 빈 있음
			paginationManager = (PaginationManager) applicationContext.getBean("paginationManager");
//            System.out.println(">>>> 빈 있음");
		} else {
			// 빈 없음
			paginationManager  = new DefaultPaginationManager();
//            System.out.println(">>>> 빈 없음");
		}
		PaginationRenderer paginationRenderer = paginationManager.getRendererType("admin".equals(type) ? type : "www");
		String pagingHtml = paginationRenderer.renderPagination(paginationInfo, function);
//		System.out.println(">>>> contents : " + pagingHtml);
		mav.addObject("pagingHtml", pagingHtml);
		return reqParam;
	}
	
    public static Map<String, Object> setPaging(String type, String function, int resultCount, Map<String, Object> reqParam, ModelAndView mav)throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
    	return setPaging(type, function, resultCount, 5, 10, reqParam, mav);
    }
    
    public static Map<String, Object> setPaging(String type, String function, int resultCount, Map<String, Object> reqParam, ModelAndView mav, int NoticeCount)throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
    	return setPaging2(type, function, resultCount, 5, 10, reqParam, mav, NoticeCount);
    }
    
    //정보지원게시판 > 통합게시판 페이지 7개 조회
    public static Map<String, Object> setIntegPaging(String type, String function, int resultCount, Map<String, Object> reqParam, ModelAndView mav)throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
    	return setPaging(type, function, resultCount, 5, 7, reqParam, mav);
    }

}