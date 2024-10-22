package gov.ggdo.frnchs.common.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.aop.LoginCheck;
import gov.ggdo.frnchs.common.file.domain.FileVO;
import gov.ggdo.frnchs.common.file.service.FileService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;

/**
 * @Class Name : FileController.java
 * @Description : 파일 공통처리 콘트롤러
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
@Controller
public class FileController {

	@Log Logger logger;

	@Autowired private FileService fileService;

	@Autowired private EncryptService encryptService;

	@Value("${globalconfig['file.fileRepositoryTmpPath']}")
	private String fileRepositoryTmpPath;
	/**
	* @Method Name : uploadFile
	* @Description : 파일 업로드
	* @Author : scshin
	* @since : 2019. 8. 22.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/uploadFile.do"}, method=RequestMethod.POST , consumes ={"multipart/form-data"})
//	@LoginCheck(resultType = "fileAjax") //익명게시판 비로그인자도 첨부가능하게 주석 22.06.21
	public ModelAndView uploadFile(@RequestParam(value="atchFile") MultipartFile atchFile, @ReqParam Map<String, Object>paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		String atchmnflNo;
		boolean duplicate = true;
		try {
			//기존 데이터와 파일 이름이 같을경우 인서트 x
			if(paramMap.get("atchmnflNo").toString().length() > 0) {
				List<FileVO> fileList = fileService.selectFile(paramMap);
				if (fileList != null && !fileList.isEmpty()) {
					for (int i = 0; i < fileList.size(); i++) {
						FileVO fileVO = fileList.get(i);
						String inputFileNm = fileVO.getInputFileNm();
						String paramInputFileNm = atchFile.getOriginalFilename();
						String atchmnflSttusCode = fileVO.getAtchmnflSttusCode();
						if(inputFileNm.equals(paramInputFileNm) && !atchmnflSttusCode.equals("FS03")) {
							duplicate = false;
						} 
					}
				}
			}
			
			if(duplicate) {
				atchmnflNo = fileService.insertFlie(atchFile, paramMap, "basic");
				modelAndView.addObject("atchmnflNo", atchmnflNo);
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "중복된 파일입니다.");
			}
		} catch (DataAccessException e) {
			logger.error("uploadFile Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 업로드중 오류가 발생하였습니다.");
		} catch (NoSuchAlgorithmException e) {
			logger.error("uploadFile Method NoSuchAlgorithmException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 업로드중 오류가 발생하였습니다.");
		} catch (IOException e) {
			logger.error("uploadFile Method IOException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 업로드중 오류가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	* @Method Name : getFileList
	* @Description : 파일목록을 조회한다.
	* @Author : scshin
	* @since : 2019. 8. 22.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/getFileList.do"})
	public ModelAndView getFileList(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			List<FileVO> fileList = fileService.selectFile(paramMap);
			if (fileList != null && !fileList.isEmpty()) {
				for (int i = 0; i < fileList.size(); i++) {
					FileVO fileVO = fileList.get(i);
					String atchmnflNo = fileVO.getAtchmnflNo();
					String fileSn = String.valueOf(fileVO.getFileSn());
					String fileKey = atchmnflNo + "_" + fileSn;
					String encFileKey = encryptService.encryptedStr(fileKey);
					fileVO.setFileKey(encFileKey);
					fileList.set(i, fileVO);
				}
			}
			modelAndView.addObject("fileList", fileList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("getFileList Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 목록 조회중 오류가 발생하였습니다.");
		} catch (UnsupportedEncodingException e) {
			logger.error("getFileList Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 목록 조회중 오류가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	* @Method Name : deleteFile
	* @Description :
	* @Author : scshin
	* @since : 2019. 8. 22.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/deleteFile.do"})
	public ModelAndView deleteFile(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if (paramMap.get("delFileSn") != null && !"".equals(paramMap.get("delFileSn"))) {
				int result = fileService.deleteFile(paramMap);
				modelAndView.addObject("deleteCount", result);
			} else {
				modelAndView.addObject("deleteCount", 0);
			}
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("deleteFile Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 삭제 조회중 오류가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	* @Method Name : downloadFile
	* @Description : 첨부파일을 다운로드 합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/downloadFile.do"})
//	@LoginCheck(resultType = "file")
	public ModelAndView downloadFile(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView("fileDownView");
		String encFileKey = String.valueOf(paramMap.get("fileKey"));
		try {
			List<FileVO> fileList = fileService.selectFile(paramMap);
			if (fileList == null || fileList.isEmpty()) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "다운로드할 파일이 존재하지 않습니다.");
			} else {
				if (paramMap.get("fileKey") != null && !"".equals(encFileKey)) {
					String fileKey = encryptService.decryptedStr(encFileKey);
					String atchmnflNo = String.valueOf(paramMap.get("atchmnflNo"));
					String fileSn =  String.valueOf(paramMap.get("fileSn"));
					String chkFileKey = atchmnflNo +"_"+fileSn;
					if (chkFileKey.equals(fileKey)) {
						FileVO fileVO = (FileVO)fileList.get(0);
						File downFile = new File(fileVO.getFileServerCours());
						modelAndView.addObject(Constants.DOWN_FILE, downFile);
						modelAndView.addObject(Constants.DOWN_FILE_NAME, fileVO.getInputFileNm());
						modelAndView.addObject(Constants.DOWN_FILE_SIZE, fileVO.getFileSize());
						modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
					} else {
						modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
						modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 정보가 조작되었습니다.");
					}
				} else {
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 중 조회중 오류가 발생하였습니다.");
				}
			}
		} catch (DataAccessException e) {
			logger.error("downloadFile Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 중 조회중 오류가 발생하였습니다.");
		} catch (UnsupportedEncodingException e) {
			logger.error("downloadFile Method UnsupportedEncodingException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 중 조회중 오류가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	* @Method Name : updateTmpFileToNoraml
	* @Description : 임시저장 파일을 정상파일로 변경합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/updateTmpFileToNoraml.do"})
	public ModelAndView updateTmpFileToNoraml(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			paramMap.put("atchmnflSttusCode", "FS02");//저장완료
			int result = fileService.updateTmpFileToNoraml(paramMap);
			paramMap.put("changeStatusFiles", result);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("updateFileStat Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 상태변경 중 조회중 오류가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	* @Method Name : updateTmpFileToDelete
	* @Description : 임시저장파일을 삭제상태로 변경합니다.
	* @Author : scshin
	* @since : 2019. 8. 27.
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/updateTmpFileToDelete.do"})
	public ModelAndView updateTmpFileToDelete(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			paramMap.put("atchmnflSttusCode", "FS03");//삭제
			int result = fileService.updateTmpFileToDelete(paramMap);
			paramMap.put("changeStatusFiles", result);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("updateFileStat Method DataAccessException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 상태변경 중 조회중 오류가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	* @Method Name : downloadZipFile
	* @Description : 첨부파일을 zip로 압축후 다운로드 합니다.
	* @Author :
	* @since :
	* @param :
	* @return : ModelAndView
	* @exception :
	*/
	@RequestMapping(value={"/file/downloadZipFile.do"})
	@LoginCheck(resultType = "file")
	public ModelAndView downloadZipFile(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView("fileDownView");

		ZipOutputStream zout = null;
		FileInputStream in = null;

		String tempPath = fileRepositoryTmpPath + "/";
		String zipName = paramMap.get("zipName").toString()+".zip"; //ZIP 압축 파일명
		try {
			paramMap.put("atchmnflSttusCode", "FS02");
			List<FileVO> fileList = fileService.selectFile(paramMap);

			String encFileKey = String.valueOf(paramMap.get("fileKey"));
			String fileKey = encryptService.decryptedStr(encFileKey);
			String atchmnflNo = String.valueOf(paramMap.get("atchmnflNo"));
			String fileSn =  "1";
			String chkFileKey = atchmnflNo +"_"+fileSn;

			if (fileList == null || fileList.isEmpty()) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "다운로드할 파일이 존재하지 않습니다.");
			} else if (!chkFileKey.equals(fileKey)) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 정보가 조작되었습니다.");
			} else {
		        File f = new File(tempPath);
		        if(!f.exists()) f.mkdirs();

		        //ZIP파일 압축 START
		        zout = new ZipOutputStream(new FileOutputStream(tempPath + zipName));
				byte[] buffer = new byte[1024];

				for(int i = 0; i < fileList.size(); i++){
			    	in = new FileInputStream(fileList.get(i).getFileServerCours()); //압축 대상 파일
				    zout.putNextEntry(new ZipEntry(fileList.get(i).getInputFileNm())); //압축파일에 저장될 파일명
				    int len;
				    while((len = in.read(buffer)) > 0){
				       zout.write(buffer, 0, len); //읽은 파일을 ZipOutputStream에 Write
				    }
				    zout.closeEntry();
				    in.close();
				}
				zout.close(); //ZIP파일 압축 END

				FileVO fileVO = new FileVO();
				fileVO.setFileServerCours(tempPath);
				fileVO.setInputFileNm(zipName);

				File downFile = new File(tempPath+zipName);
				if(!downFile.exists()) {
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 중 오류가 발생하였습니다.");
				} else {
					fileVO.setFileSize(String.valueOf(downFile.length()));
					modelAndView.addObject(Constants.DOWN_FILE, downFile);
					modelAndView.addObject(Constants.DOWN_FILE_NAME, fileVO.getInputFileNm());
					modelAndView.addObject(Constants.DOWN_FILE_SIZE, fileVO.getFileSize());
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				}
			}
		} catch (IOException | DataAccessException e) {
			logger.error("downloadZipFile Method IOException Occured!!");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "파일 다운로드 중 오류가 발생하였습니다.");
		} finally {
			IOUtils.closeQuietly(zout);
			IOUtils.closeQuietly(in);
		}
		return modelAndView;
	}

}
