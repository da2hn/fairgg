<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoSave.js"/>"></script>


	<!-- body -->
	<div class="body">
		<div class="bg">

			<!-- view -->
			<div class="mView1">
				<h4>위반사례 제목입니다.</h4>
				<div class="row util">
					<span class="tit">작성자</span>
					<span class="txt">홍길동</span>
					<span class="tit">등록일</span>
					<span class="txt">2020-11-01</span>
					<span class="tit">조회수</span>
					<span class="txt">125</span>
				</div>
				<div class="row article">
					위반사례 관련한 내용입니다.<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
				</div>
				<div class="row attach">
					<span class="tit">첨부파일</span>
					<div id="atchFileDiv"></div>
					<span class="att">
						<a href="###" class="ul">네이미 공모전.PNG</a>
						<a href="###" class="iDel">삭제</a>
					</span>
					<span class="att">
						<a href="###" class="ul">네이미 공모전.PNG</a>
						<a href="###" class="iDel">삭제</a>
					</span>
					<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>
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
			</div>
			<!-- //view -->
			<!-- reply -->
			<div class="mReply1">
				<h5>답변</h5>
				<div class="gTextarea">
					<textarea class="textarea" rows="5" placeholder="답변내용을 입력해주세요."></textarea>
				</div>
			</div>
			<!-- //reply -->
			<div class="mButton1 right">
				<a href="###" class="mBtn1 primary">답변달기</a>
				<a href="###" class="mBtn1">목록</a>
			</div>

		</div>
	</div>
	<!-- //body -->