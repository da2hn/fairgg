<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%-- 임시 작업 --%>
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/searchList.js"/>"></script> <!-- 여기참조 --> --%>
<script type="text/javaScript">
	//팝업들로 넘길 param
	var densityObj = {};
	$(document).ready(function() {
		var swiper_mypage = new Swiper('.swiper_mypage', {
			freeMode: true,
			slidesPerView: 'auto',
		});
		
		//최초 검색
		search_frchs(1);
		search_mobFrchs(1);
		
		$("#pagingMob").click(function(){
			if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
				alert('마지막 페이지입니다.');
				return;
			}else{
				search_mobFrchs(Number($("input[name=pageIndexMob]").val())+1)
			}
		})
	})

	function search_frchs(pageIndex) {
		$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
		$.post('<c:url value="/myPage/intrstFrnchs/selectIntrstFrnchsList.ajax" />',
			$("#searchForm").serialize()
		).done(function(data) {
			if(data.resultCode == 'success'){
				$("#dataTbody").empty();

				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var tmpHtml = [];

					dataList.forEach(function(row,idx){
						var rowYear = row.year == null ? "" : row.year;
						tmpHtml.push('<tr>');
						tmpHtml.push('	<td>');
						tmpHtml.push('		<span class="mCheckbox notext">');
						tmpHtml.push('			<input type="checkbox" id="labelCheckbox1_'+Number(idx+1)+'" name="checkbox1" title="선택" value="'+row.frnchsNo+'">');
						tmpHtml.push('			<label for="labelCheckbox1_'+Number(idx+1)+'">선택</label>');
						tmpHtml.push('		</span>');
						tmpHtml.push('	</td>');
						tmpHtml.push('	<td>');
						tmpHtml.push(row.bsnSgnal);
// 						tmpHtml.push('		<a href="javascript:void(0)" class="ul">'+row.bsnSgnal+'</a>');
						tmpHtml.push('	</td>');
						tmpHtml.push('	<td>'+row.lclasIndutyNm+'</td>');
						tmpHtml.push('	<td>'+row.mlsfcIndutyNm+'</td>');
						tmpHtml.push('	<td>'+numberWithCommas(row.sm)+'</td>');
// 						<!-- 창업 희망 지역 제거 - 21.02.15 -->
						tmpHtml.push('	<td>'+row.ctprvnNm+'</td>');
// 						<!-- 폐점율 표기 안되게 - 21.02.15 -->
						tmpHtml.push('	<td>'+row.closeRate+'</td>');
						
						tmpHtml.push('	<td>'+row.histYear+'년</td>');
						tmpHtml.push('	<td>'+Number(row.deptRatio*100).toFixed(0)+'%</td>');
						tmpHtml.push('	<td>'+row.unitArAvrgSelngAm+'</td>');
						<%-- tmpHtml.push('	<td>'+numberWithCommas(row.unitArAvrgSelngAm)+'</td>'); --%>
						tmpHtml.push('	<td>');
						tmpHtml.push('		<a href="javascript:void(0)" id="'+row.frnchsNo+','+row.mlsfcIndutyCode+','+row.closeRate+','+rowYear+'" class="mBtn1 m lPrimary" style="font-size:12px">상세보기</a>');
						tmpHtml.push('	</td>');
						tmpHtml.push('</tr>');
					});

					$("#dataTbody").append(tmpHtml.join(""));

				} else {
// 					$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
					$("#dataTbody").append('<tr><td colspan="11">조회된 내용이 없습니다.</td></tr>');
				}
				$(".mPag").html(data.pagingHtml).trigger("create");

				$(".lPrimary").off("click").on("click",function(e){
// 					e.preventDefault();
//					var pop;
//					var densityObj = {};//아마 지역이랑, 프랜차이즈 번호 넘기면될듯

//					densityObj.ctprvnCode = 41;//나중에 받아서 처리
//					densityObj.frnchsNo = $(this).attr("id");
//					densityObj.year = '2019';

//					var promise2 = new Promise((resolve, reject)=>{
//						resolve();
//					});

//					promise2.then(
//						pop = window.open('/fran/search/densityBrand.do')
//					)
//					.then(
//						setTimeout(function(){
//							pop.cc(densityObj);
//						},800)
//					);

//					$(this).attr("id")
					e.preventDefault();
					densityObj.ctprvnCode = 41;//나중에 받아서 처리
					densityObj.frnchsNo = $(this).attr("id").split(",")[0];
					densityObj.mlsfcIndutyCode = $(this).attr("id").split(",")[1];
					densityObj.closeRate = $(this).attr("id").split(",")[2];
	
					var year = $(this).attr("id").split(",")[3];
					//var pop = window.open('/fran/search/densityBrand.do');	
					var pop = window.open('/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+densityObj.frnchsNo+'&brandYear='+year);
	
				});
			}else{
				console.log("데이터가 없습니다.");
				$("#dataTbody").empty();
	
				$("#dataTbody").append('<tr><td colspan="11">조회된 내용이 없습니다.</td></tr>');
				$(".mPag").html('<a title="현재페이지" href="javascript:void(0)" class="selected">1</a>');
			}
		});
	}
	function search_mobFrchs(pageIndex) {
	/* 	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex); */
		$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
		$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
		$.post('<c:url value="/myPage/intrstFrnchs/selectIntrstFrnchsList.ajax" />',
			$("#searchForm").serialize()
		).done(function(data) {
			if(data.resultCode == 'success'){
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
					if((parseInt(data.resultCount) % 10) > 0){
						maxPage = maxPage + 1;
					}
					var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
					var tmpMobHtml = [];
	
					dataList.forEach(function(row,idx){	
						var rowYear = row.year == null ? "" : row.year;
						tmpMobHtml.push('<li>');
						tmpMobHtml.push('<div class="box">');
						tmpMobHtml.push('  <p class="check">');
						tmpMobHtml.push('    <input type="checkbox" name="chkM" id="chkM'+Number(idx+1)+'" value="'+row.frnchsNo+'" class="hidden notxt">');
						tmpMobHtml.push('    <label for="chkM'+Number(idx+1)+'"></label>');
						tmpMobHtml.push('  </p>');
						tmpMobHtml.push('  <a href="javascript:void(0);" id="'+row.frnchsNo+','+row.mlsfcIndutyCode+','+row.closeRate+','+rowYear+'"  class="lPrimary">');
						tmpMobHtml.push('	<div class="numState">');
						tmpMobHtml.push('		<span class="no">NO.'+ row.rn + ' </span>' + ' ');
						tmpMobHtml.push('	</div>');
						tmpMobHtml.push('    <p class="type"><span>'+row.lclasIndutyNm+'</span>-<span>'+row.mlsfcIndutyNm+'</span></p>');
						tmpMobHtml.push('    <p class="subject">'+row.bsnSgnal+'</p>');
						tmpMobHtml.push('    <p class="nameDate">');
						tmpMobHtml.push('      <span><strong>창업비용</strong> '+numberWithCommas(row.sm)+'</span>');
						tmpMobHtml.push('      <span><strong>본사업력</strong> '+row.closeRate+'</span>');
						tmpMobHtml.push('      <span><strong>본사부채</strong> '+Number(row.deptRatio*100).toFixed(0)+'%</span>');
						tmpMobHtml.push('    </p>');
						tmpMobHtml.push('  </a>');
						tmpMobHtml.push('</div>');
						tmpMobHtml.push('</li>');
					});
	
					$("#mDataTbody").append(tmpMobHtml.join(""));
	
				} else {
					$("#mDataTbody").html('<p class="empty tac">검색된 내용이 없습니다.</p>');
					var maxPage = 1;
					var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
				}
				$(".mPag").html(data.pagingHtml).trigger("create");
				$("input[name=pageIndexMobMax]").val(maxPage);
				$("#pagingMob").text(pagingText);
	
				$(".lPrimary").off("click").on("click",function(e){
					e.preventDefault();
					densityObj.ctprvnCode = 41;//나중에 받아서 처리
					densityObj.frnchsNo = $(this).attr("id").split(",")[0];
					densityObj.mlsfcIndutyCode = $(this).attr("id").split(",")[1];
					densityObj.closeRate = $(this).attr("id").split(",")[2];
					
					var year = $(this).attr("id").split(",")[3];
					//var pop = window.open('/fran/search/densityBrand.do');	
					var pop = window.open('/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+densityObj.frnchsNo+'&brandYear='+year);
				});
			}else{
				console.log("데이터가 없습니다.");
			}
		});
	}
	function sendParam(){
		densityObj.year = '2019';
		return densityObj;
	}

	function fn_removeFranchs() {
		if($("input[name=checkbox1]:checked").length < 1) {
			alert("삭제할 관심 프랜차이즈를 선택해주세요.");
		} else if($("input[name=checkbox1]:checked").length > 1) {
			alert("한 개의 관심 프랜차이즈를 선택해주세요.");
		} else {
			var param = {};
			var confirmMsg = "";

			param.flag = 'Y'
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";

			if( confirm(confirmMsg) ){

				param.frnchsNo = $("input[name=checkbox1]:checked").val();
				$.ajax({
					/*dataType:"text",*/
					dataType:"html",
					type: "POST",
					url: "/comcode/intrstFrnchs.ajax",
					data:param,
					async: true,
					cache: false,
					success : function(data, status, request) {
						if(fnChkJson(data)){
							alert("관심 프랜차이즈가 삭제되었습니다.");
							$("[name*=checkbox]:checked").closest("tr").remove();
						}else{
							alert("관심 프랜차이즈 삭제 실패하였습니다.");
						}
					},
				    error: function(request, status, error) {
			    		window.error = error;
						alert(error);
					}
				});
			}else{
				return false;
			}
		}

	};
	
	function fn_removeMobFranchs() {
		if($("input[name=chkM]:checked").length < 1) {
			alert("삭제할 관심 프랜차이즈를 선택해주세요.");
		} else if($("input[name=chkM]:checked").length > 1) {
			alert("한 개의 관심 프랜차이즈를 선택해주세요.");
		} else {
			var param = {};
			var confirmMsg = "";

			param.flag = 'Y'
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";

			if(confirm(confirmMsg) ){
				param.frnchsNo = $("input[name=chkM]:checked").val();
				$.ajax({
					/*dataType:"text",*/
					dataType:"html",
					type: "POST",
					url: "/comcode/intrstFrnchs.ajax",
					data:param,
					async: true,
					cache: false,
					success : function(data, status, request) {
						if(fnChkJson(data)){
							alert("관심 프랜차이즈가 삭제되었습니다.");
							$("input[name=chkM]:checked").closest("li").remove(); 
						}else{
							alert("관심 프랜차이즈 삭제 실패하였습니다.");
						}
					},
				    error: function(request, status, error) {
			    		window.error = error;
						alert(error);
					}
				});
			}else{
				return false;
			}
		}
	};
</script>
<!-- content -->
		<div class="content">
			<h5 class="mTitle2">관심 프랜차이즈 현황</h5>
			<div class="mBoard1 noline">
		<%-- 		<table summary="선택, 브랜드명, 대분류업종, 중분류업종, 창업비용, 창업희망지역, 폐점율, 본사업력, 본사부채비율, 면적(3.3㎡)당 평균매출액(단위/천원), 프랜차이즈 정보로 구성된 표입니다."> --%>
				<table summary="선택, 브랜드명, 대분류업종, 중분류업종, 창업비용, 본사업력, 본사부채비율, 프랜차이즈 정보로 구성된 표입니다.">
				<caption>결과 내 검색</caption>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">브랜드명</th>
					<th scope="col">대분류<br>업종</th>
					<th scope="col">중분류<br>업종</th>
					<th scope="col">창업비용</th>
					<th scope="col">창업희망<br>지역</th> <!-- 창업 희망 지역 제거 - 21.02.15 -->
					<th scope="col">폐점율</th> <!-- 폐점율 표기 안되게 - 21.02.15 -->
					<th scope="col">본사업력</th>
					<th scope="col">본사<br>부채비율</th>
					<th scope="col">면적<br>(3.3㎡)당<br>평균<br>매출액<br>(단위/천원)</th>
					<th scope="col">프랜차이즈<br>정보</th>
				</tr>
				</thead>
		
				<tbody id="dataTbody">
					<tr>
<!-- 						<td colspan="8">조회된 데이터가 없습니다.</td> -->
						<td colspan="11">조회된 내용이 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
		
			<!-- paging -->
			<div class="mPag">
				<a title="현재페이지" href="javascript:void(0)" class="selected">1</a>
			</div>
			<!-- //paging -->
		
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
			</form>
			<div class="mButton1 fLeft">
				<a href="javascript:void(0);" onclick="fn_removeFranchs()" class="mBtn1 primary">관심 프랜차이즈 삭제</a>
			</div>
		</div>
	</div>
</div>	
	<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>

			<div class="wrap_inner forMo">
				
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
				</form>
			
				<div class="btn tar">
					<div class="box_btn w100 h26 radius gray" onclick="fn_removeMobFranchs()"><button style="width: 150px;">관심 프랜차이즈 삭제</button></div>
				</div>

				<ul id="mDataTbody" class="list_board hasCheck">
				</ul>
				
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
