package gov.ggdo.frnchs.common.util.encpt;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cryptography.EgovPasswordEncoder;
import egovframework.rte.fdl.cryptography.impl.EgovARIACryptoServiceImpl;
import gov.ggdo.frnchs.common.log.Log;


/**
 * @Class Name : EncptUtil.java
 * @Description : 암호화/복호화 유틸
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 9.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 9.
 * @version 1.0
 * @see
 *
 *  
 */
@Service
public class EncryptService {

	@Log Logger logger;

	@Autowired EgovPasswordEncoder egovPasswordEncoder;

    @Autowired EgovARIACryptoServiceImpl egovCryptoService;

    @Autowired StandardPasswordEncoder stdPasswordEncoder;

    private final String ENCRYPT_PASSWD = "embrace$74#";

	/**
	* @Method Name : getEgovPasswdEncrypt
	* @Description : 전저정부 프레임워크에서 제공하는 비밀번호 암호화 (단방향)
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : String
	* @exception :
	*/
	public String getEgovPasswdEncrypt(String plainPassword) {
		return egovPasswordEncoder.encryptPassword(plainPassword);
	}

	/**
	* @Method Name : getPasswdEncrypt
	* @Description : 스프링프레임워크에서 제공하는 비밀번호 암호화(SALT 적용)
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : String
	* @exception :
	*/
	public String getPasswdEncrypt(String plainPassword) {
		return stdPasswordEncoder.encode(plainPassword);
	}

	/**
	* @Method Name : matches
	* @Description : 평문비밀번호와 암호화된 비밀번호 일치여부 비교
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : boolean
	* @exception :
	*/
	public boolean matches(String rawString, String encString) {
		return stdPasswordEncoder.matches(rawString, encString);
	}

	public boolean egovPasswdMatches(String plainPassword, String encryptedPassword) {
		return egovPasswordEncoder.checkPassword(plainPassword, encryptedPassword);
	}

	/**
	* @Method Name : decryptedStr
	* @Description : 암호화 데이터 복호화
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : String
	* @exception :
	*/
	public String decryptedStr(String encStr) throws UnsupportedEncodingException {
		String plainStr = null;
		if (encStr != null && !"".equals(encStr)) {
			// 에러사항 확인 추후 작업
			System.out.println(">>> encStr:"+encStr);
			System.out.println(">>> encStrUtf-8:"+new String(encStr.getBytes("UTF-8"),"UTF-8"));
			System.out.println(">>> Base64.decodeBase64(encStr.getBytes(\"UTF-8\"):"+Base64.decodeBase64(encStr.getBytes("UTF-8")));
			byte[] decrypted = egovCryptoService.decrypt(Base64.decodeBase64(encStr.replace(" ", "+").getBytes("UTF-8")), ENCRYPT_PASSWD);
			System.out.println(">>> decrypted:"+decrypted);
			plainStr = new String(decrypted,"UTF-8");
			System.out.println(">>> plainStr:"+plainStr);
		}
		return plainStr;
	}

	/**
	* @Method Name : encryptedStr
	* @Description : 평문을 암호화
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : String
	* @exception :
	*/
	public String encryptedStr(String plainStr) throws UnsupportedEncodingException {
		String cryptStr = "";
		if (plainStr != null && !"".equals(plainStr)) {
			byte[] encrypted = egovCryptoService.encrypt(plainStr.getBytes("UTF-8"), ENCRYPT_PASSWD);
			cryptStr = new String(Base64.encodeBase64(encrypted));
		}
		return cryptStr;
	}

	/**
	* @Method Name : encryptList
	* @Description : 설정된 컬럼만 암호화 하여 목록을 반환한다.
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : void
	* @exception :
	*/
	public void encryptList(List<Map<String, Object>> resultList,
			List<String> columnList) throws UnsupportedEncodingException {
		if (columnList == null || columnList.isEmpty() ) {
			return;
		}
		if (resultList != null && !resultList.isEmpty()) {
			for (int i = 0; i < resultList.size(); i++) {
				for (String columnNm : columnList) {
					Map<String, Object> resultMap = resultList.get(i);
					String decryptStr = String.valueOf(resultMap.get(columnNm));
					String encryptStr = encryptedStr(decryptStr);
					resultMap.put(columnNm, encryptStr);
					resultList.set(i, resultMap);
				}
			}
		}

	}

	/**
	* @Method Name : decryptList
	* @Description : 설정된 컬럼을 복호화 하여 목록을 반환한다.
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : void
	* @exception :
	*/
	public void decryptList(List<Map<String, Object>> resultList, List<String> columnList) throws UnsupportedEncodingException {
		if (columnList == null || columnList.isEmpty() ) {
			return;
		}
		if (resultList != null && !resultList.isEmpty()) {
			for (int i = 0; i < resultList.size(); i++) {
				for (String columnNm : columnList) {
					Map<String, Object> resultMap = resultList.get(i);
					String encryptStr = String.valueOf(resultMap.get(columnNm));
					String decryptStr = decryptedStr(encryptStr);
					resultMap.put(columnNm, decryptStr);
					resultList.set(i, resultMap);
				}
			}
		}
	}



	/**
	* @Method Name : encryptFile
	* @Description : 파일을 암호화 한다.
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : void
	* @exception :
	*/
	public void encryptFile(File srcFile, File trgtFile)
			throws FileNotFoundException, IOException {
		egovCryptoService.encrypt(srcFile, ENCRYPT_PASSWD, trgtFile);

	}

	/**
	* @Method Name : decryptFile
	* @Description : 암호화된 파일을 복호화한다.
	* @Author : scshin
	* @since : 2019. 8. 9.
	* @param :
	* @return : void
	* @exception :
	*/
	public void decryptFile(File encryptedFile, File trgtFile)
			throws FileNotFoundException, IOException {
		egovCryptoService.decrypt(encryptedFile, ENCRYPT_PASSWD, trgtFile);

	}
}
