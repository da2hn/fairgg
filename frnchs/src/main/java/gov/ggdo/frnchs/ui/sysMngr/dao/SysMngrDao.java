package gov.ggdo.frnchs.ui.sysMngr.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface SysMngrDao {
	
	/**
	 * 회원관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectUserList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 회원관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectUserInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 회원관리 상세 조회(브랜드관리자)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectBrandUserInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 회원관리 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateUserInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 회원관리 브랜드 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBrandUserInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 회원관리 승인상태 변경(승인, 반려)
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateUserStat(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 권한관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAuthList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 권한관리 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateAuthInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 팝업창 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<Map<String, Object>> selectPopupMngList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 팝업창 관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectPopupMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 팝업창 관리 상세 조회(파일NO만) - 21.01.11
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectPopupMngInfoByPopupNo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 팝업창 관리 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertPopupMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 팝업창 관리 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updatePopupMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 팝업창 관리 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deletePopupMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 데이터 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<Map<String, Object>> selectDataMngList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 데이터 관리 목록 조회 갯수 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectDataMngListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 데이터 관리 상세 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectDataMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 데이터 관리 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertDataMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 데이터 관리 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateDataMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 데이터 관리 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteDataMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문 관리 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSurvayMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 전체 회원관리 목록 조회 - 20.12.17
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAllUserList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 전체 회원관리 목록 갯수 조회 - 20.12.21
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectAllUserListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 전체 회원관리 상세 조회 - 20.12.17
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectAllUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 이메일로 전체 회원관리 상세 조회  - 20.12.21
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectAllUserInfoByEmail(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 전체 팝업 목록 갯수 - 20.12.28
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectPopupMngListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 팝업 관리 메뉴 목록 조회 - 20.12.28
	 * @param List<EgovMap>
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectPopupMenuList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * TB_USER_DATA row를 삽입한다. - 21.01.04
	 * @param rowMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertUserData(Map<String, Object> rowMap) throws DataAccessException, SQLException;
	
	/**
	 * TB_USER_DATA_MANAGE 메인 행을 삽입한다 - 21.01.05
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertUserDataManage(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 설문이 있는 년도를 불러온다 - 21.01.06
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSurvGroupYear() throws DataAccessException, SQLException;
	
	/**
	 * 설문이 있는 년도의 달을 불러온다 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSurvYearGroupMonth(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 해당 순번의 설문 항목을 불러온다 - 21.01.06
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSurvListByAccdtExaminNo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 조건에 맞는  설문조사 데이터 조회 - 21.01.08
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSurvDataByCondition(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 해당 월별 접속통계 조회 - 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectWeekCountList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 해당 월별 접속통계 조회 - 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAccsStatWeekList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 해당 월별 접속통계 조회 - 21.01.12
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAccsStatMonthList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 해당 일별 접속통계 갯수 - 21.01.13
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectAccsStatDetailListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 해당 일별 접속통계 조회 - 21.01.13
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAccsStatDetailList(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 해당 년별 접속통계 조회 - 21.01.13
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAccsStatYearList(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 회원관리 브랜드 승인상태 변경(승인, 반려) - 21.03.11
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBrandMngrStat(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 공정거래 홍보관 영상 공통코드 목록 조회 - 21.11.30 주한별
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<Map<String, Object>> selectFairTradeCodeList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 공정거래 홍보관 영상 목록 수 조회 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFairTradeVideoListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 공정거래 홍보관 영상 관리 목록 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<Map<String, Object>> selectFairTradeVideoList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 공정거래 홍보관 영상 관리 상세 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectFairTradeVideoInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 공정거래 홍보관 영상 관리 등록 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertFairTradeVideoInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 공정거래 홍보관 영상 관리 수정 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateFairTradeVideoInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 공정거래 홍보관 영상 관리 상세 조회(파일NO만) - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectFairTradeVideoInfoByNo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 공정거래 홍보관 영상 관리 삭제 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteFairTradeVideoInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 전체 게시판 관리 목록 수 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectBoardMngListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 게시판 관리 목록 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<Map<String, Object>> selectBoardMngList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 게시판 생성관리 셀렉트옵션 - 21.12.28 염종찬
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws NullPointerException
	 */
	List<Map<String, Object>> selectBoardOptions(Map<String, Object> paramMap)  throws NullPointerException, DataAccessException, SQLException;
	
	/**
	 * 게시판 관리 상세 조회 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectBoardMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 게시판 관리 등록 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertBoardMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 게시판 관리 삭제 - 21.12.28 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteBoardMngList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 게시판 관리 수정 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBoardMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 게시판 관리 상세 조회(파일NO만) - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectBoardMngInfoByPopupNo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 게시판 관리 삭제 - 21.11.15 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteBoardMngInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	
	/**
	 * 설문관리 건수 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectQustnListCnt(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 설문관리 조회 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리 등록 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertQustn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리 답변문항등록 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertQustnAnswer(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리 질문문항등록 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertQustnQestn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	
	/**
	 * 설문관리 조회 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectQustn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 설문관리 질문문항리스트 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnQestnList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리 답변문항리스트- 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnAnswerList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 설문관리  설문수정 - 21.12.09
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateQustn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리  설문삭제 - 21.12.09
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateQustnDel(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리 질문문항삭제 - 21.12.09
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteQustnrQestn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 설문관리 답변문항삭제 - 21.12.09
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteQustnrAnswer(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 설문관리 답변결과리스트- 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnResultList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 회원정보 삭제- 22.05.02
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectUserNo(Map<String, Object> splitParam) throws DataAccessException, SQLException;
	int deleteUserNo(Map<String, Object> splitParam) throws DataAccessException, SQLException;
//	int selectBrandUserNo(Map<String, Object> splitParam) throws DataAccessException, SQLException;
	int deleteBrandUserNo(Map<String, Object> splitParam) throws DataAccessException, SQLException;
	/**
	 * 브랜드정보 삭제- 24.03.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectUserChrgBrandCnt(Map<String, Object> splitParam) throws DataAccessException, SQLException;
	int deleteUserChrgBrand(Map<String, Object> splitParam) throws DataAccessException, SQLException;
	
	
}

