<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/expr/ownerRegSave.js"/>"></script>
<!-- popup -->
<div id="ownerRegSavePopup" class="mPopup1 type3 absolute">
	<div class="cont">
		<h3>가맹본사 참여하기</h3>
		<div class="con">
			<!-- write -->
			<div class="mBoard1 mWrite1 noline">
				<table summary="제목, 상세설명, 담당자명, 연락처로 구성된 표입니다.">
				<caption>기본정보</caption>
				<colgroup>
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th>지역선택</th>
					<td class="left">
						<select class="select w1" name="signguCode" id="signguCode" title="시군구">
						<option>시군구</option>
						</select>
						<select class="select w1" name="adstrdCode" id="adstrdCode" title="행정동">
						<option>행정동</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>브랜드명</th>
					<td class="left">
						<select class="select w1" name="frnchsNo" id="frnchsNo" title="브랜드명">
						<option>브랜드명</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>지점명</th>
					<td class="left">
						<div class="gIt"><input type="text" class="it" name="bhfNm" id="bhfNm" title="지점명"></div>
					</td>
				</tr>
				<tr>
					<th>지점주소</th>
					<td class="left">
						<div class="gIt"><input type="text" class="it" name="bhfAdres" id="bhfAdres" title="지점주소"></div>
					</td>
				</tr>
				<tr>
					<th>체험기간</th>
					<td class="left">
						<div class="gIt w11 fl"><input type="text" class="it date" name="exprnBeginDe" id="exprnBeginDe" title="체험기간 시작일"></div>
						<span class="bar">~</span>
						<div class="gIt w11 fl"><input type="text" class="it date" name="exprnEndDe" id="exprnEndDe" title="체험기간 마지막일"></div>
					</td>
				</tr>
				<tr>
					<th>운영시간</th>
					<td class="left">
						<div class="gIt w11 fl"><input type="text" class="it" name="operBeginTime" id="operBeginTime" title="운영시작 시간"></div>
						<span class="bar">~</span>
						<div class="gIt w11 fl"><input type="text" class="it" name="operEndTime" id="operEndTime" title="운영종료 시간"></div>
					</td>
				</tr>
				<tr>
					<th>모집인원</th>
					<td class="left">
						<div class="gIt w1 fl"><input type="text" class="it onlyNumber" name="rcritNmpr" id="rcritNmpr" maxlength="4" title="모집인원"></div>
						<span class="bar">명</span>
					</td>
				</tr>
				<tr>
					<th>종업원수</th>
					<td class="left">
						<div class="gIt w1 fl"><input type="text" class="it onlyNumber" name="emplyCo" id="emplyCo" maxlength="4" title="종업원수"></div>
						<span class="bar">명</span>
					</td>
				</tr>
				<tr>
					<th>프랜차이즈 영업교육일</th>
					<td class="left">
						<div class="gIt w11 fl"><input type="text" class="it date" name="edcDe" id="edcDe" title="프랜차이즈 영업교육일"></div>
					</td>
				</tr>
				<tr>
					<th>게시 이미지 등록</th>
					<td class="left">
						<div id="atchFileDiv1"></div>
					</td>
				</tr>
				<tr>
					<th>교육커리 큘럼교재</th>
					<td class="left">
						<div id="atchFileDiv2"></div>
					</td>
				</tr>
				<tr>
					<th>대표자</th>
					<td class="left">
						<div class="gIt w1 fl" id="rprsntvNm">123</div>
					</td>
				</tr>
				<tr>
					<th>임직원수</th>
					<td class="left">
						<div class="gIt w1 fl" id="exctvEmpSum">123</div>
					</td>
				</tr>
				<tr>
					<th>직영점 평수</th>
					<td class="left">
						<div class="gIt w1 fl"><input type="text" name="droperStorAr" id="droperStorAr" class="it onlyNumber" maxlength="5" title="직영점 평수"></div>
						<span class="bar">㎡</span>
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->

			<div class="mButton1">
				<a href="javascript:void(0)" id="btnSave" class="mBtn1 primary">저장</a>
				<a href="javascript:void(0)" class="mBtn1 gray btnPopupClose">닫기</a>
			</div>
		</div>
		<a href="javascript:void(0)" class="close jsBtnClose1 btnPopupClose">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->
<!-- <script src="/static/fullCalendar/core/js/bootstrap.min.js"></script> -->
<script src="/static/fullCalendar/core/js/moment.min.js"></script>
<!-- <script src="/static/fullCalendar/core/js/fullcalendar.min.js"></script> -->
<!-- <script src="/static/fullCalendar/core/js/ko.js"></script> -->
<!-- <script src="/static/fullCalendar/core/js/select2.min.js"></script> -->
<script src="/static/fullCalendar/core/js/bootstrap-datetimepicker.min.js"></script>
<script>
//datetimepicker
$("#operBeginTime, #operEndTime").datetimepicker({
    format: 'HH:mm'
});

</script>
