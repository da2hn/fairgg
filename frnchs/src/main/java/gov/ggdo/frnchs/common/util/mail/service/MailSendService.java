package gov.ggdo.frnchs.common.util.mail.service;

import java.io.UnsupportedEncodingException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import gov.ggdo.frnchs.common.log.Log;
import gov.ggdo.frnchs.common.util.mail.MailUtils;
import gov.ggdo.frnchs.ui.main.service.MainService;

@Service("mss")
public class MailSendService {
	@Log Logger logger;
	int size;

	@Value("${user.mailAddr}")
	private String mailAddr;
	@Value("${url.rootPath}")
	private String rootPath;

    @Autowired
    private JavaMailSenderImpl mailSender;
    
    @Autowired
    private MainService mainService; // sendMail ssl 추가 - 21.04.07

    //인증키 생성
    private String getKey(int size) {
        this.size = size;
        return getAuthCode();
    }

    //인증코드 난수 발생
    private String getAuthCode() {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < size) {
            num = random.nextInt(10);
            buffer.append(num);
        }

        return buffer.toString();
    }

    //인증메일 보내기
    public String sendAuthMail(String email, String brandStr) {
        //6자리 난수 인증번호 생성
        String crtfcKey = getKey(6);

        //인증메일 보내기
        try {
            MailUtils sendMail = new MailUtils(mailSender);
            logger.debug(">>>> ssl");
			mainService.setSSL();
            sendMail.setSubject("회원가입 이메일 인증");
            sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
            .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
            .append("<a href='"+rootPath+"/user/joinConfirm.do?emailAdres=")
            .append(email)
            .append("&crtfcKey=")
            .append(crtfcKey)
            .append("&type=")
            .append(brandStr)
            .append("' target='_blank'>이메일 인증 확인</a>")
            .toString());
            sendMail.setFrom(mailAddr, "관리자");
            sendMail.setTo(email);
            sendMail.send();
        } catch (MessagingException e) {
        	logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method MessagingException Occured");
        } catch (UnsupportedEncodingException e) {
        	logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UnsupportedEncodingException Occured");
        } catch (KeyManagementException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method KeyManagementException Occured");
		} catch (NoSuchAlgorithmException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NoSuchAlgorithmException Occured");
		}

          return crtfcKey;
    }

    //패스워드찾기 메일 보내기
    public String sendPwMail(String email, String newPw) {
    	//6자리 난수 인증번호 생성
    	String crtfcKey = getKey(6);

    	//인증메일 보내기
    	try {
    		MailUtils sendMail = new MailUtils(mailSender);
    		logger.debug(">>>> ssl");
			mainService.setSSL();
    		sendMail.setSubject("패스워드가 변경되었습니다.");
    		sendMail.setText(new StringBuffer().append("<h1>[변경된 패스워드로 로그인 해주세요]</h1>")
    				.append("<p>"+newPw+"</p>")
    				.toString());
    		sendMail.setFrom(mailAddr, "관리자");
    		sendMail.setTo(email);
    		sendMail.send();
    	} catch (MessagingException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method MessagingException Occured");
    	} catch (UnsupportedEncodingException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UnsupportedEncodingException Occured");
    	} catch (KeyManagementException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method KeyManagementException Occured");
		} catch (NoSuchAlgorithmException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NoSuchAlgorithmException Occured");
		}

    	return crtfcKey;
    }
    
  //불공정계약신고 답변 메일 보내기
    public void sendReportMail(Map<String, Object> paramMap) {
    	try {
    		MailUtils sendMail = new MailUtils(mailSender);
    		logger.debug(">>>> ssl");
			mainService.setSSL();
    		sendMail.setSubject("RE:"+paramMap.get("sj").toString());
    		sendMail.setText(new StringBuffer().append("<h1>[문의내용]</h1>")
    				.append("<h1>"+paramMap.get("cn").toString()+"</h1>")
    				.append("<h1>------------------------------------</h1>")
    				.append("<p>"+paramMap.get("answerCn").toString()+"</p>")
    				.toString());
    		sendMail.setFrom(mailAddr, "관리자");
    		sendMail.setTo(paramMap.get("wrterEmailAdres").toString());
    		sendMail.send();
    	} catch (MessagingException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method MessagingException Occured");
    	} catch (UnsupportedEncodingException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method UnsupportedEncodingException Occured");
    	} catch (KeyManagementException e) {
    		logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method KeyManagementException Occured");
		} catch (NoSuchAlgorithmException e) {
			logger.error(Thread.currentThread().getStackTrace()[1].getMethodName()+" method NoSuchAlgorithmException Occured");
		}
    }
}