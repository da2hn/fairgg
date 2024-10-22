package gov.ggdo.frnchs.ui.expr.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface ExprDao {

	/**
	 * 프랜차이즈체험등록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsExprnRegistListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectFrnchsExprnRegistInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  insertFrnchsExprnRegist(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnRegist(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 상태 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnRegistSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험등록 취소 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnRegistCancl(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 등록 여부 체크
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsExprnReqstCheckCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsExprnReqstListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnReqstList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  insertFrnchsExprnReqst(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnReqst(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 상태 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int  updateFrnchsExprnReqstSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈체험신청 취소 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnReqstCancl(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 프랜차이즈 매칭현황 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFranMtchgMngListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 프랜차이즈 매칭현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFranMtchgMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 프랜차이즈 신청자 현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnReqstUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 프랜차이즈 매칭현황 삭제하기
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnRegistDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsExprnReqstConfmListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnReqstConfmList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 예비창업자 관리현황 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsExprnRegistManageListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험 예비창업자 관리현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnRegistManageList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsExprnDiaryList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  insertFrnchsExprnDiary(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 삭제
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  deleteFrnchsExprnDiary(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnDiary(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 프랜차이즈 운영 일기장 수정 드래그
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void  updateFrnchsExprnDiaryDrag(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 체험신청번호로 체험등록 정보 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectExprnRegistInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 모집인원과 승인된 신청자수가 같은지 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	String selectExprnCompleteAt(Map<String, Object> paramMap) throws DataAccessException, SQLException ;

	/**
	 * 메인페이지 프랜차이즈체험등록 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectMainFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
}
