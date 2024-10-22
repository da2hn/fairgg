<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 본사찾기 팝업 -->
<script>
function hedofcList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	var params = {};
	if($("#searchMtltyNm").val() == "" && $("#searchRprsntvNm").val() == ""){
		alert("상호명 혹은 대표자명을 입력해주세요.");
		return;
	} // 220113 상호명 검색 유효성 추가
	params["mtltyNm"]  = $("#searchMtltyNm").val();
	params["rprsntvNm"]  = $("#searchRprsntvNm").val();
	params["pageIndex"] = $("input[name=pageIndex]").val();

	fnGetAjaxData("/fran/selectFrnchsHedofc.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			 var dataList = _data.frnchsHedofcList;
			if(!!dataList && dataList.length != 0) {
				var html = [];
				for(var i = 0 ; i < _data.frnchsHedofcList.length ; i++){
					var mtltyNm = _data.frnchsHedofcList[i].mtltyNm;
					var hedofcNo = _data.frnchsHedofcList[i].hedofcNo;
					var bizrno = _data.frnchsHedofcList[i].bizrno;
					var rprsntvNm = _data.frnchsHedofcList[i].rprsntvNm;
					var adres = _data.frnchsHedofcList[i].adres;
					var atchmnflNo = _data.frnchsHedofcList[i].atchmnflNo;
					if(!atchmnflNo){
						atchmnflNo = "";
					}
					html.push('<tr>                                                                                         ');
					html.push('<td>                                                                                         ');
					html.push('	<span class="mCheckbox notext">                                                             ');
					html.push('		<input type="checkbox" id="chk_'+i+'" name="chk" value="'+mtltyNm+'_'+hedofcNo+'_'+bizrno+'_'+atchmnflNo+'_'+adres+'_'+rprsntvNm+'" title="선택">             ');
					html.push('		<label for="chk_'+i+'">선택</label>                                              ');
					html.push('	</span>                                                                                     ');
					html.push('</td>                                                                                        ');
					html.push('<td>'+mtltyNm+'</td>                                                                                    ');
					html.push('<td>'+rprsntvNm+'</td>                                                                                    ');
					html.push('<td>'+adres+'</td>                                                                                    ');
					html.push('</tr>																						');

				}
				$("#searchList").html(html.join(""));
			 }else{
				$("#searchList").html('<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(_data.pagingHtml).trigger("create");
		} else {
			alert(_data.resultMsg);
		}
	});
}

$(document).ready(function(){
	/**
	 * 상호명 inputbox 클릭 이벤트
	 */
	$(".searchMtltyNm").click(function(){
		$("#searchMtltyNm").val("");
		$("#searchRprsntvNm").val("");
		$("#searchList").html('<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>');
		$("#hedofcPopup").show();
		$("#hedofcPopup").removeClass('hidden');
		
		var wW = window.innerWidth;
		if (wW < 751) {
				if ($('#hedofcPopup').find('.con').length > 0) {
					var height = $('#hedofcPopup').find('.cont').height();
					var titleH = $('#hedofcPopup').find('h3').outerHeight(true);
					var inner = $('#hedofcPopup').find('.con');
					var btn = $('#hedofcPopup').find('.mButton1').outerHeight(true);
			
					inner.css({ 'height': height - titleH - btn });
					inner.mCustomScrollbar();
				}
		}
	});
	/**
	 * 상호명 조회 클릭 이벤트(팝업)
	 */
	$("#btnMtltyNmSearch").click(function(){
		hedofcList(1);
		$(".mPag").show();
	});

	/**
	 * 상호명 가입폼에 등록 이벤트(팝업)
	 */
	$("#btnBindMtltyNm").click(function(){
		if(!$("input:checkbox[name='chk']:checked").val()){
			alert("선택된 내용이 없습니다.");
			return;
		}
		var returnChkVal = $("input:checkbox[name='chk']:checked").val();
		fnBindMtltyNm(returnChkVal);//사용하는위치에서 따로 정의
		$("#hedofcPopup").hide();
	});
	
	/**
	 * 상호명 조회 클릭 이벤트(팝업)
	 */
	$("#btnMtltyNmSearchMob").click(function(){
		var params = {};
		if($("#searchMtltyNmMob").val() == "" && $("#searchRprsntvNmMob").val() == ""){
			alert("상호명 혹은 대표자명을 입력해주세요.");
			return;
		} // 220113 상호명 검색 유효성 추가
		params["mtltyNm"]  = $("#searchMtltyNmMob").val();
		params["rprsntvNm"]  = $("#searchRprsntvNmMob").val();

		fnGetAjaxData("/fran/selectFrnchsHedofcM.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				 var dataList = _data.frnchsHedofcList;
				if(!!dataList && dataList.length != 0) {
					var html = [];
					for(var i = 0 ; i < _data.frnchsHedofcList.length ; i++){
						var mtltyNm = _data.frnchsHedofcList[i].mtltyNm;
						var hedofcNo = _data.frnchsHedofcList[i].hedofcNo;
						var bizrno = _data.frnchsHedofcList[i].bizrno;
						var rprsntvNm = _data.frnchsHedofcList[i].rprsntvNm;
						var adres = _data.frnchsHedofcList[i].adres;
						var atchmnflNo = _data.frnchsHedofcList[i].atchmnflNo;
						if(!atchmnflNo){
							atchmnflNo = "";
						}
						html.push('<li>                                                                                         ');
						html.push('	<div class="box">                                                                                         ');
						html.push('		<p class="check">                                                                                         ');
						html.push('			<input type="checkbox" name="chkM" id="chkM_'+i+'" value="'+mtltyNm+'_'+hedofcNo+'_'+bizrno+'_'+atchmnflNo+'_'+adres+'_'+rprsntvNm+'" class="hidden notxt">                                                                                         ');
						html.push('			<label for="chkM_'+i+'"></label>                                                                                           ');
						html.push('		</p>                                                                                         ');
						html.push('		<a>                                                                                         ');
						html.push('			<div class="numState">                                                                                         ');
						html.push('				<span class="no">'+mtltyNm+'</span>');
						html.push('			</div>');
						html.push('			<p class="subject">'+rprsntvNm+'</p>');
						html.push('			<p class="numDate">                                                                                         ');
						html.push('				<span class="no">'+adres+'</span>');
						html.push('			</p>');
						html.push('		</a>                                                                                         ');
						html.push('	</div>		 																			');
						html.push('</li>		 																			');
	
					}
					$("#searchListMob").html(html.join(""));
				 }else{
					$("#searchListMob").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
				}
			} else {
				alert(_data.resultMsg);
			}
		});
	});

	/**
	 * 상호명 가입폼에 등록 이벤트(팝업)
	 */
	$("#btnBindMtltyNmMob").click(function(){
		if(!$("input:checkbox[name='chkM']:checked").val()){
			alert("선택된 내용이 없습니다.");
			return;
		}
		var returnChkVal = $("input:checkbox[name='chkM']:checked").val();
		fnBindMtltyNm(returnChkVal);//사용하는위치에서 따로 정의
		$("#hedofcPopup").hide();
	});
});
</script>
<div id="hedofcPopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>본사 찾기</h3>
		<div class="con" style="height:500px;overflow:auto">
			<div class="mSort1 type2 forPc">
				<input type="text" class="it" title="상호명" id="searchMtltyNm" name="searchMtltyNm" placeholder="상호명">
				<input type="text" class="it" title="대표자명" id="searchRprsntvNm" name="searchRprsntvNm" placeholder="대표자명">
				<a href="javascript:void(0)" id="btnMtltyNmSearch" class="mBtn1">검색</a>
			</div>
			<div class="mSort1 type2 forMo">
				<input type="text" class="it" title="상호명" id="searchMtltyNmMob" name="searchMtltyNm" placeholder="상호명">
				<input type="text" class="it" title="대표자명" id="searchRprsntvNmMob" name="searchRprsntvNm" placeholder="대표자명">
				<a href="javascript:void(0)" id="btnMtltyNmSearchMob" class="mBtn1">검색</a>
			</div>
			
			<div class="mBoard1 noline forPc">
				<table summary="구분, 상호명, 대표자명, 주소, 사업자등록번호로 구성된 표입니다.">
				<caption>본사 찾기</caption>
				<thead>
				<tr>
					<th scope="col">구분</th>
					<th scope="col">상호명</th>
					<th scope="col">대표자명</th>
					<th scope="col">주소</th>
				</tr>
				</thead>
				<tbody id="searchList">
				</tbody>
				</table>
			</div>
			<div class="forMo">
				<ul id="searchListMob" class="list_board hasCheck">
					<p class="empty tac">조회된 내용이 없습니다.</p>
				</ul>
			</div>
		</div>
		<div class="mPag forPc" style="margin-top:20px"></div>
		<div class="mButton1 forPc" style="position:releative;top:-40px;text-align:center;margin-top:20px;">
			<a href="javascript:void(0)" class="mBtn1 primary" id="btnBindMtltyNm">확인</a>
			<a href="#hedofcPopup" id="closePopup" class="mBtn1 gray jsBtnClose1">돌아가기</a>
		</div>
		<div class="mButton1 forMo" style="position:absolute;bottom:0px;width:100%">
			<a href="#hedofcPopup" class="mBtn1 gray jsBtnClose1">돌아가기</a>
			<a href="javascript:void(0)" class="mBtn1 primary" id="btnBindMtltyNmMob">확인</a>
		</div>
		<a href="#hedofcPopup" id="closeLayer" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->