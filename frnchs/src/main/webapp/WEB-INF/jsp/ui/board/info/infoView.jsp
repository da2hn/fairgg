<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoView.js"/>"></script>

	<!-- body -->
	<div class="body">
		<div class="bg">
			<!-- view -->
			<div class="mView1">
			<form id="dataForm" method="post" enctype="multipart/form-data">
			<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
			<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
			<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
			<input type="hidden" id="answerAt" name="answerAt" value="<c:out value="${param.answerAt}" />" />
			<input type="hidden" id="userNo" name="userNo" value="<c:out value="${fntnBbs.userNo}" />" />
			<input type="hidden" id="answrrUserNo" name="answrrUserNo" value="<c:out value="${fntnBbs.answrrUserNo}" />" />
			<input type="hidden" id="fntnSportSn" name="fntnSportSn" value="<c:out value="${fntnBbs.fntnSportSn}" />" />
			<input type="hidden" id="othbcAtVal" name="othbcAtVal" value="<c:out value="${fntnBbs.othbcAt}" />" />
			<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${fntnBbs.atchmnflNo}" />" />
				<h4><c:out value="${fntnBbs.sj}" /></h4>
				<div class="row util">
					<span class="tit">작성자</span>
					<span class="txt"><c:out value="${fntnBbs.userNm}" /></span>
					<span class="tit">등록일</span>
					<span class="txt"><c:out value="${fntnBbs.updtDt}" /></span>
					<span class="tit">조회수</span>
					<span class="txt"><c:out value="${fntnBbs.rdcnt}" /></span>
				</div>
				<div class="row article">
					<!-- 위반사례 관련한 내용입니다.<br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->
					<c:out value="${fntnBbs.cn}" />
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
			</form>
				<div class="row attach">
					<span class="tit">첨부파일</span>
					<div id="atchFileDiv"></div>
					<!-- <p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p> -->
				</div>
			</div>
			<!-- //view -->
		<form id="answerForm" method="post" enctype="multipart/form-data">
		<input type="hidden" id="answerFntnSportSn" name="answerFntnSportSn" value="<c:out value="${fntnBbs.fntnSportSn}" />" />
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
				<c:if test="${fntnBbs.userNo eq sessionScope.user.userNo}">
					<a href="javascript:void(0);" class="mBtn1 primary" id="btn_update">수정</a>
				</c:if>
				<c:if test="${fntnBbs.userNo eq sessionScope.user.userNo or '[ROLE_US04]' eq sessionScope.user.authorities}">
					<a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a>
				</c:if>
				
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_updateAnswer">답변달기</a>
				<a href="${contextPath}/board/info/infoList.do" class="mBtn1 primary">목록</a>
			</div>

		</div>
	</div>
	<!-- //body -->

