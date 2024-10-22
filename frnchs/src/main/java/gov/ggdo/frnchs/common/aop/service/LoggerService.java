package gov.ggdo.frnchs.common.aop.service;

import java.sql.SQLException;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import gov.ggdo.frnchs.common.aop.dao.LoggerDao;
import gov.ggdo.frnchs.common.log.Log;

@Service("loggerService")
public class LoggerService {

	@Log Logger logger;

	@Autowired private LoggerDao loggerDao;

	public void insertMethodLog(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertMethodLog method run start!!");
		loggerDao.insertMethodLog(paramMap);
	}

}
