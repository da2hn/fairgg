<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
  /**
  * @Class Name : sampleList.jsp
  * @Description : Sample List 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.07.09            최초 생성
  *
  * author htkim
  * since 2019.07.09
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>기본 게시판 목록</title>
	<link type="text/css" rel="stylesheet" href="/css/egovframework/sample.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
	<script type="text/javascript" src="/js/jquery/js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="/js/cmmn/common.js"></script>
	<script type="text/javascript" src="/js/cmmn/pagination.js"></script>
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	
	<!-- jExcel -->
	<script src="https://bossanova.uk/jexcel/v3/jexcel.js"></script>
	<script src="https://bossanova.uk/jsuites/v2/jsuites.js"></script>
	<link rel="stylesheet" href="https://bossanova.uk/jexcel/v3/jexcel.css" type="text/css" />
	<link rel="stylesheet" href="https://bossanova.uk/jsuites/v2/jsuites.css" type="text/css" />
	
	<!-- defer를 boolean으로 설정하지 않으면 false인데 이게 true이면 페이지가 모두 로드된 후에 이 스크립트가 실행됨을 얘기함. -->
	<!-- src가 명시되지 않은 inline스크립트인 경우에는 사용하면 안됨. 그런데 지금 그 상황임 -->
	<!-- 스크립트가 서로 실행되는 순서가 중요하다면 defer를 쓰고 그게 아니면 async를 쓴다 -->
	<script type="text/javaScript" language="javascript" defer="defer">
		//전역 변수
		//pager 이름 변경 X
		var pager;
		var gList ;//리스트 전체 정보
		
		function fnRenderList(list,div){
			div.html('');
			
			if (list && (list.length > 0)){
				var data = new Array();
				
				for(var i = 0; i < list.length; i++){
					var data_sub = new Array();
					data_sub.push(list[i].ID);
					data_sub.push(list[i].NAME);
					data_sub.push(list[i].USE_YN);
					data_sub.push(list[i].DESCRIPTION);
					data_sub.push(list[i].REG_USER);
					
					data.push(data_sub);
				}
				
				jexcel(document.getElementById('spreadsheet'), {
					data:data,
					rowResize:true,
					columnDrag:true,
					columns: [
						{ type: 'text', width:'200' },
						{ type: 'text', width:'100' },
						{ type: 'text', width:'100' },
						{ type: 'calendar', width:'100' },
					],
				});
			}
		}
	
		function fnInit(){
			pager = new jsPager();
	
			pager.init(parseInt('${total}'),{},$('.pagination'),$('#spreadsheet'),$('#boardListInfo'),
					"/ajaxList.ajax",fnRenderList);
			
			//최초 view를 그릴 때 item 을 가져와서 그려준다.
			var jlist = JSON.parse('${list}');
			fnRenderList(jlist,$('#spreadsheet'));
			
			// 검색
			$('#btnSearch').click(function(){
				
				//total,list count 가져오기
				//const data ={"aaa":"1","bbb":"2"};
				const data ={};
				data['searchCondition']=$("#searchCondition").val();
				data['searchKeyword']=$("#searchKeyword").val();

				gfnAjax(true,"/ajaxList.ajax",data,function(item){
					fnRenderList(item.list,$('#boardListItem'));
					pager.init(parseInt(item.total),data,$('.pagination'),$('#spreadsheet'),$('#boardListInfo'),
							"/ajaxList.ajax",fnRenderList);
				});
			});
			
		}
		
		/* selectbox 내용 변경 */
		function fn_selectChg(chgId){
			if(chgId == 'id'){
				$("#searchCondition").val('1');
			} else if(chgId == 'name'){
				$("#searchCondition").val('2');
			} else {
				$("#searchCondition").val('');
				chgId = "선택";
			}
			$("#dropdownMenu1").html(chgId + '<span class="caret" />');
		}

		
		$(function() {
			fnInit();
		});
	</script>
</head>

<body>
	<div id="content_pop">

		<div id="boardListInfo"></div>
		
		<div id="spreadsheet"></div>
	
		<div class="boardNavigation">
			<div class="pagination"></div>
		</div>
		
	</div>
</body>
</html>
