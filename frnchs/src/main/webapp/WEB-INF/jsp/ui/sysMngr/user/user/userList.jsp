<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
caption {visibility:hidden; overflow:hidden; width:0;height:0;font-size:0;line-height:0}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		<%-- 전체선택 버튼 제어 - 20.12.16 --%>
		$("#labelCheckboxAll").on("click", function() {
			if($(this).is(":checked")) {
				$("#dataTbody").find("input[name=userNoArray]").prop("checked", true);
			} else {
				$("#dataTbody").find("input[name=userNoArray]").prop("checked", false);
			}
		})
		$(document).on("click", "input[name=userNoArray]", function() {
			if ($("#dataTbody").find("tr").length == $("#dataTbody").find("input[name=userNoArray]:checked").length) {
				$("#labelCheckboxAll").prop("checked", true);
			} else {
				$("#labelCheckboxAll").prop("checked", false);
			}
		})
	})
	
	<%-- 요청에 의한 default 공회전 - 21.03.18 --%>
	$(window).ready(function(){
		fn_searchUserList();
	})
	
	function fn_searchUserList(pageIndex) {
		$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
		$.post('<c:url value="/sysMngr/selectUserList.ajax"/>',
			$("#searchForm").serialize()
		).done(function(data) {
			if(data.resultCode == 'success'){
				$("#dataTbody").empty();
				$("#labelCheckboxAll").prop("checked", false);
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var dataTr = "";
					dataList.forEach(function(data,idx){
						dataTr += '<tr data-user-no="'+data.userNo+'">';
						dataTr += '<td><span class="mRadio1 noText"><input type="checkbox" name="userNoArray" data-user-no="'+data.userNo+'" value="'+data.userNo+'" title="선택" id="labelCheckbox1_'+idx+'"><label for="labelCheckbox1_'+idx+'">선택</label></span>';
						dataTr += '<td>'+(data.rn)+'</td>';
						if($(document).width() <= 687) {//mobile
							$(".mob").show();
							$(".web").hide();
							dataTr += '<td><a href="javascript:void(0);" onclick="fn_userDetail(this)" class="ul">'+data.userNm+'</a></td>';
							dataTr += '<td>'+(data.convertTelno || '')+'</td>';
							dataTr += '<td>'+(data.confmSttusNm || '')+'</td>';
						} else {//web
							$(".mob").hide();
							$(".web").show();
							dataTr += '<td><a href="javascript:void(0);" onclick="fn_userDetail(this)" class="ul">'+data.userNm+'</a></td>';
							dataTr += '<td>'+(data.emailAdres || '')+'</td>';
							dataTr += '<td>'+(data.convertTelno || '')+'</td>';
							dataTr += '<td>'+(data.userSeNm || '')+'</td>';
							dataTr += '<td>'+(data.registDt || '')+'</td>';
							dataTr += '<td>'+(data.confmDt || '')+'</td>';
							dataTr += '<td>'+(data.confmSttusNm || '')+'</td>';
						}
						dataTr += '</tr>';
					})
					$("#dataTbody").append(dataTr);
				} else {
					$("#dataTbody").append('<tr><td colspan="9">조회된 사용자가 없습니다.</td></tr>');
				}
				
				$(".mPag1").html(data.pagingHtml).trigger("create");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		})
		
	}
	
	function fn_updateUserSttusCode(status) {
		if($("input[name=userNoArray]:checked").length > 0) {
// 			var userNoArray = new Array();
// 			$("input[name=userNoArray]:checked").each(function (index, obj) {
// 				console.log($(obj).closest("tr").data("userNo"));
// 				userNoArray.push($(obj).closest("tr").data("userNo"));
// 			})
// 			var userNoArray = $.makeArray($("input[name=userNoArray]:checked").map(function(){return $(this).closest("tr").data("userNo") })).toString();
// 			console.log(userNoArray);
			$.post('<c:url value="/sysMngr/updateUserSttusCode.ajax"/>',{
				confmSttusCode : status
				, userNoArray : $.makeArray($("input[name=userNoArray]:checked").map(function(){return $(this).closest("tr").data("userNo") })).toString()
			}).done(function(data) {
				if(data.resultCode == 'success' && data.updateCnt > 0) {
					alert(data.resultMsg);
					fn_searchUserList();
				} else {
					alert(!data.resultMsg ? "오류가 발생했습니다." : data.resultMsg);
					console.log(data.resultMsg);
				}
			})
		} else {
			alert("선택된 회원이 존재하지 않습니다.");
		}
	}
	
	function fn_userDetail(obj) {
		$("#searchForm #userNo").val($(obj).closest("tr").data("userNo"));
		$("#searchForm").attr("action", '<c:url value="/sysMngr/user/user/userInfo.do"/>');
		$("#searchForm").submit();
	}
	
	function fn_deleteUserSttusCode() {
		if($("input[name=userNoArray]:checked").length > 0) {
			if(confirm("회원정보를 삭제하시겠습니까?")){
					$.post('<c:url value="/sysMngr/deleteUserNo.ajax"/>',{
						userNoArray : $.makeArray($("input[name=userNoArray]:checked").map(function(){return $(this).closest("tr").data("userNo") })).toString()
					}).done(function(data) {
						if(data.resultCode == 'success') {
							alert(data.resultMsg);
							fn_searchUserList();
						} else {
							alert(!data.resultMsg ? "오류가 발생했습니다." : data.resultMsg);
							console.log(data.resultMsg);
						}
					})
				}
			} else {
				alert("선택된 회원이 존재하지 않습니다.");
			}
		}

</script>
<!-- contents -->
		<div class="contents">
			
			<!-- breadcrumb -->
			<div class="mBc">
				<span class="h">home</span>
				<span class="t">회원관리</span>
				<span class="t">회원목록</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">회원관리</h2>


			<div class="mSort1">
			<form id="searchForm" method="post">
				<input type="hidden" id="userNo" name="userNo" />
				<input type="hidden" name="pageIndex" value="" />
				<div class="row">
					<div class="col">
						<label class="ti" for="dateStart">신청일자</label>
						<div class="co">
							<span class="gIt"><input type="text" class="it date" title="신청일 시작날짜" id="dateStart" name="dateStart"></span>
							<span class="bar">~</span>
							<span class="gIt"><input type="text" class="it date" title="신청일 마지막날짜" id="dateEnd" name="dateEnd"></span>
							<script type="text/javascript">
							$( function() {
								$( "#dateStart, #dateEnd" ).datepicker({
									dateFormat: 'yy-mm-dd'
								});
							} );
							</script>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<label class="ti" for="labelSelect1">선택</label>
						<div class="co">
							<select title="그룹선택" class="select" id="userSeCode" name="userSeCode" id="labelSelect1">
								<option value="">그룹선택</option>
								<c:forEach var="code" items="${userSeCodeList }">
									<option value="${code.codeValue}"><c:out value="${code.codeValueNm }" /></option>
								</c:forEach>
							</select>
							<select title="검색항목" class="select" id="searchType" name="searchType">
								<option value="">검색항목</option>
								<option value="type1">이름</option>
								<option value="type2">이메일</option>
								<option value="type3">전화번호</option>
								<option value="type4">승인상태</option>
							</select>
							<span class="gIt"><input type="text" class="it" title="검색내용" id="searchText" name="searchText" placeholder="검색어 입력"></span>
						</div>
					</div>
					<a href="javascript:void(0);" onclick="fn_searchUserList()" class="mBtn1 blue">검색</a>
				</div>
			</form>
			</div>
			<%--
			<div class="mSort1">
				<form id="searchForm" method="post">
				<input type="hidden" id="userNo" name="userNo" />
				<div class="col">
					<label class="ti">신청일자</label>
					<div class="co">
						<span class="gIt"><input type="text" class="it date" title="접속일시작날짜" id="dateStart" name="dateStart"></span>
						<span class="bar">~</span>
						<span class="gIt"><input type="text" class="it date" title="접속일마지막날짜" id="dateEnd" name="dateEnd"></span>
						<script type="text/javascript">
						$( function() {
							$( "#dateStart, #dateEnd" ).datepicker({
								dateFormat: 'yy-mm-dd'
							});
						} );
						</script>
					</div>
				</div>
				<div class="col">
					<label class="ti">사용자구분</label>
					<select title="사용자구분" class="select" id="userSeCode" name="userSeCode">
						<option value="">그룹전체</option>
						<c:forEach var="code" items="${userSeCodeList }">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm }" /></option>
						</c:forEach>
					</select>
					<label class="ti">검색항목</label>
					<select title="검색항목" class="select" id="searchType" name="searchType">
						<option value="">검색항목선택</option>
						<option value="type1">이름</option>
						<option value="type2">이메일</option>
						<option value="type3">전화번호</option>
						<option value="type4">승인상태</option>
					</select>
					<span class="gIt"><input type="text" class="it" title="검색내용" id="searchText" name="searchText"></span>
				</div>
				<a href="javascript:void(0);" onclick="fn_searchUserList()" class="mBtn1 blue">검색</a>
				</form>
			</div>
			--%>

			<div class="mBoard1 mt2" style="overflow-y:auto">
				<table summary="번호, 프랜차이즈, 사용여부, 시작일, 종료일, 등록일로 구성된 표입니다.">
				<caption>홍보영상 관리</caption>
					<colgroup class="web">
						<col style="width:60px;">
						<col style="width:60px;">
						<col style="width:296px;">
						<col style="width:349px;">
						<col style="width:205px;">
						<col style="width:299px;">
						<col style="width:155px;">
						<col style="width:155px;">
						<col style="width:115px;">
					</colgroup>
					<colgroup class="mob" style="display: none;">
						<col style="width:30px;">
						<col style="width:35px;">
						<col style="width:80px;">
						<col style="width:100px;">
						<col style="width:45px;">
					</colgroup>
				<thead>
				<tr class="bgType1 web">
					<th scope="col">
						<span class="mRadio1 noText">
							<input type="checkbox" name="checkbox1" title="전체선택" id="labelCheckboxAll">
							<label for="labelCheckboxAll">전체선택</label>
						</span>
					</th>
					<th scope="col">번호</th>
					<th scope="col">이름</th>
					<th scope="col">이메일</th>
					<th scope="col">전화번호</th>
					<th scope="col">신청그룹(권한)</th>
					<th scope="col">가입신청일</th>
					<th scope="col">승인일자</th>
					<th scope="col">승인상태</th>
				</tr>
				<tr class="bgType1 mob" style="display: none;">
					<th scope="col">
						<span class="mRadio1 noText">
							<input type="checkbox" name="checkbox1" title="전체선택" id="labelCheckboxAll">
							<label for="labelCheckboxAll">전체선택</label>
						</span>
					</th>
					<th scope="col">번호</th>
					<th scope="col">이름</th>
					<th scope="col">전화번호</th>
					<th scope="col">승인상태</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="9">조회된 사용자가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			
			<!-- paging -->
			<div class="mPag1" style="z-index:0;">
			</div>
			<!-- //paging -->

			<div class="mButton1">
				<span class="gRight">
					<a href="javascript:void(0);" onclick="fn_deleteUserSttusCode()" class="mBtn1" style="background-color:orange">회원정보 삭제</a>
					<a href="javascript:void(0);" onclick="fn_updateUserSttusCode('Y')" class="mBtn1 blue">승인</a>
					<a href="javascript:void(0);" onclick="fn_updateUserSttusCode('N')" class="mBtn1">반려</a>
				</span>
			</div>

		</div>
		<!-- //contents -->