package gov.ggdo.frnchs.ui.sysMngr.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.file.service.FileService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.security.UserVO;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.common.util.excel.ExcelUtils;
import gov.ggdo.frnchs.ui.sysMngr.dao.SysMngrDao;
import gov.ggdo.frnchs.ui.sysMngr.pr.SysMngrPr;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Service("sysMngrService")
public class SysMngrService {

	@Log Logger logger;
	
	@Autowired private SysMngrDao sysMngrDao;
	@Autowired private SysMngrPr sysMngrPr;
	@Autowired private FileService fileService;
	@Autowired private ComCodeService comCodeService;

	@Autowired private EncryptService encryptService;
	/**
	 * 회원관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectUserList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectUserList(paramMap);
	}
	/**
	 * 회원관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public Map<String, Object> selectUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectUserInfo(paramMap);
	}
	
	/**
	 * 회원관리 상세 조회(브랜드관리자)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public Map<String, Object> selectBrandUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectBrandUserInfo(paramMap);
	}
	
	/**
	 * 전체 회원관리 목록 조회 - 20.12.17
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectAllUserList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectAllUserList(paramMap);
	}
	
	/**
	 * 전체 회원관리 목록 갯수 조회 - 20.12.21
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectAllUserListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return sysMngrDao.selectAllUserListCount(paramMap);
	}
	
	/**
	 * 전체 회원관리 상세 조회 - 20.12.17
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public Map<String, Object> selectAllUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectAllUserInfo(paramMap);
	}
	
	/**
	 * 회원관리 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		paramMap.put("updtUserNo", Integer.parseInt(((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo()));
		return sysMngrDao.updateUserInfo(paramMap);
	}

	/**
	 * 회원관리 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateBrandUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		paramMap.put("updtUserNo", Integer.parseInt(((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo()));
		return sysMngrDao.updateBrandUserInfo(paramMap);
	}
	
	/**
	 * 회원관리 승인상태 변경(승인, 반려)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateUserStat(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.updateUserStat(paramMap);
	}
	
	/**
	 * 권한관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectAuthList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectAuthList(paramMap);
	}
	/**
	 * 권한관리 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateAuthInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.updateAuthInfo(paramMap);
	}
	
	/**
	 * 권한관리 정보 수정 - 20.12.21
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws BadCommandException 
	 */
	public int updateMultiAuthInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, BadCommandException{
		int result = 0;
		int update = 0;
		int updateN = 0;
		String userSeCode = paramMap.get("userSeCode").toString();
		for ( String key : paramMap.keySet() ) {
			if(key.contains("menu_")) {
				Map<String, Object> updateMap = new HashMap<String, Object>(); 
				updateMap.put("userSeCode", userSeCode);
				updateMap.put("menuCode", key.replace("menu_", ""));
				updateMap.put("authorAt", "N");
				updateMap.put("updtUserNo", Integer.parseInt(((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo()));
				String[] authorCodes = paramMap.get(key).toString().replaceAll("At", "").toUpperCase().split(",");
				logger.debug(">>>> authorCodes:"+authorCodes.length);
				updateMap.put("authorCodes", authorCodes);
				updateN += sysMngrDao.updateAuthInfo(updateMap); // N 메뉴 전체 수정 
				updateMap.put("authorAt", "Y");
				update += sysMngrDao.updateAuthInfo(updateMap); // 특정 메뉴 Y 수정
//				for (String menuSeq : authorCodes) {
//					result++;
//					updateMap.put("authorCode", menuSeq.replace("At", "").toUpperCase());
//					updateMap.put("authorCode", menuSeq.replace("At", "").toUpperCase());
//					
//					update += sysMngrDao.updateAuthInfo(updateMap); // 특정 메뉴 Y 수정
//					logger.debug(">>> "+key.replace("menu_", "")+":"+menuSeq.replace("At", ""));
//				}
			}
		}
		logger.debug(">>>> "+result+":"+updateN+":"+update);
		
//		if(result != update) throw new BadCommandException("요청 데이터와 수정데이터의 수가 다릅니다.");
		
		return update;
	}
	
	/**
	 * 팝업창 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<Map<String, Object>> selectPopupMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectPopupMngList(paramMap);
	}
	/**
	 * 팝업창 관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public Map<String, Object> selectPopupMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		Map<String, Object> returnMap = sysMngrDao.selectPopupMngInfo(paramMap);
		logger.debug(">>> 안빔?" + !MapUtils.isEmpty(returnMap));
		if(!MapUtils.isEmpty(returnMap)) {
			String atchmnflNo = String.valueOf(returnMap.get("atchmnflNo"));
			String fileSn = String.valueOf(returnMap.get("fileSn"));
			String fileKey = atchmnflNo + "_" + fileSn;
			logger.debug(">>> fileKey:" + fileKey);
			String encFileKey = encryptService.encryptedStr(fileKey);
			returnMap.put("fileKey", encFileKey);
		}
		return returnMap;
	}
	/**
	 * 팝업창 관리 등록
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int insertPopupMngInfo(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		String atchmnflNo = atchFile == null ? "" : fileService.insertFlie(atchFile, paramMap, "basic");
		paramMap.put("atchmnflNo", atchmnflNo);
		int result = sysMngrDao.insertPopupMngInfo(paramMap); 
		
		// 공통 초기화
		Map<String, Object> emptyParam = new HashMap<String, Object>();
		emptyParam.put("popupType" ,"noPaging");
		Constants.POPUP_LIST = sysMngrDao.selectPopupMngList(emptyParam);
		
		return result;
	}
	/**
	 * 팝업창 관리 수정
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int updatePopupMngInfo(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		if(!ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) && atchFile != null) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		
		if("imgType".equals(paramMap.get("popupType"))) {
			String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, paramMap, "basic");
			paramMap.put("atchmnflNo", atchmnflNo);
		}
		int result = sysMngrDao.updatePopupMngInfo(paramMap); 
		
		// 공통 초기화
		Map<String, Object> emptyParam = new HashMap<String, Object>();
		emptyParam.put("popupType" ,"noPaging");
		Constants.POPUP_LIST = sysMngrDao.selectPopupMngList(emptyParam);
		
		return result;
	}
	/**
	 * 팝업창 관리 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deletePopupMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		int result = sysMngrDao.deletePopupMngInfo(paramMap); 
		
		// 공통 초기화
		Map<String, Object> emptyParam = new HashMap<String, Object>();
		emptyParam.put("popupType" ,"noPaging");
		Constants.POPUP_LIST = sysMngrDao.selectPopupMngList(emptyParam);
		
		return result;
	}
	
	/**
	 * 데이터 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public List<Map<String, Object>> selectDataMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		List<Map<String, Object>> returnList = sysMngrDao.selectDataMngList(paramMap);
		if(returnList != null && returnList.size() > 0) {
			for (Map<String, Object> returnMap : returnList) {
				String atchmnflNo = String.valueOf(returnMap.get("atchmnflNo"));
				String fileSn = String.valueOf(returnMap.get("fileSn"));
				String fileKey = atchmnflNo + "_" + fileSn;
				logger.debug(">>> fileKey:" + fileKey);
				String encFileKey = encryptService.encryptedStr(fileKey);
				returnMap.put("fileKey", encFileKey);
			}
		}
		return returnList;
	}
	
	/**
	 * 데이터 관리 목록 조회 갯수 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectDataMngListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectDataMngListCount(paramMap);
	}
	
	/**
	 * 데이터 관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public Map<String, Object> selectDataMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectDataMngInfo(paramMap);
	}
	/**
	 * 데이터 관리 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertDataMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.insertDataMngInfo(paramMap);
	}
	/**
	 * 데이터 관리 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateDataMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.updateDataMngInfo(paramMap);
	}
	/**
	 * 데이터 관리 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteDataMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.deleteDataMngInfo(paramMap);
	}
	
	/**
	 * 설문 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectSurvayMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectSurvayMngList(paramMap);
	}
	
	/**
	 * 상태변경을 다중으로 처리한다
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException 
	 */
	public int updateMultiUserStat(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		int updateCnt = 0;
		String[] splitUserNo = reqParam.get("userNoArray").toString().split(",");
		String confmSttusCode = "Y".equals(reqParam.get("confmSttusCode")) ? "CS01" : "CS02";
		String confmUserNo = ((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo();
		logger.debug(">>>> userNoArrayLength:"+splitUserNo.length);
		for (int i = 0; i < splitUserNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			logger.debug(">>>> userNo["+i+"]:"+splitUserNo[i]);
			logger.debug(">>>> confmUserNo["+i+"]:"+((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo());
			splitParam.put("userNo", splitUserNo[i]);
			splitParam.put("confmSttusCode", confmSttusCode);
			if(confmUserNo.equals(splitUserNo[i])) {
				throw new BadCommandException("승인상태 변경 목록에 자신이 포함되어 있습니다.");
			}
			splitParam.put("confmUserNo", Integer.parseInt(confmUserNo));
			Map<String, Object> splitUserInfo = sysMngrDao.selectAllUserInfo(splitParam);
			// 브랜드매니저/사용자 분리 - 21.03.11
			if("US03".equals(splitUserInfo.get("userSeCode"))) {
				updateCnt+= sysMngrDao.updateBrandMngrStat(splitParam);
				//반려 시 사용자 브랜드 정보 삭제 - 24.03.14
				if((splitParam.get("confmSttusCode") == "CS02") && (sysMngrDao.selectUserChrgBrandCnt(splitParam) > 0)){
					sysMngrDao.deleteUserChrgBrand(splitParam);
				}
				
			} else {
				updateCnt+= sysMngrDao.updateUserStat(splitParam);
			}
		}
		return updateCnt;
	}
	public int selectPopupMngListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectPopupMngListCount(reqParam);
	}
	
	/**
	 * 회원정보 삭제를 다중으로 처리한다
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException 
	 */
	public int deleteUserNo(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		int deleteCnt = 0;
		int selectCnt = 0;
		String[] splitUserNo = reqParam.get("userNoArray").toString().split(",");
		String confmUserNo = ((UserVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserNo();
		
		for (int i = 0; i < splitUserNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			splitParam.put("userNo", splitUserNo[i]);
			
			if(confmUserNo.equals(splitUserNo[i])) {
				throw new BadCommandException("회원삭제 목록에 자신이 포함되어 있습니다.");
			}
			
			selectCnt = sysMngrDao.selectUserNo(splitParam);
			if(selectCnt > 0){
				deleteCnt+= sysMngrDao.deleteUserNo(splitParam);
			}else{
				deleteCnt+= sysMngrDao.deleteBrandUserNo(splitParam);
				//회원 브랜드 정보 삭제 - 24.03.14
				if(sysMngrDao.selectUserChrgBrandCnt(splitParam) > 0){
					sysMngrDao.deleteUserChrgBrand(splitParam);
				}
			}
			
		}
		return deleteCnt;
	}
	/**
	 * 팝업 관리 메뉴 목록 조회 - 20.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectPopupMenuList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectPopupMenuList(paramMap);
	}
	
	/**
	 * 
	 * @param reqParam
	 * @param atchFile
	 * @param modelAndView
	 * @return
	 */
	@SuppressWarnings({ "deprecation", "resource" })
	public ModelAndView modifyDataInfoByExcel(Map<String, Object> reqParam, MultipartFile atchFile, ModelAndView modelAndView) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		
		// 파일 읽어들이기
//		try {
			reqParam.put("atchmnflNo", fileService.insertFlie(atchFile, reqParam, "basic"));
			InputStream file = atchFile.getInputStream();
			XSSFWorkbook workbook = new XSSFWorkbook(file);
			int rowindex=0;
			int columnindex=0;
			//시트 수 (첫번째에만 존재하므로 0을 준다)
			//만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
			XSSFSheet sheet=workbook.getSheetAt(0);
			//행의 수
			int rows=sheet.getPhysicalNumberOfRows();
			if(rows>3) {
				sysMngrDao.insertUserDataManage(reqParam);
				for(rowindex=0;rowindex<rows;rowindex++){
//				for(rowindex=0;rowindex<10;rowindex++){
					//행을읽는다
					XSSFRow row=sheet.getRow(rowindex);
					if(row !=null){
						//셀의 수
						int cells=row.getPhysicalNumberOfCells();
						logger.debug(">>>> max column["+rowindex+"]:"+cells);
						// 컬럼갯수 수정 - 177,176 -> 152,151 - 21.03.02
						if (rowindex > 2 && !(cells == 152 || cells == 151)) {
							throw new NumberFormatException("기존 행 수와 일치하지 않습니다.");
						}
						Map<String, Object> rowMap = new HashMap<String, Object>();
						for(columnindex=0; columnindex<=cells; columnindex++){
							//셀값을 읽는다
							XSSFCell cell=row.getCell(columnindex);
							String value="";
							//셀이 빈값일경우를 위한 널체크
							
							if(cell==null){
//								logger.debug(rowindex+"번 행 : "+columnindex+"번 열 값 null");
								continue;
							}else{
								//타입별로 내용 읽기
								switch (cell.getCellType()){
								case XSSFCell.CELL_TYPE_FORMULA:
									value=cell.getCellFormula();
									break;
								case XSSFCell.CELL_TYPE_NUMERIC:
									Double num = cell.getNumericCellValue();
									if(num == 0.0) { // 0.0 구분
										value = "";
									} else if((num - num.intValue()) == 0) { // 정수인것 구분
//										logger.debug(rowindex+"번 행 : "+columnindex+"번 열 값 소수점:"+(num)+"="+ num.intValue());
										value = num.intValue()+"";
									} else {
										value = cell.getNumericCellValue()+"";
									}
									break;
								case XSSFCell.CELL_TYPE_STRING:
									value=cell.getStringCellValue()+"";
									break;
								case XSSFCell.CELL_TYPE_BLANK:
									value=cell.getBooleanCellValue()+"";
									break;
								case XSSFCell.CELL_TYPE_ERROR:
									value=cell.getErrorCellValue()+"";
									break;
								}
							}
							// 기준년도 밸리데이션 추가 - 21.02.04
							// 페이지에서 넘어온 기즌년도 Param 명칭 dataStdrYear - 
							if (rowindex == 1 && columnindex == 12 && !value.equals(reqParam.get("dataStdrYear").toString())) {
								throw new NumberFormatException("데이터 기준년과 명세서상의 기준년이 다릅니다.\n기준년="+reqParam.get("dataStdrYear")+", 명세서="+value);
							}
							
							if (rowindex > 2) {
								rowMap.put("COLUMN"+(columnindex+1), value);
							}
							
//							logger.debug(rowindex+"번 행 : "+columnindex+"번 열 값은: "+value);
						}
						
						if (rowindex > 2) {
							rowMap.put("USER_DATA_MANAGE_NO", reqParam.get("userDataManageNo"));
							sysMngrDao.insertUserData(rowMap);
						}

						logger.debug(">>>> "+rowindex+"번 행 작업완료");
					}
				}
				
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "정상적으로 데이터가 등록되었습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터 값이 존재하지 않습니다.");
//				throw new equalse
			}
//		} catch (NumberFormatException e) {
//			logger.error("modifyDataInfoByExcel method Error Occured");
//			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
//			modelAndView.addObject(Constants.RESULT_MESSAGE, e.getMessage());
//		} catch (Exception e) {
//			logger.error("modifyDataInfoByExcel method Error Occured");
//			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
//			modelAndView.addObject(Constants.RESULT_MESSAGE, "에러가 발생하였습니다.");
//		}

		return modelAndView;
	}
	
	public void callProcedure(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		logger.info("==================== CALL EXCEL PROCEDURE START ====================");
		if(!ObjectUtils.isEmpty(reqParam.get("userDataManageNo"))) {
			try {
				int dataStdrYear = Integer.parseInt(reqParam.get("dataStdrYear").toString());
				logger.info("==== dataStdrYear:"+dataStdrYear);
				reqParam.put("userDataManageNo", reqParam.get("userDataManageNo").toString());
				logger.info("==== start userDataManageNo:"+reqParam.get("userDataManageNo"));
//				EgovMap tMap = sysMngrPr.selectTest(reqParam);
//				logger.info("==== testAA:"+tMap.get("aa"));
//				logger.info("==== testBB:"+tMap.get("bb"));
				logger.info("==== start callPrUserDataPartitn");
				sysMngrPr.callPrUserDataPartitn(reqParam);
				logger.info("==== end callPrUserDataPartitn");
				logger.info("==== start callPrFrnchsCtprvnSm");
				sysMngrPr.callPrFrnchsCtprvnSm(reqParam);
				logger.info("==== end callPrFrnchsCtprvnSm");
				logger.info("==== start callStorMxmCtprvn start");
				sysMngrPr.callStorMxmCtprvn(reqParam);
				logger.info("==== end callStorMxmCtprvn start");
				for (int i = dataStdrYear; i > dataStdrYear-3; i--) {
					logger.info("==== dataStdrYear[i]:"+i);
					reqParam.put("parseDataStdrYear", String.valueOf(i));
					logger.info("==== start callPrFrnchsIndex");
					sysMngrPr.callPrFrnchsIndex(reqParam);
					logger.info("==== end callPrFrnchsIndex");
				}
			} catch (SQLException e) {
				logger.error("==== CALL EXCEL PROCEDURE SQLException END");
			} catch (DataAccessException e) {
				logger.error("==== CALL EXCEL PROCEDURE DataAccessException END");
			} catch (RuntimeException e) {
				logger.error("==== CALL EXCEL PROCEDURE RuntimeException END");
			}
		} else {
			throw new NullPointerException("userDataManageNo가 존재하지 않습니다.");
		}
		logger.info("==================== CALL EXCEL PROCEDURE END ====================");
	}
	
	/**
	 * 설문이 있는 년도를 불러온다 - 21.01.06
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectSurvGroupYear() throws DataAccessException, SQLException {
		return sysMngrDao.selectSurvGroupYear();
	}

	/**
	 * 설문이 있는 년도의 달을 불러온다 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException 
	 */
	public List<EgovMap> selectSurvYearGroupMonth(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return sysMngrDao.selectSurvYearGroupMonth(paramMap);
	}
	
	/**
	 * 해당 순번의 설문 항목을 불러온다 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException 
	 */
	public List<EgovMap> selectSurvListByAccdtExaminNo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return sysMngrDao.selectSurvListByAccdtExaminNo(paramMap);
	}
	
	/**
	 * 조건에 맞는 설문조사 데이터 조회 - 21.01.08
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException 
	 */
	public List<EgovMap> selectSurvDataByCondition(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectSurvDataByCondition(reqParam);
	}
	
	/**
	 * 팝업창 리스트로 삭제하기 - 21.01.11
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int deletePopupMngList(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		int deleteCount = 0;
		String[] splitPopupNo = reqParam.get("popupNoArray").toString().split(",");
		logger.debug(">>>> popupNoArrayLength:"+splitPopupNo.length);
		for (int i = 0; i < splitPopupNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			logger.debug(">>>> splitPopupNo["+i+"]:"+splitPopupNo[i]);
			splitParam.put("popupNo", splitPopupNo[i]);
			
			Map<String, Object> splitMap = sysMngrDao.selectPopupMngInfoByPopupNo(splitParam);
			if(!ObjectUtils.isEmpty(splitMap)) {
				reqParam.put("popupNo", splitMap.get("popupNo"));
				reqParam.put("atchmnflNo", ObjectUtils.isEmpty(splitMap.get("atchmnflNo")) ? "" : splitMap.get("atchmnflNo").toString());
//				logger.debug(">>>> 팝업["+splitMap.get("popupNo")+"] file:"+splitMap.get("atchmnflNo"));
				if(splitMap.get("atchmnflNo") != null && !StringUtils.isEmpty(splitMap.get("atchmnflNo"))) {
					fileService.deleteFileByatchmnflNo(reqParam);
				}
				deleteCount+= sysMngrDao.deletePopupMngInfo(splitMap);
//			} else {
//				logger.debug(">>>> 팝업 no 미존재:"+splitPopupNo[i]);
			}
		}
		
		// 공통 초기화
		Map<String, Object> emptyParam = new HashMap<String, Object>();
		emptyParam.put("popupType" ,"noPaging");
		Constants.POPUP_LIST = sysMngrDao.selectPopupMngList(emptyParam);
		return deleteCount;
	}
	public List<EgovMap> selectWeekCountList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectWeekCountList(reqParam);
	}
	
	public List<EgovMap> selectAccsStatWeekList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectAccsStatWeekList(reqParam);
	}
	
	public List<EgovMap> selectAccsStatMonthList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectAccsStatMonthList(reqParam);
	}
	
	public int selectAccsStatDetailListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectAccsStatDetailListCount(reqParam);
	}
	
	public List<EgovMap> selectAccsStatDetailList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectAccsStatDetailList(reqParam);
	}
	
	public List<EgovMap> selectAccsStatYearList(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectAccsStatYearList(reqParam);
	}
	
	@SuppressWarnings("resource")
	public void createAccsStatExcel(Map<String, Object> reqParam, String type, ModelAndView modelAndView) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		
		String fileName= "";
		
		int rowCount = 0;
		List<EgovMap> list = null;
		List<EgovMap> list2 = null;
		String excelCondtion = "";
		// 구분자에 따른 파일명 및 
		if("day".equals(type)) {
			if(!StringUtils.isEmpty(reqParam.get("userSeCode"))) {
				Map<String, Object> codeParam = new HashMap<String, Object>();
				codeParam.put("codeId", "USER_SE_CODE");
				codeParam.put("codeValue", reqParam.get("userSeCode"));
				excelCondtion = comCodeService.selectCodeValueNmByIdAndValue(codeParam).replace("/", ",");
				excelCondtion = (StringUtils.isEmpty(excelCondtion) ? "" : ("("+excelCondtion+")"));
			}
			fileName = "일별 접속 통계("+reqParam.get("searchDate")+excelCondtion+")";
			list = selectAccsStatMonthList(reqParam);
			reqParam.put("type", "excel");
			list2 = selectAccsStatDetailList(reqParam);
		} else if("month".equals(type)) {
			if(!StringUtils.isEmpty(reqParam.get("userSeCode"))) {
				Map<String, Object> codeParam = new HashMap<String, Object>();
				codeParam.put("codeId", "USER_SE_CODE");
				codeParam.put("codeValue", reqParam.get("userSeCode"));
				excelCondtion = comCodeService.selectCodeValueNmByIdAndValue(codeParam).replace("/", ",");
				excelCondtion = (StringUtils.isEmpty(excelCondtion) ? "" : ("("+excelCondtion+")"));
			}
			fileName = "월별 접속 통계("+reqParam.get("searchYear")+"-"+String.format("%02d", Integer.parseInt(String.valueOf(reqParam.get("searchMonth"))))+excelCondtion+")";
			list = selectAccsStatYearList(reqParam);
			reqParam.put("type", "excel");
			list2 = selectAccsStatDetailList(reqParam);
		} else {
			throw new BadCommandException("구분자가 존재하지 않습니다.");
		}

		XSSFSheet sheet = workbook.createSheet(fileName);
		
		XSSFRow row = null;
		XSSFCell cell = null;
		
		row = sheet.createRow(rowCount);
		cell = row.createCell(0);
		cell.setCellValue(fileName);
		
		// 구분자에 따른 헤더변경
		row = sheet.createRow(++rowCount);
		if("day".equals(type)) {
			String[] week = {"일", "월", "화", "수", "목", "금", "토"};
			for (int i = 0; i < list.size(); i++) {
				logger.debug(">>>> ["+i+"]srchDay:"+list.get(i).get("srchDay")+", srchWeekDay:"+week[(int)list.get(i).get("srchWeekDay")]+", dayCount:"+list.get(i).get("dayCount").toString());
				cell = row.createCell(i);
				cell.setCellValue(list.get(i).get("srchDay")+"("+week[(int)list.get(i).get("srchWeekDay")]+")");
				cell.setCellType(CellType.STRING);
				ExcelUtils.commonCellStyle("header", workbook, cell);
			}
		} else if("month".equals(type)) {
			for (int i = 0; i < list.size(); i++) {
				cell = row.createCell(i);
				cell.setCellValue(list.get(i).get("srchYearMonth").toString());
				cell.setCellType(CellType.STRING);
				ExcelUtils.commonCellStyle("header", workbook, cell);
			}
		}
		// 상단리스트 값 추가
		row = sheet.createRow(++rowCount);
		for (int i = 0; i < list.size(); i++) {
			cell = row.createCell(i);
			cell.setCellValue((int)list.get(i).get(type+"Count"));
			cell.setCellType(CellType.NUMERIC);
			ExcelUtils.commonCellStyle(workbook, cell);
		}
		rowCount++;
		
		// 하단 헤더 추가
		String[][] headers = null;
		if("day".equals(type)) {
			headers = new String[][]{{"번호","rn"}, {"사용자 IP","conectrIp"}, {"사이트에 머문시간","loginTime"}, {"사용자 그룹","userSeNm"}, {"이름","userNm"}};
		} else if("month".equals(type)) {
			headers = new String[][]{{"번호","rn"},{"접속일자","convertConectDt"}, {"사용자 IP","conectrIp"}, {"사이트에 머문시간","loginTime"}, {"사용자 그룹","userSeNm"}, {"이름","userNm"}};
		}
		
		row = sheet.createRow(++rowCount);
		for (int i = 0; i < headers.length; i++) {
			cell = row.createCell(i);
			cell.setCellValue(headers[i][0]);
			cell.setCellType(CellType.STRING);
			ExcelUtils.commonCellStyle("header", workbook, cell);
		}
		// 하단리스트값 추가
		for (int i = 0; i < list2.size(); i++) {
			row = sheet.createRow(++rowCount);
			for (int j = 0; j < headers.length; j++) {
				cell = row.createCell(j);
				cell.setCellValue(ObjectUtils.isEmpty(list2.get(i).get(headers[j][1])) ? "" : list2.get(i).get(headers[j][1]).toString());
				cell.setCellType(CellType.STRING);
				ExcelUtils.commonCellStyle(workbook, cell);
			}
		}
		
		logger.debug(">>> fileName1:"+fileName);
		modelAndView.addObject(Constants.DOWN_EXCEL_FILE_NAME, fileName);
		modelAndView.addObject(Constants.DOWN_EXCEL_FILE, workbook);
		modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
	}
	
	/**
	 * 공정거래 홍보관 영상 공통코드 목록 조회 - 21.11.30 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<Map<String, Object>> selectFairTradeCodeList(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return sysMngrDao.selectFairTradeCodeList(paramMap);
	}
	
	
	/**
	 * 공정거래 홍보관 영상 목록 수 조회 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFairTradeVideoListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectFairTradeVideoListCount(reqParam);
	}
	
	/**
	 * 공정거래 홍보관 영상 목록 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<Map<String, Object>> selectFairTradeVideoList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectFairTradeVideoList(paramMap);
	}
	
	/**
	 * 공정거래 홍보관 영상 상세 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public Map<String, Object> selectFairTradeVideoInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		Map<String, Object> returnMap = sysMngrDao.selectFairTradeVideoInfo(paramMap);
		logger.debug(">>> 안빔?" + !MapUtils.isEmpty(returnMap));
		if(!MapUtils.isEmpty(returnMap)) {
			String atchmnflNo = String.valueOf(returnMap.get("atchmnflNo"));
			String fileSn = String.valueOf(returnMap.get("fileSn"));
			String fileKey = atchmnflNo + "_" + fileSn;
			logger.debug(">>> fileKey:" + fileKey);
			String encFileKey = encryptService.encryptedStr(fileKey);
			returnMap.put("fileKey", encFileKey);
		}
		return returnMap;
	}
	
	/**
	 * 공정거래 홍보관 영상 등록 - 21.11.15 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int insertFairTradeVideoInfo(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		if(!ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) && atchFile != null) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		
		String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, paramMap, "basic", "atchmnflNo", "FS02");
		paramMap.put("atchmnflNo", atchmnflNo);
		return sysMngrDao.insertFairTradeVideoInfo(paramMap); 
	}
	
	/**
	 * 공정거래 홍보관 영상 수정 - 21.11.15 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int updateFairTradeVideoInfo(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException{
		if(!ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) && atchFile != null) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		
		String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, paramMap, "basic", "atchmnflNo", "FS02");
		paramMap.put("atchmnflNo", atchmnflNo);
		return sysMngrDao.updateFairTradeVideoInfo(paramMap); 
	}
	
	/**
	 * 공정거래 홍보관 영상 수정 - 21.11.15 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int deleteFairTradeVideoList(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		int deleteCount = 0;
		String[] splitFairTradeSn = reqParam.get("fairTradeSnArray").toString().split(",");
		logger.debug(">>>> fairTradeSnArrayLength:"+splitFairTradeSn.length);
		for (int i = 0; i < splitFairTradeSn.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			logger.debug(">>>> splitFairTradeSn["+i+"]:"+splitFairTradeSn[i]);
			splitParam.put("fairTradeSn", splitFairTradeSn[i]);
			
			Map<String, Object> splitMap = sysMngrDao.selectFairTradeVideoInfoByNo(splitParam);
			if(!ObjectUtils.isEmpty(splitMap)) {
				reqParam.put("fairTradeSn", splitMap.get("fairTradeSn"));
				reqParam.put("atchmnflNo", ObjectUtils.isEmpty(splitMap.get("atchmnflNo")) ? "" : splitMap.get("atchmnflNo").toString());
				if(splitMap.get("atchmnflNo") != null && !StringUtils.isEmpty(splitMap.get("atchmnflNo"))) {
					fileService.deleteFileByatchmnflNo(reqParam);
				}
				deleteCount+= sysMngrDao.deleteFairTradeVideoInfo(splitMap);
			}
		}
		
		return deleteCount;
	}
	
	
	/**
	 * 게시판 관리 목록 수 조회 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectBoardMngListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return sysMngrDao.selectBoardMngListCount(reqParam);
	}
	
	/**
	 * 게시판 관리 목록 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<Map<String, Object>> selectBoardMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectBoardMngList(paramMap);
	}
	
	/**
	 * 게시판 생성관리 셀렉트옵션 - 21.12.28 염종찬
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws NullPointerException
	 */
	public List<Map<String, Object>> selectBoardOptions(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectBoardOptions(paramMap);
	}
	
	/**
	 * 게시판 관리 상세 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public Map<String, Object> selectBoardMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		return sysMngrDao.selectBoardMngInfo(paramMap);
	}
	
	/**
	 * 게시판 관리 등록 - 21.11.15 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int insertBoardMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		return sysMngrDao.insertBoardMngInfo(paramMap); 
	}
	
	/**
	 * 게시판 관리 수정 - 21.11.15 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int updateBoardMngInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		return sysMngrDao.updateBoardMngInfo(paramMap);
	}
	
	/**
	 * 게시판 관리 삭제 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundEXception
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int deleteBoardMngList(Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		return sysMngrDao.deleteBoardMngList(reqParam);
	}
	
	/**
	 * 설문관리 건수
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectQustnListCnt(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustnListCnt(paramMap);
	}
	
	/**
	 * 설문관리 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustnList(paramMap);
	}
	
	/**
	 * 설문관리 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertQustn(Map<String, Object> paramMap) throws DataAccessException, SQLException, IOException{
		int iCnt = sysMngrDao.insertQustn(paramMap);
		
		HashMap<String, Object> jsonMap = jsonMap = new ObjectMapper().readValue((String)paramMap.get("json"), HashMap.class);
		List list = (List)jsonMap.get("list");
		for(int i=0; i<list.size(); i++) {
			Map<String,Object> map = (Map<String,Object>)list.get(i);
			map.put("qustnrSn", paramMap.get("qustnrSn"));
			map.put("qustnrQestnSn", i);
			
//			String qestn = (String)map.get("qestn");
			sysMngrDao.insertQustnQestn(map);
			List awList = (List)map.get("aw");
			for(int j=0; j<awList.size(); j++) {
				Map<String,Object> awMap = (Map<String,Object>)awList.get(j);
				awMap.put("qustnrSn", paramMap.get("qustnrSn"));
				awMap.put("qustnrQestnSn", i);
				sysMngrDao.insertQustnAnswer(awMap);
			}
		}
		
		
		return 0;
	}
	
	/**
	 * 설문관리 질문문항 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertQustnQestn(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.insertQustnQestn(paramMap);
	}
	
	/**
	 * 설문관리 답변문항 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertQustnAnswer(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.insertQustnAnswer(paramMap);
	}
	
	/**
	 * 설문관리 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectQustn(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustn(paramMap);
	}	
	
	/**
	 * 설문관리 질문문항리스트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnQestnList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustnQestnList(paramMap);
	}
	
	/**
	 * 설문관리 답변문항리스트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnAnswerList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustnAnswerList(paramMap);
	}	
	
	/**
	 * 설문관리 설문수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateQustn(Map<String, Object> paramMap) throws DataAccessException, SQLException, IOException{
		sysMngrDao.deleteQustnrAnswer(paramMap);
		sysMngrDao.deleteQustnrQestn(paramMap);
		
		HashMap<String, Object> jsonMap = jsonMap = new ObjectMapper().readValue((String)paramMap.get("json"), HashMap.class);
		List list = (List)jsonMap.get("list");
		for(int i=0; i<list.size(); i++) {
			Map<String,Object> map = (Map<String,Object>)list.get(i);
			map.put("qustnrSn", paramMap.get("qustnrSn"));
			map.put("qustnrQestnSn", i);
			
//			String qestn = (String)map.get("qestn");
			sysMngrDao.insertQustnQestn(map);
			List awList = (List)map.get("aw");
			for(int j=0; j<awList.size(); j++) {
				Map<String,Object> awMap = (Map<String,Object>)awList.get(j);
				awMap.put("qustnrSn", paramMap.get("qustnrSn"));
				awMap.put("qustnrQestnSn", i);
				sysMngrDao.insertQustnAnswer(awMap);
			}
		}
		
		return sysMngrDao.updateQustn(paramMap);
	}
	
	/**
	 * 설문관리 설문수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateQustnDel(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.updateQustnDel(paramMap);
	}
	
	/**
	 * 설문관리 질문문항삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteQustnrQestn(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.deleteQustnrQestn(paramMap);
	}
	
	/**
	 * 설문관리 답변문항삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteQustnrAnswer(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.deleteQustnrAnswer(paramMap);
	}
	
	/**
	 * 설문관리 답변결과리스트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnResultList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return sysMngrDao.selectQustnResultList(paramMap);
	}	
	

	
}
