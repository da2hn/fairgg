package gov.ggdo.frnchs.ui.sysMngr.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ibm.icu.util.Calendar;
import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.sysMngr.service.SysMngrService;
import gov.ggdo.frnchs.ui.user.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Controller
@RequestMapping(value = "/sysMngr")
public class SysMngrController {

	@Log Logger logger;

	@Autowired private SysMngrService sysMngrService;
//	@Autowired private SysMngrPr sysMngrPr;
	@Autowired private ComCodeService comCodeService;
	@Autowired private UserService userService;

	/**
	 * 회원관리 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/user/userList.do")
	public ModelAndView userList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/user/user/userList.sysMngrContent");

		try {
			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("userList method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 회원관리 목록 조회
	 * @param reqParam
	 * @return
	 * @throws IOException
	 * @throws BadCommandException
	 * @throws NoSuchAlgorithmException
	 * @throws NullPointerException
	 * @throws ClassNotFoundException
	 * @throws FileNotFoundException
	 */
	@RequestMapping(value = "/selectUserList.ajax")
	public ModelAndView selectUserList(@ReqParam Map<String, Object> reqParam) throws FileNotFoundException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException, IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = sysMngrService.selectAllUserListCount(reqParam);

			// setPaging(type(www or admin), function(페이징이동메소드), resultCount(전체리스트수), pageSize(페이징 표기 수), recordCountPerPage(리스트 목록 수), reqParam, ModelAndView) - 20.12.21
			PagingUtils.setPaging("admin", "fn_searchUserList", resultCount, reqParam, modelAndView);

			modelAndView.addObject("dataList", sysMngrService.selectAllUserList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectUserList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 회원관리 상세 조회 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/user/userInfo.do")
	public ModelAndView userInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/user/user/userInfo.sysMngrContent");
		try {
			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));

			Map<String, Object> data = sysMngrService.selectAllUserInfo(reqParam);
			modelAndView.addObject("data", data);
			if("US03".equals(data.get("userSeCode"))) {
				reqParam.put("ssUserNo", data.get("userNo"));
				modelAndView.addObject("userChrgBrandList", userService.selectUserChrgBrandList(reqParam));
			}

			HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			session.setAttribute("changeUserNo", data.get("userNo"));
		} catch (SQLException | DataAccessException e) {
			logger.error("userInfo method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 회원관리 상세 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectUserInfo.ajax")
	public ModelAndView selectUserInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("selectUserInfo", sysMngrService.selectUserInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectCode method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원관리 상세 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 회원관리 상세 조회(브랜드관리자)
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectBrandUserInfo.ajax")
	public ModelAndView selectBrandUserInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("selectUserInfo", sysMngrService.selectBrandUserInfo(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectCode method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원관리 상세 조회(브랜드관리자) 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 회원관리 상세 수정
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/updateAllUserInfo.ajax")
	public ModelAndView updateUserInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			String changeUserNo = ObjectUtils.isEmpty(session.getAttribute("changeUserNo")) ? "" : session.getAttribute("changeUserNo").toString();
			if(changeUserNo.equals(reqParam.get("userNo"))) {
				// 변경제어 추가 - 20.12.17
				Map<String, Object> user = sysMngrService.selectAllUserInfo(reqParam);
				if("CS03".equals(user.get("confmSttusCode")) && "US03".equals(user.get("userSeCode")) && !user.get("userSeCode").equals(reqParam.get("userSeCode"))) {
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "브랜드 관리자는 그룹선택 변경이 불가능합니다.");
				} else if("CS03".equals(user.get("confmSttusCode")) && !"US03".equals(user.get("userSeCode")) && "US03".equals(reqParam.get("userSeCode"))) {
						modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
						modelAndView.addObject(Constants.RESULT_MESSAGE, "브랜드 관리자로의 그룹선택 변경이 불가능합니다.");
				} else if("CS02".equals(user.get("confmSttusCode"))) {
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "반려된 회원정보는 수정하실 수 없습니다.");
				} else {
					// 코드에 따른 업데이트 분기 - 20.12.17
					int updateCnt = "US03".equals(reqParam.get("userSeCode")) ? sysMngrService.updateBrandUserInfo(reqParam) : sysMngrService.updateUserInfo(reqParam);
					modelAndView.addObject("updateCnt", updateCnt);
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "회원정보를 수정하였습니다.");
				}
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터변경 또는 세션이 만료된 요청입니다. 처음부터 다시 진행해주세요.");
			}
		} catch (SQLException | DataAccessException e) {
			logger.error("updateUserInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "회원관리 상세 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	/**
	 * 회원관리 승인상태 변경
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/updateUserSttusCode.ajax")
	public ModelAndView updateUserStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int updateCnt = sysMngrService.updateMultiUserStat(reqParam);
			if(updateCnt != 0) {
				modelAndView.addObject("updateCnt", updateCnt);
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, updateCnt+"명의 회원관리 승인상태를 변경하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "회원관리 승인상태 변경 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("updateUserSttusCode method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, e.toString().contains("BadCommandException") ? e.getMessage() : "회원관리 승인상태 변경 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 회원정보 삭제
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/deleteUserNo.ajax")
	public ModelAndView deleteUserNo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int deleteCnt = sysMngrService.deleteUserNo(reqParam);
			if(deleteCnt != 0) {
				/*modelAndView.addObject("deleteCnt", deleteCnt);*/
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, deleteCnt+"명의 회원정보를 삭제하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "회원정보 삭제 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("updateUserSttusCode method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, e.toString().contains("BadCommandException") ? e.getMessage() : "회원정보 삭제 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	

	/**
	 * 권한관리 화면 - 20.12.17
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/user/auth/authList.do")
	public ModelAndView authList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/user/auth/authList.sysMngrContent");

		try {
			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("authList method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 권한관리 목록 조회 - 20.12.17
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectAuthList.ajax")
	public ModelAndView selectAuthList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", sysMngrService.selectAuthList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectAuthList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "권한관리 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 권한관리 정보 수정 - 20.12.18
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/updateAuthInfo.ajax")
	public ModelAndView updateAuthInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if(ObjectUtils.isEmpty(reqParam.get("userSeCode"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "권한을 변경할 권한그룹을 선택해주세요.");
			} else {
//				for ( String key : reqParam.keySet() ) {
//					System.out.println(">>> "+key+":"+reqParam.get(key));
//				}
				int updateCnt = sysMngrService.updateMultiAuthInfo(reqParam);
//				if(updateCnt != 0) { // 변경
					modelAndView.addObject("updateCnt", updateCnt);
					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
					modelAndView.addObject(Constants.RESULT_MESSAGE, "권한상태를  변경하였습니다.");
//				} else {
//					modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
//					modelAndView.addObject(Constants.RESULT_MESSAGE, "권한상태  변경 중 에러가 발생하였습니다.");
//				}
			}
		} catch (SQLException | DataAccessException | BadCommandException e) {
			logger.error("selectCode method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "권한관리 변경 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 월별 접속화면 화면 - 20.12.17
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/log/monthly/monAccsStat.do")
	public ModelAndView monStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/log/monthly/monAccsStat.sysMngrContent");

		try {
			// 현재년 - 21.01.13
			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));

			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("monStatList method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 월별 접속통계 조회 - 21.01.14
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectMonthAccsStat.ajax")
	public ModelAndView selectMonthAccsStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if(StringUtils.isEmpty(reqParam.get("searchYear"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 년을 선택해주세요.");
			} else if(StringUtils.isEmpty(reqParam.get("searchMonth"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 월을 선택해주세요.");
			} else {
				modelAndView.addObject("dataList", sysMngrService.selectAccsStatYearList(reqParam));

				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}
		} catch (SQLException | DataAccessException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "일별 접속통계 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 주별 접속화면 화면 - 21.12.28
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/log/weekly/weekAccsStat.do")
	public ModelAndView weekStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/log/weekly/weekAccsStat.sysMngrContent");

		try {
			// 현재년 - 21.12.28
			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));

			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("weekStatList method Error Occured : ");
		}

		return modelAndView;
	}
	
	/**
	 * 주별 접속통계 조회(연월별 주차수 조회) - 21.12.28
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectWeekCountList.ajax")
	public ModelAndView selectWeekCountList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			modelAndView.addObject("dataList", sysMngrService.selectWeekCountList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "주별 접속통계 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 주별 접속통계 조회 - 21.12.28
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectWeekAccsStat.ajax")
	public ModelAndView selectWeekAccsStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if(StringUtils.isEmpty(reqParam.get("searchYear"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 년을 선택해주세요.");
			} else if(StringUtils.isEmpty(reqParam.get("searchMonth"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 월을 선택해주세요.");
			} 
//			else if(StringUtils.isEmpty(reqParam.get("searchWeek"))) {
//				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
//				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 주를 선택해주세요.");
//			}
			else {
				modelAndView.addObject("dataList", sysMngrService.selectAccsStatWeekList(reqParam));

				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}
		} catch (SQLException | DataAccessException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "주별 접속통계 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 일별 접속화면 화면 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/log/daily/dayAccsStat.do")
	public ModelAndView dayStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/log/daily/dayAccsStat.sysMngrContent");

		try {
			// 현재년 - 21.01.12
			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));

			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("dayStatList method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 일별 접속통계 조회 - 21.01.12
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectDayAccsStat.ajax")
	public ModelAndView selectDayAccsStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if(StringUtils.isEmpty(reqParam.get("searchDate"))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 일을 선택해주세요.");
			} else {
				modelAndView.addObject("dataList", sysMngrService.selectAccsStatMonthList(reqParam));

				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}
		} catch (SQLException | DataAccessException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "일별 접속통계 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 일별 접속통계 조회 - 21.01.13
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectAccsStatDetailList.ajax")
	public ModelAndView selectAccsStatDetailList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			if(StringUtils.isEmpty(reqParam.get("searchDate")) && (StringUtils.isEmpty(reqParam.get("searchMonth")) || StringUtils.isEmpty(reqParam.get("searchYear")))) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "통계조회 조건을 선택해주세요.");
			} else {
				int resultCount = sysMngrService.selectAccsStatDetailListCount(reqParam);

				// setPaging(type(www or admin), function(페이징이동메소드), resultCount(전체리스트수), pageSize(페이징 표기 수), recordCountPerPage(리스트 목록 수), reqParam, ModelAndView) - 20.12.21
				PagingUtils.setPaging("admin", StringUtils.isEmpty(reqParam.get("searchDate")) ? "fn_selectAccsStatDetailListByMonth" : "fn_selectAccsStatDetailListByDay", resultCount, reqParam, modelAndView);

				modelAndView.addObject("dataList", sysMngrService.selectAccsStatDetailList(reqParam));
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "일별 접속통계 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	@RequestMapping(value="/excelDownload.do")
	public ModelAndView exceldownload(HttpServletResponse response, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("excelDownView");
//		OutputStream out = null;
		logger.debug(">>> excelDownload1");
		try {
			if(!StringUtils.isEmpty(reqParam.get("searchDate"))) {
				sysMngrService.createAccsStatExcel(reqParam, "day", modelAndView);
			} else if(!StringUtils.isEmpty(reqParam.get("searchYear")) && !StringUtils.isEmpty(reqParam.get("searchMonth"))) {
				sysMngrService.createAccsStatExcel(reqParam, "month", modelAndView);
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "조회 조건이 존재하지 않습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("downloadFile Method Exception Occured!!");
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "엑셀 다운 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	/**
	 * 팝업관리 팝업화면 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/popup/popup/popupMngList.do")
	public ModelAndView popupList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/popup/popup/popupMngList.sysMngrContent");

			// 유저권한 목록
//			Map<String, Object> codeMap = new HashMap<String, Object>();
//			codeMap.put("codeId", "USER_SE_CODE");
//			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));

		return modelAndView;
	}

	/**
	 * 팝업관리 팝업목록 조회 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectPopupMngList.ajax")
	public ModelAndView selectPopupList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = sysMngrService.selectPopupMngListCount(reqParam);
			PagingUtils.setPaging("admin", "fn_searchUserList", resultCount, reqParam, modelAndView);

			modelAndView.addObject("dataList", sysMngrService.selectPopupMngList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("selectPopupList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "팝업관리 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 팝업관리 팝업 수정/등록 화면 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/popop/popup/popupMngInfo{type}.do")
	public ModelAndView popupModify(@ReqParam Map<String, Object> reqParam, @PathVariable String type ) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/popup/popup/popupMngInfo.sysMngrContent");

		try {
			HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			if("Insert".equals(type) || "Update".equals(type)) {
				if("Update".equals(type)) {
					Map<String, Object> data = sysMngrService.selectPopupMngInfo(reqParam);
					modelAndView.addObject("data", data);
					session.setAttribute("sPopupNo", data.get("popupNo"));
				}

				session.setAttribute("type", type.toLowerCase());
				modelAndView.addObject("type", type.toLowerCase());
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			// 유저권한 목록 - 20.12.28
			Map<String, Object> codeMap = new HashMap<String, Object>();
			modelAndView.addObject("menuList", sysMngrService.selectPopupMenuList(codeMap));

		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("popupModify method Error Occured : ");
		}

		return modelAndView;
	}

	/**
	 * 팝업관리 리스트 삭제 - 21.01.11
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/deletePopupMngList.ajax")
	public ModelAndView deletePopupMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int deleteCount = sysMngrService.deletePopupMngList(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, deleteCount+"개의 팝업정보를 삭제했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("deletePopupMngList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "팝업관리 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 팝업관리 팝업목록 조회 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/{type}PopupMngInfo.ajax", consumes ={"multipart/form-data"})
	public ModelAndView modifyPopupInto(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam, @PathVariable String type) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		if (!type.equals(session.getAttribute("type"))) {
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터 변경이 일어났습니다. 다시 시도해주세요.");
			return modelAndView;
		}

		try {
			int result = 0;

			if("insert".equals(type)) {
				result = sysMngrService.insertPopupMngInfo(reqParam, atchFile);
			} else if ("update".equals(type)) {
				reqParam.put("popupNo", session.getAttribute("sPopupNo"));
				result = sysMngrService.updatePopupMngInfo(reqParam, atchFile);
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "팝업정보를 "+("insert".equals(type) ? "등록" : "변경")+"하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "팝업정보 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("modifyPopupInto method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "팝업정보 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 데이터관리 목록화면 - 20.12.23
	 * 추가수정 - 21.01.06
	 * @param reqParam
	 * @return
	 */
//	@RequestMapping(value = "/surv/surv/survMngList.do")
//	public ModelAndView survList(@ReqParam Map<String, Object> reqParam) {
//		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/surv/surv/survMngList.sysMngrContent");
//
//		try {
//			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));
//			// 유저권한 목록
//			Map<String, Object> codeMap = new HashMap<String, Object>();
//			codeMap.put("codeId", "USER_SE_CODE");
//			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
//
//			// 설문있는 년도 - 21.01.06
//			modelAndView.addObject("survYearList", sysMngrService.selectSurvGroupYear());
//
//			// 해당 번호의 설문 조회 - 21.01.06
//			reqParam.put("accdtExaminNo", "1"); // 현재 1로 고정
//			modelAndView.addObject("survEvlList", sysMngrService.selectSurvListByAccdtExaminNo(reqParam));
//
//		} catch (SQLException | DataAccessException e) {
//			logger.error("survList method Error Occured : ");
//		}
//
//		return modelAndView;
//	}

	/**
	 * 데이터관리 목록화면 - 20.12.23
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/data/data/dataMngList.do")
	public ModelAndView dataMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/data/data/dataMngList.sysMngrContent");

			modelAndView.addObject("sysStdrYear", Calendar.getInstance().get(Calendar.YEAR));
			// 유저권한 목록
//			Map<String, Object> codeMap = new HashMap<String, Object>();
//			codeMap.put("codeId", "USER_SE_CODE");
//			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));

		return modelAndView;
	}

	/**
	 * 데이터관리 데이터 추가 - 21.01.04
	 * @param atchFile
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/moidfyDataMngInfo.ajax", consumes ={"multipart/form-data"})
	public ModelAndView moidfyDataMngInfo(@RequestParam(value="atchFile") MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			modelAndView = sysMngrService.modifyDataInfoByExcel(reqParam, atchFile, modelAndView);
			if(!ObjectUtils.isEmpty(reqParam.get("userDataManageNo")) && Constants.RESULT_SUCCESS.equals(modelAndView.getModel().get("resultCode"))) {
				sysMngrService.callProcedure(reqParam);
			}
		}catch(NumberFormatException nfe) { // 롤백을 위한 강제에러 발생 및 텍스트 가져오기 - 21.02.04
        	logger.error("moidfyDataMngInfo method NumberFormatException Occured : "+nfe.toString());
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, nfe.getMessage());
        }catch(Exception e) {
        	logger.error("moidfyDataMngInfo method Error Occured : ");

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "에러가 발생하였습니다.");
        }

		return modelAndView;
	}

	/**
	 * 데이터 목록 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectDataMngList.ajax")
	public ModelAndView selectDataMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = sysMngrService.selectDataMngListCount(reqParam);

			// setPaging(type(www or admin), function(페이징이동메소드), resultCount(전체리스트수), pageSize(페이징 표기 수), recordCountPerPage(리스트 목록 수), reqParam, ModelAndView) - 20.12.21
			PagingUtils.setPaging("admin", "fn_selectDataMngList", resultCount, reqParam, modelAndView);

			modelAndView.addObject("dataList", sysMngrService.selectDataMngList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("selectUserList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 해당년도 설문있는 달 조회 - 21.01.07
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectSurvYearMonthList.ajax")
	public ModelAndView selectSurvYearMonthList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {

			modelAndView.addObject("dataList", sysMngrService.selectSurvYearGroupMonth(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectSurvYearMonthList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문년월 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}

	/**
	 * 조건에 맞는  설문조사 데이터 조회 - 21.01.08
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectSurvDataByCondition.ajax")
	public ModelAndView selectSurvDataByCondition(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {

			modelAndView.addObject("dataList", sysMngrService.selectSurvDataByCondition(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectSurvYearMonthList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문조사 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
/*
	@RequestMapping(value = "/testPr.ajax")
	public ModelAndView testPr(@RequestParam(value="atchFile") MultipartFile atchFile, @ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int dataStdrYear = ObjectUtils.isEmpty(reqParam.get("dataStdrYear")) ? 2019 : Integer.parseInt(reqParam.get("dataStdrYear").toString());
			logger.debug(">>>> dataStdrYear:"+dataStdrYear);
			reqParam.put("userDataManageNo", ObjectUtils.isEmpty(reqParam.get("userDataManageNo")) ? String.valueOf(57) : reqParam.get("userDataManageNo").toString());
			logger.debug(">>>> start userDataManageNo:"+reqParam.get("userDataManageNo"));
			EgovMap tMap = sysMngrPr.selectTest(reqParam);
			logger.debug(">>>> testAA:"+tMap.get("aa"));
			logger.debug(">>>> testBB:"+tMap.get("bb"));
			logger.debug(">>>> start callPrUserDataPartitn");
			sysMngrPr.callPrUserDataPartitn(reqParam);
			logger.debug(">>>> end callPrUserDataPartitn");
			for (int i = dataStdrYear; i > dataStdrYear-3; i--) {
				logger.debug(">>>> dataStdrYear[i]:"+i);
				reqParam.put("parseDataStdrYear", String.valueOf(i));
				logger.debug(">>>> start callPrFrnchsCtprvnSm");
				sysMngrPr.callPrFrnchsCtprvnSm(reqParam);
				logger.debug(">>>> end callPrFrnchsCtprvnSm");
				logger.debug(">>>> start callPrFrnchsIndex");
				sysMngrPr.callPrFrnchsIndex(reqParam);
				logger.debug(">>>> end callPrFrnchsIndex");
				logger.debug(">>>> start start");
				sysMngrPr.callStorMxmCtprvn(reqParam);
				logger.debug(">>>> end start");
			}


			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("selectSurvYearMonthList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문조사 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
*/
	
	/**
	 * 동영상 관리 > 공정거래 홍보관 영상관리 화면 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/video/fairTrade/fairTradeVideo.do")
	public ModelAndView fairTradeVideo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/video/fairTrade/fairTradeVideoList.sysMngrContent");

		try {
			//공통코드 조회
			Map<String, Object> codeMap = new HashMap<String, Object>();
			modelAndView.addObject("codeList", sysMngrService.selectFairTradeCodeList(codeMap));
		} catch (DataAccessException | SQLException e) {
			e.printStackTrace();
			logger.error("fairTradeVideo method Error Occured : ");
		}

		return modelAndView;
	}
	
	/**
	 * 동영상 관리 > 공정거래 홍보관 영상 목록 조회 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectFairTradeVideList.ajax")
	public ModelAndView selectFairTradeVideoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			//목록 총수 조회
			int resultCount = sysMngrService.selectFairTradeVideoListCount(reqParam);
			//페이징 세팅
			PagingUtils.setPaging("admin", "fn_selectFairTradeVideoList", resultCount, reqParam, modelAndView);
			//영상 목록 조회
			modelAndView.addObject("dataList", sysMngrService.selectFairTradeVideoList(reqParam));
			//성공 코드 세팅
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("selectFairTradeVideoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래 홍보관 영상 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 동영상 관리 > 공정거래 홍보관 영상 수정/등록 화면 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/video/fairTrade/fairTradeVideoInfo{type}.do")
	public ModelAndView fairTradeVideoModify(@ReqParam Map<String, Object> reqParam, @PathVariable String type ) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/video/fairTrade/fairTradeVideoInfo.sysMngrContent");

		try {
			HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			if("Insert".equals(type) || "Update".equals(type)) {
				if("Update".equals(type)) {
					Map<String, Object> data = sysMngrService.selectFairTradeVideoInfo(reqParam);
					modelAndView.addObject("data", data);
					//session.setAttribute("sPopupNo", data.get("popupNo"));
				}

				session.setAttribute("type", type.toLowerCase());
				modelAndView.addObject("type", type.toLowerCase());
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			//공통코드 조회
			Map<String, Object> codeMap = new HashMap<String, Object>();
			modelAndView.addObject("codeList", sysMngrService.selectFairTradeCodeList(codeMap));

		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("popupModify method Error Occured : ");
		}

		return modelAndView;
	}
	
	/**
	 * 동영상 관리 > 공정거래 홍보관 영상 수정/등록  - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/{type}fairTradeVideoInfo.ajax", consumes ={"multipart/form-data"})
	public ModelAndView modifyfairTradeVideoInfo(@RequestParam(value="atchFile", required=false) MultipartFile atchFile, @ReqParam Map<String, Object> reqParam, @PathVariable String type) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		
		HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		if (!type.equals(session.getAttribute("type"))) {
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터 변경이 일어났습니다. 다시 시도해주세요.");
			return modelAndView;
		}

		try {
			int result = 0;

			if("insert".equals(type)) {
				result = sysMngrService.insertFairTradeVideoInfo(reqParam, atchFile);
			} else if ("update".equals(type)) {
				result = sysMngrService.updateFairTradeVideoInfo(reqParam, atchFile);
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래홍보관 영상 정보를 "+("insert".equals(type) ? "등록" : "변경")+"하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래홍보관 영상 정보 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			e.printStackTrace();
			logger.error("modifyfairTradeVideoInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래홍보관 영상 정보 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 동영상 관리 > 공정거래 홍보관 영상 삭제 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/deleteFairTradeVideList.ajax")
	public ModelAndView deleteFairTradeVideList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int deleteCount = sysMngrService.deleteFairTradeVideoList(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, deleteCount+"개의 공정거래 홍보관 영상를 삭제했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("deleteFairTradeVideList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래 홍보관 영상 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 화면 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/board/boardMngList.do")
	public ModelAndView boardMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/board/board/boardMngList.sysMngrContent");

		try {
		} catch (DataAccessException e) {
			logger.error("boardMngList method Error Occured : ");
		}

		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 셀렉트옵션 - 21.12.28 염종찬
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/board/board/selectBoardOptions.ajax")
	public ModelAndView selectBoardOptions(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {			
			modelAndView.addObject("dataList", sysMngrService.selectBoardOptions(reqParam));
			
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("selectBoardMngList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 생성관리 옵션 조회중 오류가 발생했습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 목록 조회 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectBoardMngList.ajax")
	public ModelAndView selectBoardMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = sysMngrService.selectBoardMngListCount(reqParam);
			PagingUtils.setPaging("admin", "fn_selectBoardMngList", resultCount, reqParam, modelAndView);

			modelAndView.addObject("dataList", sysMngrService.selectBoardMngList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("selectBoardMngList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 생성관리 목록 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 등록/수정 화면 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws BadCommandException 
	 * @throws NoSuchAlgorithmException 
	 * @throws ClassNotFoundException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping(value = "/board/board/boardMngInfo{type}.do")
	public ModelAndView boardMngInfo(@ReqParam Map<String, Object> reqParam, @PathVariable String type) throws FileNotFoundException, ClassNotFoundException, NoSuchAlgorithmException, BadCommandException, IOException {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/board/board/boardMngInfo.sysMngrContent");

		try {
			HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
			
			modelAndView.addObject("options", sysMngrService.selectBoardOptions(reqParam));
			
			if("Insert".equals(type)) {
				session.setAttribute("type", type.toLowerCase());
				modelAndView.addObject("type", type.toLowerCase());
			}else if("Update".equals(type)){
				modelAndView.addObject("data", sysMngrService.selectBoardMngInfo(reqParam));
				session.setAttribute("type", type.toLowerCase());
				modelAndView.addObject("type", type.toLowerCase());
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}
			
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("boardMngInfo method Error Occured : ");
		}

		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 등록/수정  - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/{type}BoardMngInfo.ajax")
	public ModelAndView modifyBoardMngInfo(@ReqParam Map<String, Object> reqParam, @PathVariable String type) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		if (!type.equals(session.getAttribute("type"))) {
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "데이터 변경이 일어났습니다. 다시 시도해주세요.");
			return modelAndView;
		}
		try {
			int result = 0;

			if("insert".equals(type)) {
				result = sysMngrService.insertBoardMngInfo(reqParam);
			} else if ("update".equals(type)) {
				result = sysMngrService.updateBoardMngInfo(reqParam);
			} else {
				return new ModelAndView("/error.do"); // 추후 에러페이지 이동
			}

			if(result != 0) {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판정보를  "+("insert".equals(type) ? "등록" : "변경")+"하였습니다.");
			} else {
				modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
				modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판정보를 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
			}
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("modifyBoardMngInfo method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판정보를 "+("insert".equals(type) ? "등록" : "변경")+" 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 게시판 관리> 게시판 생성관리 삭제 - 21.11.15 주한별
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/deleteBoardMngList.ajax")
	public ModelAndView deleteboardMngList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int deleteCount = sysMngrService.deleteBoardMngList(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판을 삭제했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | ClassNotFoundException | NullPointerException | NoSuchAlgorithmException | BadCommandException | IOException e) {
			logger.error("deleteboardMngList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "게시판 삭제중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 설문관리> 설문관리 목록 화면 - 21.11.17 주한별 (기존survList method는 상단 주석 처리함)
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/surv/surv/survMngList.do")
	public ModelAndView survList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/surv/surv/survMngList.sysMngrContent");

		return modelAndView;
	}
	
	@RequestMapping(value = "/surv/surv/survMngReg.do")
	public ModelAndView survMngReg(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/surv/surv/survMngReg.sysMngrContent");

		return modelAndView;
	}
	
	@RequestMapping(value = "/surv/surv/survMngStat.do")
	public ModelAndView survMngStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/surv/surv/survMngStat.sysMngrContent");
		
		try {
			modelAndView.addObject("qustnrSn", reqParam.get("qustnrSn"));
			// 유저권한 목록
			Map<String, Object> codeMap = new HashMap<String, Object>();
			codeMap.put("codeId", "USER_SE_CODE");
			modelAndView.addObject("userSeCodeList", comCodeService.selectComCodeList(codeMap));
		} catch (SQLException | DataAccessException e) {
			logger.error("survMngStat method Error Occured : ");
		}
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/surv/surv/survMngInfo.do")
	public ModelAndView survInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/sysMngr/surv/surv/survMngInfo.sysMngrContent");

		try {
			modelAndView.addObject("qustn", sysMngrService.selectQustn(reqParam));
			modelAndView.addObject("data", reqParam);
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("survMngInfo method Error Occured : ");
		}

		return modelAndView;
	}
	
	@RequestMapping(value = "/selectSurvMngInfo.ajax")
	public ModelAndView selectSurvMngInfo(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			List qestnList = sysMngrService.selectQustnQestnList(reqParam);
			List anwrList = sysMngrService.selectQustnAnswerList(reqParam);
			
			modelAndView.addObject("qestnList", qestnList);
			modelAndView.addObject("anwrList", anwrList);
			
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("survMngInfo method Error Occured : ");
		}

		return modelAndView;
	}
	
	

	/**
	 * 설문관리 조회
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/selectQustnList.ajax")
	public ModelAndView selectQustnList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			int resultCount = sysMngrService.selectQustnListCnt(reqParam);
			
			PagingUtils.setPaging("www", "fn_qustnList", resultCount, reqParam, modelAndView);
			
			modelAndView.addObject("dataList", sysMngrService.selectQustnList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("selectQustnList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문관리 조회 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 설문관리 등록
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/insertQustn.ajax")
	public ModelAndView insertQustn(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			sysMngrService.insertQustn(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 등록했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | IOException e) {
			logger.error("insertQustn method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 등록 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	/**
	 * 설문관리 수정
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/updateQustn.ajax")
	public ModelAndView updateQustn(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			sysMngrService.updateQustn(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 수정했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException | IOException e) {
			logger.error("updateQustn method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 수정 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	

	
	/**
	 * 설문관리 삭제
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/updateQustnDel.ajax")
	public ModelAndView updateQustnDel(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			sysMngrService.updateQustnDel(reqParam);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 삭제했습니다.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (SQLException | DataAccessException e) {
			logger.error("updateQustn method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "설문을 삭제 중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/selectSurvMngStat.ajax")
	public ModelAndView selectSurvMngStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			List qestnList = sysMngrService.selectQustnQestnList(reqParam);
			List anwrList = sysMngrService.selectQustnResultList(reqParam);
			
			modelAndView.addObject("qestnList", qestnList);
			modelAndView.addObject("anwrList", anwrList);
			
		} catch (SQLException | DataAccessException | NullPointerException e) {
			logger.error("survMngInfo method Error Occured : ");
		}

		return modelAndView;
	}
	

}
