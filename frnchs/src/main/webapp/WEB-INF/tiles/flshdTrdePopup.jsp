<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 허위매물신고하기 팝업 -->
<style>
.mPopup1:before {
 background-color:rgba(0,0,0,0.4);
}
.inner dl dt {
 padding:21px 0 8px;
 font-weight : 700;
}

</style>
<script>
$(document).ready(function(){
	
	$(".openFlshdTrdePopup").click(function(){
		$("#inqryCn").prop('readonly', false);
		// 첨부파일
		fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
		fObj.init();
		$("#flshdTrdePopup").removeClass("hidden");
		$("#flshdTrdePopup").show();
	});
	
	$("#btnAnswer").click(function(){
		fn_insertInfo();
	});
	
	$("#btnAnswerMob").click(function(){
		fn_insertInfo();
	});

	$("#btnClose").click(function(){
		$("#flshdTrdePopup").hide();
	});
	
	$("#btnCloseMob").click(function(){
		$("#flshdTrdePopup").hide();
	});
	
	$("#layerClose").click(function(){
		$("#flshdTrdePopup").hide();
	});

});

function fn_isValid() {
	if(!$("#inqryCn").val()){
		alert("문의내용을 입력해주세요.");
		$("#inqryCn").focus();
		return false;
	}
	if (!$("input[name=atchmnflNo]").val()) {
		alert("첨부파일을 추가해주세요.");
		return false;
	}
	return true;
}

function fn_insertInfo() {
/* 	if(!$("select[name=flshdTrdeThingResnCode]").val()) {
		alert("신고 사유를 선택하세요");
		$("input[name=flshdTrdeThingResnCode]").focus();
		return false;
	}
	if(!$("textarea[name=cn]").val()) {
		alert("내용을 입력해주세요.");
		$("textarea[name=cn]").focus();
		return false;
	} */
	if (confirm("등록하시겠습니까?")) {
/* 		var url = "/board/trade/insertFlshdTrde.ajax";
		
		var params = {
				"trdeThingRegistNo":$("#trdeThingRegistNo").val() 
				, "flshdTrdeThingResnCode": $("#flshdTrdeThingResnCode").val()
				, "cn":$("#cn").val()
				};
		fnGetAjaxData(url, params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("등록되었습니다.");
				
				$("#flshdTrdePopup").hide();
				$("select[name=flshdTrdeThingResnCode]").val('');
				$("textarea[name=cn]").val('');
				
				return false;
			} else {
				alert(_data.resultMsg);
			}
		}); */
		if(fn_isValid()){
			
			var params = {
					'ssUserNo': $("#ssUserNo").val()
					,'inqryCn': $("#inqryCn").val()
					,'telno' : $("#telno").val()
					,'paramTrdeThingRegistNo' : $("#paramTrdeThingRegistNo").val()
					,'atchmnflNo' :$("input[name=atchmnflNo]").val()
			};
			fnGetAjaxData("/board/trade/insertTradeinqry.ajax", params, function(data) {
				if(data.resultCode == RESULT_SUCCESS){
					alert(data.resultMsg);
					fObj.updateComplete();
					$("#flshdTrdePopup").hide();
					
				} else {
					alert(data.resultMsg);
				}
			});
			
		}
	}
	$("#inqryCn").val("");
}

</script>
<div id="flshdTrdePopup" class="mPopup1 lCompany hidden">
	<div class="cont">
		<h3>매물점포 문의하기</h3>
		<div class="con">
			<div class="inner scroll_y">
				<div class="mBoard1 noline forPc">
					<table>
						<caption>문의사항 - 제목, 문의내용, 파일첨부</caption>
						<colgroup>
							<col style="width:15%;">
							<col style="width:auto;">
						</colgroup>
					
						<tbody>
							<tr>
								<th scope="row">제목</th>
								<td class="left" style="padding-top:15px;padding-bottom:15px">
									<div class="gIt"><input type="text" class="it"></div>
								</td>
							</tr>
					
							<tr>
								<th scope="row">문의내용</th>
								<td class="left">
									<textarea name="inqryCn" id="inqryCn" class="textarea"></textarea>
								</td>
							</tr>
					
							<tr>
								<th scope="row">파일첨부</th>
								<td class="left" style="padding-top:15px;padding-bottom:0px">
									<div id="atchFileDiv"></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="forMo">
					<dl>
						<dt>제목</dt>
						<dd>
							<input type="text" name="" id="" class="w100p radius">
						</dd>
					</dl>

					<dl>
						<dt>문의내용</dt>
						<dd class="relative">
							<textarea name="" id="" rows="5" class="w100p radius"></textarea>

							<p class="writeCount">
								<span>0</span>/<span>1,000</span>
							</p>
						</dd>
					</dl>

					<dl>
						<dt>파일첨부</dt>
						<dd>
							<div class="box_file">
								<input type="file" name="temp_file1" id="temp_file1" class="hidden">
								<label for="temp_file1">파일첨부</label>
							</div>
							
							<p class="msg">
								5MByte 이하의 파일만 등록가능합니다.<br>
								등록이미지 크기는 가로 200pixel / 세로 200pixel로 올려주세요.
							</p>
							
							<div class="box_btn block h40 radius charcoal"><button>첨부파일 추가</button></div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="mButton1 forPc">
			<a href="javascript:void(0)" class="mBtn1 primary" id="btnAnswer">등록</a>
			<a href="javascript:void(0)" class="mBtn1 gray jsBtnClose1" id="btnClose">닫기</a>
		</div>
		<div class="mButton1 forMo" style="bottom: 0; position: absolute; width: 100%;">
			<a href="javascript:void(0)" class="mBtn1 primary" id="btnAnswerMob">등록</a>
			<a href="javascript:void(0)" class="mBtn1 gray jsBtnClose1" id="btnCloseMob">닫기</a>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1" id="layerClose">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->