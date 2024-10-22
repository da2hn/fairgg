<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<!-- <article id="survey"> -->
		<!-- [Dev] id에 페이지명 -->
		<article id="infoOpen">
			<h3 class="subtitle forMo">정보공개서 등록</h3>
			<!-- <input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U09" />
			<input type="hidden" id="menuNm" name="menuNm" value="정보공개서등록">
			<div class="fixTab"><div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div> -->
			<div class="body">
				<div class="bg">
					<ul class="tab_common forMo">
						<li><button onclick="location.href='/board/infoOpenReg/infoOpenReg.do'" class="active">정보공개서 등록</button></li>
						<li><button onclick="location.href='/board/infoOpenEdc/infoOpenEdc.do'">정보공개서 교육</button></li>
					</ul>
					<h3 class="mTitle6 forPc"><span>정보공개서</span></h3>

					<div class="mShare1">
						<div class="info">가맹사업법 개정으로 ‘19.01.01 부터는 각 관할지자체에서 정보공개서 등록심사업무를 수행합니다.</div>

						<div class="mTitle7">정보공개서 등록이란?</div>
						<ul class="mList5">
							<li>
								“가맹사업”이라 함은 가맹본부가 가맹점사업자로 하여금 자기의 상표ㆍ서비스표ㆍ상호ㆍ간판 그 밖의 영업표지(이하 “영업표지”라 한다)를 사용하여 일정한 품질기준이나 영업방식에 따라 상품(원재료 및 부재료를 포함한다. 이하 같다) 또는 용역을 판매하도록 함과 아울러 이에 따른 경영 및 영업활동 등에 대한 지원ㆍ교육과 통제를 하며, 가맹점사업자는 영업표지의 사용과 경영 및 영업활동 등에 대한 지원ㆍ교육의 대가로 가맹본부에 가맹금을 지급하는 계속적인 거래관계를 말합니다.
							</li>

							<li>
								정보공개서는 가맹본부의 일반 현황,  가맹본부의 가맹사업 현황, 가맹점주가 부담해야 할 비용 등 가맹희망자의 창업 여부 결정에 꼭 필요한 정보에 관하여 대통령령으로 정하는 사항을 수록한 문서를 말합니다.
							</li>

							<li>가맹사업법은 가맹희망자의 정보부족으로 발생하는 불측의 피해를 방지하기 위해
								<ol class="forPc">
									<li><span class="n">1</span> 가맹본부가 공정거래위원회 또는 특별시장ㆍ광역시장ㆍ특별자치시장ㆍ도지사ㆍ특별자치도지사에 정보공개서를 등록하고</li>
									<li><span class="n">2</span> 가맹계약을 체결하기 14일 전에 정보공개서 제공할 것을 의무화하고 있습니다.</li>
								</ol>

								<ol class="list_num forMo">
									<li>가맹본부가 공정거래위원회 또는 특별시장&middot;광역시장&middot;특별자치시장&middot;도지사&middot;특별자치도지사에 정보공개서를 등록하고,</li>
									<li>가맹계약을 체결하기 14일 전에 정보공개서 제공할 것을 의무화하고 있습니다.</li>
								</ol>
							</li>
						</ul>

						<div class="mTitle7">정보공개서 등록심사절차는?</div>
						<ul class="mList5">
							<li>신청절차
								<div class="mList6 forPc">
									<div class="ls">
										<strong class="t"><span>접수</span></strong>
										온·오프라인<br> (가맹사업거래시스템)
									</div>
									<div class="ls">
										<strong class="t"><span>등록심사</span></strong>
										정보공개서<br> 등록심사
									</div>
									<div class="ls">
										<strong class="t"><span>처분</span></strong>
										등록(거부)처분
									</div>
									<div class="ls">
										<strong class="t"><span>통지</span></strong>
										당사자<br> 준수사항안내
									</div>
									<div class="ls">
										<strong class="t"><span>공개</span></strong>
										가맹사업거래<br> 시스템(온라인)
									</div>
								</div>

								<ol class="list_num forMo">
									<li>접수 : 온/오프라인(가맹사업 거래시스템)</li>
									<li>등록심사 : 정보공개서 등록심사</li>
									<li>처분 : 등록(거부) 처분</li>
									<li>통지 : 당사자 준수사항 안내</li>
									<li>공개 : 가맹사업 거래시스템(온라인)</li>
								</ol>
							</li>
							<li class="forPc">심사내용 : 정보공개서 신규등록사항, 변경등록사항, 변경신고사항 등</li>
							<li class="forMo">
								심사내용

								<p>정보공개서 신규등록사항, 변경등록사항, 변경신고사항 등</p>
							</li>
						</ul>

						<div class="mTitle7">정보공개서 등록신청방법은?</div>
						<ul class="mList5">
							<li class="forPc">신청대상 : 경기도 내 주된 소재지를 둔 가맹본부</li>
							<li class="forMo">
								신청대상

								<p>경기도 내 주된 소재지를 둔 가맹본부</p>
							</li>

							<li class="forPc">제출서류 : 등록신청서 등 필요서류 제출 (인터넷, 방문 또는 우편)</li>
							<li class="forMo">
								제출서류
								
								<p>등록신청서 등 필요서류 제출(인터넷, 방문 또는 우편)</p>
							</li>

							<li>
								접수장소
								
								<div class="lst forPc">
									<div class="ls">
										<div class="t">온라인</div>
										<div class="c">
<!-- 											<a href="mailto:http://franchise.ftc.go.kr" target="_blank" title="새창열림">http://franchise.ftc.go.kr</a> -->
 											<a href="http://franchise.ftc.go.kr" target="_blank" title="새창열림">http://franchise.ftc.go.kr <img src="../../../../../static/images/ico_pageLink.png" style="position:relative;top:-2px;width:35px;margin-left:5px"/></a>
										</div>
									</div>
									<div class="ls">
										<div class="t">우편/방문</div>
										<div class="c">
<!-- 											경기도 수원시 팔달구 효원로 1, 경기도청 제3별관 4층 공정경제과 -->
											경기도 수원시 영통구 도청로 30, 경기도청 16층 공정경제과
											<div class="iTel"><strong>전화문의 : 031-8008-5550</strong></div>
										</div>
									</div>
								</div>

								<ul class="list_hyphen forMo">
									<li>온라인 : <a href="http://franchise.ftc.go.kr" target="_blank">http://franchise.ftc.go.kr <img src="../../../../../static/images/ico_pageLink.png" style="position:relative;top:-2px;width: 25px;margin-left: 2px;"></a></li>
<!-- 									<li>우편/방문 : 경기도 수원시 팔달구 효원로1, 경기도청 제3별관 4층 공정경제과</li> -->
									<li>우편/방문 : 경기도 수원시 영통구 도청로 30, 경기도청 16층 공정경제과</li>
									<li>전화문의 : <a href="tel:031-8008-5550">031-8008-5550</a></li>
								</ul>
							</li>

							<li class="forPc">
								접수기간 (신규, 변경등록(정기,수시), 변경기한은 신청유형별로 상이)
								<ul>
									<li>신규등록 : 별도 기간제한 없음</li>
									<li>정기변경 : 매사업년도가 끝난 후 120일 이내<br> (다만, 재무재표를 작성하는 개인사업자인 가맹본부는 매 사업연도가 끝난 후 180일 이내)</li>
									<li>수시변경등록/신고 : 변경사유 발생한 날로부터 30일 이내/발생 분기가 끝난 후 30일 이내</li>
								</ul>
							</li>
							<li class="forMo">
								접수기간

								<ul class="list_hyphen">
									<li>신규, 변경등록(정기, 수시), 변경기한 신청유형별 상이</li>
									<li>신규등록 : 별도기간제한 없음</li>
									<li>정기변경 : 매사업년도가 끝난 후 120일 이내(다만, 재무재표를 작성하는 개인사업자인 가맹본부는 매 사업연도가 끝난 후 180일 이내)</li>
									<li>수시변경등록/신고 : 변경사유 발생한 날로부터 30일 이내/발생 분기가 끝난 후 30일 이내</li>
								</ul>
							</li>
						</ul>

						<div class="box_btn block h40 radius white forMo">
<!-- 							<button>정보공개서 온라인 등록사이트 바로가기</button> -->
							<button onclick="location.href='http://franchise.ftc.go.kr'">정보공개서 온라인 등록사이트 바로가기</button>
						</div>
					</div>

					<div class="mButton1 center mt1 forPc">
<!-- 						<a href="#" target="_blank" class="mBtn1 l3 primary">정보공개서 온라인 등록사이트 바로가기</a> -->
 						<a href="http://franchise.ftc.go.kr" target="_blank" class="mBtn1 l3 primary">정보공개서 온라인 등록사이트 바로가기</a>
					</div>
				</div>
			</div>
		</article>
	</div>
<!-- </article> -->
	<!-- //body -->
