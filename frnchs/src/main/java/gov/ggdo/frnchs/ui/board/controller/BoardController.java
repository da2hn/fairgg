package gov.ggdo.frnchs.ui.board.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.aop.LoginCheck;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.board.service.BoardService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class BoardController {
	
	@Log Logger logger;

	@Autowired BoardService boardService;
	@Autowired ComCodeService comCodeService;
	@Autowired private EncryptService encryptService;

	/**
	 * 창업지원 게시판 목록 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/infoList.do")
	public ModelAndView infoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/info/infoList.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.debug("창업지원 게시판 목록 화면 SQLException");
		}
		return modelAndView;
	}

	/**
	 * 창업지원 게시판 작성 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/infoSave.do")
	public ModelAndView infoSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/info/infoSave.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));

			modelAndView.addObject("param", reqParam);
			if ("u".equals(reqParam.get("crud"))) {
				modelAndView.addObject("fntnBbs", boardService.selectFntnBbs(reqParam));
			}
		} catch (SQLException e) {
			logger.debug("창업지원 게시판 작성 화면 SQLException");
		}
		return modelAndView;
	}

	/**
	 * 창업지원 게시판 보기 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/infoView.do")
	@LoginCheck(resultType = "url")
	public ModelAndView fntnBbsView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/info/infoView.content");
		try {
			modelAndView.addObject("param", reqParam);
			modelAndView.addObject("fntnBbs", boardService.selectFntnBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 창업지원 게시판 답변 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/infoAnswerSave.do")
	public ModelAndView fntnBbsAnswerSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/info/infoAnswerSave.content");

		return modelAndView;
	}

	/**
	 * 창업지원 게시판 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/selectInfoList.ajax")
	public ModelAndView selectInfoList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int resultCount = boardService.selectFntnBbsListCount(reqParam);

			PagingUtils.setPaging("www", "fn_selectInfoList", resultCount, reqParam, modelAndView);

			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectFntnBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 창업지원 게시판 내용 보기
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/selectInfo.ajax")
	public ModelAndView selectInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("fntnBbs", boardService.selectFntnBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 내용 보기 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 창업지원 게시판 등록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/insertInfo.ajax")
	public ModelAndView insertInfo(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			//result = boardService.insertFntnBbs(reqParam, atchFile);
			result = boardService.insertFntnBbs(reqParam);

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 등록하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 등록 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("modifyPopupInto method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글 등록 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 창업지원 게시판 수정
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/updateInfo.ajax")
	public ModelAndView updateInfo(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			//result = boardService.updateFntnBbs(reqParam, atchFile);
			result = boardService.updateFntnBbs(reqParam);

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 수정하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 수정 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("modifyPopupInto method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 창업지원 게시판 삭제
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/deleteInfo.ajax")
	public ModelAndView deleteInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.deleteFntnBbs(reqParam);

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("deleteInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	/**
	 * 창업지원 게시판 답글 등록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/info/updateInfoAnswer.ajax")
	public ModelAndView updateInfoAnswer(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.updateFntnBbsAnswer(reqParam);

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "답글을 등록하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "답글을 등록 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("modifyPopupInto method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "답글을 등록 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 *불공정계약신고 작성 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/report/reportSave.do")
	@LoginCheck(resultType = "url")
	public ModelAndView reportSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/report/reportSave.content");
		try {
		reqParam.put("codeId", "STTEMNT_IEM_SE_CODE");
		modelAndView.addObject("sttemntIemSeCodeList", comCodeService.selectComCodeList(reqParam));
		} catch (SQLException e) {
			logger.error("reportSave method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 작성 화면 로드 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("reportSave method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 작성 화면 로드 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	/**
	 * 불공정계약신고 작성
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/report/insertReport.ajax")
	public ModelAndView insertReport(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("resultCnt", boardService.insertInjstBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("insertReport method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 작성 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertReport method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 작성 중 에러가 발생하였습니다.");
		}
		return modelAndView;

	}
	/**
	 * 불공정계약신고 답변 작성
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/report/updateReport.ajax")
	public ModelAndView updateReport(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.updateInjstBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("updateReport method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 답변 작성 중 에러가 발생하였습니다.");
		} catch (SQLException e) {
			logger.error("updateReport method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 답변 작성 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 불공정계약신고 목록 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/report/selectReportList.ajax")
	public ModelAndView selectReportList(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("reportList", boardService.selectInjstBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("selectReportList method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 목록 조회 중 에러가 발생하였습니다.");
		} catch (SQLException e) {
			logger.error("selectReportList method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 불공정계약신고 조회
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/report/selectReport.ajax")
	public ModelAndView selectReport(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("report", boardService.selectInjstBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("selectReport method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 조회 중 에러가 발생하였습니다.");
		} catch (SQLException e) {
			logger.error("selectReport method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정계약신고 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 *공지사항 게시판 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/notice/noticeList.do")
	public ModelAndView noticeListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/notice/noticeList.content");
		try {
			//콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "NOTICE_SE_CODE");
			modelAndView.addObject("schCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.debug("공지사항 게시판 화면 SQLException");
		}
		return modelAndView;
	}

	/**
	 * 공지사항 게시판 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/notice/selectNoticeList.ajax")
	public ModelAndView selectNoticeList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectNoticeBbsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectNoticeList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectNoticeBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공지사항 게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 공지사항 게시판 보기 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/notice/noticeView.do")
	public ModelAndView noticeView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/notice/noticeView.content");
		try {
			modelAndView.addObject("param", reqParam);
			modelAndView.addObject("noticeBbs", boardService.selectNoticeBbs(reqParam));
			modelAndView.addObject("noticeBbsNextInfo", boardService.selectNoticeBbsNextInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("noticeView method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공지사항 게시판 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 정보공개 게시판 목록 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/infoOpen/infoOpenList.do")
	public ModelAndView infoOpenList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/infoOpen/infoOpenList.content");
		try {
			//창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "INFO_OTHBC_SE_CODE");
			modelAndView.addObject("schCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.debug("정보공개 게시판 목록 화면 SQLException");
		}
		return modelAndView;
	}

	/**
	 * 정보공개 게시판 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/infoOpen/selectInfoOpenList.ajax")
	public ModelAndView selectInfoOpenList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			reqParam.put("noSchCode", "IN03");
			int resultCount = boardService.selectInfoOthbcBbsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInfoOpenList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInfoOthbcBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectInfoOpenList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개 게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 정보공개 게시판 보기 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/infoOpen/infoOpenView.do")
	public ModelAndView infoOpenView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/infoOpen/infoOpenView.content");
		try {
			modelAndView.addObject("param", reqParam);
			modelAndView.addObject("infoOpenBbs", boardService.selectInfoOthbcBbs(reqParam));
			modelAndView.addObject("infoOpenNextInfo", boardService.selectInfoOthbcBbsNextInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("infoOpenView method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개 게시판 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 리스트 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/trade/tradeList.do")
	public ModelAndView tradeListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/trade/tradeList.content");

		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 상세화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/trade/tradeView.do")
	@LoginCheck(resultType = "url")
	public ModelAndView tradeViewPage(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView("ui/board/trade/tradeView.content");

		try {
			EgovMap tmpMap = boardService.selectTradeBbs(reqParam);
			if(tmpMap.get("atchmnflNo") != null) {
				String atchmnflNo = tmpMap.get("atchmnflNo").toString();
				String fileSn = "1";//대표사진 선정이 없으므로 첫번째 사진을 대표사진으로
				String encFileKey = encryptService.encryptedStr(atchmnflNo+"_"+fileSn);
				tmpMap.put("fileKey", encFileKey);
				tmpMap.put("fileSn", fileSn);
			}
			modelAndView.addObject("tradeBbs", tmpMap);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTrade method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 내용 보기 중 에러가 발생하였습니다.");
		}
		//modelAndView.addObject("param", reqParam);
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 상세정보 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/trade/selectTrade.ajax")
	//@LoginCheck(resultType="ajax")
	public ModelAndView selectTrade(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			EgovMap tmpMap = boardService.selectTradeBbs(reqParam);
			if(tmpMap.get("atchmnflNo") != null) {
				String atchmnflNo = tmpMap.get("atchmnflNo").toString();
				String fileSn = "1";//대표사진 선정이 없으므로 첫번째 사진을 대표사진으로
				String encFileKey = encryptService.encryptedStr(atchmnflNo+"_"+fileSn);
				tmpMap.put("fileKey", encFileKey);
				tmpMap.put("fileSn", fileSn);
			}
			modelAndView.addObject("tradeBbs", tmpMap);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTrade method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 등록 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/trade/tradeSave.do")
	@LoginCheck(resultType = "US01")
	public ModelAndView tradeSavePage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/trade/tradeSave.content");
		try {
			//콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "SOPSRT_STLE_CODE");
			modelAndView.addObject("sopsrtStleCodeList", comCodeService.selectComCodeList(codeMap));
			codeMap.put("codeId", "MVN_POSBL_DE_CODE");
			modelAndView.addObject("mvnPosblDeCodeList", comCodeService.selectComCodeList(codeMap));
			codeMap.put("codeId", "HEAT_KND_CODE");
			modelAndView.addObject("heatKndCodeList", comCodeService.selectComCodeList(codeMap));
			codeMap.put("codeId", "TOILET_SE_CODE");
			modelAndView.addObject("toiletSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.debug("점포장터 매물점포 등록 화면 SQLException");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/trade/selectTradeList.ajax")
	public ModelAndView selectTradeList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectTradeBbsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectTradeList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);

			List<EgovMap> tradeBbsList = boardService.selectTradeBbsList(reqParam);
			for(EgovMap tmpMap : tradeBbsList) {
				if(tmpMap.get("atchmnflNo") != null) {
					String atchmnflNo = tmpMap.get("atchmnflNo").toString();
					String fileSn = "1";//대표사진 선정이 없으므로 첫번째 사진을 대표사진으로
					String encFileKey = encryptService.encryptedStr(atchmnflNo+"_"+fileSn);
					tmpMap.put("fileKey", encFileKey);
					tmpMap.put("fileSn", fileSn);
				}
			}
			modelAndView.addObject("dataList", tradeBbsList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTradeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 정보 저장
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/trade/insertTrade.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView insertTrade(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.insertTradeBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("insertTrade method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 작성 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertTrade method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 작성 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 점포장터 매물점포 정보 수정
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/trade/updateTrade.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView updateTrade(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.updateTradeBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("insertTrade method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 수정 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertTrade method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 점포장터 매물점포 정보 수정 모바일
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/trade/updateTradeMob.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView updateTradeMob(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.updateTradeBbsMob(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("insertTrade method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 수정 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertTrade method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 정보 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 허위매물신고 저장
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/trade/insertFlshdTrde.ajax")
	public ModelAndView insertFlshdTrde(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.insertFlshdTrde(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("insertTrade method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 허위매물신고 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertTrade method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 허위매물신고 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 도움말 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/service/serviceInfo.do")
	public ModelAndView serviceInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/service/serviceInfo.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 점포관리확인 컨설턴트배정 수정
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/myPage/board/trade/updateAssignConsultant.ajax")
	public ModelAndView updateAssignConsultant(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.updateAssignConsultant(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("updateAssignConsultant method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "컨설턴트배정 수정 중 에러가 발생하였습니다.");
		} catch (SQLException e) {
			logger.error("updateAssignConsultant method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "컨설턴트배정 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 배너광장 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/banner/bannerList.do")
	public ModelAndView bannerListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/banner/bannerList.content");

		return modelAndView;
	}

	/**
	 * 정보공개서등록 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/infoOpenReg/infoOpenReg.do")
	public ModelAndView infoOpenReg(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/infoOpenReg/infoOpenReg.content");

		return modelAndView;
	}
	
	/**
	 * 정보공개서교육 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/infoOpenEdc/infoOpenEdc.do")
	public ModelAndView infoOpenEdc(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/infoOpenEdc/infoOpenEdc.content");
		
		return modelAndView;
	}
	
	/**
	 * 익명제보 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/annymty/annymtyBoard.do")
	public ModelAndView annymtyBoard(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/annymty/annymtyBoard.content");
		
		return modelAndView;
	}
	
	
	/*@ResponseBody
	@RequestMapping(value = "/board/infoOpenEdc/insertInfoOpenEdc.ajax")
	public HashMap<String, Object> insertInfoOpenEdc(HttpServletRequest req, HttpServletResponse res,
    		@RequestParam HashMap<String, Object> params) throws Exception {
      HashMap<String, Object> resMap = new HashMap<String, Object>();
      
      try {
			boardService.insertInfoOpenEdc(params);
			resMap.put("result", "Y");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resMap.put("result", "N");
		}
      
      return resMap;
    }   */
	@RequestMapping(value = "/board/infoOpenEdc/insertInfoOpenEdc.ajax")
	public ModelAndView insertInfoOpenEdc(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		try {
			result = boardService.insertInfoOpenEdc(reqParam);
			
			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글을 등록 하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글 등록중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글 등록중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/board/annymty/insertAnnymtyBoard.ajax")
	public ModelAndView insertAnnymtyBoard(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		try {
			result = boardService.insertAnnymtyBoard(reqParam);
			
			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글을 등록 하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글 등록중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글 등록중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 *통합 게시판 화면 - 21.11.22 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/integ/integList.do")
	public ModelAndView integListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/integ/integList.content");
		try {
			//통합
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "INTEG_SE_CODE");
			modelAndView.addObject("integList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.debug("통합 게시판 화면 SQLException");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 목록 swiper 조회 통합게시판
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/integ/selectTotalSwiper.ajax")
	public ModelAndView selectTotalSwiper(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			reqParam.put("bbsNm", "통합게시판");
			modelAndView.addObject("dataList", boardService.selectTotalSwiper(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 목록 swiper 조회 통합게시판
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/integ/selectDataSwiper.ajax")
	public ModelAndView selectDataSwiper(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			reqParam.put("bbsNm", "자료게시판");
			modelAndView.addObject("dataList", boardService.selectTotalSwiper(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 통합 게시판 목록 조회 - 21.11.22 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/integ/selectIntegList.ajax")
	public ModelAndView selectIntegList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			//공지사항
//			int resultCount = boardService.selectIntegListCount(reqParam);
//			PagingUtils.setIntegPaging("www", "fn_selectIntegList", resultCount, reqParam, modelAndView);
//			modelAndView.addObject("resultCount", resultCount);
//			modelAndView.addObject("dataList", boardService.selectIntegList(reqParam));
			reqParam.put("bbsNm", "통합게시판");
 			modelAndView.addObject("dataList", boardService.selectMainBbsInteg(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			
			//정보공개 항목
//			reqParam.put("noSchCode", "IN03");
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 공지사항 게시판 보기 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/integ/integView.do")
	public ModelAndView integView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/board/integ/integView.content");
		try {
			modelAndView.addObject("param", reqParam);
			modelAndView.addObject("integBbs", boardService.selectIntegBbs(reqParam));
			modelAndView.addObject("integBbsNextInfo", boardService.selectIntegBbsNextInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("integView method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "통합 게시판 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 점포장터 매물점포 문의등록
	 * @param reqParam
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/board/trade/insertTradeinqry.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView insertTradeinqry(@ReqParam Map<String, Object> reqParam)  throws DataAccessException, SQLException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.insertTradeinqry(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 문의 등록이 완료되었습니다.");
		} catch (SQLException e) {
			logger.error("insertTradeinqry method Error Occured [SQLException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 문의 등록 중 에러가 발생하였습니다.");
		} catch (DataAccessException e) {
			logger.error("insertTradeinqry method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 문의 등록 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 *통합 게시판 리스트 화면 - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/board/list.do")
	public ModelAndView unityListPage(@RequestParam(value="val", required=false) String masterSn, @ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/board/unity/unityBoard.content");
		int result = boardService.selectBbsMasterCount(masterSn);
		if (result > 0){
			modelAndView.addObject("dataList", boardService.selectBbsMaster(masterSn));
			return modelAndView;
		}else{
			return new ModelAndView("/error.do"); // 추후 에러페이지 이동
		}
		
	
	}
	
	/**
	 *통합 게시판 리스트 조회 - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/board/unity/selectUnityBoard.ajax")
	public ModelAndView selectUnityBoard(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			//목록 총수 조회
			int NoticeCount = boardService.selectUnityNoticeCount(reqParam);
			reqParam.put("noticeCount", NoticeCount);
			
			int resultCount = boardService.selectUnityBoardCount(reqParam);
			
			//페이징 세팅
			PagingUtils.setPaging("admin", "fn_selectUnityList", resultCount, reqParam, modelAndView);
			
			modelAndView.addObject("resultCount", resultCount);
			
			modelAndView.addObject("dataList", boardService.selectUnityBoard(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | NullPointerException | ClassNotFoundException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("selectUnityBoard method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 *통합 게시판 삭제 - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/board/unity/deleteUnityBoard.ajax")
	public ModelAndView deleteUnityBoard(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		
		try {
			int result = boardService.deleteUnityBoard(reqParam);
			if(result != 0 ){
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}
		} catch (DataAccessException | NullPointerException  e) {
			logger.error("deleteUnityBoard method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 삭제 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 *통합 게시판 등록, 수정 화면  - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/board/listModify.do")
	public ModelAndView boardRegist(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/board/unity/boardRegist.content");
		try {
			modelAndView.addObject("param", reqParam);
			if ("u".equals(reqParam.get("crud"))) {
				modelAndView.addObject("unityBbs", boardService.selectUnityBbs(reqParam));
			}else if ("re".equals(reqParam.get("crud"))) {
				modelAndView.addObject("upperBbsSn", reqParam.get("sn"));
			}
		} catch (SQLException e) {
			logger.error("boardRegist method Error Occured : ");
		}
		return modelAndView;
	}
	
	/**
	 *  관리자게시판 등록, 수정 - 21.11.28  서가영 
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping(value = "/board/unity/motifyNotice.ajax")
	public ModelAndView motifyNotice(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) throws NoSuchAlgorithmException, IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		String msg = "";
		try {
			String motifyType = reqParam.get("motifyType").toString();
			if("I".equals(motifyType)){
				result = boardService.insertUnityBbs(reqParam, atchFile);
				msg = "등록";
			}else if("U".equals(motifyType)) {
				result = boardService.updateUnityBbs(reqParam, atchFile);
				msg = "수정";
			}

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글을 "+ msg +"하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글"+ msg +"중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시글"+ msg +"중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/**
	 *  게시판 댓글 삭제 - 22.01.10 염종찬 
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping(value = "/board/unity/deleteComment.ajax")
	public ModelAndView deleteComment(@ReqParam Map<String, Object> reqParam) throws NoSuchAlgorithmException, IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		try {
			result = boardService.deleteComment(reqParam);
			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글을 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글 삭제 중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글 삭제 중 에러가 발생하였습니다.");
		}
		
		return modelAndView;
	}
	
	/**
	 * 게시판댓글 조회 - 22.01.10 염종찬 
	 * @param reqParam
	 * @return
	 * @throws SQLException 
	 * @throws DataAccessException 
	 */
	@RequestMapping(value = "/board/unity/selectBbsComment.ajax")
	public ModelAndView selectBbsComment(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {			
			modelAndView.addObject("dataList", boardService.selectBbsComment(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("selectBbsComment method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 *  게시판 댓글등록 - 22.01.10 염종찬 
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping(value = "/board/unity/insertBbsComment.ajax")
	public ModelAndView insertBbsComment(@ReqParam Map<String, Object> reqParam) throws NoSuchAlgorithmException, IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		try {
			
			result = boardService.insertBbsComment(reqParam);
			
			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글이 등록되었습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글 등록 중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "댓글 등록 중 에러가 발생하였습니다.");
		}
		
		return modelAndView;
	}
	
	/**
	 * 통합 게시판 상세 보기 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/listView.do")
	public ModelAndView listView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/board/unity/unityView.content");
		try {
			modelAndView.addObject("param", reqParam);
			boardService.updateBoardRdcnt(reqParam);
			modelAndView.addObject("unityBbs", boardService.selectUnityBbs(reqParam));
			modelAndView.addObject("unityBbsNextInfo", boardService.selectUnityBbsNextInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("listView method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 통합게시판 url 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/selectIntegBbsUrl.ajax")
	public ModelAndView selectIntegBbsUrl(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("bbsUrl", boardService.selectIntegBbsUrl());
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException e) {
			logger.error("selectIntegBbsUrl method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 url 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
}
