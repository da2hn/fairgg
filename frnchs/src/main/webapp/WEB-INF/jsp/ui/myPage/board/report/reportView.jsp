<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/reportView.js"/>"></script>


<!-- content -->
<div class="content">
	<h5 class="mTitle2">불공정 계약신고 관리 – 1:1 문의 관리</h5>
		<form id="dataForm" method="post">
		<input type="hidden" id="answerSttusSeCode" name="answerSttusSeCode" value="${injstBbs.answerSttusSeCode}"/>
		<input type="hidden" id="injstCntrctSttemntSn" name="injstCntrctSttemntSn" value="${injstBbs.injstCntrctSttemntSn}"/>
		<input type="hidden" id="wrterEmailAdres" name="wrterEmailAdres" value="${injstBbs.wrterEmailAdres}"/>
		<input type="hidden" id="sj" name="sj" value="${injstBbs.sj}"/>
			<!-- write -->
			<div class="mBoard1 mWrite1">
				<table summary="신고항목으로 구성된 표입니다.">
				<caption>신고항목</caption>
				<colgroup>
					<col width="175px">
					<col width="420px">
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th scope="col">문의자명</th>
					<td class="left">
						<div class="gIt">
							<c:out value="${injstBbs.userNm}" />
						</div>
					</td>
					<th scope="col">메일</th>
					<td class="left">
						<div class="mFlex1">
							<div class="gIt">
								<c:out value="${injstBbs.wrterEmailAdres}" />
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>신고항목</span></th>
					<td class="left" colspan="3">
						<div class="gIt">
							<c:out value="${injstBbs.sttemntIemSeCodeNm}" />
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>문의제목</span></th>
					<td class="left" colspan="3">
						<div class="gIt">
							<c:out value="${injstBbs.sj}" />
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>문의내용</span></th>
					<td class="left" colspan="3">
						<div class="gTextarea">
							<textarea class="textarea" rows="6" title="문의내용" name="cn" id="cn" readonly><c:out value="${injstBbs.cn}" /></textarea>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col">파일첨부</th>
					<td class="left" colspan="3">
						<input type="hidden" name="atchmnflNo" id="atchmnflNo" value="${injstBbs.atchmnflNo}"/>
						<div id="atchFileDiv"></div>
						<!-- <p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p> -->
					</td>
				</tr>
				<tr>
					<th scope="col"><span>답변메일</span></th>
					<td class="left" colspan="3">
						<div class="gTextarea">
							<textarea class="textarea" rows="6" title="답변메일" placeholder="답변메일 내용을 입력하세요." name="answerCn" id="answerCn"><c:out value="${injstBbs.answerCn}" /></textarea>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>등록일</span></th>
					<td class="left" colspan="3">
						<div class="gIt">
							<c:out value="${injstBbs.updtDt}" />
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span>답변일</span></th>
					<td class="left" colspan="3">
						<div class="gIt">
							<c:out value="${injstBbs.answerRegistDt}" />
						</div>
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->
			<div class="mButton1 center">
				<a href="javascript:void(0);" class="mBtn1 primary" id="fn_updateReport">메일발송</a>
				<a href="${contextPath}/myPage/board/report/reportList.do" class="mBtn1 primary">취소</a>
			</div>

</div>