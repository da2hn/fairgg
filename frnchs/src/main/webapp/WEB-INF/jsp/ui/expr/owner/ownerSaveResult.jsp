<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function() {
	$(".btnPopupClose").click(function(){
		$("#popupDiv").html("");
	});
});
</script>
<!-- popup -->
<div id="jsPopup1" class="mPopup1 lFind1">
	<div class="cont">
		<h3>${headerTxt} </h3>
		<div class="con">
			<p class="txt1">${resultTxt }<p>

			<div class="mButton1">
				<a href="javascript:void(0)" class="mBtn1 primary btnPopupClose">닫기</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1 btnPopupClose">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->