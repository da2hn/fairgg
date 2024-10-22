<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/reportSave.js"/>"></script>

	<!-- body -->
	<div class="body">
		<div class="bg">

			<div class="mBoard1 mWrite1 thumb">
				<table summary="제보항목으로 구성된 표입니다.">
				<caption>제보항목</caption>
				<colgroup>
					<col width="175px">
					<col width="*">
				</colgroup>
				<tbody>
				<tr>
					<th scope="col" style="border-top:1px solid #d2d4db">제보항목</th>
					<td class="left" style="border-top:1px solid #d2d4db">
						<c:forEach var="sttemntIemSeCode" items="${sttemntIemSeCodeList}" varStatus="status">
						<span class="mRadio">
							<input type="radio" id="sttemntIemSeCode${status.index}" name="sttemntIemSeCode" title="${sttemntIemSeCode.codeValueNm}" value="${sttemntIemSeCode.codeValue}" <c:if test="${status.index == 0 }">checked="checked"</c:if>>
							<label for="sttemntIemSeCode${status.index}">${sttemntIemSeCode.codeValueNm}</label>
						</span>
						</c:forEach>
					</td>
				</tr>
				</tbody>
				</table>
			</div>

			<!-- write -->
			<div class="gTitle1">
				<h4 class="mTitle1">제보내용 작성</h4>
				<div class="gRt">
					<span class="iMust">은 필수입력항목입니다.</span>
				</div>
			</div>
			<div class="mBoard1 mWrite1">
				<table summary="제보항목으로 구성된 표입니다.">
				<caption>제보항목</caption>
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
							<input type="text" class="it" title="문의자명" value="${sessionScope.user.userNm }" name="wrterNm" id="wrterNm" >
						</div>
					</td>
					<th scope="col">메일</th>
					<td class="left">
						<div class="mFlex1">
							<div class="gIt">
								<input type="text" class="it" title="메일주소앞부분" name="mailFront" id="mailFront" value="${fn:split(sessionScope.user.emailAdres,'@')[0]}" >
							</div>
							<div class="bar" style="margin:-7px 10px -7px 0px">@</div>
							<div class="gIt">
								<input type="text" class="it" title="메일주소뒷부분" name="mailBack" id="mailBack" value="${fn:split(sessionScope.user.emailAdres,'@')[1]}" >
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span class="iMust">제보제목</span></th>
					<td class="left" colspan="3">
						<div class="gIt"><input type="text" class="it" title="제보제목" name="sj" id="sj"></div>
					</td>
				</tr>
				<tr>
					<th scope="col"><span class="iMust">제보내용</span></th>
					<td class="left" colspan="3">
						<div class="gTextarea"><textarea class="textarea" rows="6" title="제보내용" placeholder="500자 이내로 입력해 주세요." name="cn" id="cn"></textarea></div>
						<div class="mCount1">( <em>0</em>/500 )</div>
					</td>
				</tr>
				<tr>
					<th scope="col">파일첨부</th>
					<td class="left" colspan="3">
						<div id="atchFileDiv"></div>
						<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>
					</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->

			<div class="mInfo2">
				<div class="tit">[필수] 고객정보 수집동의</div>
				<div class="txt">
					1:1문의 작성시 포함되는 문의자명, 메일은 문의접수 및 상담을 위해 수집하여 6개월간 보관됩니다.<br>
					등록된 메일로 답변메일이 전송됩니다.
				</div>
				<div class="gRt">
					<div class="rtBg">
						<span class="mRadio">
							<input type="radio" id="colctAgreAt1" name="colctAgreAt" title="동의함" value="Y">
							<label for="colctAgreAt1">동의함</label>
						</span>
						<span class="mRadio">
							<input type="radio" id="colctAgreAt2" name="colctAgreAt" title="동의안함" checked="checked" value="N">
							<label for="colctAgreAt2">동의안함</label>
						</span>
					</div>
				</div>
			</div>
			<div class="mButton1 right">
				<a href="javascript:fnSave();" class="mBtn1 primary">등록</a>
				<a href="/main/main.do" class="mBtn1 gray">취소</a>
			</div>

		</div>
	</div>
	<!-- //body -->