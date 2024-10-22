package gov.ggdo.frnchs.common.support.resolver;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.view.AbstractView;

import gov.ggdo.frnchs.common.Constants;

/**
 * @Class Name : FileDownloadViewResolver.java
 * @Description : 파일 다운로드 Resolver
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
public class FileDownloadViewResolver extends AbstractView {

	public FileDownloadViewResolver() {
		setContentType("application/download; charset=utf-8");
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> paramMap,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		File file = (File) paramMap.get(Constants.DOWN_FILE);
		String fileName = (String) paramMap.get(Constants.DOWN_FILE_NAME);

		setDisposition(fileName, request, response);

		fileName = URLEncoder.encode(fileName, "utf-8");

		response.setContentLength((int) file.length());
		OutputStream out = response.getOutputStream();
		FileInputStream fis = null;
		try{
			fis = new FileInputStream(file);
			FileCopyUtils.copy(fis, out);
		} catch(IOException e) {
			logger.error("IOException", e);
		} finally {
			if(fis != null){
				try{
					fis = new FileInputStream(file);
					FileCopyUtils.copy(fis, out);
				}catch(IOException ex){

					if(fis != null){
						fis.close();
						fis = null;
					}

					logger.error("IOException", ex);
				}
			}
			out.flush();
			out.close();
		}
	}


	   /**
     * Disposition 지정하기.
     *
     * @param filename
     * @param request
     * @param response
     * @throws IOException
     * @throws RuntimeException
     */
    private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response) throws IOException, RuntimeException{
		String browser = getBrowser(request);

		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;

		if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("MSIE") || browser.equals("Chrome") || browser.equals("Trident") || browser.equals("OTHER")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			throw new IOException("Not supported browser");
		}

		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);

		if ("Opera".equals(browser)){
			response.setContentType("application/octet-stream;charset=UTF-8");
		// 익스에서 비디오 타입을 줘서 다운로드/영상 분기 - 21.06.25
		} else if (("MSIE".equals(browser) || "Trident".equals(browser))&& !StringUtils.isEmpty(request.getParameter("type")) && "video".equals(request.getParameter("type"))){
			response.setContentType("video/mp4;charset=UTF-8");
		}
    }



    /**
     * 브라우저 구분 얻기.
     *
     * @param request
     * @return
     */
    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header != null) {
            if (header.indexOf("MSIE") > -1) {
                return "MSIE";
            } else if (header.indexOf("Trident") > -1) {	// IE11 문자열 깨짐 방지
                return "Trident";
            } else if (header.indexOf("Chrome") > -1) {
                return "Chrome";
            } else if (header.indexOf("Opera") > -1) {
                return "Opera";
            }
            return "Firefox";
        } else {
        	return "OTHER";
        }

    }
}
