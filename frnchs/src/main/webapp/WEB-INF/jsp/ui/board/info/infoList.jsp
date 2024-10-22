<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoList.js"/>"></script>

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
						<select title="창업지원내용구분" class="select" id="schFntnSportCnSeCode" name="schFntnSportCnSeCode" >
							<option value=""><c:out value="전체" /></option>
							<c:forEach var="code" items="${fntnSportCnSeCodeList}">
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
					</form>
				</div>
			</div>
			<div class="gRt" align="right">
				<c:if test="${!empty sessionScope.user}">
					<a href="${contextPath}/board/info/infoSave.do" class="mBtn1 primary">글쓰기</a>
				</c:if>
			</div>
			<!-- board -->
			<div class="mBoard1">
				<table summary="번호, 구분, 제목, 작성자, 조회, 등록일, 파일로 구성된 표입니다.">
				<caption>정보소통게시판</caption>
				<colgroup>
					<col width="90px">
					<col width="90px">
					<col width="*">
					<col width="105px">
					<col width="80px">
					<col width="105px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">구분</th>
					<th scope="col">제목</th>
					<th scope="col">작성자</th>
					<th scope="col">조회</th>
					<th scope="col">등록일</th>
					<th scope="col">파일</th>
				</tr>
				</thead>
				<tbody>
				<tbody id="dataTbody">
					<tr>
						<td colspan="9">조회된 데이터가 없습니다.</td>
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
	</div>
	<!-- //body -->