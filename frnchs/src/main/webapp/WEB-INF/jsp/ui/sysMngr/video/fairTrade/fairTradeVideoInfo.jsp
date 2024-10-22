<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/sysmngr/video/fairTradeVideoInfo.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>

<style>
#atchFileDiv>.mFile1>.btn>.mBtn1 {
    height: 38px;
}
.mFile1 {
	position: relative;
	height: 38px;
}

.mFile1 >.git {
	padding-right: 192px;
}

div.gIt>#atchFileNm_f1 {
	line-height: 38px;
    height: 35px;
}

.btn {
	position: absolute;
    top: 0;
    right: 0px;
    width: 84px;
    height: 40px;
}

#atchFile_f1 {
	position: absolute;
    opacity: 0.01;
    top: 0;
}

#btnAddFile_f1 {
	display: none;
}
</style>
<!-- contents -->
<div class="contents">
	
	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">동영상 관리</span>
		<span class="t">공정거래홍보관 영상 관리</span>
	</div>
	<!-- //breadcrumb -->
	
	<h2 class="mTitle1">공정거래홍보관 영상 관리</h2>
	
	<div class="mBoard1 mWrite1">
		<form id="dataForm" method="post" enctype="multipart/form-data">
		<input type="hidden" id="type" value="<c:out value="${type}" />" />
		<input type="hidden" id="dataCn" name="dataCn" value="<c:out value="${data.cn}" />">
		<table summary="서비스 선택, 게시 기간선택, 팝업창 크기, 팝업창 위치, 내용, 팝업사용유무로 구성된 표입니다.">
			<caption>팝업창 관리</caption>
			<colgroup>
				<col width="170">
				<col width="*">
				<col width="*">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th class="left">홍보동영상 제목</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<input type="text" class="it" name="sj" value="<c:out value="${data.sj }" />" title="팝업 제목">
						</div>
					</td>
				</tr>
				<tr class="notl1">
					<th class="left">동영상 구분</th>
					<td class="left" colspan="3">
						<div class="gSelect1">
							<select class="select" name="fairTradeSeCode" title="서비스 선택">
								<option value="">선택</option>
					<!-- 			<option value="FT01">교육영상</option>
								<option value="FT02">홍보영상</option>
								<option value="FT03">일반영상</option> -->
								<c:forEach var="code" items="${codeList }">
									<option value="${code.codeValue }" <c:if test="${code.codeValue eq data.fairTradeSeCode}">selected</c:if>><c:out value="${code.codeValueNm}" /></option>
								</c:forEach>
							</select>
						</div>
					</td>
				</tr>
				
				<tr>
					<th class="left">게시 기간선택</th>
					<td class="left" colspan="3">
						<div class="gDate1">
							<span class="gIt"><input type="text" class="it date" name="pstSrtDt" value="<c:out value="${data.pstSrtDt }"/>" autocomplete="off" title="게시 기간 시작일자" id="dateStartPop"></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" class="it date" name="pstAndDt" value="<c:out value="${data.pstAndDt }"/>" autocomplete="off" title="게시 기간 종료일자" id="dateEndPop"></span>
							<script type="text/javascript">
							$( function() {
								$( "#dateStartPop, #dateEndPop" ).datepicker({
									dateFormat: 'yy-mm-dd'
								});
							} );
							</script>
						</div>
					</td>
				</tr>

				<tr>
					<th class="left">게시 내용</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cn" id="cn" style="width:100%;min-width:500px;"></textarea>
							<script type="text/javascript">
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
								    	var contents = $("#dataCn").val(); <%-- 태그에러 변경 - 21.05.12 --%>
								    	console.log(oEditors);
								    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
								    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
								    },
								    fCreator: "createSEditor2"
								});
							</script>
						</div>
					</td>
				</tr>
				<tr>
					<!-- <th class="left" rowspan="2">첨부</th> -->
					<!-- <td class="left" colspan="3" style="border-left: 1px solid #d6d6d6;">  -->
				<%-- 		<div class="gTxt1">
							<div class="mRadio1" style="margin: 10px 0px;">
								<input type="radio" id="videoUse" name="videoUse" title="동영상등록" <c:if test="${!(empty data.atchmnflNo)}">checked</c:if>>
								<label for="videoUse">동영상 등록</label>
							</div>
						</div> --%>
					<%-- 		<a class="ul" id="readFile" href="<c:url value="/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }&atchmnflSttusCode=${data.atchmnflSttusCode }" />"><c:out value="${data.inputFileNm }" /></a>
						<div class="mFfile1 type2" id="fileDiv" style="<c:if test="${(empty data.atchmnflNo)}">display: none;</c:if> ">
							<input type="text" id="fileName" class="url" readonly value="" accept="video/*">
							<div class="btn">
								<a href="###" class="mBtn1 file_input_img_btn">파일선택</a>
								<input type="file" name="atchFile" class="hiddenBtn" value="<c:out value="${data.inputFileNm }" />" onchange="javascript: document.getElementById('fileName').value = this.value" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
							</div>
						</div> --%>
					<!-- </td> -->
					<th>파일첨부</th>
					<td class="left">
						<input type="hidden" id="fairTradeSn" name="fairTradeSn" value="<c:out value="${data.fairTradeSn}" />" />
						<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${data.atchmnflNo}" />" />
						<input type="hidden" id="fileType" name="fileType" value="" />
						<div id="atchFileDiv"></div>
					</td>
				</tr>
			</tbody>
		</table>
		</form>
	</div>
	<div class="mButton1 right">
		<a href="javascript:void(0)" id="btn_moidfy" class="mBtn1 blue">
			<c:if test="${type eq 'insert'}">등록</c:if>
			<c:if test="${type eq 'update'}">수정</c:if>
		</a>
		<a href="<c:url value="/sysMngr/video/fairTrade/fairTradeVideo.do"/>" class="mBtn1">목록</a>
	</div>
	
</div>
<!-- //contents -->