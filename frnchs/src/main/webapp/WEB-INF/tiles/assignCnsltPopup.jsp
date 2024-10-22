<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 컨설턴트 현황 팝업 -->
<script>
$(document).ready(function(){
	selectConsultantList();

	$("#btn_save").click(function(){
		fn_updateAssignConsultant('등록');
		/* $("#assignCnsltPopup").addClass('hidden'); */
	});
	$("#btn_companion").click(function(){
		fn_updateAssignConsultant('반려');//배정취소
		/* $("#assignCnsltPopup").addClass('hidden'); */
	});
});

function selectConsultantList() {
	var params = {};
	fnGetAjaxData("/myPage/board/trade/selectConsultantList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#dataTbodyPopup").empty();
			var dataList = _data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';

					dataTr += '<td>';
					dataTr += '<span class="mCheckbox notext">';
					dataTr += '<input type="checkbox" id="'+data.chrgCnstntUserNo+'" name="chkRow" onclick="oneCheckbox(this)" title="선택" value="'+data.chrgCnstntUserNo+'">';
					dataTr += '<label for="'+data.chrgCnstntUserNo+'">선택</label>';
					dataTr += '</span>';
					dataTr += '</td>';
					dataTr += '<td>'+data.userNm+'</td>';
					dataTr += '<td>'+data.telno+'</td>';
					dataTr += '<td>'+data.emailAdres+'</td>';

					dataTr += '</tr>';
				})
				$("#dataTbodyPopup").append(dataTr);
			} else {
				$("#dataTbodyPopup").append('<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>');
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function oneCheckbox(val){
    var chkbox = document.getElementsByName("chkRow");
    for(var i=0; i<chkbox.length; i++){
        if(chkbox[i] != val){
        	chkbox[i].checked = false;
        }
    }
}

function fn_updateAssignConsultant(str) {
	var chrgCnstntUserNo = $("input[name='chkRow']:checked").val();
	if(!chrgCnstntUserNo) {
		alert("컨설턴트를 선택하세요");
		return false;
	}
	
	//str이 반려일 경우
	if(str.indexOf('반려') != -1) {
		chrgCnstntUserNo = "";
	}
	if (confirm(str + "하시겠습니까?")) {
		var url = "/myPage/board/trade/updateAssignConsultant.ajax";
		var params = {
				 "trdeThingRegistNo" : $("#trdeThingRegistNo").val()
				,"chrgCnstntUserNo" : chrgCnstntUserNo
				};
		fnGetAjaxData(url, params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(str + "되었습니다.");
				$("input[type=checkbox]").prop("checked",false);
				$("#assignCnsltPopup").hide(fn_selectTradeList());
				return false;
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}
function chkReset() {
	$("input[type=checkbox]").prop("checked",false);
	$("#chrgCnstntUserNm").val("");
	$("#chrgCnstntUserNo").val("");
}
</script>
<div id="assignCnsltPopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>컨설턴트 현황</h3>
		<div class="con">
			<div class="mBoard1 noline">
				<div style="width:100%; height:250px; overflow:auto">
				<table summary="선택, 컨설턴트명, 전화번호, 이메일로 구성된 표입니다.">
				<caption>컨설턴트 현황</caption>
				<colgroup>
					<col width="65px">
					<col width="120px">
					<col width="120px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">컨설턴트명</th>
					<th scope="col">전화번호</th>
					<th scope="col">이메일</th>
				</tr>
				</thead>
				<tbody id="dataTbodyPopup">
					<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>
				</tbody>
				</table>
				</div>
				<div class="mButton1 right" style="margin-top:30px">
					<a href="javascript:void(0)" class="mBtn1 primary" id="btn_save">배정</a>
					<a href="javascript:void(0)" class="mBtn1" id="btn_companion">배정취소</a>
				<!-- <a href="#assignCnsltPopup" onclick="chkReset();" class="mBtn1 gray jsBtnClose1">닫기</a> -->
				</div>
			</div>
		</div>
		<a href="#assignCnsltPopup" onclick="chkReset();" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->