<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(document).ready(function(){

	try{
		var vUrl = $("#fullURL").val().replace(".do","");
		var vUrlArr = vUrl.split("/");
		
		if(vUrlArr != null){
			if(vUrl.indexOf('/fran/search') == -1) {
				if(vUrlArr.length > 4){
					vUrl = "/"+vUrlArr.splice(1,1);
				}else if(vUrlArr.length > 3){
					vUrl = "/"+vUrlArr.splice(1,2).join("/");
				}
			}
		}
		<%-- 공지사항/배너광장 헤더 텍스트 수정 - 21.03.16 --%>
		<%-- fairTradePr 텍스트 수정 - 22.07.17 --%>
		var contentHeaderList = {
			//"/stat/franStatList" : {title : "프랜차이즈현황", subTitle : "프랜차이즈 지역별 통계 기본자료 및 브랜드별 통계에 대한 기간별 정보를 제공 합니다.", type : "type1"},
			"/stat/franStatList" : {title : "지역별 통계", subTitle : "프랜차이즈 지역별 통계 기본자료를 제공 합니다.", type : "type1"},
			"/stat/franBrandStatList" : {title : "브랜드별 통계", subTitle : "프랜차이즈 브랜드별 통계에 대한 기간별 정보를 제공 합니다.", type : "type1"},
			"/stat/deepStatList" : {title:"상권심화분석", subTitle:"유관기관의 상권분석 사이트를 링크하여 사용자의 추가 정보획득을 위한 공간입니다.", type : "type1"},
			//"/fran/search" : {title:"프랜차이즈검색", subTitle:"관심 있는 프랜차이즈에 대한 창업정보를 제공합니다.", type : "type2"},
			"/fran/search/searchList" : {title:"브랜드비교검색", subTitle:"관심 있는 프랜차이즈에 대한 창업정보를 제공합니다.", type : "type2"},
			"/fran/search/unifiedSearchBrand" : {title:"프랜차이즈정보", subTitle:"관심 있는 프랜차이즈에 대한 창업정보를 제공합니다.", type : "type2"},
			"/expr/owner" : {title:"나도 사장님!", subTitle:"프랜차이즈 체험을 통해 점포를 운영해보세요.", type : "type3"},
			"/board/trade" : {title:"점포양수도지원", subTitle:"프랜차이즈 가맹점 점포의 공정한 거래를 지원합니다.", type : "type4"},
			"/board/infoOpen" : {title:"정보지원게시판", subTitle:"경기도 가맹사업 정보공개서 심사·등록·거부·취소 등에 관한 정보를 제공하는 게시판입니다.", type : ""},
			"/board/report" : {title:"정보공개서제보", subTitle:"가맹본부는 가맹희망자나 가맹점사업자에게 정보를 제공함에 있어서 사실과 다르게 정보를 제공하거나 사실을 부풀려 정보를 제공하는 행위를 하여서는 안됩니다.", type : "type6"},
			"/fran/promo" : {title:"착한프랜차이즈", subTitle:"착한프랜차이즈.", type : "type6"},
			"/board/service" : {title:"이용안내", subTitle:"경기도 가맹정보제공시스템에 대한 기능을 자세하게 소개합니다.", type : "type8"},
			"/board/integ" : {title:"통합게시판", subTitle:"경기도 가맹사업 정보공개서 심사ㆍ등록ㆍ거부ㆍ취소등에 관한 정보를 제공하는 게시판입니다.", type : "type5"},
// 			"/board/notice" : {title:"공지사항", subTitle:"경기도 가맹정보제공시스템 공지사항 게시판입니다", type : "type8"},
			"/board/banner" : {title:"배너광장", subTitle:"경기도 가맹정보제공시스템과 배너를 교환하여 상호 홍보를 위한 공간입니다", type : "type8"},
			"/surv/surv" : {title:"실태조사게시판", subTitle:"대기업 중심 경제구조에 따른 경제 각 분야의 불공정거래행위 행태 개선 및 소상공인과 소비자 등 도민의 권익보호를 위한 실태조사 입니다.", type : "type7"},
			"/board/infoOpenReg" : {title:"정보공개서등록", subTitle:"가맹본부는 가맹희망자에게 가맹계약 체결 전  정보공개서를  공정거래위원회 또는 특별시장ㆍ광역시장ㆍ특별자치시장ㆍ도지사ㆍ특별자치도지사에게 등록하여야  합니다.", type : "type8"},
			"/board/infoOpenEdc" : {title:"정보공개서교육", subTitle:"경기도에서 진행하는 정보공개서교육 신청이 가능합니다.", type : "type8"},
			"/board/annymty" : {title:"허위•부실정보 익명신고센터", subTitle:"익명신고센터는 익명 제보의 특성상 처리진행상황 및 결과 등을 제보자에게 알려드리지 않습니다.", type : "type8"},
			"/fairTrade/fairTradePr" : {title:"가맹거래홍보관", subTitle:"도내 프랜차이즈 산업의 발전과 상생문화 확산에 기여할 수 있는 가맹거래 교육 등 관련 홍보장 입니다.", type : "type6"},
			"/myPage" : {title:"마이페이지", subTitle:""},
		};

		var contentHeaderObj = contentHeaderList[vUrl];

		if(contentHeaderObj != null){
			if(contentHeaderObj.type){
				$(".mKeysub1").addClass(contentHeaderObj.type);
			}

			var contentHeaderHTML = "";

			contentHeaderHTML += '<h3><span>'+contentHeaderObj.title+'</span></h3>';
			contentHeaderHTML += '<p>'+contentHeaderObj.subTitle+'</p>';

			$(".mKeysub1 .bg").html(contentHeaderHTML);
		}

	}catch(e){
		console.log("헤더 타이틀 로드중 오류");
	}

});
</script>
<!-- keysub -->
<div class="mKeysub1 forPc">
	<div class="bg">
	</div>
</div>
<!-- //keysub -->


