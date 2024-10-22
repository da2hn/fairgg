<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<style>
	dd{display:none;}
	:selected{display:block;}
	dd a{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
</style>

<!-- 
dt와 dd에 class는 admin/management/popup/popList.do에서 popup에 해당하는 걸로 id부여
dd안에 a태그는 1개 이상일수 있고 해당 페이지로 이동해야하기 때문에 해당 ~~.do에 해당하는 ~~를 id로 넣어준다 
-->

<div class="mLnb" id="menuDiv"></div>

<script>
	$(function(){
		//대메뉴 클릭
		$("dt > a").off("click").on("click",function(e){
			e.preventDefault();
			
			$("dt").removeClass("selected");
			$("dd").removeClass("selected");
			
			
			if( $(this).parent().hasClass("selected") ){
				$("." + $(this).parent().attr('class').split(' ')[0]).removeClass("selected");
			}else{
				$("." + $(this).parent().attr('class').split(' ')[0]).addClass("selected");
			}
			$("dd > a").not($("#"+$(this).parent().attr('class').split(' ')[0]+"01")).removeClass("selected");
		});
		//서브메뉴 클릭
		$("dd > a").on("click",function(e){
			$("dd > a").removeClass("selected");
			$(this).addClass("selected");
		});
		
		//dtpicker 기본값 주기
		$.datepicker.setDefaults({
			monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
			dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토"],
			dateFormat: 'yy-mm-dd'
		});
		
		$("#startDt").off("change").on("change",function(e){
			if( $("#endDt").val() && $(this).val() > $("#endDt").val() ){
				//alert("시작일은 종료일 이전이어야합니다.");
				$(this).val("");
			}
		});
		
		$("#endDt").off("change").on("change",function(e){
			if( $("#startDt").val() && $(this).val() < $("#startDt").val() ){
				//alert("종료일은 시작일 이후여야합니다.");
				$(this).val("");
			}
		});
		
		
	});


</script>
