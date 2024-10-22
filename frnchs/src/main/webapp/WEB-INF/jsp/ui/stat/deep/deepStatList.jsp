<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/stat/stat.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
})
</script>
	<!-- body -->
	<div class="body forPc">
		<div class="bg">

			<!-- module -->
			<div class="mSub13">
				<div class="gLeft">
					<div class="im"><img src="/static/images/img_sub3_1_4.png" style="width: 190px;height:38px;padding-top:5px;margin-bottom:6px" alt="새로운 경기 공정한 세상"></div>
					<div class="ti">경기도<br> 상권영향분석 시스템</div>
					<div class="tx">경기도의 상세한 상권분석을 하실 수 있습니다.</div>
					<a href="https://sbiz.gmr.or.kr/main.do" target="_blank" class="mBtn1 primary">서비스 바로가기</a>
				</div>
				<div class="gRight">
					<div class="im"><img src="/static/images/img_sub3_1_3.svg" alt="소상공인시장진흥공단 상권분석서비스"></div>
					<div class="ti">소상공인시장진흥공단<br>상권분석시스템</div>
					<div class="tx">소상공인시장진흥공단의 상세한 상권분석을 하실 수 있습니다.</div>
					<a href="http://sg.sbiz.or.kr/godo/index.sg" target="_blank" class="mBtn1 primary">서비스 바로가기</a>
				</div>
			</div>
			<!-- //module -->


		</div>
	</div>
	<article id="deepenAnalysis">
		<div class="bg">
			<h3 class="subtitle forMo">상권심화분석</h3>
			<div class="wrap_inner forMo">
			<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U05" />
			<input type="hidden" id="menuNm" name="menuNm" value="상권심화분석">
				<div class="fixTab"><div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
				<div class="mSub13">
					<div class="gLeft">
						<div class="im"><img src="../../../../../static/images/img_sub3_1_4.png" alt="새로운 경기 공정한 세상"></div>
						<div class="ti">경기도<br> 상권영향분석 시스템</div>
						<div class="tx">경기도의 상세한 상권분석을 하실 수 있습니다.</div>
						<a href="https://sbiz.gmr.or.kr/main.do" target="_blank" class="mBtn1 primary">서비스 바로가기</a>
					</div>

					<div class="gRight">
						<div class="im"><img src="../../../../../static/images/img_sub3_1_3.svg" alt="소상공인시장진흥공단 상권분석서비스"></div>
						<div class="ti">소상공인시장진흥공단<br> 상권분석시스템</div>
						<div class="tx">소상공인시장진흥공단의 상세한 상권분석을 하실 수 있습니다.</div>
						<a href="http://sg.sbiz.or.kr/godo/index.sg" target="_blank" class="mBtn1 primary">서비스 바로가기</a>
					</div>
				</div>
			</div>
		</div>
	</article>
	<!-- //body -->