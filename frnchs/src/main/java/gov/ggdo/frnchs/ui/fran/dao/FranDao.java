package gov.ggdo.frnchs.ui.fran.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface FranDao {

	/**
	 * 본사 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsHedofc(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 본사 조회 모바일
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsHedofcM(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 프랜차이즈 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 본사, 업종별 상호명 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectBsnSgnalList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 본사에 존재하는 프랜차이즈 대분류 업종
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectHedofcNoFranchLclasList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 본사에 존재하는 프랜차이즈 중분류 업종
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectHedofcNoFrnchsMlsfcList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 프랜차이즈 부가정보 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	/**
	 * 프랜차이즈 인기키워드 TOP10
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectPopularityKeyword(Map<String, Object> paramMap) throws DataAccessException, SQLException;	
	
	//통합검색시 프랜차이즈 번호 조회 22.01.06
	EgovMap selectSearchFrnchsNo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	List<EgovMap> selectFrnchsInfoByFrchsNo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	List<EgovMap> selectFrnchsInfoByYear(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	List<EgovMap> selectFrnchsInfoBySido(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	int selectAttnFrnchsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectAttnFrnchsList(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	List<EgovMap> selectDensityInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	List<EgovMap> selectDensityTrend(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	int selectIntrstFrnchsListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	List<EgovMap> selectIntrstFrnchsList(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 착한 프랜차이즈 본사 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectGoodFrnchsExprnRegistListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 착한 프랜차이즈 본사 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectGoodFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 착한 프랜차이즈 본사 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 착한 프랜차이즈 본사 지정 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 착한 프랜차이즈 본사 지정 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateGoodFrnchsAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	/**
	 * 착한 프랜차이즈 본사 지정 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectGoodFrnchsAdiList(Map<String, Object> paramMap) throws DataAccessException, SQLException ;

	/**
	 * 내 프랜차이즈 관리 목록 갯수 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsInfoListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 내 프랜차이즈 관리 목록 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFrnchsInfoList(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 상세 정보 목록 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectFrnchsInfoForAdi(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 상세 정보 수정 - 21.01.25
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int modifyFrnchsInfoForAdi(Map<String, Object> paramMap) throws DataAccessException, SQLException;


	List<EgovMap> selectPopulLegendInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	List<EgovMap> selectCardLegendInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	List<EgovMap> selectOvpopLegendInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;

//	List<EgovMap> selectPopulLegendInfo2(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	List<EgovMap> selectWorkerInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;
//	List<EgovMap> selectCardLegendInfo2(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	List<EgovMap> selectRevenueInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 번호로 프랜차이즈 정보 조회
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectBsnSgnal(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 브랜드 정보 관리 목록 갯수
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectBrandInfoListCnt(Map<String, Object> reqParam) throws DataAccessException, SQLException;

	/**
	 * 브랜드 정보 관리 목록
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectBrandInfoList(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 브랜드 상세 정보
	 * @param reqParam
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectBrandInfoForAdi(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	
	/**
	 * 브랜드정보 삭제
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int deleteBrandAdiInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	
	/**
	 * 브랜드 통합검색 - 자동완성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSchBrandAutoCmptList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 저장 - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int insertSchBrandHistory(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 조회 - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectSchBrandHistoryList(Map<String, Object> paramMap) throws DataAccessException, SQLException;
	
	/**
	 * 브랜드 통합검색 > 검색어 내역 삭제(수정) - 21.11.25 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateSchBrandHistoryInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	
	/**
	 * 프랜차이즈 본사 상벌 관리 목록 조회 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectRewardList(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 본사 상벌 관리 목록 수 조회 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectRewardListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 본사 상벌 관리 삭제 - 21.12.08 주한별
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	void updateRewardDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException ;
	
	/**
	 * 프랜차이즈 본사 상벌 관리 등록 - 21.12.08 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int updateRewardInsert(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 본사 상벌 관리 정보 조회 - 21.12.08 주한별
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	EgovMap selectRewardInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException;
	/**
	 * 본사팝업창 count
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int selectFrnchsHedofcCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException ;
}
