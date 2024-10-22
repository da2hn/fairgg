package gov.ggdo.frnchs.ui.expr.service;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.ibm.icu.util.Calendar;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.ui.expr.dao.ExprDao;

@Service("exprService")
public class ExprService {

	@Log Logger logger;

	@Autowired private ExprDao exprDao;

	/**
	 * 프랜차이즈체험등록 목록 조회 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsExprnRegistListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnRegistListCount(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnRegistList(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectFrnchsExprnRegistInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnRegistInfo(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  insertFrnchsExprnRegist(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.insertFrnchsExprnRegist(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnRegist(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnRegist(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 상태 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnRegistSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnRegistSttus(paramMap);
	}
	/**
	 * 프랜차이즈체험등록 취소 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnRegistCancl(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnRegistCancl(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 입력 여부 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsExprnReqstCheckCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstCheckCount(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsExprnReqstListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstListCount(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnReqstList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstList(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  insertFrnchsExprnReqst(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.insertFrnchsExprnReqst(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnReqst(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnReqst(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 상태 변경
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnReqstSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnReqstSttus(paramMap);
	}
	/**
	 * 프랜차이즈체험신청 승인 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnReqstApproveSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("========================== updateFrnchsExprnReqstApproveSttus start =============================");
		//참여자 승인처리
		int resultCnt = exprDao.updateFrnchsExprnReqstSttus(paramMap);
		logger.debug("resultCnt :: " + resultCnt);
		String[] exprnReqstNoArr = (String[]) paramMap.get("exprnReqstNoArr");

		//승인처리된 내용이 있을때만
		if(resultCnt > 0) {
			//직영점 체험 기간조회
			for(String exprnReqstNo : exprnReqstNoArr) {
				paramMap.put("exprnReqstNo", exprnReqstNo);
				EgovMap reqMap = exprDao.selectExprnRegistInfo(paramMap);//체험신청번호로 신청자 정보 조회
				EgovMap frnchsExprnRegistInfo = exprDao.selectFrnchsExprnRegistInfo(paramMap);//프랜차이즈체험등록 조회
				if(frnchsExprnRegistInfo != null) {
					String exprnBeginDe = frnchsExprnRegistInfo.get("exprnBeginDe").toString();
					String exprnEndDe = frnchsExprnRegistInfo.get("exprnEndDe").toString();
					Calendar cal = Calendar.getInstance();
					DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
					Date beginDate = null;

					try {
						beginDate = format.parse(exprnBeginDe);
					} catch (ParseException e) {
						logger.debug("프랜차이즈체험신청 승인 처리 중 에러");
					}
					cal.setTime(beginDate);
					paramMap.put("reqUserNo", reqMap.get("userNo"));
					//유저, 체험직영점 번호 기준으로 모두 삭제
					exprDao.deleteFrnchsExprnDiary(paramMap);
					//체험 기간날짜에 일기장 생성
					while(true) {
						String tmpDate = format.format(cal.getTime());
						logger.debug("등록시점 tmpDate :: " + tmpDate + " // exprnEndDe :: " + exprnEndDe);
						paramMap.put("operDe", tmpDate);
						exprDao.insertFrnchsExprnDiary(paramMap);
						if(tmpDate.equals(exprnEndDe)) {
							break;
						}else {
							cal.add(Calendar.DATE, 1);
						}
					}
				}
			}
			//모집인원과 승인된 신청자수가 같으면 직영점 마감처리
			String competeAt = exprDao.selectExprnCompleteAt(paramMap);
			if("Y".equals(competeAt)) {
				Map<String, Object> completeMap = new HashMap<>();
				completeMap.put("confmSttusCode", "CS05");
				completeMap.put("ssUserNo", paramMap.get("ssUserNo"));
				completeMap.put("exprnRegistNoArr", paramMap.get("exprnRegistNo").toString().split(","));
				exprDao.updateFrnchsExprnRegistSttus(completeMap);
			}

		}
		logger.debug("========================== updateFrnchsExprnReqstApproveSttus end =============================");
	}

	/**
	 * 프랜차이즈체험신청 취소 처리
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnReqstCancl(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnReqstCancl(paramMap);
	}
	/**
	 * 체험 프랜차이즈 매칭현황 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFranMtchgMngListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFranMtchgMngListCount(paramMap);
	}
	/**
	 * 체험 프랜차이즈 매칭현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFranMtchgMngList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFranMtchgMngList(paramMap);
	}
	/**
	 * 체험 프랜차이즈 신청자 현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnReqstUserInfo(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstUserInfo(paramMap);
	}
	/**
	 * 체험 프랜차이즈 매칭현황 삭제하기
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnRegistDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnRegistDelete(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsExprnReqstConfmListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstConfmListCount(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnReqstConfmList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnReqstConfmList(paramMap);
	}
	/**
	 * 체험 예비창업자 관리현황 목록 총건수 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFrnchsExprnRegistManageListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnRegistManageListCount(paramMap);
	}
	/**
	 * 체험 예비창업자 관리현황 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnRegistManageList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnRegistManageList(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectFrnchsExprnDiaryList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectFrnchsExprnDiaryList(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 입력
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  insertFrnchsExprnDiary(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.insertFrnchsExprnDiary(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 수정
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnDiary(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnDiary(paramMap);
	}
	/**
	 * 프랜차이즈 운영 일기장 수정 드래그
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void  updateFrnchsExprnDiaryDrag(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		exprDao.updateFrnchsExprnDiaryDrag(paramMap);
	}
	/**
	 * 메인페이지 프랜차이즈체험등록 목록 조회
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectMainFrnchsExprnRegistList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return exprDao.selectMainFrnchsExprnRegistList(paramMap);
	}
}
