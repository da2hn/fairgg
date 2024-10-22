<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 데이터 상세 */
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<script type="text/javaScript" language="javascript" defer="defer">
		
	$(document).ready(function(){
		
		$(function(){
			//입력용 기준연월
			$("#layerDataBaseDate").monthpicker({
				pattern: 'yyyy-mm',
				monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			});
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
		});
		//파일등록[e]
		
		$("#saveBtn").off("click").on("click",function(e){
			
			e.preventDefault();//기본이벤트 제거
			//TODO validation
			
			var form = $("#frm_data")[0];
			console.log("form",form)
			// FormData 객체 생성
			var formData = new FormData(form);
			console.log("formData",formData);
			
			var url="${contextPath}/admin/management/data/insert.do";
			
			
			if( fnValidChk($("#frm_data")) ){
				
				var form = $("#frm_data")[0];
	
				// FormData 객체 생성
				var formData = new FormData(form);
				
				var url = "";
				if( location.search ){//상세보기로 들어와서 update해야하는경우
					url="${contextPath}/admin/management/data/update.do";
				}else{
					url="${contextPath}/admin/management/data/insert.do";
				}
				
				//2. ajax로할거면
				
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
							location.href = "${contextPath}/admin/management/data/dataList.do";
						}
					}
				);
				
				
			}
			
		
		});//clk[e]
		
		
		$("#backBtn").off("click").on("click",function(e){
			
			e.preventDefault();
			
			location.href = "${contextPath}/admin/management/data/dataList.do";
			
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
				<span class="t">데이터 관리</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">데이터 관리</h2>
			
			<form name="frm_data" id="frm_data" action="" method="post" enctype="multipart/form-data">
				<div class="mBoard1 type2">
			
					<input type="hidden" name="recordId" value="${resultData.recordId }"></input>
			
					<table summary="서비스 데이터명, 공간형상 유형, 데이터 기준년월, 제공기관, 파일로 구성된 표입니다.">
					<caption>팝업창 관리</caption>
					<colgroup>
						<col width="130">
						<col width="40%">
						<col width="130">
						<col width="*">
					</colgroup>
					<tbody>
					<tr class="notl1">
						<th class="left">서비스 데이터명</th>
						<td class="left" colspan="3">
							<div class="gIt">
								<input type="text" class="it" title="서비스 데이터명" placeholder="서비스 데이터명을 입력해주세요." name="dataName" value="${resultData.dataName }" autocomplete="off">
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">공간형상 유형</th>
						<td class="left" colspan="3">
							<div class="gSelect1">
								<select class="select" name="dataSpaceType" title="공간형상 유형">
									<!-- <option value="">선택해주세요.</option> -->
									<option value="S001">S001</option>
								</select>
							</div>
						</td>
					</tr>
					<tr>
					<th class="left">데이터 기준년월</th>
					<td class="left" colspan="3">
						<div class="gDate1">
							<span class="gIt">
								<input type="text" name="dataBaseDate" class="it date" title="데이터 기준년월 시작날짜" value="${resultData.dataBaseDate}" id="layerDataBaseDate">
							</span>
						</div>
					</td>
					</tr>
					<tr>
						<th class="left">제공기관</th>
						<td class="left" colspan="3">
							<div class="gIt">
								<input type="text" name="dataProvider" class="it" title="제공기관" value="${resultData.dataProvider}" placeholder="내용이 들어갑니다.">
							</div>
						</td>
					</tr>
					<tr>
						<th class="left">파일</th>
						<td class="left" colspan="3">
							<div class="mFfile1 type2">
									
									<input type="text" id="fileName" class="url" readonly="readonly" value="${resultData.logicFileNm}"/><!-- ?? -->
									<input type="hidden" name="atchFileId" id="atchFileId" value="${resultData.atchFileId}"/>
									<%-- <input type="hidden" name="oldAtchFileId" id="oldAtchFileId" value="${resultData.atchFileId}"/> --%>
									
									<%-- <input type="hidden" name="fileSn" id="fileSn" value="${data.fileVo.fileSn}"/> --%>
									
										<div class="btn">
											<a href="javascript:void(0)" class="fileBtn mBtn1">파일찾기</a>
											
											<input type="file" name="atchFile" class="hiddenBtn" />
											<!-- <input type="file" name="file_1" class="hiddenBtn" onchange="javascript: document.getElementById('fileName').value = this.value"/> -->
										</div>
									</div>
								</td>
							</tr>
						</tbody>
						</table>
					</div>
			</form>
			
			<div class="mButton1">
				
				<span class="gRight">
					<a href="javascript:void(0)" id="saveBtn" class="mBtn1 blue">저장</a>
					<a href="javascript:void(0)" id="backBtn" class="mBtn1">목록</a>
				</span>
			</div>
			
		</div>
	
	


