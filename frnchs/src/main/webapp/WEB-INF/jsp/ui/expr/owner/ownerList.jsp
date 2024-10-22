<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/expr/ownerList.js"/>"></script>
<article id="expFranchise">
	<h3 class="subtitle forMo">나도 사장님!</h3>
		<div class="gTitle5">
			<div class="con1">
				<div class="bg">
					<h5 class="tit">경기도 체험형 창업지원</h5>
					<p class="info">"가맹본부와 가맹희망자간 상생협력 체험형 창업문화 조성"을 위해 도내 가맹본부 대상으로<br> 창업희망자의 체험형 창업을 지원하는 가맹본부를 모집 합니다.</p>
					<div class="gRt">
						<a href="javascript:void(0)" id="btnRegExpr" class="mBtn1 l2 orange"><span class="iPlus">가맹본사 참여하기</span></a>
					</div>
					<p class="tar forMo">
						<button class="flow" onclick="toggle_dimmed_view('layer_flow_exp');">체험형 창업 흐름도 보기</button>
					</p>
				</div>
			</div>
			<div class="con2">
				<div class="bg">
					<h6>체험형창업 흐름도</h6>
					<ul>
					<li>
						<div class="ti"><span>체험형 지원사업<br> 참여기업 모집</span></div>
						<div class="tx">道 (Pool구성)</div>
					</li>
					<li>
						<div class="ti"><span>대상여부<br> 검토&middot;결정</span></div>
						<div class="tx">道</div>
					</li>
					<li>
						<div class="ti"><span>협약체결</span></div>
						<div class="tx">참여기업 <span class="arr">道</span></div>
					</li>
					<li>
						<div class="ti"><span>가맹희망자<br> 가맹점운영 체험</span></div>
						<div class="tx">참여기업</div>
					</li>
					<li>
						<div class="ti"><span>가맹희망자<br> 창업완료</span></div>
						<div class="tx">참여기업 <span class="arr">道</span></div>
					</li>
					<li>
						<div class="ti"><span>지원여부<br> 판단 및 결정</span></div>
						<div class="tx">참여기업 <span class="arr">道</span></div>
					</li>
					</ul>
				</div>
			</div>
			<div class="layer_common layer_popup layer_flow_exp">
				<div class="titleArea">
					<h3>체험형 창업 흐름도</h3>
					<button class="close" onclick="toggle_dimmed_view('layer_flow_exp');">닫기</button>
				</div>
			
				<div class="inner scroll_y">
					<ul class="list_flow">
						<li>
							<dl class="box">
								<dt>체험형 지원사업 참여기업 모집</dt>
								<dd>道 (Pool 구성)</dd>
							</dl>
						</li>
			
						<li>
							<dl class="box">
								<dt>대상여부 검토&middot;결정</dt>
								<dd>道</dd>
							</dl>
						</li>
			
						<li>
							<dl class="box">
								<dt>협약체결</dt>
								<dd>참여기업<span class="arrow"></span>道</dd>
							</dl>
						</li>
			
						<li>
							<dl class="box">
								<dt>가맹희망자 가맹점운영 체험</dt>
								<dd>참여기업</dd>
							</dl>
						</li>
			
						<li>
							<dl class="box">
								<dt>가맹희망자 창업완료</dt>
								<dd>참여기업<span class="arrow"></span>道</dd>
							</dl>
						</li>
			
						<li>
							<dl class="box">
								<dt>지원여부 판단 및 결정</dt>
								<dd>참여기업<span class="arrow"></span>道</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
		</div>

<!-- body -->
	<div class="body">
		<div class="bg">
			<!-- module -->
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
				<input type="hidden" name="pageIndex" value="" />
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="reqCrud" name="reqCrud" />
				<input type="hidden" id="reqFrnchsNo" name="reqFrnchsNo" />
				<input type="hidden" id="reqExprnRegistNo" name="reqExprnRegistNo" />
			</form>
		<div class="mList2">
			<ul id="dataUl" class="forPc">
			</ul>
			<ul id="dataUlMob" class="forMo">
			</ul>
		</div>
	<!-- //module -->

	<!-- paging -->
	<div class="mPag forPc"></div>
	<div class="box_btn block h40 radius white more forMo"><button id="pagingMob"></button></div>
	<!-- //paging -->
</article>
	<div id="popupDiv"></div>
<%-- 	<jsp:include page="/WEB-INF/jsp/ui/common/govPopup.jsp"></jsp:include> --%>
	</div>
</div>
<!-- //body -->