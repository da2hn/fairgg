<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/user/userInfo.js"/>"></script>
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
			<h5 class="mTitle2">가입정보 수정</h5>
		
			<!-- write -->
			<div class="mBoard1 mWrite1">
				<form id="userForm" method="post">
					<input type="hidden" id="userNo" name="userNo" value="<c:out value="${userInfo.userNo }" />" />
					<table summary="사용자구분, 이름, 이메일주소, 전화번호, 등록일, 수정일, 비밀번호, 수정 비밀번호 호가인으로 구성된 표입니다.">
					<caption>가입정보 수정</caption>
					<colgroup>
						<col width="165px">
						<col width="*">
					</colgroup>
					<tbody>
					<tr>
						<th scope="col">사용자구분</th>
						<td class="left">
							${userInfo.userSeNm }
							<input type="hidden" name="userSeCode" value="${userInfo.userSeCode }"/>
						</td>
					</tr>
					<tr>
						<th scope="col">이름</th>
						<td class="left">
							${userInfo.userNm }
							<div class="gIt"><input type="hidden" class="it" title="부서" value="${userInfo.userNm }" name="userNm" id="userNm"></div>
						</td>
					</tr>
					<c:if test="${userInfo.userSeCode == 'US04' }">
					<tr>
						<th scope="col">부서</th>
						<td class="left">
							<div class="gIt"><input type="text" class="it" title="부서" value="${userInfo.deptNm }" name="deptNm" id="deptNm"></div>
						</td>
					</tr>
					</c:if>
					<tr>
						<th scope="col">이메일주소</th>
						<td class="left">
							${userInfo.emailAdres }
						</td>
					</tr>
					<tr>
						<th scope="col">전화번호</th>
						<td class="left">
							<div class="gIt"><input type="text" class="it onlyNumber" title="전화번호" value="${userInfo.telno }" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" name="telno" id="telno" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요."></div>
						</td>
					</tr>
					<tr>
						<th scope="col">등록일</th>
						<td class="left">
							${userInfo.registDt }
						</td>
					</tr>
					<tr>
						<th scope="col">수정일</th>
						<td class="left">
							${userInfo.updtDt }
						</td>
					</tr>
					<tr>
						<th scope="col">비밀번호</th>
						<td class="left">
							<div class="gIt"><input type="password" name="userPw" id="userPw" class="it" title="비밀번호" placeholder="수정할 비밀번호를 넣어주세요."></div>
						</td>
					</tr>
					<tr>
						<th scope="col">수정 비밀번호 확인</th>
						<td class="left">
							<div class="gIt"><input type="password" name="userPwRe" id="userPwRe" class="it" title="수정 비밀번호 확인" placeholder="수정할 비밀번호를 넣어주세요."></div>
						</td>
					</tr>
					</tbody>
					</table>
				</form>
			</div>
			<!-- //write -->
			<div class="mButton1 right">
				<a href="javascript:void(0)" id="btnModify" class="mBtn1 primary">수정</a>
				<a href="javascript:void(0)" id="btnDrop" class="mBtn1 gray">탈퇴</a>
			</div>
		
		</div>
	</div>
</div>
		
		<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab">
				<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
					<div class="swiper-wrapper">
				<!-- <div class="swiper-slide"><button onclick="location.href='mypageModify.html'" class="active">가입정보 수정</button></div> -->
						<div class="swiper-slide"><button onclick="location.href='mypageExpApply.html'">정보공개서 관리</button></div>
				<!--		<div class="swiper-slide"><button onclick="location.href='mypageWish.html'" >관심 브랜드</button></div>
						<div class="swiper-slide"><button onclick="location.href='mypageSaleExamine.html'">프랜차이즈 본사 상벌 관리</button></div>
						<div class="swiper-slide"><button onclick="location.href='mypageWish.html'">체험서비스 확인</button></div>
						<div class="swiper-slide"><button onclick="location.href='mypageWish.html'">점포 관리 확인</button></div>
						<div class="swiper-slide"><button onclick="location.href='mypageWish.html'">관리자 게시판 관리</button></div> -->
					</div>
				</div>
			</div>
			
			<div class="wrap_inner forMo">
			<input type="hidden" id="userNoMob" name="userNo" value="<c:out value="${userInfo.userNo }" />" />
				<table class="tbl_row">
					<caption>가입정보수정</caption>
					<colgroup>
						<col style="width:30%;">
						<col style="width:70%;">
					</colgroup>

					<tbody>
						<!-- 창업예정자/점포운영자 & 컨설턴트 & 정보공개서관리자 권한 공통 항목 -->
						<tr>
							<th scope="row">사용자구분</th>
							<td>${userInfo.userSeNm }
								<input type="hidden" name="userSeCodeMob" value="${userInfo.userSeCode }"/>
							</td>
						</tr>

						<tr>
							<th scope="row">이름</th>
							<td>
								${userInfo.userNm }
								<input type="hidden" name="userNmMob" id="userNmMob" class="w100p radius" value="${userInfo.userNm }">
							</td>
						</tr>
						
						<c:if test="${userInfo.userSeCode == 'US04' }">
						<tr>
							<th scope="row">부서</th>
							<td class="left">
								<input type="text" name="deptNmMob" id="deptNmMob" class="w100p radius" value="${userInfo.deptNm }">
							</td>
						</tr>
						</c:if>

						<tr>
							<th scope="row">이메일 주소</th>
							<td>${userInfo.emailAdres }
						</tr>

						<tr>
							<th scope="row">전화번호</th>
							<td><input type="text" name="telnoMob" id="telnoMob" class="w100p radius" value=${userInfo.telno } maxlength="11" placeholder="전화번호를 - 없이 입력해주세요."></td>
						</tr>

						<tr>
							<th scope="row">등록일</th>
							<td>${userInfo.registDt }</td>
						</tr>
						
						<tr>
							<th scope="row">수정일</th>
							<td>${userInfo.updtDt }</td>
						</tr>
						
						<tr>
							<th scope="row">비밀번호</th>
							<td><input type="password" name="userPwMob" id="userPwMob" class="w100p radius" placeholder="수정할 비밀번호를 입력해주세요"></td>
						</tr>
						
						<tr>
							<th scope="row">수정 비밀번호 확인</th>
							<td><input type="password" name="userPwReMob" id="userPwReMob" class="w100p radius" placeholder="비밀번호를 다시 확인해주세요"></td>
						</tr>
						<!-- //브랜드본사관리자 권한 -->
					</tbody>
				</table>
				<div class="btn_col2 col2">
					<div class="box_btn block h40 radius"><button id="btnModifyMob">수정</button></div>
					<div class="box_btn block h40 radius gray"><button id="btnDropMob">탈퇴</button></div>
				</div>
			</div>
<!-- //content -->

