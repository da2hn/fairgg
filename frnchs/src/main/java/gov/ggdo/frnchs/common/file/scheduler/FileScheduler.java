package gov.ggdo.frnchs.common.file.scheduler;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ibm.icu.util.Calendar;

import gov.ggdo.frnchs.common.file.domain.FileVO;
import gov.ggdo.frnchs.common.file.service.FileService;

@Component
public class FileScheduler {
	private static final Logger logger = LoggerFactory.getLogger(FileScheduler.class);
	@Autowired private FileService fileService;

	/**
	 * 임시저장, 삭제 상태인 파일 실제로 삭제
	 * 매일 새벽4시 실행
	 */
//	@Scheduled(cron="0 0 04 * * ?")
//	@Scheduled(cron="*/10 * * * * *")
	public void removeFileToServerScheduler() {
		logger.debug("======================== 파일삭제 시작 ========================");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		String[] arrAtchmnflSttusCode = {"FS01","FS03"};
		paramMap.put("arrAtchmnflSttusCode", arrAtchmnflSttusCode);
		List<FileVO> targetFileList = fileService.selectFile(paramMap);
		for(FileVO fileVO : targetFileList) {
			File file = new File(fileVO.getFileServerCours());
			if(file.exists()) {
				logger.debug("exists :: " + fileVO.getFileServerCours());
				if("FS03".equals(fileVO.getAtchmnflSttusCode())) {
					//todo : 삭제한것 히스토리 남겨야함
					//file.delete();
				}else {
					//임시저장인것은 2일전 것을 삭제
					SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					try {
						Calendar cal = Calendar.getInstance();
						//현재날짜 - 2
						Date currDt = new Date();
						cal.setTime(currDt);
						cal.add(Calendar.DATE, -2);
						currDt = cal.getTime();
						//등록날짜
						Date regDt = transFormat.parse(fileVO.getRegistDt());
						cal.setTime(regDt);
						regDt = cal.getTime();
						//날짜 비교
						if(currDt.after(regDt)) {
							//todo : 삭제한것 히스토리 남겨야함
							//file.delete();
						}
					} catch (ParseException e) {
						logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method ParseException Occured");
					}
				}
			}else {
				logger.debug("not exists :: " + fileVO.getFileServerCours());
			}
		}
		logger.debug("======================== 파일삭제 종료 ========================");
	}
}
