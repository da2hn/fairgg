<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLineChar", "\n"); %> <%-- 개행처리 - 21.06.29 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"		uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
	function fn_closePopup() {
		if($("#labelDonotshowtoday").is(":checked")){
	        if($.cookie('popupCookie${data.popupNo}') == undefined){
	            $.cookie('popupCookie${data.popupNo}', 'Y', { expires: 1, path: '/' });//쿠키생성
	        }
		}
		self.close();
	}
</script>
 
<!-- contents -->
	<%-- 
		일단 고정사이즈로 - 21.02.22
		이전버전 주석 후 신규 버전 - 21.03.08 
	<div style="width:300px; height:200px;">
		<c:if test="${empty data.cn && !empty data.atchmnflNo}" >
			<c:set var="req" value="${pageContext.request}" />
			<img id="imgArea" width="300px" height="200px" src="<c:url value="${fn:replace(req.requestURL, req.requestURI, '')}/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />" alt="<c:out value="${data.inputFileNm }" />" >
		</c:if>
		<c:if test="${!empty data.cn && empty data.atchmnflNo}" >
			<c:out value="${data.cn }" />
		</c:if>
	</div>
	--%>
	<div class="mPopup2">  
		<div class="cont" style="width:${data.popupWidthMg}px; height:${data.popupVrticlMg}px;">
			<c:choose>
				<c:when test="${!empty data.atchmnflNo and !empty data.cn and empty data.imgLink}">
					<img src="<c:url value="${fn:replace(req.requestURL, req.requestURI, '')}/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />" alt="<c:out value="${data.inputFileNm }" />" alt="<c:out value="${data.sj }" />">
					<strong class="ti"><c:out value="${data.sj }" /></strong><br>
<%-- 					<c:out value="${data.cn }" /> --%>
					${fn:replace(data.cn, newLineChar, '<br/>')}
				</c:when>
				<c:when test="${!empty data.atchmnflNo and !empty data.cn and !empty data.imgLink}">
					<a href="${data.imgLink}" target='_blank'>
						<img src="<c:url value="${fn:replace(req.requestURL, req.requestURI, '')}/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />" alt="<c:out value="${data.inputFileNm }" />" alt="<c:out value="${data.sj }" />">
					</a>
					<strong class="ti"><c:out value="${data.sj }" /></strong><br>
<%-- 					<c:out value="${data.cn }" /> --%>
					${fn:replace(data.cn, newLineChar, '<br/>')}
				</c:when>
				<c:when test="${!empty data.atchmnflNo and empty data.cn and empty data.imgLink}">
					<img src="<c:url value="${fn:replace(req.requestURL, req.requestURI, '')}/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />" alt="<c:out value="${data.inputFileNm }" />" alt="<c:out value="${data.sj }" />">
				</c:when>
				<c:when test="${!empty data.atchmnflNo and empty data.cn and !empty data.imgLink}">
					<a href="${data.imgLink}" target='_blank'>
						<img src="<c:url value="${fn:replace(req.requestURL, req.requestURI, '')}/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />" alt="<c:out value="${data.inputFileNm }" />" alt="<c:out value="${data.sj }" />">
					</a>
				</c:when>
				<c:when test="${empty data.atchmnflNo and !empty data.cn }">
					<strong class="ti"><c:out value="${data.sj }" /></strong><br>
<%-- 					<c:out value="${data.cn }" /> --%>
					${fn:replace(data.cn, newLineChar, '<br/>')}
				</c:when>
				<c:otherwise>
					<script type="text/javascript">
						<%-- 에러시 오늘 안나오게 추가 - 21.03.18 --%>
						if($("#labelDonotshowtoday").is(":checked")){
					        if($.cookie('popupCookie${data.popupNo}') == undefined){
					            $.cookie('popupCookie${data.popupNo}', 'Y', { expires: 1, path: '/' });//쿠키생성
					        }
						}
						self.close();
					</script>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="dns">
			<div class="mCheckbox">
				<input type="checkbox" id="labelDonotshowtoday" title="오늘하루 보지 않기">
				<label for="labelDonotshowtoday">오늘하루 보지 않기</label>
			</div>
			<div class="gRt">
<!-- 				<a href="javascript:void(0);" onclick="fn_closePopup();" class="mBtn1 primary">확인</a> -->
				<a href="javascript:void(0);" onclick="fn_closePopup();" class="mBtn1 gray">닫기</a>
			</div>
		</div>
	</div>
<!-- //contents -->