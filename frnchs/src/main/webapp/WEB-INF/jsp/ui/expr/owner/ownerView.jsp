<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/expr/ownerView.js"/>"></script>
<!-- body -->
<article id="expFranchiseInfo">
	<h3 class="subtitle forMo">나도 사장님!</h3>
	<div class="body">
		<div class="bg">
			<input type="hidden" name="exprnRegistNo" id="exprnRegistNo" value="${exprnRegistNo }"/>
			<input type="hidden" name="frnchsNo" id="frnchsNo" value="${frnchsAdiInfo.frnchsNo }"/>
			<div class="gTitle4">
				<h5 class="mTitle4 fs28">브랜드 소개</h5>
				<div class="gLt">
					<a href="javascript:history.back()" class="btnPrev">이전 페이지</a>
				</div>
				<div class="gRt">
					<a href="javascript:void(0)" class="mBtn1 l2 orange" id="btnReqExpr"><span class="iReg">운영 체험신청</span></a>
				</div>
			</div>
			
			<!-- module -->
			<div class="mView2">
				<div class="tit">${frnchsAdiInfo.bsnSgnal } 기업소개</div>
				<c:if test="${empty frnchsAdiInfo.frnchsImageFileNo }">
					<p class="txt">${frnchsAdiInfo.brandInfo }</p>
				</c:if>
				<c:if test="${not empty frnchsAdiInfo.frnchsImageFileNo }">
					<div class="img">
						<img src="/file/downloadFile.do?atchmnflNo=${frnchsAdiInfo.atchmnflNo }&fileSn=${frnchsAdiInfo.fileSn }&fileKey=${frnchsAdiInfo.fileKey }" width="650" height="415" alt="">
					</div>
				</c:if>
			</div>
			<ul class="mList3">
			<li>예비 창업자의 정보수집을 위해 해당 브랜드 담당자가 직접 작성하거나 브랜드의 홈페이지에 공개된 내용을 발췌한 것입니다.</li>
			<li>작성된 시점에 따라 현재와 차이가 날 수 있으니 참고용으로만 활용하시기 바랍니다.</li>
			</ul>
			<!-- //module -->
			<div class="box_btn block h40 radius forMo"><button href="#expFranPopup" class="jsBtnShow1">운영체험 신청</button></div>
			<div id="popupDiv"></div>
		</div>
	</div>
</article>
<!-- //body -->