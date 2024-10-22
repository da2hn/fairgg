<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 체험예비창업자 팝업 -->
<script>
$(document).ready(function(){
	//승인처리
	$("#btnApprove").click(function() {
		fnChangeSttus("CS01","PS01");
	});
});
var approveCnt = 0;
function fnRcritSrh(){
	var params = {};
	approveCnt = 0;
	params["exprnRegistNo"] = $("#pExprnRegistNo").val();
	$.post('/myPage/expr/exprManage/selectExprRcritList.ajax',params)
	.done(function(data) {
		if(data.resultCode == 'success'){
			$("#rcritDataTbody").empty();
			$("#popPaging").html("")
			var dataList = data.exprRcritList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					if(data.confmSttusCode == "CS01"){
						approveCnt++;
					}
					dataTr += '<tr>';
					dataTr += '	<td>';
					if(data.confmSttusCode == "CS04"){
					dataTr += '		<span class="mCheckbox notext">';
					dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnReqstNo+'>          ';
					dataTr += '			<label for="chk'+idx+'">선택</label>';
					dataTr += '		</span>';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.userNm+'</td>';
					dataTr += '	<td>'+data.telno+'</td>';
					dataTr += '	<td>'+data.emailAdres+'</td>';
					dataTr += '	<td>'+data.registDt+'</td>';
					if(data.confmSttusCode == "CS04"){
						dataTr += '	<td>기관관리자 승인 완료<br>'+data.updtDt+'</td>';
					}else if(data.confmSttusCode == "CS01"){
						dataTr += '	<td>승인 완료<br>'+data.confmDt+'</td>';
					}else{
						dataTr += ' <td>검토중</td>';
					}
					dataTr += '</tr>';
				})
				$("#rcritDataTbody").append(dataTr);
			} else {
				$("#rcritDataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$("#popPaging").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fnChangeSttus(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chk']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});
	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	var maxRcRitNmpr = $("#rcritNmpr").val();
	
	var selectCnt = maxRcRitNmpr-approveCnt < 0 ? 0 : maxRcRitNmpr-approveCnt;
	if(selectCnt == 0){
		alert("마감되었습니다.");
		return;
	}
	if(Number(approveCnt) + Number(checkedValArr.length) > maxRcRitNmpr){
		alert("모집인원보다 많이 신청할수 없습니다.\n"+selectCnt+"명 선택가능합니다.");
		return;
	}

	var params = {};
	params["exprnRegistNo"] = $("#pExprnRegistNo").val();
	params["exprnReqstNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/exprManage/updateFrnchsExprnReqstApproveSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fnRcritSrh();
		} else {
			alert(_data.resultMsg);
		}
	});
}
function chkReset() {
	$("input[type=checkbox]").prop("checked",false);
}
</script>
<div id="exprRcritPopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>체험 예비창업자 모집현황</h3>
		<div class="con">
			<div class="mBoard1 noline">
				<div style="width:100%; height:500px; overflow:auto">
				<table summary="선택, 선착순 순위, 참여자명, 전화번호, 이메일, 신청일, 상태로 구성된 표입니다.">
				<caption>체험 예비창업자 모집현황</caption>
				<colgroup>
					<col style="width:8%;">
					<col style="width:10%;">
					<col style="width:12%;">
					<col style="width:14%;">
					<col style="width:auto;">
					<col style="width:12%;">
					<col style="width:16%;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">선택</th>
						<th scope="col">선착순 순위</th>
						<th scope="col">참여자명</th>
						<th scope="col">전화번호</th>
						<th scope="col">이메일</th>
						<th scope="col">신청일</th>
						<th scope="col">상태</th>
					</tr>
				</thead>
				<tbody id="rcritDataTbody">
				</tbody>
				</table>
				</div>
				<!-- paging -->
				<div id="popPaging" class="mPag"></div>
				<!-- //paging -->
			</div>
			<div class="mButton1">
				<a href="javascript:void(0)" class="mBtn1 primary" id="btnApprove">매칭</a>
				<a href="#exprRcritPopup" onclick="chkReset();" class="mBtn1 gray jsBtnClose1">닫기</a>
			</div>
		</div>
		<a href="#exprRcritPopup" onclick="chkReset();" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->
