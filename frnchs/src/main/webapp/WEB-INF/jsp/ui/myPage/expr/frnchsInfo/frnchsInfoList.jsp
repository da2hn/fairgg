<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/fran/promoList.js"/>"></script> --%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/frnchsInfoList.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})
</script>
<!-- content -->
		<div class="content">
			<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">프랜차이즈 정보</span></h5>
			<form id="searchForm" method="post">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
				<input type="hidden" name="frnchsNo" value="" />
				<input type="hidden" id="reqCrud" name="reqCrud" />
			</form>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="번호, 중분류 업종, 브랜드명, 주소로 구성된 표입니다.">
				<caption>프랜차이즈 관리</caption>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">중분류 업종</th>
					<th scope="col">프랜차이즈명</th>
					<th scope="col">본사명</th>
		<!-- 			<th scope="col">주소</th> -->
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="4">조회된 내용이 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
		
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
		
		<!-- 	<div class="mButton1 fLeft"> -->
		<!-- 		<a href="javascript:void(0)" id="btnCancel" class="mBtn1 primary">취소</a> -->
		<!-- 	</div> -->
		
		</div>
	</div>
</div>	
	<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
				<div class="swiper-wrapper">
				</div>
			</div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;">
				</ul>

				<ul id="mDataTbody" class="list_board hasCheck">
					<!-- <li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check0" id="temp_check0" class="hidden notxt">
								<label for="temp_check0"></label>
							</p>

							<a href="brandDensity.html" target="_blank">
								<p class="type"><span>외식</span>-<span>한식</span></p>
								<p class="subject">놀부부대찌개</p>
								<p class="nameDate">
									<span>
										<strong>창업비용</strong>
										999,999,999
									</span>

									<span>
										<strong>본사업력</strong>
										900년
									</span>

									<span>
										<strong>본사부채</strong>
										-9,999%
									</span>
								</p>
							</a>
						</div>
					</li>

					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check1" id="temp_check1" class="hidden notxt">
								<label for="temp_check1"></label>
							</p>
						
							<a href="brandDensity.html" target="_blank">
								<p class="type"><span>외식</span>-<span>한식</span></p>
								<p class="subject">원조감자탕</p>
								<p class="nameDate">
									<span>
										<strong>창업비용</strong>
										999,999,999
									</span>
						
									<span>
										<strong>본사업력</strong>
										900년
									</span>
						
									<span>
										<strong>본사부채</strong>
										-9,999%
									</span>
								</p>
							</a>
						</div>
					</li> -->
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
<!-- //content -->