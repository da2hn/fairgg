package gov.ggdo.frnchs.common.comcode.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.comcode.dao.ComCodeDao;
import gov.ggdo.frnchs.common.log.Log;

@Service("comcodeService")
public class ComCodeService {

	@Log Logger logger;

	@Autowired private ComCodeDao comCodeDao;

	public List<EgovMap> selectComCodeList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectComCodeList method run start!!");
		return comCodeDao.selectComCodeList(paramMap);
	}
	public List<EgovMap> selectFranchLclasList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFranchLclasList method run start!![업종 대분류]");
		return comCodeDao.selectFranchLclasList(paramMap);
	}
	public List<EgovMap> selectFrnchsMlsfcList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFrnchsMlsfcList method run start!![업종 중분류]");
		return comCodeDao.selectFrnchsMlsfcList(paramMap);
	}
	public List<EgovMap> selectCtprvnRelmList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectCtprvnRelmList method run start!![시도]");
		return comCodeDao.selectCtprvnRelmList(paramMap);
	}
	public List<EgovMap> selectSignguRelmList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectSignguRelmList method run start!![시군구]");
		return comCodeDao.selectSignguRelmList(paramMap);
	}
	public List<EgovMap> selectAdstrdRelmList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectAdstrdRelmList method run start!![행정동]");
		return comCodeDao.selectAdstrdRelmList(paramMap);
	}
	public String selectCodeValueNmByIdAndValue(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectCodeValueNmByIdAndValue method run start!!");
		return comCodeDao.selectCodeValueNmByIdAndValue(paramMap);
	}
	
	public int insertIntrstFrnchs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertIntrstFrnchs method run start!!");
		return comCodeDao.insertIntrstFrnchs(paramMap);
	}
	
	public int updateIntrstFrnchs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateIntrstFrnchs method run start!!");
		return comCodeDao.updateIntrstFrnchs(paramMap);
	}
	
	
}
