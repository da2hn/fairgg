<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/tradeList.js"/>"></script>


<head>
<style type="text/css">

</style>
</head>

<article id="storeTransfer">
	<h3 class="subtitle forMo">점포양수도 지원</h3>
	<div class="gTitle5 type3">
		<div class="con1">
			<div class="bg">
				<h5 class="tit">경기도 점포양수도지원</h5>
				<p class="info">허위매물 근절 및 사기 피해예방을 위하여 점포매물 등록시 전문가(공인중개사 등)의<br> 사전 매물확인을 거쳐 실제 매물만 등록합니다.</p>
				<div class="gRt">
					<a href="javascript:void(0);" class="mBtn1 l2 orange" id="btn_tradeSavePage"><span class="iPlus">매물점포 등록</span></a>
				</div>
				
				<p class="tar forMo">
					<button class="flow" onclick="toggle_dimmed_view('layer_flow_sale');">매물등록 흐름도 보기</button>
				</p>
			</div>
			<div class="layer_common layer_popup layer_flow_sale">
					<div class="titleArea">
						<h3>매물등록 흐름도</h3>
						<button class="close" onclick="toggle_dimmed_view('layer_flow_sale');">닫기</button>
					</div>

					<div class="inner scroll_y">
						<ul class="list_flow">
							<li>
								<dl class="box">
									<dt>점포&middot;매물 등록신청</dt>
									<dd>소상공인</dd>
								</dl>
							</li>

							<li>
								<dl class="box">
									<dt>대상여부 검토&middot;결정</dt>
									<dd>전문가</dd>
								</dl>
							</li>

							<li>
								<dl class="box">
									<dt>매물등록 신청확인</dt>
									<dd>전문가<span class="arrow"></span>소상공인</dd>
								</dl>
							</li>

							<li>
								<dl class="box">
									<dt>플랫폼 매물등록</dt>
									<dd>관리자</dd>
								</dl>
							</li>

							<li>
								<dl class="box">
									<dt>매물 매매 의사 신청</dt>
									<dd>매수희망자<span class="arrow"></span>道</dd>
								</dl>
							</li>

							<li>
								<dl class="box">
									<dt>매도자 연락처 공개여부 결정</dt>
									<dd>道<span class="arrow"></span>소상공인</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
		</div>
		<div class="con2">
			<div class="bg">
				<h6>매물등록 흐름도</h6>
				<ul>
				<li>
					<div class="ti"><span>점포&middot;매물<br> 등록신청</span></div>
					<div class="tx">소상공인</div>
				</li>
				<li>
					<div class="ti"><span>대상여부<br> 검토&middot;결정</span></div>
					<div class="tx">전문가</div>
				</li>
				<li>
					<div class="ti"><span>매물등록<br> 신청확인</span></div>
					<div class="tx">전문가 <span class="arr">소상공인</span></div>
				</li>
				<li>
					<div class="ti"><span>플랫폼<br> 매물등록</span></div>
					<div class="tx">관리자</div>
				</li>
				<li>
					<div class="ti"><span>매물 매매<br> 의사 신청</span></div>
					<div class="tx">매수희망자 <span class="arr">道</span></div>
				</li>
				<li>
					<div class="ti"><span>매도자 연락처<br> 공개여부 결정</span></div>
					<div class="tx">道 <span class="arr">소상공인</span></div>
				</li>
				</ul>
			</div>
		</div>
		
	</div>

	<!-- body -->
	<div class="body">
		<div class="bg">

			<form id="reqForm" method="post">
				<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
				<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
				<input type="hidden" id="crud" name="crud" />
				<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
				<input type="hidden" id="confmSttusCode" name="confmSttusCode" />
			</form>
			<form id="searchForm" method="post" onsubmit="return false;">
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="pageIndexMob" value="" />
			<input type="hidden" name="pageIndexMobMax" value="" />
			<input type="hidden" id="schSidoTxt" name="schSidoTxt" />
			<input type="hidden" id="schSignguTxt" name="schSignguTxt" />
			<div class="mSort2">
				<!-- col -->
				<div class="col w1">
					<label class="ti">시/도</label>
					<select title="시도" class="select" id="schSido" name="schSido" >
					</select>
				</div>
				<!-- //col -->
				<!-- col -->
				<div class="col w2">
					<label class="ti">지역</label>
					<select title="시군구" class="select" id="schSigngu" name="schSigngu" style="border-right:1px solid #d2d4db">
						<option value="">시군구</option>
					</select>
				</div>
				<!-- //col -->
				<!-- col -->
				<!--
				<div class="col w3">
					<div class="ti">업종</div>
					<div class="mSelect1">
						<a href="#" class="sel">한식</a>
						<div class="selList">
							<a href="#">한식</a>
						</div>
					</div>
				</div>
				 -->
				<!-- //col -->
				<!-- col -->
				<!--
				<div class="col w4">
					<div class="ti">양도비용</div>
					<div class="mSelect1">
						<a href="#" class="sel">5,000만원 이하</a>
						<div class="selList">
							<a href="#">5,000만원 이하</a>
						</div>
					</div>
				</div>
				 -->
				<!-- //col -->
				<a href="javascript:fn_selectTradeList();" class="mBtn1" id="btn_sch">검색</a>
		<!-- 		<a href="javascript:fn_selectTradeList();" class="mBtn1 forMo" id="btn_schMob">검색</a> -->
			</div>
			</form>

			<div class="mSort3">
				<!-- <div class="count"><span>총 8 개의 매물</span></div> -->
				<div class="count" id="totalCnt"></div>
				<!--
				<div class="gRt">
					<select class="select w1" title="분류">
					<option>최근등록순</option>
					</select>
				</div>
				-->
			</div>

			<!-- module -->
			<div class="mList2">
				<ul id="dataTbody" class="forPc">
				</ul>
				<ul id="dataTbodyMob" class="forMo">
				</ul>
			</div>
			<!-- //module -->

			<!-- paging -->
			<div class="mPag forPc"></div>
			<div class="box_btn block h40 radius white more forMo"><button id="pagingMob"></button></div>
			<!-- //paging -->


		</div>
	</div>
</article>
	<!-- //body -->
	<div id="popupDiv">
		<jsp:include page="/WEB-INF/jsp/ui/common/govPopup.jsp"></jsp:include>
	</div>
