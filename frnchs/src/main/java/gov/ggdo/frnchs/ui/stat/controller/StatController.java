package gov.ggdo.frnchs.ui.stat.controller;

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
import gov.ggdo.frnchs.common.comcode.service.ComCodeService;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.stat.service.StatService;

@Controller
public class StatController {

	@Log Logger logger;

	@Autowired StatService statService;
	@Autowired ComCodeService comCodeService;

	/**
	 * 프랜차이즈 통계
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/franStatList.do")
	public ModelAndView franStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/stat/fran/franLocalStatList.content");

		modelAndView.addObject("localYear", reqParam.get("localYear"));
		modelAndView.addObject("localLd", reqParam.get("localLd"));
		modelAndView.addObject("localMd", reqParam.get("localMd"));

		return modelAndView;
	}

	/**
	 * 프랜차이즈 통계
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/franBrandStatList.do")
	public ModelAndView franBrandStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/stat/fran/franBrandStatList.content");

		modelAndView.addObject("brandYear", reqParam.get("brandYear"));
		modelAndView.addObject("brandLd", reqParam.get("brandLd"));
		modelAndView.addObject("brandMd", reqParam.get("brandMd"));
		modelAndView.addObject("brandFrc", reqParam.get("brandFrc"));
		modelAndView.addObject("brandFrcNm", reqParam.get("brandFrcNm"));

		return modelAndView;
	}

	/**
	 * 상권 심화 분석
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/deepStatList.do")
	public ModelAndView infoSave(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/stat/deep/deepStatList.content");

		return modelAndView;
	}

	/**
	 * 프랜차이즈 통계 ajax
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/franStat.ajax")
	public ModelAndView selectInfoList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		logger.debug("franStat param : " + reqParam);

		try {

			if( reqParam.containsKey("ctprvnCode") ) {//지역별 상세
				modelAndView.addObject("dataList", statService.selectFranStatTrend(reqParam));
			}else {//걍 전체
				modelAndView.addObject("dataList", statService.selectFranStat(reqParam));
			}

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


	/**
	 * 프랜차이즈 브랜드별 통계 ajax
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/franBrandStat.ajax")
	public ModelAndView selectFranBrandStat(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		logger.debug("selectFranBrandStat param : " + reqParam);

		try {
			List<EgovMap> dataList = statService.selectFranBrandStat(reqParam);
			if(dataList.size() < 1) {
				modelAndView.addObject("dataYear", statService.selectFranRecentYear(reqParam).get("dataYear"));
			}
			modelAndView.addObject("dataList", dataList);

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 프랜차이즈 통계 ajax
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/selectDataYear.ajax")
	public ModelAndView selectDataYear(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		logger.debug("selectDataYear param : " + reqParam);

		try {
			modelAndView.addObject("dataList", statService.selectDataYear(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 프랜차이즈 통계 ajax
	 * @param reqParam
	 * @return
	 * @throws IOException 
	 * @throws BadCommandException 
	 * @throws NoSuchAlgorithmException 
	 * @throws ClassNotFoundException 
	 */
	@RequestMapping(value = "/stat/selectFrchsList.ajax")
	public ModelAndView selectFrchsList(@ReqParam Map<String, Object> reqParam) throws ClassNotFoundException, NoSuchAlgorithmException, BadCommandException, IOException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		logger.debug("selectFrchsList param : " + reqParam);
		try {
			int resultCount = statService.selectFrchsListCount(reqParam);
			PagingUtils.setPaging("www", "frchsSearch", resultCount, reqParam, modelAndView);
			modelAndView.addObject("dataList", statService.selectFrchsList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectInfoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "창업지원 게시판 목록 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}

	/**
	 * 메인화면 프랜차이즈 분포 통계 ajax
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/selectFranFullStatList.ajax")
	public ModelAndView selectFranFullStatList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

//			modelAndView.addObject("franFullStatList", statService.selectFranFullStatList(reqParam));
			modelAndView.addObject("dataList", statService.selectFranFullStatList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectFranFullStatList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메인화면 프랜차이즈 분포 통계 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	/**
	 * 메인화면 프랜차이즈 업종 순위 ajax
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/stat/selectFranIndutyLankList.ajax")
	public ModelAndView selectFranIndutyLankList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());

		try {

			modelAndView.addObject("franIndutyLankList", statService.selectFranIndutyLankList(reqParam));

			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (DataAccessException | SQLException | NullPointerException e) {
			logger.error("selectFranIndutyLankList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "메인화면 프랜차이즈 업종순위 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}


}
