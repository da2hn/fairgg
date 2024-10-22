<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/surv/survInfo.js"/>"></script>
<!-- body -->

<article id="survey">
	<h3 class="subtitle forMo">실태조사게시판</h3>
			
	<div class="body">
		<div class="bg">
			<!-- module -->
			<div class="mSurvey">
				<input type="hidden" id="qustnrSn" value="${qustnrSn}" />
				<!-- add20210306 -->
				<div class="info">
					실태설문조사에 참여를 부탁드립니다.<br>
					참여하신 설문조사는 공정경제 발전 및 상생협력 문화조성을 위한  자료로 사용하겠습니다.<br>
					많은 참여 부탁드립니다.
				</div>
				<!-- //add20210306 -->
				<ul id="listUl">
					<li>
						<p style="text-align:center;padding-bottom:0px;padding-top:70px" >현재 진행중인 설문이 없습니다.</p>
					</li>
				</ul>
			</div>
			<!-- //module -->
		</div>
		<div class="mButton1 center forPc" style="margin-top: 40px;">
			<a href="javascript:void(0)" id="btnSurvSave" class="mBtn1 primary btnSurv" style="display:none;">보내기</a>
			<a href="/surv/surv/survInfo.do" id="btnSurvCancel" class="mBtn1 gray btnSurv" style="display:none;">취소</a>
		</div>
		<div class="btn_col col2 forMo" style="margin:30px 15px 0px 15px">
			<div class="box_btn block h40 radius btnSurv" style="width:47%;margin-right:6%;"><button id="btnSurvSaveMob" style="display:none;">보내기</button></div>
			<div class="box_btn block h40 radius gray btnSurv" style="width:47%;" onclick="location.href='/surv/surv/survInfo.do?val=${qustnrSn}'"><button id="btnSurvCancelMob" style="display:none;">취소</button></div>
		</div>
	</div>
</article>
<!-- //body -->