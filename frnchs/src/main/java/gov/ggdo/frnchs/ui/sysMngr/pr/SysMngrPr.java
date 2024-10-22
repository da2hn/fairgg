package gov.ggdo.frnchs.ui.sysMngr.pr;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface SysMngrPr {
	
	int callPrUserDataPartitn(Map<String, Object> reqParam) throws SQLException, DataAccessException;
	int callPrFrnchsCtprvnSm(Map<String, Object> reqParam) throws SQLException, DataAccessException;
	int callPrFrnchsIndex(Map<String, Object> reqParam) throws SQLException, DataAccessException;
	int callStorMxmCtprvn(Map<String, Object> reqParam) throws SQLException, DataAccessException;
	EgovMap selectTest(Map<String, Object> reqParam) throws SQLException, DataAccessException;
	
}
