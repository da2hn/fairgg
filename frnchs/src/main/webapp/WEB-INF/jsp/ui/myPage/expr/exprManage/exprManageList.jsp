<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/exprManageList.js"/>"></script>
<jsp:include page="/WEB-INF/tiles/exprRcritPopup.jsp"/><!-- 체험예비창업자 관리 팝업 -->
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
	//승인처리
	$("#btnApproveMob").click(function(){
		fnMoChangeSttus("CS01","PS01");
	});
	
})
var approveCnt = 0;
function fnMoChangeSttus(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chkM']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});
	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	var maxRcRitNmpr = $("#rcritNmpr").val();
	
	var selectCnt = maxRcRitNmpr-approveCnt < 0 ? 0 : maxRcRitNmpr-approveCnt;
	if(selectCnt == 0){
		alert("마감되었습니다.");
		return;
	}
	if(Number(approveCnt) + Number(checkedValArr.length) > maxRcRitNmpr){
		alert("모집인원보다 많이 신청할수 없습니다.\n"+selectCnt+"명 선택가능합니다.");
		return;
	}

	var params = {};
	params["exprnRegistNo"] = $("#pExprnRegistNo").val();
	params["exprnReqstNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/exprManage/updateFrnchsExprnReqstApproveSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fnRcritSrh();
		} else {
			alert(_data.resultMsg);
		}
	});
}


</script>
<!-- content -->
		<div class="content">
			<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">체험 예비창업자 관리현황</span></h5>
			<input type="hidden" id="pExprnRegistNo" name="pExprnRegistNo" />
			<input type="hidden" id="rcritNmpr" name="rcritNmpr" />
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
				<div class="mSort1 mt1">
					<select class="select" title="분류" name="searchType" id="searchType">
						<option value="A">지점명</option>
						<option value="B">모집인원</option>
						<option value="C">종업원수</option>
						<option value="D">상태</option>
					</select>
					<input type="text" class="it" title="검색어" name="searchText" id="searchText" placeholder="검색어를 입력하세요">
					<a href="javascript:void()" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="package" name="package" />
				<input type="hidden" id="reqCrud" name="reqCrud" />
				<input type="hidden" id="exprnRegistNo" name="exprnRegistNo" />
			</form>
			<div class="mButton1 right" style="margin-bottom:10px">
				<a href="###" class="mBtn1 primary">재모집</a>
				<a href="#" class="mBtn1 gray">사업종료</a>
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="번호, 지점명, 체험기간, 모집인원, 종업원수, 상태, 상세보기로 구성된 표입니다.">
				<caption>체험 예비창업자 관리현황</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:8%;">
					<col style="width:auto;">
					<col style="width:22%;">
					<col style="width:10%;">
					<col style="width:10%;">
					<col style="width:10%;">
					<col style="width:10%;">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">지점명</th>
					<th scope="col">체험기간</th>
					<th scope="col">모집인원</th>
					<!-- <th scope="col">승인/지원</th> -->
					<th scope="col">종업원수</th>
					<th scope="col">상태</th>
					<th scope="col">상세보기</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
				</tbody>
				</table>
			</div>
			<!-- //board -->
		
			<!-- paging -->
			<div id="mListPag" class="mPag"></div>
			<!-- //paging -->
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
				<div class="swiper-wrapper">
				</div>
			</div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;">
				</ul>

				<div class="search">
					<select name="" id="mSearchType" class="radius">
						<option value="A">지점명</option>
						<option value="B">모집인원</option>
						<option value="C">종업원수</option>
						<option value="D">상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" name="" id="mSearchText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div id="btnMobBsnsEnd" class="box_btn w100 h26 radius gray"><button>사업종료</button></div>
					<div id="btnMobReRcrit" class="box_btn w100 h26 radius"><button>재모집</button></div>
				</div>
				<!-- <div class="btn tar">
					<div id="btnMobDetail" class="box_btn w100 h26 radius gray"><button>상세보기</button></div>
				</div> -->
				
				<ul id="mDataTbody" class="list_board hasCheck" style="font-size:12px;">
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
				<!-- <div id="moExprRcritPopup" class="layer_common layer_popup layer_qnaDetail layer_qnaDetail_0" style="height:250px;max-height: 700px;overflow-y:auto;"">
					<div class="titleArea">
						<h3>체험 예비창업자 모집현황</h3>
						<button class="close" onclick="toggle_dimmed_view('layer_qnaDetail_0');"></button>
					</div>
					<div class="wrap_inner forMo">
						<ul class="list_board hasCheck" id="moRcritDataTbody" style="border-top:0;">
						</ul>
						<div class="btn btn_col col2" style="margin-bottom:0px;">
							<div id="btnApprove" onclick='fnChangeSttus("CS01","PS01")' class="box_btn block h50 fs16 bold"><button>매칭</button></div>
							<a href="#moExprRcritPopup" class="close jsBtnClose1"><div class="box_btn block h50 gray fs16 bold"><button onclick="toggle_dimmed_view('layer_qnaDetail_0');">닫기</button></div></a>
						</div>
						<div class="btn_col col2 forMo" style="margin:30px 15px 0px 15px;">
							<div id="btnApproveMob" onclick='fnMoChangeSttus("CS01","PS01")' class="box_btn block h40 radius" style="width:47%;margin-right:6%"><button>매칭</button></div>
							<div id="btnCloseMob" class="box_btn block h40 radius gray" style="width:47%"><button id="close" onclick="toggle_dimmed_view('layer_qnaDetail_0');">닫기</button></div>
						</div>
					</div>
				</div> -->
				<div class="layer_common layer_popup layer_recruit_mo">
					<div class="titleArea">
						<h3><span>놀부부대찌개 신사점</span> 모집상태</h3>
						<button class="close" onclick="toggle_dimmed_view('layer_recruit_mo');">닫기</button>
					</div>

					<div class="inner scroll_y">
						<ul class="list_box radius">
							<li>
								<!-- [Dev]
									 클릭 시, 'active' class 추가
								-->
								<div class="box active">
									<div class="brand">
										<p class="name">손기웅</p>
									</div>

									<div class="detail">
										<dl>
											<dt>전화번호</dt>
											<dd><a href="tel:01012345678">010.1234.1234</a></dd>
										</dl>

										<dl>
											<dt>이메일</dt>
											<dd><a href="mailto:admin@fair.gg.go.kr">admin@fair.gg.go.kr</a></dd>
										</dl>
									</div>
								</div>
							</li>

							<li>
								<div class="box">
									<div class="brand">
										<p class="name">조신나</p>
									</div>
							
									<div class="detail">
										<dl>
											<dt>전화번호</dt>
											<dd><a href="tel:01012345678">010.1234.1234</a></dd>
										</dl>
							
										<dl>
											<dt>이메일</dt>
											<dd><a href="mailto:admin@fair.gg.go.kr">admin@fair.gg.go.kr</a></dd>
										</dl>
									</div>
								</div>
							</li>

							<li>
								<div class="box">
									<div class="brand">
										<p class="name">손기웅</p>
									</div>
							
									<div class="detail">
										<dl>
											<dt>전화번호</dt>
											<dd><a href="tel:01012345678">010.1234.1234</a></dd>
										</dl>
							
										<dl>
											<dt>이메일</dt>
											<dd><a href="mailto:admin@fair.gg.go.kr">admin@fair.gg.go.kr</a></dd>
										</dl>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div class="btn btn_col col2">
						<div id="PopupMobClose" class="box_btn block h50 gray fs16 bold"><button onclick="toggle_dimmed_view('layer_recruit_mo');">닫기</button></div>
						<div class="box_btn block h50 fs16 bold"><button>매칭</button></div>
					</div>
				</div>
			</div>
<!-- //content -->