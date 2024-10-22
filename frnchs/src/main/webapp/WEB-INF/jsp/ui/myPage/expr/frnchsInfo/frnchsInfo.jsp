<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<style>
.brandImg {
	display: inline-block;
    position: absolute;
    top: 50%;
    right: 8px;
    height: 26px;
    margin-top: -13px;
    padding: 0 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #fcc710;
    color: #fff;
    font-weight: 500;
    text-align: center;
    line-height: 24px;
	}
</style>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/frnchsInfo.js"/>"></script>

		<!-- content -->
		<div class="content">
			<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">프랜차이즈 정보</span></h5>
		<!-- frnchs_no -->
		<!-- frnchs_info -->
		<!-- frnchs_image_file_no -->
		<!-- youtube_mvp_link -->
		<!-- entrprs_intrcn_file_no -->
		<!-- good_frnchs_at -->
		<!-- regist_user_no -->
		<!-- last_updt_user_no -->
		<!-- good_frnchs_slctn_dt -->
		<!-- regist_dt -->
		<!-- updt_dt -->
			<!-- write -->
			<form id="dataForm" method="post">
			<input type="hidden" name="entrprsIntrcnFileNo" id="entrprsIntrcnFileNo" value="<c:out value="${data.entrprsIntrcnFileNo }" />" />
			<input type="hidden" id="imgY" name="frnchsImageFileNo" value="<c:out value="${data.frnchsImageFileNo }" />" />
			<input type="hidden" name="frnchsNo" value="<c:out value="${data.frnchsNo }" />" />
			<div class="mBoard1 mWrite1">
				<table summary="프랜차이즈명, 프랜차이즈 정보, 프랜차이즈 이미지, 유튜브 동영상 링크, 기업소개자료 첨부로 구성된 표입니다.">
					<caption>프랜차이즈 정보</caption>
					<colgroup>
						<col width="165px">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th scope="col">프랜차이즈명</th>
							<td class="left">
								<c:out value="${data.bsnSgnal }" />
							</td>
						</tr>
						<tr>
							<th scope="col">프랜차이즈 정보</th>
							<td class="left">
								<div class="gTextarea"><textarea class="textarea" id="frnchsInfo" name="frnchsInfo" rows="6" title="프랜차이즈 정보"><c:out value="${data.frnchsInfo }" /></textarea></div>
							</td>
						</tr>
						<tr>
							<th scope="col">프랜차이즈 이미지</th>
							<td class="left">
								<div class="mImage1">
									<span>
				<%-- 						<img id="imgArea" src="<c:url value="/static/images/x_attachimg1.png" />" alt=""> --%>
										<c:choose>
											<c:when test="${!empty data.frnchsImageFileNo}" >
												<img id="imgArea" width="300px" height="200px" src="<c:url value="/file/downloadFile.do?fileKey=${data.frnchsImageFileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.frnchsImageFileNo }&atchmnflSttusCode=${data.atchmnflSttusCode }" />" alt="<c:out value="${data.inputFileNm }" />" >
											</c:when>
											<c:otherwise>
												<img id="imgArea" width="300px" height="200px" src="<c:url value="/static/images/x_attachimg1.png" />" >
											</c:otherwise>
										</c:choose>
									</span>
								</div>
								<div class="mFile1">
									<div class="gIt"><input type="text" id="fileName" class="it" readonly title="프랜차이즈 이미지"></div>
									<div class="btn">
										<a href="###" class="mBtn1">첨부파일</a>
										<input type="file" name="frnchsImageFile" class="fileHidden" id="frnchsImageFile" onchange="javascript: document.getElementById('fileName').value = this.value">
									</div>
								</div>
								<div class="mInfo1">※ 5MByte 이하의 파일만 등록 가능합니다.</div>
							</td>
						</tr>
						<tr>
							<th scope="col">유튜브 동영상 링크</th>
							<td class="left">
				<!-- 				<a href="###" class="ul txtPrimary">URL~~</a> -->
								<div class="gIt">
									<input type="text" class="it" id="youtubeMvpLink" name="youtubeMvpLink"  title="유튜브 동영상 링크" placeholder="" value="<c:out value="${data.youtubeMvpLink}" />" >
								</div>
							</td>
						</tr>
						<tr>
							<th scope="col">기업소개자료 첨부</th>
							<td class="left">
								<!-- modify20201230 -->
								<div id="atchFileDiv"></div>
								<div class="mInfo1">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			</form>
			<!-- //write -->
			<div class="mButton1 right">
				<a href="javascript:void(0);" onclick="fn_modifyFrnchsInfo();" class="mBtn1 primary"><c:out value="${empty data.frnchsInfo ? '저장' : '수정' }" /></a>
				<a href="<c:url value="/myPage/expr/frnchsInfo/frnchsInfoList.do" />" class="mBtn1 gray">목록</a>
			</div>
		
		</div>
	</div>
</div>
<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
			
			<div class="wrap_inner forMo">
				<form id="mDataForm" method="post">
				<input type="hidden" name="entrprsIntrcnFileNo" id="mEntrprsIntrcnFileNo" value="<c:out value="${data.entrprsIntrcnFileNo }" />" />
				<input type="hidden" name="frnchsImageFileNo" value="<c:out value="${data.frnchsImageFileNo }" />" />
				<input type="hidden" name="frnchsNo" value="<c:out value="${data.frnchsNo }" />" />
				<table class="tbl_row">
					<caption>가입정보수정</caption>
					<colgroup>
						<col style="width:30%;">
						<col style="width:70%;">
					</colgroup>

					<tbody>
						<!-- 창업예정자/점포운영자 & 컨설턴트 & 정보공개서관리자 권한 공통 항목 -->
						<tr>
							<th scope="col">프랜차이즈 명</th>
							<td class="left">
								<c:out value="${data.bsnSgnal }" />
							</td>
						</tr>

						<tr>
							<th scope="col">프랜차이즈 정보</th>
							<td class="left">
								<div class="gTextarea"><textarea class="textarea" id="mFrnchsInfo" name="frnchsInfo" rows="6" title="프랜차이즈 정보"><c:out value="${data.frnchsInfo }" /></textarea></div>
							</td>
						</tr>
			
						<tr>
							<th scope="col">프랜차이즈 이미지</th>
							<td class="left">
								<div class="mImage1">
									<span>
										<c:choose>
											<c:when test="${!empty data.frnchsImageFileNo}" >
												<img id="mImgArea" width="300px" height="200px" src="<c:url value="/file/downloadFile.do?fileKey=${data.frnchsImageFileKey }&fileSn=${data.fileSn }&atchmnflNo=${data.frnchsImageFileNo }&atchmnflSttusCode=${data.atchmnflSttusCode }" />" alt="<c:out value="${data.inputFileNm }" />" >
											</c:when>
											<c:otherwise>
												<img id="mImgArea" width="300px" height="200px" src="<c:url value="/static/images/x_attachimg1.png" />" >
											</c:otherwise>
										</c:choose>
									</span>
								</div>
								<div class="mFile1">
									<div class="box_file"><input type="text" id="mFileName" class="it" readonly title="프랜차이즈 이미지" style="border:none;"></div>
									<div class="btn" style="right: 0px;">
										<a href="###" class="brandImg">첨부파일</a>
										<input type="file" name="frnchsImageFile" class="fileHidden" id="mFrnchsImageFile" onchange="javascript: document.getElementById('mFileName').value = this.value">
									</div>
								</div>
								<div class="mInfo1">※ 5MByte 이하의 파일만 등록 가능합니다.</div>
							</td>
						</tr>
						
						<tr>
							<th scope="col">유튜브 동영상 링크</th>
							<td class="left">
								<input type="text" class="it" id="youtubeMvpLink" name="youtubeMvpLink"  title="유튜브 동영상 링크" placeholder="" value="<c:out value="${data.youtubeMvpLink}" />" >
							</td>
						</tr>
						<tr>
						
							<th scope="col">기업소개자료 첨부</th>
							<td class="left">
								<!-- modify20201230 -->
								<div id="mAtchFileDiv"></div>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
				<div class="btn_col2 col2">
					<div class="box_btn block h40 radius"><button id="btnModifyMob"><c:out value="${empty data.frnchsInfo ? '저장' : '수정' }" /></button></div>
					<div class="box_btn block h40 radius gray"><button id="btnDropMob">목록</button></div>
				</div>
			</div>
<!-- //content -->