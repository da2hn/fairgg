package gov.ggdo.frnchs.ui.expr.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.mail.iap.BadCommandException;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.aop.LoginCheck;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.encpt.EncryptService;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.expr.service.ExprService;
import gov.ggdo.frnchs.ui.fran.service.FranService;

@Controller
public class ExprController {

	@Log Logger logger;

	@Autowired ExprService exprService;
	@Autowired FranService franService;
	@Autowired private EncryptService encryptService;

	/**
	 * 프랜차이즈 체험 서비스 목록 조회 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/expr/owner/ownerList.do")
	public ModelAndView ownerList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/expr/owner/ownerList.content");

		return modelAndView;
	}

	/**
	 * 프랜차이즈 체험 서비스 입력 화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/expr/owner/ownerRegSave.do")
	@LoginCheck(resultType="popup")
	public ModelAndView ownerRegSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/ui/expr/owner/ownerRegSave");

		modelAndView.addObject("headerTxt", "가맹본사 참여하기");

		return modelAndView;
	}

	/**
	 * 프랜차이즈 체험 서비스 목록 조회
	 * @param reqParam
	 * @return
	 * @throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/expr/owner/selectFrnchsExprnRegistList.ajax")
	public ModelAndView selectFrnchsExprnRegistList(@ReqParam Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			//승인된 내용만 불러와야함
			paramMap.put("confmSttusCode", "CS01");

			int resultCount = exprService.selectFrnchsExprnRegistListCount(paramMap);

			PagingUtils.setPaging("www", "fn_selectInfoList", resultCount, 5, 4, paramMap, modelAndView);

			modelAndView.addObject("resultCount", resultCount);

			List<EgovMap> frnchsExprnRegistList = exprService.selectFrnchsExprnRegistList(paramMap);
			for(EgovMap tmpMap : frnchsExprnRegistList) {
				if(tmpMap.get("imageFileKey") != null) {
					String fileKey = tmpMap.get("imageFileKey").toString();
					String[] tmpArr = tmpMap.get("imageFileKey").toString().split("_");
					String atchmnflNo = tmpArr[0];
					String fileSn = tmpArr[1];
					String encFileKey = encryptService.encryptedStr(fileKey);
					tmpMap.put("fileKey", encFileKey);
					tmpMap.put("atchmnflNo", atchmnflNo);
					tmpMap.put("fileSn", fileSn);
				}
			}

			modelAndView.addObject("frnchsExprnRegistList", frnchsExprnRegistList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectFrnchsExprnRegistList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 체험 서비스 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 프랜차이즈 체험 서비스 목록 저장
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/expr/owner/ownerRegSaveResult.do")
	public ModelAndView ownerRegSaveResult(@ReqParam Map<String, Object> paramMap) {
		ModelAndView modelAndView = new ModelAndView("/ui/expr/owner/ownerSaveResult");
		try {
			exprService.insertFrnchsExprnRegist(paramMap);
			modelAndView.addObject("headerTxt", "프랜차이즈 체험 참여하기");
			modelAndView.addObject("resultTxt", "정상적으로 처리하였습니다.<br>승인여부를 마이페이지에서 확인하세요.");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("insertFrnchsExprnRegist method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 체험 서비스 목록 저장 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	/**
	 * 프랜차이즈 체험 서비스 상세정보 화면
	 * @param reqParam
	 * @return
	 * @throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException
	 *
	 */
	@RequestMapping(value = "/expr/owner/ownerView.do")
	public ModelAndView ownerView(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException{
		ModelAndView modelAndView = new ModelAndView("ui/expr/owner/ownerView.content");
		try {
			reqParam.put("frnchsNo", reqParam.get("reqFrnchsNo"));
			reqParam.put("exprnRegistNo", reqParam.get("reqExprnRegistNo"));

			EgovMap frnchsAdiInfo = franService.selectFrnchsAdiInfo(reqParam);

			if(frnchsAdiInfo != null && frnchsAdiInfo.get("frnchsImageFileKey") != null) {
				String fileKey = frnchsAdiInfo.get("frnchsImageFileKey").toString();
				String[] tmpArr = frnchsAdiInfo.get("frnchsImageFileKey").toString().split("_");
				String atchmnflNo = tmpArr[0];
				String fileSn = tmpArr[1];
				String encFileKey = encryptService.encryptedStr(fileKey);
				frnchsAdiInfo.put("fileKey", encFileKey);
				frnchsAdiInfo.put("atchmnflNo", atchmnflNo);
				frnchsAdiInfo.put("fileSn", fileSn);
			}

			modelAndView.addObject("frnchsAdiInfo", frnchsAdiInfo);
			modelAndView.addObject("exprnRegistNo", reqParam.get("exprnRegistNo"));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("insertFrnchsExprnRegist method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 체험 서비스 목록 저장 중 에러가 발생하였습니다.");
		}


		return modelAndView;
	}

	/**
	 * 프랜차이즈 체험 신청 결과화면
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/expr/owner/ownerReqSaveResult.do")
	@LoginCheck(resultType="popup")
	public ModelAndView ownerReqSaveResult(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("/ui/expr/owner/ownerSaveResult");

		String returnTxt = "";
		String resultTxt = "";
		try {
			if("US01".equals(reqParam.get("ssUserSeCode"))){
				int reqChkCnt = exprService.selectFrnchsExprnReqstCheckCount(reqParam);
				if(reqChkCnt > 0) {
					resultTxt = "신청이 되어있습니다.";
				}else {
					exprService.insertFrnchsExprnReqst(reqParam);
					resultTxt = "정상적으로 처리하였습니다.<br>마이페이지에서 확인하세요.";
				}
			}
			modelAndView.addObject("headerTxt", "프랜차이즈 체험 참여하기");
			modelAndView.addObject("resultTxt", resultTxt);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
			modelAndView.addObject(Constants.RESULT_MESSAGE, returnTxt);
		} catch (DataAccessException | SQLException e) {
			logger.error("ownerReqSaveResult method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "프랜차이즈 체험 신청 결과화면 출력 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 메인페이지 프랜차이즈 체험 서비스 목록 조회
	 * @param reqParam
	 * @return
	 * @throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException
	 */
	@RequestMapping(value = "/expr/owner/selectMainFrnchsExprnRegistList.ajax")
	public ModelAndView selectMainFrnchsExprnRegistList(@ReqParam Map<String, Object> paramMap) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {
			List<EgovMap> frnchsExprnRegistList = exprService.selectMainFrnchsExprnRegistList(paramMap);
			for(EgovMap tmpMap : frnchsExprnRegistList) {
				if(tmpMap.get("imageFileKey") != null) {
					String fileKey = tmpMap.get("imageFileKey").toString();
					String[] tmpArr = tmpMap.get("imageFileKey").toString().split("_");
					String atchmnflNo = tmpArr[0];
					String fileSn = tmpArr[1];
					String encFileKey = encryptService.encryptedStr(fileKey);
					tmpMap.put("fileKey", encFileKey);
					tmpMap.put("atchmnflNo", atchmnflNo);
					tmpMap.put("fileSn", fileSn);
				}
			}

			modelAndView.addObject("frnchsExprnRegistList", frnchsExprnRegistList);
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException e) {
			logger.error("selectMainFrnchsExprnRegistList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메인페이지 프랜차이즈 체험 서비스 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

}
