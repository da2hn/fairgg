<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script>
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	$(document).ready(function(){

		
		if(!isMobile) {
			$("#densityBrandPopup").show();
		} 
	}); 
</script>
<!-- densityBrandPopup -->
<div id="densityBrandPopup" class="mPopup1 lFind1" style="display: none;">
	<div class="cont">
		<h3>${empty headerTxt ? '&nbsp;' : headerTxt }</h3>
		<div class="con">
			<p class="txt1">분석 조건과 분석설정을 통해 조회가 가능합니다.<p>

			<div class="mButton1 forPc" style="padding:0px; margin-top:20px">
				<a href="javascript:void(0)" class="mBtn1 gray">닫기</a>
			</div>
			<div class="mButton1 forMo" style="position: absolute;bottom: 0;left: 0;width: 100%;">
				<a href="javascript:void(0)" class="mBtn1 gray" style="width:100%;">닫기</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //densityBrandPopup -->
<script>
	$(".jsBtnClose1, .mBtn1").on("click",function(){
		$("#densityBrandPopup").css("display", "none");
	});
</script>