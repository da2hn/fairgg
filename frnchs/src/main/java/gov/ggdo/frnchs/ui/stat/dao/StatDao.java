package gov.ggdo.frnchs.ui.stat.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import egovframework.rte.psl.dataaccess.util.EgovMap;


public interface StatDao {

	//여기부터 진행중
	List<EgovMap> selectFranStat(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectFranBrandStat(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	EgovMap selectFranRecentYear(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	List<EgovMap> selectFranStatTrend(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	List<EgovMap> selectDataYear(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	List<EgovMap> selectFrchsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;

	/**
	 * 프랜차이즈 분포 현황  2019년(최근연도) / 전체 업종 / 전국 단위 프랜차이즈 가맹점 + 직영점 수
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFranFullStatList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	/**
	 * 프랜차이즈 업종 순위
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	List<EgovMap> selectFranIndutyLankList(Map<String, Object> paramMap)  throws DataAccessException, SQLException;
	
	int selectFrchsListCount(Map<String, Object> reqParam) throws DataAccessException, SQLException;


}
