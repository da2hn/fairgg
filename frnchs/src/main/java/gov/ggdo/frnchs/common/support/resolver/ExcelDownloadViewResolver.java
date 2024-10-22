package gov.ggdo.frnchs.common.support.resolver;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;

import gov.ggdo.frnchs.common.Constants;

/**
 * @Class Name : ExcelDownloadViewResolver.java
 * @Description : 엑셀 다운로드 Resolver
 * @Modification Information
 * @
 * @  수정일      	수정자             	수정내용
 * @ ----------	-----------	-------------------------------
 * @ 2021.01.18 HJP			최초생성
 *
 * @author HJP
 * @since 2021.01.18
 * @version 1.0
 * @see
 *
 *  
 */
//@Component("excelDownView")
public class ExcelDownloadViewResolver extends AbstractView {
//public class ExcelDownloadViewResolver {

	public ExcelDownloadViewResolver() {
		setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> paramMap,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, FileNotFoundException {
		
		XSSFWorkbook workbook = (XSSFWorkbook) paramMap.get(Constants.DOWN_EXCEL_FILE);
		String fileName = (String) paramMap.get(Constants.DOWN_EXCEL_FILE_NAME);
		
		fileName = URLEncoder.encode(fileName, "utf-8");

		OutputStream out = null;
		try{
	        response.setHeader("Content-Disposition", "attachment;filename="+fileName+".xlsx");
//	        response.setContentType("application/vnd.ms-excel; charset=utf-8");
//	        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8");
	        out = response.getOutputStream();
	        workbook.write(out);
		} catch(NullPointerException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error NullPointerException");
		} catch(RuntimeException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error RuntimeException");
		} finally {
			if (out != null) {
				out.flush();
				out.close();
			}
		    response.getOutputStream().flush();
		    response.getOutputStream().close();
		}
	}
	
}
