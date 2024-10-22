<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/unity/boardRegist.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	 $('#cn').on('keyup', function() {
	        $('.mCount1').html("(<em>"+$(this).val().length+"</em> / 1000)");
	 
	        if($(this).val().length > 1000) {
	        	alert("최대 1000자까지 입력 가능합니다.");
	            $(this).val($(this).val().substring(0, 1000));
	            $('.mCount1').html("(<em>1000</em> / 1000)");
	        }
	    });
	
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})
</script>
<style>
#wrap{ overflow: auto; }
</style>
<article id="totalBoard" class="boardView"> 
	<!-- body -->
	<div class="body forPc">
		<div class="bg">
			<div class="mView1">
			<form id="dataForm" method="post" enctype="multipart/form-data">
				<input type="hidden" id="crud" name="crud" value="<c:out value="${param.crud}" />" />
	            <input type="hidden" id="sn" name="sn" value="<c:out value="${unityBbs.bbsSn}" />" />
				<input type="hidden" id="upperBbsSn" name="upperBbsSn" value="<c:out value="${upperBbsSn}" />" />
				<%-- <input type="hidden" id="seCodeVal" name="seCodeVal" value="<c:out value="${unityBbs.seCode}" />" /> --%>
				<input type="hidden" id="atchmnflNo" name="atchmnflNo" value="<c:out value="${unityBbs.atchmnflNo}" />" />
				<%-- <input type="hidden" id="updateBoardMngType" name="updateBoardMngType" value="<c:out value="${boardMngType}" />" /> --%>
				<input type="hidden" id="motifyType" name="motifyType" value=""/>
				<input type="hidden" id="masterSn" name="masterSn" value="${param.masterSn}">
				<input type="hidden" id="bbsDc" name="bbsDc" value="${param.bbsDc}">
				<input type="hidden" id="bbsLc" name="bbsLc" value="${param.bbsLc}">
				<input type="hidden" id="bbsNm" name="bbsNm" value="${param.bbsNm}">
				<input type="hidden" id="atchmnflCo" name="atchmnflCo" value="${param.atchmnflCo}">
				<input type="hidden" id="answerAt" name="answerAt" value="${param.answerAt}">
				<input type="hidden" id="atchmnflAt" name="atchmnflAt" value="${param.atchmnflAt}">
				<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="${param.menuGroupCode}" />
				<input type="hidden" id="menuNm" name="menuNm" value="${param.menuNm}">
				<input type="hidden" id="unityCn" name="unityCn" value="<c:out value="${unityBbs.cn}" />">
				<!-- write -->
				<div class="warning">
						상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
						또한, 홈페이지를 통하여 불법유해 정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
					</div>

					<div class="gTitle1">
						<h3 class="mTitle1">글쓰기</h3>
						<div class="gRt">
							<span class="iMust">은 필수입력항목입니다.</span>
						</div>
					</div>
					<div class="mBoard1 mWrite1">
						<table>
							<caption>게시판 글쓰기 - 제목, 내용, 파일첨부</caption>
							<colgroup>
								<col style="width:268px;">
								<col style="width:auto;">
							</colgroup>

							<tbody>
								<tr>
									<th scope="row"><span class="iMust">제목</span></th>
									<td class="left">
										<div class="gIt"><input type="text" class="it" placeholder="제목을 입력해주세요." id="sj" name="sj" value="${unityBbs.sj}" style="min-width:500px;border:1;"/></div>
									</td>
								</tr>

								<tr>
									<th scope="row"><span class="iMust">내용</span></th>
									<td class="left">
											<textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cn" id="cn" style="width:96%;min-width:500px;"></textarea>
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
											    	var contents = $("#unityCn").val();
											    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
											    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
											    },
											    fCreator: "createSEditor1"
											}); 
											</script>
											<!-- <div class="mCount1">( <em>0</em>/1000 )</div> -->
									</td>
								</tr>

								<tr>
									<th scope="row">파일첨부</th>
									<td class="left">
										<div class="mInfo1" style="padding-top:0px;">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</div>

										<div class="row attach" id="atchFileBox">
											<span class="tit">첨부파일</span>
											<div id="atchFileDiv"></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</form>
					
					<div class="mButton1 right">
						<div id="btn_insert" style="display:inline-block"><a href="javascript:void(0);" class="mBtn1 primary">등록</a></div>
						<div id="btn_update" style="display:inline-block"><a href="javascript:void(0);" class="mBtn1 primary">수정</a></div>
						<!-- <a href="javascript:void(0);" class="mBtn1 gray" id="btn_delete">삭제</a> -->
						<a href="javascript:void(0);" class="mBtn1 gray" id="btn_list">목록</a>
					</div>
					
					<%-- <div class="row article"><input type="text" class="it" placeholder="제목을 입력해주세요." id="sj" name="sj" value="${unityBbs.sj}" style="min-width:500px;border:0;"/></div>
					<h4>&ensp;<c:out value="${unityBbs.sj}" />
						&emsp;<span class="dt"><c:out value="${unityBbs.updtDt}" /></span>
					</h4>
					<div class="row article">
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
						    	var contents = `${unityBbs.cn}`; 태그에러 변경 - 21.05.12
						    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
						    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
						    },
						    fCreator: "createSEditor1"
						});
						</script>
					</div>
					<div class="row attach" id="atchFileBox">
						<span class="tit">첨부파일</span>
						<div id="atchFileDiv"></div>
					</div>
			<!-- //write -->
			</form>
			<div class="mButton1 right">
				<div id="btn_insert" style="display:inline-block"><a href="javascript:void(0);" class="mBtn1 primary">등록</a></div>
				<div id="btn_update" style="display:inline-block"><a href="javascript:void(0);" class="mBtn1 primary">수정</a></div>
				<!-- <a href="javascript:void(0);" class="mBtn1 gray" id="btn_delete">삭제</a> -->
				<a href="javascript:void(0);" class="mBtn1 gray" id="btn_list">목록</a>
			</div> --%>
		</div>
	</div>
</div>	
	<h3 class="subtitle forMo">${param.bbsNm}</h3>
			<div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div>
			
			<div class="wrap_inner forMo">
			<input type="hidden" id="atchmnflMobNo" name="atchmnflNo" value="<c:out value="${unityBbs.atchmnflNo}" />" />		
				<div class="warning">
					상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치적 목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
					또한, 홈페이지를 통하여 불법유해정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
				</div>

				<div class="tableArea">
					<h4 class="relative">
						글쓰기

						<span class="required"><strong>*</strong> 필수입력 항목입니다.</span>
					</h4>

					<dl>
						<dt class="required">제목</dt>
						<dd>
							<input type="text" class="w100p radius" placeholder="제목을 입력해주세요." id="sjMob" name="sj" value="${unityBbs.sj}" />
						</dd>
					</dl>

					<dl>
						<dt class="required">내용</dt>
						<dd class="relative">
							<textarea class="w100p radius" rows="10" placeholder="내용을 입력해주세요." name="cnMob" id="cnMob" style="width:100%;font-size:1rem;"></textarea>
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
								    	var contents = $("#unityCn").val();
								    	oEditorsMob.getById["cnMob"].exec("PASTE_HTML",[contents]);
								    	oEditorsMob.getById["cnMob"].exec("SE_FIT_IFRAME", [300]);
								    },
								    fCreator: "createSEditor1"
								});
								</script>
							<p class="writeCount">
								<!-- <span>0</span>/<span>1,000</span> -->
							</p>
						</dd>
					</dl>

					<dl>
						<dt>파일첨부</dt>
						<dd>
							<div id="atchFileDivMob"></div>
						</dd>
					</dl>
				</div>
				
				<div class="btn_col2 col2" style="text-align:center;border-top:1px solid #ddd">
					<c:choose>
					 	<c:when test="${unityBbs.bbsSn eq null }">
							<div class="box_btn block h40 radius" style="margin-left:26%;border-top:0px"><button id="btn_insertMob"  style="width:100%;">등록</button></div>
				         </c:when>
				         <c:otherwise>
				         	<div class="box_btn block h40 radius" style="margin-left:26%;border-top:0px"><button id="btn_updateMob" style="width:100%;">수정</button></div>
			        	</c:otherwise>
					</c:choose>
				</div>
				
				<div class="btn2">
					<div class="box_btn block h40 radius white" id="btn_listMob" style="border-top:0px"><button>목록</button></div>
				</div>
			</div>
</article>	
<!-- //content -->