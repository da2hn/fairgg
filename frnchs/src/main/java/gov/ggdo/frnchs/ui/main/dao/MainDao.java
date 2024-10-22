package gov.ggdo.frnchs.ui.main.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface MainDao {

	List<EgovMap> selectCodeList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectChartIntrst(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectChartFairUsage(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	//현재 검색내역 중 중복 제외 총 목록 수 조회 - 22.01.14
	int selectTopListNowCount() throws DataAccessException, SQLException;
	
	//인기 프랜차이즈 TOP10 조회 
	List<EgovMap> selectTopTen(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	//관심업종 TOP5 중분류 명
	List<EgovMap> selectChartIntrstNmList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	//창업상담 게시판 url 조회
	EgovMap selectBoardLc(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
}
