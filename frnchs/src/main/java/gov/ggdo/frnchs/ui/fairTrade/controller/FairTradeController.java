package gov.ggdo.frnchs.ui.fairTrade.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.Map;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.mail.iap.BadCommandException;

import gov.ggdo.frnchs.common.Constants;
import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.param.ReqParam;
import gov.ggdo.frnchs.common.util.paging.PagingUtils;
import gov.ggdo.frnchs.ui.board.service.BoardService;

@Controller
public class FairTradeController {

	@Log Logger logger;
	
	@Autowired private BoardService boardService;
	

	/**
	 * 공정거래 > 공정거래홍보관 - 21.03.03
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fairTrade/fairTradePr/fairTradePrList.do")
	public ModelAndView fairTradePrList(@ReqParam Map<String, Object> reqParam) {
		ModelAndView modelAndView = new ModelAndView("ui/fairTrade/fairTradePr/fairTradePrList.content");

		try {
			//각 영상 타입별로 별도 리스트 담기
			reqParam.put("fairTradeSeCode", "FT01");//교육영상
			modelAndView.addObject("education", boardService.selectFairTradePrList(reqParam));
			reqParam.put("fairTradeSeCode", "FT02");//홍보영상
			modelAndView.addObject("promotion", boardService.selectFairTradePrList(reqParam));
			reqParam.put("fairTradeSeCode", "FT03");//일반영상
			modelAndView.addObject("normal", boardService.selectFairTradePrList(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("promoList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래홍보관 조회 중 에러가 발생하였습니다.");
		}

		return modelAndView;
	}
	
	/**
	 * 공정거래 > 공정거래홍보관 정보 조회 ajax - 21.12.28
	 * @param reqParam
	 * @return
	 */
	@RequestMapping(value = "/fairTrade/fairTradePr/selectFairTradePrList.ajax")
	public ModelAndView selectFairTradePrList(@ReqParam Map<String, Object> reqParam) throws DataAccessException, SQLException, FileNotFoundException, IOException, ClassNotFoundException, NullPointerException, NoSuchAlgorithmException, BadCommandException {
		ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
		try {
			//공지사항
			int resultCount = boardService.selectFairTradePrListCountAjax(reqParam);
			PagingUtils.setPaging("www", "fn_selectFairTradePrListMob", resultCount, reqParam, modelAndView);
			modelAndView.addObject("resultCount", resultCount);
			modelAndView.addObject("dataList", boardService.selectFairTradePrListAjax(reqParam));
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_SUCCESS);
		} catch (Exception e) {
			logger.error("selectNoticeList method Error Occured : ");
			modelAndView.addObject(Constants.RESULT_CODE, Constants.RESULT_FAIL);
			modelAndView.addObject(Constants.RESULT_MESSAGE, "공정거래홍보관 조회  중 에러가 발생하였습니다.");
		}
		return modelAndView;
	}
	
}
