<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/brandReqstSave.js"/>"></script>
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
	<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">가맹본사 참여하기 신청현황</span></h5>

	<h6 class="mTitle3">가맹본사 참여하기</h6>
	<!-- write -->
	<div class="mBoard1 mWrite1 noline">
		<input type="hidden" name="imageFileNo" id="imageFileNo" value="${frnchsExprnRegistInfo.imageFileNo}"/>
		<input type="hidden" name="edcFileNo" id="edcFileNo" value="${frnchsExprnRegistInfo.edcFileNo}"/>
		<input type="hidden" name="rstSignguCode" id="rstSignguCode" value="${frnchsExprnRegistInfo.signguCode}"/>
		<input type="hidden" name="rstAdstrdCode" id="rstAdstrdCode" value="${frnchsExprnRegistInfo.adstrdCode}"/>
		<input type="hidden" name="rstFrnchsNo" id="rstFrnchsNo" value="${frnchsExprnRegistInfo.frnchsNo}"/>
		<input type="hidden" name="exprnRegistNo" id="exprnRegistNo" value="${frnchsExprnRegistInfo.exprnRegistNo}"/>
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
				<select class="select w1" title="시군구" name="signguCode" id="signguCode">
				<option>시군구</option>
				</select>
				<select class="select w1" title="행정동" name="adstrdCode" id="adstrdCode">
				<option>행정동</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>브랜드명</th>
			<td class="left">
				<select class="select w1" title="브랜드명" name="frnchsNo" id="frnchsNo">
				<option>놀부부대찌개</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>지점명</th>
			<td class="left">
				<div class="gIt w4"><input type="text" class="it" title="지점명" name="bhfNm" id="bhfNm" value="${frnchsExprnRegistInfo.bhfNm}"></div>
			</td>
		</tr>
		<tr>
			<th>지점주소</th>
			<td class="left">
				<div class="gIt w4"><input type="text" class="it" title="지점주소" name="bhfAdres" id="bhfAdres" value="${frnchsExprnRegistInfo.bhfAdres}"></div>
			</td>
		</tr>
		<tr>
			<th>운영시간</th>
			<td class="left">
				<div class="gIt fl w11"><input type="text" class="it" title="운영시간" name="operBeginTime" id="operBeginTime" style="text-align:center;padding-right:14px" value="${frnchsExprnRegistInfo.operBeginTime}"></div>
				<div class="bar" style="margin-right:10px;">~</div>
				<div class="gIt fl w11"><input type="text" class="it" title="운영시간"  name="operEndTime" id="operEndTime" style="text-align:center;padding-right:14px" value="${frnchsExprnRegistInfo.operEndTime}"></div>
			</td>
		</tr>
		<tr>
			<th>체험기간</th>
			<td class="left">
				<div class="gIt fl w11"><input type="text" class="it date" title="체험기간" name="exprnBeginDe" id="exprnBeginDe" style="width:110%" value="${frnchsExprnRegistInfo.exprnBeginDe}"></div>
				<div class="bar" style="margin-right:10px;">~</div>
				<div class="gIt fl w11"><input type="text" class="it date" title="체험기간"  name="exprnEndDe" id="exprnEndDe" style="width:110%" value="${frnchsExprnRegistInfo.exprnEndDe}"></div>
			</td>
		</tr>
		<tr>
			<th>모집인원</th>
			<td class="left">
				<div class="gIt fl w1 right"><input type="text" class="it onlyNumber" title="모집인원" name="rcritNmpr" id="rcritNmpr" maxlength="4" style="text-align:center;padding-left:14px" value="${frnchsExprnRegistInfo.rcritNmpr}"></div>
				<div class="bar fl">명</div>
			</td>
		</tr>
		<tr>
			<th>종업원수</th>
			<td class="left">
				<div class="gIt fl w1 right"><input type="text" class="it onlyNumber" title="종업원수" name="emplyCo" id="emplyCo" maxlength="4" style="text-align:center;padding-left:14px" value="${frnchsExprnRegistInfo.emplyCo}"></div>
				<div class="bar fl">명</div>
			</td>
		</tr>
		<tr>
			<th>프랜차이즈<br> 영업교육일</th>
			<td class="left">
				<div class="gIt w11"><input type="text" class="it date" title="프랜차이즈 영업교육일" name="edcDe" id="edcDe" style="width:110%" value="${frnchsExprnRegistInfo.edcDe}"></div>
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
				<div class="gIt fl w1 right"><input type="text" class="it onlyNumber" title="직영점 평수" name="droperStorAr" id="droperStorAr" maxlength="5" style="text-align:center;padding-left:14px" value="${frnchsExprnRegistInfo.droperStorAr}"></div>
				<div class="bar fl">(m2)</div>
			</td>
		</tr>
		</tbody>
		</table>
	</div>
	<!-- //write -->
	<div class="mButton1 right">
		<a href="javascript:void(0)" class="mBtn1  primary" id="btnSave">수정</a>
		<a href="${contextPath}/myPage/expr/brandReqst/brandReqstList.do" class="mBtn1 gray" id="btnList">목록</a>
	</div>
</div>
</div>
</div>
		
	<h3 class="subtitle forMo">프렌차이즈 관리</h3>

		<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo">
		</div>
		
		<div class="wrap_inner forMo">
			<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;">
			</ul>
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
							<input type="hidden" name="imageFileNo" id="mImageFileNo" value="${frnchsExprnRegistInfo.imageFileNo}"/>
							<input type="hidden" name="edcFileNo" id="mEdcFileNo" value="${frnchsExprnRegistInfo.edcFileNo}"/>
							<input type="hidden" name="rstSignguCode" id="mRstSignguCode" value="${frnchsExprnRegistInfo.signguCode}"/>
							<input type="hidden" name="rstAdstrdCode" id="mRstAdstrdCode" value="${frnchsExprnRegistInfo.adstrdCode}"/>
							<input type="hidden" name="rstFrnchsNo" id="mRstFrnchsNo" value="${frnchsExprnRegistInfo.frnchsNo}"/>
							<input type="hidden" name="exprnRegistNo" id="mExprnRegistNo" value="${frnchsExprnRegistInfo.exprnRegistNo}"/>
							<div class="hasBtn gIt w4">
								<select class="select w1 radius" title="시군구" name="signguCode" id="mSignguCode">
									<option>시군구</option>
								</select>
								<select class="select w1 radius" title="행정동" name="adstrdCode" id="mAdstrdCode">
									<option>행정동</option>
								</select>
							</div>
						</td>
					</tr>

					<tr>
						<th scope="row">브랜드명</th>
						<td class="left">
							<div class="gIt w4">
								<select class="select w1 radius" title="브랜드명" name="frnchsNo" id="mFrnchsNo">
									<option></option>
								</select>
							</div>
						</td>
					</tr>
					
					<tr>
						<th scope="row">지점명</th>
						<td class="left">
							<div class="gIt w4">
								<input type="text" class="it" title="지점명" name="bhfNm" id="mBhfNm" style="width:60vw;" value="${frnchsExprnRegistInfo.bhfNm}">
							</div>
						</td>
					</tr>	
					<tr>
						<th scope="row">지점주소</th>
						<td class="left">
							<div class="gIt w4">
								<input type="text" class="it" title="지점주소" name="bhfAdres" id="mBhfAdres" style="width:60vw;" value="${frnchsExprnRegistInfo.bhfAdres}">
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">운영시간</th>
						<td class="left">
							<div class="gIt fl w11"><input type="text" class="it" title="운영시간" name="operBeginTime" id="mOperBeginTime" style="text-align:center" value="${frnchsExprnRegistInfo.operBeginTime}"></div>
							<div class="bar" style="margin-right:10px;margin-top:0px">~</div>
							<div class="gIt fl w11"><input type="text" class="it" title="운영시간"  name="operEndTime" id="mOperEndTime" style="text-align:center" value="${frnchsExprnRegistInfo.operEndTime}"></div>
						</td>
					</tr>
					<tr>
						<th scope="row">체험기간</th>
						<td class="left">
							<div class="gIt fl w11"><input type="text" class="it date" title="체험기간" name="exprnBeginDe" id="mExprnBeginDe" value="${frnchsExprnRegistInfo.exprnBeginDe}"></div>
							<div class="bar" style="margin-right:10px;margin-top:0px">~</div>
							<div class="gIt fl w11"><input type="text" class="it date" title="체험기간"  name="exprnEndDe" id="mExprnEndDe" value="${frnchsExprnRegistInfo.exprnEndDe}"></div>
						</td>
					</tr>
					<tr>
						<th scope="row">모집인원</th>
						<td class="left">
							<div class="gIt w11 fl">
								<input type="text" class="it onlyNumber" title="모집인원" name="rcritNmpr" id="mRcritNmpr" maxlength="4" style="text-align:center" value="${frnchsExprnRegistInfo.rcritNmpr}">
							</div>
							<div class="bar fl" style="margin-top:0px">명</div>
						</td>
					</tr>
					<tr>
						<th scope="row">종업원수</th>
						<td class="left">
							<div class="gIt w11 fl">
								<input type="text" class="it onlyNumber" title="종업원수" name="emplyCo" id="mEmplyCo" maxlength="4" style="text-align:center" value="${frnchsExprnRegistInfo.emplyCo}">
							</div>
							<div class="bar fl" style="margin-top:0px">명</div>
						</td>
					</tr>
					<tr>
						<th scope="row">프랜차이즈 영업교육일</th>
						<td class="left">
							<div class="gIt fl w11"><input type="text" class="it date" title="프랜차이즈 영업교육일" name="edcDe" id="mEdcDe" value="${frnchsExprnRegistInfo.edcDe}"></div>
						</td>
					</tr>
					<tr>
						<th scope="row">게시 이미지 등록</th>
						<td class="left">
							<div id="mAtchFileDiv1"></div>
						</td>
					</tr>
					<tr>
						<th scope="row">교육커리 큘럼교재</th>
						<td class="left">
							<div id="mAtchFileDiv2"></div>
						</td>
					</tr>
					<tr>
						<th scope="row">대표자</th>
						<td class="left">
							<div class="gIt">${frnchsExprnRegistInfo.rprsntvNm }</div>
						</td>
					</tr>	
					<tr>
						<th scope="row">임직원수</th>
						<td class="left">
							<div class="gIt">${frnchsExprnRegistInfo.exctvEmpSum } 명</div>
						</td>
					</tr>
					<tr>
						<th scope="row">직염정 평수</th>
						<td class="left">
							<div class="gIt w11 fl"><input type="text" class="it onlyNumber" title="직영점 평수" name="droperStorAr" id="droperStorAr" maxlength="5" style="text-align:center" value="${frnchsExprnRegistInfo.droperStorAr}"></div>
							<div class="bar fl" style="margin-top:0px">(m2)</div>
						</td>
					</tr>
					<!-- //브랜드본사관리자 권한 -->
				</tbody>
			</table>

			<div class="btn_col2 col2">
				<a href="javascript:void(0)" class="box_btn block h40 radius" id="btnMobSave"><button>수정</button></a>
				<a href="${contextPath}${listURL}" class="box_btn block h40 radius gray" id="btnList" style="margin-left:3%"><button>목록</button></a>
			</div>
		</div>
<!-- //content -->