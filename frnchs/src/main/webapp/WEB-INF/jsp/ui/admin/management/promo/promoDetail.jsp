<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 프로모션 상세 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
		
	$(document).ready(function(){
		
		
		$(function(){
			$("#startDt, #endDt").datepicker({
				dateFormat: 'yy-mm-dd'
			});
			
			//setDate 설정
			//시작일 오늘날짜
			//종료일 일단 디폴트는 일주일 뒤로 해두겠음
			
			var dt = new Date();
			
			if( !$("#startDt").val() ){
				var startDt = new Date();
				startDt.setDate(dt.getDate());
				$("#startDt").datepicker( "setDate", startDt );
			}
			
			if( !$("#endDt").val() ){
				var endDt = new Date();
				endDt.setDate(dt.getDate() + 7);
				$("#endDt").datepicker( "setDate", endDt );
			}
			
			
		});
		
		
		//파일등록[s]
		var fileTarget = $('.hiddenBtn');
		
		fileTarget.on('change', function(){ // 값이 변경되면
			if(window.FileReader){ // modern browser 
				var filename = $(this)[0].files[0].name; 
			} else { // old IE 
				var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
			} 
			// 추출한 파일명 삽입 
			$("#fileName").val(filename);
			
			//실제로 temp를 저장해야한다
			
			var form = $("#frm_prm")[0];
	
			// FormData 객체 생성
			var formData = new FormData(form);
			
			var url="${contextPath}/file/uploadTempFileAjax.do";
			
			fileAjax(
				url,							//url
				formData,						//data
				function(data){					//callback
					$("input[name='atchFileId']").val( data.fileVo.atchFileId );//submit쪽으로
				}
			);
			
		});
		//파일등록[e]
		
		
		
		$("#saveBtn").off("click").on("click",function(e){
			
			e.preventDefault();//기본이벤트 제거
			
			if( fnValidChk($("#frm_prm")) ){
				
				var form = $("#frm_prm")[0];
	
				// FormData 객체 생성
				var formData = new FormData(form);
				
				var url = "";
				if( location.search ){//상세보기로 들어와서 update해야하는경우
					url="${contextPath}/admin/management/promo/update.do";
				}else{
					url="${contextPath}/admin/management/promo/insert.do";
				}
				
				fileAjax(
					url,							//url
					formData,						//data
					function(data){					//callback
						console.log('data',data);
						//map으로 주면 실패시 빠진 파라미터를 넣어서 줄수도 있고, 성공시 다시 상세페이지로 온다고하면 seq값을 던져줄수도 있고 여러모로 편리
						if( data.resultCode == "fail" ){
							alert("등록실패");
						}else{
							alert("등록성공");
							location.href = "${contextPath}/admin/management/promo/promoList.do";
						}
					}
				);
				
				
			}
			
		
		});//clk[e]
		
		
		$("#backBtn").off("click").on("click",function(e){
			
			e.preventDefault();
			
			location.href = "${contextPath}/admin/management/promo/promoList.do";
			
		});
		
		//숫자만 입력 (파폭 호환)
		$(".onlyNumber").off("keypress").on("keypress",function(e){
			var keyCode = e.which || e.keyCode;
			if( keyCode < 48 || keyCode > 57 ){
				return false;
			}
		});
		
		
	});//doc rdy[e]
	
	</script>

	<div class="contents">
			
			<!-- breadcrumb -->
			<div class="mBc">
				<span class="h">home</span>
				<span class="t">홍보영상 관리</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">홍보영상 관리</h2>
			
			<div class="mBoard1 type2">
			
				<form name="frm_prm" id="frm_prm" action="" method="post" enctype="multipart/form-data">
					<input type="hidden" name="recordId" value="${resultData.recordId }"></input>
			
					<table summary="팝업제목, 서비스명, 게시시간, 팝업창 크기, 내용, 팝업사용유무로 구성된 표입니다.">
					<caption>홍보영상 관리</caption>
					<colgroup>
						<col width="130">
						<col width="40%">
						<col width="130">
						<col width="*">
					</colgroup>
					<tbody>
					<tr class="notl1">
						<th class="left">프랜차이즈</th>
						<td class="left" colspan="3">
							<div class="gIt"><input type="text" class="it" title="팝업제목" placeholder="제목을 입력해주세요." name="promoFcName" value="${resultData.promoFcName }" autocomplete="off"></div>
						</td>
					</tr>
					<tr>
						<th class="left">서비스명</th>
						<td class="left" colspan="3">
							<div class="gSelect1">
								<select class="select" name="promoServiceId" title="서비스명">
									<!-- <option value="">선택해주세요.</option> -->
									<option value="S001">S001</option>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">게시기간</th>
						<td class="left" colspan="3">
							<div class="gDate1">
								<span class="gIt"><input type="text" name="promoStartDate" class="it date" title="접속일시작날짜" id="startDt" autocomplete="off" readonly></span>
								<span class="bar">~</span>
								<span class="gIt"><input type="text" name="promoEndDate" class="it date" title="접속일마지막날짜" id="endDt" autocomplete="off" readonly></span>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">내용</th>
						<td class="left" colspan="3">
							<div class="gTxt1">
								<div class="mRadio1">
									<input type="radio" id="forBoardRegImage" name="boardregimage" checked="checked">
									<label for="forBoardRegImage">파일 등록</label>
								</div>
								<div class="mFfile1">
								
								<input type="text" id="fileName" class="url" readonly="readonly" value="${resultData.promoContentFile}"/><!-- ?? -->
								<input type="hidden" name="atchFileId" id="atchFileId"/>
								<input type="hidden" name="oldAtchFileId" id="oldAtchFileId" value="${resultData.atchFileId}"/>
								
								<%-- <input type="hidden" name="fileSn" id="fileSn" value="${data.fileVo.fileSn}"/> --%>
								
									<div class="btn">
										<a href="javascript:void(0)" class="fileBtn mBtn1">파일찾기</a>
										
										<input type="file" name="atchFile" class="hiddenBtn" />
										<!-- <input type="file" name="file_1" class="hiddenBtn" onchange="javascript: document.getElementById('fileName').value = this.value"/> -->
									</div>
									
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">사용유무</th>
						<td class="left" colspan="3">
						
						
						<div class="mRadio1">
							<input type="radio" id="useYn1" name="useYn" ${resultData.useYn eq 'Y' ? 'checked' : ''  } value="Y">
							<label for="useYn1">Y</label>
							
							<input type="radio" id="useYn2" name="useYn" ${resultData.useYn eq 'N' ? 'checked' : ''  } value="N">
							<label for="useYn2">N</label>
						</div>
						
						</td>
					</tr>
					</tbody>
					</table>
				</form>
			</div>
			
			<div class="mButton1">
				
				<span class="gRight">
					<a href="javascript:void(0)" id="saveBtn" class="mBtn1 blue">저장</a>
					<a href="javascript:void(0)" id="backBtn" class="mBtn1">목록</a>
				</span>
			</div>
			
		</div>
	
	


