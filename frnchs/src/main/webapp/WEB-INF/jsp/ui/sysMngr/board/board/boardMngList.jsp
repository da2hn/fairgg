<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
<!--
input::placeholder {
	color:#969aa0;
}
-->
</style>
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
	});
	init();
});

function init(){
	selectBoardOptions();
	fn_selectBoardMngList(1);
};

function fn_selectBoardMngList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('<c:url value="/sysMngr/selectBoardMngList.ajax"/>',
		$("#searchForm").serializeArrayString()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$(".mBoard1 > table > tbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					if(data.bbsNm != '통합게시판' && data.bbsNm != '안심창업상담'){
						dataTr += '<tr>';
						dataTr += '<td>'+ data.rn +'</td>';
						dataTr += '<td>'+ data.bbsLc +'</td>';
						dataTr += '<td>'+ data.bbsNm +'</td>';
						dataTr += '<td>'+ data.registDt +'</td>';
						dataTr += '<td><span><a href="javascript:void(0)" onclick="fn_updateInfo('+data.masterSn+')" class="mBtn1" style="margin-right: 5%;">수정</a></span>';
						dataTr += '<span><a href="javascript:void(0)" onclick="fn_deleteboardMngInfo('+data.masterSn+')" class="mBtn1">삭제</a></span></td>';
						dataTr += '</tr>';
					}
				})
				$(".mBoard1 > table > tbody").append(dataTr);
			} else {
				$(".mBoard1 > table > tbody").append('<tr><td colspan="5">조회된 게시판정보 없습니다.</td></tr>');
			}
			$(".mPag1").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	})
	
}

/** 게시위치 조회 **/
function selectBoardOptions(){
	fnGetSyncAjaxData("/sysMngr/board/board/selectBoardOptions.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var dataList = _data.dataList;
			var html = "";
				html += '<option value="">전체</option>';
			dataList.forEach(function(data,idx){
				html += '<option value="'+data.menuGroupCode+'">'+data.menuGroupNm+'</option>';
			})
			$("#searchType").append(html);
		} else {
			alert("menu_error:" + _data.resultMsg);
		}
	});
}

function fn_deleteboardMngInfo(masterSn) {
	if(confirm("해당 게시판을 삭제하시겠습니까?")) {
		$.post('<c:url value="/sysMngr/deleteBoardMngList.ajax"/>',{'masterSn':masterSn}
		).done(function(data) {
			alert(data.resultMsg);
			if(data.resultCode == 'success'){
				fn_selectBoardMngList(1);
			}
		})
	}
}
	
function fn_updateInfo(sn) {
	$("#searchForm [name=masterSn]").val(sn);
 	$("#searchForm").attr("action", '<c:url value="/sysMngr/board/board/boardMngInfoUpdate.do"/>');
	$("#searchForm").submit();
} 

</script>
<!-- contents -->
<div class="contents">
	
	<h2 class="mTitle1">게시판 생성관리</h2>
	<div class="mSort1">
		<form id="searchForm" method="post">
		<div class="col">
			<label class="ti" for="dateStart">검색</label>
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="masterSn" value="" />
			<div class="co">
				<span class="gSelect">
					<select title="게시위치" id="searchType" name="searchType" class="select"></select>
				</span>
				<span class="gIt"><input type="text" class="it w1" id="searchText" name="searchText" title="검색어 입력" placeholder="게시판명 입력"></span>
			</div>
		</div>
		</form>
		<a href="javascript:void(0)" onclick="fn_selectBoardMngList()" class="mBtn1 blue">검색</a>
	</div>
	
	<div class="mButton1">
		<span class="gLeft">
			
		</span>
		<span class="gRight">
			<a href="<c:url value="/sysMngr/board/board/boardMngInfoInsert.do" />" class="mBtn1 blue">+ 게시판추가</a>
		</span>
	</div>

	<form id="dataForm" method="post"> 
	<div class="mBoard1 mt2">
		<table summary="번호, 구분, 홍보영상명, 시작일, 종료일, 등록일로 구성된 표입니다.">
		<caption>일별 접속 통계</caption>
		<colgroup>
			<col width="60">
			<col width="250">
			<col width="*">
			<col width="*">
			<col width="300">
		</colgroup>
		<thead>
		<tr class="bgType1">
			<th scope="col">번호</th>
			<th scope="col">게시위치</th>
			<th scope="col">게시판명</th>
			<th scope="col">등록일자</th>
			<th scope="col">기능</th>
		</tr>
		</thead>
		<tbody>
<%-- 			<tr>
				<!-- <td colspan="8">검색을 진행해주세요.</td> -->
				<td>12</td>
				<td>정보지원게시판</td>
				<td>통합게시판</td>
				<td>2021-11-15</td>
				<td>
					<span><a href="<c:url value="/sysMngr/board/board/boardMngInfoUpdate.do" />" class="mBtn1">수정</a></span>
					<span><a href="javascript:void(0)" onclick="fn_deleteboardMngInfo()" class="mBtn1">삭제</a></span>
				</td>
			</tr> --%>
		</tbody>
		</table>
	</div>
	</form>

	<!-- paging -->
	<div class="mPag1">
	</div>
	<!-- //paging -->

</div>
<!-- //contents -->