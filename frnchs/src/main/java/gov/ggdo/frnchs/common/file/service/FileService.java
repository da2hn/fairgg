package gov.ggdo.frnchs.common.file.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.file.dao.FileDao;
import gov.ggdo.frnchs.common.file.domain.FileVO;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;

/**
 * @Class Name : FileService.java
 * @Description : 파일 공통처리 서비스
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 21.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 21.
 * @version 1.0
 * @see
 *
 */
@Service("fileService")
@Transactional
public class FileService {

	@Log Logger logger;

	@Autowired private FileDao fileDao;
	@Autowired private EncryptService encryptService;

	private final int FILE_READ_SIZE = 16384;

	@Value("${file.rootPath}")
	private String rootPath;
	@Value("${file.fileRepositoryUploadPath}")
	private String fileRepositoryUploadPath;

	/**
	* @Method Name : selectFile
	* @Description : 파일 목록 조회
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : List<FileVO>
	* @exception :
	*/
	public List<FileVO> selectFile(Map<String, Object> paramMap)
			throws DataAccessException {
		List<FileVO> resultList = null;
		if(paramMap.get("atchmnflSttusCode") != null) {
			String atchmnflSttusCode = String.valueOf(paramMap.get("atchmnflSttusCode"));
			String[] splitAtchmnflSttusCode = atchmnflSttusCode.split(",");
			List<String> arrAtchmnflSttusCode = new ArrayList<String>();
			for (String tmpAtchmnflSttusCode : splitAtchmnflSttusCode) {
				arrAtchmnflSttusCode.add(tmpAtchmnflSttusCode);
			}
			paramMap.put("arrAtchmnflSttusCode", arrAtchmnflSttusCode);
		}
		resultList = fileDao.selectAtchmnflStreList(paramMap);
		return resultList;
	}

	/**
	* @Method Name : insertFlie
	* @Description : 파일 추가
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : BigDecimal
	* @throws NoSuchAlgorithmException
	* @exception :
	*/
	// parameterId에 따른 분기 - 21.01.25
	public String insertFlie(MultipartFile uploadFile,
			Map<String, Object> paramMap, String filePath, String parameterId, String fileCode) throws DataAccessException, IOException, NoSuchAlgorithmException {

		String fileDir = "";

		fileDir = fileRepositoryUploadPath;

		Calendar cal = Calendar.getInstance();
		String nowYear = String.valueOf(cal.get(Calendar.YEAR));
		String nowMonth =getIntToDateStr(cal.get(Calendar.MONTH), "M");
		String nowDay = getIntToDateStr(cal.get(Calendar.DATE), "D");
		parameterId = StringUtils.isEmpty(parameterId) ?  "atchmnflNo" : parameterId; // parameterId에 따른 수정 - 21.01.25
		// null을 string으로 바꿔서 빈값 체크 안하는 문제 수정 - 21.01.06
		// parameterId에 따른 returnNo로 변경 - 21.01.25
		String returnNo = ObjectUtils.isEmpty(paramMap.get(parameterId)) ? "" : paramMap.get(parameterId).toString();

		//db파일키
		if (!StringUtils.isNotBlank(returnNo)) {
			returnNo = fileDao.selectAtchmnflStreNextSeq();
		}
		paramMap.put(parameterId, returnNo);
		fileDir += File.separator+nowYear+File.separator+nowMonth+File.separator+nowDay;
		String fileNm = returnNo+"_"+System.currentTimeMillis();
		String saveFilePath = fileDir+File.separator+fileNm;
		// 파일코드 분리 - 21.01.26
		fileCode = StringUtils.isEmpty(fileCode) ? "FS01" : ("FS01".equals(fileCode) || "FS02".equals(fileCode) || "FS03".equals(fileCode) ? fileCode : "FS01");
		logger.debug("fileCode :: " + fileCode);
		//디렉토리 생성
		File dir = new File(fileDir);
		if (!dir.exists()) {
			dir.setExecutable(false, true);
			dir.setReadable(true);
			dir.setWritable(false, true);
			dir.mkdirs();
		}
		String uploadFileNm = uploadFile.getOriginalFilename();

		BigDecimal fileSize = new BigDecimal(uploadFile.getSize());
		writeUploadFile(uploadFile, fileNm, saveFilePath);
		String hashcd = extractFileHash(saveFilePath);

		logger.debug("returnNo :: " + returnNo);
		logger.debug("uploadFileNm :: " + uploadFileNm);
		logger.debug("fileNm :: " + fileNm);
		logger.debug("saveFilePath :: " + saveFilePath);
		logger.debug("fileSize :: " + fileSize);
		logger.debug("extractFileHash(saveFilePath) :: " + hashcd);

		paramMap.put("inputFileNm", uploadFileNm);
		paramMap.put("fileSize", fileSize);
		paramMap.put("fileServerCours", saveFilePath);
		paramMap.put("atchmnflSttusCode", fileCode);
		paramMap.put("hashcd", hashcd);

		// atchmnflNo 때문에 전용 맵으로 분기 처리 - 21.01.25
		Map<String, Object> insertMap = new HashMap<String, Object>();
		insertMap.put("atchmnflNo", returnNo);
		insertMap.put("inputFileNm", uploadFileNm);
		insertMap.put("fileSize", fileSize);
		insertMap.put("fileServerCours", saveFilePath);
		insertMap.put("atchmnflSttusCode", fileCode);
		insertMap.put("hashcd", hashcd);
		fileDao.insertAtchmnflStre(insertMap);

		return returnNo;
	}
	// 파라미터에 따른 분기 - 21.01.25
	public String insertFlie(MultipartFile uploadFile, Map<String, Object> paramMap, String filePath) throws DataAccessException, IOException, NoSuchAlgorithmException {
		return insertFlie(uploadFile, paramMap, filePath, null, null);
	}
	/**
	 * <PRE>
	 * 1. MethodName : deleteFile
	 * 2. ClassName  : FileServiceImpl
	 * 3. Comment   : 파일 삭제
	 * 4. 작성자    : JasonShin
	 * 5. 작성일    : 2016. 7. 25. 오후 8:45:58
	 * </PRE>
	 *   @param paramMap
	 *   @return
	 *   @throws HException
	 */

	public int deleteFile(Map<String, Object> paramMap) throws DataAccessException {
		int result = 0;
		String delFileSn = String.valueOf(paramMap.get("delFileSn"));
		String[] splitDeldelFileSn = delFileSn.split(",");
		List<String> arrDelFileSn = new ArrayList<String>();
		for (String fileSn : splitDeldelFileSn) {
			arrDelFileSn.add(fileSn);
		}
		paramMap.put("arrFileSn", arrDelFileSn);
		paramMap.put("atchmnflSttusCode", "FS03");
		result = fileDao.updateStatCd(paramMap);
		return result;
	}



	/**
	* @Method Name : deleteFileByatchmnflNo
	* @Description : 파일 ID에 해당하는 파일을 삭제 처리합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : int
	* @exception :
	*/
	// 파일아이디에 따른 분기 - 21.01.25
	public int deleteFileByatchmnflNo(Map<String, Object> paramMap, String fileNoId) throws DataAccessException {
		if (paramMap.get(fileNoId) == null || "".equals(paramMap.get(fileNoId))) {
			return 0;
		}
		paramMap.put("atchmnflNo", paramMap.get(fileNoId)); // no값 설정 - 21.01.25
		paramMap.put("atchmnflSttusCode", "FS03"); // 코드로 수정 - 21.01.04
		int result = 0;
		result = fileDao.updateStatCd(paramMap);
		return result;
	}
	// 파라미터에 따른 분기시 에러없이 처리 - 21.01.25
	public int deleteFileByatchmnflNo(Map<String, Object> paramMap) throws DataAccessException {
		return deleteFileByatchmnflNo(paramMap, "atchmnflNo");
	}

	/**
	* @Method Name : writeUploadFile
	* @Description : MultipartFile 파일을 서버 저장소에 저장
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : void
	* @exception :
	*/
	private void writeUploadFile(MultipartFile file, String fileNm, String filePath) throws IOException {
		InputStream stream = null;
		OutputStream bos = null;
		int read = 0;
		try {
			stream = file.getInputStream();
			bos = new FileOutputStream(filePath);
			byte[] buffer = new byte[Constants.FILE_BUFFER_SIZE];

			while ((read = stream.read(buffer)) != -1) {
				synchronized (buffer){
		    		bos.write(buffer, 0, read);
		    	}
			}

		} catch (IOException e) {
			throw e;
		} finally {
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException ignore) {
					bos = null;
					logger.error("Exception", ignore);
				}
			}
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException ignore) {
					stream = null;
					logger.error("Exception", ignore);
				}
			}
		}
	}

	/**
	* @Method Name : extractFileHash
	* @Description : 입력된 경로의 파일 hash값을 반환
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : String
	 * @throws NoSuchAlgorithmException
	 * @throws IOException
	* @exception :
	*/
	private String extractFileHash(String filePath) throws NoSuchAlgorithmException, IOException {
		RandomAccessFile file = new RandomAccessFile(filePath, "r");
		MessageDigest digest = MessageDigest.getInstance("SHA-256");

		byte[] buffer = new byte[FILE_READ_SIZE];

		long totalRead = 0;

		long offset = file.length();
		int read = 0;
		while (totalRead < offset) {
			read = (int) (((offset - totalRead) >= FILE_READ_SIZE) ? FILE_READ_SIZE : (offset - totalRead));
			file.read(buffer, 0, read);
			digest.update(buffer, 0, read);
			totalRead += read;
		}
		file.close();

		byte[] fileHash = digest.digest();

		//바이트배열을 16진수 문자열로 변환
		StringBuffer sb = new StringBuffer();
		for (byte b : fileHash) {
			String hexString = String.format("%02x", b);
			sb.append(hexString);
		}
		return sb.toString();
	}

	/**
	* @Method Name : getIntToDateStr
	* @Description : 10보다 작은수를 두자릿수로 변환
	* @Author : scshin
	* @since : 2019. 8. 21.
	* @param :
	* @return : String
	* @exception :
	*/
	private String getIntToDateStr(int input, String div) {
		if ("M".equals(div)) {
			input++;
		}
		if (input < 10) {
			return "0"+String.valueOf(input);
		} else  {
			return String.valueOf(input);
		}
	}

	/**
	* @Method Name : updateTmpFileToNoraml
	* @Description : 임시저장상태 파일을 정상파일로 변경합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : int
	* @exception :
	*/
	public int updateTmpFileToNoraml(Map<String, Object> paramMap) throws DataAccessException {
		int result = 0;
		result = fileDao.updateStatCd(paramMap);
		return result;
	}

	/**
	* @Method Name : updateTmpFileToDelete
	* @Description : 임시저장 파일을 삭제 파일로 변경합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : int
	* @exception :
	*/
	public int updateTmpFileToDelete(Map<String, Object> paramMap) throws DataAccessException {
		int result = 0;
		result = fileDao.updateStatCdTmp(paramMap);
		return result;
	}

	/**
	 * 파일 스퀀스 생성 서비스에도 추가 - 20.12.28
	 * @return
	 * @throws DataAccessException
	 */
	public String selectAtchmnflStreNextSeq() throws DataAccessException {
		return fileDao.selectAtchmnflStreNextSeq();
	}

	/**
	 * ZIPfileKey 생성
	 * @param List<EgovMap>
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public List<EgovMap> putZipFileKey(List<EgovMap> dataList) throws UnsupportedEncodingException {
		if (dataList != null && !dataList.isEmpty()) {
			for (int i = 0; i < dataList.size(); i++) {
				if(dataList.get(i).get("atchmnflNo") != null) {
					String encFileKey = encryptService.encryptedStr(dataList.get(i).get("atchmnflNo") + "_" + "1");
					dataList.get(i).put("fileKey", encFileKey);
				}
			}
		}
		return dataList;
	}
}
