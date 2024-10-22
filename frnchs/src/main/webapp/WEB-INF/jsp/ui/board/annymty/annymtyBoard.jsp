<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/annymtyBoard.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/cmmn/usrUtil.js"/>" charset="utf-8"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
	if (window.innerWidth < 750) {
	 $("#recordCountPerPageMob").val("5");
	 $("#searchFrchsNm").css("width","48%");
	 $("#orderType").css("position","absolute");
	 $("#orderType").css("right","0px");
	 $("#orderType").removeClass("select");
	 $("#infoLdClass").addClass("w100p radius");
	 $("#brandMdClass").addClass("w100p radius");
	 $("#infoFrcClass").addClass("w100p radius");
	}else{
	 $("#recordCountPerPageMob").val("10");
	 $("#infoLdClass").css("width","33%");
	 $("#brandMdClass").css("width","33%");
	 $("#infoFrcClass").css("width","33%");
	}

})
</script>
<!-- <article id="survey"> -->
		<!-- [Dev] id에 페이지명 -->
		<article id="infoEdu">
			<h3 class="subtitle forMo" style="font-size:1rem;">허위•부실정보 익명신고센터</h3>
			<div class="body">
				<div class="bg">
					<div class="step step1">
						<h3 class="mTitle6"><span>허위•부실정보 익명신고</span></h3>
						<div class="mShare1">
							<!-- <h5 id="mTitle2" class="mTitle2">익명제보신청</h5> -->
							<div class="mBoard1 mWrite1">
								<table class="tbl_row">
									<caption></caption>
									<colgroup>
										<col style="width:25%;">
										<col style="width:75%;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row" class="left4"><span class="iMust2">제목</span></th>
											<td>
												<div class="gIt">
													<input type="text" name="annymtyTitle" id="annymtyTitle" class="it" />
												</div>
											</td>
										</tr>

										<tr>
											<th scope="row" class="left4"><span class="iMust2">전화번호</span></th>
											<td>
												<div class="gIt">
													<input type="text" name="telNo" id="telNo" class="it" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');" />
												</div>
											</td>
										</tr>

										<tr>
											<th scope="row" class="left4"><span>이메일</span></th>
											<td>
												<div class="gIt">
													<input type="text" name="emailAdres" id="emailAdres" class="it" />
												</div>
											</td>
										</tr>

										<tr>
											<th scope="row" class="left4"><span class="iMust2">신고사항</span></th>
											<td>
												<div class="gTextarea">
													<textarea class="textarea" rows="10" id="annymtyQuest" style="width:100%;"></textarea>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row" class="left4"><span>파일첨부</span></th>
											<td class="left forPc">
												<div class="mInfo1" style="padding-top:0px;">※ 파일첨부 하나당 5MByte 이하로 제한하고 1개만 등록 가능합니다.</div>
		
												<div class="row attach" id="atchFileBox">
													<div id="atchFileDiv"></div>
												</div>
											</td>
											<td class="left forMo">
												<div id="mAtchFileDiv"></div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<form id="reqForm" method="post">
							<input type="hidden" id="fnTitle" name="annymtyTitle" />
							<input type="hidden" id="fnApplcntNm" name="applcntNm" />
							<input type="hidden" id="fnTelNo" name="telNo" />
							<input type="hidden" id="fnEmailAdres" name="emailAdres" />
							<input type="hidden" id="fnQuest" name="annymtyQuest" />
							<input type="hidden" id="atchmnflNo" name="atchmnflNo"/>
						</form>
						<div class="mButton1 center">
							<a href="#" class="mBtn1 l primary" id="btn_apply">신청하기</a>
							<a href="/" class="mBtn1 l gray">취소</a>
						</div>
					</div>
					<!-- //신청 -->
				</div>
			</div>
		</article>
<!-- </article> -->
	<!-- //body -->