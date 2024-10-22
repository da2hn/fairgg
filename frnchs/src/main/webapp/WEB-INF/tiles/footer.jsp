<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<style>
#content-footer.footer .open-license{
	display: table;
	box-sizing: border-box;
	width: 1180px;
	margin: 20px auto;
	padding: 10px;
	border: 1px solid #DFDFDF;
}
#content-footer.footer .section1,
#content-footer.footer .section2{
	display: table-cell;
	box-sizing: border-box;
	font-size: 14px;
	vertical-align: middle;
	overflow: hidden;
}
#content-footer.footer .section1:after,
#content-footer.footer .section2 dl:after,
#content-footer.footer .section2 dd:after{
    display: block;
    clear: both;
    height: 0;
	font-size: 0;
    content: "";
}
#content-footer.footer .section1{
	width: 55%;
	border-right: 1px solid #b0b0b0;
	padding-right: 1%;
	white-space: nowrap;
}
#content-footer.footer .section1 > a,
#content-footer.footer .section1 > p{
	display: inline-block;
	margin: 0 0 0 15px;
	vertical-align: middle;
	white-space: normal;
}
#content-footer.footer .section1 > a{ max-width: 180px }
#content-footer.footer .section1 > a > img{ width: 100% }
#content-footer.footer .section2{
	width: 45%;
/* 	padding: 13px 0 0; */
}
#content-footer.footer .section2 dl{ padding: 0 25px }
#content-footer.footer .section2 dl:first-child{ margin-bottom: 10px }
#content-footer.footer .section2 dt{
	float: left;
	min-width: 50px;
	min-height: 22px;
	margin-right: 10px;
	padding: 0 8px;
	border-radius: 4px;
	background-color: #7A8BB6;
	text-align: center;
	font-weight: 400;
	color: #FFF;
}
#content-footer.footer .section2 dd{
	float: left;
	min-height: 22px;
    font-weight: 400;
}
#content-footer.footer .section2 dd.float-right{ float: right }
#content-footer.footer .section2 dd > a{
    display: inline-block;
    background: url('/static/images/ico-openLicense-tel.png') no-repeat;
    padding-left: 30px;
    background-size: auto 100%;
}
#content-footer.footer .section2 dd > a:hover{  color: #333 }

.open-license a {
	margin: 0 0 0 15px;
	display: inline-block;
}

.open-license .open-banner {
	display: inline-block;
	margin: 0;
	vertical-align: middle;
	max-width: 180px;
}

.open-license .open-text {
	display: inline-block;
	margin: 0 0 0 15px;
	vertical-align: middle;
	white-space: normal;
}

.open-license a:hover {
	color:#444;
	text-decoration: none;
}

.open-license .open-text strong:hover,
.open-license .open-text strong:focus,
.open-license .open-text strong:active {
	color: #059;
	text-decoration: underline;
}

#selectFamilySiteMob {position:relative;}
#selectFamilySiteMob {position:relative; min-width:118px; height:26px; padding:0 20px 0 8px; color:#f8a80f; background:#fff; line-height:26px; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box;}
/* #selectFamilySiteMob {display:block; position:absolute; top:50%; right:8px; width:6px; height:4px; margin-top:-1px; background:url('../images/arrow_bottom_yl.svg') no-repeat center/100% auto; content:'';} */ */

img {max-width:100%;height:auto;}

.footer{height:285px;}
</style>
<script>
function toFamilySite(){
	var url = $('#selectFamilySiteMob option:selected').val();
	if (typeof (window.open) == "function") { window.open(url); } else { window.location.href = url; }
}
</script>
	<!-- s : 푸터 -->
	<footer id="footer">
		<div id="content-footer" class="footer forPc">
			<div class="open-license">
				<div class="section1">
					<div class="gg-resetbox"> <!-- 스타일시트 초기화 용도로 사용. -->
						<a href="http://www.kogl.or.kr/info/license.do" target="_blank" title="공공누리 대표사이트 새창 이동">
							<span class="open-banner">
								<img src="/static/images/img_opentype01.jpg" alt="공공누리 공공저작물 자유이용허락 제 3유형 출처표시 + 변경금지" width="245px">
							</span>
							<p class="open-text">
								이 게시물은
								"<strong>공공누리 제 3유형(출처표시 + 변경금지)</strong>"
								<br>
								조건에 따라 자유롭게 이용이 가능합니다.
							</p>
						</a>
					</div>
				</div>

				<div class="section2">
					<dl>
						<dt>실•국</dt>
						<!-- <dd>공정국</dd> -->
						<dd>경제실</dd>
					</dl>
					<dl>
						<dt>부서명</dt>
						<dd>공정경제과</dd>
						<!-- <dd class="float-right"><a class="tel-link" href="tel:031-8008-5553" title="부서전화연결">031-8008-5553</a></dd> -->
						 <dd class="float-right"><a class="tel-link" href="tel:031-8008-2293" title="부서전화연결">031-8008-2293</a></dd>
					</dl>
				</div>
			</div>
			<div class="con1">
				<div class="bg">
					<a href="https://www.gg.go.kr/contents/contents.do?ciIdx=1077&menuId=2771"><span class="txtEm1">개인정보처리방침</span></a>
					<a href="/main/law.do">법적고지</a>
<!-- 					<a href="/main/privacy.do">개인정보처리방침</a> -->
					<div class="gRt">
						<a href="#top" class="iTop">TOP</a>
					</div>
				</div>
			</div>
			<div class="con2">
				<div class="bg">
					<!-- modify20210306 -->
					<%-- 경기도청 홈페이지 새창 이동 - 21.03.16 --%>
					<div class="logo">
						<a href="https://www.gg.go.kr/" target="_blank" title="경기도청 홈페이지 새창 이동">
<!-- 							<img src="/static/images/logo_footer2.png" alt="새로운 경기 공정한 세상"> -->
							<img src="/static/images/logo_footer2_new1.png" alt="새로운 경기 공정한 세상">
						</a>
					</div>
<!-- 					<div class="txt"> -->
<!-- 						경기도청 16444 수원시 팔달구 효원로 1 (매산로3가) / 북부청사 11780 의정부시 청사로 1 / 경기도 콜센터 031-120<br> -->
<!-- 						&copy; GYEONGGI PROVINCE All Rights Reserved. -->
<!-- 					</div> -->
					<div class="txt">
						경기도청 16508 수원시 영통구 도청로 30 (이의동) / 북부청사 11780 의정부시 청사로 1 / 경기도 콜센터 031-120<br>
						&copy; GYEONGGI PROVINCE All Rights Reserved.
					</div>
					<!-- //modify20210306 -->
					<div class="gRt">
						<select class="select" id="selectFamilySite">
							<option value="">FAMILY SITE</option>
							<option value="https://www.gg.go.kr/">경기도청</option>
							<option value="https://www.gmr.or.kr/">경기도시장상권진흥원</option>
							<option value="https://www.gcon.or.kr/">경기콘텐츠진흥원</option>
							<option value="https://www.gcgf.or.kr/gcgf/index.do">경기신용보증재단</option>
							<option value="https://www.gg.go.kr/ubwutcc-main">경기공정거래지원센터</option>
							<option value="https://www.gg.go.kr/gg_info_center">경기소비자정보센터</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		
		<div class="forMo">
			<div class="menu">
				<ul>
					<li><a href="/main/law.do">법적고지</a></li>
					<li><a href="https://www.gg.go.kr/contents/contents.do?ciIdx=1077&menuId=2771"><strong>개인정보취급방침</strong></a></li>
				</ul>

				<div class="gRt select_type">
					<select class="select radius famSite" id="selectFamilySiteMob" onchange="toFamilySite();" 
					style="background: url('../../../static/images/arrow_bottom_yl.svg')no-repeat right/8% auto;position: relative;min-width: 120px;width: 10rem;height: 26px;padding: 0 20px 0 8px;color: #f8a80f;background-color: #fff;line-height: 26px;border: 0;font-size: 12px;background-position: 92% 50%;">
						<option value="">FAMILY SITE</option>
						<option value="https://www.gg.go.kr/">경기도청</option>
						<option value="https://www.gmr.or.kr/">경기도시장상권진흥원</option>
						<option value="https://www.gcon.or.kr/">경기콘텐츠진흥원</option>
						<option value="https://www.gcgf.or.kr/gcgf/index.do">경기신용보증재단</option>
						<option value="https://www.gg.go.kr/ubwutcc-main">경기공정거래지원센터</option>
						<option value="https://www.gg.go.kr/gg_info_center">경기소비자정보센터</option>
					</select>
				</div>
				<!-- <dl class="select_type radius">
					<dt>FAMILY SITE</dt>

					<dd>
						<a href="https://www.gg.go.kr/" target="_blank">경기도청</a>
						<a href="https://www.gmr.or.kr/" target="_blank">경기도시장상권진흥원</a>
						<a href="https://www.gcon.or.kr/" target="_blank">경기콘텐츠진흥원</a>
						<a href="https://www.gcgf.or.kr/gcgf/index.do" target="_blank">경기신용보증재단</a>
						<a href="https://www.gg.go.kr/ubwutcc-main" target="_blank">경기공정거래지원센터</a>
						<a href="https://www.gg.go.kr/gg_info_center" target="_blank">경기소비자정보센터</a>
					</dd>
				</dl> -->
			</div>

			<address>
				<dl>
					<dt>경기도청주소</dt>
					<dd>16444 수원시 팔달구 효원로 1 (매산로3가)</dd>
				</dl>

				<dl>
					<dt>북부청사주소</dt>
					<dd>11780 의정부시 청사로 1</dd>
				</dl>

				<dl>
					<dt>경기도콜센터</dt>
					<dd><a href="tel:031-120">031-120</a></dd>
				</dl>
			</address>

			<div class="copy">
				<h5><a href="/">가맹정보제공시스템</a></h5>

				<p>Copyright (c) 2021 GYEONGGI PROVINCE All Rights Reserved.</p>
			</div>
		</div>
	</footer>	
	<!-- e : 푸터 -->	
	<div id="dimmed"></div>
	<!-- menu -->
	<input type="checkbox" id="hamburger">
	<label for="hamburger">
		<span></span>
		<span></span>
		<span></span>
	</label>
	<!-- //menu -->
	<!-- e : 탭 -->
	<%-- 
		메인화면 텝 영억 팝업으로 대체 - 21.03.18
		복구 하되 특정 기간 동안까지만 - 21.03.22 
	--%>
	<c:set var="pathName" value="${fn:split(requestScope['javax.servlet.forward.servlet_path'],'/')[0]}" />
	<c:if test="${ pathName == 'main'}">
		<c:set var="today" value="<%=new java.util.Date()%>"/>
		<fmt:parseDate value="202102170000" pattern="yyyyMMddHHmm" var="startDate" />
		<fmt:parseDate value="202106302359" pattern="yyyyMMddHHmm" var="endDate" />
		<c:if test="${startDate < today && endDate > today}">
			<!-- popup -->
			<div id="jsPopup3" class="mPopup3">
				<div class="con"><img src="/static/images/img_popup1_1.png" alt=""></div>
				<div class="mButton1">
					<a href="#jsPopup3" class="mBtn1 primary jsBtnClose1">확인</a>
					<a href="#jsPopup3" class="mBtn1 gray jsBtnClose1">닫기</a>
				</div>
			</div>
			<!-- //popup -->
		</c:if>
	</c:if>