package gov.ggdo.frnchs.common.file.domain;

import java.math.BigDecimal;

import lombok.Data;

/**
 * @Class Name : FileVO.java
 * @Description : 파일 객체
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019. 8. 21.  scshin         최초생성
 *
 * @author scshin
 * @since 2019. 8. 21.
 * @version 1.0
 * @see
 *
 */
@Data
public class FileVO {

	public BigDecimal getFileSn() {
		return fileSn;
	}
	public void setFileSn(BigDecimal fileSn) {
		this.fileSn = fileSn;
	}
	public String getInputFileNm() {
		return inputFileNm;
	}
	public void setInputFileNm(String inputFileNm) {
		this.inputFileNm = inputFileNm;
	}
	public String getFileServerCours() {
		return fileServerCours;
	}
	public void setFileServerCours(String fileServerCours) {
		this.fileServerCours = fileServerCours;
	}
	public String getAtchmnflSttusCode() {
		return atchmnflSttusCode;
	}
	public void setAtchmnflSttusCode(String atchmnflSttusCode) {
		this.atchmnflSttusCode = atchmnflSttusCode;
	}
	public String getHashcd() {
		return hashcd;
	}
	public void setHashcd(String hashcd) {
		this.hashcd = hashcd;
	}
	public String getRegistDt() {
		return registDt;
	}
	public void setRegistDt(String registDt) {
		this.registDt = registDt;
	}
	public String getFileKey() {
		return fileKey;
	}
	public void setFileKey(String fileKey) {
		this.fileKey = fileKey;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public void setAtchmnflNo(String atchmnflNo) {
		this.atchmnflNo = atchmnflNo;
	}
	private String atchmnflNo;
	private BigDecimal fileSn;
	private String inputFileNm;
	private String fileServerCours;
	private String atchmnflSttusCode;
	private String hashcd;
	private String registDt;
	private String fileKey;
	private String fileSize;
	public String getAtchmnflNo() {
		// TODO Auto-generated method stub
		return null;
	}
}
