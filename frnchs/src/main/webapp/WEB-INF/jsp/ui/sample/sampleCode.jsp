<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/sample/sampleCode.js"/>"></script> 
<select id="codeId" name="codeId">
	<option value="FNTN_SPORT_CN_SE_CODE">창업지원내용구분코드</option>
	<option value="STTEMNT_IEM_SE_CODE">신고항목구분코드</option>
	<option value="PROGRS_STTUS_SE_CODE">진행상태구분코드</option>
	<option value="NOTICE_SE_CODE">공지사항구분코드</option>
</select>
<input type="button" name="btn_test" id="btn_test" value="코드조회" /><br/>
<textarea id="result" cols="200" rows="30">
</textarea> 
