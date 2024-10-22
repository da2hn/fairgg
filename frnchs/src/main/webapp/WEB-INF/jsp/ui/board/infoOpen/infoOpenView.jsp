<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoOpenView.js"/>"></script>


	<!-- body -->
	<div class="body">
		<div class="bg">

			<!-- view -->
			<!--
			<div class="mView1">
				<h4>[시스템 안내] 익스플로러 11에서 서비스 이용방법 안내 <span class="dt">2020-11-01</span></h4>
				<div class="row article">
					한식 업종 프랜차이즈 추천해주세요.<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
				</div>
				<div class="row attach">
					<span class="tit">첨부파일</span>
					<span class="att">
						<a href="###" class="ul">네이미 공모전.PNG</a>
						<a href="###" class="iDel">삭제</a>
					</span>
				</div>
			</div>
			-->
			<div class="mView1">
			<form id="dataForm" method="post" enctype="multipart/form-data">
			<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
			<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
			<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
			<input type="hidden" id="userNo" name="userNo" value="<c:out value="${infoOpenBbs.userNo}" />" />
			<input type="hidden" id="answrrUserNo" name="answrrUserNo" value="<c:out value="${infoOpenBbs.answrrUserNo}" />" />
			<input type="hidden" id="fntnSportSn" name="fntnSportSn" value="<c:out value="${infoOpenBbs.fntnSportSn}" />" />
			<input type="hidden" id="othbcAtVal" name="othbcAtVal" value="<c:out value="${infoOpenBbs.othbcAt}" />" />
			<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${infoOpenBbs.atchmnflNo}" />" />
				<h4>[<c:out value="${infoOpenBbs.infoOthbcSeCodeNm}" />]
					&ensp;<c:out value="${infoOpenBbs.sj}" />
					&emsp;<span class="dt"><c:out value="${infoOpenBbs.updtDt}" /></span>
				</h4>
				<div class="row article">
					<c:out value="${infoOpenBbs.cn}" escapeXml="false" />
				</div>
			</form>
				<div class="row attach">
					<span class="tit">첨부파일</span>
					<div id="atchFileDiv"></div>
				</div>
			</div>
			<!-- //view -->

			<!-- prev/next -->
			<div class="mView1 mPn1">
				<div class="row">
					<span class="tit">이전글</span>
					<span class="txt">
						<c:choose>
						<c:when test="${!empty infoOpenBbsNextInfo.infoOthbcSnPr}">
							<a href="javascript:void(0);" onclick="fn_infoOpenView('${infoOpenBbsNextInfo.infoOthbcSnPr}')" class="ul">
							[<c:out value="${noticeBbsNextInfo.infoOthbcSeCodeNmPr}" />]&ensp;<c:out value="${infoOpenBbsNextInfo.sjPr}" /></a>
						</c:when>
						<c:otherwise>
							더이상 글이 없습니다
						</c:otherwise>
						</c:choose>
					</span>
					<span class="dat"><c:out value="${infoOpenBbsNextInfo.updtDtPr}" /></span>
				</div>
				<div class="row">
					<span class="tit">다음글</span>
					<span class="txt">
						<c:choose>
						<c:when test="${!empty infoOpenBbsNextInfo.infoOthbcSnNx}">
							<a href="javascript:void(0);" onclick="fn_infoOpenView('${infoOpenBbsNextInfo.infoOthbcSnNx}')" class="ul">
							[<c:out value="${infoOpenBbsNextInfo.infoOthbcSeCodeNmNx}" />]&ensp;<c:out value="${infoOpenBbsNextInfo.sjNx}" /></a>
						</c:when>
						<c:otherwise>
							더이상 글이 없습니다
						</c:otherwise>
						</c:choose>
					</span>
					<span class="dat"><c:out value="${noticeBbsNextInfo.updtDtNx}" /></span>
				</div>
				<form id="reqForm" method="post">
						<input type="hidden" id="crud" name="crud" />
						<input type="hidden" id="infoOthbcSn" name="infoOthbcSn" />
						<input type="hidden" id="schCodeVal" name="schCodeVal" value="${param.schCodeVal}"/>
						<input type="hidden" id="schTxtVal" name="schTxtVal" value="${param.schTxtVal}"/>
				</form>
			</div>
			<!-- //prev/next -->

			<div class="mButton1 right">
				<a href="${contextPath}/board/infoOpen/infoOpenList.do" class="mBtn1 primary">목록</a>
			</div>

		</div>
	</div>
	<!-- //body -->

