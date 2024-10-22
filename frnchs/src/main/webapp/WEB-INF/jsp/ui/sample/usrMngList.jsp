<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>사용자관리</title>
	<script type="text/javaScript" language="javascript" defer="defer">
		//전역 변수
		//pager 이름 변경 X
		var pager;
		var gList ;//리스트 전체 정보

		function fnRenderList(list,div){
			div.html('');
			var vdom='';

			if (list && (list.length > 0)){
				list.forEach(function(row,idx){
					vdom += '<tr>'
					vdom += '<td class="b10 ac">'+row.rnum+'</td>';
					vdom += '<td class="b10 ac">'+row.userUniqueId+'</td>';
					vdom += '<td class="b10 ac">'+row.userNm+'</td>';
					vdom += '<td class="b10 ac">'+row.insttNm+'</td>';
					vdom += '<td class="b10 ac">'+row.registDt+'</td>';
					vdom += '<td class="b10 ac">'+row.deptNm+'</td>';
					vdom += '<td class="b10 ac">'+row.ofcpsNm+'</td>';
					vdom += '<td class="b10 ac">'+row.confmYn+'</td>';
					vdom += '<td class="b10 ac">'+row.useYn+'</td>';
					vdom += '<td class="b10 ac">'+row.lockYn+'</td>';
					vdom += '<td class="b10 ac"><input class="btn btn-primary btn-xs" type="button" value="잠김해제" /> <input class="btn btn-success btn-xs" type="button" value="관리" /></td>';
					vdom += '</tr>'
				});
				gList = list;
			}else{
				vdom = '<tr><td class="ac" colspan="14">검색된 데이터가 없습니다.</td></tr>';
			}
			div.html(vdom);
		}

		function fnUsrInfo(list,div){
			div.html('');
			var vdom='';

			if (list && (list.length > 0)){
				list.forEach(function(row,idx){
					vdom += '<tr>'
					vdom += '<th class="b10 ac">사용자ID</th>';
					vdom += '<td class="b10 ac"><input type="text" id="userUniqueId" value="'+row.userUniqueId+'" disabled/></td>';
					vdom += '<th class="b10 ac">사용자명</th>';
					vdom += '<td class="b10 ac"><input type="text" id="userNm" value="'+row.userNm+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">기관(*)</th>';
					vdom += '<td class="b10 ac"><input type="text" id="insttNm" value="'+row.insttNm+'" /></td>';
					vdom += '<th class="b10 ac">부서명</th>';
					vdom += '<td class="b10 ac"><input type="text" id="deptNm" value="'+row.deptNm+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">직위</th>';
					vdom += '<td class="b10 ac"><input type="text" id="ofcpsNm" value="'+row.ofcpsNm+'" /></td>';
					vdom += '<th class="b10 ac">전화번호</th>';
					vdom += '<td class="b10 ac"><input type="text" id="telNo" value="'+row.telNo+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">휴대폰번호</th>';
					vdom += '<td class="b10 ac"><input type="text" id="moblphonNo" value="'+row.moblphonNo+'" /></td>';
					vdom += '<th class="b10 ac">승인여부(*)</th>';
					vdom += '<td class="b10 ac"><input type="text" id="confmYn" value="'+row.confmYn+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">사용여부</th>';
					vdom += '<td class="b10 ac"><input type="text" id="moblphonNo" value="'+row.moblphonNo+'" /></td>';
					vdom += '<th class="b10 ac">등록일시</th>';
					vdom += '<td class="b10 ac"><input type="text" id="confmYn" value="'+row.confmYn+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">계정잠김여부</th>';
					vdom += '<td class="b10 ac"><input type="text" id="moblphonNo" value="'+row.moblphonNo+'" /></td>';
					vdom += '<th class="b10 ac">비밀번호 오류횟수</th>';
					vdom += '<td class="b10 ac"><input type="text" id="confmYn" value="'+row.confmYn+'" /></td>';
					vdom += '</tr>'
					vdom += '<tr>'
					vdom += '<th class="b10 ac">최종로그인일시</th>';
					vdom += '<td class="b10 ac"><input type="text" id="moblphonNo" value="'+row.moblphonNo+'" /></td>';
					vdom += '</tr>'
				});
				gList = list;
			}else{
				vdom = '<tr><td class="ac" colspan="14">검색된 데이터가 없습니다.</td></tr>';
			}
			div.html(vdom);
		}

		function fnInit(){
			pager = new jsPager();

			pager.init(parseInt('${total}'),{},$('.pagination'),$('#boardListItem'),$('#boardListInfo'),
					"/usrMngList.ajax",fnRenderList);

			//최초 view를 그릴 때 item 을 가져와서 그려준다.
			var jlist = JSON.parse('${list}');
			fnRenderList(jlist,$('#boardListItem'));

			//bootstrap date select
			$('#searchStartRegistDt').datetimepicker();
			$('#searchEndRegistDt').datetimepicker();

			// 검색
			$('#btnSearch').click(function(){

				/* var startRegistDt = $("#searchStartRegistDt").val();
				var endRegistDt = $("#searchEndRegistDt").val();

				if(startRegistDt == '' || endRegistDt == ''){
					alert("등록일을 선택해주세요");
					return;
				}

				if(endRegistDt - startRegistDt < 0){
					alert("등록일을 다시 선택해주세요");
					return;
				} */

				const data ={};
				data['insttCode']=$("#searchInsttCode").val();
				data['confmYn']=$("#searchConfmYn").val();
				data['useYn']=$("#searchUseYn").val();
				data['userNm']=$("#searchUserNm").val();
				/* data['startRegistDt']=startRegistDt;
				data['endRegistDt']=endRegistDt; */
				data['lockYn']=$("#searchLockYn").val();

				gfnAjax(true,"/usrMngList.ajax",data,function(item){
					fnRenderList(item.list,$('#boardListItem'));
					pager.init(parseInt(item.total),data,$('.pagination'),$('#boardListItem'),$('#boardListInfo'),
							"/usrMngList.ajax",fnRenderList);
				});
			});
		}

		$(function() {
			fnInit();

			$('#modifyUsrInfo').on('show.bs.modal', function (event) {
				const data ={};
				gfnAjax(true,"/usrMngList.ajax",data,function(item){
					fnUsrInfo(item.list,$('#UserInfoItem'));
					pager.init(parseInt(item.total),data,$('.pagination'),$('#UserInfoItem'),$('#boardListInfo'),
							"/usrMngList.ajax",fnUsrInfo);
				});
			});
		});

	</script>
</head>
<body>
	<!-- s : 타이틀 -->
	<div class="titleArea">
		<h2>사용자관리</h2>
		<ol class="subNaviArea">
			<li><a href="#"><img src="images/sub/icon_home.png" alt="HOME" /></a></li>
			<li><a href="#">시스템관리</a></li>
			<li><a href="#">사용자관리</a></li>
			<li><a href="#">사용자관리</a></li>
		</ol>
	</div>
	<!-- e : 타이틀 -->
	<!-- s : 검색 -->
	<div class="searchArea">
		<div class="form-group form-inline">
			<label for="searchInsttCode" class="first-title">기관</label>
			<select class="w100 form-control" id="searchInsttCode">
				<option value="">전체</option>
			</select>

			<label for="searchConfmYn" class="search-title">승인여부</label>
			<select class="w100 form-control" id="searchConfmYn">
				<option value="">전체</option>
				<option value="100">예</option>
				<option value="200">아니오</option>
			</select>

			<label for="searchUseYn" class="search-title">사용여부</label>
			<select class="w100 form-control" id="searchUseYn">
				<option value="">전체</option>
				<option value="100">예</option>
				<option value="200">아니오</option>
			</select>

			<label for="searchUserNm" class="search-title">사용자명</label>
			<input type="text" class="w100 form-control" id="searchUserNm">

			<label for="searchStartRegistDt" class="search-title">등록일</label>
			<div class='input-group date' id='searchStartRegistDt'>
				<input type='text' class="w150 form-control form_datetime" />
				<span class="input-group-addon">
					<span class="glyphicon glyphicon-calendar"></span>
				</span>
			</div>

			<span>~</span>

			<label for="searchEndRegistDt" class="search-title blind">등록종료일</label>
			<div class='input-group date' id='searchEndRegistDt'>
				<input type='text' class="w150 form-control form_datetime" />
				<span class="input-group-addon">
					<span class="glyphicon glyphicon-calendar"></span>
				</span>
			</div>

			<label for="searchLockYn" class="search-title">계정잠김여부</label>
			<select class="w100 form-control" id="searchLockYn">
				<option value="">전체</option>
				<option value="100">예</option>
				<option value="200">아니오</option>
			</select>
			<button class="btn btn-primary" id="btnSearch">검색</button>
		</div>
	</div>
	<!-- e : 검색 -->
	<!-- S: List -->
		<div id="table">
			<div class="boardListInfo" id="boardListInfo"></div>
			<table class="boardList table table-bordered">
				<caption style="visibility:hidden">카테고리ID, 케테고리명, 사용여부, Description, 등록자 표시하는 테이블</caption>
				<colgroup>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
					<col width=""/>
				</colgroup>
				<thead>
					<tr>
						<th align="center">번호</th>
						<th align="center">사용자 유일ID</th>
						<th align="center">사용자명</th>
						<th align="center">기관명</th>
						<th align="center">등록일시</th>
						<th align="center">부서명</th>
						<th align="center">직위</th>
						<th align="center">승인여부</th>
						<th align="center">사용여부</th>
						<th align="center">계정잠김여부</th>
						<th align="center">관리</th>
					</tr>
				</thead>
				<tbody id="boardListItem"></tbody>
			</table>
		</div>
		<!-- E : List -->
		<div class="buttonRight">
			<input class="btn btn-primary btn-sm" type="button" value="키 기본설정" data-toggle="modal" data-target="#modifyUsrInfo"/>
			<input class="btn btn-primary btn-sm" type="button" value="사용자 등록" />
		</div>

<!-- Modal -->
<div class="modal fade bs-example-modal-lg" id="modifyUsrInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="myModalLabel">사용자 수정</h3>
			</div>
			<div class="modal-body">
				<h4>사용자 정보</h4>
				<div>
					<table class="table table-bordered">
						<caption style="visibility:hidden">카테고리ID, 케테고리명, 사용여부, Description, 등록자 표시하는 테이블</caption>
						<colgroup>
							<col width="15%"/>
							<col width="35%"/>
							<col width="15%"/>
							<col width="35%"/>
						</colgroup>
						<tbody id="UserInfoItem"></tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary">Save changes</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>