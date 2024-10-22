<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoList.js"/>"></script>
<article id="mypageBoardList" class="mypage">
<!-- content -->
<div class="content">
	<h5 class="mTitle2">사용자 게시판 관리</h5>
	
	
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<select title="창업지원내용구분" class="select" id="schFntnSportCnSeCode" name="schFntnSportCnSeCode" >
						<option value=""><c:out value="전체" /></option>
						<c:forEach var="code" items="${schCodeList}">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
						</c:forEach>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="제목으로 검색">
					<a href="javascript:void(0);" class="mBtn1" id="btn_sch">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="fntnSportSn" name="fntnSportSn" />
					<input type="hidden" id="answerAt" name="answerAt" />
					<input type="hidden" id="schCodeVal" name="schCodeVal" />
					<input type="hidden" id="schTxtVal" name="schTxtVal" />
					<input type="hidden" id="chkRowSn" name="chkRowSn" />
					<input type="hidden" id="chkRowRe" name="chkRowRe" />
				</form>
			</div>
			<!-- [M 2022-02-10] 추가 S -->
			<!-- 선택정렬 -->
			<div class="boardSort">
				<a href="#" class="active"><span>전체 작성글 보기</span></a>
				<a href="#"><span>작성글 보기</span></a>
				<a href="#"><span>작성댓글 보기</span></a>
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 구분, 제목, 등록일, 게시자 로 구성된 표입니다.">
				<caption>창업지원 게시판 관리</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:14%;">
					<col style="width:auto;">
					<col style="width:12%;">
					<col style="width:8%;">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<!-- <th scope="col">번호</th> -->
					<th scope="col">게시판명</th>
					<th scope="col">제목</th>
					<th scope="col">등록일</th>
					<th scope="col">첨부파일</th>
				</tr>
				</thead>
				<tbody>
				<tbody id="dataTbody">
					<tr>
						<td colspan="5">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag"></div>
			<div class="mButton1 fLeft">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a>
			</div>
			<!-- //paging -->
		</div>
	</div>
</div>
<h3 class="subtitle forMo">마이페이지</h3>

			<!-- [M 2022-01-13] div 추가 S -->
			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>

			<div class="wrap_inner forMo">
				<!-- 검색 -->
				<div class="search">
					<select title="창업지원내용구분" class="radius" id="schFntnSportCnSeCodeMob" name="schFntnSportCnSeCodeMob" >
						<option value=""><c:out value="전체" /></option>
						<c:forEach var="code" items="${schCodeList}">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
						</c:forEach>
					</select>
				
					<div class="box_search radius">
						<input type="text" name="schTxtMob" id="schTxtMob" placeholder="검색어">
						<button id="btn_schMob">search</button>
					</div>
				</div>
				<!-- //검색 -->

				<!-- [M 2022-02-10] class 'relative' 추가 -->
				<div class="btn relative tar">
					<!-- [M 2022-02-10] 추가 S -->
					<!-- 선택정렬 -->
					<dl class="boardSort toggle_view">
						<dt onclick="toggle_view('sort_cont', this);">전체 작성글 보기</dt>

						<dd class="sort_cont">
							<a href="#" class="active"><span>전체 작성글 보기</span></a>
							<a href="#"><span>작성글 보기</span></a>
							<a href="#"><span>작성댓글 보기</span></a>
						</dd>
					</dl>
					<!-- //선택정렬 -->
					<!-- [M 2022-02-10] 추가 E -->

					<div class="box_btn w100 h26 radius gray"><button id="btn_deleteMob">삭제하기</button></div>
				</div>

				<ul id="dataTbodyMob" class="list_board hasCheck">
					<!-- <li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check0" id="temp_check0" class="hidden notxt">
								<label for="temp_check0"></label>
							</p>

							<a href="boardList_counsel.html">
								<div class="numState">
									<span class="no">안심창업상담</span>
								</div>

								<p class="subject">타인이 운영하던 점포를 가맹본부가 인수한 경우는 어떤가요?</p>

								<p class="nameDate">
									<span>
										<strong>등록일</strong>
										2022.01.21
									</span>
								</p>

								<p class="attach">없음</p>
							</a>
						</div>
					</li> -->
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
<!-- content -->
</article>