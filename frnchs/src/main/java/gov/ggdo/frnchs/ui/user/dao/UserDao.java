package gov.ggdo.frnchs.ui.user.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.security.UserVO;


public interface UserDao {

	/**
	 * 회원가입
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void joinUser(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 새 유저번호 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectNextUserNo(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 브랜드 본사 관리자 회원가입
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void joinBrandUser(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 담당프랜차이즈 정보 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void insertChrgBrand(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	EgovMap selectUserDetail(EgovMap userMap) throws DataAccessException, SQLException;
	/**
	 * 인증키 업데이트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateCrtfcKey(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 인증여부 업데이트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateCrtfcAt(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 인증키 업데이트(브랜드관리자)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBrandCrtfcKey(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 인증여부 업데이트(브랜드관리자)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBrandCrtfcAt(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 이메일 체크
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap chkEmailAdres(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 이메일 체크
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap chkFindPwInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 사용자 패스워드 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateUserPw(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 브랜드관리자 패스워드 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateBrandUserPw(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 가입정보 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 가입정보 탈퇴
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void deleteMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 유저별 담당 프렌차이즈 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectUserChrgBrandList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 유저 담당 프렌차이즈 본사번호 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectUserChrgHedofcNo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 브랜드관리자 가입정보 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateBrandMngrMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 브랜드관리자 가입정보 삭제
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void deleteBrandMngrMyInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 담당프랜차이즈정보 삭제
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void deleteUserChrgBrand(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 유저 권한 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectUserAuthorList(UserVO paramMap) throws DataAccessException, SQLException;

}
