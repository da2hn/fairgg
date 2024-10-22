package gov.ggdo.frnchs.common.menu.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.menu.dao.MenuDao;

@Service("menuService")
public class MenuService {

	@Log Logger logger;

	@Autowired private MenuDao menuDao;

	public List<EgovMap> selectMenuList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectMenuList method run start!!");
		return menuDao.selectMenuList(paramMap);
	}
	public List<EgovMap> selectQustnrList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectQustnrList method run start!!");
		return menuDao.selectQustnrList(paramMap);
	}
	public List<EgovMap> selectMyPageMenuList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectMyPageMenuList method run start!!");
		return menuDao.selectMyPageMenuList(paramMap);
	}
	public List<EgovMap> selectMobMenuList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectMyPageMenuList method run start!!");
		return menuDao.selectMobMenuList(paramMap);
	}
}
