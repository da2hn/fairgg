<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	$(document).ready(function() {
		<%-- 전체선택 버튼 제어 - 20.12.16 --%>
		$("#labelCheckboxAll").on("click", function() {
			if($(this).is(":checked")) {
				$(".mBoard1 > table > tbody").find("input[name=popupNoArray]").prop("checked", true);
			} else {
				$(".mBoard1 > table > tbody").find("input[name=popupNoArray]").prop("checked", false);
			}
		})
		
		$(document).on("click", "input[name=popupNoArray]", function() {
			if ($(".mBoard1 > table > tbody").find("tr").length == $(".mBoard1 > table > tbody").find("input[name=popupNoArray]:checked").length) {
				$("#labelCheckboxAll").prop("checked", true);
			} else {
				$("#labelCheckboxAll").prop("checked", false);
			}
		})
	})
	
	function fn_selectPopupMngList(pageIndex) {
		$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
/* 		console.log($("#searchForm").serialize()); */
		$.post('<c:url value="/sysMngr/selectPopupMngList.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
// 			data = jQuery.parseJSON(data);
			if(data.resultCode == 'success'){
				$(".mBoard1 > table > tbody").empty();
				$("#labelCheckboxAll").prop("checked", false);
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var dataTr = "";
					dataList.forEach(function(data,idx){
/* 						console.log(data); */
						dataTr += '<tr data-popup-no="'+data.popupNo+'" data-menu-code="'+data.menuCode+'">';
						dataTr += '<td><span class="mRadio1 noText"><input type="checkbox" name="popupNoArray" data-popup-no="'+data.popupNo+'" value="'+data.popupNo+'" title="선택" id="labelCheckbox1_'+idx+'"><label for="labelCheckbox1_'+idx+'">선택</label></span>';
						dataTr += '<td>'+(data.rn)+'</td>';
						dataTr += '<td><a href="javascript:void(0);" onclick="fn_popupInfo(this)" class="ul">'+data.sj+'</a></td>';
						dataTr += '<td>'+data.menuNm+'</td>';
						dataTr += '<td>'+(data.useAt == 'Y' ? '사용' : '미사용')+'</td>';
						dataTr += '<td>'+data.ntceBeginDe+'</td>';
						dataTr += '<td>'+data.ntceEndDe+'</td>';
						dataTr += '<td>'+data.registDt+'</td>';
						dataTr += '</tr>';
					})
					$(".mBoard1 > table > tbody").append(dataTr);
				} else {
					$(".mBoard1 > table > tbody").append('<tr><td colspan="8">조회된 팝업정보가 없습니다.</td></tr>');
				}
				
/* 				console.log(data.pagingHtml); */
				$(".mPag1").html(data.pagingHtml).trigger("create");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		})
		
	}
	
	function fn_deletePopupMngInfo() {
		var checkCount = $(".mBoard1 > table > tbody").find("input[name=popupNoArray]:checked").length;
		if(checkCount == 0) {
			alert("삭제할 팝업을 선택해주세요.");
			return false; 
		} else {
			if(confirm(checkCount+"개의 선택된 팝업을 삭제하시겠습니까?")) {
				$.post('<c:url value="/sysMngr/deletePopupMngList.ajax"/>',
					$("#dataForm").serializeArrayString()
				).done(function(data) {
					alert(data.resultMsg);
					if(data.resultCode == 'success'){
						fn_selectPopupMngList(1);
					}
				})
			}
		}
	}
	
	<%-- 요청에 의한 default 공회전 - 21.03.18 --%>
	$(window).ready(function(){
		fn_selectPopupMngList();
	})
	
	function fn_popupInfo(obj) {
		$("#searchForm [name=popupNo]").val($(obj).closest("tr").data("popupNo"));
		$("#searchForm [name=menuCode]").val($(obj).closest("tr").data("menuCode"));
		$("#searchForm").attr("action", '<c:url value="/sysMngr/popop/popup/popupMngInfoUpdate.do"/>');
		$("#searchForm").submit();
	}

</script>
<!-- contents -->
<div class="contents">
	
	<h2 class="mTitle1">팝업창 관리</h2>

	<div class="mSort1">
		<form id="searchForm" method="post">
		<div class="col">
			<label class="ti" for="dateStart">검색</label>
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="popupNo" value="" />
			<input type="hidden" name="menuCode" value="" />
			<div class="co">
				<span class="gSelect">
					<select title="팝업제목" name="searchType" class="select">
					<option value="sj">팝업제목</option>
					<option value="menuNm">서비스명</option>
					</select>
				</span>
				<span class="gIt"><input type="text" class="it w1" id="searchText" name="searchText" title="검색어 입력"></span>
			</div>
		</div>
		</form>
		<a href="javascript:void(0)" onclick="fn_selectPopupMngList()" class="mBtn1 blue">검색</a>
	</div>

	<form id="dataForm" method="post"> 
	<div class="mBoard1 mt2">
		<table summary="번호, 팝업제목, 서비스명, 사용여부, 시작일, 종료일, 등록일로 구성된 표입니다.">
		<caption>일별 접속 통계</caption>
		<colgroup>
			<col width="60">
			<col width="60">
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="*">
		</colgroup>
		<thead>
		<tr class="bgType1">
			<th scope="col">
				<span class="mRadio1 noText">
					<input type="checkbox" name="checkbox1" title="전체선택" id="labelCheckboxAll">
					<label for="labelCheckboxAll">전체선택</label>
				</span>
			</th>
			<th scope="col">번호</th>
			<th scope="col">팝업제목</th>
			<th scope="col">서비스명</th>
			<th scope="col">사용여부</th>
			<th scope="col">시작일</th>
			<th scope="col">종료일</th>
			<th scope="col">등록일</th>
		</tr>
		</thead>
		<tbody>
			<%--
			<tr>
				<td>
					<span class="mRadio1 noText">
						<input type="checkbox" name="checkbox1" title="선택" id="labelCheckbox1_1">
						<label for="labelCheckbox1_1">선택</label>
					</span>
				</td>
				<td>10</td>
				<td class="left"><a href="###" class="ul">시스템 점검</a></td>
				<td>프랜차이즈 현황 조회 서비스</td>
				<td>Y</td>
				<td>2020-08-11</td>
				<td>2020-08-11</td>
				<td>2020-08-11</td>
			</tr>
			--%>
			<tr>
				<td colspan="8">검색을 진행해주세요.</td>
			</tr>
		</tbody>
		</table>
	</div>
	</form>

	<!-- paging -->
	<div class="mPag1">
	</div>
	<!-- //paging -->

	<div class="mButton1">
		<span class="gLeft">
			<a href="javascript:void(0)" onclick="fn_deletePopupMngInfo()" class="mBtn1">삭제</a>
		</span>
		<span class="gRight">
			<a href="<c:url value="/sysMngr/popop/popup/popupMngInfoInsert.do" />" class="mBtn1 blue">팝업등록</a>
		</span>
	</div>

</div>
<!-- //contents -->