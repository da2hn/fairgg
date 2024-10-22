<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 팝업 등록, 조회 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<script type="text/javaScript" language="javascript" defer="defer">
		
	$(document).ready(function(){
		
		
		$(function(){
			$("#dateStartPop, #dateEndPop").datepicker();
			
			//setDate 설정
			//시작일 오늘날짜
			//종료일 일단 디폴트는 일주일 뒤로 해두겠음
			
			var dt = new Date();
			
			if( !$("#dateStartPop").val() ){
				var startDt = new Date();
				startDt.setDate(dt.getDate);
				$("#dateStartPop").datepicker( "setDate", startDt );
			}
			
			if( !$("#dateEndPop").val() ){
				var endDt = new Date();
				endDt.setDate(dt.getDate() + 7);
				$("#dateEndPop").datepicker( "setDate", endDt );
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
			
			var form = $("#frm_pop")[0];
	
			// FormData 객체 생성
			var formData = new FormData(form);
			
			
			var url="${contextPath}/file/uploadTempFileAjax.do";
			
			fileAjax(
				url,							//url
				formData,						//data
				function(data){					//callback
					console.log('받는 data',data);
					$("input[name='previewSrc']").val( data.fileVo.atchFileId );//미리보기쪽으로
					$("input[name='atchFileId']").val( data.fileVo.atchFileId );//submit쪽으로
					
					$("#previewImg").attr("src",data.fileVo.webPath).show();//올린이미지 바로 보이도록
				}
			);
			
		});
		//파일등록[e]
		
		
		
		$("#saveBtn").off("click").on("click",function(e){
			
			e.preventDefault();//기본이벤트 제거
			
			
			if( fnValidChk($("#frm_pop")) ){
				
				var form = $("#frm_pop")[0];
	
				// FormData 객체 생성
				var formData = new FormData(form);
				
				var url = "";
				if( location.search ){//상세보기로 들어와서 update해야하는경우
					url="${contextPath}/admin/management/popup/update.do";
				}else{
					url="${contextPath}/admin/management/popup/insert.do";
				}
				
				
				fileAjax(
					url,							//url
					formData,						//data
					function(data){					//callback
						console.log('data',data);
						if( data.resultCode == "fail" ){
							alert("등록실패");
						}else{
							alert("등록성공");
							
							location.href = "${contextPath}/admin/management/popup/popList.do";
						}
					}
				);
				
			}
		
		});//clk[e]
		
		$("#backBtn").off("click").on("click",function(e){
			e.preventDefault();
			location.href = "${contextPath}/admin/management/popup/popList.do";
		});
		
		$("#previewBtn").off("click").on("click",function(e){
			
			e.preventDefault();
			
			if( !$("#previewSrc").val() ){
				alert("먼저 팝업 이미지 정보를 등록해야합니다.");
				return;
			}
			
			var option = "";
			option += "width=" + $("input[name='popupWidth']").val();
			option += ",height=" + $("input[name='popupHight']").val();
			option += ",left=" + Number( ($("input[name='popupX']").filter(":checked").val()-1) * (window.screen.width / 3) );
			option += ",top=" + Number( ($("input[name='popupY']").filter(":checked").val()-1) * (window.screen.height / 3));
			
			console.log("팝업옵션",option);
			
			var pop_title = "popupOpener" ;
			window.open("", pop_title,option) ;
			
			var frmData = document.frm_pre ;
			frmData.target = pop_title ;
			frmData.action = "${contextPath}/admin/management/popup/popPreview.do" ;
			frmData.submit() ;
			
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
				<span class="t">팝업관리</span>
				<span class="t">팝업창 관리</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">팝업창 관리</h2>
			
			<div class="mBoard1 type2">
			<form name="frm_pre" id="frm_pre" action="" method="post">
				<input type="hidden" name="previewSrc" id="previewSrc" value="${resultData.atchFileId}"/>
			</form>
			
				<form name="frm_pop" id="frm_pop" action="" method="post" enctype="multipart/form-data">
					<input type="hidden" name="recordId" value="${resultData.recordId }"></input>
			
					<table summary="팝업제목, 서비스명, 게시시간, 팝업창 크기, 내용, 팝업사용유무로 구성된 표입니다.">
					<caption>팝업창 관리</caption>
					<colgroup>
						<col width="130">
						<col width="40%">
						<col width="130">
						<col width="*">
					</colgroup>
					<tbody>
					<tr class="notl1">
						<th class="left">팝업제목</th>
						<td class="left" colspan="3">
							<div class="gIt"><input type="text" class="it" title="팝업제목" placeholder="제목을 입력해주세요." name="popupTitle" value="${resultData.popupTitle }" autocomplete="off"></div>
						</td>
					</tr>
					<tr>
						<th class="left">서비스명</th>
						<td class="left" colspan="3">
							<div class="gSelect1">
								<select class="select" name="popupServiceId" title="서비스명">
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
								<span class="gIt"><input type="text" name="popupStartDate" class="it date" title="게시기간 시작일" id="dateStartPop" autocomplete="off" readonly></span>
								<span class="bar">~</span>
								<span class="gIt"><input type="text" name="popupEndDate" class="it date" title="게시기간 종료일" id="dateEndPop" autocomplete="off" readonly></span>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left" rowspan="2">팝업창 크기</th>
						<td class="left">
							<span class="gr1">가로</span> 
							<span class="gIt"><input type="text" name="popupWidth" maxlength="4" class="onlyNumber it" title="팝업창 크기 : 가로" autocomplete="off" value="${resultData.popupWidth}"></span>
							<span class="gl1">(pixel)</span>
						</td>
						<th class="left" rowspan="2">팝업창 위치</th>
						<td class="left">
							
							<div class="mRadio1">
								<input type="radio" id="popupX1" name="popupX" title="팝업창 위치(x)" ${resultData.popupX eq '1' ? 'checked' : ''  } value="1">
								<label for="popupX1">왼쪽</label>
								
								<input type="radio" id="popupX2" name="popupX" title="팝업창 위치(x)" ${resultData.popupX eq '2' ? 'checked' : ''  } value="2">
								<label for="popupX2">가운데</label>
								
								<input type="radio" id="popupX3" name="popupX" title="팝업창 위치(x)" ${resultData.popupX eq '3' ? 'checked' : ''  } value="3">
								<label for="popupX3">오른쪽</label>
							</div>
								
						</td>
					</tr>
					<tr>
						<td class="left">
							<span class="gr1">세로</span> 
							<span class="gIt"><input type="text" name="popupHight" maxlength="4" class="onlyNumber it" title="팝업창 크기 : 세로" autocomplete="off" value="${resultData.popupHight}"></span>
							<span class="gl1">(pixel)</span>
						</td>
						<td class="left">
							<div class="mRadio1">
								<input type="radio" id="popupY1" name="popupY" title="팝업창 위치(y)" ${resultData.popupY eq '1' ? 'checked' : ''  } value="1">
								<label for="popupY1">위쪽</label>
								
								<input type="radio" id="popupY2" name="popupY" title="팝업창 위치(y)" ${resultData.popupY eq '2' ? 'checked' : ''  } value="2">
								<label for="popupY2">가운데</label>
								
								<input type="radio" id="popupY3" name="popupY" title="팝업창 위치(y)" ${resultData.popupY eq '3' ? 'checked' : ''  } value="3">
								<label for="popupY3">아래쪽</label>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left" rowspan="2">내용</th>
						<td class="left" colspan="3">
							<div class="gTxt1">
								<div class="mRadio1">
									<input type="radio" id="forBoardRegImage" name="boardregimage" checked="checked">
									<label for="forBoardRegImage">이미지등록</label>
								</div>
								<div class="mFfile1">
								
								<input type="text" id="fileName" class="url" readonly="readonly" title="파일명" value="${resultData.popupContentFile}"/>
								<input type="hidden" name="atchFileId" id="atchFileId"/>
								<input type="hidden" name="oldAtchFileId" id="oldAtchFileId" value="${resultData.atchFileId}"/>
								
								<div class="btn">
									<a href="javascript:void(0)" class="fileBtn mBtn1">파일찾기</a>
									
									<input type="file" name="atchFile" class="hiddenBtn" />
								</div>
									
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="left" colspan="3">
							<div class="gTextarea">
								<img id="previewImg" alt="미리보기 이미지입니다." src="${fileVo.filePath }" 
									style="width:auto;height:auto;max-width:420px;max-height:300px;display:${empty fileVo.filePath ? 'none' : ''}"></img>
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">팝업사용유무</th>
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
				
				<span class="gLeft">
					<a href="javascript:void(0)" id="previewBtn" class="mBtn1 previewBtn">미리보기</a>
				</span>
				
				<span class="gRight">
					<a href="javascript:void(0)" id="saveBtn" class="mBtn1 blue">저장</a>
					<a href="javascript:void(0)" id="backBtn" class="mBtn1">목록</a>
				</span>
			</div>
			
		</div>
	
	


