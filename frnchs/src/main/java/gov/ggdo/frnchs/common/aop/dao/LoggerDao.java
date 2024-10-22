package gov.ggdo.frnchs.common.aop.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.dao.DataAccessException;


public interface LoggerDao {
	void insertMethodLog(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
}
