<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/inqryList.js"/>"></script>
<jsp:include page="/WEB-INF/tiles/inqryPopup.jsp"/><!-- 문의사항 배정 팝업 -->
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})

</script>
<style>
.iview{display:block;background:url(/static/images/i_view.png) 0 0 no-repeat;margin:0 auto;text-indent:-9999px;font-size:0;width:24px;height:16px;}
</style>
<!-- content -->
		<div class="content">
			<h5 class="mTitle2"><span class="ti">매물점포 관리</span> <span class="ts">매물점포 문의신청 현황</span></h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;" style="position: relative;">
					<input type="hidden" id="pageSe" name="pageSe" />
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" id="myInqryVal" name="myInqry" value="N">
					<select title="매물점포 관리현황 검색구분" class="select" id="schSeCode" name="schSeCode" >
						<option value="schSj">제목</option>
						<!-- <option value="schSopsrtStleCodeNm">구분</option> -->
						<option value="schAnswerSttusSeCodeNm">진행상태</option>
		<!-- 				<option value="schConfmUserNm">접수자(컨설턴트)</option>
						<option value="schSj">제목</option>
						<option value="schSopsrtStleCodeNm">상가형태</option> -->
		<!-- 				<option value="schAdres">주소</option> -->
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0);" class="mBtn1" id="btn_sch" onclick="javascript:fn_selectInqryList()">검색</a>
					<div class="mBox1" style="display: inline;border: 0;background-color: transparent;padding: 0;margin-left:30px;">					
						<div class="mCheckbox" style="display:inline;">
							<input type="checkBox" class="chkMyInqry" id="myInqry" name="myInqry" value="N">
							<label for="myInqry" style="position: absolute;right:0%;bottom:0%;">내 문의만 조회</label>
						</div>
					</div>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				</form>
			</div>
			<div class="gRt" align="right">
				<%-- <a href="${contextPath}/myPage/board/info/infoSave.do" class="mBtn1 primary">글쓰기</a> --%>
				<!-- <a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a> -->
<!-- 				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_del">답변완료</a> -->
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table>
				<caption>매물점포 관리현황</caption>
				<colgroup>
<%-- 					<col width="55px"> --%>
					<col width="5%;">
					<col width="auto;">
					<col width="9%;">
					<col width="9%;">
					<col width="10%;">
					<col width="8%;">
					<col width="8%;">
				</colgroup>
				<thead>
				<tr>
<!-- 					<th scope="col">선택</th> -->
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">구분</th>
					<th scope="col">문의자</th>
					<th scope="col">진행상태</th>
					<th scope="col">매물정보</th>
					<th scope="col">첨부파일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="7">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag">
			</div>
			<!-- //paging -->
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo">
				<div class="swiper-wrapper"></div>
			</div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;"></ul>
				<div class="search">
					<select name="" id="schSeCodeMob" class="radius">
						<option value="schSj">제목</option>
						<option value="schAnswerSttusSeCodeNm">진행상태</option>
					</select>
					<div class="box_search radius">
						<input type="text" name="schTxtMob" id="schTxtMob" placeholder="검색어">
						<button id="btn_schMob">search</button>
					</div>
					<div class="mCheckbox" style="display:inline;">
						<input type="checkBox" class="chkMyInqry" id="myInqryMob" name="myInqryMob">
						<label for="myInqryMob" style="margin-top:10px;">내 문의만 조회</label>
					</div>
				</div>

<!-- 				<div class="btn tar">
					<div class="box_btn w100 h26 radius gray"><button>삭제요청</button></div>
				</div> -->
				<ul class="list_board hasCheck" id="dataTbodyMob">
<!-- 					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check0" id="temp_check0" class="hidden notxt">
								<label for="temp_check0"></label>
							</p>

							<a href="mypageSaleManageDetail.html">
								<div class="numState">
									<span class="no">NO.10</span>
									<span class="state">검토중</span>
								</div>

								<p class="subject">경기도 카페501 수원점 매각</p>

								<p class="nameDate">
									<span>근린상가</span>

									<span>
										<strong>컨설턴트</strong>
										손기웅
									</span>

									<span>
										<strong>신청일</strong>
										2020.10.25
									</span>
								</p>

								<p class="attach">없음</p>
							</a>
						</div>
					</li> -->
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			<div id="inqryPopupMob" class="layer_common layer_popup layer_qnaDetail layer_qnaDetail_0">
			<input type="hidden" id="trdeThingInqryNoMob" />
			<div class="titleArea">
				<h3>매물점포 답변하기</h3>

				<button class="close jsBtnClose1" onclick="toggle_dimmed_view('layer_qnaDetail_0');">닫기</button>
			</div>

			<div class="inner scroll_y">
				<div class="cateDate">
					<p class="reply active" id="replyActive"></p>
					<p class="reply" id="replyNon"></p>
					<p class="nameDate">
							<span><strong style="position: relative;top: 2px;">작성자</strong>
							<span id="inqryUserNmMob" style="margin-left:4px"></span>
							</span>
						<span id="inqryRegDtMob"></span>
					</p>
				</div>

				<!-- <p class="subject">경기도 카페501 수원점 매각</p> -->
				<p class="subject"><span id="inqryTitleMob" style="font-size:1.333rem"></span></p>

				<p class="contact">
					<a href="mailto:openmate@openmate.co.kr"><span id="inqrEmailAdresMob" style="color:#999"></span></a>
					<a href="tel:01012345678"><span id="inqrTelnoMob" style="color:#999"></span></a>
				</p>

				<ul id="atchFileDivMob" class="attach">
					<!-- <li><a href="#">첨부파일있을경우.pdf</a></li> -->
<!-- 					<li><a id="atchmnflMob" class="ul"><span id="fileNmMob" style="color:#f8a80f"></span></a></li> -->
				</ul>

				<div class="cont" id="inqryCnMob">
					<!-- 경기도가 프리랜서의 부당행위 피해 상담 및 구제 등을 위해 오는 12월까지 ‘2021 프리랜서 법률자문 및 피해 상담’ 서비스를 추진합니다.
					지난 2020년 경기도에 거주하는 프리랜서 1,246명을 대상으로 진행한 ‘프리랜서 실태조사’ 결과 부당행위를 경험한 프리랜서가 87.4%에 달하는 것으로 나타났습니다.
					‘경기도에 희망하는 지원방안’을 묻는 문항에는 응답자의 80%가 ‘부당행위에 대한 상담지원’을 요청했으며, 공정거래 가이드라인 개발보급이 76.9%, 협동조합 활성화 지원이 73.5%, 교육 및 정서적 심리적 지원이 69.9% 순으로 조사됐습니다.					
					계약서 검토 및 자문, 피해상담 및 구제 등 도움이 필요한 경기도 내 프리랜서라면 경기도 공정거래지원센터의 문을 두드려주세요. -->
				</div>

				<dl class="replyEnter">
					<dt>답변입력</dt>

					<dd class="relative">
						<textarea id="answerCnMob" class="w100p radius"></textarea>

						<p class="count">
							<!-- <span>0</span>
							/
							<span>300</span> -->
						</p>
					</dd>
				</dl>
			</div>

			<div class="btn btn_col col2" style="margin-bottom:0px;">
				<div id="closeBtnMob" class="box_btn block h50 gray fs16 bold jsBtnClose1"><button onclick="toggle_dimmed_view('layer_qnaDetail_0');">닫기</button></div>
				<div class="box_btn block h50 fs16 bold jsBtnClose1"><button id="btnAnswerMob">답변등록</button></div>
				<!-- [Dev] '답변완료' 되었을 때는 답변수정 버튼 노출 -->
				
				<!-- <div class="box_btn block h50 fs16 bold"><button>답변수정</button></div> -->
				
			</div>
		</div>
	</div>
<!-- content -->


