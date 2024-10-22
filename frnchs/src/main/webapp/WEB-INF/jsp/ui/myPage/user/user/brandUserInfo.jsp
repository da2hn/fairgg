<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/user/brandUserInfo.js"/>"></script>
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
			<h5 class="mTitle2"> 가입정보 변경</h5>
		
			<!-- write -->
			<div class="mBoard1 mWrite1">
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
							<input type="hidden" name="userSeCode" id="userSeCode" value="${userInfo.userSeCode }"/>
						</td>
					</tr>
		
					<tr>
						<th scope="row">브랜드 명</th>
						<td id="brandArea" class="left">
							<div class="hasBtn">
								<p class="msg">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>
				
								<div class="box_btn w92 h40 white fs15 medium img add"><button>추가</button></div>
							</div>
						</td>
					</tr>
					
					<tr class="brandInfoStart">
						<th scope="col">파일첨부</th>
						<td class="left">
							<div id="atchFileDiv"></div>
							<input type="hidden" id="bizAtchmnflNo" value="${userInfo.atchmnflNo }"/>
						</td>
					</tr>
					<tr>
						<th scope="col">브랜드 본사 담당자명</th>
						<td class="left">
							<div class="gIt">
								<input type="text" class="it" title="브랜드 본사 담당자명" name="chargerNm" id="chargerNm" value="${userInfo.chargerNm }">
							</div>
						</td>
					</tr>
					<tr>
						<th scope="col">전화번호</th>
						<td class="left">
							<div class="gIt">
								<input type="text" class="it onlyNumber" title="핸드폰 번호" name="telno" id="telno" value="${userInfo.telno }" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요.">
							</div>
						</td>
					</tr>
					<tr>
						<th scope="col">이메일주소</th>
						<td class="left">
							${userInfo.emailAdres }
						</td>
					</tr>
					<tr>
						<th scope="col">등록일</th>
						<td class="left">${userInfo.registDt }</td>
					</tr>
					<tr>
						<th scope="col">수정일</th>
						<td class="left">${userInfo.updtDt }</td>
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
			</div>
			<!-- //write -->
			<div class="mButton1 right">
				<a href="javascript:void(0)" id="btnModify" class="mBtn1 primary">수정</a>
				<a href="###" class="mBtn1 gray" id="btnDrop">탈퇴</a>
			</div>
		</div>
	</div>
</div>
		
		<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
			
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
							<td class="left">
							${userInfo.userSeNm }
							<input type="hidden" name="userSeCode" id="userSeCodeMob" value="${userInfo.userSeCode }"/>
						</td>
						</tr>

						<tr>
							<th scope="row">브랜드명</th>
							<td id="mBrandArea">
								<div class="hasBtn">
									<p class="msg">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>

									<div class="box_btn h24 radius gray fs12 medium"><button>추가</button></div>
								</div>
								
							</td>
						</tr>

						<tr class="">
							<th scope="row">파일첨부</th>
							<td class="left">
								<div id="mAtchFileDiv"></div>
								<input type="hidden" id="mBizAtchmnflNo" value="${userInfo.atchmnflNo}"/>
							</td>
						</tr>

						<tr>
							<th scope="row">브랜드 본사 담당자명</th>
							<td class="left">
							<div class="gIt">
								<input type="text" class="it" title="브랜드 본사 담당자명" name="chargerNm" id="mChargerNm" value="${userInfo.chargerNm }">
							</div>
						</td>
						</tr>

						<tr>
							<th scope="row">전화번호</th>
							<td class="left">
							<div class="gIt">
								<input type="text" class="it onlyNumber" title="핸드폰 번호" name="telno" id="mTelno" value="${userInfo.telno }" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요.">
							</div>
						</td>
						</tr>

						<tr>
							<th scope="row">이메일 주소</th>
							<td class="left">${userInfo.emailAdres }</td>
						</tr>

						<tr>
							<th scope="row">등록일</th>
							<td class="left">${userInfo.registDt }</td>
						</tr>
						
						<tr>
							<th scope="row">수정일</th>
							<td class="left">${userInfo.updtDt }</td>
						</tr>
						
						<tr>
							<th scope="row">비밀번호</th>
							<td class="left">
							<div class="gIt"><input type="password" name="userPw" id="mUserPw" class="it" title="비밀번호" placeholder="수정할 비밀번호를 넣어주세요."></div>
						</td>
						</tr>
						
						<tr>
							<th scope="row">수정 비밀번호 확인</th>
							<td class="left">
							<div class="gIt"><input type="password" name="userPwRe" id="mUserPwRe" class="it" title="수정 비밀번호 확인" placeholder="수정할 비밀번호를 넣어주세요."></div>
						</td>
						</tr>
						<!-- //브랜드본사관리자 권한 -->
					</tbody>
				</table>

				<div class="btn_col2 col2">
					<div class="box_btn block h40 radius" id="btnMobModify"><button>수정</button></div>
					<div class="box_btn block h40 radius gray" id="btnDropMob"><button>탈퇴</button></div>
				</div>
			</div>
<!-- //content -->

