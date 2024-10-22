<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script>
$(document).ready(function(){
	if($.cookie('govPopupCookie') != "Y"){
		$("#govPopup").show();
	}

	$(".btnGovPopupClose").on("click",function(){
		$("#govPopup").hide();
		if($("#labelDonotshow").is(":checked")){
	        if($.cookie('govPopupCookie') == undefined){
	            $.cookie('govPopupCookie', 'Y', { expires: 1, path: '/' });//쿠키생성
	        }
		}
	});
});

</script>

<!-- popup -->
<div id="govPopup" class="mPopup1 lFind1 hidden">
	<div class="cont">
		<h3>법적고지</h3>
		<div class="con">
			<p class="txt1">경기도는 법적 책임없고 전적으로<br> 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구<p>

			<div class="mButton1">
				<a href="javascript:void(0)" class="mBtn1 primary btnGovPopupClose">닫기</a>
			</div>
		</div>
		<div class="check">
			<div class="mCheckbox">
				<input type="checkbox" id="labelDonotshow" title="오늘하루 보지 않기">
				<label for="labelDonotshow">오늘하루 보지 않기</label>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1 btnGovPopupClose">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->
