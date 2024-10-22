<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/exprRcritList.js"/>"></script>
<!-- content -->
<div class="content">
	<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">체험 예비창업자 관리현황</span></h5>

	<!-- board -->
	<div class="mBoard1">
		<input type="hidden" name="exprnRegistNo" id="exprnRegistNo" value="${exprnRegistNo }"/>
		<input type="hidden" name="rcritNmpr" id="rcritNmpr" value="${frnchsExprnRegistInfo.rcritNmpr }"/>
		<table summary="선택, 선착순 순위, 참여자명, 전화번호, 이메일, 신청일, 상태로 구성된 표입니다.">
		<caption>체험 예비창업자 관리현황</caption>
		<thead>
			<tr>
				<th scope="col">선택</th>
				<th scope="col">선착순 순위</th>
				<th scope="col">참여자명</th>
				<th scope="col">전화번호</th>
				<th scope="col">이메일</th>
				<th scope="col">신청일</th>
				<th scope="col">상태</th>
			</tr>
		</thead>
		<tbody id="dataTbody">
		</tbody>
		</table>
	</div>
	<!-- //board -->

	<div class="mButton1 right">
		<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">승인</a>
		<a href="<c:url value="/myPage/expr/exprManage/exprManageList.do" />" class="mBtn1 gray">목록</a>
	</div>

</div>
<!-- //content -->