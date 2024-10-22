<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	$(document).ready(function() {
// 		fn_bindCodeListToSelOption("USER_SE_CODE", "userSeCode");//유저구분
		
		fn_selectUserAuthList();
		
	})
	
	function fn_selectUserAuthList(obj) {
		$("#userSeNm").text(!$(obj).val() ? "" : $(obj).find("option:selected").text());
		var checkboxes = $(".mBoard1 > table").find("input[type=checkbox]");
		$.post('<c:url value="/sysMngr/selectAuthList.ajax"/>',{
			userSeCode : $(obj).val()
		}).done(function(data) {
			var dataList = data.dataList;
			if(data.resultCode == 'success') {
				var dataTr = "";
				dataList.forEach(function(data,idx){
// 					console.log(data);
					dataTr += '<tr height="39">';
					var idx = 0;
					for (var prop in data) {
						if(prop == "menuGroupNm" || prop == "menuNm") {
							dataTr += '<td class="left">'+data[prop]+'</td>';
						} else if(prop.includes("ac") && prop.includes("At")) {
							dataTr += '<td>';
							if(!!data[prop]) {
								var acType = ""
								if(prop.includes("01")) {
									acType = "조회권한";
								} else if(prop.includes("02")) {
									acType = "신청권한";
								} else if(prop.includes("03")) {
									acType = "쓰기권한";
								} else if(prop.includes("04")) {
									acType = "관심담기 권한";
								} else if(prop.includes("05")) {
									acType = "삭제권한";
								}
								dataTr += '<span class="mRadio1 noText">';
								dataTr += '<input type="checkbox" name="menu_'+data['menuCode']+'" title="'+acType+'" id="menuCode_'+data['menuCode']+'_'+prop+'" value="'+prop+'" '+(data[prop] == "Y" ? "checked" : "")+'>';
// 								dataTr += '<input type="checkbox" name="menu_'+data['menuCode']+'['+(idx++)+']" title="'+acType+'" id="menuCode_'+data['menuCode']+'_'+prop+'" value="'+prop+'" '+(data[prop] == "Y" ? "checked" : "")+'>';
								dataTr += '<label for="menuCode_'+data['menuCode']+'_'+prop+'">'+acType+'</label>';
								dataTr += '</span>';
							}
							dataTr += '</td>';
						}
// 					    console.log(prop+":"+data[prop]);
					}
					dataTr += '</tr>';
				})
				$(".mBoard1 > table > tbody").html(dataTr);
			} else {
				alert(!data.resultMsg ? "오류가 발생했습니다." : data.resultMsg);
				console.log(data.resultMsg);
			}
		})
		if(!obj) {
			checkboxes.prop("disabled", true);
		} else {
			checkboxes.prop("disabled", false);
		}
	}
	
	function fn_updateAuthInfo(obj) {
		if(confirm("권한수정을 진행하시겠습니까?")) {
			$.ajaxSettings.traditional = true;
			$.post('<c:url value="/sysMngr/updateAuthInfo.ajax"/>',
				$('#dataForm').serializeArrayString()
			).done(function(data) {
				var dataList = data.dataList;
				if(data.resultCode == 'success') {
					alert(data.resultMsg);
				} else {
					alert(!data.resultMsg ? "오류가 발생했습니다." : data.resultMsg);
					console.log(data.resultMsg);
				}
			})
		}
	}
	
</script>
	<!-- contents -->
	<div class="contents">
		
		<!-- breadcrumb -->
		<div class="mBc">
			<span class="h">home</span>
			<span class="t">회원관리</span>
			<span class="t">권한관리</span>
		</div>
		<!-- //breadcrumb -->
		
		<h2 class="mTitle1">권한관리</h2>

		<form id="dataForm" method="post">
		<div class="mSort1">
			<div class="col">
				<label class="ti" for="labelRight">권한검색</label>
				<div class="co">
					<select class="select" title="그룹선택" id="userSeCode" name="userSeCode" onchange="fn_selectUserAuthList(this);">
						<option value="">선택하세요</option>
						<c:forEach var="code" items="${userSeCodeList }">
							<c:if test="${code.codeValue ne 'US04' }">관리자 제외
								<option value="${code.codeValue}"><c:out value="${code.codeValueNm }" /></option>
							</c:if>
						</c:forEach>
					</select>
				</div>
			</div>
<!-- 			<a href="###" class="mBtn1 blue">검색</a> -->
		</div>
		
		<h3 class="mTitle2"><span id="userSeNm"></span> 권한설정</h3>
		<div class="mBoard1">
			<table summary="대분류, 소분류, 조회권한, 신청권한, 쓰기권한, 관심담기, 권한, 삭제권한로 구성된 표입니다.">
				<caption>기관관리자 권한설정</caption>
				<colgroup>
					<col span="2" width="*">
					<col span="5" width="11%">
				</colgroup>
				<thead>
				<tr class="bgType1">
					<th scope="col">대분류</th>
					<th scope="col">소분류</th>
					<th scope="col">조회권한</th>
					<th scope="col">신청권한</th>
					<th scope="col">쓰기권한</th>
					<th scope="col">관심담기 권한</th>
					<th scope="col">삭제권한</th>
				</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		</form>
		
		

		<div class="mButton1 right">
			<a href="javascript:void(0)" onclick="fn_updateAuthInfo();" class="mBtn1 blue jsBtnShow1">수정</a>
			
		</div>
	</div>
	<!-- //contents -->