<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value="/static/se2/js/service/HuskyEZCreator.js"/>" charset="utf-8"></script>
<script type="text/javascript" src="<c:url value="/static/js/cmmn/usrUtil.js"/>" charset="utf-8"></script>
<style>
.box {
	margin-left: 10px;
    width: 19%;
    float: left;
    min-width: 175px;
}

#answer {
	text-align: left;
}

.qutInput {
	width: 80%;
	display: inline-block;
    border: 1px solid #c2c2c2;
    background-color: #fff;
    font-size: 14.7px;
    padding: 0 0 0 10px;
    line-height: 30px;
    height: 30px;
}

.answer {
	width: 65%;
    display: inline-block;
    border: 1px solid #c2c2c2;
    background-color: #fff;
    font-size: 14.7px;
    padding: 0 0 0 10px;
    line-height: 30px;
    height: 30px;
}

.delBtn {
	display: inline-block;
    background-color: #4e5562;
    border-radius: 3px;
    color: #fff;
    padding: 0 15px;
    text-align: center;
    height: 30px;
}
</style>
<script>
var thisLength = 0;
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
							anwrList.push({answerSn:_anwrList[j].answerSn,answer:_anwrList[j].answer});
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
				thisLength = qestn.length;
				for(var i=0; i<qestn.length; i++){
					_qusnNo = qestn[i].qustnrQestnSn;
					var anwrList = qestn[i].anwrList;
					tr1 = $('<tr class="qusTr" id="qus_'+(_qusnNo)+'">															'
							 + '	<th class="left">설문 문항-'+(_qusnNo)+'</th>                                                 '
							 + '	<td class="left" colspan="3">                                                           			'
							 + '		<div class="gIt">                                                                   			'
							 + '			<input type="text" class="qutInput" name="qstn" title="설문 문항" value="'+qestn[i].qestn+'">  '
							 + '			<input type="button" class="delBtn" value="X" onclick="qusDelete(this);">					'
							 + '			<a href="#" id="btnAswrAdd" class="mBtn1 blue">답문추가</a></div>								'
							 + '	</td>                                                                                   			'
							 + '</tr>																									');
					$("#question").append(tr1);
					
					tr2 = $('<tr class="ans" id="qus_'+(_qusnNo)+'r"><th class="left">선택 답변-'+(_qusnNo)+'</th><td colspan="3" id="answer">'
						+	'</td></tr>																									 ');
					
					for(var j=0; j<anwrList.length; j++){
						div = '<div class="box anwTr">																					 '
							+ '	<input type="text" class="answer" name="answer" value="'+anwrList[j].answer+'" title="답변 문항">         	 '
							+ '	<input type="button" class="delBtn" value="X" onclick="ansDelete(this);"> 								 '
							+ '</div>																									 ';
						tr2.find("#answer").append(div);						
					}
					
					tr1.find("#btnAswrAdd").click(tr2,function(ret){
						var tr = ret.data;
						if(tr.find(".box").length>=5){
							alert("최대5개까지만 생성 가능합니다.");
						}else{
							var div = '<div class="box anwTr">															'
								+'	<input type="text" class="answer" name="answer" value="" title="답변 문항">         '
								+'	<input type="button" class="delBtn" value="X" onclick="ansDelete(this);"> '
								+'</div>';
							tr.find("td").append(div);	
						}
					});
					$("#question").append(tr2);
				}
				
			}
		}
	})();
	
	$(document).ready(function() {
		fnGetAjaxData("/sysMngr/selectSurvMngInfo.ajax", {qustnrSn:$("#qustnrSn").val()}, function(data){
			qestnData.load(data.qestnList,data.anwrList);
			qestnData.makeTag();
		});
		
	  
	  $("#btnQusnAdd").click(function(){
		  fnQusnAdd();
	  });
	  
	  $("#btnUpd").click(function(){
		  fnUpd();
	  });
	  
	});
	
	function fnUpd(){
		var qustnrSj = $("#qustnrSj").val();
		var qustnrSn = $("#qustnrSn").val();
		var qustnrPurps = $("#qustnrPurps").val();
		var beginDe = $("#beginDe").val().replace(/-/gi, "");
		var endDe = $("#endDe").val().replace(/-/gi, "");
		
		if("" == $.trim(qustnrSj)){
			alert("설문제목을 입력해주세요");
		}else if("" == $.trim(qustnrPurps)){
			alert("설문목적을 입력해주세요");
		}else if("" == $.trim(beginDe) || "" == $.trim(endDe)){
			alert("설문기간을 입력해주세요");
		}else if($(".qusTr").length<1){
			alert("설문을 추가해주세요");
		}else{
			var qstnList = [];
			var errEL;
			var errMsg;
			
			$(".qusTr").each(function(idx){
				var aswrList =[];
				
				if(!errEL && "" == $.trim($("#"+this.id).find(".qutInput").val())){
					errEL = $("#"+this.id).find(".qutInput");
					errMsg = "설문 문항을 입력해주세요";
				}
				
				$("#"+this.id+"r").find(".answer").each(function(idx){
					aswrList.push({
						  answerSn:idx
						, answer:this.value
					});

					if(!errEL && "" == $.trim(this.value)){
						errEL = $(this);
						errMsg = "답변 문항을 입력해주세요";
					}
				});
				qstnList.push({answerSn:idx,qestn:$("#"+this.id).find(".qutInput").val(),aw:aswrList});
				
			});
			
			if(errEL){
				errEL.focus();
				alert(errMsg);
				return;
			}
			
			var param = {
					  qustnrSn:qustnrSn
					, qustnrSj:qustnrSj
					, qustnrPurps:qustnrPurps
					, beginDe:beginDe
					, endDe:endDe
					, json:JSON.stringify({
						list:qstnList
					})	
			}
			
			fnGetAjaxData("/sysMngr/updateQustn.ajax", param, function(_data){
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					location.href= '<c:url value="/sysMngr/surv/surv/survMngList.do" />';
				} else {
					alert(_data.resultMsg);
				}
				
			});
		}
		
	}
	
	var qusnNo=1;
	function fnQusnAdd(){
		if($(".qusTr").length >=100){
			alert("최대100개까지만 생성 가능합니다.");
		}else{
			var tr1,tr2
			tr1 = $('<tr class="qusTr" id="qus_'+(thisLength)+'">																			'
				 + '	<th class="left">설문 문항-'+(thisLength)+'</th>                                                          '
				 + '	<td class="left" colspan="3">                                                           '
				 + '		<div class="gIt">                                                                   '
				 + '			<input type="text" class="qutInput" name="qstn" title="설문 문항">        			'
				 + '			<input type="button" class="delBtn" value="X" onclick="qusDelete(this);">		'
				 + '			<a href="#" id="btnAswrAdd" class="mBtn1 blue">답문추가</a></div>					'
				 + '	</td>                                                                                   '
				 + '</tr>																						');
			
			tr2 = $('<tr class="ans" id="qus_'+(thisLength)+'r"><th class="left">선택 답변-'+(thisLength)+'</th><td colspan="3" id="answer">'
				+	'<div class="box anwTr">																					 '
				+	'	<input type="text" class="answer" name="answer" value="" title="답변 문항">         						 '
				+	'	<input type="button" class="delBtn" value="X" onclick="ansDelete(this);"> 								 '
				+	'</div>																										 '
				+	'<div class="box anwTr">																					 '
				+	'	<input type="text" class="answer" name="answer" value="" title="답변 문항">         						 '
				+	'	<input type="button" class="delBtn" value="X" onclick="ansDelete(this);"> 								 '
				+	'</div>																										 '
				+	'</td></tr>																									 ');
				
			tr1.find("#btnAswrAdd").click(tr2,function(ret){
				var tr = ret.data;
				if(tr.find(".box").length>=5){
					alert("최대5개까지만 생성 가능합니다.");
				}else{
					var div = '<div class="box anwTr">															'
						+'	<input type="text" class="answer" name="answer" value="" title="답변 문항">         '
						+'	<input type="button" class="delBtn" value="X" onclick="ansDelete(this);"> '
						+'</div>';
					tr.find("td").append(div);	
				}
			});
			
			$("#question").append(tr1);
			$("#question").append(tr2);	
			thisLength++;
		}
		
	}
	
// 	//문항 삭제 함수
	function qusDelete(e) {
		//해당 문항의 답변 tr 제거
		$(e.parentElement.parentElement.parentElement).next().remove();
		//해당 문항 tr 제거
		$(e.parentElement.parentElement.parentElement).remove();
	};
	
// 	//답변 삭제 함수
	function ansDelete(e) {
		//해당 문항 tr 제거
		var ansTrCnt = $(e.parentElement.parentElement).children().length;
		if(ansTrCnt<=2){
			alert("최소 2개이상 답변이 필요합니다.");
			return;
		}
		$(e.parentElement).remove();		
	};
	
</script>
<!-- contents -->
<div class="contents">
	
	<!-- breadcrumb -->
	<div class="mBc">
		<span class="h">home</span>
		<span class="t">설문 관리</span>
		<span class="t">설문 생성</span>
	</div>
	<!-- //breadcrumb -->
	
	<h2 class="mTitle1">설문 생성</h2>
	
	<div class="mBoard1 type2">
		<form id="dataForm" method="post" enctype="multipart/form-data">
			<input id="qustnrSn" type="hidden" value="${data.qustnrSn }">
		<table summary="서비스 선택, 게시 기간선택, 팝업창 크기, 팝업창 위치, 내용, 팝업사용유무로 구성된 표입니다.">
			<caption>설문 생성</caption>
			<colgroup>
				<col width="170">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
				<col width="*">
					<col width="*">
			</colgroup>
			<tbody id="question">
				<tr>
					<th class="left">설문 제목</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<input type="text" id="qustnrSj" class="it" name="qustnrSj" value="${qustn.qustnrSj }" title="설문 제목">
						</div>
					</td>
				</tr>
				<tr class="notl1">
					<th class="left">설문목적</th>
					<td class="left" colspan="3">
						<div class="gIt">
							<input type="text" class="it" id="qustnrPurps" name="qustnrPurps" value="${qustn.qustnrPurps }" title="설문목적">
							<!-- <textarea class="textarea" rows="10" placeholder="내용을 입력해주세요." name="cn" id="cn" style="width:100%;min-width:500px;"></textarea> -->
						</div>
					</td>
				</tr>
				
				<tr>
					<th class="left">설문기간</th>
					<td class="left" colspan="3">
						<div class="gDate1">
							<span class="gIt"><input type="text" readonly="readonly" class="it date" id="beginDe" name="beginDe" value="${qustn.beginDe }" title="게시 기간 시작일자"></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" readonly="readonly" class="it date" id="endDe" name="endDe" value="${qustn.endDe }" title="게시 기간 종료일자"></span>
							<script type="text/javascript">
							$( function() {
								$( "#beginDe, #endDe" ).datepicker({
									dateFormat: 'yy-mm-dd'
								});
							} );
							</script>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		</form>
	</div>
	<div class="mButton1 right">
		<a href="#" id="btnQusnAdd" class="mBtn1 blue">설문추가</a>
		<a href="#" id="btnUpd" class="mBtn1 blue">수정</a> <!--등록, 수정  -->
		<a href="<c:url value="/sysMngr/surv/surv/survMngList.do"/>" class="mBtn1">목록</a>
	</div>
	
</div>
<!-- //contents -->