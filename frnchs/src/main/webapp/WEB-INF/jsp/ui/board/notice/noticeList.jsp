<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/noticeList.js"/>"></script>

	<!-- body -->
	<div class="body">
		<div class="bg">
		
			<div class="mSort1">
				<span class="cnt" id="totalCnt"></span>
				<div class="gRt">
					<form id="searchForm" method="post" onsubmit="return false;">
						<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
						<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
						<input type="hidden" id="userNo" name="userNo" />
						<input type="hidden" name="pageIndex" value="" />
						<select title="공지사항구분" class="select" id="schCode" name="schCode" >
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
						<input type="hidden" id="noticeSn" name="noticeSn" />
						<input type="hidden" id="schCodeVal" name="schCodeVal" />
						<input type="hidden" id="schTxtVal" name="schTxtVal" />
					</form>
				</div>
			</div>
			<!-- board -->
			<div class="mBoard1">
				<table summary="번호, 제목, 등록일로 구성된 표입니다.">
				<caption>공지사항</caption>
				<colgroup>
					<col width="90px">
					<col width="*">
					<col width="115px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">등록일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="9">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->

		</div>
	</div>
	<!-- //body -->
