package gov.ggdo.frnchs.common.security;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@Data
@ToString
@EqualsAndHashCode(callSuper=false)
public class UserVO implements Serializable, UserDetails, GrantedAuthority{
	
	/** Serializable */
	private static final long serialVersionUID = 2702168227750103676L;
	
	private String userNo;
	private String userSeCode;
	private String deptNm;
	private String userNm;
	private String telno;
	private String password;
	private String emailAdres;
	private String useStplatAgreAt;
	private String marktRecptnAgreAt;
	private String registDt;
	private String updtDt;

	// DB추가 내역 - HJP 20.12.14
	private String confmSttusCode;
	private String crtfcKey;
	private String crtfcAt;
	private String lastUpdtUserNo;
	private String confmDt;
	
	// 조회항목 추가 - 20.12.22
	private String userSeNm;
	private String confmSttusNm;
	private String convertTelno;
	private String bizrno;
	private String atchmnflNo;
	
	// 권한제어
    private Collection<? extends GrantedAuthority> authorities;
	private boolean accountNonExpired = true;
	private boolean accountNonLocked = true;
	private boolean credentialsNonExpired = true;
	private boolean enabled = true;
	
	
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	public String getUserSeCode() {
		return userSeCode;
	}
	public void setUserSeCode(String userSeCode) {
		this.userSeCode = userSeCode;
	}
	public String getDeptNm() {
		return deptNm;
	}
	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}
	public String getUserNm() {
		return userNm;
	}
	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}
	public String getTelno() {
		return telno;
	}
	public void setTelno(String telno) {
		this.telno = telno;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmailAdres() {
		return emailAdres;
	}
	public void setEmailAdres(String emailAdres) {
		this.emailAdres = emailAdres;
	}
	public String getUseStplatAgreAt() {
		return useStplatAgreAt;
	}
	public void setUseStplatAgreAt(String useStplatAgreAt) {
		this.useStplatAgreAt = useStplatAgreAt;
	}
	public String getMarktRecptnAgreAt() {
		return marktRecptnAgreAt;
	}
	public void setMarktRecptnAgreAt(String marktRecptnAgreAt) {
		this.marktRecptnAgreAt = marktRecptnAgreAt;
	}
	public String getRegistDt() {
		return registDt;
	}
	public void setRegistDt(String registDt) {
		this.registDt = registDt;
	}
	public String getUpdtDt() {
		return updtDt;
	}
	public void setUpdtDt(String updtDt) {
		this.updtDt = updtDt;
	}
	public String getConfmSttusCode() {
		return confmSttusCode;
	}
	public void setConfmSttusCode(String confmSttusCode) {
		this.confmSttusCode = confmSttusCode;
	}
	public String getCrtfcKey() {
		return crtfcKey;
	}
	public void setCrtfcKey(String crtfcKey) {
		this.crtfcKey = crtfcKey;
	}
	public String getCrtfcAt() {
		return crtfcAt;
	}
	public void setCrtfcAt(String crtfcAt) {
		this.crtfcAt = crtfcAt;
	}
	public String getLastUpdtUserNo() {
		return lastUpdtUserNo;
	}
	public void setLastUpdtUserNo(String lastUpdtUserNo) {
		this.lastUpdtUserNo = lastUpdtUserNo;
	}
	public String getConfmDt() {
		return confmDt;
	}
	public void setConfmDt(String confmDt) {
		this.confmDt = confmDt;
	}
	public String getUserSeNm() {
		return userSeNm;
	}
	public void setUserSeNm(String userSeNm) {
		this.userSeNm = userSeNm;
	}
	public String getConfmSttusNm() {
		return confmSttusNm;
	}
	public void setConfmSttusNm(String confmSttusNm) {
		this.confmSttusNm = confmSttusNm;
	}
	public String getConvertTelno() {
		return convertTelno;
	}
	public void setConvertTelno(String convertTelno) {
		this.convertTelno = convertTelno;
	}
	public String getBizrno() {
		return bizrno;
	}
	public void setBizrno(String bizrno) {
		this.bizrno = bizrno;
	}
	public String getAtchmnflNo() {
		return atchmnflNo;
	}
	public void setAtchmnflNo(String atchmnflNo) {
		this.atchmnflNo = atchmnflNo;
	}
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}
	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}
	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}
	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}
	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return userNm;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.emailAdres;
	}
    
    
}
