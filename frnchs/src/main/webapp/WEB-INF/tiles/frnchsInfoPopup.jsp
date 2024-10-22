<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.TABLE{border-collapse:collapse; width:100%}
.TABLE thead{float:left; width:700px;}
.TABLE tbody{overflow-y:auto; overflow-x:hidden; float:left; width:700px; max-height:300px;}
.TABLE tbody tr{display:table; width:700px;}
.TABLE th{width:700px; boarder-top:0.5px solid #d2d4db;}
.TABLE td{width:698px}
</style>
<!-- 본사찾기 팝업 -->
<script>

//프랜차이즈 검색 팝업 보이기
function openFrchsPop(){
	$("#frnchsPopup").show();
	$("#frnchsPopup").removeClass('hidden');
	$("#searchFrchsNm").val("");
	frchsSearch(1);
}

function openFrchsPopMob(){
	$("#frnchsPopup").show();
	$("#searchFrchsNm").val("");
	frchsSearchMob();
}

//프랜차이즈 검색 팝업 내 검색
function frchsSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	var params = {};//업종이랑 프랜차이즈명 like로
	params.jobCode  = $('#brandMdClass:visible').val();
	params.frchsNm  = $("#searchFrchsNm").val();
	params.orderType = $("#orderType").val();
	params.pageIndex = $("input[name=pageIndex]").val();
	params.recordCountPerPage = $("#recordCountPerPageMob").val() == "" || null ? 10 : $("#recordCountPerPageMob").val();
 	//console.log("검색파람",params);
	fnGetAjaxData("/stat/selectFrchsList.ajax", params, function(_data) {

// 		console.log("franBrandStat data",_data);
		if(_data.resultCode == RESULT_SUCCESS){

			var tmpHtml = [];
			if(_data.dataList.length > 0){
				_data.dataList.forEach(function(row,idx){
					tmpHtml.push('<tr class="siba">');
					tmpHtml.push('	<td>');
					/* tmpHtml.push('		<span class="mCheckbox notext">'); */
					tmpHtml.push('		<span class="mRadio notext">');
					tmpHtml.push('		<input type="radio" name="frchsRadio" value="'+row.frnchsNo+'_'+row.mtltyNm+'_'+row.rprsntvNm+'_'+row.adres+'" id="radio_'+ idx +'" >');
					tmpHtml.push('		<label for="radio_'+idx+'">'+row.bsnSgnal+'</label>');
					tmpHtml.push('		</span>');
					tmpHtml.push('	</td>');
					tmpHtml.push('</tr>');
				});
			}else{
				tmpHtml.push('<tr><td>검색된내용이 없습니다.</td></tr>');
			}
			$("#frchsAjaxArea").html(tmpHtml.join(""));
			$(".mPag").html(_data.pagingHtml).trigger("create");
		} else {
			console.log("fail msg",_data.resultMsg);
		}
	});

}

//프랜차이즈 검색 팝업 내 검색 모바일
function frchsSearchMob(){
	var params = {};//업종이랑 프랜차이즈명 like로
	params.jobCode  = $('#brandMdClassMob:visible').val();
	params.frchsNm  = $("#searchFrchsNmMob").val();
 	//console.log("검색파람",params);
	fnGetAjaxData("/stat/selectFrchsList.ajax", params, function(_data) {

// 		console.log("franBrandStat data",_data);
		if(_data.resultCode == RESULT_SUCCESS){

			var tmpHtml = [];
			if(_data.dataList.length > 0){
				_data.dataList.forEach(function(row,idx){
					tmpHtml.push('<tr class="siba">');
					tmpHtml.push('	<td>');
					tmpHtml.push('		<span class="mCheckbox notext">');
					tmpHtml.push('		<input type="radio" name="frchsRadio" value="'+row.frnchsNo+'_'+row.mtltyNm+'_'+row.rprsntvNm+'_'+row.adres+'" id="radio_'+ idx +'" >');
					tmpHtml.push('		<label for="radio_'+idx+'">'+row.bsnSgnal+'</label>');
					tmpHtml.push('		</span>');
					tmpHtml.push('	</td>');
					tmpHtml.push('</tr>');
				});
			}else{
				tmpHtml.push('<tr><td>검색된내용이 없습니다.</td></tr>');
			}
			$("#frchsAjaxArea").html(tmpHtml.join(""));
			
		} else {
			console.log("fail msg",_data.resultMsg);
		}
	});

}

//jhb
function fn_close() {
	$("#frnchsPopup").hide();
}

$(document).ready(function(){

	$(".close").click(function(){
		$("#frnchsPopup").hide();
	});

	$("#btnFrnchsNmSearch").click(function(){
		frchsSearch(1);
	});
	
	$("#searchFrchsNm").keydown(function(key) {
		if (key.keyCode == 13 ) {
			frchsSearch(1);
		}
	});
	
	$("#orderType").change(function(){
		frchsSearch(1);
	});

	$("#btnBrandStat").click(function(){
		if(!$("input:radio[name='frchsRadio']:checked").val()){
			alert("선택 프랜차이즈가 없습니다.");
			return;
		}
		
		var returnChkVal = $("input:radio[name='frchsRadio']:checked").val();
		if($("#divComp").val() == "2"){
			fnBindFrnchsNm(returnChkVal);
			$("#frnchsPopup").hide();
			return;
		}
		var thisChkVal = returnChkVal.split("_")[0];
		
		$(".frcClass").empty();
		$(".frcClass").append('<option value="' + thisChkVal + '">' + $('input:radio[name="frchsRadio"]:checked').next('label').text() + '</option>');
		
		//psm
		$('#paramBrandFrc').val(thisChkVal);
		$('#paramfrnchsNo').val(thisChkVal);
		$('#paramBrandFrcNm').val($('input:radio[name="frchsRadio"]:checked').next('label').text());
	

		$("#frnchsPopup").hide();
		$(".viewBrandBtn").trigger('click');

		//jhb
/* 		try {
			drawCharts("notInit");
		} catch (e) {
			console.log(e);
		} */
		$(".p_frchsNm").text("");
		$(".p_frchsNm").text($("#brandFrcClass").text());
	});
});
</script>

<div id="frnchsPopup" class="mPopup1 lCompany hidden">
	<input type="hidden" name="pageIndex" value="" />
	<div class="cont">
		<h3>프랜차이즈 찾기</h3>
		<div class="con">
			<div class="mSort1 type2">
				<input type="text" class="it" title="프랜차이즈 명" id="searchFrchsNm" name="searchFrchsNm" placeholder="프랜차이즈 명">
				<a href="javascript:void(0)" id="btnFrnchsNmSearch" class="mBtn1">검색</a>
<!-- 			임시주석처리 2022-01-19 쿼리 등 기능 개발 이후 적용 -->
				<!-- [M 2022-01-18] 추가 -->
				<!-- 정렬 -->
				<div class="gRt">
					<select name="orderType" id="orderType" class="select">
						<option value="cnt">가맹점 많은순</option>
						<option value="bsnSgnal">이름순</option>
					</select>
				</div>
				<!-- //정렬 -->
			</div>
			<div class="mBoard1 noline">
				<!-- <table summary="구분, 상호명, 대표자명, 주소, 사업자등록번호로 구성된 표입니다." class="TABLE"> -->
				<table class="table">
					<caption>본사 찾기</caption>
					<thead>
					<tr>
						<th scope="col">프랜차이즈명</th>
					</tr>
					</thead>
					<tbody id="frchsAjaxArea" style="max-height:430px;">
						<tr><td>검색된내용이 없습니다.</td></tr>
					</tbody>
				</table>
			</div>
			<div class="mPag" style="margin-bottom: 90px;"></div>
			<div class="mButton1" style="position:absolute;bottom:0px;width: 100%;left: 0px;">
				<a href="javascript:void(0)" class="mBtn1 primary" id="btnBrandStat">확인</a>
				<a href="javascript:void(0)" onclick="fn_close();" class="mBtn1 gray jsBtnClose1">돌아가기</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>