<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoSave.js"/>"></script>

<!-- content -->
<div class="content">
	<h5 class="mTitle2">창업지원 게시판 관리</h5>
<!-- view -->
<div class="mView1">
<form id="dataForm" method="post" enctype="multipart/form-data">
<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
<input type="hidden" id="schCodeVal" name="schCodeVal" value="${param.schCodeVal}"/>
<input type="hidden" id="schTxtVal" name="schTxtVal" value="${param.schTxtVal}"/>
<input type="hidden" id="myPageAnswerAt" name="myPageAnswerAt" value="Y"/>
<input type="hidden" id="userNo" name="userNo" value="<c:out value="${fntnBbs.userNo}" />" />
<input type="hidden" id="fntnSportSn" name="fntnSportSn" value="<c:out value="${fntnBbs.fntnSportSn}" />" />
<input type="hidden" id="fntnSportCnSeCodeVal" name="fntnSportCnSeCodeVal" value="<c:out value="${fntnBbs.fntnSportCnSeCode}" />" />
<input type="hidden" id="othbcAtVal" name="othbcAtVal" value="<c:out value="${fntnBbs.othbcAt}" />" />
<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${fntnBbs.atchmnflNo}" />" />
	<div class="row article">
		<select title="창업지원내용구분" class="select" id="fntnSportCnSeCode" name="fntnSportCnSeCode" />"> >
			<option value=""><c:out value="창업지원내용구분 선택" /></option>
			<c:forEach var="code" items="${fntnSportCnSeCodeList}">
				<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
			</c:forEach>
		</select>
	</div>
	
	<div class="row article">
		<span class="tit">등록일</span>
		<span class="txt">${fntnBbs.updtDt}</span>
	</div>
	<div class="row article">
		<div class="gIt">
			<input type="text" class="it" id="sj" name="sj"  title="제목" placeholder="제목을 입력해주세요." value="<c:out value="${fntnBbs.sj}" />" >
		</div>
	</div>
	<div class="row article">
		<div class="gTextarea">
		<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cn" id="cn"><c:out value="${fntnBbs.cn}" /></textarea>
		</div>
	</div>
	<div class="row share">
		<span class="tit">공개여부</span>
		<div class="con">
			<span class="mRadio">
				<input type="radio" id="othbcAt_1" name="othbcAt" title="공개" checked="checked" value="Y">
				<label for="othbcAt_1">공개</label>
			</span>
			<span class="mRadio">
				<input type="radio" id="othbcAt_2" name="othbcAt" title="비공개" value="N">
				<label for="othbcAt_2">비공개</label>
			</span>
		</div>
	</div>
<div class="row attach">
		<span class="tit">첨부파일</span>
		<div id="atchFileDiv"></div>
		<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>
	</div>
	
	<!-- reply -->
	<div class="mReply1" id="answerArea" name="answerArea">
			<h5>답변</h5>
			<div class="gTextarea">
				<textarea class="textarea" id="answerCn" name="answerCn" rows="5" placeholder="답변내용을 입력해주세요."><c:out value="${fntnBbs.answerCn}" /></textarea>
			</div>
		</div>
	<!-- //reply -->
</form>

	<div class="mButton1 right">
		<a href="javascript:void(0);" class="mBtn1 primary" id="btn_update">수정</a>
		<a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a>
		<a href="${contextPath}/myPage/board/info/infoList.do" class="mBtn1 primary">돌아가기</a>
	</div>
</div>
<!-- //view -->
<!-- prev/next -->
<div class="mView1 mPn1">
	<div class="row">
		<span class="tit">이전글</span>
		<span class="txt">
			<c:choose>
			<c:when test="${!empty fntnBbsNextInfo.fntnSportSnPr}">
				<a href="javascript:void(0);" onclick="fn_infoSave('${fntnBbsNextInfo.fntnSportSnPr}')" class="ul">
				[<c:out value="${fntnBbsNextInfo.fntnSportCnSeCodeNmPr}" />]&ensp;<c:out value="${fntnBbsNextInfo.sjPr}" /></a>
			</c:when>
			<c:otherwise>
				더이상 글이 없습니다
			</c:otherwise>
			</c:choose>
		</span>
		<span class="dat"><c:out value="${fntnBbsNextInfo.updtDtPr}" /></span>
	</div>
	<div class="row">
		<span class="tit">다음글</span>
		<span class="txt">
			<c:choose>
			<c:when test="${!empty fntnBbsNextInfo.fntnSportSnNx}">
				<a href="javascript:void(0);" onclick="fn_infoSave('${fntnBbsNextInfo.fntnSportSnNx}')" class="ul">
				[<c:out value="${fntnBbsNextInfo.fntnSportCnSeCodeNmNx}" />]&ensp;<c:out value="${fntnBbsNextInfo.sjNx}" /></a>
			</c:when>
			<c:otherwise>
				더이상 글이 없습니다
			</c:otherwise>
			</c:choose>
		</span>
		<span class="dat"><c:out value="${fntnBbsNextInfo.updtDtNx}" /></span>
	</div>
	<form id="reqForm" method="post">
			<%-- <input type="hidden" id="crudNextInfo" name="crudNextInfo" />
			<input type="hidden" id="fntnSportSn" name="fntnSportSn" />
			<input type="hidden" id="schCodeVal" name="schCodeVal" value="${param.schCodeVal}"/>
			<input type="hidden" id="schTxtVal" name="schTxtVal" value="${param.schTxtVal}"/> --%>
	</form>
</div>
<!-- //prev/next -->
</div>
<!-- content -->