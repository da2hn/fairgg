package gov.ggdo.frnchs.common.menu.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface MenuDao {

	List<EgovMap> selectMenuList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectQustnrList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectMyPageMenuList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectMobMenuList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
}
