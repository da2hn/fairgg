<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
<script type="text/javascript">
var fObj = null;
var defulutW = "<c:out value="${data.popupWidthMg }" />"; 
var defulutV = "<c:out value="${data.popupVrticlMg }" />"; 
var oEditors = [];
	$(function(){
// 		alert("${data.menuCode}");
// 		$("input[name=popupType]").on("click change", function() {
// 			$("div[id='"+$(this).val()+"']").closest("td").find("div[id*='Type']").hide();
// 			$("div[id='"+$(this).val()+"']").closest("td").find("input, textarea").val("");
// 			$("div[id='"+$(this).val()+"']").show();
// 			$('#imgArea').attr('src', '<c:url value="/static/images/x_attachimg1.png" />');
//			// 이미지/내용 관련 분기 및 등록/수정 상태에 따른 추가 작업 - 21.03.08
// 			if($(this).val() =="imgType") {
// 				$("input[name=popupWidthMg]").val(defulutW).prop("readonly", true);
// 				$("input[name=popupVrticlMg]").val(defulutV).prop("readonly", true);
// 			} else {
// 				$("input[name=popupWidthMg]").val("").prop("readonly", false);
// 				$("input[name=popupVrticlMg]").val("").prop("readonly", false);
				
// 				// 스마트 에디터 iframe 새로고칭
// 				$('.class_smarteditor2').css('height', '300px'); 
// 				$('.class_smarteditor2').attr('src',$('.class_smarteditor2').attr('src'));
// 			}
// 		})
		$("input[name=popupType]").on("click change", function() {
			if($(this).val() =="imgType") {				
				$("div[id='imgType']").show();				
			} else{
				$("div[id='imgType']").closest("td").find("div[id*='Type']").hide();				
			}
		});
		
		$("input[type=file][name=atchFile]").on("change", function() {
			// 이미지가능하도록 작업 - 21.02.09
            var fileType = this.files[0].name.substring(this.files[0].name.lastIndexOf('.')+1,this.files[0].name.length).toLowerCase();
            if($.inArray(fileType,["jpg","jpeg","png","bmp"]) == -1 && !this.files[0].type.includes("image")) {
                alert("jpg, jpeg, png, bmp 파일만 업로드 해주세요.");
                $("input[type=file][name=atchFile]").val("");
                $("#fileName").val("");
                $('#imgArea').hide();
                $('#imgArea').attr('src', '<c:url value="/static/images/x_attachimg1.png" />');
                return false;
            } else {
            	$('#imgArea').show();
				readURL(this);
            }
		});
		
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
		    	var contents = $("#curCn").val(); <%-- 태그에러 변경 - 21.05.12 --%>
		    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
		    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
		    },
		    fCreator: "createSEditor2"
		});
		if(!$('#forBoardRegCn').is(':checked')){
			$("#cnType").hide();			
		}
	});
	
	 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            // 이미지 사이즈 측정 영역 추가 - 21.02.09
            var img = new Image();
            var _URL = window.URL || window.webkitURL;
            img.src = _URL.createObjectURL(input.files[0]);
            img.onload = function() {
                console.log(img.width+"::"+img.height);
// 				var fixWidth = 720;
// 				var fixHeight = 300;
// 				if(img.width != fixWidth || img.height != fixHeight) {
// 					alert("이미지 가로 "+fixWidth+"px, 세로 "+fixHeight+"px로 맞춰서 올려주세요.");
// 					$("input[type=file][name=atchFile]").val("");
// 					$('#imgArea').attr('src',"");
// 					$("#fileName").val("");
// 					return;
// 				}  else {
					$("input[name=popupWidthMg]").val(img.width);
					$("input[name=popupVrticlMg]").val(img.height);
					reader.onload = function(e) {
						var wid = img.width;
						var hegt = img.height;
					  	if ( wid > 600 ) {      
					  		hegt = 1 * img.height / ( img.width / 600);
					        wid = 600;     
					    }
					  	$("#imgArea").attr("width",wid);
					  	$("#imgArea").attr("height",hegt);
		                var tmpImg = $('#imgArea').attr('src', e.target.result);
		            }
		            reader.readAsDataURL(input.files[0]);
// 				}
            }
            
        }
    }
	
	function fn_moidfyPopupMngInfo() {	
		if(!$("[name=menuCode]").val()) {
			alert("메뉴를 선택해주세요.");
			$("[name=menuCode]").focus();
			return false;
		}
		if(!$("[name=sj]").val()) {
			alert("제목을 입력해주세요.");
			$("[name=sj]").focus();
			return false;
		}
		if(!$("[name=ntceBeginDe]").val()) {
			alert("게시 기간 시작일자를 입력해주세요.");
			$("[name=ntceBeginDe]").focus();
			return false;
		}
		if(!$("[name=ntceEndDe]").val()) {
			alert("게시 기간 종료일자를 입력해주세요.");
			$("[name=ntceEndDe]").focus();
			return false;
		}
		if(!$("[name=popupWidthMg]").val()) {
			alert("팝업창 가로크기를 입력해주세요.");
			$("[name=popupWidthMg]").focus();
			return false;
		}
		if(!$("[name=popupVrticlMg]").val()) {
			alert("팝업창 세로크기를 입력해주세요.");
			$("[name=popupVrticlMg]").focus();
			return false;
		}
		if(!$("[name=popupWidthLc]").val()) {
			alert("팝업창 가로위치를 입력해주세요.");
			$("[name=popupWidthLc]").focus();
			return false;
		}
		if(!$("[name=popupVrticlLc]").val()) {
			alert("팝업창 세로위치를 입력해주세요.");
			$("[name=popupVrticlLc]").focus();
			return false;
		}
		if(!$("[name=popupType]").is(":checked")) {
			alert("등록 타입을 선택해주세요.");
			$("[name=popupType]").focus();
			return false;
		}
// 		else if($("[name=popupType]:checked").val()){
		oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD", []);
// 			if($("[name=popupType]:checked").val() == "cnType" && !$("[name=cn]").val()){
		if(!$("[name=cn]").val()){
			alert("내용을 입력해주세요.");
			$("[name=cn]").focus();
			return false;
		} 
// 		} else 
		if($("[name=popupType]:checked").val() == "imgType" && !$("[name=atchFile]").val() && !$(".ul").text()){
				alert("첨부파일을 입력해주세요.");
				$("[name=atchFile]").focus();
				return false;
		}
		if(!$("[name=useAt]").is(":checked")) {
			alert("사용 유무를 선택해주세요.");
			$("[name=useAt]").focus();
			return false;
		}
		$("#dataForm").ajaxForm({
			url: '<c:url value="/sysMngr/${type}PopupMngInfo.ajax" />',
			dataType:"json",
			async: "false",
			beforeSend:function(){
			},
			success : function(data, status, request) {
				alert(data.resultMsg);
				if(data.resultCode == 'success'){
					location.href = '<c:url value="/sysMngr/popup/popup/popupMngList.do" />';
				}
			},
			complete:function(dt){

			},error : function(data) {
				alert("에러가 발생하였습니다.");
			}
		});

		$("#dataForm").submit();
	}
	
</script>
<!-- contents -->
<div class="contents">
	
	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">팝업관리</span>
		<span class="t">팝업창 관리</span>
	</div>
	<!-- //breadcrumb -->
	
	<h2 class="mTitle1">팝업창 관리</h2>
	
	<div class="mBoard1 type2">
		<input type="hidden" id="curCn" value="<c:out value="${data.cn }" />">
		<form id="dataForm" method="post" enctype="multipart/form-data">
		<table summary="서비스 선택, 게시 기간선택, 팝업창 크기, 팝업창 위치, 내용, 팝업사용유무로 구성된 표입니다.">
			<caption>팝업창 관리</caption>
			<colgroup>
				<col width="130">
				<col width="40%">
				<col width="130">
				<col width="*">
			</colgroup>
			<tbody>
				<tr class="notl1">
					<th class="left">서비스 선택</th>
					<td class="left" colspan="3">
						<div class="gSelect1">
							<select class="select" name="menuCode" title="서비스 선택">
								<option value="">선택하세요</option>
								<option value="all" <c:if test="${'all' eq data.menuCode  }">selected</c:if>>전체 화면</option>
								<option value="main" <c:if test="${'main' eq data.menuCode  }">selected</c:if>>메인 화면</option>
								<c:forEach var="menu" items="${menuList }">
									<option value="${menu.menuCode }" <c:if test="${menu.menuCode eq data.menuCode  }">selected</c:if> ><c:out value="${menu.menuGroupNm }" /> > <c:out value="${menu.menuNm }" /></option>
								</c:forEach>
							</select>
						</div>
					</td>
				</tr>
				<tr>
					<th class="left">제목</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<input type="text" class="it" name="sj" value="<c:out value="${data.sj }" />" title="팝업 제목">
						</div>
					</td>
				</tr>
				<tr>
					<th class="left">게시 기간선택</th>
					<td class="left" colspan="3">
						<div class="gDate1">
							<span class="gIt"><input type="text" class="it date" name="ntceBeginDe" value="<c:out value="${data.ntceBeginDe }" />" title="게시 기간 시작일자" id="dateStartPop" autocomplete='off'></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" class="it date" name="ntceEndDe" value="<c:out value="${data.ntceEndDe }" />" title="게시 기간 종료일자" id="dateEndPop" autocomplete='off'></span>
							<script type="text/javascript">
							$( function() {
								$( "#dateStartPop, #dateEndPop" ).datepicker({
									dateFormat: 'yy-mm-dd'
								});
							} );
							</script>
						</div>
					</td>
				</tr>
				<tr>
					<th class="left" rowspan="3">팝업창 크기</th>
					<td class="left">
						<span class="gr1">가로</span>
						<%-- 
							문의결과 팝업사이즈 고정 - 20.12.28 
							동적으로 재수정 - 21.03.08
							팝업창 내용등록 일때 사이즈 조정가능 - 21.06.29
						<span class="gIt"><input type="text" class="it onlyNumber" name="popupWidthMg" value="300" readonly title="게시기간 : 가로"></span>
						--%>
						<c:choose>
							<c:when test="${!empty data.popupWidthMg}" >
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupWidthMg" value="<c:out value="${data.popupWidthMg }" />" <c:if test="${empty data.cn && !empty data.atchmnflNo}" >readonly</c:if> title="팝업창 크기 : X"></span>
							</c:when>
							<c:otherwise>
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupWidthMg" value="450" title="팝업창 크기 : X"></span>
							</c:otherwise>
						</c:choose>
						<span class="gl1">(pixel)</span>
					</td>
					<th class="left" rowspan="2">팝업창 위치</th>
					<td class="left">
						<span class="gr1">X</span>
						<c:choose>
							<c:when test="${!empty data.popupWidthLc}" >
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupWidthLc" value="<c:out value="${data.popupWidthLc }" />" title="팝업창 위치 : X"></span>
							</c:when>
							<c:otherwise>
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupWidthLc" value="1000" title="팝업창 위치 : X"></span>
							</c:otherwise>
						</c:choose> 
						<span class="gl1">(pixel)</span>
					</td>
				</tr>
				<tr>
					<td class="left" style="border-left: 1px solid #d6d6d6;">
						<span class="gr1">세로</span> 
						<%-- 
							문의결과 팝업사이즈 고정 - 20.12.28 
							동적으로 재수정 - 21.03.08
							팝업창 내용등록 일때 사이즈 조정가능 - 21.06.29
						<span class="gIt"><input type="text" class="it onlyNumber" name="popupVrticlMg" value="200" readonly title="게시기간 : 세로"></span>
						--%>
						<c:choose>
							<c:when test="${!empty data.popupVrticlMg}" >
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupVrticlMg" value="<c:out value="${data.popupVrticlMg }" />" <c:if test="${empty data.cn && !empty data.atchmnflNo}" >readonly</c:if> title="팝업창 크기 : Y"></span>
							</c:when>
							<c:otherwise>
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupVrticlMg" value="600" title="팝업창 크기 : Y"></span>
							</c:otherwise>
						</c:choose>
						<span class="gl1">(pixel)</span>
					</td>
					<td class="left">
						<span class="gr1">Y</span> 
						<c:choose>
							<c:when test="${!empty data.popupVrticlLc}" >
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupVrticlLc" value="<c:out value="${data.popupVrticlLc }" />" title="팝업창 위치 : Y"></span>
							</c:when>
							<c:otherwise>
								<span class="gIt"><input type="text" class="it onlyNumber" name="popupVrticlLc" value="300" title="팝업창 위치 : Y"></span>
							</c:otherwise>
						</c:choose>
						<span class="gl1">(pixel)</span>
					</td>
				</tr>
				<tr>
					<td colspan="3" class="left" style="border-left:1px solid #d6d6d6"><font style="color:#ff5252;font-weight:500;">※팝업창의 크기는 이미지 업로드 시 자동 설정됩니다.(임의 설정도 가능)</font></td>
				</tr>
				<tr>
					<th class="left" rowspan="2">내용</th>
					<td class="left" colspan="3" style="border-left: 1px solid #d6d6d6;"> 
						<div class="gTxt1">
							<div class="mRadio1">
								<input type="radio" id="forBoardRegImage" name="popupType" <c:if test="${!empty data.cn && !empty data.atchmnflNo}" >checked</c:if> title="이미지등록" value="imgType">
								<label for="forBoardRegImage">이미지등록</label>
							</div>
							<div class="mRadio1">
								<input type="radio" id="forBoardRegCn" name="popupType" <c:if test="${empty data.atchmnflNo && !empty data.cn}" >checked</c:if> title="내용" value="cnType">
								<label for="forBoardRegCn">내용등록</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td class="left" colspan="3" style="border-left: 1px solid #d6d6d6;">
						<div class="mFfile1" id="imgType" <c:if test="${empty data.atchmnflNo}" >style="display: none;"</c:if>>
							<div id="">
								<c:if test="${!empty data.atchmnflNo}" >
									<a class="ul" href="<c:url value="/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }&atchmnflSttusCode=${data.atchmnflSttusCode }" />"><c:out value="${data.inputFileNm }" /></a>
								</c:if>
							</div>
							
							<input type="text" id="fileName" class="url" readonly value="<c:out value="${data.fileNm }" />" />
							<input type="hidden" name="atchmnflNo" value="<c:out value="${data.atchmnflNo }" />" />
							<div class="btn">
<%-- 							<a href="<c:url value="/file/downloadFile.do?fileKey=${data.atchmnflNo }_${data.fileSn }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }" />"><c:out value="${data.inputFileNm }" /></a> --%>
								<a href="###" class="mBtn1 file_input_img_btn">파일찾기</a>
								<input type="file" name="atchFile" class="hiddenBtn" onchange="javascript: document.getElementById('fileName').value = this.value" />
							</div>
							<div>
								<c:choose>
									<c:when test="${!empty data.atchmnflNo}" >
										<img id="imgArea" width="600px" height="400px" style="border: 1px solid black;" src="<c:url value="/file/downloadFile.do?fileKey=${data.fileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.atchmnflNo }&atchmnflSttusCode=${data.atchmnflSttusCode }" />" alt="<c:out value="${data.inputFileNm }" />" >
									</c:when>
									<c:otherwise>
										<img id="imgArea" width="300px" height="200px" style="border: 1px solid black; display:none;" src="<c:url value="/static/images/x_attachimg1.png" />" >
									</c:otherwise>
								</c:choose>
							</div>
							<div>
								<span class="gr1">이미지링크</span> 
								<span class="gIt"><input type="text" class="it" style="width:40%;" name="imgLink" value="<c:out value="${data.imgLink }" />" title="이미지링크"></span>
							</div>
						</div>
<%-- 					<div class="gTextarea" id="cnType" <c:if test="${!(empty data.atchmnflNo && !empty data.cn)}" >style="display: none;"</c:if>> --%>
						<div class="gTextarea">
						<textarea class="textarea" name="cn" id="cn" placeholder="내용이 들어갑니다." title="내용" rows="10" style="width:100%;min-width:500px;"></textarea>
<%--   						<script type="text/javascript">
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
							    	var contents = `${data.cn }`; 태그에러 변경 - 21.05.12
							    	oEditors.getById["cn"].exec("PASTE_HTML",[contents]);
							    	oEditors.getById["cn"].exec("SE_FIT_IFRAME", [300]);
							    },
							    fCreator: "createSEditor2"
							});
							</script>	 --%>
						</div>	
					</td>
				</tr>
				<tr>
					<th class="left">팝업사용유무</th>
					<td class="left" colspan="3">
						<div class="mRadio1">
							<input type="radio" id="labelUse" name="useAt" value="Y" title="사용" <c:if test="${data.useAt eq 'Y' }">checked</c:if>>
							<label for="labelUse">사용</label>
						</div>
						<div class="mRadio1">
							<input type="radio" id="labelNoUse" name="useAt" value="N" title="미사용" <c:if test="${data.useAt eq 'N' }">checked</c:if>>
							<label for="labelNoUse">미사용</label>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		</form>
	</div>
	<div class="mButton1 right">
		<a href="javascript:void(0)" onclick="fn_moidfyPopupMngInfo();" class="mBtn1 blue">
			<c:if test="${type eq 'insert'}">등록</c:if>
			<c:if test="${type eq 'update'}">수정</c:if>
		</a>
		<a href="<c:url value="/sysMngr/popup/popup/popupMngList.do"/>" class="mBtn1">목록</a>
	</div>
	
</div>
<!-- //contents -->