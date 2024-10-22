<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
<style>
.box {
	float: left;
}
</style>
<script>
	var qestnData = (function(){
		var qestn = [];
		var _qusnNo=0;
		return {
			load:function(_qestnList, _anwrList){
				qestn = [];
				for(var i=0; i<_qestnList.length; i++){
					var anwrList = [];
					for(var j=0; j<_anwrList.length; j++){
						if(_qestnList[i].qustnrSn==_anwrList[j].qustnrSn&&_qestnList[i].qustnrQestnSn==_anwrList[j].qustnrQestnSn){
							anwrList.push({answerSn:_anwrList[j].answerSn,answer:_anwrList[j].answer,cnt:_anwrList[j].cnt,per:_anwrList[j].per});
						}
					}
					qestn.push({
						  qustnrSn:_qestnList[i].qustnrSn
						, qustnrQestnSn:_qestnList[i].qustnrQestnSn
						, qestn:_qestnList[i].qestn
						, anwrList:anwrList
					});
				}
			},
			updList:function(){
				
			},
			makeTag:function(){
				var tr1,tr2,div;
				$(".qusTr").remove();
				for(var i=0; i<qestn.length; i++){
					_qusnNo = qestn[i].qustnrQestnSn;
					var anwrList = qestn[i].anwrList;
					tr1 = $('<tr class="qusTr" id="qus_'+i+'">      '
							 + '	<th>'+(i+1)+'</th>                  '
							 + '	<th>'+qestn[i].qestn+'</th>             '
							 + '</tr>										');
					$("#survTbl").append(tr1);
					
					
					for(var j=0; j<anwrList.length; j++){
						tr2 = $('<tr class="qusTr">'
							+	'	<td class="left">'+anwrList[j].answer+'</td>'
							+	'	<td class="left" colspan="3">'
							+	'		<span>'
							+	'			<progress value="'+anwrList[j].per+'" max="100">'
							+	'				<strong>'+anwrList[j].per+'%</strong>'
							+	'			</progress>'
							+	'			'+anwrList[j].per+'%('+anwrList[j].cnt+'명)'
							+	'		</span>'
							+	'	</td>'
							+   '</tr>');
						$("#survTbl").append(tr2);						
					}
				}
				
			}
		}
	})();

	$(document).ready(function() {
		fn_search();
	});
	
	function fn_search(){
		fnGetAjaxData("/sysMngr/selectSurvMngStat.ajax", {qustnrSn:$("#qustnrSn").val(), searchType:$("#searchType").val()}, function(data){
			qestnData.load(data.qestnList,data.anwrList);
			qestnData.makeTag();
		});
	}
</script>
<!-- contents -->
<div class="contents">
	
	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">설문 관리</span>
		<span class="t">설문 통계</span>
	</div>
	<!-- //breadcrumb -->
	
	<h2 class="mTitle1">설문 통계</h2>
	
	<div class="mSort1" style="display:none">
		<form id="searchForm" method="post">
		<div class="col">
			<label class="ti" for="dateStart">권한</label>
			<input type="hidden" name="qustnrSn" id="qustnrSn" value="${qustnrSn}" />
			<div class="co">
				<span class="gSelect">
					<select title="권한" name="searchType" id="searchType" class="select">
						<option value="">전체</option>
						<c:forEach var="code" items="${userSeCodeList }">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm }" /></option>
						</c:forEach>
					</select>
				</span>
<!-- 				<span class="gIt"><input type="text" class="it w1" id="searchText" name="searchText" title="검색어 입력"></span> -->
			</div>
		</div>
		</form>
		<a href="javascript:void(0)" onclick="fn_search()" class="mBtn1 blue">검색</a>
	</div>
	
	<div class="mBoard1 type2">
		<form id="dataForm" method="post" enctype="multipart/form-data">
		<table summary="서비스 선택, 게시 기간선택, 팝업창 크기, 팝업창 위치, 내용, 팝업사용유무로 구성된 표입니다.">
			<caption>설문 생성</caption>
			<colgroup>
				<col width="170">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
			</colgroup>
			<tbody id="survTbl">
				<tr>
					<th class="left" style="background-color: #d58c1e; color: #ffffff;">NO</th>
					<th style="background-color: #d58c1e; color: #ffffff;">설문제목</th>
				</tr>
			</tbody>
		</table>
		</form>
	</div>
	<div class="mButton1 right">
		<a href="<c:url value="/sysMngr/surv/surv/survMngList.do"/>" class="mBtn1">목록</a>
	</div>
	
</div>
<!-- //contents -->