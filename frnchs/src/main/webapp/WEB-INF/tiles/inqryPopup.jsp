<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 문의사항 팝업 -->
<script>
var fObj = null
function openInqryPop(sttus, atchmnflNo){
	$("#inqryPopup").show();
 	if(sttus == 'AN01'){
 		$("#answerCn").attr('readOnly', true);
		$("#btnAnswer").hide();
		
		var bFile = atchmnflNo == null ? false : true;
		fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:bFile});
		/* fObj.init(); */
		fObj.getFileList(atchmnflNo, "FS02");
		
	}else{
 		$("#answerCn").attr('readOnly', false);
		$("#btnAnswer").show();
		
		var bFile = atchmnflNo == null ? false : true;
		fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:bFile});
		fObj.init();
		fObj.getFileList(atchmnflNo, "FS02");
	}
 	$(".mFile1").hide();
 	$(".iDel").hide();
 	
 	
}

$(document).ready(function(){
	$("#btnAnswer").click(function(){
		if(confirm("처리하시겠습니까?")) {
			var params = {
					 'trdeThingInqryNo':$("#trdeThingInqryNo").val()
					,'answerCn' : $("#answerCn").val()
				};
			fnGetAjaxData("/myPage/board/trade/updateInqrySttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#inqryPopup").hide();
					toggle_dimmed_view('layer_qna_0');
					fn_selectInqryList(1);
				} else {
					alert(_data.resultMsg);
				};
			});
		};
	});
});
</script>
<style>
div.mInfo1{display:none;}
.list_file .mAttach1 {display:inline-block;}
</style>
<div id="inqryPopup" class="lCompany mBoard1" style="border-top:none;">
	<div class="layer_common layer_qna layer_qna_0">
		<div class="titleArea">
			<h3 style="font-size: inherit;">문의사항</h3>
			<button class="close jsBtnClose1" onclick="toggle_dimmed_view('layer_qna_0');">닫기</button>
		</div>
		<input id="trdeThingInqryNo" type="hidden">
		<input id="answerUserNo" type="hidden">
		<div class="inner">
			<table class="tbl_row">
				<caption>문의사항 - 작성자, 등록일, 연락처, 이메일, 내용, 첨부파일</caption>
				<colgroup>
					<col style="width:14%;">
					<col style="width:28%;">
					<col style="width:14%;">
					<col style="width:auto;">
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">작성자</th>
						<td class="left"><span id="userNm"></span></td>

						<th scope="row">등록일</th>
						<td class="left"><span id="inqryRegDt"></span></td>
					</tr>

					<tr>
						<th scope="row">연락처</th>
						<td class="left"><span id="inqrTelno"></span></td>

						<th scope="row">이메일</th>
						<td class="left"><span id="emailAdres"></span></td>
					</tr>
				</tbody>
			</table>
			<div id="inqrCn" class="cont"></div>
			<!-- <ul id="atchFileDiv" class="list_file"></ul> -->
			<ul id="atchFileDiv" class="list_file" style="padding-top:10px;"></ul>
			<dl class="comment">
				<dt>답변입력</dt>
				<dd>
					<textarea name="answerCn" id="answerCn" rows="4" class="w100p"></textarea>
				</dd>
			</dl>
		</div>
		<div class="btn tac">
			<!-- <div class="box_btn w130 h40 yellow fs16 medium"><button>답변수정</button></div> -->
			<div id="btnAnswer" class="box_btn w130 h40 yellow fs16 medium"><button>답변등록</button></div>
			<div class="box_btn w130 h40 charcoal2 fs16 medium jsBtnClose1"><button id="btnClose" onclick="toggle_dimmed_view('layer_qna_0');">닫기</button></div>
		</div>
	</div>
</div>
<%-- <div id="inqryPopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>문의사항</h3>
		<div class="con">
			<div class="mBoard1 noline">
				<input id="trdeThingInqryNo" type="hidden">
				<input id="answerUserNo" type="hidden">
				<table summary="문의사항을 조회,수정하는 표입니다." class="TABLE">
					<caption>문의사항</caption>
					<tbody id="frchsAjaxArea" style="max-height: 480px;">
						<tr>
							<th scope="col">제목</th>
							<td><span id="inqryTitle"></span></td>
							<th scope="col">등록일</th>
							<td><span id="inqryRegDt"></span></td>
						</tr>
						<tr>
							<td><textarea id="inqryCn" cols="80" rows="5" readOnly></textarea></td>
						</tr>
						<tr>
							<th scope="col" colspan=4>첨부파일</th>
						</tr>
						<tr>
							<td>
<!-- 								<a id="atchmnfl" class="ul">
								<span id="fileNm"></span>
								</a> -->
								<div id="atchFileDiv"></div>
							</td>
						</tr>
						<tr>
							<th scope="col" colspan=4>답변</th>
						</tr>
						<tr>
							<td><textarea id="answerCn" cols="80" rows="5"></textarea></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="mButton1">
				<a href="javascript:void(0)" class="mBtn1 primary" id="btnAnswer">답변등록</a>
				<a href="javascript:void(0)" class="mBtn1 gray jsBtnClose1">닫기</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1">레이어 닫기</a>
	</div> 
</div>
	--%>