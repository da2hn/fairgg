package gov.ggdo.frnchs.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Constants {
	//로컬
	//public static final String ROOT_PATH = "C://franchs/";//윈도우
//	public static final String ROOT_PATH = "/Users/macbook/Documents/franchs/";//맥(/Users/사용자명/Documents/franchs/

	//개발
//	public static final String ROOT_PATH = "/home/openmate/franchs/";

	//운영
	//public static final String ROOT_PATH = "/Users/macbook/Documents/franchs/";

	public static final String RESULT_CODE 		= "resultCode";
	public static final String RESULT_SUCCESS 	= "success";			/* 결과 성공 */
	public static final String RESULT_FAIL		= "fail";				/* 결과 실패 */
	public static final String RESULT_NO_AUTH	= "noAuth";				/* 로그인 정보 없음 */

	public static final String RESULT_DATA      = "resultData";
	public static final String RESULT_MESSAGE 	= "resultMsg";

	public static final String DOWN_FILE_NAME = "downFileName";
	public static final String DOWN_FILE_SIZE = "downFileSize";
	public static final String DOWN_FILE = "downFile";

//	public static final String FILE_REPOSITORY_UPLOAD_PATH = ROOT_PATH+"fileRepository/upload";

//	public static final String FILE_REPOSITORY_TMP_PATH = ROOT_PATH+"fileRepository/tmp";

	public static final int FILE_BUFFER_SIZE = 10000;

	public static final String AES_SECRET_KEY = "!franchs1234franchs";

	//public static final String REPOSITORY_ROOT_PATH = "/NFS_FS/";	// 프로젝트 환경에 맞게 설정

	public static List<Map<String, Object>> POPUP_LIST = new ArrayList<Map<String, Object>>();

	public static final String DOWN_EXCEL_FILE_NAME = "downExcelFileName";
	public static final String DOWN_EXCEL_FILE = "downExcelFile";
}
