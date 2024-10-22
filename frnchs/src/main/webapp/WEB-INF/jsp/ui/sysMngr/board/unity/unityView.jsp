<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/unity/unityView.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<style>
.mView1.mPn1 .row .tit_down { background-image:url(../../../../../../static/images/ico_down1.png); }
</style>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
})
</script>
<article id="totalBoard" class="boardView"> 
	<!-- body -->
	<div class="body forPc">
		<div class="bg">
			<div class="warning">
				상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
				또한, 홈페이지를 통하여 불법유해 정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
			</div>
			<div class="mView1">
	 		<form id="dataForm" method="post" enctype="multipart/form-data">
				<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="${param.menuGroupCode}" />
				<input type="hidden" id="menuNm" name="menuNm" value="${param.menuNm}">
				<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
				<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
				<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
				<input type="hidden" id="userNo" name="userNo" value="<c:out value="${unityBbs.userNo}" />" />
				<input type="hidden" id="registUserNo" name="registUserNo" value="<c:out value="${unityBbs.registUserNo}" />" />
				<input type="hidden" id="answerUserNo" name="answerUserNo" value="<c:out value="${unityBbs.answerUserNo}" />" />
				<input type="hidden" id="fntnSportSn" name="fntnSportSn" value="<c:out value="${unityBbs.fntnSportSn}" />" />
				<input type="hidden" id="othbcAtVal" name="othbcAtVal" value="<c:out value="${unityBbs.othbcAt}" />" />
				<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${unityBbs.atchmnflNo}" />" />
					<h4><c:out value="${unityBbs.sj}" />
						&emsp;<span class="dt"><c:out value="${unityBbs.updtDt}" /></span>
					</h4>
					<div class="row article">
						<c:out value="${unityBbs.cn}" escapeXml="false" />
					</div>
			</form>
				<div class="row attach" id="atchFileBox">
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
						<c:when test="${!empty unityBbsNextInfo.snPr}">
							<a href="javascript:void(0);" onclick="fn_postView('${unityBbsNextInfo.snPr}')" class="ul">
							<c:out value="${unityBbsNextInfo.sjPr}" /></a>
						</c:when>
						<c:otherwise>
							더이상 글이 없습니다
						</c:otherwise>
						</c:choose>
					</span>
					<span class="dat"><c:out value="${unityBbsNextInfo.updtDtPr}" /></span>
				</div>
				<div class="row">
					<span class="tit tit_down">다음글</span>
					<span class="txt">
						<c:choose>
						<c:when test="${!empty unityBbsNextInfo.snNx}">
							<a href="javascript:void(0);" onclick="fn_postView('${unityBbsNextInfo.snNx}')" class="ul">
							<c:out value="${unityBbsNextInfo.sjNx}" /></a>
						</c:when>
						<c:otherwise>
							더이상 글이 없습니다
						</c:otherwise>
						</c:choose>
					</span>
					<span class="dat"><c:out value="${unityBbsNextInfo.updtDtNx}" /></span>
				</div>
				<form id="reqForm" method="post">
					<input type="hidden" name="masterSn" value="${param.masterSn}">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="sn" name="sn" value="<c:out value="${unityBbs.bbsSn}" />" />
					<input type="hidden" id="upperBbsSn" name="upperBbsSn" value=""/>
					<input type="hidden" id="reqBbsNm" name="bbsNm" value="${param.bbsNm}"/>
					<input type="hidden" name="answerAt" value="${param.answerAt}">
					<input type="hidden"  name="atchmnflAt" value="${param.atchmnflAt}">
					<input type="hidden" name="commentAt" value="${param.commentAt}">
				</form>
			</div>
			<!-- //prev/next -->

			<!-- 댓글 주석 22.06.21 -->
			<!-- <dl class="commentArea" style="display:none;">
				<dt>댓글 <strong id="commentCount">0</strong>건</dt>

				<dd class="write">
					<textarea name="upperComment" id="upperComment" class="w100p" palceholder="내용을 입력해주세요."></textarea>

					<div class="box_btn w112 h72 white3 fs15 medium"><button id="btn_comment_u">댓글쓰기</button></div>
				</dd>

				 <dd class="list">
					<ul id="coment_content"></ul>
				</dd>
			</dl> -->
			<!-- //댓글 -->
			<form id="updtForm" method="post">
				<input type="hidden" id="crudUpdt" name="crud">
				<input type="hidden" name="sn" value="${unityBbs.bbsSn}">
				<input type="hidden" name="sj" value="${unityBbs.sj}">
				<input type="hidden" name="cn" value='<c:out value="${unityBbs.cn}" escapeXml="false" />'>
				<input type="hidden" id="masterSn" name="masterSn" value="${param.masterSn}">
				<input type="hidden" id="bbsDc" name="bbsDc" value="${param.bbsDc}">
				<input type="hidden" id="bbsLc" name="bbsLc" value="${param.bbsLc}">
				<input type="hidden" id="bbsNm" name="bbsNm" value="${param.bbsNm}">
				<input type="hidden" id="atchmnflCo" name="atchmnflCo" value="${param.atchmnflCo}">
				<input type="hidden" id="answerAt" name="answerAt" value="${param.answerAt}">
				<input type="hidden" id="atchmnflAt" name="atchmnflAt" value="${param.atchmnflAt}">
				<input type="hidden" id="commentAt" name="commentAt" value="${param.commentAt}">
			</form>
			<div class="mButton1 right">
				
<!-- 				<div id="btn_answer" style="display:none;"><a href="#"  class="mBtn1 primary">답글</a></div> -->
				<div id="btn_list" style="display:inline-block;"><a href="#" class="mBtn1 primary">목록</a></div>
			</div>
			<!-- <div id="btnBox" style="display:none">
					<div id="btn_updt" style="display:inline-block;"><a href="#" class="mBtn1 primary">수정</a></div>
					<div id="btn_delete" style="display:inline-block;"><a href="#" class="mBtn1 primary">삭제</a></div>
				</div> -->
				
			<div class="mButton1 fLeft" id="btnBox" style="display:none">
				<div id="btn_updt" style="display:inline-block;"><a href="#" class="mBtn1 primary">수정</a></div>
				<div id="btn_delete" style="display:inline-block;"><a href="#" class="mBtn1 gray">삭제</a></div>
			</div>
		</div>
	</div>
	<!-- //body -->
	<%-- <h3 class="subtitle forMo">${param.bbsNm}</h3> --%>
	<h3 class="subtitle forMo">정보지원게시판</h3>
	
	<div class="fixTab">
		<!-- <div id="mobMenuDiv" class="swiper-container swiper_board forMo"> -->
		<div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
			<div class="swiper-wrapper">
			</div> 
		</div>
	</div>
	
	<div class="wrap_inner forMo">
		<div class="warning">
			상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치적 목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
			또한, 홈페이지를 통하여 불법유해정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
		</div>
		<div class="cateDate">
			<%-- <c:if test="${unityBbs.seCodeNm eq '공지'}">
				<p class="category notice">공지사항</p>
			</c:if>
			<c:if test="${unityBbs.seCodeNm ne '공지'}">
				<p style="margin-bottom:6px;color:#999;"><c:out value="${unityBbs.seCodeNm}" /></p>
			</c:if>
			 --%>
			<p class="date"><c:out value="${unityBbs.updtDt}" /></p>
		</div>
		<p class="subject" style="width:80%;"><c:out value="${unityBbs.sj}" /></p>
  
		<ul id="atchFileDivMob" class="attach">
		</ul>

		<div class="cont">
			<c:out value="${unityBbs.cn}" escapeXml="false" />
		</div>
		
		<!-- 댓글 주석 22.06.21-->
		<!-- <dl class="commentArea">
			<dt>댓글 <strong id="commentCountMob">0</strong>건</dt>

			<dd class="write">
				<textarea name="" id="upperCommentMob" class="w100p radius" placeholder="내용을 입력해주세요."></textarea>

				<div class="box_btn h55 radius fs12 medium"><button id="btn_comment_m">댓글쓰기</button></div>
			</dd>

			<dd class="list">
				<ul id="coment_contentMob"></ul>
			</dd>
		</dl> -->
			<div class="btn_col2 col2" id="btnBoxMob" style="text-align:center;margin-top:20px;margin-bottom:30px;/* border-top:1px solid #ddd; */">
				<div class="box_btn w150 h40 radius" style="margin-left:5px;border-top:0px;">
					<button id="btn_updtMob" style="width:90%">수정</button>
				</div>
				
				<div class="box_btn w150 h40 radius gray" style="margin-right:5px;border-top:0px;">
					<button id="btn_deleteMob" style="width:90%">삭제</button>
				</div>
			</div>
		
		<div class="box_btn block h40 radius white" id="btn_listMob" style="border-top:0px"><button>목록</button></div>
	</div>
</article>	
