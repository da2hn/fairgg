<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<!-- contents -->
		<div class="contents">
			
			<!-- breadcrumb -->
			<div class="mBc">
				<span class="h">home</span>
				<span class="t">대시보드홈</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">대시보드 홈</h2>

			<div class="mSort1">
				<div class="col">
					<label class="ti" for="dateStart">조회기간</label>
					<div class="co">
						<span class="gIt"><input type="text" class="it date" title="접속일시작날짜" id="dateStart"></span>
						<span class="bar">~</span>
						<span class="gIt"><input type="text" class="it date" title="접속일마지막날짜" id="dateEnd"></span>
						<script type="text/javascript">
						$( function() {
							$( "#dateStart, #dateEnd" ).datepicker({
								dateFormat: 'yy-mm-dd'
							});
						} );
						</script>
					</div>
				</div>
			</div>

			
			<div class="gTitle2">
				<h3 class="mTitle2">콘텐츠 요약정보 (2020.8월)</h3>
				<div class="gRt">(단위  : 건수)</div>
			</div>
			<div class="mBoard1">
				<table summary="데이터 업로드, 커뮤니티 게시글, 팝업 게시, 홍보영상 업로드, 홈페이지 접속자 수로 구성된 표입니다.">
				<caption>콘텐츠 요약정보 (2020.8월)</caption>
				<colgroup>
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">데이터 업로드</th>
					<th scope="col">커뮤니티 게시글</th>
					<th scope="col">팝업 게시</th>
					<th scope="col">홍보영상 업로드</th>
					<th scope="col">홈페이지 접속자 수</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>1건</td>
					<td>30건</td>
					<td>55</td>
					<td>10</td>
					<td>3,345</td>
				</tr>
				</tbody>
				</table>
			</div>

			<div class="mBoard1 mt1">
				<table summary="데이터 업로드, 커뮤니티 게시글, 팝업 게시, 홍보영상 업로드, 홈페이지 접속자 수로 구성된 표입니다.">
				<caption>콘텐츠 요약정보 (2020.8월)</caption>
				<thead>
				<tr>
					<th scope="col" colspan="4">점포거래 관리</th>
					<th scope="col" colspan="4">창업지원관리</th>
					<th scope="col" colspan="4">사용자 사용신청 관리</th>
				</tr>
				<tr class="bgType1">
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>1</td>
					<td>0</td>
					<td>1</td>
					<td>0</td>
					<td>1</td>
					<td>0</td>
					<td>1</td>
					<td>0</td>
					<td>1</td>
					<td>0</td>
					<td>1</td>
					<td>0</td>
				</tr>
				</tbody>
				</table>
			</div>

			<!-- grid -->
			<div class="mGrid1">
				<!-- left -->
				<div class="gLeft">
					<div class="gTitle2">
						<h3 class="mTitle2">가맹정보제공 온라인 플랫폼 이용현황</h3>
						<div class="gRt">(단위  : 건수)</div>
					</div>
					<div class="mBoard1">
						<table summary="사용자그룹, 접속건수로 구성된 표입니다.">
						<caption>가맹정보제공 온라인 플랫폼 이용현황</caption>
						<colgroup>
							<col width="60%">
							<col width="*">
						</colgroup>
						<thead>
						<tr>
							<th scope="col">사용자그룹</th>
							<th scope="col">접속건수</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>기관관리자</td>
							<td>10</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						</tbody>
						</table>
					</div>
				</div>
				<!-- //left -->
				<!-- right -->
				<div class="gRight">
					<div class="gTitle2">
						<div class="gRt">(단위  : 비율)</div>
					</div>
					<div class="mGraph1">
						<div class="co"><img src="/static/images/x_graph1.png" width="279" height="186" alt="그래프 샘프"></div>
					</div>
				</div>
				<!-- //right -->
			</div>
			<!-- //grid -->

			<!-- grid -->
			<div class="mGrid1">
				<!-- left -->
				<div class="gLeft">
					<div class="gTitle2">
						<h3 class="mTitle2">가맹정보제공 온라인 플랫폼 이용현황</h3>
						<div class="gRt">(단위  : 건수)</div>
					</div>
					<div class="mBoard1">
						<table summary="서비스ID, 서비스명, 사용건수로 구성된 표입니다.">
						<caption>가맹정보제공 온라인 플랫폼 이용현황</caption>
						<colgroup>
							<col width="140">
							<col width="*">
							<col width="120">
						</colgroup>
						<thead>
						<tr>
							<th scope="col">서비스ID</th>
							<th scope="col">서비스명</th>
							<th scope="col">사용건수</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>기관관리자</td>
							<td>프랜차이즈 현황 조회 서비스</td>
							<td>10</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						</tbody>
						</table>
					</div>
				</div>
				<!-- //left -->
				<!-- right -->
				<div class="gRight">
					<div class="gTitle2">
						<div class="gRt">(단위  : 비율)</div>
					</div>
					<div class="mGraph1 type2 h1">
						<div class="ti">서비스별 사용건수</div>
						<div class="co"><img src="/static/images/x_graph2.png" width="321" height="183" alt="그래프 샘프"></div>
					</div>
				</div>
				<!-- //right -->
			</div>
			<!-- //grid -->


		</div>
		<!-- //contents -->