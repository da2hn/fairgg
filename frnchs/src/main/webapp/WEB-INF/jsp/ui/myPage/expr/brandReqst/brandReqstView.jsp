<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/brandReqstView.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})
</script>
<!-- content -->
<div class="content">
	<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">프랜차이즈 정보</span></h5>

	<h6 class="mTitle3">체험 프랜차이즈 정보</h6>
	<!-- write -->
			<div class="mBoard1 mWrite1 noline">
				<input type="hidden" name="imageFileNo" id="imageFileNo" value="${frnchsExprnRegistInfo.imageFileNo}"/>
				<input type="hidden" name="edcFileNo" id="edcFileNo" value="${frnchsExprnRegistInfo.edcFileNo}"/>
				<table summary="지역선택, 브랜드명, 지점명, 체험기간, 모집인원, 종업원수, 프랜차이즈, 영업교육일, 게시 이미지 등록, 교육커리, 큘럼교재, 대표자, 임직원수, 직영점 평수로 구성된 표입니다.">
				<caption>기본정보</caption>
				<colgroup>
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th>지역선택</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.signguNm } ${frnchsExprnRegistInfo.adstrdNm }</div>
					</td>
				</tr>
				<tr>
					<th>브랜드명</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.bsnSgnal }</div>
					</td>
				</tr>
				<tr>
					<th>지점명</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.bhfNm}</div>
					</td>
				</tr>
				<tr>
					<th>지점주소</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.bhfAdres}</div>
					</td>
				</tr>
				<tr>
					<th>운영시간</th>
					<td class="left">
						<div class="gIt">${frnchsExprnRegistInfo.operBeginTime} ~ ${frnchsExprnRegistInfo.operEndTime}</div>
					</td>
				</tr>
				<tr>
					<th>체험기간</th>
					<td class="left">
						<div class="gIt">${frnchsExprnRegistInfo.exprnBeginDe} ~ ${frnchsExprnRegistInfo.exprnEndDe}</div>
					</td>
				</tr>
				<tr>
					<th>모집인원</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.rcritNmpr} 명</div>
					</td>
				</tr>
				<tr>
					<th>종업원수</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.emplyCo} 명</div>
					</td>
				</tr>
				<tr>
					<th>프랜차이즈<br> 영업교육일</th>
					<td class="left">
						<div class="gIt">${frnchsExprnRegistInfo.exprnBeginDe} ~ ${frnchsExprnRegistInfo.edcDe}</div>
					</td>
				</tr>
				<tr>
					<th>게시 이미지 등록</th>
					<td class="left">
						<div id="atchFileDiv1"></div>
					</td>
				</tr>
				<tr>
					<th>교육커리<br> 큘럼교재</th>
					<td class="left">
						<div id="atchFileDiv2"></div>
					</td>
				</tr>
				<tr>
					<th>대표자</th>
					<td class="left">
						<div class="gIt">${frnchsExprnRegistInfo.rprsntvNm }</div>
					</td>
				</tr>
				<tr>
					<th>임직원수</th>
					<td class="left">
						<div class="gIt">${frnchsExprnRegistInfo.exctvEmpSum } 명</div>
					</td>
				</tr>
				<tr>
					<th>직영점 평수</th>
					<td class="left">
						<div class="gIt w4">${frnchsExprnRegistInfo.droperStorAr} (m2)</div>
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->
			<div class="mButton1 right">
				<a href="/myPage/expr/diary/diaryList.do" class="mBtn1 gray" id="btnList">목록</a>
			</div>
		
		</div>
	</div>
</div>
		
		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
			</div>
			
			<div class="wrap_inner forMo">
				<div class="tableArea">
				<h4>프랜차이즈 정보</h4>
					<table class="tbl_row">
						<caption>가입정보수정</caption>
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
	
						<tbody>
							<tr>
								<th scope="row">지역선택</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.signguNm } ${frnchsExprnRegistInfo.adstrdNm }</div>
								</td>
							</tr>
	
							<tr>
								<th scope="row">브랜드명</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.bsnSgnal }</div>
								</td>
							</tr>
							
							<tr>
								<th scope="row">지점명</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.bhfNm}</div>
								</td>
							<tr>
								<th scope="row">지점주소</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.bhfAdres}</div>
								</td>
							
							<tr>
								<th scope="row">운영시간</th>
								<td class="left">
									<div class="gIt">${frnchsExprnRegistInfo.operBeginTime} ~ ${frnchsExprnRegistInfo.operEndTime}</div>
								</td>
							
							<tr>
								<th scope="row">체험기간</th>
								<td class="left">
									<div class="gIt">${frnchsExprnRegistInfo.exprnBeginDe} ~ ${frnchsExprnRegistInfo.exprnEndDe}</div>
								</td>
							
							<tr>
								<th scope="row">모집인원</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.rcritNmpr} 명</div>
								</td>
							
							<tr>
								<th scope="row">종업원수</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.emplyCo} 명</div>
								</td>
							
							<tr>
								<th scope="row">프랜차이즈 영업교육일</th>
								<td class="left">
									<div class="gIt">${frnchsExprnRegistInfo.exprnBeginDe} ~ ${frnchsExprnRegistInfo.edcDe}</div>
								</td>
							
							<tr>
								<th scope="row">게시 이미지 등록</th>
								<td class="left">
									<div id="m_atchFileDiv1"></div>
								</td>
							
							<tr>
								<th scope="row">교육커리 큘럼교재</th>
								<td class="left">
									<div id="m_atchFileDiv2"></div>
								</td>
							
							<tr>
								<th scope="row">대표자</th>
								<td class="left">
									<div class="gIt">${frnchsExprnRegistInfo.rprsntvNm }</div>
								</td>
									
							<tr>
								<th scope="row">임직원수</th>
								<td class="left">
									<div class="gIt">${frnchsExprnRegistInfo.exctvEmpSum } 명</div>
								</td>
							
							<tr>
								<th scope="row">직염정 평수</th>
								<td class="left">
									<div class="gIt w4">${frnchsExprnRegistInfo.droperStorAr} (m2)</div>
								</td>
							
							</tr>
							<!-- //브랜드본사관리자 권한 -->
						</tbody>
					</table>
				</div>

				<%-- <div class="btn_col2 col2">
					<a href="${contextPath}${listURL}" class="box_btn block h40 radius" id="btnList" style="margin-left:25%"><button>목록</button></a>
				</div> --%>
				
				<div class="btn2">
					<div class="box_btn block h40 radius white"><button id="btnList" onclick="location.href='/myPage/expr/diary/diaryList.do'">목록</button></div>
				</div>
			</div>
<!-- //content -->