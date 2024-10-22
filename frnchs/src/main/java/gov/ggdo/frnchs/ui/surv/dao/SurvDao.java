package gov.ggdo.frnchs.ui.surv.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface SurvDao {

	/**
	 * 기간 내 설문조사순번 조회 - 21.12.28 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	String selectQustnrSn(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문조사 질문문항리스트 - 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnQestnList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문조사답변문항리스트- 21.12.09 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectQustnAnswerList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문조사 여부 조회 - 22.01.10 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	String selectQustnResultAt(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	/**
	 * 설문관리  설문등록- 21.12.09
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	int mergeQustnResult(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
}
