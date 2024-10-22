<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:choose>
	<c:when test="${data.userSeCode eq 'US03'}">
		<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/user/brandUserInfo.js"/>"></script>
		<style>
			.mFile1 {
			    position: relative;
			}
			.mFile1 .btnAdd{
				position: absolute;
			    top: 0;
			    right: 0;
			    margin: 0 !important;
			    padding: 0;
			    width: 84px;
			    line-height: 38px;
			    height: 38px;
			}
			.mBtn1.lGray {
			    background-color: #fff;
			    border-color: #565c63;
			    color: #000;
			}
			.mFile1 .gIt{
				width:75%;
			}
			.mFile1 .btn .fileHidden {
			    position: absolute;
			    top: 0;
			    right: 0;
			    filter: alpha(opacity=1);
			    opacity: 0.01;
			    -moz-opacity: 0.01;
			    width: 100%;
			    height: 100%;
			    cursor: pointer;
			    z-index: 1;
			}
			.mFile1 .btn {
			    position: absolute;
			    top: 0;
			    right: 94px;
			    width: 84px;
			    height: 40px;
			}
			.mFile1 .btn .mBtn1 {
			    background-color: #565c63;
			    border-color: #565c63;
			    font-size: 14px;
			    margin: 0 !important;
			    padding: 0;
			    width: 100%;
			    line-height: 38px;
			    height: 38px;
			}
			.mAttach1 .iDel {
			    position: absolute;
			    top: 0;
			    right: 0;
			    background: url(/static/images/ico_delete1.png) 0 0 no-repeat;
			    text-indent: -9999px;
			    font-size: 0;
			    width: 21px;
			    height: 21px;
			}
			.mAttach1 .ls {
			    position: relative;
			    display: inline-block;
			    margin: 10px 20px 5px 0;
			    padding: 0 28px 0 0;
			}
			.mBtn1.lGray {
			    background-color: #fff;
			    border: 1px solid #565c63;
			    border-top-color: rgb(86, 92, 99);
			    border-right-color: rgb(86, 92, 99);
			    border-bottom-color: rgb(86, 92, 99);
			    border-left-color: rgb(86, 92, 99);
			    color: #000;
			}
		</style>
	</c:when>
	<c:otherwise>
		<script type="text/javascript">
			function fn_updateUserInfo() {
				if(confirm("회원정보를 수정하시겠습니까?")) {
					$.post('<c:url value="/sysMngr/updateAllUserInfo.ajax"/>',
						$("#dataForm").serialize()
					).done(function(data) {
						if(data.resultCode == 'success' && data.updateCnt == 1) {
							alert(data.resultMsg);
						} else {
							alert("오류가 발생했습니다.");
							console.log(data.resultMsg);
						}
					})
				}
			}
			
			function vaild(){
				var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
				if($("#userNm").val() == ""){
					alert("회원 이름을 입력해주세요");
					return;
				}
				
				if($("#emailAdres").val() == ""){
					alert("이메일을 입력해주세요");
				}else if(!emailRule.test($("#emailAdres").val())) {            
					alert("이메일 형식이 잘못되었습니다.");
					return;
				}
				if($("#telno").val() == ""){
					alert("전화번호를 입력해주세요");
					return;
				}else if($("#telno").val().length < 8){
					alert("올바른 전화번호를 입력해주세요.");
					return;
				}
				
				if($("#deptNm").val() == ""){
					alert("담당부서를 입력해주세요");
					return;
				}
				fn_updateUserInfo();
			}
			
		</script>
	</c:otherwise>
</c:choose>

<!-- contents -->
<div class="contents">

	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">회원관리</span>
		<span class="t">회원정보</span>
	</div>
	<!-- //breadcrumb -->

	<h2 class="mTitle1">회원관리</h2>

	<div class="mBoard1 type2">
		<form id="dataForm" method="post">
		<input type="hidden" id="userNo" name="userNo" value="<c:out value="${data.userNo }" />" />
		<c:choose>
			<c:when test="${data.userSeCode eq 'US03'}">
				<table summary="사업자번호, 상호명, 브랜드 담당자 정보, 브랜드 명, 브랜드 명, 이름, 이메일, 전화번호, 그룹선택, 첨부파일로 구성된 표입니다.">
					<caption>브랜드관리자 정보</caption>
					<colgroup>
						<col width="150">
						<col width="*">
					</colgroup>
					<tbody>
						<!--  -->
						<tr class="notl1">
							<th class="left">사용자구분</th>
							<td class="left">
								${userInfo.userSeNm }
								<input type="hidden" name="userSeCode" id="userSeCode" value="${data.userSeCode }"/>
							</td>
						</tr>
						<tr class="brandInfoStart">
							<th class="left">파일첨부</th>
							<td class="left">
								<div id="atchFileDiv"></div>
								<input type="hidden" id="bizAtchmnflNo" value="${data.atchmnflNo }"/>
							</td>
						</tr>
						<tr>
							<th colspan="2">브랜드 담당자 정보</th>
						</tr>
						<tr>
							<th class="left">브랜드 본사 담당자명</th>
							<td class="left">
								<div class="gIt">
									<input type="text" class="it" title="브랜드 본사 담당자명" name="chargerNm" id="chargerNm" value="${data.chargerNm }">
								</div>
							</td>
						</tr>
						<tr>
							<th class="left">핸드폰 번호</th>
							<td class="left">
								<div class="gIt">
									<input type="text" class="it onlyNumber" title="핸드폰 번호" name="telno" id="telno" value="${data.telno }" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요.">
								</div>
							</td>
						</tr>
						<tr>
							<th class="left">이메일주소</th>
							<td class="left">
								${data.emailAdres }
							</td>
						</tr>
						<tr>
							<th class="left">등록일</th>
							<td class="left">${data.registDt }</td>
						</tr>
						<tr>
							<th class="left">수정일</th>
							<td class="left">${data.updtDt }</td>
						</tr>
						<tr>
							<th class="left">비밀번호</th>
							<td class="left">
								<div class="gIt"><input type="password" name="userPw" id="userPw" class="it" title="비밀번호" placeholder="수정할 비밀번호를 넣어주세요."></div>
							</td>
						</tr>
						<tr>
							<th class="left">수정 비밀번호 확인</th>
							<td class="left">
								<div class="gIt"><input type="password" name="userPwRe" id="userPwRe" class="it" title="수정 비밀번호 확인" placeholder="수정할 비밀번호를 넣어주세요."></div>
							</td>
						</tr>
						<!--  -->
						<%-- 
						<tr class="notl1">
							<th class="left">사업자번호</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="bizrno" name="bizrno" title="사업자번호" value="1212345123" placeholder="사업자번호를 - 없이 입력해주세요"></div>
							</td>
						</tr>
						<tr>
							<th class="left">상호명</th>
							<td class="left">
								<div class="gSelect1">
									<select class="select inline" title="대분류 업종">
									<option>대분류 업종</option>
									</select>
									<select class="select inline" title="중분류 업종">
									<option>중분류 업종</option>
									</select>
									<select class="select inline" title="상호명">
									<option>상호명</option>
									</select>
								</div>
							</td>
						</tr>
						
						<tr>
							<th class="left">브랜드 명</th>
							<td class="left">
								<div class="gSelect1">
									<select class="select inline" id="" title="대분류 업종">
									<option>대분류 업종</option>
									</select>
									<select class="select inline" id="" title="중분류 업종">
									<option>중분류 업종</option>
									</select>
									<select class="select inline" id="" name="" title="프랜차이즈명">
									<option>프랜차이즈명</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<th class="left">이름</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="charger_nm" name=charger_nm"  title="이름" value="홍길동"></div>
							</td>
						</tr>
						<tr>
							<th class="left">이메일</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="emailAdres" name="emailAdres"  title="이메일" value="asdfgh@naver.com"></div>
							</td>
						</tr>
						<tr>
							<th class="left">전화번호</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="telno" name="telno"  title="전화번호" value="010-8845-4575"></div>
							</td>
						</tr>
						<tr>
							<th class="left">그룹선택 (권한)</th>
							<td class="left">
								브랜드 본사 관리자
							</td>
						</tr>
						<tr>
							<th class="left">첨부파일</th>
<!-- 							<td class="left"> -->
<!-- 								<a href="###" class="ul">사업자등록증.pdf</a> -->
<!-- 							</td> -->
						</tr>
						--%>
					</tbody>
				</table>
			</c:when>
			<c:otherwise>
				<table summary="이름, 이메일, 전화번호, 그룹선택(권한)으로 구성된 표입니다.">
					<caption>회원정보</caption>
					<colgroup>
						<col width="130">
						<col width="*">
					</colgroup>
					<tbody>
						<tr class="notl1">
							<th class="left">이름</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="userNm" name="userNm" title="이름" value="<c:out value="${data.userNm }" />" placeholder="이름을 입력해주세요."></div>
							</td>
						</tr>
						<tr class="notl1">
							<th class="left">이메일</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="emailAdres" name="emailAdres" title="이메일" value="<c:out value="${data.emailAdres }" />" placeholder="이메일을 형식에 맞게 입력해주세요."></div>
							</td>
						</tr>
						<tr class="notl1">
							<th class="left">전화번호</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="telno" name="telno" title="전화번호" value="<c:out value="${data.telno }" />" placeholder="전화번호를 - 없이 입력해주세요." maxlength="11" ></div>
							</td>
						</tr>
						<c:if test="${data.userSeCode eq 'US04' }">
						<tr class="notl1">
							<th class="left">담당부서</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it" id="deptNm" name="deptNm" title="담당부서" value="<c:out value="${data.deptNm }" />" placeholder="담당부서를 입력해주세요."></div>
							</td>
						</tr>
						</c:if>
						<tr class="notl1">
							<th class="left">그룹선택(권한)</th>
							<td class="left" colspan="3" style="padding-left: 10px;">
								<c:choose>
									<c:when test="${data.confmSttusCode eq 'CS02' || data.confmSttusCode eq 'CS03'}">
										<div class="gSelect1">
											<select class="select" title="그룹선택(권한)">
												<option value="">선택</option>
												<c:forEach var="code" items="${userSeCodeList }">
													<option value="${code.codeValue}" <c:if test="${code.codeValue eq data.userSeCode }">selected</c:if> ><c:out value="${code.codeValueNm }" /></option>
												</c:forEach>
											</select>
										</div>
									</c:when>
									<c:otherwise>
										<c:out value="${data.userSeNm}" />
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
					</tbody>
				</table>
			</c:otherwise>
		</c:choose>
		</form>
	</div>
	<div class="mButton1 right">
		<c:choose>
			<c:when test="${data.userSeCode eq 'US03'}">
				<a href="javascript:void(0)" id="btnModify" class="mBtn1 gray">정보수정</a>			
			</c:when>
			<c:otherwise>
				<a href="javascript:void(0);" onclick="vaild();" class="mBtn1 blue">정보수정</a>
			</c:otherwise>
		</c:choose>
		<a href="<c:url value="/sysMngr/user/user/userList.do" />" class="mBtn1">회원목록</a>
	</div>

</div>
<c:if test="${data.userSeCode eq 'US03'}">
	<!-- 본사찾기 팝업 -->
	<jsp:include page="/WEB-INF/tiles/frnchsHedofcPopup.jsp"/>
	
	<!-- 프랜차이즈 팝업 -->
	<jsp:include page="/WEB-INF/tiles/frnchsInfoPopup.jsp"/>
	
	<form id="userForm" name="userForm" method="post">
		<input type="hidden" id="changeUserNo" name="changeUserNo" value="${data.userNo }">
	</form>
</c:if>
<!-- //contents -->