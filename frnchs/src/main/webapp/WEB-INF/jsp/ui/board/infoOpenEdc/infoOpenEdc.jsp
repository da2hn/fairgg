<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoOpenEdc.js"/>"></script>
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
			<h3 class="subtitle forMo">정보공개서 등록</h3>
			<input type="hidden" id="recordCountPerPageMob" value=""/>
			<input type="hidden" id="divComp" value=""/>
			<!-- <input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U09" />
			<input type="hidden" id="menuNm" name="menuNm" value="정보공개서교육">
			<div class="fixTab"><div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div> -->
			<div class="body">
				<div class="bg">
					<ul class="tab_common forMo">
						<li><button onclick="location.href='/board/infoOpenReg/infoOpenReg.do'">정보공개서 등록</button></li>
						<li><button onclick="location.href='/board/infoOpenEdc/infoOpenEdc.do'" class="active">정보공개서 교육</button></li>
					</ul>
					<div class="step step0">
						<h3 class="mTitle6"><span>개인정보 수집 &middot; 이용 동의</span></h3>
						
						<div class="mShare1">
							<p class="infoTxt">경기도에서 진행하는 「가맹사업 정보공개서 교육」 참가 신청과 관련하여 아래 사항을 확인하시고,<br>해당 내용에 동의하시는 경우 하단의 동의 버튼을 클릭한 후 교육을 신청해주세요.	</p>
							<p class="forPc"style="font-size:0.9rem;text-align:center;">[정보공개서 교육이 있을 경우 정보지원게시판에서 알려드립니다. 교육일정 없을시 교육은 진행되지 않습니다.]</p>
							<p class="forMo"style="font-size:0.9rem;">[정보공개서 교육이 있을 경우 정보지원게시판에서 알려드립니다. 교육일정 없을시 교육은 진행되지 않습니다.]</p>
	
							<ul class="tab_common3 tab_type">
								<li><button onclick="tabover('type', 0);" id="head" class="active" style = "width:547px;">가맹본부</button></li>
								<li><button onclick="tabover('type', 1);" id="company" style = "width:547px;">가맹거래사·변호사</button></li>
							</ul>
	
							<div class="tabcnt_common tabcnt_type tabcnt_type0 active">
								<dl class="notify">
									<dt>고지내용</dt>
									<dd>
										<ul class="list_bullet">
											<li>개인정보 수집 &middot; 이용자 : 경기도</li>
											<li>개인정보를 제공받는 자의 개인정보 이용 목적 : 설명회 교육 정보제공</li>
											<li>수집 &middot; 이용하려는 개인정보의 항목 : [기본항목] 참가신청서의 기재사항 개인정보(이름), 연락처(휴대전화번호, 전자우편주소)</li>
											<li>개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 1년</li>
											<li>동의를 거부할 권리가 있음 (다만, 이에 대한 동의를 하지 않을 경우 교육 신청이 거부될 수 있음.)</li>
										</ul>
									</dd>
								</dl>
							</div>
	
							<div class="tabcnt_common tabcnt_type tabcnt_type1">
								<dl class="notify">
									<dt>고지내용</dt>
									<dd>
										<ul class="list_bullet">
											<li>개인정보 수집 &middot; 이용자 : 경기도</li>
											<li>개인정보를 제공받는 자의 개인정보 이용 목적 : 설명회 교육 정보제공</li>
											<li>수집 &middot; 이용하려는 개인정보의 항목 : [기본항목] 참가신청서의 기재사항 개인정보(이름), 연락처(휴대전화번호, 전자우편주소)</li>
											<li>개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 1년</li>
											<li>동의를 거부할 권리가 있음 (다만, 이에 대한 동의를 하지 않을 경우 교육 신청이 거부될 수 있음.)</li>
										</ul>
									</dd>
								</dl>
							</div>
	
							<div class="mCheckbox all">
								<input type="checkbox" id="labelAgreeAll" title="개인정보 수집 및 이용에 모두 동의합니다." name="" />
								<label for="labelAgreeAll">개인정보 수집 및 이용에 모두 동의합니다.</label>
							</div>
	
							<div class="agreeArea">
								<div class="mCheckbox">
									<input type="checkbox" id="labelAgree1_1" title="개인정보처리방침 동의 (필수)" name="" />
									<label for="labelAgree1_1">개인정보처리방침 동의 (필수)</label>
								</div>
	
								<div class="area">
									본인은 「개인정보보호법」제 17조 및 제 18조에 따른 개인정보의 처리에 관하여 고지를 받았으며, 이를 충분히 이해하고 그 처리에 동의합니다.
								</div>
							</div>
	
							<div class="agreeArea">
								<div class="mCheckbox">
									<input type="checkbox" id="labelAgree2_1" title="민감정보처리방침 동의 (필수)" name="" />
									<label for="labelAgree2_1">민감정보처리방침 동의 (필수)</label>
								</div>
							
								<div class="area">
									본인은 「개인정보보호법」제 23조에 따른 민감정보의 처리에 관하여 고지를 받았으며, 이를 충분히 이해하고 그 처리에 동의합니다.
								</div>
							</div>
						</div>
	
						<div class="mButton1 center">
							<a href="javascript:fnAgree();" class="mBtn1 l primary">동의하고 교육 신청하기</a>
							<a href="javascript:fnDisagree();" class="mBtn1 l gray">비동의</a>
						</div>
					</div>
					<div class="step step1" style="display:none;">
						<h3 class="mTitle6"><span>정보공개서 교육 참가신청</span></h3>

						<div class="mShare1">
							<h5 id="mTitle2" class="mTitle2"></h5>

							<div class="mBoard1 mWrite1">
								<table class="tbl_row">
									<caption></caption>
									<colgroup>
										<col style="width:25%;">
										<col style="width:75%;">
									</colgroup>

									<tbody>
										<tr>
											<th scope="row" class="left4"><span class="iMust2" id="mSubTitle0"></span></th>
											<td class="left">
												<div id="frnchsSelect" style="display:none;">
													<select class="ldClass" name="infoLdClass" id="infoLdClass" title="대분류">
														<option value="">- 대분류 -</option>
													</select>
													<select class="mdClass" name="brandMdClass" id="brandMdClass" title="중분류">
														<option value="">- 중분류 -</option>
													</select>			
													<select class="frcClass" name="infoFrcClass" id="infoFrcClass" title="프랜차이즈">
														<option value="">- 프랜차이즈 -</option>
													</select>
												</div>
												<div class="box_btn gray medium" style="display:none;"><button class="searchMtltyNm">검색</button></div>
											</td>
										</tr>
										<tr>
											<th scope="row" class="left4"><span id="mSubTitle1"></span></th>
											<td>
												<div class="gIt">
													<input type="text" name="brandNm" id="brandNm" class="it" style="" readonly/>
												</div>
											</td>
										</tr>

										<tr>
											<th scope="row" class="left4"><span id="mSubTitle2"></span></th>
											<td>
												<div class="gIt">
													<input type="text" name="brandAdres" id="brandAdres" class="it" readonly />
												</div>
											</td>
										</tr>

										<tr>
											<th scope="row" class="left4"><span>대표자명</span></th>
											<td>
												<div class="gIt">
													<input type="text" name="rprsntvNm" id="rprsntvNm" class="it" readonly />
												</div>
											</td>
										</tr>
										<!-- //가맹본부용 -->

										<tr>
											<th scope="row" class="left4"><span class="iMust2">신청자명</span></th>
											<td>
												<div class="gIt">
													<input type="text" name="applcntNm" id="applcntNm" class="it" />
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
											<th scope="row" class="left4"><span>질의사항</span></th>
											<td>
												<div class="gTextarea">
													<textarea name="brandQuest" id="brandQuest" cols="" rows="" class="textarea"></textarea>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<form id="reqForm" method="post">
							<input type="hidden" id="fnBrandNm" name="brandNm" />
							<input type="hidden" id="fnBrandAdres" name="brandAdres" />
							<input type="hidden" id="fnRprsntvNm" name="rprsntvNm" />
							<input type="hidden" id="fnApplcntNm" name="applcntNm" />
							<input type="hidden" id="fnTelNo" name="telNo" />
							<input type="hidden" id="fnEmailAdres" name="emailAdres" />
							<input type="hidden" id="fnQuest" name="brandQuest" />
							<input type="hidden" id="fnDivComp" name="divComp" />
						</form>
						<div class="mButton1 center">
							<a href="#" class="mBtn1 l primary" id="btn_apply">신청하기</a>
							<a href="/board/infoOpenEdc/infoOpenEdc.do" class="mBtn1 l gray">취소</a>
						</div>
					</div>
					<!-- //신청 -->
				</div>
			</div>
		</article>
<!-- </article> -->
	<!-- //body -->
	
