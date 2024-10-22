package gov.ggdo.frnchs.ui.surv.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.ui.surv.dao.SurvDao;

@Service("survService")
public class SurvService {

	@Log Logger logger;

	@Autowired private SurvDao survDao;

	/**
	 * 기간 내 설문조사순번 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public String selectQustnrSn(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		return survDao.selectQustnrSn(paramMap);
	}
	
	/**
	 * 설문조사 질문문항리스트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnQestnList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return survDao.selectQustnQestnList(paramMap);
	}
	
	/**
	 * 설문조사 답변문항리스트
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List selectQustnAnswerList(Map<String, Object> paramMap) throws DataAccessException, SQLException{
		return survDao.selectQustnAnswerList(paramMap);
	}	

	/**
	 * 설문조사 여부 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public String selectQustnResultAt(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		return survDao.selectQustnResultAt(paramMap);
	}	
	
	/**
	 * 설문관리  설문등록-
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int mergeQustnResult(Map<String, Object> paramMap) throws DataAccessException, SQLException, IOException {
		HashMap<String, Object> jsonMap = jsonMap = new ObjectMapper().readValue((String)paramMap.get("json"), HashMap.class);
		List list = (List)jsonMap.get("list");
		for(int i=0; i<list.size(); i++) {
			Map<String,Object> map = (Map<String,Object>)list.get(i);
//			map.put("ssUserNo", paramMap.get("ssUserNo"));
			map.put("userIp", paramMap.get("userIp"));
			survDao.mergeQustnResult(map);	
		}
		return 1;
	}

}
