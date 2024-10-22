<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 데이터 목록 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
	
	$(function(){
		$("#startDt, #endDt").monthpicker({
			pattern: 'yyyy-mm',
			monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		});
	});

	//목록 조립
	function drawTable(data,area){
		
		console.log('data',data);
		data = data.resultData || data;
		var tmpHtml = [];
		
		if( data.length < 1 ){
			
			tmpHtml.push('<tr><td colspan="6">데이터 없음</td></tr>');
			
		}else{
			data.forEach(function(row,idx){
				tmpHtml.push('<tr>');
				tmpHtml.push('	<td>');
				//chkbox
				tmpHtml.push('		<span class="mRadio1 noText">');
				tmpHtml.push('			<input type="checkbox" name="delArr" title="선택" id="labelCheckbox1_'+Number(idx+1)+'" value="'+row.recordId+'">');
				tmpHtml.push('			<label for="labelCheckbox1_'+Number(idx+1)+'">선택</label>');
				tmpHtml.push('		</span>');
				
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.dataBaseDate);//기준연월
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td class="left">');
				tmpHtml.push('		<a href="javascript:void(0)" id="'+row.recordId+'" class="ul detailBtn">'+row.dataName+'</a>');
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.dataSpaceType);//공간형상유형
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.dataProvider);//원천제공기관
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td class="left">');
				tmpHtml.push('		<a href="javascript:void(0)" id="'+row.atchFileId+'" class="ul downloadBtn">'+row.logicFileNm+'</a>');//파일명
				tmpHtml.push('			<input type="hidden" name="fileSn" id="fileSn_' + row.atchFileId + '" value="' + row.fileSn + '">');
				tmpHtml.push('			<input type="hidden" name="fileKey" id="fileKey_' + row.atchFileId + '" value="' + row.fileKey + '">');
				tmpHtml.push('	</td>');
				
				tmpHtml.push('</tr>');
				
			});
		}
		
		$(area).html( tmpHtml.join("") );
		
		//조립 후 btn evt : 상세페이지로 이동
		$(".detailBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			location.href ="${contextPath}/admin/management/data/dataDetail.do?recordId="+$(this).attr("id");
		});

		//파일다운로드[s]
		$(".downloadBtn").off("click").on("click",function(e){
			var atchFileId = $(this).attr("id");
			
			var fileKeySelector = '#fileKey_' + atchFileId;
			var fileKey = $(fileKeySelector).val();

			var fileSnSelector = '#fileSn_' + atchFileId;
			var fileSn = $(fileSnSelector).val();

			var url="${contextPath}/file/downloadFile.do?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "&fileKey=" + encodeURIComponent(fileKey);
 			
 			console.dir(url);

 			window.location = url;
			
		});
		//파일다운로드[e]
		
	}
	
	$(document).ready(function(){
		
		//pager[s]
		pager = new jsPager();
		
		var data ={};
		cmAjax(
			"${contextPath}/admin/management/data/searchAjax.do",				//url
			data,																//data
			function(result){													//callback
				console.log("result",result);
				pager.init(
						result.resultData.length == 0 ? 0 : parseInt(result.resultData[0].totalCount),	//total
						data,													//검색파라미터
						$('.pagination'),										//페이징 들어갈부분
						$('#ajaxArea'),											//그려질부분
						$('#boardListInfo'),									//정보요약부분
						"${contextPath}/admin/management/data/searchAjax.do",	//url
						drawTable												//callback
				);
				
				drawTable(result,$("#ajaxArea"));
				
			}
		);
		//pager[e]
		
		
		//검색 
		$("#searchBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			var data2 ={};
			data2['startDt']=$("#startDt").val() ? $("#startDt").val() + "-1" : "";
			data2['endDt']=$("#endDt").val() ? $("#endDt").val() + "-30" : "";
			
			cmAjax(
				"${contextPath}/admin/management/data/searchAjax.do",				//url
				data2,																//data
				function(result){													//callback
					console.dir(result);
					var totalCount = 0;
					if (result.resultData != null && result.resultData.length != 0) {
						totalCount = result.resultData[0].totalCount;
					}
					
					pager.init(
							totalCount,				//total
							data2,													//검색파라미터
							$('.pagination'),										//페이징 들어갈부분
							$('#ajaxArea'),											//그려질부분
							$('#boardListInfo'),									//정보요약부분
							"${contextPath}/admin/management/data/searchAjax.do",	//url
							drawTable						//callback
					);
					
					drawTable(result,$("#ajaxArea"));
				}
			);
			
		});
		
		$("#resetBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			$("#startDt,#endDt").val("");
			$("#searchBtn").click();
		});
		
		//등록 페이지 이동
		$("#regBtn").off("click").on("click",function(e){
			e.preventDefault();
			location.href = "${contextPath}/admin/management/data/dataDetail.do";
		})

		
		
		//삭제 ctrl
		$("#delBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			if( $("input[name='delArr']").filter(":checked").length < 1 ){
				alert("삭제대상이 선택되지 않았습니다.");
				return;
			}
			
			var data = [];
			
			$("input[name='delArr']:checked").each(function(idx){
				data.push( $(this).val() );
			});
			console.log({"arrRecordId":data});
			
			cmAjax(
					"${contextPath}/admin/management/data/delete.do",		//url
					{"arrRecordId":data},									//data
					function(result){										//callback
						console.log("result",result);
						if( result.resultCode == "success" ){
							alert("삭제성공!");
							location.href = "${contextPath}/admin/management/data/dataList.do";
						}else{
							alert("삭제실패!");
						}
					}
			);
		})//btn[e]
		
	});
	
	</script>
	<!-- content[s] -->
	<div class="contents">

	<h2 class="mTitle1">데이터 관리</h2>

	<form name="frm_search" method="post" action="">
			
		<div class="mSort1">
			<div class="col">
				<label class="ti" for="dateStart">조회기간</label>
				<div class="co">
					<div class="gDate1">
							<span class="gIt"><input type="text" name="startDt" class="it date" title="접속일시작날짜" id="startDt" autocomplete="off" readonly></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" name="endDt" class="it date" title="접속일마지막날짜" id="endDt" autocomplete="off" readonly></span>
						</div>
					
					<div class="mButton1">
						<span class="gRight">
							<a href="javascript:void(0)" id="resetBtn" class="mBtn1 resetBtn" style="right: 118px;">초기화</a><!-- 여기 스타일좀 잡아주세요.. -->
							<a href="javascript:void(0)" id="searchBtn" class="mBtn1 blue searchBtn">검색</a>
						</span>
					</div>
					
				</div>
			</div>
		</div>
	</form>

	<div class="mBoard1 mt2">
		<form name="frm_del" method="post" action="">
		<h3 class="mTitle2" id="boardListInfo"></h3>
		
			<table summary="번호, 팝업제목, 서비스명, 사용여부, 시작일, 종료일, 등록일로 구성된 표입니다.">
				<caption>홍보영상 목록</caption>
				<colgroup>
						<col width="60">
						<col width="*">
						<col width="*">
						<col width="*">
						<col width="*">
						<col width="*">
					</colgroup>
				
				<thead>
					<tr class="bgType1">
						<th scope="col">선택</th>
						<th scope="col">기준년월</th>
						<th scope="col">데이터명</th>
						<th scope="col">공간형상유형</th>
						<th scope="col">원천제공기관</th>
						<th scope="col">파일명</th>
					</tr>
					</thead>
				
				
				
			<tbody id="ajaxArea"></tbody>
				
		
			</table>
		</form>
	
	</div>
	
	<div class="mButton1">
		<span class="gRight">
			<a href="javascript:void(0)" id="regBtn" class="mBtn1 blue regBtn">등록</a>
			<a href="javascript:void(0)" id="delBtn" class="mBtn1 delBtn">삭제</a>
		</span>
	</div>
	
	<div class="boardNavigation">
		<div class="pagination mPag1"></div>
	</div>


</div>
