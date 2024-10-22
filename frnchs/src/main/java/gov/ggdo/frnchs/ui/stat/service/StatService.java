package gov.ggdo.frnchs.ui.stat.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.ui.stat.dao.StatDao;

@Service("statService")
public class StatService {

	@Log Logger logger;

	@Autowired private StatDao statDao;

	//여기부터
	public List<EgovMap> selectFranStat(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranStat");
		return statDao.selectFranStat(paramMap);
	}

	public List<EgovMap> selectFranBrandStat(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranBrandStat");
		return statDao.selectFranBrandStat(paramMap);
	}
	
	public EgovMap selectFranRecentYear(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranRecentYear");
		return statDao.selectFranRecentYear(paramMap);
	}

	public List<EgovMap> selectFranStatTrend(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranStatTrend");
		return statDao.selectFranStatTrend(paramMap);
	}

	public List<EgovMap> selectDataYear(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectDataYear");
		return statDao.selectDataYear(paramMap);
	}

	public List<EgovMap> selectFrchsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFrchsList");
		return statDao.selectFrchsList(paramMap);
	}

	/**
	 * 프랜차이즈 분포 현황  2019년(최근연도) / 전체 업종 / 전국 단위 프랜차이즈 가맹점 + 직영점 수
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFranFullStatList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranFullStatList");
		return statDao.selectFranFullStatList(paramMap);
	}
	/**
	 * 프랜차이즈 업종 순위
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFranIndutyLankList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFranIndutyLankList");
		return statDao.selectFranIndutyLankList(paramMap);
	}

	public int selectFrchsListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException{
		logger.debug("selectFrchsListCount");
		return statDao.selectFrchsListCount(reqParam);
	}


}
