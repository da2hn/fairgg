package gov.ggdo.frnchs.ui.myPage.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.ibm.icu.util.Calendar;
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
import gov.ggdo.frnchs.ui.expr.service.ExprService;
import gov.ggdo.frnchs.ui.fran.service.FranService;
import gov.ggdo.frnchs.ui.sysMngr.service.SysMngrService;
import gov.ggdo.frnchs.ui.user.service.UserService;

@Controller
public class MyPageController {

	@Log Logger logger;

	@Autowired ComCodeService comCodeService;
	@Autowired SysMngrService sysMngrService;
	@Autowired ExprService exprService;
	@Autowired UserService userService;
	@Autowired BoardService boardService;
	@Autowired private EncryptService encryptService;
	@Autowired FranService franService;

	/**
	 * 마이페이지 가입정보 수정 화면
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/user/user/userInfo.do")
	public ModelAndView userInfo(@ReqParam Map<String, Object> reqParam) {
		String returnPage;
		if ("US03".equals(reqParam.get("ssUserSeCode"))) {
			returnPage = "ui/myPage/user/user/brandUserInfo.content";
		} else {
			returnPage = "ui/myPage/user/user/userInfo.content";
		}
		ModelAndView modelAndView = new ModelAndView(returnPage);

		try {
			reqParam.put("userNo", reqParam.get("ssUserNo"));
			modelAndView.addObject("userInfo", sysMngrService.selectAllUserInfo(reqParam));
			if ("US03".equals(reqParam.get("ssUserSeCode"))) {
				modelAndView.addObject("userChrgBrandList", userService.selectUserChrgBrandList(reqParam));
			}
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("userInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 가입정보 수정 화면 로드 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 가입정보 수정 관리자 페이지 수정 추가 분기 - 21.01.15
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/user/user/saveUserInfo.ajax")
	public ModelAndView saveUserInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			String returnTxt = "가입정보가 수정되었습니다.";
			if (reqParam.get("userNo").equals(reqParam.get("ssUserNo"))) {
				if ("US03".equals(reqParam.get("userSeCode"))) {
					// 브랜드관리자
					userService.updateBrandMngrMyInfo(reqParam);
				} else {
					// 일반사용자, 컨설턴트, 기관사용자
					userService.updateMyInfo(reqParam);
				}
			} else {
				if (((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getHeader("REFERER").contains("sysMngr/") && "US04".equals(reqParam.get("ssUserSeCode"))) {
					if ("US03".equals(reqParam.get("userSeCode"))) {
						// 브랜드관리자
						userService.updateBrandMngrMyInfo(reqParam);
					} else {
						// 일반사용자, 컨설턴트, 기관사용자
						userService.updateMyInfo(reqParam);
					}
				} else {
					returnTxt = "사용자 정보가 올바르지 않습니다.";
				}
			}

			modelAndView.addObject(Constants.RESULT_MESSAGE, returnTxt);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("saveUserInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "가입정보 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 가입정보 탈퇴
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/user/user/deleteUserInfo.ajax")
	public ModelAndView deleteUserInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			String returnTxt = "탈퇴되었습니다.";
			if (reqParam.get("userNo").equals(reqParam.get("ssUserNo"))) {
				if ("US03".equals(reqParam.get("userSeCode"))) {
					// 브랜드관리자
					userService.deleteBrandMngrMyInfo(reqParam);
				} else {
					// 일반사용자, 컨설턴트, 기관사용자
					userService.deleteMyInfo(reqParam);
				}
			} else {
				returnTxt = "사용자 정보가 올바르지 않습니다.";
			}

			modelAndView.addObject(Constants.RESULT_MESSAGE, returnTxt);
			SecurityContextHolder.clearContext();

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("saveUserInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "가입정보 탈퇴 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 신청현황
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franReqst/franReqstList.do")
	public ModelAndView franReqstList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/franReqst/franReqstList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 신청현황 조회
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/expr/franReqst/selectFranReqstList.ajax")
	public ModelAndView selectFranReqstList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if ("US01".equals(reqParam.get("ssUserSeCode"))) {
				// 일반사용자
				reqParam.put("confmSttusCode", "CS03");// 신청
			} else if ("US04".equals(reqParam.get("ssUserSeCode"))) {
				// 기관관리자
				reqParam.put("confmSttusCode", "CS03");// 신청
			} else if ("US03".equals(reqParam.get("ssUserSeCode"))) {
				// 브랜드관리자
				reqParam.put("confmSttusCode", "CS04");// 검토중
			}
			int resultCount = exprService.selectFrnchsExprnReqstListCount(reqParam);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("frnchsExprnReqstList", exprService.selectFrnchsExprnReqstList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFranReqstList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "가입정보 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 신청현황 취소처리
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/expr/franReqst/updateFrnchsExprnReqstCancl.ajax")
	public ModelAndView updateFrnchsExprnReqstCancl(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if (reqParam.get("exprnReqstNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnReqstNoArr", reqParam.get("exprnReqstNoArr").toString().split(","));
			exprService.updateFrnchsExprnReqstCancl(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "취소처리 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnReqstCancl method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "가입정보 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/diary/diaryList.do")
	public ModelAndView diaryList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/diary/diaryList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/diary/selectFrnchsExprnReqstConfmList.ajax")
	public ModelAndView selectFrnchsExprnReqstConfmList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = exprService.selectFrnchsExprnReqstConfmListCount(reqParam);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, reqParam, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			List<EgovMap> frnchsExprnReqstConfmList = exprService.selectFrnchsExprnReqstConfmList(reqParam);
			for (EgovMap tmpMap : frnchsExprnReqstConfmList) {
				if (tmpMap.get("edcFileKey") != null) {
					String fileKey = tmpMap.get("edcFileKey").toString();
					String[] tmpArr = tmpMap.get("edcFileKey").toString().split("_");
					String atchmnflNo = tmpArr[0];
					String fileSn = tmpArr[1];
					String encFileKey = encryptService.encryptedStr(fileKey);
					tmpMap.put("fileKey", encFileKey);
					tmpMap.put("atchmnflNo", atchmnflNo);
					tmpMap.put("fileSn", fileSn);
				}
			}

			modelAndView.addObject("frnchsExprnReqstConfmList", frnchsExprnReqstConfmList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsExprnReqstConfmList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 프랜차이즈 운영 일기장 체험신청 승인된 지점 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 달력(일반사용자)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/diary/calendarInfo.do")
	public ModelAndView calendarInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/diary/calendarInfo.content");

		modelAndView.addObject("exprnRegistNo", reqParam.get("exprnRegistNo"));

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 달력 이벤트 조회(일반사용자)
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/diary/selectFrnchsExprnDiaryList.ajax")
	public ModelAndView selectFrnchsExprnDiaryList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("frnchsExprnDiaryList", exprService.selectFrnchsExprnDiaryList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsExprnDiaryList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 프랜차이즈 운영 일기장 달력 이벤트 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 달력 이벤트 수정(일반사용자, 브랜드관리자)
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/diary/updateFrnchsExprnDiary.ajax")
	public ModelAndView updateFrnchsExprnDiary(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			exprService.updateFrnchsExprnDiary(reqParam);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "수정되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnDiary method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 프랜차이즈 운영 일기장 달력 이벤트 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 달력 이벤트 드래그 수정(일반사용자, 브랜드관리자)
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/diary/updateFrnchsExprnDiaryDrag.ajax")
	public ModelAndView updateFrnchsExprnDiaryDrag(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			exprService.updateFrnchsExprnDiaryDrag(reqParam);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "수정되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnDiary method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 프랜차이즈 운영 일기장 달력 이벤트 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 매칭현황
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/franMtchgMngList.do")
	public ModelAndView franMtchgMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/franMtchgMng/franMtchgMngList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프래차이즈 매칭현황 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/selectFranMtchgMngList.ajax")
	public ModelAndView selectFranMtchgMngList(@ReqParam Map<String, Object> paramMap)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			// 신청 내용만 불러와야함
			// paramMap.put("confmSttusCode", "CS03");

			int resultCount = exprService.selectFranMtchgMngListCount(paramMap);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, paramMap, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("franMtchgMngList", exprService.selectFranMtchgMngList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFranMtchgMngList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 프래차이즈 매칭현황 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 체험 프랜차이즈 매칭현황 삭제하기
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/updateFrnchsExprnRegistDelete.ajax")
	public ModelAndView updateFrnchsExprnRegistDelete(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			if (reqParam.get("exprnRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnRegistNoArr", reqParam.get("exprnRegistNoArr").toString().split(","));

			exprService.updateFrnchsExprnRegistDelete(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "삭제 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnRegistDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "체험 프랜차이즈 매칭현황 삭제하기 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 매칭현황 체험자 신청현황 팝업
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/franMtchgMngListPopup.do")
	public ModelAndView franMtchgMngListPopup(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/ui/myPage/expr/franMtchgMng/franMtchgMngListPopup");

		modelAndView.addObject("headerTxt", "체험 프랜차이즈 신청자 현황");
		modelAndView.addObject("exprnRegistNo", reqParam.get("exprnRegistNo"));

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 매칭현황 체험자 신청현황 팝업 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/selectFranMtchgMngListPopup.ajax")
	public ModelAndView selectFranMtchgMngListPopup(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("franMtchgMngListPopup", exprService.selectFrnchsExprnReqstUserInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFranMtchgMngListPopup method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 프랜차이즈 매칭현황 체험자 신청현황 팝업 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 가맹본사 참여하기 신청현황 목록
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/brandReqst/brandReqstList.do")
	public ModelAndView brandReqstList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/brandReqst/brandReqstList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 가맹본사 참여하기 신청현황 내용
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = { "/myPage/expr/brandReqst/brandReqstView.do",
			"/myPage/expr/franReqstMng/franReqstMngView.do", "/myPage/expr/franMtchgMng/franMtchgMngView.do",
			"/myPage/expr/diary/brandReqstView.do" })
	public ModelAndView brandReqstView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/brandReqst/brandReqstView.content");
		try {
			EgovMap resultMap = exprService.selectFrnchsExprnRegistInfo(reqParam);
			if (resultMap != null) {
				if ("CS03".equals(resultMap.get("confmSttusCode")) && "US03".equals(reqParam.get("ssUserSeCode"))) {
					// 신청상태일때, 브랜드관리자 일때만 수정 가능한 화면으로 이동
					modelAndView.setViewName("ui/myPage/expr/brandReqst/brandReqstSave.content");
				}
			}
			String listURL = "";
			modelAndView.addObject("frnchsExprnRegistInfo", resultMap);
			if ("US03".equals(reqParam.get("ssUserSeCode"))) {
				if ("brandReqst".equals(reqParam.get("package"))) {
					listURL = "/myPage/expr/brandReqst/brandReqstList.do";
				} else if ("exprManage".equals(reqParam.get("package"))) {
					listURL = "/myPage/expr/exprManage/exprManageList.do";
				}
			} else if ("US04".equals(reqParam.get("ssUserSeCode"))) {
				listURL = "/myPage/expr/franReqstMng/franReqstMngList.do";
			} else if ("US01".equals(reqParam.get("ssUserSeCode"))) {
				listURL = "/myPage/expr/diary/diaryList.do";
			}
			modelAndView.addObject("listURL", listURL);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("brandReqstView method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 가맹본사 참여하기 신청현황 내용 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 가맹본사 참여하기 신청현황 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/brandReqst/selectFrnchsExprnRegistList.ajax")
	public ModelAndView selectFrnchsExprnRegistList(@ReqParam Map<String, Object> paramMap)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			// 신청 내용만 불러와야함
			paramMap.put("confmSttusCode", "CS03");

			int resultCount = exprService.selectFrnchsExprnRegistListCount(paramMap);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, paramMap, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("frnchsExprnRegistList", exprService.selectFrnchsExprnRegistList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsExprnRegistList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 가맹본사 참여하기 신청현황 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 가맹본사 참여하기 신청현황 취소처리
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/brandReqst/updateFrnchsExprnRegistCancl.ajax")
	public ModelAndView updateFrnchsExprnRegistCancl(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if (reqParam.get("exprnRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnRegistNoArr", reqParam.get("exprnRegistNoArr").toString().split(","));
			exprService.updateFrnchsExprnRegistCancl(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "취소처리 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnRegistCancl method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 가맹본사 참여하기 신청현황 취소처리 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 가맹본사 참여하기 내용 수정
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/brandReqst/updateFrnchsExprnRegist.ajax")
	public ModelAndView updateFrnchsExprnRegist(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			exprService.updateFrnchsExprnRegist(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "저장 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnRegist method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 가맹본사 참여하기 내용 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 예비창업자 관리현황
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/exprManageList.do")
	public ModelAndView exprManageList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/exprManage/exprManageList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 예비창업자 관리현황 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/selectFrnchsExprnRegistManageList.ajax")
	public ModelAndView selectFrnchsExprnRegistManageList(@ReqParam Map<String, Object> paramMap)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			int resultCount = exprService.selectFrnchsExprnRegistManageListCount(paramMap);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, paramMap, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("frnchsExprnRegistManageList", exprService.selectFrnchsExprnRegistManageList(paramMap));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsExprnRegistManageList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 예비창업자 관리현황 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 예비창업자 모집현황
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/exprRcritList.do")
	public ModelAndView exprRcritList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/exprManage/exprRcritList.content");
		try {
			modelAndView.addObject("exprnRegistNo", reqParam.get("exprnRegistNo"));
			modelAndView.addObject("frnchsExprnRegistInfo", exprService.selectFrnchsExprnRegistInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectExprRcritList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 예비창업자 모집현황 로드 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 체험 예비창업자 모집현황 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 * @throws DataAccessException,
	 *             SQLException, FileNotFoundException, IOException,
	 *             ClassNotFoundException, NullPointerException,
	 *             NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/selectExprRcritList.ajax")
	public ModelAndView selectExprRcritList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("exprRcritList", exprService.selectFrnchsExprnReqstUserInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectExprRcritList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 예비창업자 모집현황 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 운영 일기장 달력(브랜드관리자)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/calendarInfoMng.do")
	public ModelAndView calendarInfoMng(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/exprManage/calendarInfoMng.content");

		modelAndView.addObject("exprnRegistNo", reqParam.get("exprnRegistNo"));

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 신청자 현황 상태 변경(승인)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/exprManage/updateFrnchsExprnReqstApproveSttus.ajax")
	public ModelAndView updateFrnchsExprnReqstApproveSttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if (reqParam.get("exprnReqstNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnReqstNoArr", reqParam.get("exprnReqstNoArr").toString().split(","));
			exprService.updateFrnchsExprnReqstApproveSttus(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "변경 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnReqstSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 프랜차이즈 신청자 현황 상태 변경(승인) 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 직영점 신청현황
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franReqstMng/franReqstMngList.do")
	public ModelAndView franReqstMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/franReqstMng/franReqstMngList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 직영점 신청현황 상태 변경(승인,반려)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franReqstMng/updateFrnchsExprnRegistSttus.ajax")
	public ModelAndView updateFrnchsExprnRegistSttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if (reqParam.get("exprnRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnRegistNoArr", reqParam.get("exprnRegistNoArr").toString().split(","));
			exprService.updateFrnchsExprnRegistSttus(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "변경 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnRegistSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 직영점 신청현황 상태 변경(승인,반려) 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 체험 프랜차이즈 신청자 현황 상태 변경(검토,반려)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/franMtchgMng/updateFrnchsExprnReqstSttus.ajax")
	public ModelAndView updateFrnchsExprnReqstSttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			if (reqParam.get("exprnReqstNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("exprnReqstNoArr", reqParam.get("exprnReqstNoArr").toString().split(","));
			exprService.updateFrnchsExprnReqstSttus(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "변경 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("updateFrnchsExprnReqstSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 체험 프랜차이즈 신청자 현황 상태 변경(검토,반려) 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 관리 화면 - 21.01.25
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/frnchsInfo/frnchsInfoList.do")
	public ModelAndView frnchsInfoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/frnchsInfo/frnchsInfoList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 관심 프랜차이즈 현황 목록 조회 - 21.01.25
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/expr/frnchsInfo/selectFrnchsInfoList.ajax")
	public ModelAndView selectFrnchsInfoList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int resultCount = franService.selectFrnchsInfoListCount(reqParam);

			PagingUtils.setPaging("www", "fn_search", resultCount, 5, 10, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("dataList", franService.selectFrnchsInfoList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 관리 상세 화면 - 21.01.25
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/expr/frnchsInfo/frnchsInfo.do")
	public ModelAndView frnchsInfo(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/expr/frnchsInfo/frnchsInfo.content");
		try {
			EgovMap data = franService.selectFrnchsInfoForAdi(reqParam);

			if (data != null && data.get("entrprsIntrcnFileKey") != null) {
				String fileKey = data.get("entrprsIntrcnFileKey").toString();
				String[] tmpArr = data.get("entrprsIntrcnFileKey").toString().split("_");
				String atchmnflNo = tmpArr[0];
				String fileSn = tmpArr[1];
				String encFileKey = encryptService.encryptedStr(fileKey);
				data.put("fileKey", encFileKey);
				data.put("atchmnflNo", atchmnflNo);
				data.put("fileSn", fileSn);
			}
			// 위변조 방지용
			HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
					.getSession();
			session.setAttribute("changeFrnchsNo", data.get("frnchsNo"));

			modelAndView.addObject("data", data);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 상세 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 상세 조회 - 21.01.25
	 * 
	 * @param reqParam
	 * @param frnchsImageFile
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
	@RequestMapping(value = "/myPage/expr/frnchsInfo/modifyFrnchsInfo.ajax")
	public ModelAndView modifyFrnchsInfo(@ReqParam Map<String, Object> reqParam,@RequestParam(value = "frnchsImageFile", required = false) MultipartFile frnchsImageFile)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
					.getSession();
			logger.debug(">>>> " + reqParam.get("frnchsNo") + ":" + session.getAttribute("changeFrnchsNo"));
			if (reqParam.get("frnchsNo").equals(session.getAttribute("changeFrnchsNo"))) {
				int result = franService.modifyFrnchsInfo(reqParam, frnchsImageFile);
				logger.debug(">>>>> merge 결과:" + result);
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 정보를 수정하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 정보 수정 중 에러가 발생하였습니다.");
			}
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 정보 수정 중 에러가 발생하였습니다.");
		}
		// try {
		// modelAndView.addObject("data",franService.selectFrnchsInfoForAdi(reqParam));
		// modelAndView.addObject(Constants.RESULT_CODE,
		// Constants.RESULT_SUCCESS);
		// } catch (DataAccessException | SQLException e) {
		// logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+"
		// method Error Occured : ");
		// modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
		// modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 상세 조회 중 에러가
		// 발생하였습니다.");
		// }

		return modelAndView;
	}

	/**
	 * 마이페이지 프랜차이즈 상세 조회 - 21.01.25
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/expr/frnchsInfo/selectFrnchsInfo.ajax")
	public ModelAndView selectFrnchsInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			EgovMap data = franService.selectFrnchsAdiInfo(reqParam);

			// 위변조 방지용
			HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			session.setAttribute("changeFrnchsNo", data.get("frnchsNo"));

			modelAndView.addObject("data", data);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 상세 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 착한프랜차이즈 본사 관리
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/fran/promo/promoList.do")
	public ModelAndView promoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/fran/promo/promoList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 착한프랜차이즈 본사 관리 목록 조회
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/fran/promo/selectGoodFrnchsExprnRegistList.ajax")
	public ModelAndView selectGoodFrnchsExprnRegistList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int resultCount = franService.selectGoodFrnchsExprnRegistListCount(reqParam);

			PagingUtils.setPaging("www", "fnSearch", resultCount, 5, 10, reqParam, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("goodFrnchsExprnRegistList", franService.selectGoodFrnchsExprnRegistList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "변경 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			logger.error("selectGoodFrnchsExprnRegistList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 착한프랜차이즈 본사 관리 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 착한프랜차이즈 본사 관리 승인 처리
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/fran/promo/saveGoodFrnchsAdiInfo.ajax")
	public ModelAndView saveGoodFrnchsAdiInfo(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			EgovMap adiMap = franService.selectGoodFrnchsAdiInfo(reqParam);

			if (adiMap == null) {
				franService.insertGoodFrnchsAdiInfo(reqParam);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "승인 되었습니다.");
			} else {
				if ("N".equals(adiMap.get("goodFrnchsAt"))) {
					franService.updateGoodFrnchsAdiInfo(reqParam);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "승인 되었습니다.");
				} else {
					modelAndView.addObject(Constants.RESULT_MESSAGE, "이미 승인되어 있습니다.");
				}
			}
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("saveGoodFrnchsAdiInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 착한프랜차이즈 본사 관리 승인 처리 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 공지사항 관리 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/mng/notice/noticeList.do")
	public ModelAndView noticeList(@ReqParam Map<String, Object> reqParam) {
		// ModelAndView modelAndView = new ModelAndView("ui/myPage/board/notice/noticeList.content");
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/notice/unit_noticeList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 공지사항 관리 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/notice/selectNoticeList.ajax")
	public ModelAndView selectNoticeList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectIntegListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectNoticeList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			// 게시판관리 페이지에서 호출시 구분값 전달
			reqParam.put("selectType", "ADMIN");
			modelAndView.addObject("dataList", boardService.selectIntegList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 관리자 게시판 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 게시판관리 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/notice/selectUnitNoticeList.ajax")
	public ModelAndView selectUnitNoticeList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectUnitNoticeListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectNoticeList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			// 게시판관리 페이지에서 호출시 구분값 전달
			reqParam.put("selectType", "ADMIN");
			modelAndView.addObject("dataList", boardService.selectUnitNoticeList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 관리자 게시판 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 공지사항 관리 작성 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	/*
	 * @RequestMapping(value = "/myPage/mng/notice/noticeSave.do") public
	 * ModelAndView noticeSave(@ReqParam Map<String, Object> reqParam) {
	 * ModelAndView modelAndView = new
	 * ModelAndView("ui/myPage/board/notice/noticeSave.content"); try {
	 * Map<String, Object> codeMap = new HashMap<String, Object>();
	 * codeMap.put("codeId", "INTEG_SE_CODE");
	 * 
	 * List<EgovMap> listMap = comCodeService.selectComCodeList(codeMap);
	 * List<Map<String, Object>> inList = new ArrayList<Map<String,Object>>();
	 * List<Map<String, Object>> nsList = new ArrayList<Map<String,Object>>();
	 * for(EgovMap list:listMap) { Map<String, Object> map = new HashMap<>();
	 * String codeValue = (String) list.get("codeValue"); String codeValueNm =
	 * (String) list.get("codeValueNm"); if(codeValue.contains("IN")) {//정보
	 * map.put("codeValue", codeValue); map.put("codeValueNm", codeValueNm);
	 * inList.add(map); } else { //NS 공지 map.put("codeValue", codeValue);
	 * map.put("codeValueNm", codeValueNm); nsList.add(map); } }
	 * 
	 * modelAndView.addObject("inSeCodeList", inList);
	 * modelAndView.addObject("nsSeCodeList", nsList);
	 * modelAndView.addObject("param", reqParam); if
	 * ("u".equals(reqParam.get("crud"))) { EgovMap resultMap = null; resultMap
	 * = boardService.selectIntegBbs(reqParam);
	 * modelAndView.addObject("integBbs", resultMap);
	 * modelAndView.addObject("boardMngType", reqParam.get("viewBoardMngType"));
	 * } } catch (SQLException e) {
	 * logger.error("noticeSave method Error Occured : "); } return
	 * modelAndView; }
	 */

	@RequestMapping(value = "/myPage/mng/notice/noticeSave.do")
	public ModelAndView unitNoticeSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/notice/unit_noticeSave.content");
		try {
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "INTEG_SE_CODE");

			List<EgovMap> listMap = comCodeService.selectComCodeList(codeMap);
			List<Map<String, Object>> inList = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> nsList = new ArrayList<Map<String, Object>>();
			for (EgovMap list : listMap) {
				Map<String, Object> map = new HashMap<>();
				String codeValue = (String) list.get("codeValue");
				String codeValueNm = (String) list.get("codeValueNm");
				if (codeValue.contains("IN")) {// 정보
					map.put("codeValue", codeValue);
					map.put("codeValueNm", codeValueNm);
					inList.add(map);
				} else { // NS 공지
					map.put("codeValue", codeValue);
					map.put("codeValueNm", codeValueNm);
					nsList.add(map);
				}
			}

			modelAndView.addObject("inSeCodeList", inList);
			modelAndView.addObject("nsSeCodeList", nsList);
			modelAndView.addObject("param", reqParam);
			if ("u".equals(reqParam.get("crud"))) {
				EgovMap resultMap = null;
				resultMap = boardService.selectUnitBbs(reqParam);
				modelAndView.addObject("integBbs", resultMap);
				modelAndView.addObject("boardMngType", reqParam.get("viewBoardMngType"));
				modelAndView.addObject("unitType", reqParam.get("viewUnitType"));
			}
		} catch (SQLException e) {
			logger.error("noticeSave method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 관리자게시판 관리 통합(공지사항, 정보공개) 등록, 수정, 삭제 - 21.12.15
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/notice/motifyNotice.ajax")
	public ModelAndView deleteNotice(@RequestParam(value = "atchFile", required = false) MultipartFile atchFile,@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		String msg = "";
		try {
			String motifyType = reqParam.get("motifyType").toString();
			if ("I".equals(motifyType)) {
				result = boardService.insertIntegBbs(reqParam, atchFile);
				msg = "등록";
			} else if ("U".equals(motifyType)) {
				result = boardService.updateIntegBbs(reqParam, atchFile);
				msg = "수정";
			} else {// "D"
				result = boardService.deleteIntegBbs(reqParam);
				msg = "삭제";
			}

			if (result != 0) {

				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 게시글을 " + msg + "하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지  게시글" + msg + "중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | NoSuchAlgorithmException | IOException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지  게시글" + msg + "중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/infoList.do")
	public ModelAndView infoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/info/infoList.content");
		try {
			// 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("schCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.error("infoList method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/selectInfoList.ajax")
	public ModelAndView selectInfoList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
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
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시판 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 작성 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/infoSave.do")
	public ModelAndView infoSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/info/infoSave.content");
		try {
			// 창업지원내용구분 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "FNTN_SPORT_CN_SE_CODE");
			modelAndView.addObject("fntnSportCnSeCodeList", comCodeService.selectComCodeList(codeMap));

			modelAndView.addObject("param", reqParam);
			if ("u".equals(reqParam.get("crud"))) {
				modelAndView.addObject("fntnBbs", boardService.selectFntnBbs(reqParam));
				modelAndView.addObject("fntnBbsNextInfo", boardService.selectFntnBbsNextInfo(reqParam));
			}
		} catch (SQLException e) {
			logger.error("infoSave method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 등록
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/insertInfo.ajax")
	public ModelAndView insertInfo(@RequestParam(value = "atchFile", required = false) MultipartFile atchFile,
			@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.insertFntnBbs(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 등록하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 등록 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("insertNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 등록 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 수정
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/updateInfo.ajax")
	public ModelAndView updateInfo(@RequestParam(value = "atchFile", required = false) MultipartFile atchFile,@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.updateFntnBbs(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 수정하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 수정 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 삭제
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/deleteInfo.ajax")
	public ModelAndView deleteInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.deleteFntnBbs(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("deleteInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 창업지원 게시판 관리 삭제(다중)
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/deleteMultiInfo.ajax")
	public ModelAndView deleteMultiInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.deleteMultiFntnBbs(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("deleteInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시글을 삭제 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 불공정 계약신고 관리 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/report/reportList.do")
	public ModelAndView reportList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/report/reportList.content");
		try {
			// 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "STTEMNT_IEM_SE_CODE");
			modelAndView.addObject("schSttemntIemSeCodeList", comCodeService.selectComCodeList(codeMap));
			codeMap.put("codeId", "ANSWER_STTUS_SE_CODE");
			modelAndView.addObject("schAnswerSttusSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException e) {
			logger.error("reportList method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 불공정 계약신고 관리 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/report/selectReportList.ajax")
	public ModelAndView selectReportList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInjstBbsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectReportList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("dataList", boardService.selectInjstBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectReportList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 창업지원 게시판 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 불공정 계약신고 관리 답변 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/report/reportView.do")
	public ModelAndView reportView(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/report/reportView.content");
		try {
			// 콤보
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "STTEMNT_IEM_SE_CODE");
			modelAndView.addObject("schSttemntIemSeCodeList", comCodeService.selectComCodeList(codeMap));
			codeMap.put("codeId", "ANSWER_STTUS_SE_CODE");
			modelAndView.addObject("schAnswerSttusSeCodeList", comCodeService.selectComCodeList(codeMap));
			modelAndView.addObject("injstBbs", boardService.selectInjstBbs(reqParam));
		} catch (SQLException e) {
			logger.error("reportView method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 불공정 계약신고 관리 답변 메일발송
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/report/updateReport.ajax")
	public ModelAndView updateReport(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			result = boardService.updateInjstBbs(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정 계약신고 답변 메일을 발송하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정 계약신고 답변 메일 발송중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateReport method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "불공정 계약신고 답변 메일 발송중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 달력 테스트
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/test/test/diaryTest.do")
	public ModelAndView diaryTest(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/test/test/diaryTest.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 관심 프랜차이즈 현황 화면 - 21.01.19
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/intrstFrnchs/intrstFrnchsList.do")
	public ModelAndView intrstBrandtList(@ReqParam Map<String, Object> reqParam) {
		String returnPage;
		// if("US03".equals(reqParam.get("ssUserSeCode"))) {
		// returnPage = "ui/myPage/intrstBrand/intrstBrandtList.content";
		// }else {
		returnPage = "ui/myPage/intrstFrnchs/intrstFrnchsList.content";
		// }
		ModelAndView modelAndView = new ModelAndView(returnPage);

		return modelAndView;
	}

	/**
	 * 마이페이지 관심 프랜차이즈 현황 목록 조회 - 21.01.20
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/intrstFrnchs/selectIntrstFrnchsList.ajax")
	public ModelAndView selectIntrstFrnchsList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			// int resultCount =
			// franService.selectAttnFrnchsListCount(reqParam);
			int resultCount = franService.selectIntrstFrnchsListCount(reqParam);

			PagingUtils.setPaging("www", "search_frchs", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("dataList", franService.selectIntrstFrnchsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "관심 브랜드 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 검토하기 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/exmnt/exmntList.do")
	public ModelAndView exmntListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/exmnt/exmntList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 신청현황 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/reqst/reqstList.do")
	public ModelAndView reqstListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/reqst/reqstList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 관리현황 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/manage/manageList.do")
	public ModelAndView manageListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/manage/manageList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 문의현황 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/inqry/inqryList.do")
	public ModelAndView inqryListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/inqry/inqryList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 점포관리확인 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/manageAdm/manageAdmList.do")
	public ModelAndView manageAdmListPage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/manageAdm/manageAdmList.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 결재화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/trade/tradeReview.do")
	@LoginCheck(resultType = "url")
	public ModelAndView tradeReview(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/trade/tradeReview.content");
		try {
			modelAndView.addObject("param", reqParam);
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
			logger.error("tradeReview method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 관리 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/selectTradeList.ajax")
	public ModelAndView selectTradeList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectMypageTradeBbsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectTradeList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectMypageTradeBbsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTradeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 매물점포 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 상세정보 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/selectTrade.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView selectTrade(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("param", reqParam);
			modelAndView.addObject("tradeBbs", boardService.selectTradeBbs(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTrade method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "점포장터 매물점포 내용 보기 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 점포장터 매물점포 승인상태 수정
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/updateTradeSttus.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView updateTradeSttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int result = 0;

			result = boardService.updateTradeSttus(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포 승인상태를 수정하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포 승인상태를 수정 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateTradeSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포 승인상태를 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 문의답변
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/updateInqrySttus.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView updateInqrySttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int result = 0;

			result = boardService.updateInqrySttus(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "문의사항 답변을 등록하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "문의사항 답변등록 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateTradeSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "문의사항 답변등록 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 문의 목록 조회
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/selectInqryList.ajax")
	public ModelAndView selectInqryList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInqryListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInqryList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInqryList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTradeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 매물점포 문의목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 브랜드 정보 관리 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/brandInfo/brandInfoList.do")
	public ModelAndView brandInfoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/brandInfo/brandInfoList.content");

		return modelAndView;
	}

	/**
	 * 마이페이지 브랜드 정보 관리 목록 조회
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brandInfo/selectBrandInfoList.ajax")
	public ModelAndView selectBrandInfoList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int resultCount = franService.selectBrandInfoListCnt(reqParam);

			PagingUtils.setPaging("www", "fn_search", resultCount, 5, 10, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);

			modelAndView.addObject("dataList", franService.selectBrandInfoList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 매물점포 삭제요청
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/trade/deleteTradeSttus.ajax")
	@LoginCheck(resultType = "url")
	public ModelAndView deleteTradeSttus(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int result = 0;

			result = boardService.updateTradeSttus(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포를 삭제요청하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포 삭제요청 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateTradeSttus method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "매물점포 삭제요청 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 브랜드 정보 관리 화면 - 21.01.21
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/brandInfo/brandInfo.do")
	public ModelAndView brandInfo(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/brandInfo/brandInfo.content");
		try {
			EgovMap data = franService.selectBrandInfoForAdi(reqParam);

			if (data != null && data.get("entrprsIntrcnFileKey") != null) {
				String fileKey = data.get("entrprsIntrcnFileKey").toString();
				String[] tmpArr = data.get("entrprsIntrcnFileKey").toString().split("_");
				String atchmnflNo = tmpArr[0];
				String fileSn = tmpArr[1];
				String encFileKey = encryptService.encryptedStr(fileKey);
				data.put("fileKey", encFileKey);
				data.put("atchmnflNo", atchmnflNo);
				data.put("fileSn", fileSn);
			}
			// 위변조 방지용
			HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			session.setAttribute("changeFrnchsNo", data.get("frnchsNo"));

			modelAndView.addObject("data", data);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 상세 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 브랜드 관리 상세정보 삭제
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/boardInfo/deleteBrandAdiInfo.ajax")
	public ModelAndView deleteBrandAdiInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;
			result = franService.deleteBrandAdiInfo(reqParam);
			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "브랜드 상세 정보를 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "브랜드 상세 정보를 삭제 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("updateNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "브랜드 상세 정보를 삭제 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 관심 프랜차이즈 현황 목록 조회 - 21.01.20
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brandInfo/selectBrandInfo.ajax")
	public ModelAndView selectBrandInfo(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView.addObject("dataList", franService.selectIntrstFrnchsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName() + " method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "관심 브랜드 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 컨설턴트 목록 조회
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/trade/selectConsultantList.ajax")
	public ModelAndView selectConsultantList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", boardService.selectConsultantList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectTradeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "컨설턴트 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 프랜차이즈 본사 상벌 관리 화면 - 21.12.07 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/fran/reward/rewardList.do")
	public ModelAndView rewardList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/fran/reward/rewardList.content");
		return modelAndView;
	}

	/**
	 * 프랜차이즈 본사 상벌 입력 화면 - 21.12.07 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/fran/reward/rewardInfo.do")
	public ModelAndView rewardInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/fran/reward/rewardInfo.content");

		// hedofcNo받아 정보 조회 수상 1회이상 상태값 Y, 아니면 N 구분값 포함 전달
		try {
			modelAndView.addObject("dataList", franService.selectRewardInfo(reqParam));
		} catch (SQLException | DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return modelAndView;
	}

	/**
	 * 프랜차이즈 본사 상벌 관리 목록 조회 - 21.12.08 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/fran/reward/rewardList.ajax")
	public ModelAndView selectRewardList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = franService.selectRewardListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectRewardList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", franService.selectRewardList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectRewardList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 본사 상벌 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 프랜차이즈 본사 상벌 관리 등록 - 21.12.08 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/fran/reward/insertReward.ajax")
	public ModelAndView insertReward(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;
			result = franService.updateRewardInsert(reqParam);

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 본사 상벌관리 등록 완료 하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 본사 상벌관리 등록 중 에러가 발생하였습니다.");
			}
		} catch (SQLException e) {
			logger.error("insertReward method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 본사 상벌관리 등록 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 프랜차이즈 본사 상벌 관리 삭제 - 21.12.08 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/fran/reward/updateRewardDelete.ajax")
	public ModelAndView updateRewardDelete(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			if (reqParam.get("hedofcNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("hedofcNoArr", reqParam.get("hedofcNoArr").toString().split(","));

			franService.updateRewardDelete(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "삭제 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateRewardDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 상벌 관리 삭제하기 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 정보공개서 관리 화면 - 21.12.07 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/infoDcs/infoDcsList.do")
	public ModelAndView infoDcsList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/infoDcs/infoDcsList.content");
		return modelAndView;
	}

	/**
	 * 정보공개서 관리 등록 화면 - 21.12.07 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/infoDcsInfo/infoDcsInfo.do") //left menu selected id값 때문에 경로만 바꿈 infoDcs => infoDcsInfo
	public ModelAndView infoDcsInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/infoDcs/infoDcsInfo.content");
		return modelAndView;
	}

	/**
	 * 교육신청 관리 화면 - 22.03.29 김진호
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/infoDcsEdu/infoDcsEdu.do")
	public ModelAndView infoDcsInfoEdu(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/infoDcsEdu/infoDcsEdu.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서등록 > 교육신청 관리 조회 - 22.03.29 김진호
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/infoDcsEdu/selectInfoDcsEduList.ajax")
	public ModelAndView selectInfoDcsEduList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInfoDcsEduListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInfoDcsEduList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInfoDcsEduList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("selectInfoDcsEduList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "교육신청 관리 페이지 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 익명게시판 관리 조회
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/annymty/selectAnnymtyList.ajax")
	public ModelAndView selectAnnymtyList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectAnnymtyListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectAnnymtyList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectAnnymtyList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("selectInfoDcsEduList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "교육신청 관리 페이지 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 교육신청 관리 > 삭제 - 22.04.11 김진호
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brand/infoDcsEdu/updateInfoDcsEduDelete.ajax")
	public ModelAndView updateInfoDcsEduDelete(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			if (reqParam.get("infoDcsRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			boardService.updateInfoDcsEduDelete(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "삭제 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateInfoDcsEduDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "교육신청 데이터 삭제중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 마이페이지 교육신청 관리 > 삭제 - 22.04.11 김진호
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brand/annymty/updateAnnymtyListDelete.ajax")
	public ModelAndView updateAnnymtyListDelete(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		
		try {
			if (reqParam.get("infoDcsRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			boardService.updateAnnymtyListDelete(reqParam);
			
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "삭제 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateInfoDcsEduDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "교육신청 데이터 삭제중 에러가 발생하였습니다.");
		}
		
		return modelAndView;
	}

	/**
	 * 정보공개서 관리 등록 > 정보공개서 등록 화면 - 21.12.09 주한별
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/infoDcsInfo/infoDcsEnrol.do")//left menu selected id값 때문에 경로만 바꿈 infoDcs => infoDcsInfo
	public ModelAndView infoDcsInfoDcsEnrol(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/infoDcs/infoDcsEnrol.content");
		try {
			modelAndView.addObject("infoData", boardService.selectInfoDcsEnrollData(reqParam));
			modelAndView.addObject("userSeCode", reqParam.get("ssUserSeCode"));
			if ("US03".equals(reqParam.get("ssUserSeCode"))) { // 본사번호 조회 추가
				modelAndView.addObject("hedofcNo", userService.selectUserChrgHedofcNo(reqParam).get("hedofcNo"));
			}
			// 년도 데이터
			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("infoDcsInfoDcsEnrol method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개서 등록화면 정보 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 정보공개서 관리 목록 조회 - 21.12.09 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/infoDcs/selectInfoDcsList.ajax")
	public ModelAndView selectInfoDcsList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInfoDcsListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInfoDcsList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInfoDcsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("selectInfoDcsList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개서 관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 목록 조회 - 21.12.10 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/infoDcs/selectInfoAdminList.ajax")
	public ModelAndView selectInfoAdminList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInfoAdminListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInfoDcsList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInfoAdminList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectInfoAdminList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개관리자 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 관리자(배정) 수정 - 21.12.10 주한별
	 * 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/myPage/board/infoDcs/updateInfoAdmin.ajax")
	public ModelAndView updateInfoAdmin(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("resultCnt", boardService.updateAssignInfoAdmin(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateInfoAdmin method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개서관리자 배정 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서 관리 > 정보공개서 승인 or 반려 처리 - 21.12.10 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brand/infoDcs/updateInfoDcsSttus.ajax")
	public ModelAndView updateInfoDcsSttus(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			if (reqParam.get("infoDcsRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			reqParam.put("infoDcsRegistNoArr", reqParam.get("infoDcsRegistNoArr").toString().split(","));
			// script단에서 confmSttusCode = [CS01 승인 or CS02 반려] 값 구분해서 넘김
			boardService.updateInfoDcsSttus(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "진행상태 업데이트 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateRewardDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "진행상태 업데이트 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서등록 > 목록조회 - 21.12.10 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/board/infoDcs/selectInfoDcsInfoList.ajax")
	public ModelAndView selectInfoDcsInfoList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectInfoDcsInfoListCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectInfoDcsInfoList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectInfoDcsInfoList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error("selectInfoDcsInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개관리자등록 페이지 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서 관리 > 삭제 - 21.12.10 주한별
	 * 
	 * @param reqParam
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
	@RequestMapping(value = "/myPage/brand/infoDcs/updateInfoDcsInfoDelete.ajax")
	public ModelAndView updateInfoDcsInfoDelete(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			if (reqParam.get("infoDcsRegistNoArr") == null) {
				throw new NullPointerException("잘못된요청입니다.");
			}
			boardService.updateInfoDcsInfoDelete(reqParam);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개관리 파일이 삭제 되었습니다.");
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("updateInfoDcsInfoDelete method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개관리 파일 삭제중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 정보공개서 정보공개서 등록 - 21.12.09 주한별
	 * 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/{type}InfoDcsEnrol.ajax", consumes = { "multipart/form-data" })
	public ModelAndView infoDcsEnrol(@RequestParam(value = "atchFile", required = false) MultipartFile atchFile,
			@ReqParam Map<String, Object> reqParam, @PathVariable String type) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			int result = 0;

			if ("insert".equals(type)) {
				result = boardService.insertInfoDcsEnrol(reqParam, atchFile);
			} else if ("update".equals(type)) {
				result = boardService.updateInfoDcsEnrol(reqParam, atchFile);
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			if (result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE,"정보공개서 등록 정보를 " + ("insert".equals(type) ? "등록" : "변경") + "하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE,"정보공개서 등록 정보 " + ("insert".equals(type) ? "등록" : "변경") + " 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException
				| NoSuchAlgorithmException | BadCommandException | IOException e) {
			e.printStackTrace();
			logger.error("InfoDcsEnrol method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE,"정보공개서 등록 정보 " + ("insert".equals(type) ? "등록" : "변경") + " 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 정보공개서 관리 화면(마이페이지) - 정보공개서 관리자 - 21.12.13 박성민
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/infoDcs/infoDcsManage.do")
	public ModelAndView infoDcsManage(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/infoDcs/infoDcsManage.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 관리자 > 관리자 게시판 관리 옵션 - 22.01.14 염종찬
	 * 
	 * @param paramMap
	 * @return
	 * @throws DataAccessException
	 * @throws SQLException
	 */
	@RequestMapping(value = "/myPage/board/selectUnitNoticeOption.ajax")
	public ModelAndView selectUnitNoticeOption(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("options", boardService.selectUnitNoticeOption(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("selectUnitNoticeOption method Error Occured [DataAccessException]: ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "정보공개서관리자 배정 수정 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 마이페이지 나의 게시판 페이지 - 22.01.24
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/mng/info/userUnityBoard.do")
	public ModelAndView userUnityBoard(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/user/userUnityBoard.content");
		return modelAndView;
	}

	/**
	 * 마이페이지 나의 게시판 조회 - 22.01.24
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/selectUserUnityBoardList.ajax")
	public ModelAndView selectUserUnityBoardList(@ReqParam Map<String, Object> reqParam)
			throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException,
			NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = boardService.selectUserUnityBoardCount(reqParam);
			PagingUtils.setPaging("www", "fn_selectUserUnityBoardList", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectUserUnityBoard(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException e) {
			logger.error("selectUserUnityBoardList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지  나의 게시글 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 나의 게시판 상제 조회 - 22.01.24
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/userUnitySave.do")
	public ModelAndView userUnitySave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/user/userUnityBoardSave.content");
		try {
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "INTEG_SE_CODE");

			List<EgovMap> listMap = comCodeService.selectComCodeList(codeMap);
			List<Map<String, Object>> inList = new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> nsList = new ArrayList<Map<String, Object>>();
			for (EgovMap list : listMap) {
				Map<String, Object> map = new HashMap<>();
				String codeValue = (String) list.get("codeValue");
				String codeValueNm = (String) list.get("codeValueNm");
				if (codeValue.contains("IN")) {// 정보
					map.put("codeValue", codeValue);
					map.put("codeValueNm", codeValueNm);
					inList.add(map);
				} else { // NS 공지
					map.put("codeValue", codeValue);
					map.put("codeValueNm", codeValueNm);
					nsList.add(map);
				}
			}

			modelAndView.addObject("inSeCodeList", inList);
			modelAndView.addObject("nsSeCodeList", nsList);
			modelAndView.addObject("param", reqParam);
			if ("u".equals(reqParam.get("crud"))) {
				EgovMap resultMap = null;
				resultMap = boardService.selectUserUnitBbs(reqParam);
				modelAndView.addObject("integBbs", resultMap);
				modelAndView.addObject("boardMngType", reqParam.get("viewBoardMngType"));
				modelAndView.addObject("unitType", reqParam.get("viewUnitType"));
			}
		} catch (SQLException e) {
			logger.error("noticeSave method Error Occured : ");
		}
		return modelAndView;
	}

	/**
	 * 마이페이지 나의 게시글 관리 통합(공지사항, 정보공개) 등록, 수정, 삭제 - 22.01.24
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/board/info/deleteUserUnityBoard.ajax")
	public ModelAndView deleteUserUnityBoard(@RequestParam(value = "atchFile", required = false) MultipartFile atchFile,
			@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		int result = 0;
		String msg = "";
		try {
			String motifyType = reqParam.get("motifyType").toString();
			if ("I".equals(motifyType)) {
				result = boardService.insertIntegBbs(reqParam, atchFile);
				msg = "등록";
			} else if ("U".equals(motifyType)) {
				result = boardService.updateIntegBbs(reqParam, atchFile);
				msg = "수정";
			} else {// "D"
				result = boardService.deleteIntegBbs(reqParam);
				msg = "삭제";
			}

			if (result != 0) {

				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지 게시글을 " + msg + "하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지  게시글" + msg + "중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | NoSuchAlgorithmException | IOException e) {
			e.printStackTrace();
			logger.error("deleteNotice method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "마이페이지  게시글" + msg + "중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 익명게시판 관리 화면
	 * 
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/myPage/annymty/annymtyList.do")
	public ModelAndView annymtyList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/myPage/board/annymty/annymtyList.content");

		return modelAndView;
	}

}
