<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<!-- content -->
<div class="content">
	<input type="hidden" name="exprnRegistNo" id="exprnRegistNo" value="${exprnRegistNo }"/>
	<h5 class="mTitle2"><span class="ti">프랜차이즈 체험관리</span> <span class="ts">프랜차이즈 운영 일기장</span></h5>
	<!--<div class="container">-->
		<div id="wrapper">
			<div id="loading"></div>
			<div id="calendar"></div>
			<div class="box_btn radius"><button onclick="toggle_dimmed_view('layer_diary');">레이어 - 일기장 등록</button></div>
		</div>
		<!-- 일정 추가 MODAL -->
		<div class="modal fade" tabindex="-1" role="dialog" id="eventModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
								aria-hidden="true">&times;</span></button>
						<h4 class="modal-title"></h4>
					</div>
					<div class="modal-body">
						<input type="hidden" name="color" id="edit-color" value=""/>
						<input type="hidden" name="color" id="edit-exprn-regist-no" value=""/>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-4" for="edit-title">일매출액</label>
								<input class="inputModal onlyNumber" type="text" name="edit-dail-selng-am" id="edit-dail-selng-am" required="required" maxlength="10"/>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-4" for="edit-start">업무시작시간</label>
								<input class="inputModal" type="text" name="edit-start" id="edit-start" />
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-4" for="edit-end">업무종료시간</label>
								<input class="inputModal" type="text" name="edit-end" id="edit-end" />
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-4" for="edit-desc">영업일지</label>
								<textarea rows="4" cols="50" class="inputModal" name="edit-bsn-diary-cn"
									id="edit-bsn-diary-cn"></textarea>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<label class="col-xs-4" for="edit-desc">본사 피드백</label>
								<textarea rows="4" cols="50" class="inputModal" name="edit-hedofc-fdbck-cn"
									id="edit-hedofc-fdbck-cn" readonly></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer modalBtnContainer-modifyEvent">
						<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
						<button type="button" class="btn btn-primary" id="updateEvent">저장</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->

	<!--</div>-->
	<!-- /.container -->

	<script src="/static/fullCalendar/core/js/bootstrap.min.js"></script>
	<script src="/static/fullCalendar/core/js/moment.min.js"></script>
	<script src="/static/fullCalendar/core/js/fullcalendar.min.js"></script>
	<script src="/static/fullCalendar/core/js/ko.js"></script>
	<script src="/static/fullCalendar/core/js/select2.min.js"></script>
	<script src="/static/fullCalendar/core/js/bootstrap-datetimepicker.min.js"></script>
	<script src="/static/fullCalendar/js/main.js"></script>
	<script src="/static/fullCalendar/js/editEvent.js"></script>
	<script src="/static/fullCalendar/js/etcSetting.js"></script>
</div>
<!-- //content -->
</div>
</div>
	<script src="/static/fullCalendar/core/js/moment.min.js"></script>
	<script src="/static/fullCalendar/core/js/fullcalendar.min.js"></script>
	<link rel="stylesheet" href="/static/fullCalendar/core/css/fullcalendar.min.css">
	<article id="mypageExpDiaryView" class="mypage">
		<h3 class="subtitle forMo">마이페이지</h3>
	</article>
	
	<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
	<div class="body forMo">
	<div class="bg forMo">
	<div class="content">
		<ul class="tab_common2 forMo">
			<li><button onclick="location.href='mypageExpApply.html'">체험프랜차이즈 신청현황</button></li>
			<li><button onclick="location.href='mypageExpDiary.html'" class="active">프랜차이즈 운영 일기장</button></li>
		</ul>
		
		<div id="calendarPc"></div>
		<script src="/static/fullCalendar/js/main.js"></script>
		
		<div class="box_btn radius"><button onclick="toggle_dimmed_view('layer_diary');">레이어 - 일기장 등록</button></div>
		<div class="btn2 forMo">
			<div class="box_btn block h40 radius white"><button onclick="location.href='/myPage/expr/diary/diaryList.do'">목록으로</button></div>
		</div>
	</div>
	</div>
	</div>
	<div class="layer_common layer_diary">
		<div class="titleArea">
			<h3><span class="p_color">놀부부대찌개 안동점</span> 체험일기장</h3>

			<button class="close" onclick="toggle_dimmed_view('layer_diary');">닫기</button>
		</div>

		<div class="inner scroll_y">
			<div class="mBoard1 noline">
				<table>
					<caption>프랜차이즈 운영 일기장 - 운영일, 일 매출액, 요일, 업무시간, 영업일지, 본사피드백</caption>
					<colgroup>
						<col style="width:35%;">
						<col style="width:65%;">
					</colgroup>

					<tbody>
						<tr>
							<th scope="row">운영일</th>

							<td class="left">2021.12.01</td>
						</tr>

						<tr>
							<th scope="row">일 매출액</th>
						
							<td class="left">
								<div class="gIt">
									<input type="text" name="" id="" class="it">
								</div>
							</td>
						</tr>

						<tr>
							<th scope="row">요일</th>
						
							<td class="left">월요일 / 주중</td>
						</tr>

						<tr>
							<th scope="row">업무시간</th>
						
							<td class="left">
								<div class="gIt w11 fl"><input type="text" class="it" name="" id="" title="업무시간 시작"></div>
								<span class="bar">~</span>
								<div class="gIt w11 fl"><input type="text" class="it" name="" id="" title="업무시간 종료"></div>
							</td>
						</tr>

						<tr>
							<th scope="row">영업일지</th>
						
							<td class="left">
								<div class="relative">
									<textarea name="" id="" rows="" class="textarea"></textarea>

									<p class="writeCount">
										<span>0</span>/<span>300</span>
									</p>
								</div>
							</td>
						</tr>

						<tr>
							<th scope="row">본사피드백</th>
						
							<td class="left">
								<div class="gIt">
									<input type="text" class="it">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="btn">
			<div class="box_btn w130 h40 yellow fs16 medium"><button>등록</button></div>
			<div class="box_btn w130 h40 charcoal2 fs16 medium"><button onclick="toggle_dimmed_view('layer_diary');">삭제</button></div>
		</div>
	</div>
</article>