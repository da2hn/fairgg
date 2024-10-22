<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"/>"></script><%-- 화면 롤링 추가 - 21.02.08 --%>
<link rel="stylesheet" type="text/css" href="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.css"/>"><%-- 화면 롤링 추가 - 21.02.08 --%>
<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/custom.css"/>"><%-- 정렬용 - 21.02.08 --%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/stat/stat_brand.js"/>"></script>
<style>
#map { width: 800px; height: 500px; }
.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.info2 { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; } .legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }
.mSub2 .con2{position:absolute;background:url(/static/images/k_main1.png) 0 0 no-repeat;margin:0 0 0;height:404px;width:330px}

.r00{} /*전체*/
.r11{top:70px;left:99px;} /*서울*/
.r26{top:290px;left:232px;} /*부산*/
.r27{top:225px;left:203px;} /*대구*/
.r28{top:86px;left:58px;} /*인천*/
.r29{top:285px;left:68px;} /*광주*/
.r30{top:191px;left:122px;} /*대전*/
.r31{top:241px;left:247px;} /*울산*/
.r36{top:151px;left:105px;} /*세종*/
.r41{top:104px;left:129px;} /*경기*/
.r42{top:68px;left:179px;} /*강원*/
.r43{top:144px;left:147px;} /*충북*/
.r44{top:174px;left:66px;} /*충남*/
.r45{top:239px;left:94px;} /*전북*/
.r46{top:310px;left:104px;} /*전남*/
.r47{top:169px;left:198px;} /*경북*/
.r48{top:267px;left:156px;} /*경남*/
.r50{top:379px;left:101px;} /*제주*/

.body{padding-bottom:70px;}

/* 종사자 수 w5 제거로 인한 가로영역 19.2px 증가 - 21.03.16 */
.mSub3 .col.w1{width: 94.2px;}
.mSub3 .col.w2{width: 106.2px;}
.mSub3 .col.w3{width: 106.2px;}
.mSub3 .col.w4{width: 137.2px;}
.mSub3 .col.w6{width: 117.2px;}

#footer .forMo {display:none;}
</style>
<%@ include file="/WEB-INF/tiles/gis.jsp" %>
<%@ include file="/WEB-INF/tiles/leaflet_gis.jsp" %>
<input type="hidden" name="paramBrandYear" id="paramBrandYear" value="${brandYear }"/>
<input type="hidden" name="paramBrandLd" id="paramBrandLd" value="${brandLd }"/>
<input type="hidden" name="paramBrandMd" id="paramBrandMd" value="${brandMd }"/>
<input type="hidden" name="paramBrandFrc" id="paramBrandFrc" value="${brandFrc }"/>
<input type="hidden" name="paramBrandFrcNm" id="paramBrandFrcNm" value="${brandFrcNm }"/>
	<!-- body -->
	<article id="franchiseInfo" class="franchise statistics">
	<div class="body forPc">
		<div class="bg">

			<!-- lnb -->
			<div class="mLnb type2">
				<ul>
				<!-- <li class="i "><a href="javascript:void(0)"
					id="localBtn">지역별 통계</a>
					<div class="dep2">
						<dl>
							<dt>분석기간 선택</dt>
							<dd>
								<select class="select" name="localYear" id="localYear" title="분석기간 선택">
									<option>2019년</option>
								</select>
							</dd>
							<dt>프랜차이즈 업종선택</dt>
							<dd>
								<select class="select" name="localLdClass" id="localLdClass" title="프랜차이즈 업종선택">
									<option value="">- 전체 -</option>
								</select> <select class="select" name="localMdClass" id="localMdClass" title="프랜차이즈 업종선택">
									<option value="">- 전체 -</option>
								</select>
							</dd>
						</dl>
						<a href="javascript:void(0)" class="mBtn1 viewLocalBtn">조회</a>
					</div>
				</li> -->
				<li class="i selected">
					<a href="javascript:void(0)" id="brandBtn">브랜드 통계</a>
					<div class="dep2">
						<dl>
						<dt>분석기간 선택</dt>
						<dd>
							<select class="select year" name="brandYear" id="brandYear" title="분석기간 선택">
							<option>2019년</option>
							</select>
						</dd>
						<dt>프랜차이즈 선택</dt>
						<dd>
							<select class="select ldClass" name="brandLdClass" id="brandLdClass" title="대분류">
							<option value="">- 전체 -</option>
							</select>
							<select class="select mdClass" name="brandMdClass" id="brandMdClass" title="중분류">
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
				</li>
				</ul>
			</div>
			<!-- //lnb -->

			<!-- content -->
			<div class="content bgType1"> <!-- add20210306 -->

				<!-- grid2 -->
				<div class="mGrid2">
					<!-- sub2 -->
					<div class="mSub2">
						<h3 class="mTitle5">브랜드 통계</h3>
						<div class="con2">

							<div class="lCnt r11" ><span class="t">서울</span><span class="c">0</span></div>
							<div class="lCnt r26" ><span class="t">부산</span><span class="c">0</span></div>
							<div class="lCnt r27" ><span class="t">대구</span><span class="c">0</span></div>
							<div class="lCnt r28" ><span class="t">인천</span><span class="c">0</span></div>
							<div class="lCnt r29" ><span class="t">광주</span><span class="c">0</span></div>
							<div class="lCnt r30" ><span class="t">대전</span><span class="c">0</span></div>
							<div class="lCnt r31" ><span class="t">울산</span><span class="c">0</span></div>
							<div class="lCnt r36" ><span class="t">세종</span><span class="c">0</span></div>
							<div class="lCnt r41" ><span class="t">경기</span><span class="c">0</span></div>
							<div class="lCnt r42" ><span class="t">강원</span><span class="c">0</span></div>
							<div class="lCnt r43" ><span class="t">충북</span><span class="c">0</span></div>
							<div class="lCnt r44" ><span class="t">충남</span><span class="c">0</span></div>
							<div class="lCnt r45" ><span class="t">전북</span><span class="c">0</span></div>
							<div class="lCnt r46" ><span class="t">전남</span><span class="c">0</span></div>
							<div class="lCnt r47" ><span class="t">경북</span><span class="c">0</span></div>
							<div class="lCnt r48" ><span class="t">경남</span><span class="c">0</span></div>
							<div class="lCnt r50" ><span class="t">제주</span><span class="c">0</span></div>
						</div>
					</div>
					<!-- //sub2 -->
					<!-- sub3 -->
					<div class="mSub3">
<!-- 						<h3 class="mTitle5"><em class="p_frchsNm">프랜차이즈명</em> 프랜차이즈 요약정보</h3> -->
						<!-- <h3 class="mTitle5"><em class="p_frchsNm"></em>프랜차이즈 요약정보</h3> -->
	 				<h3 class="mTitle5"><em class="p_frchsNm"></em>경기도 가맹사업 현황</h3> 
						
 					<div id="startImg" style="display: flex;margin-bottom:10px;">
 						<div> 
							<p>가맹본부수 : 전국(8,719개),  경기도(2,265개),  경기도 비중(25.9%)</p>
							<br>
							<p>영업표지수 : 전국(12,272개),  경기도(3,144개),  경기도 비중(25.6%)</p>
	 						<img src="../../../../../static/images/img_statisticsBrand2.gif" alt="원하시는 브랜드 정보를 조회해보세요">
 						</div>
	 					<div>
	 						<img src="../../../../../static/images/img_statisticsBrand.gif" alt="">
	 					</div>
 					</div> 
<!-- 					<div id="startImg" style="display: block;margin-bottom:10px">
						<p>가맹본부수 : 전국(8,719개),  경기도(2,265개),  경기도 비중(25.9%개)</p>
						<p>영업표지수 : 전국(12,272개),  경기도(3,144개),  경기도 비중(25.6%)</p>
					</div> -->

						<%-- 이전방식(영역 데이터가 필요해서 하이드(min-height:480px; -> display: none;) - 21.02.08 --%>
						<div id="dataTable" class="dataTable" style="display: none;">
						</div>

						<dl id="searchTb" style="display:none;">
							<dt id="columArea">
								<div class="col w1" >
									<div class="tx" style="width: 85%;text-align:center"><span>지역</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'ctprvnNm');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'ctprvnNm');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w2">
									<div class="tx" style="width: 85%;text-align:center"><span>가맹점수<br> (단위:개)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'mrhstCoSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'mrhstCoSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w3">
									<div class="tx" style="width: 85%;text-align:center"><span>평균매출액<br> (단위:천원)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'avrgSelngAmSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'avrgSelngAmSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w4">
									<div class="tx" style="width: 85%;text-align:center"><span>면적(3.3㎡)당<br> 평균매출액<br> (단위:천원)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'unitArAvrgSelngAmSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'unitArAvrgSelngAmSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<!-- 종사자수 제거 - 21.03.16 
								<div class="col w5">
									<div class="tx"><span>종사자수<br> (단위:천명)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'enfsnCoSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'enfsnCoSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								-->
								<div class="col w6">
									<div class="tx" style="width: 85%;text-align:center"><span>거주인구 수<br> (단위:천명)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'popltnCoSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'popltnCoSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
							</dt>
							<dd id="mCustomScrollbar" style="height: 312px;">
							</dd>
						</dl>
					</div>
					<!-- //sub3 -->
				</div>
				<!-- //grid2 -->

				<!-- sub4 -->
				<!-- <div class="mSub4">
					//left
					<div class="gLeft">
						<h3 class="mTitle5">시도단위 <em>프랜차이즈 종사자수</em> 현황</h3>
						<div id="map1" class="gis_con map" style="z-index: 10;"></div>
					</div>
					//left
					right
					<div class="gRight">
						<h3 class="mTitle5">전국 시도단위 <em>프랜차이즈 매출</em> 현황</h3>
						<div id="map2" class="gis_con map" style="z-index: 10;"></div>
					</div>
					//right
				</div> -->
				<!-- //sub4 -->
				<ul class="mList3" style="padding: 20px 0px;">
					<li>
					경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
					창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다. 데이터 출처 : 통계청 프랜차이즈 통계(가맹점) 조사
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
					<li><button onclick="location.href='/stat/franStatList.do'">지역별 통계</button></li>
					<li><button onclick="location.href='/stat/franBrandStatList.do'" class="active">브랜드 통계</button></li>
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
								<select name="ldClassMob" id="ldClassMob" class="radius ldClass" title="대분류">
									<option value="전체">전체</option>
								</select>

<!-- 								<select name="mdClassMob" id="mdClassMob" class="radius mdClass" title="중분류" disabled> -->
 								<select name="mdClassMob" id="mdClassMob" class="radius mdClass" title="중분류">
									<option value="전체">전체</option>
								</select>
								
<!-- 								<select name="brandFrcClassMob" id="brandFrcClassMob" class="frcClass w100p mgt8 radius" style="width:100%" disabled> -->
								<select name="brandFrcClassMob" id="brandFrcClassMob" class="frcClass w100p mgt8 radius" style="width:100%">
								<option value="전체">프랜차이즈명</option>
							  	</select>
								
							</div>
						</dd>
					</dl>

					<div class="box_btn block h50 fix"><button id="viewBrandBtnMob">조회하기</button></div>
				</div>
				
				<div class="step step1">
					<dl class="datalist_common">
						<dt class="relative">
							<p id="ldml" class="p_color"></p>
							브랜드 통계
<!-- 					
							<button class="share">공유하기</button> -->
							<p class="msg">지도에서 지역을 클릭하시면 해당지역의 상세 통계내역을 보실 수 있습니다.</p>
						</dt>
					
						<dd>
							<span id="yearMobText" class="stand">2021년 기준</span>
					
							<div class="peninsula" style="z-index:1">
								<p style="top: 77px;left: 86px;">
									<a class="r11Mob lCntMob chartBtnMob" id="11">
										<strong>서울</strong><span class="c"></span>
									</a>
								</p>

								<p style="top: 296px; left: 250px;">
									<a class="r26Mob lCntMob chartBtnMob" id="26">
										<strong>부산</strong><span class="c"></span>
									</a>
								</p>
								<p style="top: 229px; left: 208px;">
									<a class="r27Mob lCntMob chartBtnMob">
										<strong>대구</strong><span class="c" id="27"></span>
									</a>
								</p>
								<p style="top:46px; left: 42px;">
									<a class="r28Mob lCntMob chartBtnMob">
										<strong>인천</strong><span class="c" id="28"></span>
									</a>
								</p>
								<p style="top: 300px; left: 48px;">
									<a class="r29Mob lCntMob chartBtnMob">
										<strong>광주</strong><span class="c" id="29"></span>
									</a>
								</p>
								<p style="top: 197px; left: 142px;">
									<a class="r30Mob lCntMob chartBtnMob">
										<strong>대전</strong><span class="c" id="30"></span>
									</a>
								</p>
								<p style="top: 245px; left: 271px;">
									<a class="r31Mob lCntMob chartBtnMob">
										<strong>울산</strong><span class="c" id="31"></span>
									</a>
								</p>
								<p style="top:151px;left:105px;">
									<a class="r36Mob lCntMob chartBtnMob">
										<strong>세종</strong><span class="c" id="36"></span>
									</a>
								</p>
								<p style="top: 111px; left: 119px;">
									<a class="r41Mob lCntMob chartBtnMob">
										<strong>경기</strong><span class="c" id="41"></span>
									</a>
								</p>
								<p style="top:68px;left:210px;">
									<a class="r42Mob lCntMob chartBtnMob">
										<strong>강원</strong><span class="c" id="42"></span>
									</a>
								</p>
								<p style="top:142px; left: 171px;">
									<a class="r43Mob lCntMob chartBtnMob">
										<strong>충북</strong><span class="c" id="43"></span>
									</a>
								</p>
								<p style="top:186px; left:69px;">
									<a class="r44Mob lCntMob chartBtnMob">
										<strong>충남</strong><span class="c" id="44"></span>
									</a>
								</p>
								<p style="top:244px; left: 85px;">
									<a class="r45Mob lCntMob chartBtnMob">
										<strong>전북</strong><span class="c" id="45"></span>
									</a>
								</p>
								<p style="top:319px; left:115px;">
									<a class="r46Mob lCntMob chartBtnMob">
										<strong>전남</strong><span class="c" id="46"></span>
									</a>
								</p>
								<p style="top:173px; left: 246px;">
									<a class="r47Mob lCntMob chartBtnMob">
										<strong>경북</strong><span class="c" id="47"></span>
									</a>
								</p>
								<p style="top:267px;left:156px;">
									<a class="r48Mob lCntMob chartBtnMob">
										<strong>경남</strong><span class="c" id="48"></span>
									</a>
								</p>
								<p style="top: 441px;left: 47px;">
									<a class="r50Mob lCntMob chartBtnMob">
										<strong>제주</strong><span class="c" id="50"></span>
									</a>
								</p>
							</div>
						</dd>
					</dl>
					
<!-- 					<div class="mSub4" style="padding: 10px 0 0 0px; zoom: 1;">
						left
						<div class="gLeft" style="width: 380px;">
							<h3 class="mTitle5">경기도 <em>유동인구</em> 분포 현황</h3>
							<div id="map1" class="gis_con map" style="z-index: 0;"></div>
						</div>
						//left
						right
						<div class="gRight" style="width: 380px; margin-right: 0px; margin-top: 10px;">
							<h3 class="mTitle5">경기도 <em>카드매출</em> 현황</h3>
							<div id="map2" class="gis_con map" style="z-index: 0;"></div>
						</div>
						//right
					</div> -->
					<div class="box_btn block h50 gray fix" style="z-index:1"><button onclick="stepView(0);">이전으로</button></div>
				</div>
				
			</div>
			
			<!-- 레이어 - 통계 요약 결과 -->
			<div class="layer_common layer_popup layer_statistics layer_statistics_seoul">
				<div class="mSub3" id="subMob" style="padding:10px">
					<div class="titleArea">
						<h3 class="mTitle5" style="margin-top: 10px; padding: 0 0 10px;"><em class="p_frchsNmMob"></em> <span class="p_color">프랜차이즈 요약정보</span></h3>
						<button class="close" onclick="toggle_dimmed_view('layer_statistics_seoul');">닫기</button>
					</div>

						<%-- 이전방식(영역 데이터가 필요해서 하이드(min-height:480px; -> display: none;) - 21.02.08 --%>
						<div id="dataTableMob" class="dataTable" style="display: none;"></div>

						<dl style="border: 1px solid #d2d4db; border-radius: 10px;margin-top:30px">
							<dt id="columArea" style="font-size: 10px;">
								<div class="col w1" style="width:30%;">
									<div class="tx" style="width: 85%;text-align:center"><span style="padding: 0 0 0 5px;">지역</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'ctprvnNm');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'ctprvnNm');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w2" style="width:35%;">
									<div class="tx" style="width: 85%;text-align:center"><span style="padding: 0 0 0 5px;">가맹점수<br> (단위:개)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'mrhstCoSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'mrhstCoSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w3" style="width:35%;">
									<div class="tx" style="width: 85%;text-align:center"><span style="padding: 0 0 0 5px;">평균매출액<br> (단위:천원)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'avrgSelngAmSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'avrgSelngAmSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<!-- <div class="col w4" style="width: 93px;">
									<div class="tx"><span style="padding: 0 0 0 5px;">면적(3.3㎡)당<br> 평균매출액<br> (단위:천원)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'unitArAvrgSelngAmSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'unitArAvrgSelngAmSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div>
								<div class="col w6" style="width: 81px;">
									<div class="tx"><span style="padding: 0 0 0 5px;">거주인구수<br> (단위:천명)</span></div>
									<div class="rt">
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'popltnCoSort');" class="iUp">큰수부터 보기</a>
										<a href="javascript:void(0);" onclick="fn_sortJson(this, 'popltnCoSort');" class="iDown">작은수부터 보기</a>
									</div>
								</div> -->
							</dt>
							<dd id="mCustomScrollbarMob" style="height:350px">
							</dd>
						</dl>
					</div>
			</div>
	</article>
	<!-- //body -->

	<script type="text/javaScript" src="<c:url value="/static/js/ui/stat/geo_stat.js"/>"></script>