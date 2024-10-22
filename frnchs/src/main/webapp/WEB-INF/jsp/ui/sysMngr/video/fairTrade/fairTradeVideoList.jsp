<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
	$(document).ready(function() {
		//전체선택 버튼 제어 - 20.12.16
		$("#labelCheckboxAll").on("click", function() {
			if($(this).is(":checked")) {
				$(".mBoard1 > table > tbody").find("input[name=fairTradeSnArray]").prop("checked", true);
			} else {
				$(".mBoard1 > table > tbody").find("input[name=fairTradeSnArray]").prop("checked", false);
			}
		})
		
		$(document).on("click", "input[name=fairTradeSnArray]", function() {
			if ($(".mBoard1 > table > tbody").find("tr").length == $(".mBoard1 > table > tbody").find("input[name=fairTradeSnArray]:checked").length) {
				$("#labelCheckboxAll").prop("checked", true);
			} else {
				$("#labelCheckboxAll").prop("checked", false);
			}
		})
	})
	
	function fn_selectFairTradeVideoList(pageIndex) {
		$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
		$.post('<c:url value="/sysMngr/selectFairTradeVideList.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
			if(data.resultCode == 'success'){
				$(".mBoard1 > table > tbody").empty();
				$("#labelCheckboxAll").prop("checked", false);
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var dataTr = "";
					dataList.forEach(function(data,idx){
						dataTr += '<tr data-sn="'+data.fairTradeSn+'">';
						dataTr += '<td><span class="mRadio1 noText"><input type="checkbox" name="fairTradeSnArray" data-fairTrade-sn="'+data.fairTradeSn+'" value="'+data.fairTradeSn+'" title="선택" id="labelCheckbox1_'+idx+'"><label for="labelCheckbox1_'+idx+'">선택</label></span>';
// 						dataTr += '<td>'+(data.fairTradeSn)+'</td>';
						dataTr += '<td>'+(dataList.length - idx)+'</td>';
						dataTr += '<td>'+data.fairTradeSeCodeNm+'</td>';
						dataTr += '<td><a href="javascript:void(0);" onclick="fn_FairTradeVideoInfo(this)" class="ul">'+data.sj+'</a></td>';
						dataTr += '<td>'+data.pstSrtDt+'</td>';
						dataTr += '<td>'+data.pstAndDt+'</td>';
						dataTr += '<td>'+data.registDt+'</td>';
						dataTr += '</tr>';
					})
					$(".mBoard1 > table > tbody").append(dataTr);
				} else {
					$(".mBoard1 > table > tbody").append('<tr><td colspan="8">조회된 공정거래 홍보관 영상 정보가 없습니다.</td></tr>');
				}
				
				$(".mPag1").html(data.pagingHtml).trigger("create");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		})
		
	}
	
	function fn_deleteFairTradeVideoInfo() {
		var checkCount = $(".mBoard1 > table > tbody").find("input[name=fairTradeSnArray]:checked").length;
		if(checkCount == 0) {
			alert("삭제할 공정거래 홍보관 영상을 선택해주세요.");
			return false; 
		} else {
			if(confirm(checkCount+"개의 선택된 공정거래 홍보관 영상을 삭제하시겠습니까?")) {
				$.post('<c:url value="/sysMngr/deleteFairTradeVideList.ajax"/>',
					$("#dataForm").serializeArrayString()
				).done(function(data) {
					alert(data.resultMsg);
					if(data.resultCode == 'success'){
						fn_selectFairTradeVideoList(1);
					}
				})
			}
		}
	}
	
	//요청에 의한 default 공회전 - 21.03.18 
	$(window).ready(function(){
		fn_selectFairTradeVideoList();
	})
	
	function fn_FairTradeVideoInfo(obj) {
		$("#searchForm [name=fairTradeSn]").val($(obj).closest("tr").data("sn"));
		$("#searchForm").attr("action", '<c:url value="/sysMngr/video/fairTrade/fairTradeVideoInfoUpdate.do" />');
		$("#searchForm").submit();
	}
</script>

<!-- contents -->
<div class="contents">
	<h2 class="mTitle1">공정거래홍보관 영상 관리</h2>

	<div class="mSort1">
		<form id="searchForm" method="post">
		<div class="col">
			<label class="ti" for="dateStart">검색</label>
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="fairTradeSn" value="" />
			<div class="co">
				<span class="gSelect">
					<select title="교육영상" name="fairTradeSeCode" class="select">
						<option value="">선택</option>
				<!-- 	<option value="FT01">교육영상</option>
					<option value="FT02">홍보영상</option>
					<option value="FT03">일반영상</option> -->
						<c:forEach var="code" items="${codeList}">
							<option value="${code.codeValue }">${code.codeValueNm }</option>
						</c:forEach>
					</select>
				</span>
				<span class="gIt"><input type="text" class="it w1" id="schTxt" name="schTxt" title="검색어 입력"></span>
			</div>
		</div>
		</form>
		<a href="javascript:void(0)" onclick="fn_selectFairTradeVideoList()" class="mBtn1 blue">검색</a>
	</div>
	
	<div class="mButton1">
		<span class="gLeft">
			
		</span>
		<span class="gRight">
			<a href="javascript:void(0)" onclick="fn_deleteFairTradeVideoInfo()" class="mBtn1">삭제</a>
			<a href="<c:url value="/sysMngr/video/fairTrade/fairTradeVideoInfoInsert.do" />" class="mBtn1 blue">동영상등록</a>
		</span>
	</div>

	<form id="dataForm" method="post"> 
	<div class="mBoard1 mt2">
		<table summary="번호, 구분, 홍보영상명, 시작일, 종료일, 등록일로 구성된 표입니다.">
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
			<th scope="col">구분</th>
			<th scope="col">홍보영상명</th>
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

</div>
<!-- //contents -->