<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoDcsEnroll.js"/>"></script>
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
			<h5 class="mTitle2">정보공개서  등록</h5>
			<input type="hidden" name="userSeCode" id="userSeCode" value="${userSeCode }"/>
			<input type="hidden" name="hedofcNo" id="hedofcNo" value="${hedofcNo }"/>
			<form id="dataForm" method="post" enctype="multipart/form-data">
			<input type="hidden" name="infoData" id="infoData" value="${infoData }"/>
			<input type="hidden" name="mlsfcIndutyNm" id="mlsfcIndutyNm" value="${infoData.mlsfcIndutyNm }"/>
			<input type="hidden" name="mlsfcIndutyCode" id="mlsfcIndutyCode" value="${infoData.mlsfcIndutyCode }"/>
			<input type="hidden" name="lclasIndutyNm" id="lclasIndutyNm" value="${infoData.lclasIndutyNm }"/>
			<input type="hidden" name="lclasIndutyCode" id="lclasIndutyCode" value="${infoData.lclasIndutyCode }"/>
			<input type="hidden" name="frnchsNm" id="frnchsNm" value="${infoData.frnchsNm }"/>
			<input type="hidden" name="frnchsNo" id="frnchsNo" value="${infoData.frnchsNo }"/>
			<input type="hidden" name="atchmnflNo" id="atchmnflNo" value="${infoData.atchmnflNo }"/>
			<input type="hidden" name="year" id="year" value="${infoData.year}"/>
			<input type="hidden" name="infoDcsRegistNo" id="infoDcsRegistNo" value="${infoData.infoDcsRegistNo}"/>
			<!-- write -->
			<div class="mBoard1 mWrite1 noline">
				<table summary="구분, 제목, 내용, 파일첨부, 등록일로 구성된 표입니다.">
				<caption>정보공개서  등록</caption>
				<colgroup>
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th>브랜드명</th>
					<td class="left">
						<select class="ldClass" name="infoLdClass" id="infoLdClass" title="대분류">
							<option value="">- 대분류 -</option>
						</select>
						<select class="mdClass" name="brandMdClass" id="brandMdClass" title="중분류">
							<option value="">- 중분류 -</option>
						</select>			
						<select class="frcClass" name="infoFrcClass" id="infoFrcClass" title="프랜차이즈">
							<option value="">- 프랜차이즈 -</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>년도</th>
					<td class="left">
						<select title="데이터 기준년" name="infoYear" id="infoYear" style="width:50.5%;">
							<c:choose>
								<c:when test="${infoData.year eq null}">
									<option value="">선택</option>
								</c:when>
								<c:otherwise>
									<option value="${infoData.year}" selected disabled hidden>${infoData.year}년</option>
								</c:otherwise>
							</c:choose>
							<c:forEach var="i" begin="0" step="1" end="7">
								<option value="${sysStdrYear-i }">${sysStdrYear-i }년</option>
							</c:forEach>
						</select>
					</td>
				</tr>
				<tr>
					<th>파일첨부</th>
					<td class="left">
						<input type="hidden" id="fileType" name="fileType" value="" />
						<div id="atchFileDiv"></div>
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->
			</form>
		
			<div class="mButton1 right">
				<c:choose>
				 	<c:when test="${infoData eq null }">
						<a href="javascript:void(0);" class="mBtn1 primary" id="btn_insert">등록</a>
			         </c:when>
			         <c:otherwise>
			         	<a href="javascript:void(0);" class="mBtn1 primary" id="btn_update">수정</a>
		        	</c:otherwise>
				</c:choose>
				<a href="${contextPath}/myPage/board/infoDcsInfo/infoDcsInfo.do" class="mBtn1 gray">목록</a>
			</div>
		</div>
	</div>
</div>
		
		<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
			
			<div class="wrap_inner forMo">
				<form id="mDataForm" method="post" enctype="multipart/form-data">
					<input type="hidden" name="infoDcsRegistNo" id="infoDcsRegistNo" value="${infoData.infoDcsRegistNo}"/>
					<input type="hidden" name="atchmnflNo" id="atchmnflNo" value="${infoData.atchmnflNo }"/>
					<table class="tbl_row">
						<caption>가입정보수정</caption>
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
	
						<tbody>
							<tr>
								<th scope="row">브랜드명</th>
								<td id="mBrandArea">
									<!-- <div class="hasBtn" style="margin-bottom:10px">
										<p class="msg">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>
	
										<div class="box_btn h24 radius gray fs12 medium" style="margin:0px 0px 0px 0px"><button>추가</button></div>
									</div> -->
									<select class="radius ldClass" name="infoLdClass" id="infoLdClassM" title="대분류" style="width:100%;margin-bottom:5px">
										<option value="">-대분류 -</option>
									</select>
									<select class="radius mdClass" name="brandMdClass" id="brandMdClassM" title="중분류" style="width:100%;margin-bottom:5px" disabled>
										<option value="">-중분류 -</option>
									</select>			
									<select class="radius frcClass" name="infoFrcClass" id="infoFrcClassM" title="프랜차이즈" style="width:100%;" disabled>
										<option value="">-프랜차이즈 -</option>
									</select>
									
								</td>
							</tr>
							<tr>
								<th scope="row">연도</th>
								<td class="left">
									<select class="radius yearMob" name="infoYear" id="infoYearM" style="width:100%;">
										<c:choose>
											<c:when test="${infoData.year eq null}">
												<option value="">선택</option>
											</c:when>
											<c:otherwise>
												<option value="${infoData.year}" selected disabled hidden>${infoData.year}년</option>
											</c:otherwise>
										</c:choose>
										<c:forEach var="i" begin="0" step="1" end="7">
											<option value="${sysStdrYear-i }">${sysStdrYear-i }년</option>
										</c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row">정보공개서 등록</th>
								
								<td class="left">
									<div id="mAtchFileDiv"></div>
								</td>
							</tr>
							<!-- //브랜드본사관리자 권한 -->
						</tbody>
					</table>
				</form>
				<div class="btn_col2 col2">
					<c:choose>
					 	<c:when test="${infoData eq null }">
							<div class="box_btn block h40 radius"><button id="btn_insertMob">등록</button></div>
				         </c:when>
				         <c:otherwise>
				         	<div class="box_btn block h40 radius"><button id="btn_updateMob">수정</button></div>
			        	</c:otherwise>
					</c:choose>
					
					<div class="box_btn block h40 radius gray" onclick="location.href='/myPage/board/infoDcsInfo/infoDcsInfo.do'"><button>목록</button></div>
				</div>
			</div>
<!-- //content -->