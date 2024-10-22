<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 컨설턴트 현황 팝업 -->
<script>
$(document).ready(function(){
	selectInfoAdminLIst();

	$("#btn_save").click(function(){
		fn_updateAssignInfoAdmin("update");
	});
	
	$("#btn_delete").click(function(){
		/* fn_updateAssignInfoAdmin("delete"); */
		if(!fn_updateAssignInfoAdmin("delete")){
			$("#assignInfoAdminPopup").show();
		}
	});

});

function selectInfoAdminLIst() {
	var params = {};
	fnGetAjaxData("/myPage/board/infoDcs/selectInfoAdminList.ajax", params, function(_data) {
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

function fn_updateAssignInfoAdmin(type) {
	var chrgCnstntUserNo = $("input[name='chkRow']:checked").val();
	if(!chrgCnstntUserNo) {
		alert("관리자를 선택하세요");
		return false;
	}
	if (confirm(type == "update" ? "배정하시겠습니까?" : "배정취소 하시겠습니까?")) {
		var url = "/myPage/board/infoDcs/updateInfoAdmin.ajax";
		var params = {
				 "infoDcsRegistNo" : $("#infoDcsRegistNo").val()
				,"chrgCnstntUserNo" : type == "update" ? chrgCnstntUserNo : null
				};
		fnGetAjaxData(url, params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(type == "update" ? "배정되었습니다." : "배정취소 되었습니다.");
				$("input[type=checkbox]").prop("checked",false);
				$("#assignInfoAdminPopup").hide(selectInfoAdminLIst());
				location.href = "/myPage/board/infoDcs/infoDcsList.do";
				return false;
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}
function chkReset() {
	$("input[type=checkbox]").prop("checked",false);
}
</script>
<div id="assignInfoAdminPopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>정보공개서 관리자 지정</h3>
		<div class="con">
			<div class="mBoard1 noline">
				<div style="width:100%; height:250px; overflow:auto">
				<table summary="선택, 관리자명, 전화번호, 이메일로 구성된 표입니다.">
				<caption>정보공개서 관리자 지정</caption>
				<colgroup>
					<col width="65px">
					<col width="120px">
					<col width="120px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">관리자명</th>
					<th scope="col">전화번호</th>
					<th scope="col">이메일</th>
				</tr>
				</thead>
				<tbody id="dataTbodyPopup">
					<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>
				</tbody>
				</table>
				</div>
			</div>
			<div class="mButton1 right" style="margin-top:30px">
				<a href="javascript:void(0)" class="mBtn1 primary" id="btn_save">배정</a>
				<a href="#assignInfoAdminPopup" class="mBtn1 gray jsBtnClose1" id="btn_delete">배정취소</a>
			</div>
		</div>
		<a href="#assignInfoAdminPopup" onclick="chkReset();" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->