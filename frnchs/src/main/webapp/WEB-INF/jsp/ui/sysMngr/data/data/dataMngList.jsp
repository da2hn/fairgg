<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	<%-- 요청에 의한 default 공회전 - 21.03.18 --%>
	$(window).ready(function(){
		fn_selectDataMngList();
	})
	
	function fn_selectDataMngList(pageIndex) {
		$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
/* 		console.log($("#searchForm").serialize()); */
		$.post('<c:url value="/sysMngr/selectDataMngList.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
	//			data = jQuery.parseJSON(data);
			if(data.resultCode == 'success'){
				$(".mBoard1 > table > tbody").empty();
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var dataTr = "";
					dataList.forEach(function(data,idx){
		/* 				console.log(data); */
						dataTr += '<tr>';
						dataTr += '<td>'+data.rn+'</td>';
						dataTr += '<td>'+data.dataStdrYear+'</td>';
						dataTr += '<td>'+data.sj+'</a></td>';
						dataTr += '<td><a class="ul" href="/file/downloadFile.do?fileKey='+data.fileKey+'&fileSn='+data.fileSn+'&atchmnflNo='+data.atchmnflNo+'" alt="'+data.inputFileNm+'" >'+data.inputFileNm+'</a></td>';
						dataTr += '<td>'+data.registDt+'</td>';
						dataTr += '</tr>';
					})
					$(".mBoard1 > table > tbody").append(dataTr);
				} else {
					$(".mBoard1 > table > tbody").append('<tr><td colspan="5">조회된 데이터가 없습니다.</td></tr>');
				}
				
/* 				console.log(data.pagingHtml); */
				$(".mPag1").html(data.pagingHtml).trigger("create");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		})
		
	}
	
	function fn_moidfyDataMngInfo() {
		if(!$("input[name=sj]").val()) {
			alert("제목을 입력해주세요.");
			$("input[name=sj]").focus();
			return false;
		}
		
		if(!$("select[name=dataStdrYear]").val()) {
			alert("기준년을 선택해주세요.");
			$("select[name=dataStdrYear]").focus();
			return false;
		}
		
		if(!$("input[name=atchFile]").val()) {
			alert("업로드 파일을 입력해주세요.");
			$("input[name=atchFile]").focus();
			return false;
		}
		
		$("#dataForm").ajaxForm({
			url: '<c:url value="/sysMngr/moidfyDataMngInfo.ajax" />',
			dataType:"json",
			async: "false",
			beforeSend:function(){
			},
			success : function(data, status, request) {
				alert(data.resultMsg);
				if(data.resultCode == RESULT_SUCCESS) {
					$("#jsDRegister").hide();
					$("#jsDRegister").find("input,select").val("");
					fn_selectDataMngList();
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
			<span class="t">데이터 관리</span>
		</div>
		<!-- //breadcrumb -->
		
		<h2 class="mTitle1">데이터 관리</h2>
	
		<div class="mSort1">
			<form id="searchForm" method="post">
			<div class="col">
				<label class="ti" for="dateStart">조회기간</label>
				<input type="hidden" name="pageIndex" value="" />
				<div class="co">
					<span class="gIt"><input type="text" class="it date" title="등록일 시작일자" name="dateStart" id="dateStart"></span>
					<span class="bar">~</span>
					<span class="gIt"><input type="text" class="it date" title="등록일 마지막날짜" name="dateEnd" id="dateEnd"></span>
					<script type="text/javascript">
					$( function() {
						$( "#dateStart, #dateEnd" ).datepicker({
							dateFormat: 'yy-mm-dd'
						});
					} );
					</script>
				</div>
			</div>
			</form>
			<a href="javascript:void(0);" onclick="fn_selectDataMngList();" class="mBtn1 blue">검색</a>
		</div>
		
		<h3 class="mTitle2">데이터 목록</h3>
		<div class="mBoard1">
			<table summary="기준년, 제목, 파일명, 등록일으로 구성된 표입니다.">
			<caption>데이터 관리</caption>
			<colgroup>
				<col width="60">
				<col span="3" width="24%">
				<col width="*">
			</colgroup>
			<thead>
				<tr class="bgType1">
					<th scope="col">번호</th>
					<th scope="col">기준년</th>
					<th scope="col">제목</th>
					<th scope="col">파일명</th>
					<th scope="col">등록일</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="5">조회를 진행해주세요.</td>
				</tr>
				<%-- 
				<tr>
					<td>
						<span class="mRadio1 noText">
							<input type="checkbox" name="checkbox1" title="선택" id="labelCheckbox1_1">
							<label for="labelCheckbox1_1">선택</label>
						</span>
					</td>
					<td>2020.08</td>
					<td>가맹정보 데이터</td>
					<td>놀부부대찌개</td>
					<td><a href="###" class="ul">정보공개서_202008.csv</a></td>
				</tr>
				--%>
			</tbody>
			</table>
		</div>

		<!-- paging -->
		<div class="mPag1">
			<%-- 
			<a href="###" class="first">처음으로</a>
			<a href="###" class="prev">이전</a>
			<a href="###">1</a>
			<a href="###" class="selected">2</a>
			<a href="###">3</a>
			<a href="###">4</a>
			<a href="###">5</a>
			<a href="###" class="next">다음</a>
			<a href="###" class="last">마지막으로</a>
			--%>
		</div>
		<!-- //paging -->

		<div class="mButton1 right">
			<a href="#jsDRegister" class="mBtn1 blue jsBtnShow1">등록</a>
<!-- 			<a href="###" class="mBtn1">수정</a> -->
<!-- 			<a href="###" class="mBtn1">삭제</a> -->
		</div>

	</div>
	<!-- //contents -->

<!-- layer -->
<div id="jsDRegister" class="lDReg" style="display: none;">
	<div class="layerBg">
		<div class="title">
			<h4>데이터 등록</h4>
		</div>
		<div class="con">
			<div class="mBoard1 type2">
				<form id="dataForm" method="post" enctype="multipart/form-data">
				<table summary="서비스 데이터명, 공간형상 유형, 데이터 기준년월, 제공기관, 파일로 구성된 표입니다.">
				<caption>팝업창 관리</caption>
				<colgroup>
					<col width="160">
					<col width="*">
				</colgroup>
				<tbody>
				<tr class="notl1">
					<th class="left">제목</th>
					<td class="left" colspan="3">
						<div class="gIt"><input type="text" name="sj" class="it" title="제목" placeholder="제목을 입력해주세요."></div>
					</td>
				</tr>
				<%-- 
				<tr class="notl1">
					<th class="left">서비스 데이터명</th>
					<td class="left" colspan="3">
						<div class="gIt"><input type="text" class="it" title="서비스 데이터명" placeholder="내용이 들어갑니다."></div>
					</td>
				</tr>
				<tr>
					<th class="left">공간형상 유형</th>
					<td class="left" colspan="3">
						<div class="gSelect1">
							<select class="select" title="공간형상 유형">
								<option>행정동</option>
							</select>
						</div>
					</td>
				</tr>
				--%>
				<tr>
					<th class="left">데이터 기준년</th>
					<td class="left" colspan="3">
						<div class="gSelect1">
							<select name="dataStdrYear" class="select" title="데이터 기준년">
								<option value="">선택하세요</option>
								<c:forEach var="i" begin="0" step="1" end="7">
									<option value="${sysStdrYear-i }">${sysStdrYear-i }년</option>
								</c:forEach>
							</select>
						</div>
						<%-- 
						<div class="gDate1">
							<span class="gIt"><input type="text" class="it date" title="데이터 기준년월 시작날짜" id="dateStartPop"></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" class="it date" title="데이터 기준년월 마지막날짜" id="dateEndPop"></span>
							<script type="text/javascript">
							$( function() {
								$( "#dateStartPop, #dateEndPop" ).datepicker({
									dateFormat: 'yy-mm-dd'
								});
							} );
							</script>
						</div>
						--%>
					</td>
				</tr>
				<tr>
					<th class="left">파일</th>
					<td class="left" colspan="3">
						<div class="mFfile1 type2">
							<input type="text" id="fileName" class="url" readonly value="">
							<div class="btn">
								<a href="###" class="mBtn1 file_input_img_btn">파일선택</a>
								<input type="file" name="atchFile" class="hiddenBtn" onchange="javascript: document.getElementById('fileName').value = this.value" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
							</div>
							
						</div>
					</td>
				</tr>
				</tbody>
				</table>
				</form>
			</div>
			<div class="mButton1 right">
				<a href="javascript:void(0);" onclick="fn_moidfyDataMngInfo();" class="mBtn1 blue">등록</a>
<!-- 				<a href="###" class="mBtn1">수정</a> -->
			</div>
		</div>
		<a href="#jsDRegister" class="close jsBtnClose1">닫기</a>
	</div>
</div>
<!-- //layer -->