<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
#atchFileDiv, #atchFileDivMob {
pointer-events: none;
}
</style>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/tradeReview.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">매물점포 관리</span> <span class="ts">매물점포 정보</span></h5>
		
			<div class="gTitle1 isVisible">
				<h6 class="mTitle3">기본정보</h6>
				<div class="gRt">
					<span class="iMust">은 필수입력항목입니다.</span>
				</div>
			</div>
			
			<form id="dataForm" method="post" enctype="multipart/form-data">
				<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" value="${param.trdeThingRegistNo}" />
				<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
				<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				<input type="hidden" id="confmSttusCode" name="confmSttusCode" value="${param.confmSttusCode}" />
			<!-- write -->
				<div class="mBoard1 mWrite1 noline isVisible">
					<table summary="제목, 상세설명, 담당자명, 연락처로 구성된 표입니다.">
					<caption>기본정보 - 제목, 상세설명, 담당자명, 연락처로 구성된 표입니다.</caption>
					<colgroup>
						<col style="width:175px;">
						<col style="width:auto;">
					</colgroup>
					<tbody>
						<tr>				
							<th class="left4"><span class="iMust2">제목</span></th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="sj" name="sj"  title="제목"></div>
							</td>
							
						</tr>
						<tr>
							<th class="left4"><span class="iMust2">상세설명</span></th>
							<td class="left">
								<div class="gTextarea"><textarea class="textarea" id="detailDc" name="detailDc" rows="6" title="상세설명"></textarea>
								</div>
							</td>
						</tr>
						<tr>
							<th class="left4"><span class="iMust2">담당자명</span></th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="chargerNm" name="chargerNm" title="담당자명"></div>
							</td>
						</tr>
						<tr>
							<th class="left4"><span class="iMust2">연락처</span></th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="telno" name="telno" title="연락처"></div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- //write -->
		
			<h6 class="mTitle3 isVisible">상세정보</h6>
			<!-- write -->
			<div class="mBoard1 mWrite1 noline isVisible">
				<table summary="주소, 상가형태, 준공년도, 리모델링, 해당층, 건물층, 계약면적, 전용면적, 보증금, 월세, 권리금, 관리비로 구성된 표입니다.">
				<caption>상세정보</caption>
				<colgroup>
					<col style="width:175px;">
					<col style="width:auto;">
					<col style="width:175px;">
					<col style="width:auto;">
				</colgroup>
				<tbody>
				<tr>
					<th class="left4"><span class="iMust2">주소</span></th>
					<td class="left" colspan="3">
						<div class="gIt w2 fl"><input type="text" class="it" id="zip" name="zip" title="우편번호"></div>
							<a href="javascript:goJusoPopup()" class="mBtn1 gray">우편번호</a>
						<div class="row">
							<div class="gIt"><input type="text" class="it" id="bassAdres" name="bassAdres" title="주소"></div>
						</div>
						<div class="row">
							<div class="gIt"><input type="text" class="it" id="detailAdres" name="detailAdres" title="상세주소"></div>
						</div>
						<div class="if">주소는 동/읍/면까지만 표시됩니다. 예)서울시 서초구 서초동</div>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">상가형태</span></th>
					<td class="left" colspan="3">
						<c:forEach var="code" items="${sopsrtStleCodeList}">
							<span class="mRadio">
								<input type="radio" id = "sopsrtStleCode_${code.codeValue}" name="sopsrtStleCode" value="${code.codeValue}" >
								<label for="sopsrtStleCode_${code.codeValue}">${code.codeValueNm}</label>
							</span>
						</c:forEach>
					</td>
				</tr>
				<tr>
					<th class="left4"><span>준공년도</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="competYear" name="competYear" title="준공년도"></div>
						<span class="bar">년</span>
					</td>
					<th class="left4">리모델링</th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="remdelngYear" name="remdelngYear" title="리모델링"></div>
						<span class="bar">년</span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">해당층</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="floorCo" name="floorCo" title="해당층"></div>
						<span class="bar">층</span>
					</td>
					<th class="left4"><span class="iMust2">건물층</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="buldFloorCo" name="buldFloorCo" title="건물층"></div>
						<span class="bar">층</span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">계약면적</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="cntrctAr" name="cntrctAr" onkeyup="calcSm(1,this);" title="계약면적"></div>
						<span class="bar">평=</span>
						<div class="gIt w1 fl"><input type="number" class="it" id="cntrctArSm" name="cntrctArSm" onkeyup="calcSm(2,this);" title="계약면적"></div>
						<span class="bar">㎡</span>
					</td>
					<th class="left4"><span class="iMust2">전용면적</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="dvrAr" name="dvrAr" onkeyup="calcSm(1,this);" title="전용면적"></div>
						<span class="bar">평=</span>
						<div class="gIt w1 fl"><input type="number" class="it" id="dvrArSm" name="dvrArSm" onkeyup="calcSm(2,this);" title="전용면적"></div>
						<span class="bar">㎡</span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">보증금</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="gtn" name="gtn" title="보증금"></div>
						<span class="bar">만원</span>
					</td>
					<th class="left4"><span class="iMust2">월세</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="mtRntchrg" name="mtRntchrg" title="월세"></div>
						<span class="bar">만원</span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">권리금</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="premum" name="premum" title="권리금"></div>
						<span class="bar">만원</span>
					</td>
					<th class="left4"><span class="iMust2">관리비</span></th>
					<td class="left">
						<div class="gIt w1 fl"><input type="number" class="it" id="managect" name="managect" title="관리비"></div>
						<span class="bar">만원</span>
					</td>
				</tr>
				</tbody>
			</table>
			</div>
			<!-- //write -->
			
			<h6 class="mTitle3">기타정보</h6>
			<!-- write -->
			<div class="mBoard1 mWrite1 noline">
				<table summary="주차, 엘리베이터, 난방종류, 화장실, 입주가능일, 매물사진으로 구성된 표입니다.">
				<caption>기타정보</caption>
				<colgroup>
					<col width="175px">
					<col width="300px">
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th class="left4"><span class="iMust2">주차</span></th>
					<td class="left">
						<span class="mRadio">
							<input type="radio" id="parkngAt_1" name="parkngAt" value="Y" title="가능" checked="checked">
							<label for="parkngAt_1">가능</label>
						</span>
						<span class="mRadio">
							<input type="radio" id="parkngAt_2" name="parkngAt" value="N" title="불가능">
							<label for="parkngAt_2">불가능</label>
						</span>
					</td>
					<th class="left4"><span class="iMust2">엘리베이터</span></th>
					<td class="left">
						<span class="mRadio">
							<input type="radio" id="elvtrAt_1" name="elvtrAt" value="Y" title="있음" checked="checked">
							<label for="elvtrAt_1">있음</label>
						</span>
						<span class="mRadio">
							<input type="radio" id="elvtrAt_2" name="elvtrAt" value="N" title="없음">
							<label for="elvtrAt_2">없음</label>
						</span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">난방종류</span></th>
					<td class="left">
						<!-- <div class="gIt w2 fl"><input type="text" class="it" id="heatKndCodeNm" name="heatKndCodeNm" title="난방종류"></div> -->
						<!--
						<select class="select" title="난방종류">
						<option>난방종류</option>
						</select>
						 -->
						<select title="난방종류" class="select" id="heatKndCode" name="heatKndCode">
							<c:forEach var="code" items="${heatKndCodeList}">
								<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
							</c:forEach>
						</select>
					</td>
					<th class="left4"><span class="iMust2">화장실</span></th>
					<td class="left">
<!-- 						<div class="gIt w2 fl"><input type="text" class="it" id="toiletSeCodeNm" name="toiletSeCodeNm" title="화장실"></div> -->
						<!-- <select class="select" title="화장실">
						<option>외부/남녀구분</option>
						</select> -->
						<select title="화장실구분" class="select" id="toiletSeCode" name="toiletSeCode">
<!-- 							<option value="">화장실구분 선택</option> -->
							<c:forEach var="code" items="${toiletSeCodeList}">
								<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<!-- <tr>
					<th class="left4"><span class="iMust2">입주가능일</span></th>
					<td class="left" colspan="3">
						<span class="mRadio">
							<input type="radio" id="mvnPosblDeCode_1" name="mvnPosblDeCode" value="A"  title="즉시입주" checked="checked">
							<label for="mvnPosblDeCode_1">즉시입주</label>
						</span>
						<span class="mRadio">
							<input type="radio" id="mvnPosblDeCode_2" name="mvnPosblDeCode" value="B"  title="협의가능">
							<label for="mvnPosblDeCode_2">협의가능</label>
						</span>
						<span class="mRadio">
							<input type="radio" id="mvnPosblDeCode_3" name="mvnPosblDeCode" value="C" title="직접입력">
							<label for="mvnPosblDeCode_3">직접입력</label>
						</span>
						<span class="gIt w2"><input type="text" class="it date" name="mvnPosblDe" id="mvnPosblDe" title="직접입력" disabled></span>
					</td>
				</tr> -->
				<tr>
					<th class="left4"><span class="iMust2">입주가능일</span></th>
					<td class="left" colspan="3">
						<!-- <div class="gIt w2 fl"><input type="text" class="it" id="mvnPosblDeCodeNm" name="mvnPosblDeCodeNm" title="입주가능일"></div> -->
						<c:forEach var="code" items="${mvnPosblDeCodeList}">
							<span class="mRadio">
								<input type="radio" id = "mvnPosblDeCode_${code.codeValue}" name="mvnPosblDeCode" value="${code.codeValue}" >
								<label for="mvnPosblDeCode_${code.codeValue}">${code.codeValueNm}</label>
							</span>
						</c:forEach>
						<span class="gIt w2"><input type="text" class="it date" name="mvnPosblDe" id="mvnPosblDe" title="직접입력" disabled></span>
					</td>
				</tr>
				<tr>
					<th class="left4"><span class="iMust2">매물사진</span></th>
					<td class="left" colspan="3">
						<div id="atchFileDiv"></div>
						<!-- <p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p> -->
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->
			<div class="mReply1">
			    <h5>컨설턴트 댓글</h5>
			    <div class="gTextarea">
			        <textarea id="cnstntAnswer" class="textarea" rows="5" placeholder="컨설턴트 댓글" disabled="disabled">${code.cnstntAnswer}</textarea>
			    </div>
			</div>
			</form>

			
			<div class="mButton1 right">
			    <a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprChked">검토완료</a>
			    <a href="javascript:void(0);" class="mBtn1 primary" id="btn_update">수정</a>
			    <a href="javascript:void(0);" class="mBtn1 gray" id="btn_apprReturn">반려</a>
			    <a href="javascript:void(0);" class="mBtn1 gray" id="btn_list">목록</a>
			</div>
			<!--
			<div class="check">
				<div class="mCheckbox">
					<input type="checkbox" id="ag1" name="ag1" title="매물정보를 등록할 경우 매물에 대한 책임 및 허위 등 에 대해 빠른 피드백을 위해 양도자의 핸드폰 번호가 공개되는 것에 동의합니다." >
					<label for="ag1">매물정보를 등록할 경우 매물에 대한 책임 및 허위 등 에 대해 빠른 피드백을 위해 양도자의 핸드폰 번호가 공개되는 것에 동의합니다.</label>
				</div>
				<div class="mCheckbox">
					<input type="checkbox" id="ag2" name="ag2" title="전문컨설턴트가 해당 매물정보 및 서류를 검토하여 매물정보 게시여부가 결정되는 사항에 동의합니다." >
					<label for="ag2">전문컨설턴트가 해당 매물정보 및 서류를 검토하여 매물정보 게시여부가 결정되는 사항에 동의합니다.</label>
				</div>
				<div class="mCheckbox">
					<input type="checkbox" id="ag3" name="ag3" title="허위정보의 경우 매물정보가 삭제 될 수 있는 것에 동의합니다." >
					<label for="ag3">허위정보의 경우 매물정보가 삭제 될 수 있는 것에 동의합니다.</label>
				</div>
			</div>
			<div class="mInfo4">
				경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구 경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구
			</div>
				-->
			<%-- <div class="mButton1 center">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprChked">검토완료</a>
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprReturn">반려</a>
				<a href="javascript:void(0);" class="mBtn1 primary" style="color: #fbb807; background-color: #fff;" id="btn_update">수정</a>
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_list">목록</a>
				<a href="${contextPath}/board/trade/tradeList.do" class="mBtn1 gray">목록</a>
			</div> --%>
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px">
				<div class="swiper-wrapper"></div>
			</div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;"></ul>
			
			<form id="dataFormMob" method="post" enctype="multipart/form-data">
			<input type="hidden" id="trdeThingRegistNoMob" name="trdeThingRegistNoMob" value="${param.trdeThingRegistNo}" />
			<input type="hidden" id="ssUserRoleMob" name="ssUserRole" value="${sessionScope.user.authorities}" />
			<input type="hidden" id="srcPathMob" name="srcPath" value="${param.srcPath}" />
			<input type="hidden" id="confmSttusCodeMob" name="confmSttusCode" value="${param.confmSttusCode}" />
			
			<%-- <h6 class="mTitle3">기본정보</h6>

<!-- 				<div class="btn_col2 col2">
					<div class="box_btn block h40 radius" id="btn_apprChkedMob" style="width: 30%;"><button>검토완료</button></div>
					<div class="box_btn block h40 radius" id="btn_apprReturnMob" style="margin-left: 1%;width: 30%; float: none;"><button>반려</button></div>
					<div class="box_btn block h40 radius" id="btn_listMob" style="margin-left: 1%; width: 30%;"><button>목록</button></div>
				</div> -->
				<div class="mButton1 center">
					<a href="javascript:void(0);" class="mBtn1 primary" style="border-radius: 5px;" id="btn_apprChkedMob">검토완료</a>
					<a href="javascript:void(0);" class="mBtn1 primary" style="border-radius: 5px;" id="btn_apprReturnMob">반려</a>
					<a href="javascript:void(0);" class="mBtn1 primary" style="border-radius: 5px;" id="btn_listMob">목록</a>
				</div> --%>
				<div class="tableArea isVisible">
					<h4 class="relative">
						기본정보

						<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
					</h4>

					<table class="tbl_row">
						<caption>매물점포 관리현황 - 기본정보 - 제목, 상세설명, 담당자명, 연락처</caption>
						<colgroup>
							<col style="width:27%;">
							<col style="width:73%;">
						</colgroup>

						<tbody>
							<tr>
								<th scope="row" class="required"><span>제목</span></th>

								<td>
									<input type="text" id="sjMob" name="sjMob" class="w100p radius" required>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>상세설명</span></th>
							
								<td>
									<textarea id="detailDcMob" name="detailDcMob" class="w100p radius" required></textarea>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>담당자명</span></th>
							
								<td>
									<input type="text" name="chargerNmMob" id="chargerNmMob" class="w100p radius" required>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>연락처</span></th>
							
								<td>
									<input type="text" name="telnoMob" id="telnoMob" class="w100p radius" required>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tableArea isVisible">
					<h4 class="relative">
						상세정보
						<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
					</h4>				
					<table class="tbl_row">
						<caption>매물점포 관리현황 - 상세정보 - 주소, 상가형태, 준공년도, 리모델링, 해당층, 건물층, 계약면적, 전용면적, 보증금, 월세, 권리금, 관리비</caption>
						<colgroup>
							<col style="width:27%;">
							<col style="width:73%;">
						</colgroup>
				
						<tbody>
							<tr>
								<th scope="row" class="required"><span>주소</span></th>
								<td>
									<div class="hasBtn2">
										<input type="text" name="zipMob" id="zipMob" class="w100p radius" required>

										<div class="box_btn w80 h26 radius fs12 medium"><button onclick="javascript:goJusoPopup()">우편번호</button></div>
									</div>

									<input type="text" name="bassAdresMob" id="bassAdresMob" class="w100p radius" required>
									<input type="text" name="detailAdresMob" id="detailAdresMob" class="w100p radius" required>

									<p class="msg tar">주소는 동/읍/면 까지만 표시됩니다.</p>
								</td>
							</tr>
				
							<tr>
								<th scope="row" class="required"><span>상가형태</span></th>				
								<td>
	 								<c:forEach var="code" items="${sopsrtStleCodeList}">
										<p class="box_radio">
											<input type="radio" id="sopsrtStleCodeMob_${code.codeValue}" name="sopsrtStleCodeMob" class="hidden" value="${code.codeValue}">
											<label for="sopsrtStleCodeMob_${code.codeValue}">${code.codeValueNm}</label>
										</p>
									</c:forEach>
								</td>
							</tr>
				
							<tr>
								<th scope="row">준공년도</th>
				
								<td>
									<div class="hasUnit">
										<input type="text" name="competYearMob" id="competYearMob" class="w100p radius" required>
										<span class="unit">년</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row">리모델링</th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="remdelngYearMob" id="remdelngYearMob" class="w100p radius">
										<span class="unit">년</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>해당층</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="floorCoMob" id="floorCoMob" class="w100p radius" required>
										<span class="unit">층</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>건물층</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="buldFloorCoMob" id="buldFloorCoMob" class="w100p radius" required>
										<span class="unit">층</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>계약면적</span></th>
								<td>
									<div class="hasUnit">
										<input type="text" name="cntrctArMob" id="cntrctArMob" onkeyup="calcSm(1,this);" class="w100p radius" value="100" required>
										<span class="unit">평</span>
									</div>

									<div class="hasUnit">
										<input type="text" name="cntrctArSmMob" id="cntrctArSmMob" onkeyup="calcSm(2,this);" class="w100p radius" value="323" required>
										<span class="unit">㎡</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>전용면적</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="dvrArMob" id="dvrArMob" onkeyup="calcSm(1,this);" class="w100p radius" required>
										<span class="unit">평</span>
									</div>
								
									<div class="hasUnit">
										<input type="text" name="dvrArSmMob" id="dvrArSmMob" onkeyup="calcSm(2,this);" class="w100p radius" required>
										<span class="unit">㎡</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>보증금</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="gtnMob" id="gtnMob" class="w100p radius" required>
										<span class="unit">만원</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>월세</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="mtRntchrgMob" id="mtRntchrgMob" class="w100p radius" required>
										<span class="unit">만원</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>권리금</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="premumMob" id="premumMob" class="w100p radius" required>
										<span class="unit">만원</span>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>관리비</span></th>
							
								<td>
									<div class="hasUnit">
										<input type="text" name="managectMob" id="managectMob" class="w100p radius" required>
										<span class="unit">만원</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="tableArea">
					<h4 class="relative">
						기타정보

						<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
					</h4>

					<table class="tbl_row">
						<caption>매물점포 관리현황 - 기타정보 - 주차, 엘리베이터, 난방종류, 화장실, 입주가능일, 매물사진</caption>
						<colgroup>
							<col style="width:27%;">
							<col style="width:73%;">
						</colgroup>

						<tbody>
							<tr>
								<th scope="row" class="required"><span>주차</span></th>
								<td>
									<div class="box_radio">
										<input type="radio" name="parkngAtMob" id="parkngAtMob_1" value="Y" class="hidden" checked="checked">
										<label for="parkngAtMob_1">가능</label>
									</div>

									<div class="box_radio">
										<input type="radio" name="parkngAtMob" id="parkngAtMob_2" value="N" class="hidden">
										<label for="parkngAtMob_2">불가능</label>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>엘리베이터</span></th>
								<td>
									<div class="box_radio">
										<input type="radio" name="elvtrAtMob" id="elvtrAtMob_1" value="Y" class="hidden" checked="checked">
										<label for="elvtrAtMob_1">있음</label>
									</div>
							
									<div class="box_radio">
										<input type="radio" name="elvtrAtMob" id="elvtrAtMob_2" value="N" class="hidden">
										<label for="elvtrAtMob_2">없음</label>
									</div>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>난방종류</span></th>

								<td>
									<select name="heatKndCodeMob" id="heatKndCodeMob" class="w100p radius">
										<c:forEach var="code" items="${heatKndCodeList}">
											<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
										</c:forEach>
									</select>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>화장실</span></th>

								<td>
									<select name="toiletSeCodeMob" id="toiletSeCodeMob" class="w100p radius">
										<c:forEach var="code" items="${toiletSeCodeList}">
											<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
										</c:forEach>
									</select>	
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>입주가능일</span></th>

								<td>							
									<c:forEach var="code" items="${mvnPosblDeCodeList}">
										<div class="box_radio">
											<input type="radio" id = "mvnPosblDeCodeMob_${code.codeValue}" class="hidden" name="mvnPosblDeCodeMob" value="${code.codeValue}" >
											<label for="mvnPosblDeCodeMob_${code.codeValue}">${code.codeValueNm}</label>
										</div>
									</c:forEach>
									<input type="text" name="mvnPosblDeMob" id="mvnPosblDeMob" class="w100p radius" disabled>
								</td>
							</tr>

							<tr>
								<th scope="row" class="required"><span>매물사진</span></th>
								<td>
								<div id="atchFileDivMob"></div>
<!-- 									<div class="box_file">
										<input type="file" name="temp_file0" id="temp_file0" class="hidden">
										<label for="temp_file0">파일첨부</label>
									</div>

									<div class="box_file">
										<input type="file" name="temp_file1" id="temp_file1" class="hidden">
										<label for="temp_file1">파일첨부</label>
									</div>

									<p class="msg">
										5MByte 이하의 파일만 등록가능합니다.<br>
										등록이미지 크기는 가로 200pixel / 세로 200pixel로 올려주세요.
									</p>

									<div class="box_btn block h40 radius charcoal">
										<button>첨부파일 추가</button>
									</div>

									<ul class="list_upload" id="atchFileDivMob">
										<li>
											<p>2020_images.jpg</p>
											<button class="del">삭제</button>
										</li>
									</ul> -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<dl class="datalist_comment">
					<dt>컨설턴트 댓글</dt>
				
					<dd class="relative">
						<textarea name="" id="cnstntAnswerMob" rows="3" class="w100p radius">${code.cnstntAnswer}</textarea>
				
						<p class="writeCount">
							<span>0</span>/<span>300</span>
						</p>
					</dd>
				</dl>
				</form>
				<!-- <div class="btn2"> -->
<!-- 					<div class="box_btn block h40 radius white">
							<button onclick="javascript:history.back()">목록으로</button>
							<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprChkedMob">검토완료</a>
							<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprReturnMob">반려</a>
						</div> -->
					<!-- <div class="mButton1 center">
						<a href="javascript:void(0);" class="mBtn1 primary" style="border-radius: 5px;" id="btn_apprChkedMob">검토완료</a>
						<a href="javascript:void(0);" class="mBtn1 primary" style="border-radius: 5px;" id="btn_apprReturnMob">반려</a>
						<a href="javascript:void(0);" class="mBtn1 gray" style="border-radius: 5px;" id="btn_updateMob">수정</a>
						<a href="javascript:void(0);" class="mBtn1 gray" style="border-radius: 5px;" id="btn_listMob">목록</a>
					</div>  -->
					<!-- <div class="btn_col2 col2">
						<div class="box_btn block h40 radius"><button onclick="location.href=javascript:void(0);" style="float:left;width:40%;margin-left:62%" id="btn_apprChkedMob">검토완료</button></div>
						<button onclick="location.href=javascript:void(0);" style="float:left;width:40%;margin-left:12%" id="btn_updateMob">수정</button></div>
						<div class="box_btn block h40 radius gray" id=""><button style="float:left;width:40%;margin-right:12%" id="btn_apprReturnMob">반려</button></div>
					</div>  -->
						<!-- <button href="javascript:void(0);" style="float:left;width:40%" id="btn_listMob">목록</button></div> -->
				<!-- </div> -->
				<!-- <div class="btn btn3 tac" style="border-bottom:1px solid #ddd;margin-top:10px;">
					<div class="box_btn w95 h40 radius" id="btn_apprChkedMob"><button style="display: inline-block;width: 80px; margin-bottom:10px;">검토완료</button></div>
					<div class="box_btn w95 h40 radius gray" id="btn_apprReturnMob"><button style="display: inline-block;width: 80px; margin-bottom:10px;">반려</button></div>
				</div> -->
				
				<div class="btn_col2 col2" style="text-align:center;margin-top:20px;margin-bottom:30px;" id="btnChk">
					<div class="box_btn w150 h40 radius" style="margin-left:5px;">
						<button id="btn_apprChkedMob" style="width:90%">검토완료</button>
					</div>
					<!-- <div class="box_btn block h40 radius" style="margin-left:26%;">
						<button id="btn_updateMob" style="width:100%;">수정</button>
					</div> -->
					<!-- <div class="box_btn block h40 radius" style="width:100%; ">
						<button id="btn_updateMob" style="width:100%;">수정</button>
					</div> -->
					<div class="box_btn w150 h40 radius gray" style="margin-right:5px">
						<button id="btn_apprReturnMob" style="width:90%">반려</button>
					</div>
				</div>
				
				<div class="btn_col2 col2"  style="text-align:center;" id="btnUpdt">
					<div class="box_btn block h40 radius" style="margin-left:26%;"><button id="btn_updateMob" style="width:100%;">수정</button></div>
				</div>
			    
				<div class="btn2">
					<div class="box_btn block h40 radius white"><button id="btn_listMob">목록</button></div>
				</div>
<!-- content -->