<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/reward/rewardInfo.js"/>"></script>
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
			<h5 class="mTitle2">프랜차이즈 본사 상벌 관리</h5>
			<!-- write -->
			<div class="mBoard1 mWrite1">
				<form id="reqForm" method="post">
					<input type="hidden" id="hedofcNo" name="hedofcNo" value="${dataList.hedofcNo }" />
				</form>
				<form id="dataForm" method="post">
					<input type="hidden" id="hedofcNo" name="hedofcNo" value="${dataList.hedofcNo }"/>
					<input type="hidden" id="rewardType" name="rewardType" value="${dataList.rewardType }"/>
					<table summary="프랜차이즈명, 수상횟수, 수상일, 게시내용으로 구성된 표입니다.">
						<caption>프랜차이즈 본사 상벌 관리 등록</caption>
						<colgroup>
							<col width="165px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th scope="col">프랜차이즈명</th>
								<td class="left">
									${dataList.mtltyNm}
								</td>
							</tr>
							<tr>
								<th scope="col">수상횟수</th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" class="it" title="부서" name="rewardCount" id="rewardCount" value="${dataList.rewardCount }"  oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"></div>
									<span class="bar">회</span>
								</td>
							</tr>
							<tr>
								<th scope="col">수상일</th>
								<td class="left">
									<span class="gIt"><input type="text" class="it date" title="신청일 마지막날짜" id="rewardDt" name="rewardDt" value="${dataList.rewardDt}" readonly></span>
									<script type="text/javascript">
									$( function() {
										$( "#rewardDt" ).datepicker({
											dateFormat: 'yy-mm-dd',
											maxDate:0
										});
									} );
									</script>
								</td>
							</tr>
							<tr>
								<th scope="col">게시내용</th>
								<td class="left">
									<textarea style="width:100%; height: 60px;"  name="rewardCn" id="rewardCn">${dataList.rewardCn }</textarea>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
			<!-- //write -->
			<div class="mButton1 right">
				<a href="javascript:void(0)" id="btnModify" class="mBtn1 primary">저장</a>
				<a href="javascript:void(0)" id="btnBack" class="mBtn1 gray">목록</a>
			</div>
		</div>
	</div>
</div>	
		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
			</div>
			<form id="dataFormMob" method="post">
				<input type="hidden" id="hedofcNo" name="hedofcNo" value="${dataList.hedofcNo }"/>
				<input type="hidden" id="rewardType" name="rewardType" value="${dataList.rewardType }"/>
				<div class="wrap_inner forMo">
					<table class="tbl_row">
						<caption>가입정보수정</caption>
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
	
						<tbody>
							<tr>
								<th scope="row">프랜차이즈명</th>
								<td class="left">
								${dataList.mtltyNm}
								</td>
							</tr>
							<tr>
								<th scope="row">수상횟수</th>
								<td class="left">
									<div class="hasUnit"><input type="text" class="w100p radius" title="부서" name="rewardCount" id="rewardCountMob" value="${dataList.rewardCount }"  oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
									<span class="unit">회</span></div>
								</td>
							</tr>
							<tr>
								<th scope="row">수상일</th>
								<td class="left">
									<span class="box_date"><input type="text" class="w100p radius it date" title="신청일 마지막날짜" id="rewardDtMob" name="rewardDt" value="${dataList.rewardDt}" readonly></span>
									<script type="text/javascript">
									$( function() {
										$( "#rewardDtMob" ).datepicker({
											dateFormat: 'yy-mm-dd',
											maxDate:0
										});
									} );
									</script>
								</td>
							</tr>
							<tr>
								<th scope="row">게시내용</th>
								<td class="left">
									<textarea style="width:100%; height: 60px;"  name="rewardCn" id="rewardCnMob" class="w100p radius">${dataList.rewardCn }</textarea>
								</td>
							</tr>
						</tbody>
					</table>
	
					<div class="btn_col2 col2">
						<div class="box_btn block h40 radius" id="btnMobModify"><button>저장</button></div>
						<div class="box_btn block h40 radius gray" id="btnBackMob"><button>목록</button></div>
					</div>
				</div>
			</form>
<!-- //content -->

