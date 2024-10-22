<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 팝업 목록 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
	
	//목록 조립
	function drawTable(data,area){
		
		//console.log('data',data);
		data = data.resultData || data;
		var tmpHtml = [];
		
		if( data.length < 1 ){
			tmpHtml.push('<tr><td colspan="8">데이터 없음</td></tr>');
		}else{
			data.forEach(function(row,idx){
				tmpHtml.push('<tr>');
				tmpHtml.push('	<td>');
				
				tmpHtml.push('		<span class="mRadio1 noText">');
				tmpHtml.push('			<input type="checkbox" name="delArr" title="선택" id="labelCheckbox1_'+Number(idx+1)+'" value="'+row.recordId+'">');
				tmpHtml.push('			<label for="labelCheckbox1_'+Number(idx+1)+'">선택</label>');
				tmpHtml.push('		</span>');
				
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		Number(row.row));
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td class="left">');
				tmpHtml.push('		<a href="javascript:void(0)" id="'+row.recordId+'" class="ul detailBtn">'+row.popupTitle+'</a>');
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.serviceNm);
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.useYn);
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.popupStartDate);
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.popupEndDate);
				tmpHtml.push('	</td>');
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.createDate);
				tmpHtml.push('	</td>');
				tmpHtml.push('</tr>');
			});
		}
		
		$(area).html( tmpHtml.join("") );
		
		//조립 후 btn evt : 상세 페이지
		$(".detailBtn").off("click").on("click",function(e){
			e.preventDefault();
			location.href ="${contextPath}/admin/management/popup/popDetail.do?recordId="+$(this).attr("id");
		});
		
	}//drawTable[e]
	
	$(document).ready(function(){
		
		//pager[s]
		pager = new jsPager();
		
		var data ={};
		cmAjax(
			"${contextPath}/admin/management/popup/searchAjax.do",				//url
			data,																//data
			function(result){													//callback
				console.log("result",result);
				pager.init(
						result.resultData.length == 0 ? 0 : parseInt(result.resultData[0].totalCount),	//total
						data,													//검색파라미터
						$('.pagination'),										//페이징 들어갈부분
						$('#ajaxArea'),											//그려질부분
						$('#boardListInfo'),									//정보요약부분
						"${contextPath}/admin/management/popup/searchAjax.do",	//url
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
			data2['searchItem']=$("#searchItem").val();
			data2['searchWord']=$("#searchWord").val();
			
			cmAjax(
				"${contextPath}/admin/management/popup/searchAjax.do",				//url
				data2,																//data
				function(result){													//callback
					//console.dir(result);
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
							"${contextPath}/admin/management/popup/searchAjax.do",	//url
							drawTable						//callback
					);
					
					drawTable(result,$("#ajaxArea"));
				}
			);
			
		});
		
		//등록 페이지 이동
		$("#regBtn").off("click").on("click",function(e){
			e.preventDefault();
			location.href = "${contextPath}/admin/management/popup/popDetail.do";
		})
		
		//체크박스 전체선택 ctrl
		$("#labelCheckboxAll").off("change").on("change",function(e){
			e.preventDefault();
			if( $(this).is(":checked") ){
				$("input[name='delArr']").prop("checked","checked");
			}else{
				$("input[name='delArr']").prop("checked","");
			}
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
					"${contextPath}/admin/management/popup/delete.do",		//url
					{"arrRecordId":data},									//data
					function(result){										//callback
						//console.log("result",result);
						if( result.resultCode == "success" ){
							alert("삭제성공!");
							location.href = "${contextPath}/admin/management/popup/popList.do";
						}else{
							alert("삭제실패!");
						}
					}
			);
		});
		
		$("#resetBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			$("#searchWord").val("");
			$("#searchBtn").click();
		});
		
		
	});
	
	</script>
	<!-- content[s] -->
	<div class="contents">

	<h2 class="mTitle1">팝업관리</h2>

	<form name="frm_search" method="post" action="">
		<div class="mSort1">
			<div class="col">
				<label class="ti" for="dateStart">검색</label>
				<div class="co">
					<span class="gSelect">
						<select title="팝업제목" class="select" name="searchItem" id="searchItem">
							<option value="popupTitle">팝업제목</option>
							<option value="popupService">서비스 명</option>
						</select>
					</span>
					<span class="gIt"><input type="text" name="searchWord" id="searchWord" class="it w1" title="검색어 입력"></span>
				</div>
			</div>
			<div class="mButton1">
				<span class="gRight">
					<a href="javascript:void(0)" id="resetBtn" class="mBtn1 resetBtn" style="right: 118px;">초기화</a><!-- 여기 스타일좀 잡아주세요.. -->
					<a href="javascript:void(0)" id="searchBtn" class="mBtn1 blue searchBtn">검색</a>
				</span>
			</div>
		</div>
	</form>

	<div class="mBoard1 mt2">
		<form name="frm_del" method="post" action="">
		<h3 class="mTitle2" id="boardListInfo"></h3>
		
			<table summary="번호, 팝업제목, 서비스명, 사용여부, 시작일, 종료일, 등록일로 구성된 표입니다.">
				<caption>팝업 목록</caption>
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
				
				<tbody id="ajaxArea"></tbody>
				
			</table>
		</form>
	
	</div>
	
	<div class="mButton1">
		<span class="gLeft">
			<a href="javascript:void(0)" id="delBtn" class="mBtn1 delBtn">삭제</a>
		</span>
		<span class="gRight">
			<a href="javascript:void(0)" id="regBtn" class="mBtn1 blue regBtn">팝업등록</a>
		</span>
	</div>
	
	<div class="boardNavigation">
		<div class="pagination mPag1"></div>
	</div>


</div>
	
