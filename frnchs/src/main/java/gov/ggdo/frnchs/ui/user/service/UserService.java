package gov.ggdo.frnchs.ui.user.service;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.file.service.FileService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.util.mail.service.MailSendService;
import gov.ggdo.frnchs.ui.user.dao.UserDao;

@Service("userService")
public class UserService {

	@Log Logger logger;

	@Autowired private UserDao userDao;
	@Autowired private BCryptPasswordEncoder bcryptPasswordEncoder;
	@Autowired private FileService fileService;
	@Autowired private MailSendService mss;

	/**
	 * 회원가입 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void joinUser(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("joinUser method run start!!");
		String userPw = bcryptPasswordEncoder.encode((String)paramMap.get("userPw"));
		paramMap.put("userPw", userPw);

		//창업예정자(US01)는 바로 승인(CS01) 처리
		if("US01".equals(paramMap.get("userSeCode"))) {
			paramMap.put("confmSttusCode", "CS01");
		}else {
			paramMap.put("confmSttusCode", "CS03");
		}

		userDao.joinUser(paramMap);
	}
	/**
	 * 브랜드 본사 관리자 회원가입 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void joinBrandUser(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, java.io.IOException, NoSuchAlgorithmException {
		logger.debug("joinBrandUser method run start!!");
		String cfa = (String)paramMap.get("compareFileArea");
		String atchmnflNo = "";
		if(cfa.equals("visible")){
			atchmnflNo = atchFile == null ? "" : fileService.insertFlie(atchFile, paramMap, "basic");
			paramMap.put("atchmnflNo", atchmnflNo);
		}else{
			atchmnflNo = (String) paramMap.get("atchmnflNo");
			paramMap.put("atchmnflNo", atchmnflNo);
		}
		String userPw = bcryptPasswordEncoder.encode((String)paramMap.get("userPw"));
		paramMap.put("userPw", userPw);
		paramMap.put("confmSttusCode", "CS03");
		//유저번호 생성
		Object nextUserNo = userDao.selectNextUserNo(paramMap).get("nextUserNo");
		paramMap.put("userNo", nextUserNo.toString());

		//회원정보 입력
		userDao.joinBrandUser(paramMap);

		//담당프랜차이즈정보 조회

		//담당브랜드 입력
		String[] frnchsNoArr = paramMap.get("frnchsNoList").toString().split(",");
		for(String frnchsNo : frnchsNoArr) {
			paramMap.put("frnchsNo", frnchsNo);
			userDao.insertChrgBrand(paramMap);
		}
	}

	public EgovMap selectUserDetail(EgovMap userMap) throws Exception {
		return userDao.selectUserDetail(userMap);
	}
	/**
	 * 인증키 업데이트
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateCrtfcKey(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateCrtfcKey method run start!!");
		return userDao.updateCrtfcKey(paramMap);
	}
	/**
	 * 인증키 업데이트(브랜드관리자)
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateBrandCrtfcKey(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateCrtfcKey method run start!!");
		return userDao.updateBrandCrtfcKey(paramMap);
	}
	/**
	 * 인증여부 업데이트
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateAuthStatus(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateAuthStatus method run start!!");
		int returnCnt = 0;

		if("brand".equals(paramMap.get("type"))) {
			returnCnt = userDao.updateBrandCrtfcAt(paramMap);
		}else {
			returnCnt = userDao.updateCrtfcAt(paramMap);
		}
		return returnCnt;
	}
	/**
	 * 이메일 체크
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap chkEmailAdres(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("chkEmailAdres method run start!!");
		return userDao.chkEmailAdres(paramMap);
	}

	/**
	 * 비밀번호 찾기
	 * @throws Exception
	 */
	public boolean findUserPw(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		//이메일, 이름, 전화번호에 해당하는 사용자가 있는지 조회
		EgovMap userMap = userDao.chkFindPwInfo(paramMap);

		//사용자가 있으면 랜덤 비밀번호로 비밀번호 업데이트 처리
		if(userMap != null) {
			StringBuffer tempStr = new StringBuffer();
			Random rnd = new Random();
			for (int i = 0; i < 8; i++) {
			    int rIndex = rnd.nextInt(3);
			    switch (rIndex) {
			    case 0:
			        // a-z
			    	tempStr.append((char) ((int) (rnd.nextInt(26)) + 97));
			        break;
			    case 1:
			        // A-Z
			    	tempStr.append((char) ((int) (rnd.nextInt(26)) + 65));
			        break;
			    case 2:
			        // 0-9
			    	tempStr.append((rnd.nextInt(10)));
			        break;
			    }
			}
			String userPw = bcryptPasswordEncoder.encode(tempStr.toString());
			paramMap.put("userPw", userPw);
			paramMap.put("userNo", userMap.get("userNo"));
			if("US03".equals(userMap.get("userSeCode"))){
				userDao.updateBrandUserPw(paramMap);
			}else {
				userDao.updateUserPw(paramMap);
			}
//logger.debug("");
//logger.debug("변경된 비밀번호 [" + tempStr.toString() + "]======");
//logger.debug("");
			//랜덤 비밀번호 이메일 발송처리
			mss.sendPwMail((String)paramMap.get("emailAdres"),tempStr.toString());

			return true;
		}
		return false;
	}

	/**
	 * 가입정보 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void updateMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateMyInfo method run start!!");
		String userPw = (String) paramMap.get("userPw");
		if(!"".equals(paramMap.get("userPw").toString())) {
			userPw = bcryptPasswordEncoder.encode(paramMap.get("userPw").toString());
			paramMap.put("userPw", userPw);
		}
		userDao.updateMyInfo(paramMap);
	}
	
	/**
	 * 가입정보 탈퇴
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void deleteMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("deleteMyInfo method run start!!");
		userDao.deleteMyInfo(paramMap);
	}

	/**
	 * 유저별 담당 프렌차이즈 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectUserChrgBrandList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectUserChrgBrandList method run start!!");
		return userDao.selectUserChrgBrandList(paramMap);
	}
	/**
	 * 유저 담당 프렌차이즈 본사번호 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectUserChrgHedofcNo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectUserChrgHedofcNo method run start!!");
		return userDao.selectUserChrgHedofcNo(paramMap);
	}
	/**
	 * 브랜드관리자 가입정보 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void updateBrandMngrMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateBrandMngrMyInfo method run start!!");
		String userPw = (String) paramMap.get("userPw");
		if(!"".equals(paramMap.get("userPw").toString())) {
			userPw = bcryptPasswordEncoder.encode(paramMap.get("userPw").toString());
			paramMap.put("userPw", userPw);
		}
		userDao.updateBrandMngrMyInfo(paramMap);

		if(paramMap.get("frnchsNoList") != null && !"".equals(paramMap.get("frnchsNoList").toString())) {
			//담당프랜차이즈정보 삭제
			userDao.deleteUserChrgBrand(paramMap);
			//담당프랜차이즈정보 입력
			String[] frnchsNoArr = paramMap.get("frnchsNoList").toString().split(",");
			for(String frnchsNo : frnchsNoArr) {
				paramMap.put("frnchsNo", frnchsNo);
				userDao.insertChrgBrand(paramMap);
			}
		}

	}
	
	/**
	 * 브랜드관리자 가입정보 탈퇴
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void deleteBrandMngrMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("deleteBrandMngrMyInfo method run start!!");
		userDao.deleteBrandMngrMyInfo(paramMap);	
	}
}
