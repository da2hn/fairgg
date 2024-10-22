<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/tradeSave.js"/>"></script>

<div id="cnt">
		<!-- [Dev] id에 페이지명 -->
	<article id="storeTransferRegister">
		<h3 class="subtitle forMo">매물점포 등록</h3>
		<!-- body -->
			<div class="body">
				<div class="bg">
		
					<div class="gTitle4">
						<h5 class="mTitle4">공정한 점포거래를 위해 전문 컨설턴트가 <em>검증한 매물 정보</em>입니다.</h5>
						<p class="info">해당 매물은 부동산 컨설턴트의 서류 검토를 완료한 점포정보만 개시됩니다.
						<!-- <div class="gRt">
							<a href="#" class="mBtn1 l2 orange"><span class="iPlus">매물점포 등록</span></a>
						</div> -->
					</div>
		
					<!-- module -->
					<div class="mBox1">
		
						<div class="gTitle1 forPc">
							<h6 class="mTitle3">기본정보</h6>
							<div class="gRt">
								<span class="iMust">은 필수입력항목입니다.</span>
							</div>
						</div>
						<form id="dataForm" method="post" enctype="multipart/form-data">
		
						<!-- write -->
						<div class="mBoard1 mWrite1 noline forPc">
							<table summary="제목, 상세설명, 담당자명, 연락처로 구성된 표입니다.">
							<caption>기본정보</caption>
							<colgroup>
								<col width="175px">
								<col width="*">
							</colgroup>
							<tbody>
							<tr>
								<th class="left4"><span class="iMust2">제목</span></th>
								<td class="left">
									<div class="gIt"><input type="text" maxlength="150" class="it" id="sj" name="sj" title="제목"></div>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">상세설명</span></th>
								<td class="left">
									<div class="gTextarea"><textarea class="textarea" id="detailDc" name="detailDc" rows="3" title="상세설명"></textarea></div>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">담당자명</span></th>
								<td class="left">
									<div class="gIt"><input type="text" maxlength="60" class="it" id="chargerNm" name="chargerNm" title="담당자명"></div>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">연락처</span></th>
								<td class="left">
									<div class="gIt"><input type="text" maxlength="11" class="it onlyNumber" id="telno" name="telno" title="연락처" placeholder="숫자만 입력해주세요."></div>
								</td>
							</tr>
							</tbody>
							</table>
						</div>
						<!-- //write -->
		
						<h6 class="mTitle3 forPc">상세정보</h6>
						<!-- write -->
						<div class="mBoard1 mWrite1 noline forPc">
							<table summary="주소, 상가형태, 준공년도, 리모델링, 해당층, 건물층, 계약면적, 전용면적, 보증금, 월세, 권리금, 관리비로 구성된 표입니다.">
							<caption>상세정보</caption>
							<colgroup>
								<col width="175px">
								<col width="300px">
								<col width="175px">
								<col width="*">
							</colgroup>
							<tbody>
							<tr>
								<th class="left4"><span class="iMust2">주소</span></th>
								<td class="left" colspan="3">
									<div class="gIt w2 fl"><input type="text" class="it" id="zipNo" name="zipNo" title="우편번호" readonly></div>
									<a href="javascript:goJusoPopup()" class="mBtn1 gray">우편번호</a>
									<div class="row">
										<div class="gIt">
											<input type="text" maxlength="200" class="it" id="roadAddrPart1" name="roadAddrPart1" title="주소" readonly>
										</div>
									</div>
									<div class="row">
										<div class="gIt"><input type="text" maxlength="200" class="it" id="addrDetail" name="addrDetail" title="상세주소"></div>
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
									<div class="gIt w1 fl"><input type="text" maxlength="4" class="it onlyNumber" id="competYear" name="competYear" title="준공년도"></div>
									<span class="bar">년</span>
								</td>
								<th class="left4">리모델링</th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="4" class="it onlyNumber" id="remdelngYear" name="remdelngYear" title="리모델링"></div>
									<span class="bar">년</span>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">해당층</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="3" class="it onlyNumber" id="floorCo" name="floorCo" title="해당층"></div>
									<span class="bar">층</span>
								</td>
								<th class="left4"><span class="iMust2">건물층</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="3" class="it onlyNumber" id="buldFloorCo" name="buldFloorCo" title="건물층"></div>
									<span class="bar">층</span>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">계약면적</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="cntrctAr" name="cntrctAr" onkeyup="calcSm(1,this);" title="계약면적" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"></div>
									<span class="bar">평=</span>
									<div class="gIt w1 fl"><input type="text" class="it onlyNumber" id="cntrctArSm" name="cntrctArSm" onkeyup="calcSm(2,this);" title="계약면적" disabled></div>
									<span class="bar">㎡</span>
								</td>
								<th class="left4"><span class="iMust2">전용면적</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="dvrAr" name="dvrAr" onkeyup="calcSm(1,this);" title="전용면적" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"></div>
									<span class="bar">평=</span>
									<div class="gIt w1 fl"><input type="text" class="it onlyNumber" id="dvrArSm" name="dvrArSm" onkeyup="calcSm(2,this);" title="전용면적" disabled></div>
									<span class="bar">㎡</span>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">보증금</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="gtn" name="gtn" title="보증금"></div>
									<span class="bar">만원</span>
								</td>
								<th class="left4"><span class="iMust2">월세</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="mtRntchrg" name="mtRntchrg" title="월세"></div>
									<span class="bar">만원</span>
								</td>
							</tr>
							<tr>
								<th class="left4"><span class="iMust2">권리금</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="premum" name="premum" title="권리금"></div>
									<span class="bar">만원</span>
								</td>
								<th class="left4"><span class="iMust2">관리비</span></th>
								<td class="left">
									<div class="gIt w1 fl"><input type="text" maxlength="9" class="it onlyNumber" id="managect" name="managect" title="관리비"></div>
									<span class="bar">만원</span>
								</td>
							</tr>
							</tbody>
							</table>
						</div>
						<!-- //write -->
		
						<h6 class="mTitle3 forPc">기타정보</h6>
						<!-- write -->
						<div class="mBoard1 mWrite1 noline forPc">
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
									<!--
									<select class="select" title="난방종류">
									<option>난방종류</option>
									</select>
									 -->
									<select title="난방종류" class="select" id="heatKndCode" name="heatKndCode" />
										<option value="">난방종류 선택</option>
										<c:forEach var="code" items="${heatKndCodeList}">
											<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
										</c:forEach>
									</select>
								</td>
								<th class="left4"><span class="iMust2">화장실</span></th>
								<td class="left">
									<!--
									<select class="select" title="화장실">
									<option>외부/남녀구분</option>
									</select>
									 -->
									<select title="화장실구분" class="select" id="toiletSeCode" name="toiletSeCode" />
										<option value="">화장실구분 선택</option>
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
									<span class="gIt w2"><input type="text" class="it" id="mvnPosblDe" name="mvnPosblDe" title="직접입력"></span>
									<span class="gIt w2"><input type="text" class="it date" name="mvnPosblDe" id="mvnPosblDe" title="직접입력" disabled></span>
		
		
								</td>
							</tr> -->
							<tr>
								<th class="left4"><span class="iMust2">입주가능일</span></th>
								<td class="left" colspan="3">
									<c:forEach var="code" items="${mvnPosblDeCodeList}">
										<span class="mRadio">
											<input type="radio" id="mvnPosblDeCode_${code.codeValue}" name="mvnPosblDeCode" value="${code.codeValue}" >
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
					</form>
					<form id="dataFormMob" method="post" enctype="multipart/form-data">
						<input type="hidden" name="sj" id="sjForm" />
						<input type="hidden" name="detailDc" id="detailDcForm" />
						<input type="hidden" name="chargerNm" id="chargerNmForm" />
						<input type="hidden" name="telno" id="telnoForm" />
						<input type="hidden" name="zipNo" id="zipNoForm" />
						<input type="hidden" name="roadAddrPart1" id="roadAddrPart1Form" />
						<input type="hidden" name="addrDetail" id="addrDetailForm" />
						<input type="hidden" name="sopsrtStleCode" id="sopsrtStleCodeForm" />
						<input type="hidden" name="competYear" id="competYearForm" />
						<input type="hidden" name="remdelngYear" id="remdelngYearForm" />
						<input type="hidden" name="floorCo" id="floorCoForm" />
						<input type="hidden" name="buldFloorCo" id="buldFloorCoForm" />
						<input type="hidden" name="cntrctAr" id="cntrctArForm" />
						<input type="hidden" name="dvrAr" id="dvrArForm" />
						<input type="hidden" name="gtn" id="gtnForm" />
						<input type="hidden" name="mtRntchrg" id="mtRntchrgForm" />
						<input type="hidden" name="premum" id="premumForm" />
						<input type="hidden" name="managect" id="managectForm" />
						<input type="hidden" name="parkngAt" id="parkngAtForm" />
						<input type="hidden" name="elvtrAt" id="elvtrAtForm" />
						<input type="hidden" name="heatKndCode" id="heatKndCodeForm" />
						<input type="hidden" name="toiletSeCode" id="toiletSeCodeForm" />
						<input type="hidden" name="mvnPosblDeCode" id="mvnPosblDeCodeForm" />
						<input type="hidden" name="mvnPosblDe" id="mvnPosblDeForm" />
						<div class="tableArea forMo">
							<h4 class="relative">
								기본정보
								<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
							</h4>

							<dl>
								<dt class="required">제목</dt>
								<dd>
									<input type="text" class="w100p radius" id="sjMob" name="sjMob">
								</dd>
							</dl>

							<dl>
								<dt class="required">상세설명</dt>
								<dd>
									<textarea name="detailDcMob" id="detailDcMob" class="w100p radius"></textarea>
								</dd>
							</dl>

							<dl>
								<dt class="required">담당자명</dt>
								<dd>
									<input type="text" name="chargerNmMob" id="chargerNmMob" class="w100p radius">
								</dd>
							</dl>

							<dl>
								<dt class="required">연락처</dt>
								<dd>
									<input type="text" name="telnoMob" id="telnoMob" class="w100p radius">
								</dd>
							</dl>
						</div>
						
						<div class="tableArea forMo">
							<h4 class="relative">
								상세정보
								<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
							</h4>

							<dl>
								<dt class="required">주소</dt>
								<dd>
									<div class="hasBtn2">
										<input type="text" name="zipMob" id="zipMob" class="w100p radius" readonly>
									
										<div class="box_btn w80 h26 radius fs12 medium" onclick="location.href='javascript:goJusoPopup()'"><button type="button">우편번호</button></div>
									</div>
									
									<input type="text" name="bassAdresMob" id="bassAdresMob" class="w100p radius" readonly>
									<input type="text" name="detailAdresMob" id="detailAdresMob" class="w100p radius" readonly>
									
									<p class="msg tar">주소는 동/읍/면 까지만 표시됩니다.</p>
								</dd>
							</dl>

							<dl>
								<dt class="required">상가형태</dt>
								<dd>
									<c:forEach var="code" items="${sopsrtStleCodeList}">
										<p class="box_radio">
											<input type="radio" id = "sopsrtStleCodeMob_${code.codeValue}" name="sopsrtStleCodeMob" class="hidden" value="${code.codeValue}" >
											<label for="sopsrtStleCodeMob_${code.codeValue}">${code.codeValueNm}</label>
										</p>
									</c:forEach>
									<!-- <p class="box_radio">
										<input type="radio" name="temp_radio0" id="temp_radio0" class="hidden" checked="checked">
										<label for="temp_radio0">근린상가</label>
									</p>

									<p class="box_radio">
										<input type="radio" name="temp_radio1" id="temp_radio1" class="hidden">
										<label for="temp_radio1">단지내 상가</label>
									</p>

									<p class="box_radio">
										<input type="radio" name="temp_radio2" id="temp_radio2" class="hidden">
										<label for="temp_radio2">주상복합 상가</label>
									</p>

									<p class="box_radio">
										<input type="radio" name="temp_radio3" id="temp_radio3" class="hidden">
										<label for="temp_radio3">상가 주택</label>
									</p>

									<p class="box_radio">
										<input type="radio" name="temp_radio4" id="temp_radio4" class="hidden">
										<label for="temp_radio4">테마형 상가</label>
									</p> -->
								</dd>
							</dl>

							<div class="area col2">
								<dl>
									<dt>준공년도</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="competYearMob" id="competYearMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">년</span>
										</div>
									</dd>
								</dl>

								<dl>
									<dt>리모델링</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="remdelngYearMob" id="remdelngYearMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">년</span>
										</div>
									</dd>
								</dl>
							</div>

							<div class="area col2">
								<dl>
									<dt class="required">해당층</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="floorCoMob" id="floorCoMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">층</span>
										</div>
									</dd>
								</dl>

								<dl>
									<dt class="required">건물층</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="buldFloorCoMob" id="buldFloorCoMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">층</span>
										</div>
									</dd>
								</dl>
							</div>
							<dl>
								<dt class="required">계약면적</dt>
								<dd>
									<div class="area area2 col2">
										<div class="hasUnit">
											<input type="text" name="cntrctArMob" id="cntrctArMob" class="w100p radius" onkeyup="calcSm(1,this);" title="계약면적" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">평</span>
										</div>

										<span class="unit">=</span>

										<div class="hasUnit">
											<input type="text" name="cntrctArMobSm" id="cntrctArMobSm" class="w100p radius" onkeyup="calcSm(2,this);" title="계약면적" style="background-color:#fff" disabled>
											<span class="unit">㎡</span>
										</div>
									</div>
								</dd>
							</dl>

							<dl>
								<dt class="required">전용면적</dt>
								<dd>
									<div class="area area2 col2">
										<div class="hasUnit">
											<input type="text" name="dvrArMob" id="dvrArMob" class="w100p radius" onkeyup="calcSm(1,this);" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">평</span>
										</div>

										<span class="unit">=</span>
									
										<div class="hasUnit">
											<input type="text" name="dvrArMobSm" id="dvrArMobSm" class="w100p radius" onkeyup="calcSm(2,this);" style="background-color:#fff" disabled>
											<span class="unit">㎡</span>
										</div>
									</div>
								</dd>
							</dl>

							<div class="area col2">
								<dl>
									<dt class="required">보증금</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="gtnMob" id="gtnMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">만원</span>
										</div>
									</dd>
								</dl>

								<dl>
									<dt class="required">월세</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="mtRntchrgMob" id="mtRntchrgMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">만원</span>
										</div>
									</dd>
								</dl>
							</div>

							<div class="area col2">
								<dl>
									<dt class="required">권리금</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="premumMob" id="premumMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">만원</span>
										</div>
									</dd>
								</dl>

								<dl>
									<dt class="required">관리비</dt>
									<dd>
										<div class="hasUnit">
											<input type="text" name="managectMob" id="managectMob" class="w100p radius" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');">
											<span class="unit">만원</span>
										</div>
									</dd>
								</dl>
							</div>
						</div>
					
						<div class="tableArea forMo">
							<h4 class="relative">
								기타정보
								<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
							</h4>

							<dl>
								<dt class="required">주차</dt>
								<dd>
									<div class="box_radio">
										<input type="radio" name="parkngAtMob" id="parkngAtMob_1" class="hidden" checked="checked" value="Y">
										<label for="parkngAtMob_1">가능</label>
									</div>
									
									<div class="box_radio">
										<input type="radio" name="parkngAtMob" id="parkngAtMob_2" class="hidden" value="N">
										<label for="parkngAtMob_2">불가능</label>
									</div>
								</dd>
							</dl>

							<dl>
								<dt class="required">엘리베이터</dt>
								<dd>
									<div class="box_radio">
									<input type="radio" id="elvtrAtMob_1" name="elvtrAtMob" class="hidden" checked="checked" value="Y">
										<label for="elvtrAtMob_1">있음</label>
									</div>
									
									<div class="box_radio">
										<input type="radio" id="elvtrAtMob_2" name="elvtrAtMob" class="hidden" value="N">
										<label for="elvtrAtMob_2">없음</label>
									</div>
								</dd>
							</dl>

							<div class="area col2">
								<dl>
									<dt class="required">난방종류</dt>
									<dd>
										<select name="heatKndCodeMob" id="heatKndCodeMob" class="w100p radius">
											<option value="">난방종류 선택</option>
											<c:forEach var="code" items="${heatKndCodeList}">
												<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
											</c:forEach>
										</select>
									</dd>
								</dl>

								<dl>
									<dt class="required">화장실</dt>
									<dd>
										<select name="toiletSeCodeMob" id="toiletSeCodeMob" class="w100p radius">
											<option value="">화장실종류 선택</option>
											<c:forEach var="code" items="${toiletSeCodeList}">
												<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
											</c:forEach>
										</select>
									</dd>
								</dl>
							</div>

							<dl>
								<dt class="required">입주가능일</dt>
								<dd>
									<c:forEach var="code" items="${mvnPosblDeCodeList}">
										<div class="box_radio">
											<input type="radio" id="mvnPosblDeCodeMob_${code.codeValue}" name="mvnPosblDeCodeMob" class="hidden" value="${code.codeValue}" >
											<label for="mvnPosblDeCodeMob_${code.codeValue}">${code.codeValueNm}</label>
										</div>
									</c:forEach>
									<!-- <div class="box_radio">
										<input type="radio" name="temp_radio9" id="temp_radio9" class="hidden" checked="checked">
										<label for="temp_radio9">즉시입주</label>
									</div>
									
									<div class="box_radio">
										<input type="radio" name="temp_radio10" id="temp_radio10" class="hidden">
										<label for="temp_radio10">협의가능</label>
									</div>

									<div class="box_radio">
										<input type="radio" name="temp_radio11" id="temp_radio11" class="hidden">
										<label for="temp_radio11">직접입력</label>
									</div> -->

									<input type="text" class="it date w100p radius" name="mvnPosblDeMob" id="mvnPosblDeMob">
								</dd>
							</dl>

							<dl>
								<dt class="required">매물사진</dt>
								<dd>
									<div id="mAtchFileDiv"></div>
									<!-- <div class="box_file">
										<input type="file" name="temp_file1" id="temp_file1" class="hidden">
										<label for="temp_file1">파일첨부</label>
									</div>
									
									<p class="msg">
										5MByte 이하의 파일만 등록가능합니다.<br>
										등록이미지 크기는 가로 200pixel / 세로 200pixel로 올려주세요.
									</p>
									
									<div class="box_btn block h40 radius charcoal"><button>첨부파일 추가</button></div>
									
									<ul class="list_upload">
										<li>
											<p>2020_images.jpg</p>
									
											<button class="del">삭제</button>
										</li>
									</ul> -->
								</dd>
							</dl>
						</div>
					</form>
						<!-- dddd -->
						
						<div class="check forPc">
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
						
						<div class="check forMo">
							<div class="mCheckbox">
								<input type="checkbox" id="ag1Mob" name="ag1Mob" title="매물정보를 등록할 경우 매물에 대한 책임 및 허위 등 에 대해 빠른 피드백을 위해 양도자의 핸드폰 번호가 공개되는 것에 동의합니다." >
								<label for="ag1Mob">매물정보를 등록할 경우 매물에 대한 책임 및 허위 등 에 대해 빠른 피드백을 위해 양도자의 핸드폰 번호가 공개되는 것에 동의합니다.</label>
							</div>
							<div class="mCheckbox">
								<input type="checkbox" id="ag2Mob" name="ag2Mob" title="전문컨설턴트가 해당 매물정보 및 서류를 검토하여 매물정보 게시여부가 결정되는 사항에 동의합니다." >
								<label for="ag2Mob">전문컨설턴트가 해당 매물정보 및 서류를 검토하여 매물정보 게시여부가 결정되는 사항에 동의합니다.</label>
							</div>
							<div class="mCheckbox">
								<input type="checkbox" id="ag3Mob" name="ag3Mob" title="허위정보의 경우 매물정보가 삭제 될 수 있는 것에 동의합니다." >
								<label for="ag3Mob">허위정보의 경우 매물정보가 삭제 될 수 있는 것에 동의합니다.</label>
							</div>
						</div>
						<div class="mInfo4">
							경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구 경기도는 법적 책임없고 전적으로 올리는 당사자 책임임을 알리는 고지 내용 거버닝 문구
						</div>
		
						<div class="mButton1 center">
							<a href="javascript:void(0);" class="mBtn1 primary forPc" id="btn_insert">등록하기</a>
							<a href="javascript:void(0);" class="mBtn1 primary forMo" id="btn_insertMob">등록하기</a>
							<a href="${contextPath}/board/trade/tradeList.do" class="mBtn1 gray">목록</a>
						</div>
					</div>
					<!-- //module -->
		
				</div>
			</div>
			<!-- //body -->
		</article>
	</div>

	<div id="popupDiv">
	<c:if test="${'[ROLE_US01]' ne sessionScope.user.authorities}">
		<jsp:include page="/WEB-INF/jsp/ui/common/authInfoPopup.jsp"></jsp:include>
	</c:if>
	</div>

