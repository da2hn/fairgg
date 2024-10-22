<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/stat/stat_local.js"/>"></script>


<style>
.body{padding-bottom:70px;}

#footer .forMo {display:none;}
#map { width: 800px; height: 500px; }
.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.info2 { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; } .legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }
</style>
<%@ include file="/WEB-INF/tiles/gis.jsp" %>
<%@ include file="/WEB-INF/tiles/leaflet_gis.jsp" %>
<input type="hidden" name="localYear" id="localYear" value="${localYear }"/>
<input type="hidden" name="localLd" id="localLd" value="${localLd }"/>
<input type="hidden" name="localMd" id="localMd" value="${localMd }"/>
<!-- body -->
<article id="franchiseInfo" class="franchise statistics">
<div class="body forPc">
	<div class="bg">

		<!-- lnb -->
		<div class="mLnb type2">
			<ul>
				<li class="i selected"><a href="javascript:void(0)" id="localBtn">지역별 통계</a>
					<div class="dep2">
						<dl>
							<dt>분석기간 선택</dt>
							<dd>
								<select class="select year" title="분석기간 선택">
									<option>2019년</option>
								</select>
							</dd>
							<dt>프랜차이즈 업종선택</dt>
							<dd>
								<select class="select ldClass" title="프랜차이즈 업종선택">
									<!-- <option value="">- 대분류 -</option> -->
									<option value="">- 전체 -</option>
								</select> 
								<select class="select mdClass" title="프랜차이즈 업종선택">
									<!-- <option value="">- 중분류 -</option> -->
									<option value="">- 전체 -</option>
								</select>
							</dd>
						</dl>
						<a href="javascript:void(0)" class="mBtn1 viewLocalBtn">조회</a>
					</div>
				</li>
				<!-- <li class="i">
					<a href="javascript:void(0)" id="brandBtn">브랜드 통계</a>
					<div class="dep2">
						<dl>
						<dt>분석기간 선택</dt>
						<dd>
							<select class="select" name="brandYear" id="brandYear" title="분석기간 선택">
							<option>2019년</option>
							</select>
						</dd>
						<dt>프랜차이즈 선택</dt>
						<dd>
							<select class="select" name="brandLdClass" id="brandLdClass" title="대분류">
							<option value="">- 전체 -</option>
							</select>
							<select class="select" name="brandMdClass" id="brandMdClass" title="중분류">
							<option value="">- 전체 -</option>
							</select>
							<select class="select frcClass" name="brandFrcClass" id="brandFrcClass" title="프랜차이즈">
							<option value="">- 전체 -</option>
							</select>
							<a href="javascript:void(0)" class="mBtn1 jsBtnShow1 searchMtltyNm" style="display:none;">프랜차이즈 검색</a>
						</dd>
						</dl>
						<a href="javascript:void(0)" class="mBtn1 viewBrandBtn">조회</a>
					</div>
				</li> -->
			</ul>
		</div>
		<!-- //lnb -->

		<!-- content -->
		<div class="content bgType1"> <!-- add20210306 -->

			<div class="mGrid1">
				<!-- main1 -->
				<div class="mMain1">
					<h3 class="mTitle5">업종별 프랜차이즈 가맹점 통계</h3>
					<div class="con">
						<a href="javascript:void(0)" class="lCnt r11 chartBtn" id="11" style="top:70px;left:99px;"><span class="t">서울</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r26 chartBtn" id="26" style="top:290px;left:232px;"><span class="t">부산</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r27 chartBtn" id="27" style="top:225px;left:203px;"><span class="t">대구</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r28 chartBtn" id="28" style="top:86px;left:58px;"><span class="t">인천</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r29 chartBtn" id="29" style="top:285px;left:68px;"><span class="t">광주</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r30 chartBtn" id="30" style="top:191px;left:122px;"><span class="t">대전</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r31 chartBtn" id="31" style="top:241px;left:247px;"><span class="t">울산</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r36 chartBtn" id="36" style="top:151px;left:105px;"><span class="t">세종</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r41 chartBtn" id="41" style="top:104px;left:129px;"><span class="t">경기</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r42 chartBtn" id="42" style="top:68px;left:179px;"><span class="t">강원</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r43 chartBtn" id="43" style="top:144px;left:147px;"><span class="t">충북</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r44 chartBtn" id="44" style="top:174px;left:66px;"><span class="t">충남</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r45 chartBtn" id="45" style="top:239px;left:94px;"><span class="t">전북</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r46 chartBtn" id="46" style="top:310px;left:104px;"><span class="t">전남</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r47 chartBtn" id="47" style="top:169px;left:198px;"><span class="t">경북</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r48 chartBtn" id="48" style="top:267px;left:156px;"><span class="t">경남</span><span class="c"></span></a>
						<a href="javascript:void(0)" class="lCnt r50 chartBtn" id="50" style="top:379px;left:101px;"><span class="t">제주</span><span class="c"></span></a>
					</div>
				</div>
				<!-- //main1 -->
				<!-- sub1 -->
				<div class="mSub1_2">
					<h3 class="mTitle5"><t id="s_year">2019년</t> <em class="p_ctprvnCode">전체</em> 점포수 통계</h3>
					<div class="con">
						<div class="ls">
							<div class="t">점포 비율 <span class="s">(단위: %)</span></div>
							<div class="g" id="chart1"></div>
						</div>
						<div class="ls">
							<div class="t">가맹점 평균 매출액 <span class="s">(단위: 천원)</span></div>
							<div class="g" id="chart2"></div>
						</div>
						<div class="ls">
							<div class="t">종사자 수 <span class="s">(단위: 천명)</span></div>
							<div class="g" id="chart3"></div>
						</div>
						<div class="ls">
							<div class="t">거주인구 수 <span class="s">(단위: 천명)</span></div>
							<div class="g" id="chart4"></div>
						</div>
					</div>
				</div>
				<!-- //sub1 -->
			</div>

			<div class="mGrid4" style="margin-right: 28px;overflow: hidden;">
				<h3 class="mTitle5"><em  class="p_ctprvnCode">전체</em> 통계 요약 결과</h3>
				<div class="con">
<!-- 					<div class="ti"> -->
<!-- 						<h4>가맹점 및 직영점 추이</h4> -->
<!-- 						<div class="rt">(단위 : 개)</div> -->
<!-- 					</div> -->
<!-- 					<div id="trend1" class="trend1"></div> -->

<!-- 					<div class="ti"> -->
<!-- 						<h4>가맹점 평균 매출액 추이</h4> -->
<!-- 						<div class="rt">(단위 : 천원)</div> -->
<!-- 					</div> -->
<!-- 					<div id="trend2" class="trend2"></div> -->

<!-- 					<div class="ti"> -->
<!-- 						<h4>종사자수 추이</h4> -->
<!-- 						<div class="rt">(단위 : 천명)</div> -->
<!-- 					</div> -->
<!-- 					<div id="trend3" class="trend3"></div> -->

<!-- 					<div class="ti"> -->
<!-- 						<h4>거주인구수 추이</h4> -->
<!-- 						<div class="rt">(단위 : 천명)</div> -->
<!-- 					</div> -->
<!-- 					<div id="trend4" class="trend4"></div> -->
						<div class="ls">
							<h4>가맹점 및 직영점 추이</h4>
							<div class="g" id="trend1"></div>
						</div>
						<div class="ls">
							<h4>가맹점 평균 매출액 추이</h4>
							<div class="g" id="trend2"></div>
						</div>
						<div class="ls">
							<h4>종사자 수 추이</h4>
							<div class="g" id="trend3"></div>
						</div>
						<div class="ls">
							<h4>거주인구 수 추이</h4>
							<div class="g" id="trend4"></div>
						</div>
				</div>
			</div>

			<!-- sub1 -->
			<div class="mSub1">
				<div class="list" id="ajaxArea">
				</div>
			</div>
			<!-- //sub1 -->
			
			<!-- sub4 -->
			<div class="mSub4">
				<!-- left -->
				<div class="gLeft">
					<h3 class="mTitle5">시도단위 <em>프랜차이즈 종사자 수</em> 현황</h3>
					<div id="map1" class="gis_con map" style="z-index: 10;"></div>
				</div>
				<!-- //left -->
				<!-- right -->
				<div class="gRight">
					<h3 class="mTitle5">전국 시도단위 <em>프랜차이즈 매출</em> 현황</h3>
					<div id="map2" class="gis_con map" style="z-index: 10;"></div>
				</div>
				<!-- //right -->
			</div>
			<!-- //sub4 -->
			
			<ul class="mList3" style="padding: 20px 0px;">
				<li>
				경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
				창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다.
<!-- 				카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
				</li>
			</ul>
		</div>
		<!-- //content -->

	</div>
</div>
<h3 class="subtitle forMo">업종 통계</h3>
	<div class="wrap_inner forMo">
		<div class="fixTab">
				<ul class="tab_common">
					<li><button onclick="location.href='/stat/franStatList.do'" class="active">지역별 통계</button></li>
					<li><button onclick="location.href='/stat/franBrandStatList.do'">브랜드 통계</button></li>
				</ul>
		</div>

				<div class="step step0 active">
					<dl class="datalist_common">
						<dt>분석기간 선택</dt>

						<dd>
							<select name="yearMob" id="yearMob" class="w100p radius"></select>
						</dd>
					</dl>

					<dl class="datalist_common">
						<dt>프랜차이즈 선택</dt>

						<dd>
							<div class="box_col col2">
								<select name="ldClassMob" id="ldClassMob" class="radius ldClass"></select>

								<select name="mdClassMob" id="mdClassMob" class="radius mdClass">
									<option value="전체">전체</option>
								</select>
								
								<!-- <select name="" id="" class="w100p mgt8 radius" style="width:100%" disabled>
								<option value="전체">프랜차이즈명</option>
							  	</select> -->
								
							</div>
						</dd>
					</dl>

					<div class="box_btn block h50 fix"><button id="viewLocalBtnMob">조회하기</button></div>
				</div>
				
				<div class="step step1">
					<dl class="datalist_common">
						<dt class="relative">
							<p id="ldml" class="p_color"></p>
							<em  class="p_ctprvnCode" style="font-size: 15px;">전체</em> 프랜차이즈 가맹점 통계
<!-- 							<button class="share">공유하기</button> -->
								<p class="msg">지도에서 지역을 클릭하시면 해당지역의 상세 통계내역을 보실 수 있습니다.</p>
						</dt>

						<dd>
							<span id="yearTxt" class="stand"><t id="s_yearMob">2019</t>년 기준</span>
							<div class="peninsula" style="z-index:1">
								<p style="top: 77px;left: 86px;">
<!-- 									<a class="lCnt r11 chartBtn" id="11" href="#" onclick="toggle_dimmed_view('layer_statistics_seoul'); return false;"> -->
									<a class="r11Mob lCntMob chartBtnMob">
										<strong>서울</strong><span class="c" id="11"></span>
									</a>
								</p>

								<p style="top: 296px; left: 250px;">
<!-- 								<a class="lCnt r26 chartBtn" id="26" href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r26Mob lCntMob chartBtnMob">
										<strong>부산</strong><span class="c" id="26"></span>
									</a>
								</p>
								<p style="top: 229px; left: 208px;">
<!-- 									<a class="lCnt r27 chartBtn" id="27" href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r27Mob lCntMob chartBtnMob">
										<strong>대구</strong><span class="c" id="27"></span>
									</a>
								</p>
								<p style="top:46px; left: 42px;">
		<!-- 						<a class="lCnt r28 chartBtn" id="28"  href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r28Mob lCntMob chartBtnMob">
										<strong>인천</strong><span class="c" id="28"></span>
									</a>
								</p>
								<p style="top: 300px; left: 48px;">
<!-- 								<a class="lCnt r29 chartBtn" id="29"  href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r29Mob lCntMob chartBtnMob">
										<strong>광주</strong><span class="c" id="29"></span>
									</a>
								</p>
								<p style="top: 197px; left: 142px;">
<!-- 									<a class="lCnt r30 chartBtn" id="30" href="#" onclick="toggle_dimmed_view('layer_statistics_seoul'); return false;"> -->
									<a class="r30Mob lCntMob chartBtnMob">
										<strong>대전</strong><span class="c" id="30"></span>
									</a>
								</p>
								<p style="top: 245px; left: 271px;">
<!-- 									<a class="lCnt r31 chartBtn" id="31" href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r31Mob lCntMob chartBtnMob">
										<strong>울산</strong><span class="c" id="31"></span>
									</a>
								</p>
								<p style="top:151px;left:105px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r36Mob lCntMob chartBtnMob">
										<strong>세종</strong><span class="c" id="36"></span>
									</a>
								</p>
								<p style="top: 111px; left: 119px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r41Mob lCntMob chartBtnMob">
										<strong>경기</strong><span class="c" id="41"></span>
									</a>
								</p>
								<p style="top:68px;left:210px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r42Mob lCntMob chartBtnMob">
										<strong>강원</strong><span class="c" id="42"></span>
									</a>
								</p>
								<p style="top:142px; left: 171px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_seoul'); return false;"> -->
									<a class="r43Mob lCntMob chartBtnMob">
										<strong>충북</strong><span class="c" id="43"></span>
									</a>
								</p>
								<p style="top:186px; left:69px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r44Mob lCntMob chartBtnMob">
										<strong>충남</strong><span class="c" id="44"></span>
									</a>
								</p>
								<p style="top:244px; left: 85px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r45Mob lCntMob chartBtnMob">
										<strong>전북</strong><span class="c" id="45"></span>
									</a>
								</p>
								<p style="top:319px; left:115px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r46Mob lCntMob chartBtnMob">
										<strong>전남</strong><span class="c" id="46"></span>
									</a>
								</p>
								<p style="top:173px; left: 246px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r47Mob lCntMob chartBtnMob">
										<strong>경북</strong><span class="c" id="47"></span>
									</a>
								</p>
								<p style="top:267px;left:156px;">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
									<a class="r48Mob lCntMob chartBtnMob">
										<strong>경남</strong><span class="c" id="48"></span>
									</a>
								</p>
								<p style="top: 441px;left: 47px;">
									<a class="r50Mob lCntMob chartBtnMob">
<!-- 									<a href="#" onclick="toggle_dimmed_view('layer_statistics_incheon'); return false;"> -->
										<strong>제주</strong><span class="c" id="50"></span>
									</a>
								</p>
							</div>
						</dd>
					</dl>
					<!-- <div id="subMob" style="display:none;">
					<dl class="datalist_toggle" id="chart1MobToggle">
						<dt onclick="dlToogle(this);">점포비율 (단위: %)</dt>
						<dd>							
							<div class="ls">
								<div class="t">점포 비율</div>
								<div class="g" id="chart1Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 평균 매출액 (단위: 천원)</dt>
						<dd>							
							<div class="ls">
								<div class="t">가맹점 평균 매출액 </div>
								<div class="g" id="chart2Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">종사자 수 (단위: 천명)</dt>
						<dd>							
							<div class="ls">
								<div class="t">종사자 수 </div>
								<div class="g" id="chart3Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">거주인구수 (단위: 천명)</dt>
						<dd>							
							<div class="ls">
								<div class="t">거주인구수 </div>
								<div class="g" id="chart4Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 및 직영점 추이</dt>
						<dd>							
							<div class="ls">
								<div class="t">가맹점 및 직영점 추이 </div>
								<div class="g" id="trend1Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 평균 매출액 추이</dt>
						<dd>							
							<div class="ls">
								<div class="t">가맹점 평균 매출액 추이 </div>
								<div class="g" id="trend2Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">종사자수 추이</dt>
						<dd>							
							<div class="ls">
								<div class="t">종사자수 추이 </div>
								<div class="g" id="trend3Mob"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">거주인구수 추이</dt>
						<dd>							
							<div class="ls">
								<div class="t">거주인구수 추이 </div>
								<div class="g" id="trend4Mob"></div>
							</div>
						</dd>
					</dl>
					</div> -->
					<!-- <div class="mSub1">
						<div class="list" id="ajaxAreaMob"></div>
					</div> -->
					<div class="box_btn block h50 gray fix" style="z-index:1"><button onclick="stepView(0);">이전으로</button></div>
				</div>
				
			</div>
			
			<!-- 레이어 - 통계 요약 결과 -->
			<div class="layer_common layer_popup layer_statistics layer_statistics_seoul" style="padding:10px;overflow-x:auto">
				<div class="titleArea">
					<h3 class="mTitle5" style="margin-top: 10px; padding: 0 0 10px;"><em class="p_frchsNmMob"></em> <span class="p_color">지역통계 요약정보</span></h3>
					<button class="close" onclick="toggle_dimmed_view('layer_statistics_seoul');">닫기</button>
				</div>
				<dl class="datalist_toggle" id="chart1MobToggle">
						<dt onclick="dlToogle(this);">점포비율 (단위: %)</dt>
						<dd>							
							<div class="ls">
<!-- 								<div class="t">점포 비율</div> -->
								<div class="g" id="chart1Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 평균 매출액 (단위: 천원)</dt>
						<dd>							
							<div class="ls">
<!-- 								<div class="t">가맹점 평균 매출액 </div> -->
								<div class="g" id="chart2Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">종사자 수 (단위: 천명)</dt>
						<dd>
							<div class="ls">
	<!-- 							<div class="t">종사자 수 </div> -->
								<div class="g" id="chart3Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">거주인구수 (단위: 천명)</dt>
						<dd>							
							<div class="ls">
	<!-- 							<div class="t">거주인구수 </div> -->
								<div class="g" id="chart4Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 및 직영점 추이</dt>
						<dd>							
							<div class="ls">
				<!-- 				<div class="t">가맹점 및 직영점 추이 </div> -->
								<div class="g" id="trend1Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">가맹점 평균 매출액 추이</dt>
						<dd>							
							<div class="ls">
<!-- 								<div class="t">가맹점 평균 매출액 추이 </div> -->
								<div class="g" id="trend2Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">종사자수 추이</dt>
						<dd>							
							<div class="ls">
		<!-- 						<div class="t">종사자수 추이 </div> -->
								<div class="g" id="trend3Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
					<dl class="datalist_toggle">
						<dt onclick="dlToogle(this);">거주인구수 추이</dt>
						<dd>							
							<div class="ls">
		<!-- 						<div class="t">거주인구수 추이 </div> -->
								<div class="g" id="trend4Mob" style="display:flex;justify-content: center;"></div>
							</div>
						</dd>
					</dl>
			</div>
			
	</article>
<!-- //body -->
	<script type="text/javaScript" src="<c:url value="/static/js/ui/stat/geo_stat.js"/>"></script>