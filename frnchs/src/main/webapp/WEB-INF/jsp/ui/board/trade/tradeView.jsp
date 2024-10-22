<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/tradeView.js"/>"></script>
<jsp:include page="/WEB-INF/tiles/flshdTrdePopup.jsp"/><!-- 허위 매물 신고 팝업 -->

<article id="brandInfo">
<!-- body -->
	<div class="body">
		<div class="bg">

			<div class="gTitle4">
				<h5 class="mTitle4">공정한 점포거래를 위해 전문 컨설턴트가 <em>검증한 매물 정보</em>입니다.</h5>
				<p class="info">해당 매물은 부동산 컨설턴트의 서류 검토를 완료한 점포정보만 개시됩니다.
				<!-- <div class="gRt">
					<a href="javascript:void(0);" class="mBtn1 l2 orange" id="btn_tradeSavePage"><span class="iPlus">매물점포 등록</span></a>
				</div> -->
			</div>
			<form id="reqForm" method="post">
				<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
				<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
				<input type="hidden" id="crud" name="crud" value="${param.crud}"/>
				<input type="hidden" id="paramTrdeThingRegistNo" name="paramTrdeThingRegistNo" value="${param.trdeThingRegistNo}"/>
				<input type="hidden" id="confmSttusCode" name="confmSttusCode" />
			</form>
			<!-- module -->
			<div class="mDetail1 type2">
				<!-- left -->
				<div class="gLeft">
					<div class="gTit">
						<!-- <div class="tit"><input type="text" id="sj" name="sj" /></div> -->
						<div class="tit">${tradeBbs.sj}</div>
						<div class="gRt"><a href="javascript:void(0)" class="btnCharge jsBtnShow1 openFlshdTrdePopup btnQna">문의사항</a></div>
					</div>
					<!-- <div id="trdeThingPhoto" name="trdeThingPhoto"></div> -->
					<div id="trdeThingPhoto" name="trdeThingPhoto">
						<div class="img"><img src="/file/downloadFile.do?atchmnflNo=${tradeBbs.atchmnflNo}&fileSn=${tradeBbs.fileSn}&fileKey=${tradeBbs.fileKey}"></div>
					</div>


					<div class="mBoard1 forPc">
						<table summary="매물정보 표입니다.">
						<caption>경기남부 롯데리아 사업체 긴급매각</caption>
						<colgroup>
							<col width="190px">
							<col width="*">
							<col width="190px">
							<col width="*">
						</colgroup>
						<!--
						<tbody>
						<tr>
							<th class="bgBlue">매물등록번호</th>
							<td colspan="1"><input type="text right" id="trdeThingRegistNo" name="trdeThingRegistNo" /></td>
							<th class="bgBlue">상가형태</th>
							<td colspan="1"><input type="text" id="sopsrtStleCodeNm" name="sopsrtStleCodeNm" /></td>
						</tr>
						<tr>
							<th class="bgBlue">지역</th>
							<td class="left" colspan="3"><input type="text" id="bassAdres" name="bassAdres" size="130" /></td>
						</tr>
						<tr>
							<th class="bgBlue">보증금/월세</th>
							<td colspan="1"><input type="text" id="gtn" name="gtn" size="6" /> / <input type="text" id="mtRntchrg" name="mtRntchrg" size="6" /> 만원</td>
							<th class="bgBlue">권리금</th>
							<td colspan="1"><input type="text" id="premum" name="premum" size="6" /> 만원</td>
						</tr>
						<tr>
							<th class="bgBlue">계약면적/전용면적</th>
							<td colspan="1"><input type="text" id="cntrctArSm" name="cntrctArSm" size="8" />m²<br>(<input type="text" id="cntrctAr" name="cntrctAr" size="8" /> PY)<br>/<input type="text" id="dvrArSm" name="dvrArSm" size="8" />m²<br>(<input type="text" id="dvrAr" name="dvrAr" size="8" /> PY)</td>
							<th class="bgBlue">해당층/건물층</th>
							<td colspan="1"><input type="text" id="floorCo" name="floorCo" size="6" /> 층 / <input type="text" id="buldFloorCo" name="buldFloorCo" size="6" /> 층</td>
						</tr>
						<tr>
							<th class="bgBlue">준공년도</th>
							<td colspan="1"><input type="text" id="competYear" name="competYear" size="6" /> 년</td>
							<th class="bgBlue">리모델링</th>
							<td colspan="1"><input type="text" id="remdelngYear" name="remdelngYear" size="6" /></td>
						</tr>
						<tr>
							<th class="bgBlue">관리비</th>
							<td colspan="1"><input type="text" id="managect" name="managect" size="6" /> 만원</td>
							<th class="bgBlue">입주가능일</th>
							<td colspan="1"><input type="text" id="mvnPosblDeCodeNm" name="mvnPosblDeCodeNm" /></td>
						</tr>
						<tr>
							<th class="bgBlue">주차</th>
							<td colspan="1"><input type="text" id="parkngAt" name="parkngAt" /></td>
							<th class="bgBlue">엘리베이터</th>
							<td colspan="1"><input type="text" id="elvtrAt" name="elvtrAt" /></td>
						</tr>
						<tr>
							<th class="bgBlue">난방종류</th>
							<td colspan="1"><input type="text" id="heatKndCodeNm" name="heatKndCodeNm" /></td>
							<th class="bgBlue">화장실</th>
							<td colspan="1"><input type="text" id="toiletSeCodeNm" name="toiletSeCodeNm" /></td>
						</tr>
						</tbody>
						 -->
						<tbody>
						<tr>
							<th class="bgBlue">매물등록번호</th>
							<td class="left" colspan="1">${tradeBbs.trdeThingRegistNo}</td>
							<th class="bgBlue">상가형태</th>
							<td class="left" colspan="1">${tradeBbs.sopsrtStleCodeNm}</td>
						</tr>
						<tr>
							<th class="bgBlue">지역</th>
							<td class="center" colspan="3">${tradeBbs.bassAdres}</td>
						</tr>
						<tr>
							<th class="bgBlue">보증금/월세</th>
							<td class="left" colspan="1">${tradeBbs.gtn}/${tradeBbs.mtRntchrg} 만원</td>
							<th class="bgBlue">권리금</th>
							<td class="left" colspan="1">${tradeBbs.premum} 만원</td>
						</tr>
						<tr>
							<th class="bgBlue">계약면적/전용면적</th>
							<td class="left" colspan="1">${tradeBbs.cntrctArSm}m²(${tradeBbs.cntrctAr}PY)/<br>${tradeBbs.dvrArSm}m²(${tradeBbs.dvrAr}PY)</td>
							<th class="bgBlue">해당층/건물층</th>
							<td class="left" colspan="1">${tradeBbs.floorCo}층 / ${tradeBbs.buldFloorCo}층</td>
						</tr>
						<tr>
							<th class="bgBlue">준공년도</th>
							<td class="left" colspan="1">${tradeBbs.competYear}년</td>
							<th class="bgBlue">리모델링</th>
							<td class="left" colspan="1">${tradeBbs.remdelngYear}년</td>
						</tr>
						<tr>
							<th class="bgBlue">관리비</th>
							<td class="left" colspan="1">${tradeBbs.managect}만원</td>
							<th class="bgBlue">입주가능일</th>
							<td class="left" colspan="1">${tradeBbs.mvnPosblDeCodeNm}</td>
						</tr>
						<tr>
							<th class="bgBlue">주차</th>
							<td class="left" colspan="1">
								<c:if test="${tradeBbs.parkngAt == 'Y' }">가능</c:if>
								<c:if test="${tradeBbs.parkngAt == 'N' }">불가능</c:if>
							</td>

							<th class="bgBlue">엘리베이터</th>
							<td class="left" colspan="1">
								<c:if test="${tradeBbs.elvtrAt == 'Y' }">있음</c:if>
								<c:if test="${tradeBbs.elvtrAt == 'N' }">없음</c:if>
							</td>
						</tr>
						<tr>
							<th class="bgBlue">난방종류</th>
							<td class="left" colspan="1">${tradeBbs.heatKndCodeNm}</td>
							<th class="bgBlue">화장실</th>
							<td class="left" colspan="1">${tradeBbs.toiletSeCodeNm}</td>
						</tr>
						</tbody>

						</table>
					</div>
					<table class="tbl_row forMo">
						<caption>매물정보 - 매물등록번호, 상가형태, 지역, 보증금/월세, 권리금, 계약면적/전용면적, 해당층/건물층, 준공년도, 리모델링, 관리비, 입주가능일, 주차여부, 엘리베이터여부, 난방종류, 화장실</caption>
						<colgroup>
							<col style="width:30%;">
							<col style="width:auto;">
						</colgroup>

						<tbody>
							<tr>
								<th scope="row">매물등록번호</th>
								<td>${tradeBbs.trdeThingRegistNo}</td>
							</tr>

							<tr>
								<th scope="row">상가형태</th>
								<td>${tradeBbs.sopsrtStleCodeNm}</td>
							</tr>

							<tr>
								<th scope="row">지역</th>
								<td colspan="3">${tradeBbs.bassAdres}</td>
							</tr>

							<tr>
								<th scope="row">보증금/월세</th>
								<td>${tradeBbs.gtn}/${tradeBbs.mtRntchrg}만원</td>
							</tr>

							<tr>
								<th scope="row">권리금</th>
								<td>${tradeBbs.premum} 만원</td>
							</tr>

							<tr>
								<th scope="row">계약면적/전용면적</th>
								<td>${tradeBbs.cntrctArSm}m²(${tradeBbs.cntrctAr}PY)/<br>${tradeBbs.dvrArSm}m²(${tradeBbs.dvrAr}PY)</td>
							</tr>

							<tr>
								<th scope="row">해당층/건물층</th>
								<td>${tradeBbs.floorCo}층 / ${tradeBbs.buldFloorCo}층</td>
							</tr>

							<tr>
								<th scope="row">준공년도</th>
								<td>${tradeBbs.competYear}년</td>
							</tr>

							<tr>
								<th scope="row">리모델링</th>
								<td>${tradeBbs.remdelngYear}년</td>
							</tr>

							<tr>
								<th scope="row">관리비</th>
								<td>${tradeBbs.managect}만원</td>
							</tr>

							<tr>
								<th scope="row">입주가능일</th>
								<td>${tradeBbs.mvnPosblDeCodeNm}</td>
							</tr>

							<tr>
								<th scope="row">주차</th>
								<td>
									<c:if test="${tradeBbs.parkngAt == 'Y' }">가능</c:if>
									<c:if test="${tradeBbs.parkngAt == 'N' }">불가능</c:if>
								</td>
							</tr>

							<tr>
								<th scope="row">엘리베이터</th>
								<td>
									<c:if test="${tradeBbs.elvtrAt == 'Y' }">있음</c:if>
									<c:if test="${tradeBbs.elvtrAt == 'N' }">없음</c:if>
								</td>
							</tr>

							<tr>
								<th scope="row">난방종류</th>
								<td>${tradeBbs.heatKndCodeNm}</td>
							</tr>

							<tr>
								<th scope="row">화장실</th>
								<td>${tradeBbs.toiletSeCodeNm}</td>
							</tr>
						</tbody>
					</table>
					<div class="mTxt2">
						<div class="ti">매물소개</div>
						<div class="tx">${tradeBbs.detailDc}</div>
						<%-- <td class="left">
							<div class="gTextarea"><textarea class="textarea" id="detailDc" name="detailDc" rows="3" title="매물소개" disabled="disabled">${tradeBbs.detailDc}</textarea></div>
						</td> --%>
					</div>
				</div>
				<!-- //left -->

			</div>
			<!-- //module -->

		</div>
	</div>
	<!-- //body -->
</article>