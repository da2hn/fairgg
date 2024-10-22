<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-338YDK360F"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
	if(!${empty sessionScope.user}){
	} 
  	gtag('js', new Date());
  	gtag('config', 'G-338YDK360F', {'user_id': '${sessionScope.user.emailAdres}', 'anonymize_ip': true, custom_map : {'dimension1' : 'user_no' , 'dimension2' : 'user_se_code'}});
  	gtag('event', 'user_info', {'user_no': '${sessionScope.user.userNo}', 'user_se_code': '${sessionScope.user.userSeCode}'});
	$(document).ready(function() {
		
	})
</script>
