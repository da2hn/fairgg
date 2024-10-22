<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/reportList.js"/>"></script>

<!-- content -->
<div class="content">
	<h5 class="mTitle2">정보공개서제보 관리 – 1:1 문의 관리</h5>

			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<select title="제보항목" class="select" id="schCodeSttemnt" name="schCodeSttemnt" >
						<option value=""><c:out value="전체" /></option>
						<c:forEach var="code" items="${schSttemntIemSeCodeList}">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
						</c:forEach>
					</select>
					<select title="진행상태" class="select" id="schCodeAnswer" name="schCodeAnswer" >
						<option value=""><c:out value="전체" /></option>
						<c:forEach var="code" items="${schAnswerSttusSeCodeList}">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
						</c:forEach>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="제목으로 검색">
					<a href="javascript:void(0);" class="mBtn1" id="btn_sch">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="injstCntrctSttemntSn" name="injstCntrctSttemntSn" />
					<input type="hidden" id="schCodeVal" name="schCodeVal" />
					<input type="hidden" id="schTxtVal" name="schTxtVal" />
				</form>
			</div>

			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 구분, 제목, 등록일, 게시자 로 구성된 표입니다.">
				<caption>창업지원 게시판 관리</caption>
				<colgroup>
					<col width="65px">
					<col width="160px">
					<col width="*">
					<col width="200px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제보항목</th>
					<th scope="col">문의제목</th>
					<th scope="col">등록일</th>
					<th scope="col">진행상태</th>
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
			<div class="mPag">
			</div>
			<!-- //paging -->

</div>
<!-- content -->