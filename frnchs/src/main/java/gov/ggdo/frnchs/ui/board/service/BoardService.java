package gov.ggdo.frnchs.ui.board.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.file.service.FileService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.common.util.mail.service.MailSendService;
import gov.ggdo.frnchs.ui.board.dao.BoardDao;

@Service("boardService")
public class BoardService {

	@Log Logger logger;

	@Autowired private BoardDao boardDao;
	@Autowired private MailSendService mss;
	@Autowired private FileService fileService;
	@Autowired private EncryptService encryptService;


	/**
	 * 창업게시판 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFntnBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFntnBbsListCount method run start!!");
		return boardDao.selectFntnBbsListCount(paramMap);
	}
	/**
	 * 창업게시판 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws UnsupportedEncodingException
	 */
	public List<EgovMap> selectFntnBbsList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		logger.debug("selectFntnBbsList method run start!!");
		List<EgovMap> dataList = boardDao.selectFntnBbsList(paramMap);
		return fileService.putZipFileKey(dataList);
	}
	/**
	 * 창업게시판 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectFntnBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectFntnBbs method run start!!");
		boardDao.updateFntnBbsUpRdcnt(paramMap);
		return boardDao.selectFntnBbs(paramMap);
	}
	/**
	 * 창업게시판 내용 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertFntnBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertFntnBbs method run start!!");
		return boardDao.insertFntnBbs(paramMap);
	}
	/**
	 * 창업게시판 내용 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateFntnBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateFntnBbs method run start!!");
		return boardDao.updateFntnBbs(paramMap);
	}
	/**
	 * 창업게시판 답글 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateFntnBbsAnswer(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateFntnBbsAnswer method run start!!");
		return boardDao.updateFntnBbsAnswer(paramMap);
	}
	/**
	 * 창업게시판 삭제 처리
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteFntnBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("deleteFntnBbs method run start!!");
		return boardDao.deleteFntnBbs(paramMap);
	}
	/**
	 * 창업게시판 삭제(다중) 처리
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteMultiFntnBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("deleteFntnBbs method run start!!");
		int rst = 0;
		if(!(paramMap.get("chkRowRe")).equals("")) {
			String[] arrIdx = paramMap.get("chkRowRe").toString().split(",");
			for (int i=0; i<arrIdx.length; i++) {
				paramMap.put("answerCn", "");
				paramMap.put("answerFntnSportSn", arrIdx[i]);
				rst = boardDao.updateFntnBbsAnswer(paramMap);
			}
		}
		if(!(paramMap.get("chkRowSn")).equals("")) {
			String[] arrIdx = paramMap.get("chkRowSn").toString().split(",");
			for (int i=0; i<arrIdx.length; i++) {
				paramMap.put("fntnSportSn", arrIdx[i]);
				rst = boardDao.deleteFntnBbs(paramMap);
			}
		}
		return rst;
	}
	/**
	 * 창업게시판 글 조회수 증가
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateFntnBbsUpRdcnt(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateFntnBbsUpRdcnt method run start!!");
		return boardDao.updateFntnBbsUpRdcnt(paramMap);
	}
	/**
	 * 창업게시판 이전/다음 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectFntnBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectFntnBbsNextInfo method run start!!");
		return boardDao.selectFntnBbsNextInfo(paramMap);
	}
	/**
	 * 불공정계약신고 작성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("insertInjstBbs method run start!!");
		return boardDao.insertInjstBbs(paramMap);
	}
	/**
	 * 불공정계약신고 답변 작성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateInjstBbs method run start!!");
		mss.sendReportMail(paramMap);//메일 전송
		return boardDao.updateInjstBbs(paramMap);
	}
	/**
	 * 불공정계약신고 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInjstBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectInjstBbsListCount method run start!!");
		return boardDao.selectInjstBbsListCount(paramMap);
	}
	/**
	 * 불공정계약신고 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectInjstBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectInjstBbsList method run start!!");
		return boardDao.selectInjstBbsList(paramMap);
	}
	/**
	 * 불공정계약신고 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectInjstBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectInjstBbs method run start!!");
		return boardDao.selectInjstBbs(paramMap);
	}
	/**
	 * 공지사항 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectNoticeBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectNoticeBbsListCount method run start!!");
		return boardDao.selectNoticeBbsListCount(paramMap);
	}
	/**
	 * 공지사항 이전/다음 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectNoticeBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectNoticeBbsNextInfo method run start!!");
		return boardDao.selectNoticeBbsNextInfo(paramMap);
	}
	/**
	 * 공지사항 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectNoticeBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectNoticeBbsList method run start!!");
		return boardDao.selectNoticeBbsList(paramMap);
	}
	/**
	 * 공지사항 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectNoticeBbs method run start!!");
		return boardDao.selectNoticeBbs(paramMap);
	}
	/**
	 * 공지사항 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("insertNoticeBbs method run start!!");
		return boardDao.insertNoticeBbs(paramMap);
	}
	/**
	 * 공지사항 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateNoticeBbs method run start!!");
		return boardDao.updateNoticeBbs(paramMap);
	}
	/**
	 * 공지사항 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteNoticeBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("deleteNoticeBbs method run start!!");
		return boardDao.deleteNoticeBbs(paramMap);
	}

	/**
	 * 점포장터 매물점포 정보 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertTradeBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertTradeBbs method run start!!");
		return boardDao.insertTradeBbs(paramMap);
	}
	
	/**
	 * 점포장터 매물점포 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateTradeBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateTradeBbs method run start!!");
		return boardDao.updateTradeBbs(paramMap);
	}
	
	/**
	 * 점포장터 매물점포 정보 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateTradeBbsMob(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("updateTradeBbsMob method run start!!");
		return boardDao.updateTradeBbsMob(paramMap);
	}

	/**
	 * 점포장터 매물점포 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectTradeBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectTradeBbsListCount method run start!!");
		return boardDao.selectTradeBbsListCount(paramMap);
	}
	/**
	 * 점포장터 매물점포 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectTradeBbsList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectTradeBbsList method run start!!");
		return boardDao.selectTradeBbsList(paramMap);
	}
	/**
	 * 점포장터 매물점포 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectTradeBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectTradeBbs method run start!!");
		return boardDao.selectTradeBbs(paramMap);
	}

	/**
	 * 점포장터 매물점포 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectMypageTradeBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectMypageTradeBbsListCount method run start!!");
		return boardDao.selectMypageTradeBbsListCount(paramMap);
	}
	
	/**
	 * 마이페이지 매물점포 문의목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInqryListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectMypageTradeBbsListCount method run start!!");
		return boardDao.selectInqryListCount(paramMap);
	}
	
	/**
	 * 마이페이지 매물점포 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws UnsupportedEncodingException
	 */
	public List<EgovMap> selectMypageTradeBbsList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		logger.debug("selectMypageTradeBbsList method run start!!");
		List<EgovMap> dataList = boardDao.selectMypageTradeBbsList(paramMap);
		return fileService.putZipFileKey(dataList);
	}
	/**
	 * 마이페이지 매물점포 문의목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws UnsupportedEncodingException
	 */
	public List<EgovMap> selectInqryList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		logger.debug("selectMypageTradeBbsList method run start!!");
		List<EgovMap> dataList = boardDao.selectInqryList(paramMap);
		return fileService.putZipFileKey(dataList);
	}
	/**
	 * 마이페이지 매물점포 승인상태 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateTradeSttus(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateTradeSttus method run start!!");

		if("US02".equals(paramMap.get("ssUserSeCode"))) { //컨설턴트
			if("apprChked".equals(paramMap.get("sttus"))) {
				paramMap.put("confmSttusCode", "CS04"); //검토중
			} else if("apprReturn".equals(paramMap.get("sttus"))) {
				paramMap.put("confmSttusCode", "CS02"); //반려
			}

		} else if("US04".equals(paramMap.get("ssUserSeCode"))) { //기관관리자
			int rst = 0;
			if("apprConfm".equals(paramMap.get("sttus"))) {
				paramMap.put("confmSttusCode", "CS01"); //승인
			} else if("apprExpired".equals(paramMap.get("sttus"))) {
				paramMap.put("confmSttusCode", "CS05"); //마감
			} else if("apprReturn".equals(paramMap.get("sttus"))) {// 화면설계에 반려 있음 (마감은 없음) 22.01.04
				paramMap.put("confmSttusCode", "CS02"); //반려
			} else if("apprDelete".equals(paramMap.get("sttus"))) {//21.12.13 추가
				paramMap.put("confmSttusCode", "CS08"); //삭제
			}

			if(!(paramMap.get("chkRowSn")).equals("")) {
				String[] arrIdx = paramMap.get("chkRowSn").toString().split(",");
				for (int i=0; i<arrIdx.length; i++) {
					paramMap.put("trdeThingRegistNo", arrIdx[i]);
					rst = boardDao.updateTradeSttus(paramMap);
				}
			}
			return rst;

		} else if("US01".equals(paramMap.get("ssUserSeCode"))) { //일반사용자 - 신청취소, 삭제요청??
			int rst = 0;
			if("apprExpired".equals(paramMap.get("sttus"))) {
				paramMap.put("confmSttusCode", "CS05"); //신청취소 (마감처리)
			} else if("deleteConfm".equals(paramMap.get("sttus"))) { //삭제요청
				paramMap.put("confmSttusCode", "CS07");
			}

			if(!(paramMap.get("chkRowSn")).equals("")) {
				String[] arrIdx = paramMap.get("chkRowSn").toString().split(",");
				for (int i=0; i<arrIdx.length; i++) {
					paramMap.put("trdeThingRegistNo", arrIdx[i]);
					rst = boardDao.updateTradeSttus(paramMap);
				}
			}
			return rst;

		} else {
			return 0;
		}

		return boardDao.updateTradeSttus(paramMap);
	}
	
	/**
	 * 마이페이지 문의사항 답변등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateInqrySttus(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateInqrySttus method run start!!");
		paramMap.put("answerSttusSeCode", "AN01"); //검토중
		return boardDao.updateInqrySttus(paramMap);
	}

	/**
	 * 허위매물신고 내용 저장
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertFlshdTrde(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertFlshdTrde method run start!!");
		return boardDao.insertFlshdTrde(paramMap);
	}

	/**
	 * 컨설턴트 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectConsultantList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectConsultantList method run start!!");
		return boardDao.selectConsultantList(paramMap);
	}

	/**
	 * 마이페이지 점포관리확인 컨설턴트배정 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateAssignConsultant(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateAssignConsultant method run start!!");
		if(paramMap.get("chrgCnstntUserNo").toString().equals("")) {
			paramMap.put("chrgCnstntUserNo", null);
		}
		return boardDao.updateAssignConsultant(paramMap);
	}

	/**
	 * 정보공개 등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("insertInfoOthbcBbs method run start!!");
		return boardDao.insertInfoOthbcBbs(paramMap);
	}
	/**
	 * 정보공개 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateInfoOthbcBbs method run start!!");
		return boardDao.updateInfoOthbcBbs(paramMap);
	}
	/**
	 * 정보공개 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("deleteInfoOthbcBbs method run start!!");
		return boardDao.deleteInfoOthbcBbs(paramMap);
	}
	/**
	 * 정보공개 목록 개수 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInfoOthbcBbsListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("selectInfoOthbcBbsListCount method run start!!");
		return boardDao.selectInfoOthbcBbsListCount(paramMap);
	}
	/**
	 * 정보공개 이전/다음 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectInfoOthbcBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectInfoOthbcBbsNextInfo method run start!!");
		return boardDao.selectInfoOthbcBbsNextInfo(paramMap);
	}
	/**
	 * 정보공개 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectInfoOthbcBbsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectInfoOthbcBbsList method run start!!");
		return boardDao.selectInfoOthbcBbsList(paramMap);
	}
	/**
	 * 정보공개 내용 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectInfoOthbcBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("selectInfoOthbcBbs method run start!!");
		return boardDao.selectInfoOthbcBbs(paramMap);
	}
	/**
	 * 정보공개 교육 신청
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertInfoOpenEdc(Map<String, Object> params)  throws DataAccessException, SQLException{
		logger.debug("insertInfoOpenEdc method run start!!");
		return boardDao.insertInfoOpenEdc(params);
	}
	/**
	 * 익명제보 신청
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertAnnymtyBoard(Map<String, Object> params)  throws DataAccessException, SQLException{
		logger.debug("insertAnnymtyBoard method run start!!");
		return boardDao.insertAnnymtyBoard(params);
	}
	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectInfoDcsEduList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectInfoDcsEduList(paramMap);
	}
	/**
	 * 마이페이지 정보공개서등록 > 익명게시판 관리 조회 - 22.06.20 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws UnsupportedEncodingException 
	 */
	public List<EgovMap> selectAnnymtyList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		List<EgovMap> list = boardDao.selectAnnymtyList(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				Object atchmnflNo = map.get("atchmnflNo");
				Object fileSn =  map.get("fileSn");
				String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
				String encFileKey = encryptService.encryptedStr(fileKey);
				map.put("fileKey", encFileKey);
				newList.add(i, map);
			}
		}
		return newList;
	}
	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리목록 수 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInfoDcsEduListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectInfoDcsEduListCount(paramMap);
	}
	/**
	 * 마이페이지 정보공개서등록 > 익명게시판 관리목록 수 조회 - 22.03.29 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectAnnymtyListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectAnnymtyListCount(paramMap);
	}
	/**
	 * 마이페이지 교육신청 관리 > 삭제 - 22.04.11 김진호
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateInfoDcsEduDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		int deleteCount = 0;
		String[] infoDcsRegistNo = paramMap.get("infoDcsRegistNoArr").toString().split(",");
		for (int i = 0; i < infoDcsRegistNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			splitParam.put("infoDcsRegistNo", infoDcsRegistNo[i]);
			
				deleteCount+= boardDao.updateInfoDcsEduDelete(splitParam);
		}
		return deleteCount;
	}
	/**
	 * 마이페이지 익명게시판 관리 > 삭제
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateAnnymtyListDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		int deleteCount = 0;
		String[] infoDcsRegistNo = paramMap.get("infoDcsRegistNoArr").toString().split(",");
		for (int i = 0; i < infoDcsRegistNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			splitParam.put("infoDcsRegistNo", infoDcsRegistNo[i]);
			
				deleteCount+= boardDao.updateAnnymtyListDelete(splitParam);
		}
		return deleteCount;
	}
	/**
	 * 정보공개 목록 > 공정거래홍보관 조회 - 21.03.04
	 * @param paramMap
	 * @throws Exception
	 * @return
	 */
	public List<EgovMap> selectFairTradePrList(Map<String, Object> paramMap) throws Exception {
		logger.debug("selectFairTradePrList method run start!!");
		
		List<EgovMap> dataList = boardDao.selectFairTradePrList(paramMap);
		
		for(EgovMap tmpMap : dataList) {
			//이미지 주소 추출
			if(tmpMap.get("faitTradeBbsKey") != null) {
				logger.debug(">>> FAIT_TRADE_BBS_KEY 있음");
				String fileKey = tmpMap.get("faitTradeBbsKey").toString();
				String[] tmpArr = tmpMap.get("faitTradeBbsKey").toString().split("_");
				String atchmnflNo = tmpArr[0];
				String fileSn = tmpArr[1];
				String encFileKey = encryptService.encryptedStr(fileKey);
				tmpMap.put("fileKey", encFileKey);
				tmpMap.put("atchmnflNo", atchmnflNo);
				tmpMap.put("fileSn", fileSn);
			}
		}
		return dataList;
	}
	
	/**
	 * 정보공개 목록 > 공정거래홍보관 조회 ajax - 21.12.28
	 * @param paramMap
	 * @throws Exception
	 * @return
	 */
	public List<EgovMap> selectFairTradePrListAjax(Map<String, Object> paramMap) throws Exception {
		logger.debug("selectFairTradePrList method run start!!");
		
		List<EgovMap> dataList = boardDao.selectFairTradePrListAjax(paramMap);
		for(EgovMap tmpMap : dataList) {
			//이미지 주소 추출
			if(tmpMap.get("faitTradeBbsKey") != null) {
				logger.debug(">>> FAIT_TRADE_BBS_KEY 있음");
				String fileKey = tmpMap.get("faitTradeBbsKey").toString();
				String[] tmpArr = tmpMap.get("faitTradeBbsKey").toString().split("_");
				String atchmnflNo = tmpArr[0];
				String fileSn = tmpArr[1];
				String encFileKey = encryptService.encryptedStr(fileKey);
				tmpMap.put("fileKey", encFileKey);
				tmpMap.put("atchmnflNo", atchmnflNo);
				tmpMap.put("fileSn", fileSn);
			}
		}
		return dataList;
	}
	
	public List<EgovMap> selectIntegList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectIntegList(paramMap);
	}
	
	/**
	 * 관리자 게시판관리  목록 조회 ajax - 22.01.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectUnitNoticeList(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectUnitNoticeList(paramMap);
	}
	
	/**
	 * 정보공개 목록 > 공정거래홍보관 목록 수 조회 ajax - 21.12.28
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectFairTradePrListCountAjax(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectFairTradePrListCountAjax(paramMap);
	}
	
	/**
	 * 통합게시판(공지사항 + 정보공개)목록 수 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectIntegListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectIntegListCount(paramMap);
	}
	
	/**
	 * 게시판관리 목록수 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectUnitNoticeListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectUnitNoticeListCount(paramMap);
	}
	
	/**
	 * 통합게시판(공지사항 + 정보공개)보기(상세) 조회 - 21.11.23 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectIntegBbs(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectIntegBbs(paramMap);
	}
	
	/**
	 * 통합게시판(공지사항 + 정보공개) 이전 다음 글 조회 - 21.11.24 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectIntegBbsNextInfo(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		return boardDao.selectIntegBbsNextInfo(paramMap);
	}
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 수정 - 21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	public int updateIntegBbs(Map<String, Object> paramMap, MultipartFile atchFile)  throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException {
		return boardDao.updateIntegBbs(paramMap);
	}
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 삭제 - 21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int deleteIntegBbs(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		int deleteCount = 0;

		paramMap.put("atchmnflNo", ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString());
		
		if(paramMap.get("atchmnflNo") != null && !StringUtils.isEmpty(paramMap.get("atchmnflNo"))) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		deleteCount+= boardDao.deleteIntegBbs(paramMap);
	
		return deleteCount;
	}
	
	/**
	 * 마이페이지 > 관리자 게시판관리 > 게시글 등록 -21.12.14
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	public int insertIntegBbs(Map<String, Object> paramMap, MultipartFile atchFile)  throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException {
		return boardDao.insertIntegBbs(paramMap);
	}
	
	
	/* 마이페이지 정보공개서 관리 목록 조회 - 21.12.09  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectInfoDcsList(Map<String, Object> paramMap)  throws DataAccessException, SQLException, UnsupportedEncodingException {
		List<EgovMap> list = boardDao.selectInfoDcsList(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				Object atchmnflNo = map.get("atchmnflNo");
				Object fileSn =  map.get("fileSn");
				String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
				String encFileKey = encryptService.encryptedStr(fileKey);
				map.put("fileKey", encFileKey);
				newList.add(i, map);
			}
		}
		return newList; 
	}
	
	/**
	 * 마이페이지 정보공개서관리 목록 수 조회 - 21.12.10 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInfoDcsListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return boardDao.selectInfoDcsListCount(paramMap);
	}
	
	/* 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 목록 조회 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectInfoAdminList(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return boardDao.selectInfoAdminList(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 목록 수 조회 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInfoAdminListCount(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return boardDao.selectInfoAdminListCount(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자 배정 - 21.12.10  주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateAssignInfoAdmin(Map<String, Object> paramMap)  throws DataAccessException, SQLException {
		return boardDao.updateAssignInfoAdmin(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 승인 or 반려 처리 - 21.12.10  주한별
	 * @param paramMap
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public void updateInfoDcsSttus(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		boardDao.updateInfoDcsSttus(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서 브랜드관리자 수정 - 21.12.09 주한별
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateBrandHedofc(Map<String, Object> paramMap)  throws DataAccessException, SQLException{
		logger.debug("updateBrandHedofc method run start!!");
		return boardDao.updateBrandHedofc(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서등록 > 목록조회 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws UnsupportedEncodingException 
	 */
	public List<EgovMap> selectInfoDcsInfoList(Map<String, Object> paramMap) throws DataAccessException, SQLException, UnsupportedEncodingException {
		List<EgovMap> list = boardDao.selectInfoDcsInfoList(paramMap);
		List<EgovMap> newList = new ArrayList<EgovMap>();
		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				EgovMap map = list.get(i);
				Object atchmnflNo = map.get("atchmnflNo");
				Object fileSn =  map.get("fileSn");
				String fileKey = atchmnflNo.toString() + "_" + fileSn.toString();
				String encFileKey = encryptService.encryptedStr(fileKey);
				map.put("fileKey", encFileKey);
				newList.add(i, map);
			}
		}
		return newList; 
	}
	
	/**
	 * 마이페이지 정보공개서등록 > 목록 수 조회 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectInfoDcsInfoListCount(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectInfoDcsInfoListCount(paramMap);
	}
	
	/**
	 * 마이페이지 정보공개서 관리 > 삭제 - 21.12.10  주한별 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int updateInfoDcsInfoDelete(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		int deleteCount = 0;
		String[] infoDcsRegistNo = paramMap.get("infoDcsRegistNoArr").toString().split(",");
		logger.debug(">>>> infoDcsRegistNoArrLength:"+infoDcsRegistNo.length);
		for (int i = 0; i < infoDcsRegistNo.length; i++) {
			Map<String, Object> splitParam = new HashMap<String, Object>();
			logger.debug(">>>> infoDcsRegistNo["+i+"]:"+infoDcsRegistNo[i]);
			splitParam.put("infoDcsRegistNo", infoDcsRegistNo[i]);
			
			Map<String, Object> splitMap = boardDao.selectInfoDcsInfoByNo(splitParam);
			if(!ObjectUtils.isEmpty(splitMap)) {
				paramMap.put("infoDcsRegistNo", splitMap.get("infoDcsRegistNo"));
				paramMap.put("atchmnflNo", ObjectUtils.isEmpty(splitMap.get("atchmnflNo")) ? "" : splitMap.get("atchmnflNo").toString());
				if(splitMap.get("atchmnflNo") != null && !StringUtils.isEmpty(splitMap.get("atchmnflNo"))) {
					fileService.deleteFileByatchmnflNo(paramMap);
				}
				//splitMap.put("infoDcsRegistNoArr", infoDcsRegistNo);
				deleteCount+= boardDao.updateInfoDcsInfoDelete(splitMap);
			}
		}
		
		return deleteCount;
	}
	
	/**
	 * 마이페이지 정보공개서 정보공개서 등록 - 21.12.09 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws FileNotFoundException
	 * @throws IOException
	 * @throws ClassNotFoundException
	 * @throws NullPointerException
	 * @throws NoSuchAlgorithmException
	 * @throws BadCommandException
	 */
	public int insertInfoDcsEnrol(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		if(!ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) && atchFile != null) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		
		String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, paramMap, "basic", "atchmnflNo", "FS02");
		paramMap.put("atchmnflNo", atchmnflNo);
		
		//프랜차이즈 이름 조회
		String bsnSgnal = boardDao.selectInfoDcsFrnchsNm(paramMap);
		paramMap.put("bsnSgnal", bsnSgnal);
		return boardDao.insertInfoDcsEnrol(paramMap); 
	}
	
	/**
	 * 마이페이지 정보공개서 정보공개서 수정 - 21.12.09 주한별
	 * @param paramMap
	 * @param atchFile
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 * @throws NoSuchAlgorithmException
	 * @throws IOException
	 */
	public int updateInfoDcsEnrol(Map<String, Object> paramMap, MultipartFile atchFile) throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException{
		if(!ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) && atchFile != null) {
			fileService.deleteFileByatchmnflNo(paramMap);
		}
		
		String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(paramMap.get("atchmnflNo")) ? "" : paramMap.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, paramMap, "basic", "atchmnflNo", "FS02");
		paramMap.put("atchmnflNo", atchmnflNo);
		return boardDao.updateInfoDcsEnrol(paramMap); 
	}
	
	/**
	 * 마이페이지 정보공개서관리 > 정보공개서등록 > 등록화면 기존데이터 조회 - 21.12.13
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectInfoDcsEnrollData(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		return boardDao.selectInfoDcsEnrollData(paramMap);
	}
	/**
	 * 점포장터 매물점포 문의등록
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int insertTradeinqry(Map<String, Object> paramMap) throws DataAccessException, SQLException {
		logger.debug("insertTradeinqry method run start!!");
		return boardDao.insertTradeinqry(paramMap);
	}
	/**
	 * 통합 게시판 리스트 화면
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException{
		return boardDao.selectUnityBoard(reqParam);
	}
	
	/**
	 *통합 게시판 리스트 합계 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int selectUnityBoardCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnityBoardCount(reqParam);
	}
	
	/**
	 *통합 게시판 리스트 공지사항 합계 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int selectUnityNoticeCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnityNoticeCount(reqParam);
	}
	
	/**
	 *통합 게시판 리스트 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public Object selectUnityBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnityBbs(reqParam);
	}
	
	/**
	 * 게시판 댓글 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public List<EgovMap> selectBbsComment(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectBbsComment(reqParam);
	}
	
	/**
	 *통합 게시판 삭제
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int deleteUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.deleteUnityBoard(reqParam);
	}
	
	/**
	 *통합 게시판 수정
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int updateUnityBbs(Map<String, Object> reqParam, MultipartFile atchFile) throws DataAccessException, SQLException {
		return boardDao.updateUnityBbs(reqParam);
	}
	
	/**
	 *통합 게시판 게시물 조회수 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public void updateBoardRdcnt(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		boardDao.updateBoardRdcnt(reqParam);
	}
	
	/**
	 *  관리자게시판 상세 이전/다음 - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	public Object selectUnityBbsNextInfo(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnityBbsNextInfo(reqParam);
	}
	public EgovMap selectBbsMaster(String masterSn) throws DataAccessException, SQLException {
		return boardDao.selectBbsMaster(masterSn);
	}
	
	/**
	 *통합 게시판 등록
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int insertUnityBbs(Map<String, Object> reqParam, MultipartFile atchFile) throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException {
//		if(!ObjectUtils.isEmpty(reqParam.get("atchmnflNo")) && atchFile != null) {
//			fileService.deleteFileByatchmnflNo(reqParam);
//		}
//		
//		String atchmnflNo = atchFile == null ? (ObjectUtils.isEmpty(reqParam.get("atchmnflNo")) ? "" : reqParam.get("atchmnflNo").toString()) : fileService.insertFlie(atchFile, reqParam, "basic", "atchmnflNo", "FS02");
//		reqParam.put("atchmnflNo", atchmnflNo);
		return boardDao.insertUnityBbs(reqParam); 
	}
	
	/**
	 * 게시판 댓글 삭제
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int deleteComment(Map<String, Object> reqParam) throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException {
		return boardDao.deleteComment(reqParam); 
	}
	
	/**
	 *게시판 댓글 등록
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int insertBbsComment(Map<String, Object> reqParam) throws DataAccessException, SQLException, NoSuchAlgorithmException, IOException {		
		return boardDao.insertBbsComment(reqParam); 
	}
	
	/**
	 *통합 게시판 리스트 합계 조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public int selectBbsMasterCount(String masterSn) throws DataAccessException, SQLException  {
		return boardDao.selectBbsMasterCount(masterSn);
	}
	
	/**
	 * 관리자 게시판 관리 옵션조회
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	public List<EgovMap> selectUnitNoticeOption(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnitNoticeOption(reqParam);
	}
	public EgovMap selectUnitBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUnitBbs(reqParam);
	}
	public String selectIntegBbsUrl() {
		return boardDao.selectIntegBbsUrl();
	}
	/**
	 * 메인 통합게시판 목록 20건 조회
	 * @param masterSn
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectTotalSwiper(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectTotalSwiper(reqParam);
	}
	
	/**
	 * 메인 모바일 통합게시판 목록 2건 조회
	 * @param masterSn
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectMainBbsInteg(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectMainBbsInteg(reqParam);
	}
	
	/**
	 * 로그인한 사용자의 등록 게시물 과 댓글 목록 수 조회 - 22.01.24
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public int selectUserUnityBoardCount(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUserUnityBoardCount(reqParam);
	}
	
	/**
	 * 로그인한 사용자의 등록 게시물 과 댓글 목록 조회 - 22.01.24
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public List<EgovMap> selectUserUnityBoard(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUserUnityBoard(reqParam);
	}

	/**
	 * 로그인한 사용자의 등록 게시물 상세 조회 - 22.01.24
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	public EgovMap selectUserUnitBbs(Map<String, Object> reqParam) throws DataAccessException, SQLException {
		return boardDao.selectUserUnitBbs(reqParam);
	}
}
