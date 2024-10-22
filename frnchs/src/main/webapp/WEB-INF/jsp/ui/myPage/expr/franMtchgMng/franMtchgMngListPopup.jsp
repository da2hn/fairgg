<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script>
$(document).ready(function(){

	fnSearchPopup();

	$(".btnPopupClose").click(function(){
		$("#popupDiv").html("");
	});
	//검토중, 진행중
	$("#btnApprovePopup").click(function() {
		//fnChangeSttusPopup("CS01","PS01");
		fnChangeSttusPopup("CS04","PS01");
	});
	//반려, 종료
	$("#btnRejectPopup").click(function() {
		fnChangeSttusPopup("CS02","PS02");
	});
});
function fnChangeSttusPopup(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chk2']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});

	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	//console.log(checkedValArr);
	var params = {};
	params["exprnReqstNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/franMtchgMng/updateFrnchsExprnReqstSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fnSearchPopup();
		} else {
			alert(_data.resultMsg);
		}
	});
}
function fnSearchPopup(){
	var params = {};
	params["exprnRegistNo"] = "${exprnRegistNo}";
	fnGetAjaxData("/myPage/expr/franMtchgMng/selectFranMtchgMngListPopup.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#dataTbodyPop").empty();
			var dataList = _data.franMtchgMngListPopup;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '	<td>';
					//if(data.confmSttusCode == 'CS03'){
						dataTr += '		<span class="mCheckbox notext">';
						dataTr += '			<input type="checkbox" id="chk2'+idx+'" name="chk2" title="선택" value="'+data.exprnReqstNo+'">';
						dataTr += '			<label for="chk2'+idx+'">선택</label>';
						dataTr += '		</span>';
					//}else{
					//	dataTr += '			-';
					//}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.userNm+'</td>';
					dataTr += '	<td>'+data.telno+'</td>';
					dataTr += '	<td>'+data.emailAdres+'</td>';
					//dataTr += '	<td>'+data.confmSttusCodeNm+'</td>';
					dataTr += '	<td>'+data.registDt+'</td>';
					dataTr += '</tr>';
				});
				$("#dataTbodyPop").append(dataTr);
			} else {
				$("#dataTbodyPop").append('<tr><td colspan="6">조회된 내용이 없습니다.</td></tr>');
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

</script>
<!-- popup -->
<div id="jsPopup1" class="mPopup1 type3">
	<div class="cont">
		<h3>${headerTxt}</h3>
		<div class="con">
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 선착순 순위, 참여자명, 전화번호, 이메일, 승인상태, 신청일로 구성된 표입니다.">
				<caption>체험 프랜차이즈 신청자 현황</caption>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">선착순<br> 순위</th>
					<th scope="col">참여자명</th>
					<th scope="col">전화번호</th>
					<th scope="col">이메일</th>
					<!-- <th scope="col">승인상태</th> -->
					<th scope="col">신청일</th>
				</tr>
				</thead>
				<tbody id="dataTbodyPop">
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<div class="mButton1 right" style="padding:0px;margin-top:45px">
				<a href="javascript:void(0)" id="btnApprovePopup" class="mBtn1 primary">승인</a>
				<a href="javascript:void(0)" id="btnRejectPopup" class="mBtn1 gray">반려</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1 btnPopupClose">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->