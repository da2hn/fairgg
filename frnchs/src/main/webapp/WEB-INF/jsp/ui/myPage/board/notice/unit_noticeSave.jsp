<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/unit_noticeSave.js"/>"></script>
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/noticeSave.js"/>"></script> --%>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
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
			<h5 class="mTitle2">게시판 관리</h5>
		
			<form id="dataForm" method="post" enctype="multipart/form-data">
				<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
	            <input type="hidden" id="infoSn" name="infoSn" value="<c:out value="${integBbs.bbsSn}" />" />
				<input type="hidden" id="seCodeVal" name="seCodeVal" value="<c:out value="${integBbs.seCode}" />" />
				<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${integBbs.atchmnflNo}" />" />
				<input type="hidden" id="updateBoardMngType" name="updateBoardMngType" value="<c:out value="${boardMngType}" />" />
				<input type="hidden" id="updateUnitType" name="updateUnitType" value="<c:out value="${unitType}" />" />
				<input type="hidden" id="motifyType" name="motifyType" value=""/>
				<input type="hidden" id="integBbsCn" name="integBbsCn" value="<c:out value="${integBbs.cn}" />"/>
			<!-- write -->
			<div class="mBoard1 mWrite1">
				<table summary="구분, 제목, 내용, 파일첨부, 등록일로 구성된 표입니다.">
				<caption>공지사항 관리</caption>
				<colgroup>
					<col width="175px">
					<col width="775px">
				</colgroup>
				<tbody>
				<tr>
					<th>게시판구분</th>
					<td class="left">
						<select title="게시판구분" class="select" id="unitType" name="unitType" style="width:170px">
							<option value="">선택하세요</option>
						</select>
						<%-- <c:forEach var="code" items="${inSeCodeList}">
							<span class="mRadio inSeCodeSpan" style="display:none;">
								<input type="radio" id="inSeCode_${code.codeValue}" name="inSeCode" value="${code.codeValue}" >
								<label for="inSeCode_${code.codeValue}">${code.codeValueNm}</label>
							</span>
						</c:forEach>
						<c:forEach var="code" items="${nsSeCodeList}">
							<span class="mRadio nsSeCodeSpan" style="display:none;">
								<input type="radio" id="nsSeCode_${code.codeValue}" name="nsSeCode" value="${code.codeValue}" >
								<label for="nsSeCode_${code.codeValue}">${code.codeValueNm}</label>
							</span>
						</c:forEach> --%>
					</td>
				</tr>
				<tr>
					<th>등록구분</th>
					<td class="left">
						<select class="select" title="구분" name="boardMngType" id="boardMngType" style="width:170px" disabled="disabled">
							<option value="">선택하세요</option>
							<option value="N">공지</option>
							<option value="I">정보공개</option>
							<option value="C">직접입력</option>
						</select>
						<!-- <input type="hidden" id="inSeCode" name="inSeCode"> -->
						<c:forEach var="code" items="${inSeCodeList}">
							<span class="mRadio inSeCodeSpan" style="display:none;">
								<input type="radio" id="inSeCode_${code.codeValue}" name="inSeCode" value="${code.codeValue}">
								<%-- <input type="radio" id="inSeCode_${code.codeValue}" name="inSeCode" value="${code.codeValue}" > --%>
								<label for="inSeCode_${code.codeValue}">${code.codeValueNm}</label>
							</span>
						</c:forEach>
						<c:forEach var="code" items="${nsSeCodeList}">
							<c:if test="${code.codeValue != 'NS05'}">
								<span class="mRadio nsSeCodeSpan" style="display:none;">
									<input type="radio" id="nsSeCode_${code.codeValue}" name="nsSeCode" value="${code.codeValue}">
									<label for="nsSeCode_${code.codeValue}">${code.codeValueNm}</label>
								</span>
							</c:if>
						</c:forEach>
						<span class="cCodeSpan" style="display:none;">
							<input type="hidden" name="cCode" id="cCode" value="">
							<input type="text" class="it" id="cCodeNm" name="cCodeNm" placeholder="등록구분 직접입력" style="width:25%;">
						</span>
					</td>
				</tr>
				<tr>
					<th>제목</th>
					<td class="left">
						<div class="gIt"><input type="text" class="it" placeholder="제목을 입력해주세요." id="sj" name="sj" value="${integBbs.sj}" /></div>
					</td>
				</tr>
				<tr>
					<th>내용</th>
					<td colspan="2">
						<div class="gTextarea">
							<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cn" id="cn" style="width:100%;min-width:500px;"></textarea>
							<script type="text/javascript">
							var oEditors = [];
							nhn.husky.EZCreator.createInIFrame({
							    oAppRef: oEditors,
							    elPlaceHolder: "cn",
							    sSkinURI: "/static/se2/SmartEditor2Skin_ko_KR.html",
							    htParams : {
							    	bUseToolbar : true,
							    	bUseVerticalResizer : false,
							    	bUseModeChanger : false
							    },
							    fOnAppLoad:function(){
							    	var contents = $("#integBbsCn").val(); <%-- 태그에러 변경 - 21.05.12 --%>
							    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
							    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
							    },
							    fCreator: "createSEditor2"
							});
							</script>
						</div>
					</td>
				</tr>
				<tr>
					<th>파일첨부</th>
					<td class="left">
						<div id="atchFileDiv"></div>
					</td>
				</tr>
				<tr class="promoTr" style="display:none;">
					<th>순번</th>
					<td class="left">
						<div class="gIt"><input type="text" class="it onlyNumber" placeholder="순번을 입력해주세요." id="expsrSn" name="expsrSn" value="${integBbs.expsrSn}" maxlength="3" style="width:20%"/></div>
					</td>
				</tr>
				<tr class="promoTr" style="display:none;">
					<th>사용유무</th>
					<td class="left">
						<div class="gIt">
							<span class="mRadio useAtSpan">
								<input type="radio" id = "useAtY" name="useAt" value="Y" <c:out value="${integBbs.useAt == 'Y' || integBbs.useAt == null ? 'checked' : integBbs.useAt}"/>>
								<label for="useAtY">사용</label>
							</span>
							<span class="mRadio useAtSpan">
								<input type="radio" id = "useAtN" name="useAt" value="N" <c:out value="${integBbs.useAt == 'N' ? 'checked' : ''}"/>>
								<label for="useAtN">미사용</label>
							</span>
						</div>
					</td>
				</tr>
				<tr>
					<th>등록일</th>
					<td class="left">${integBbs.registDt}</td>
				</tr>
				</tbody>
				</table>
			</div>
			<!-- //write -->
			</form>
		
			<div class="mButton1 right">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_insert">저장</a>
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_update">수정</a>
				<a href="javascript:void(0);" class="mBtn1 gray" id="btn_delete">삭제</a>
				<a href="${contextPath}/myPage/mng/notice/noticeList.do" class="mBtn1 gray">취소</a>
			</div>
		
		</div>
	</div>
</div>	
	<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
			
			<div class="wrap_inner forMo">
				<table class="tbl_row">
					<caption>가입정보수정</caption>
					<colgroup>
						<col style="width:15%;">
						<col style="width:85%;">
					</colgroup>

					<tbody>
						<tr>
							<th>게시판<br>구분</th>
							<td class="left">
								<select title="게시판구분" class="select" name="unitTypeMob" id="unitTypeMob" style="width:170px">
									<option value="">선택하세요</option>
								</select>
		
							</td>
						</tr>
						<tr>
							<th scope="row">구분</th>
							<td class="left">
								<select class="select" title="구분" name="boardMngType" id="boardMngTypeMob" style="width:170px">
								<option value="">선택하세요</option>
								<option value="N">공지</option>
								<option value="I">정보공개</option>
								<option value="C">직접입력</option>
							</select>
							<c:forEach var="code" items="${inSeCodeList}">
								<span class="mRadio inSeCodeSpan" style="display:none;">
								
								<input type="radio" id="inSeCode_${code.codeValue}Mob" name="inSeCodeChkMob" class="inSeCodeMob" value="${code.codeValue}" >
									<%-- <input type="radio" id="inSeCode_${code.codeValue}Mob" name="inSeCode" class="inSeCodeMob" value="${code.codeValue}" > --%>
									<label for="inSeCode_${code.codeValue}Mob">${code.codeValueNm}</label>
								</span>
							</c:forEach>
							<c:forEach var="code" items="${nsSeCodeList}">
								<c:if test="${code.codeValue != 'NS05'}">
									<span class="mRadio nsSeCodeSpan" style="display:none;">
										<input type="radio" id="nsSeCode_${code.codeValue}Mob" name="nsSeCode" class="nsSeCodeMob" value="${code.codeValue}" >
										<label for="nsSeCode_${code.codeValue}Mob">${code.codeValueNm}</label>
									</span>
								</c:if>
							</c:forEach>
								<span class="cCodeSpan" style="display:none;">
									<input type="hidden" name="cCode" id="cCode" class="cCodeMob" value="">
									<input type="text" class="it cCodeNmMob" id="cCodeNmMob" name="cCodeNm" placeholder="등록구분 직접입력" style="width:50%;">
								</span>
							</td>
						</tr>

						<tr>
							<th scope="row">제목</th>
							<td class="left">
							<div class="gIt"><input type="text" class="it" placeholder="제목을 입력해주세요." id="sjMob" name="sj" value="${integBbs.sj}" /></div>
							</td>
						</tr>

						 <tr>
							<th scope="row">내용</th>
							<td class="left">
								<div class="gTextarea">
									<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cnMob" id="cnMob" style="width:100%;min-width:100px"></textarea>
									<script type="text/javascript">
										var oEditorsMob = [];
										nhn.husky.EZCreator.createInIFrame({
										    oAppRef: oEditorsMob,
										    elPlaceHolder: "cnMob",
										    sSkinURI: "/static/se2/SmartEditor2Skin_ko_KR.html",
										    htParams : {
										    	bUseToolbar : false,
										    	bUseVerticalResizer : false,
										    	bUseModeChanger : false
										    },
										    fOnAppLoad:function(){
										    	var contents = $("#integBbsCn").val(); <%-- 태그에러 변경 - 21.05.12 --%>
										    	oEditorsMob.getById["cnMob"].exec("PASTE_HTML",[contents]);
										    	oEditorsMob.getById["cnMob"].exec("SE_FIT_IFRAME", [300]);
										    },
										    fCreator: "createSEditor2"
										});
									</script>
								</div>
							</td>
						</tr>

						<tr class="">
							<th scope="row">파일첨부</th>
							<td class="left">
								<div id="atchFileDivMob"></div>
								<input type="hidden" id="" value=""/>
							</td>
						</tr>
						<tr class="promoTr" style="display:none;">
							<th>순번</th>
							<td class="left">
								<div class="gIt"><input type="text" class="it onlyNumber" placeholder="순번을 입력해주세요." id="expsrSnMob" name="expsrSnMob" value="${integBbs.expsrSn}" maxlength="3" style="width:20%"/></div>
							</td>
						</tr>
						<tr class="promoTr" style="display:none;">
							<th>사용유무</th>
							<td class="left">
								<div class="gIt">
									<span class="mRadio useAtSpan">
										<input type="radio" id = "useAtYMob" name="useAtMob" value="Y" <c:out value="${integBbs.useAt == 'Y' || integBbs.useAt == null ? 'checked' : integBbs.useAt}"/>>
										<label for="useAtYMob">사용</label>
									</span>
									<span class="mRadio useAtSpan">
										<input type="radio" id = "useAtNMob" name="useAtMob" value="N" <c:out value="${integBbs.useAt == 'N' ? 'checked' : ''}"/>>
										<label for="useAtNMob">미사용</label>
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">등록일</th>
							<td class="left">${integBbs.registDt}</td>
						</tr>
					</tbody>
				</table>

				<div class="btn_col2 col2">
					<div class="box_btn block h40 radius" id="btn_insertMob" style="width:30%;margin-right:5%;"><button>저장</button></div>
					<div class="box_btn block h40 radius gray" style="width:30%;">
						<button onclick="location.href='${contextPath}/myPage/mng/notice/noticeList.do'">취소</button>
					</div>
					<div class="box_btn block h40 radius" id="btn_updateMob" style="width:30%;">
						<button>수정</button>
					</div>
					<div class="box_btn block h40 radius gray" id="btn_deleteMob" style="width:30%;margin-left:5%"><button>삭제</button></div>
				</div>
			</div>
<!-- //content -->