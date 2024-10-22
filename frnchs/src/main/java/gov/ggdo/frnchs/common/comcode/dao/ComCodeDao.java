package gov.ggdo.frnchs.common.comcode.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface ComCodeDao {

	List<EgovMap> selectComCodeList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectFranchLclasList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectFrnchsMlsfcList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectCtprvnRelmList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectSignguRelmList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectAdstrdRelmList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	String selectCodeValueNmByIdAndValue(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	int insertIntrstFrnchs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	int updateIntrstFrnchs(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
}
