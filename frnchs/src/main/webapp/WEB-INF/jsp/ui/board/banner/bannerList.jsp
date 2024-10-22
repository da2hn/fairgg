<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/bannerList.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
})
</script>
<head>
<style type="text/css">
/* 배너광장 슬라이드 참고 퍼옴 https://www.customs.go.kr/kcs/bannerList.do?mi=7428 */
.box_bn_list {position:relative; margin-top:15px; background-color: white;}
.box_bn_list ul {overflow:hidden;}
.box_bn_list ul li {width:33.3%; float:left;}
.box_bn_list ul li a {display:block; margin:5px; height:100px; line-height:25px; padding:12px; text-align:center;  text-decoration:none; border:1px solid #d3d3d3; background:url("/images/common/con_com/bn_link.png") no-repeat right top; -webkit-transition:all 0.3s ease; -moz-transition:all 0.3s ease; -ms-transition:all 0.3s ease; transition:all 0.3s ease;}
.box_bn_list ul li a span { display:block; color:#333; border-bottom:1px dashed #666; margin:0 0 10px; padding:0 15px 10px 0; text-align:left; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;}/* 200110 */
.box_bn_list ul li a img {width:auto; height:46px}
.box_bn_list ul li a:hover, .box_link_list ul li a:focus {color:#053863; font-family:"NotoM"; border:1px solid #053863; background-position:98% top;}
</style>
</head>

<!-- body -->
<article id="bannerPlaza">
<div class="body">
	<div class="bg">
		<h3 class="tit1 forPc">배너광장</h3>
		<h3 class="subtitle forMo">배너광장</h3>
		<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U05" />
		<input type="hidden" id="menuNm" name="menuNm" value="배너광장">
		<div class="fixTab"><div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
		<div class="box_bn_list">
			<ul class="link_list_w30">

					<li><p><a href="https://www.mybudget.go.kr" target="_blank" title="국민참여예산(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>국민참여예산</span><img src="/static/images/banner/img_9dabf769-98b1-48de-8a76-77600abb66721611904646583.jpg" alt="국민참여예산"></a></p></li>

					<li><p><a href="http://knewdeal.go.kr" target="_blank" title="대한민국대전환 한국판뉴딜(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>대한민국대전환 한국판뉴딜</span><img src="/static/images/banner/img_304f2f9d-9546-4bdf-a3ec-9472921f13691609998852838.png" alt="대한민국대전환 한국판뉴딜"></a></p></li>

					<li><p><a href="http://www.gov.kr/portal/main" target="_blank" title="정부24(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>정부24</span><img src="/static/images/banner/img_afa35e5f-8e07-4578-ba16-34f9a39bc4531604464394312.gif" alt="정부24"></a></p></li>

					<li><p><a href="http://www.mpm.go.kr/proactivePublicService/" target="_blank" title="적극행정(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>적극행정</span><img src="/static/images/banner/img_2025ebba-1ae1-4799-a9ac-ed6a10e348e01599034276647.gif" alt="적극행정"></a></p></li>

					<li><p><a href="http://www.kdic.or.kr/customer/hide_info.do" target="_blank" title="은닉재산 신고센터(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>은닉재산 신고센터</span><img src="/static/images/banner/img_e2eedb2b-f1d3-47e3-869a-511765c01e241588727898550.jpg" alt="은닉재산 신고센터"></a></p></li>

					<li><p><a href="http://koreanwar70.go.kr" target="_blank" title="2020년 6.25전쟁 70주년 기념(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>2020년 6.25전쟁 70주년 기념</span><img src="/static/images/banner/img_3f726721-6864-4384-a8b5-db7949ee32ae1586241397722.jpg" alt="2020년 6.25전쟁 70주년 기념"></a></p></li>

					<li><p><a href="https://www.consumer.go.kr" target="_blank" title="행복드림 열린소비자포털(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>행복드림 열린소비자포털</span><img src="/static/images/banner/img_e468965c-e965-4143-af70-164d17381aea1577672897217.png" alt="행복드림 열린소비자포털"></a></p></li>

					<li><p><a href="https://blog.naver.com/kfdazzang/221380780260" target="_blank" title="당신의 건강을 위협합니다.(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>당신의 건강을 위협합니다.</span><img src="/static/images/banner/img_b2e0b367-bbfa-4149-bcd0-aa23a1e4fa811572403363454.png" alt="당신의 건강을 위협합니다."></a></p></li>

					<li><p><a href="http://www.easylaw.go.kr/CSP/Main.laf" target="_blank" title="생활법령정보(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>생활법령정보</span><img src="/static/images/banner/img_f3a81b1a-892a-4252-99a3-201f05c7dbd01572403279082.png" alt="생활법령정보"></a></p></li>

					<li><p><a href="http://www.acrc.go.kr/acrc/board.do?command=searchDetail&amp;menuId=05020709&amp;method=searchDetailViewInc&amp;boardNum=71085&amp;currPageNo=1&amp;confId=145&amp;conConfId=145&amp;conTabId=0&amp;conSearchCol=BOARD_TITLE&amp;conSearchSort=A.BOARD_REG_DATE+DESC%2C+BOARD_NUM+DESC" target="_blank" title="이제 변호사를 통해서 공익신고가 가능합니다.(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>이제 변호사를 통해서 공익신고가 가능합니다.</span><img src="/static/images/banner/img_cdd4e286-3f1a-4f25-bddd-16440c7a56731572403255237.png" alt="이제 변호사를 통해서 공익신고가 가능합니다."></a></p></li>

					<li><p><a href="https://clean.go.kr" target="_blank" title="청렴포털(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>청렴포털</span><img src="/static/images/banner/img_56248429-c749-4859-86e5-7102eb20003e1572403234008.png" alt="청렴포털"></a></p></li>

					<li><p><a href="http://www.index.go.kr" target="_blank" title="나라지표(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>나라지표</span><img src="/static/images/banner/img_39e5ee96-07ec-4ce9-8669-eb8ff3242cb51572403201373.png" alt="나라지표"></a></p></li>

					<li><p><a href="https://insupport.or.kr/unfair/main.php" target="_blank" title="인천광역시 공정거래지원센터(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>인천광역시 공정거래지원센터</span><img src="/static/images/banner/img_20200115153234-2d6b0d5dcc.png" alt="인천광역시 공정거래지원센터"></a></p></li>
					<li><p><a href="http://www.ikfa.or.kr/" target="_blank" title="한국프랜차이즈산업협회(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>한국프랜차이즈산업협회</span><img src="/static/images/banner/img_20210303_01.png" alt="한국프랜차이즈산업협회"></a></p></li>
					<li><p><a href="http://www.franchisee.kr/wp/" target="_blank" title="(사)전국가맹점주협의회(새창으로 이동됩니다.)" class="bn_link" rel="noopener noreferrer"><span>(사)전국가맹점주협의회</span><img src="/static/images/banner/img_20210303_02.png" alt="(사)전국가맹점주협의회"></a></p></li>

			</ul>
		</div>
	</div>
</div>
</article>
<!-- //body -->