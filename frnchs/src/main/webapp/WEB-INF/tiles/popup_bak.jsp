<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
	$(document).ready(function() {
		<c:forEach var="data" items="${popupList}" varStatus="status">
			<%-- 쿠키에 따른 열기 설정 - 21.03.08 --%>
			var popupCookie = 'popupCookie${data.popupNo}';
			if (typeof $.cookie(popupCookie) !== 'undefined'){
				if($.cookie('popupCookie${data.popupNo}') != "Y"){
					var pWidth = parseInt('<c:out value="${data.popupWidthMg}" />');
					var pVrticl = parseInt('<c:out value="${data.popupVrticlMg}" />');
					var agent = navigator.userAgent.toLowerCase();
					var wo${status.count} = null;
					
					if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
						pVrticl = pVrticl + 133
					} else if (agent.indexOf("chrome") != -1) {
// 						pWidth = pWidth + 40
						pVrticl = pVrticl + 150
					} else {
						pVrticl = pVrticl + 133
					}
					wo${status.count} = window.open('<c:url value="/openPopup.do?no=${data.popupNo}&code=${data.menuCode}" />','<c:out value="${data.popupNo}" />', 'width='+pWidth+', height='+pVrticl+', toolbar=no, menubar=no, scrollbars=no, resizable=no');
					if(wo${status.count} != null){
						wo${status.count}.moveTo('<c:out value="${data.popupWidthLc}" />', '<c:out value="${data.popupVrticlLc}" />');
						
						wo${status.count}.resizeTo(pWidth,  pVrticl);
			/* 			console.log(">>>>"+pWidth+":"+pVrticl); */
						wo${status.count}.focus();
					}
				}
			}else{
				var pWidth = parseInt('<c:out value="${data.popupWidthMg}" />');
				var pVrticl = parseInt('<c:out value="${data.popupVrticlMg}" />');
				var agent = navigator.userAgent.toLowerCase();
				var wo${status.count} = null;
				
				if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					pVrticl = pVrticl + 133
				} else if (agent.indexOf("chrome") != -1) {
// 					pWidth = pWidth + 40
					pVrticl = pVrticl + 150
				} else {
					pVrticl = pVrticl + 133
				}
				wo${status.count} = window.open('<c:url value="/openPopup.do?no=${data.popupNo}&code=${data.menuCode}" />','<c:out value="${data.popupNo}" />', 'width='+pWidth+', height='+pVrticl+', toolbar=no, menubar=no, scrollbars=no, resizable=no');
				if(wo${status.count} != null){
					wo${status.count}.moveTo('<c:out value="${data.popupWidthLc}" />', '<c:out value="${data.popupVrticlLc}" />');
					
					wo${status.count}.resizeTo(pWidth,  pVrticl);
					wo${status.count}.focus();
				}
			}
		</c:forEach>
	});
</script>
