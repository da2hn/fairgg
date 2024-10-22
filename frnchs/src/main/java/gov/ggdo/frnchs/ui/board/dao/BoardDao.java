package gov.ggdo.frnchs.ui.board.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface BoardDao {

	/**
	 * 창업게시판 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFntnBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFntnBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectFntnBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 내용 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertFntnBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 내용 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateFntnBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 답글 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateFntnBbsAnswer(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 삭제 처리
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteFntnBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 글 조회수 증가
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateFntnBbsUpRdcnt(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 창업게시판 이전/다음 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectFntnBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 불공정계약신고 작성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 불공정계약신고 답변 작성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 불공정계약신고 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInjstBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 불공정계약신고 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInjstBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 불공정계약신고 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectNoticeBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 이전/다음 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectNoticeBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectNoticeBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 공지사항 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 정보 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertTradeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateTradeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateTradeBbsMob(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectTradeBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectTradeBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 점포장터 매물점포 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectTradeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 매물점포 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectMypageTradeBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 매물점포 문의목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInqryListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 매물점포 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectMypageTradeBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 매물점포 문의목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInqryList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 매물점포 승인상태 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateTradeSttus(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 문의사항 답변등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInqrySttus(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 허위매물신고 내용 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertFlshdTrde(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 컨설턴트 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectConsultantList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 점포관리확인 컨설턴트배정 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateAssignConsultant(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 정보공개 교육 신청
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertInfoOpenEdc(Map<String, Object> params)  throws DataAccessException, SQLException;
	/**
	 * 익명제보 신청
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertAnnymtyBoard(Map<String, Object> params)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInfoDcsEduList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectAnnymtyList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리목록 수 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInfoDcsEduListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 마이페이지 정보공개서등록 > 익명게시판 관리목록 수 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectAnnymtyListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 마이페이지 교육신청 관리 > 삭제 - 22.04.11 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInfoDcsEduDelete(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 익명게시판 관리 > 삭제 - 22.06.20 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateAnnymtyListDelete(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInfoOthbcBbsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 이전 다음 글 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectInfoOthbcBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInfoOthbcBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 마이페이지 관리자게시판관리 정보공개 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectInfoOthbcBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 정보공개 목록 > 공정거래홍보관 조회 - 21.03.04
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFairTradePrList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 정보공개 목록 > 공정거래홍보관 조회  ajax- 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFairTradePrListAjax(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 정보공개 목록 > 공정거래홍보관 목록 수 조회 ajax - 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFairTradePrListCountAjax(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 통합게시판(공지사항 + 정보공개)목록 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectIntegList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 관리자 게시판관리 목록 조회 - 22.01.14 염종찬
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectUnitNoticeList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 통합게시판(공지사항 + 정보공개)목록  수 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectIntegListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 게시판관리 목록  수 조회 - 22.01.14 염종찬
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectUnitNoticeListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 통합게시판(공지사항 + 정보공개)보기(상세) 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectIntegBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 통합게시판(공지사항 + 정보공개) 이전 다음 글 조회 - 21.11.24 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectIntegBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;	
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 수정 - 21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateIntegBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 삭제 - 21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteIntegBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 등록 -21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertIntegBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/* 마이페이지 정보공개서 관리 목록 조회 - 21.12.09  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInfoDcsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 브랜드관리자 목록 조회 - 21.12.09  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectBrandHedofcList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
		/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 목록 조회 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInfoAdminList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 목록 수 조회 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInfoAdminListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자 배정 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateAssignInfoAdmin(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 승인 or 반려 처리 - 21.12.10  주한별
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateInfoDcsSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	
	/**
	 * 마이페이지 정보공개서관리 목록 수 조회 - 21.12.10 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInfoDcsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 브랜드관리자 수정 - 21.12.09 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateBrandHedofc(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서등록 > 목록조회 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectInfoDcsInfoList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서등록 > 목록 수 조회 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectInfoDcsInfoListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 관리 > 삭제 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInfoDcsInfoDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 마이페이지 정보공개서 관리 > 삭제시 정보 조회 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	Map<String, Object> selectInfoDcsInfoByNo(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 마이페이지 정보공개서 정보공개서 등록 - 21.12.09 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertInfoDcsEnrol(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 정보공개서등록 > 등록 - 21.12.09 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	String selectInfoDcsFrnchsNm(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 정보공개서 수정 - 21.12.09 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateInfoDcsEnrol(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 마이페이지 정보공개서 정보공개서 삭제- 21.12.13 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteInfoDcsEnrol(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 마이페이지 정보공개서관리 > 정보공개서등록 > 등록화면 기존데이터 조회 - 21.12.13
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectInfoDcsEnrollData(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 매물점포 문의사항 등록- 21.12.22 서가영
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertTradeinqry(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	List<EgovMap> selectUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int selectUnityBoardCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int selectUnityNoticeCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	Object selectUnityBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	List<EgovMap> selectBbsComment(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int deleteUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int updateUnityBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	void updateBoardRdcnt(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	Object selectUnityBbsNextInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	EgovMap selectBbsMaster(String masterSn) throws DataAccessException, SQLException;
	
	int insertUnityBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int deleteComment(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int insertBbsComment(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int selectBbsMasterCount(String masterSn) throws DataAccessException, SQLException;
	
	List<EgovMap> selectUnitNoticeOption(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	EgovMap selectUnitBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	String selectIntegBbsUrl();
	
	List<EgovMap> selectTotalSwiper(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	List<EgovMap> selectMainBbsInteg(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	int selectUserUnityBoardCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	List<EgovMap> selectUserUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	EgovMap selectUserUnitBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException;

}
