<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
<script type="text/javascript">

$(document).ready(function() {
	events();
});

function events(){
/* 	$(document).on("change", "input[name=atchmnflAt]", function() {
		if ($("select[name=atchmnflCo]"):checked").length) {
			$("#labelCheckboxAll").prop("checked", true);
		} else {
			$("#labelCheckboxAll").prop("checked", false);
		}
	}); */
}

function fn_moidfyBoardMngInfo(type) {
	if(!$("[name=menuGroupCode]").val()) {
		alert("게시위치를 선택해주세요.");
		$("[name=menuGroupCode]").focus();
		return false;
	}
	if(!$("[name=bbsNm]").val()) {
		alert("게시판명을 입력해주세요.");
		$("[name=bbsNm]").focus();
		return false;
	}
	if($.trim($("[name=bbsNm]").val()) == '통합게시판'){
		alert("'통합게시판'은 게시판명으로 사용할 수 없습니다.");
		$("[name=bbsNm]").focus();
		return false;	
	}
	if($.trim($("[name=bbsNm]").val()) == '안심창업상담'){
		alert("'안심창업상담'은 게시판명으로 사용할 수 없습니다.");
		$("[name=bbsNm]").focus();
		return false;
	}
	if(!$("textarea[name=bbsDc]").val()) {
		alert("게시판 설명을 입력해주세요.");
		$("textarea[name=bbsDc]").focus();
		return false;
	}
// 	if(!$("[name=answerAt]").is(":checked")) {
// 		alert("답글가능 여부를 선택해주세요.");
// 		$("[name=answerAt]").focus();
// 		return false;
// 	}
	if(!$("[name=atchmnflAt]").is(":checked")) {
		alert("파일첨부 가능 여부를 선택해주세요.");
		$("[name=atchmnflAt]").focus();
		return false;
	}
	if(!$("[name=atchmnflCo]").val()) {
		alert("첨부가능 파일숫자를 선택해주세요.");
		$("[name=atchmnflCo]").focus();
		return false;
	}
	if(!$("[name=useAt]").is(":checked")) {
		alert("게시판 사용여부를 선택해주세요.");
		$("[name=useAt]").focus();
		return false;
	}
	if(!$("[name=commentAt]").is(":checked")) {
		alert("게시판 사용여부를 선택해주세요.");
		$("[name=commentAt]").focus();
		return false;
	}
	
	$("#dataForm").ajaxForm({
		url: '<c:url value="/sysMngr/' + type + 'BoardMngInfo.ajax" />',
		dataType:"json",
		async: "false",
		beforeSend:function(){
		},
		success : function(data, status, request) {
			alert(data.resultMsg);
			if(data.resultCode == 'success'){
				location.href = '<c:url value="/sysMngr/board/board/boardMngList.do" />';
			}
		},
		complete:function(dt){

		},error : function(data) {
			alert("에러가 발생하였습니다.");
		}
	});
	$("#dataForm").submit();
}
	
</script>
<!-- contents -->
<div class="contents">
	
	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">게시판 관리</span>
		<span class="t">게시판 생성관리</span>
	</div>
	<!-- //breadcrumb -->
	
	<h2 class="mTitle1">게시판 생성관리</h2>
	
	<div class="mBoard1 type2">
		<form id="dataForm" method="post" enctype="multipart/form-data">
		<input type="hidden" id="type" name="type" value="${type}" />	
		<input type="hidden" id="masterSn" name="masterSn" value="${data.masterSn}" />			
		<!-- 2021-12-28 게시판유형 변경 대비하여 임시생성 -->	
		<input type="hidden" id="type" name="bbsCode" value="list" />		
		<table summary="서비스 선택, 게시 기간선택, 팝업창 크기, 팝업창 위치, 내용, 팝업사용유무로 구성된 표입니다.">
			<caption>게시판 생성관리</caption>
			<colgroup>
				<col width="180">
				<col width="40%">
				<col width="180">
				<col width="*">
			</colgroup>
			<tbody>
				<tr class="notl1">
					<th class="left">게시위치</th>
					<td class="left" colspan="3">
						<div class="gSelect1">
							<select class="select" name="menuGroupCode" title="게시위치 선택">
								<c:forEach var="option" items="${options}">
									<option value="${option.menuGroupCode}"<c:if test="${data.menuGroupCode eq option.menuGroupCode}"> selected="selected"</c:if>>${option.menuGroupNm}</option>
								</c:forEach>
							</select>
						</div>
					</td>
				</tr>
				<tr>
					<th class="left">게시판명</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<input type="text" class="it" name="bbsNm" value="${data.bbsNm }" title="게시판명">
						</div>
					</td>
				</tr>
				<tr>
					<th class="left">게시판 설명</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="bbsDc" id="bbsDc" style="width:100%;min-width:500px;">${data.bbsDc}</textarea>
<%-- 							<script type="text/javascript">
								var oEditors = [];
								nhn.husky.EZCreator.createInIFrame({
								    oAppRef: oEditors,
								    elPlaceHolder: "cn",
								    sSkinURI: "/static/se2/SmartEditor2Skin_ko_KR.html",
								    htParams : {
								    	bUseToolbar : true,
								    	bUseVerticalResizer : false,
								    	bUseModeChanger : false
								    },
								    fOnAppLoad:function(){
								    	var contents = `${noticeBbs.cn}`; 태그에러 변경 - 21.05.12
								    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
								    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
								    },
								    fCreator: "createSEditor2"
								});
							</script> --%>
						</div>
					</td>
				</tr>
<!-- 				<tr> -->
<!-- 					<th class="left">답글 가능여부</th> -->
<!-- 					<td class="left"> -->
<!-- 						<div class="mRadio1"> -->
<%-- 							<input type="radio" id="replyUse" name="answerAt" value="Y" title="사용" <c:if test="${data.answerAt eq 'Y' }">checked</c:if>> --%>
<!-- 							<label for="replyUse">가능</label> -->
<!-- 						</div> -->
<!-- 						<div class="mRadio1"> -->
<%-- 							<input type="radio" id="replyNoUse" name="answerAt" value="N" title="미사용" <c:if test="${data.answerAt eq 'N' }">checked</c:if>> --%>
<!-- 							<label for="replyNoUse">불가능</label> -->
<!-- 						</div> -->
<!-- 					</td> -->
<!-- 					<th class="left">파일첨부 가능여부</th> -->
<!-- 					<td class="left"> -->
<!-- 						<div class="mRadio1"> -->
<%-- 							<input type="radio" id="fileUse" name="atchmnflAt" value="Y" title="사용" <c:if test="${data.atchmnflAt eq 'Y' }">checked</c:if>> --%>
<!-- 							<label for="fileUse">가능</label> -->
<!-- 						</div> -->
<!-- 						<div class="mRadio1"> -->
<%-- 							<input type="radio" id="fileNoUse" name="atchmnflAt" value="N" title="미사용" <c:if test="${data.atchmnflAt eq 'N' }">checked</c:if>> --%>
<!-- 							<label for="fileNoUse">불가능</label> -->
<!-- 						</div> -->
<!-- 					</td> -->
<!-- 				</tr> -->
				<tr>
					<th class="left">파일첨부 가능여부</th>
					<td class="left">
						<div class="mRadio1">
							<input type="radio" id="fileUse" name="atchmnflAt" value="Y" title="사용" <c:if test="${data.atchmnflAt eq 'Y' }">checked</c:if>>
							<label for="fileUse">가능</label>
						</div>
						<div class="mRadio1">
							<input type="radio" id="fileNoUse" name="atchmnflAt" value="N" title="미사용" <c:if test="${data.atchmnflAt eq 'N' }">checked</c:if>>
							<label for="fileNoUse">불가능</label>
						</div>
					</td>					
					<th class="left">첨부가능파일 숫자</th>
					<td class="left"> 
						<div class="gSelect1">
							<select class="select" name="atchmnflCo" title="첨부가능파일 숫자">
								<option value="0"<c:if test="${data.atchmnflCo eq 0}"> selected="selected"</c:if>>0</option>
								<option value="1"<c:if test="${data.atchmnflCo eq 1}"> selected="selected"</c:if>>1</option>
								<option value="2"<c:if test="${data.atchmnflCo eq 2}"> selected="selected"</c:if>>2</option>
								<option value="3"<c:if test="${data.atchmnflCo eq 3}"> selected="selected"</c:if>>3</option>
							</select>
						</div>
					</td>
				</tr>
				<tr>
					<th class="left">댓글 가능여부</th>
					<td class="left">
						<div class="mRadio1">
							<input type="radio" id="commentUse" name="commentAt" value="Y" title="사용" <c:if test="${data.commentAt eq 'Y' }">checked</c:if>>
							<label for="commentUse">가능</label>
						</div>
						<div class="mRadio1">
							<input type="radio" id="commentNoUse" name="commentAt" value="N" title="미사용" <c:if test="${data.commentAt eq 'N' }">checked</c:if>>
							<label for="commentNoUse">불가능</label>
						</div>
					</td>
					<th class="left">사용여부</th>
<!-- 					<td class="left" colspan="3"> -->
					<td class="left">
						<div class="mRadio1">
							<input type="radio" id="boardUse" name="useAt" value="Y" title="사용" <c:if test="${data.useAt eq 'Y' }">checked</c:if>>
							<label for="boardUse">사용</label>
						</div>
						<div class="mRadio1">
							<input type="radio" id="boardNoUse" name="useAt" value="N" title="미사용" <c:if test="${data.useAt eq 'N' }">checked</c:if>>
							<label for="boardNoUse">사용중지</label>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		</form>
	</div>
	<div class="mButton1 right">
			<c:choose>
			    <c:when test="${type eq 'update'}">
					<a href="javascript:void(0)" onclick="fn_moidfyBoardMngInfo('update');" class="mBtn1 blue">수정</a>
			    </c:when>
			    <c:otherwise>
			    	<a href="javascript:void(0)" onclick="fn_moidfyBoardMngInfo('insert');" class="mBtn1 blue">등록</a>
			    </c:otherwise>
			</c:choose>
		<a href="<c:url value="/sysMngr/board/board/boardMngList.do"/>" class="mBtn1">목록</a>
	</div>
	
</div>
<!-- //contents -->