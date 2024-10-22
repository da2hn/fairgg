<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/WEB-INF/jsp/common/googleChart.jsp" %> <%-- 구글차트 - 21.01.13 --%>
<script>
	$(document).ready(function() {
		fn_qustnList();
		
		$("#searchType").change(function(){
// 			if("A" == this.value){
				
// 			}else if(){
				
// 			}
// 			$("#")
		});
	})
	
	function fn_qustnList(pageIndex){
		var params = {
				  searchType:$("select[name=searchType]").val()
				, searchText:$("#searchText").val()
				, pageIndex:pageIndex||1
		}
		
		fnGetAjaxData("/sysMngr/selectQustnList.ajax", params, function(data) {
			var list = data.dataList;
			var today = new Date();
			var year = today.getFullYear();
		    var month = ("0" + (1 + today.getMonth())).slice(-2);
		    var day = ("0" + today.getDate()).slice(-2);
		    today = year+month+day;
			$(".mPag1").html(data.pagingHtml).trigger("create");
			var tbody =  $(".mBoard1 > table > tbody");
			tbody.empty();
			var tr, td, a;
			var stDe, endDe, thisAt;
			if(list.length == 0){
				tbody.append('<tr><td colspan="8">검색을 진행해주세요.</td></tr>');
				return;
			}
			for(var i=0; i<list.length; i++){
				stDe = list[i].beginDe.replace(/\-/g,'');
				lastDe = list[i].endDe.replace(/\-/g,'');
				thisAt = list[i].progressAt;
				
				if(stDe<= today && today <= lastDe){
					thisAt = 'Y';
				}
				
				tr = $('<tr>');
				
				td = $('<td>');
				td.append(list[i].rn);
				tr.append(td);
				
				td = $('<td>');
				td.append(list[i].qustnrSj);
				tr.append(td);
				
				td = $('<td>');
				td.append(list[i].beginDe+"~"+list[i].endDe);
				tr.append(td);
				
				td = $('<td>');
				a = $('<a href="#">보기</a>');
				a.click(list[i].qustnrSn,function(ret){
					var qustnrSn = ret.data;
					fnSurMngStat(qustnrSn);
					
				});
				td.append(a);
				tr.append(td);
				
				td = $('<td>');
				td.append(list[i].resCnt);
				tr.append(td);
				
				td = $('<td>');
				td.append(thisAt);
				tr.append(td);
				
				td = $('<td>');
				td.append(list[i].registDt);
				tr.append(td);
				
				td = $('<td>');
				a = $('<a href="#" data-cnt="'+list[i].resCnt+'">수정</a>');
				a.click(list[i].qustnrSn,function(ret){
					var resCnt = $(ret.target).data('cnt');
					if(resCnt > 0) {
						alert("참여자가 1명 이상일 경우 수정할 수 없습니다.");
						return false;
					}
					var qustnrSn = ret.data;
					fnSurMngInfo(qustnrSn);
				});
				td.append(a);
				td.append("/");
				a = $('<a href="#">삭제</a>');
				a.click(list[i].qustnrSn,function(ret){
					var qustnrSn = ret.data;
					fnSurMngDel(qustnrSn);
					
				});
				td.append(a);
				tr.append(td);
				
				tbody.append(tr);
			}
		});
	}
	
	function fnSurMngStat(qustnrSn){
		$("#qustnrSn").val(qustnrSn);
		$("#searchForm").attr("action", '<c:url value="/sysMngr/surv/surv/survMngStat.do"/>');
		$("#searchForm").submit();
	}
	
	function fnSurMngInfo(qustnrSn){
		$("#qustnrSn").val(qustnrSn);
		$("#searchForm").attr("action", '<c:url value="/sysMngr/surv/surv/survMngInfo.do"/>');
		$("#searchForm").submit();
	}
	
	function fnSurMngDel(qustnrSn){
		if(confirm("정말로 삭제하시겠습니까?")){
			fnGetAjaxData("/sysMngr/updateQustnDel.ajax", {qustnrSn:qustnrSn}, function(_data){
				if(_data.resultCode == RESULT_SUCCESS){
					fn_qustnList();
				} 
			});
		}
		
	}
</script>

<!-- contents -->
<div class="contents">
	<h2 class="mTitle1">설문 관리</h2>

	<div class="mSort1">
		<form id="searchForm" method="post">
		<input type="hidden" id="qustnrSn" name="qustnrSn" value="" />
		<div class="col">
			<label class="ti" for="dateStart">검색</label>
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="popupNo" value="" />
			<input type="hidden" name="menuCode" value="" />
			
			<div class="co">
				<span class="gSelect">
					<select title="설문제목" id="searchType" name="searchType" class="select">
					<option value="A">설문제목</option>
					<option value="B">등록일자</option>
					<option value="C">설문기간</option>
					<option value="D">진행여부</option>
					<!-- 요청사항 : 설문기간, 등록일자는 숫자로 카운터 - 없어도 검색 가능하도록 조건 선택 -->
					</select>
				</span>
				<span class="gIt">
					<input type="text" class="it w1" id="searchText" name="searchText" title="검색어 입력">
					<select id="pgrsAt" style="display: none;">
						<option value="">선택</option>
						<option value="Y">진행</option>
						<option value="N">중지</option>
					</select>
				</span>
			</div>
		</div>
		</form>
		<a href="javascript:void(0)" onclick="fn_qustnList()" class="mBtn1 blue">검색</a>
	</div>
	
	<div class="mButton1">
		<span class="gLeft">
			
		</span>
		<span class="gRight">
			<a href="<c:url value="/sysMngr/surv/surv/survMngReg.do" />" class="mBtn1 blue">+ 설문생성</a>
		</span>
	</div>

	<form id="dataForm" method="post"> 
	<div class="mBoard1 mt2">
		<table summary="번호, 구분, 홍보영상명, 시작일, 종료일, 등록일로 구성된 표입니다.">
		<caption>설문 관리</caption>
		<colgroup>
			<col width="60">
			<col width="120">
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="*">
			<%-- <col width="*"> --%>
		</colgroup>
		<thead>
		<tr class="bgType1">
			<!-- <th scope="col">
				<span class="mRadio1 noText">
					<input type="checkbox" name="checkbox1" title="전체선택" id="labelCheckboxAll">
					<label for="labelCheckboxAll">전체선택</label>
				</span>
			</th> -->
			<th scope="col">번호</th>
			<th scope="col">설문제목</th>
			<th scope="col">설문기간</th>
			<th scope="col">통계</th>
			<th scope="col">참여자수</th>
			<th scope="col">진행여부</th>
			<th scope="col">등록일자</th>
			<th scope="col">기능</th>
		</tr>
		</thead>
		<tbody>
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