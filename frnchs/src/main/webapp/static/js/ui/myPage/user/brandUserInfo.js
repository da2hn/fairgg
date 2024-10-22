var fMobObj = null;
var gHedofcNo;
var brandAddSeq = 0;
$(document).ready(function() {
	//파일첨부 세팅
	var bBizAtchmnflNo = $("#bizAtchmnflNo").val() == null ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"normal", tmpDel:bBizAtchmnflNo});
	fObj.init();
	fObj.getFileList($("#bizAtchmnflNo").val(), "FS02");
	
	fMobObj = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#mAtchFileDiv"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"normal", tmpDel:bBizAtchmnflNo});
	fMobObj.init();
	fMobObj.getFileList($("#mBizAtchmnflNo").val(), "FS02");

	//브랜드명 불러오기
	fnGetBrandList();

	$("#btnModify").click(function() {
		if( $("#chargerNm").val() == ""){
			alert("담당자명을 확인해주세요.");
			return;
		}
		
		if($("#userPw").val()){
			if($("#userPw").val() != $("#userPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}
		}
		
		if(!$("#userPw").val()){
			if($("#userPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}		
		}
		
		if($(".frnchsNo").serializeArrayString().frnchsNo == ""){
			alert("브랜드를 등록해주세요.");
			return;
		}
		
//		if(!infoRule($("#telno").val())) return;
		if($("#telno").val().length < 8){
			alert("올바른 전화번호를 입력해주세요.")
			return false;
		}
		
		/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if(!emailRule.test($("#emailAdres").val())) {            
			alert("이메일 형식이 잘못되었습니다.")
			return false;
		}	*/
		
		if(confirm("가입정보를 수정하시겠습니까?")){
			
			var params = {};
			params["userNo"] = $("#userNo").val();
			params["userSeCode"] = $("#userSeCode").val();
			params["chargerNm"] = $("#chargerNm").val();
			params["telno"] = $("#telno").val();
			params["userPw"] = $("#userPw").val();
			/*params["emailAdres"] = $("#emailAdres").val();*/
			params["atchmnflNo"] = $("input[name='atchmnflNo']").val();
			params["frnchsNoList"] = $(".frnchsNo").serializeArrayString().frnchsNo;
			fnGetAjaxData("/myPage/user/user/saveUserInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					if (fObj != null) {
						//파일 업로드 완료 처리
						fObj.updateComplete();
						fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
						fMobObj.updateComplete();
						fMobObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");

						fnGetBrandList();
					}
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});	

	$("#btnMobModify").click(function() {			
		if($("#mUserPw").val()){
			if($("#mUserPw").val() != $("#mUserPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}
		}
		
		if(!$("#mUserPw").val()){
			if($("#mUserPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}		
		}	
		
		if($(".mFrnchsNo").serializeArrayString().frnchsNo == ""){
			alert("브랜드를 등록해주세요.");
			return;
		}
		
//		if(!infoRule($("#telno").val())) return;
		if($("#mTelno").val().length < 8){
			alert("올바른 전화번호를 입력해주세요.")
			return false;
		}
		
		/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if(!emailRule.test($("#mEmailAdres").val())) {            
			alert("이메일 형식이 잘못되었습니다.")
			return false;
		}*/
		
		if(confirm("가입정보를 수정하시겠습니까?")){
			
			var params = {};
			params["userNo"] = $("#userNo").val();
			params["userSeCode"] = $("#userSeCode").val();
			params["chargerNm"] = $("#mChargerNm").val();
			params["telno"] = $("#mTelno").val();
			params["userPw"] = $("#mUserPw").val();
			/*params["emailAdres"] = $("#mEmailAdres").val();*/
			params["atchmnflNo"] = $("input[name='atchmnflNo']").val(); 
			params["frnchsNoList"] = $(".mFrnchsNo").serializeArrayString().frnchsNo;
			fnGetAjaxData("/myPage/user/user/saveUserInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					if (fObj != null) {
						//파일 업로드 완료 처리
						fObj.updateComplete();
						fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
						fMobObj.updateComplete();
						fMobObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
						
						fnGetBrandList();
					}
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnDrop").click(function() {
		if(confirm("가입정보를 탈퇴하시겠습니까?")){
			var params = {
					  userNo : $("#userNo").val()
					, userSeCode : $("#userSeCode").val()
			};
			fnGetAjaxData("/myPage/user/user/deleteUserInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					location.href='/logout.do';
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnDropMob").click(function() {
		if(confirm("가입정보를 탈퇴하시겠습니까?")){
			var params = {
					  userNo : $("#userNoMob").val()
					, userSeCode : $("#userSeCodeMob").val()
					
			};
			fnGetAjaxData("/myPage/user/user/deleteUserInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					location.href='/logout.do';
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});

	/**
	 * 대분류 변경시 이벤트
	 * @returns
	 */
	$(document).on("change", ".franchLclas", function(){
		var targetNum = $(this).attr("id").split("_")[1];
		var params = {};
		params["lclasIndutyCode"]  = $(this).val();
		params["hedofcNo"]  = gHedofcNo;
		fnGetAjaxData("/fran/selectHedofcNoFrnchsMlsfcList.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				var resultList = _data.hedofcNoFrnchsMlsfcList;
				var html = [];
				var htmlMob = [];
				html.push("<option value=\"\">선택하세요</option>/n");
				htmlMob.push("<option value=\"\">선택하세요</option>/n");
				for(var i = 0 ; i < resultList.length ; i++){
					var mlsfcIndutyCode = resultList[i].mlsfcIndutyCode;
					var mlsfcIndutyNm = resultList[i].mlsfcIndutyNm;
					html.push("<option value=\""+mlsfcIndutyCode+"\">"+mlsfcIndutyNm+"</option>\n");
					htmlMob.push("<option value=\""+mlsfcIndutyCode+"\">"+mlsfcIndutyNm+"</option>\n");
				}
				$("#frnchsMlsfc"+"_"+targetNum).html(html.join(""));
				$("#frnchsMlsfcMob"+"_"+targetNum).html(htmlMob.join(""));
				//업체명목록 초기화
				$("#frnchsNo_"+targetNum).html("<option value=\"\">업체명</option>/n");
				$("#frnchsNoMob_"+targetNum).html("<option value=\"\">업체명</option>/n");
			} else {
				alert(_data.resultMsg);
			}
		});

	});

	/**
	 * 중분류 변경시 이벤트
	 * @returns
	 */
	$(document).on("change", ".frnchsMlsfc", function(){
		var targetNum = $(this).attr("id").split("_")[1];
		var params = {};
		params["hedofcNo"]  = gHedofcNo;
		params["mlsfcIndutyCode"]  = $(this).val();
		fnGetAjaxData("/fran/selectBsnSgnalList.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				var resultList = _data.bsnSgnalList;
				var html = [];
				var htmlMob = [];
				html.push("<option value=\"\">선택하세요</option>/n");
				htmlMob.push("<option value=\"\">선택하세요</option>/n");
				for(var i = 0 ; i < resultList.length ; i++){
					var frnchsNo = resultList[i].frnchsNo;
					var bsnSgnal = resultList[i].bsnSgnal;
					var usedYn = resultList[i].usedYn;
					var userNo = resultList[i].userNo;
					
					if(usedYn == "Y" && userNo != $("#userNo").val()){
						html.push("<option value=\"used\">"+bsnSgnal+"(사용중)</option>\n");
						htmlMob.push("<option value=\"used\">"+bsnSgnal+"(사용중)</option>\n");
					}else{
						var flag = true;
						var mflag = true;
						
						$(".frnchsNo").each(function() {
							 if($(this).children("option:selected").val() == frnchsNo) flag = false;
						});
					    if(!flag){
							html.push("<option value=\"used\">"+bsnSgnal+"(사용중)</option>\n");
					    } else {						    	
					    	html.push("<option value=\""+frnchsNo+"\">"+bsnSgnal+"</option>\n");
					    }
					    
					    $(".mFrnchsNo").each(function() {
					    	if($(this).children("option:selected").val() == frnchsNo) mflag = false;
					    });
					    if(!flag){
					    	htmlMob.push("<option value=\"used\">"+bsnSgnal+"</option>\n");
					    } else {						    	
					    	htmlMob.push("<option value=\""+frnchsNo+"\">"+bsnSgnal+"</option>\n");
					    }
					}
					
				}
				$("#frnchsNo_"+targetNum).html(html.join(""));
				$("#frnchsNoMob_"+targetNum).html(htmlMob.join(""));
			} else {
				alert(_data.resultMsg);
			}
		});

	});

	/**
	 * 프랜차이즈명 변경시 이벤트
	 * @returns
	 */
	$(document).on("change", ".frnchsNo", function(){

		if($(this).val() == "used"){
			alert("이미 다른 관리자가 관리중입니다.");
			$(this).val("");
			return;
		}

/*		var frnchsNoArr = $(".frnchsNo").serializeArrayString().frnchsNo.split(",");
		var frnchsDupChkCnt = 0;
		if(frnchsNoArr.length > 1){
			for(var i = 0 ; i < frnchsNoArr.length ; i++){
				if($(this).val() == frnchsNoArr[i]){
					frnchsDupChkCnt++;
				}
			}
		}
		if(frnchsDupChkCnt > 1){
			alert($(this).find('option:selected').text() + " 는 이미 선택되어있습니다.");
			$(this).val("");
		}*/
	});
	$(document).on("change", ".mFrnchsNo", function(){
		var frnchsNoArr = $(".mFrnchsNo").serializeArrayString().frnchsNo.split(",");
		var frnchsDupChkCnt = 0;
		if(frnchsNoArr.length > 1){
			for(var i = 0 ; i < frnchsNoArr.length ; i++){
				if($(this).val() == frnchsNoArr[i]){
					frnchsDupChkCnt++;
				}
			}
		}
		
		if($(this).val() == "used" || frnchsDupChkCnt > 1){
			alert($(this).find('option:selected').text() + " 는 이미 선택되어있습니다.");
			$(this).val("");
			return;
		}

	});
	
	$('#btnAdd').on('click', function() {
		if($(".frnchsNo").length > 4 ){
			alert("브랜드 정보를 더 이상 추가할수 없습니다.");
			return;
		}
		fnAddBrand();
	});
	$('#btnMobAdd').on('click', function() {
		if($(".mFrnchsNo").length > 4 ){
			alert("브랜드 정보를 더 이상 추가할수 없습니다.");
			return;
		}
		fnAddMobBrand();
	});
	
});
/**
 * 유저별 브랜드 불러오기
 * @returns
 */
function fnGetBrandList(){
	fnGetSyncAjaxData("/user/selectUserChrgBrandList.ajax", "userForm", function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			if($("tr[id^='tr_']").length > 0){
				$("tr[id^='tr_']").remove();
			}
			gHedofcNo = _data.userChrgBrandList[0].hedofcNo;
			fnGetBrandHtml(_data.userChrgBrandList);
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fnGetBrandHtml(list){
	var selected;
	if(list){
		var td = $("#brandArea").html(""), mTd = $("#mBrandArea").html(""), div1, div2, div3;
		for(var i = 0 ; i < list.length ; i++){
			var data = list[i];
			//대분류
			var tmpLclasList = fnSelectLclasList(data.hedofcNo);
			//중분류
			var tmpMlsfcList = fnChangeMlsfcList(data.hedofcNo, data.lclasIndutyCode, i);
			//프랜차이즈
			var tmpFranList = fnSelectFran(data.hedofcNo, data.mlsfcIndutyCode, i);
			
			
			if(i == 0){
				div1 = $('<div class="hasBtn">');
				div1.append('  <p class="msg">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>');
				div1.append('  <div class="box_btn w92 h40 white fs15 medium img add" id="btnAdd"><button>추가</button></div>');
				td.append(div1);
				
				div1 = $('<div class="hasBtn">');
				div1.append('  <p class="msg">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>');
				div1.append('  <div class="box_btn h24 radius gray fs12 medium" id="btnMobAdd" style="margin: 0px 0px 0px 0px"><button>추가</button></div>');
				mTd.append(div1);
			}
			//웹화면 행 입력
			div1 = $('<div class="hasBtn brandAdd brandAdd_'+i+'">');
			div2 = $('<select class="franchLclas" title="대분류 업종" name="franchLclas" id="franchLclas_'+i+'">');
			div2.append('  <option>대분류 업종</option>');
			for(var j = 0 ; j < tmpLclasList.length ; j++){
				if(tmpLclasList[j].lclasIndutyCode == data.lclasIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				div2.append('  <option value="'+tmpLclasList[j].lclasIndutyCode+'" '+selected+'>'+tmpLclasList[j].lclasIndutyNm+'</option>');
			}
			div1.append(div2);
			
			div2 = $('<select class="frnchsMlsfc" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfc_'+i+'">');
			div2.append('  <option>중분류 업종</option>');
			for(var j = 0 ; j < tmpMlsfcList.length ; j++){
				if(tmpMlsfcList[j].mlsfcIndutyCode == data.mlsfcIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				div2.append('  <option value="'+tmpMlsfcList[j].mlsfcIndutyCode+'" '+selected+'>'+tmpMlsfcList[j].mlsfcIndutyNm+'</option>                                                 ');
			}
			div1.append(div2);
			
			div2 = $('<select class="frnchsNo" title="프랜차이즈명" name="frnchsNo" id="frnchsNo_'+i+'">');
			div2.append('	<option value="">프랜차이즈명</option>');
			for(var j = 0 ; j < tmpFranList.length ; j++){
				var frnchsNo = tmpFranList[j].frnchsNo;
				var bsnSgnal = tmpFranList[j].bsnSgnal;
				var usedYn = tmpFranList[j].usedYn;
				var userNo = tmpFranList[j].userNo;
				
				if(frnchsNo == data.frnchsNo){
					selected = " selected";
				}else{
					selected = " ";
				}
				if(usedYn == "Y" && userNo != $("#userNo").val()){
					div2.append('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'(사용중)</option>');
				}else{
					div2.append('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'</option>');
				}
			}
			div1.append(div2);
			
			div2 = $('<div class="box_btn w92 h40 white2 fs15 medium img del">');
			div2.append('<button>삭제</button>');
			div2.click(data, function(res){
				if($("#brandArea").find(".brandAdd").length < 2){
					alert("더이상 삭제할 수 없습니다.");
					return;
				}
				$(this).parent().remove();
			});
			div1.append(div2);
			
			td.append(div1);
			
			//모바일 행 입력
			div1 = $('<div class="brandAdd brandAdd_'+i+'">');
			div2 = $('<div class="tar">');
			div3 = $('<div class="box_btn h24 radius fs12 medium">');
			div3.append('<button>삭제</button>');
			div3.click(function(){
				if($("#mBrandArea").find(".brandAdd").length < 2){
					alert("더이상 삭제할 수 없습니다.");
					return;
				}
				$(this).parent().parent().remove();
			});
			div2.append(div3);
			div1.append(div2);
			
			div2 = $('<select class="franchLclas w100p radius" title="대분류 업종" name="franchLclas" id="franchLclasMob_'+i+'">');
			div2.append('  <option>대분류 업종</option>');
			for(var j = 0 ; j < tmpLclasList.length ; j++){
				if(tmpLclasList[j].lclasIndutyCode == data.lclasIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				div2.append('  <option value="'+tmpLclasList[j].lclasIndutyCode+'" '+selected+'>'+tmpLclasList[j].lclasIndutyNm+'</option>');
			}
			div1.append(div2);
			
			div2 = $('<select class="frnchsMlsfc w100p radius" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfcMob_'+i+'">');
			div2.append('  <option>중분류 업종</option>');
			for(var j = 0 ; j < tmpMlsfcList.length ; j++){
				if(tmpMlsfcList[j].mlsfcIndutyCode == data.mlsfcIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				div2.append('  <option value="'+tmpMlsfcList[j].mlsfcIndutyCode+'" '+selected+'>'+tmpMlsfcList[j].mlsfcIndutyNm+'</option>                                                 ');
			}
			div1.append(div2);
			
			div2 = $('<select class="mFrnchsNo w100p radius" title="프랜차이즈명" name="frnchsNo" id="frnchsNoMob_'+i+'">');
			div2.append('	<option value="">프랜차이즈명</option>');
			for(var j = 0 ; j < tmpFranList.length ; j++){
				var frnchsNo = tmpFranList[j].frnchsNo;
				var bsnSgnal = tmpFranList[j].bsnSgnal;
				var usedYn = tmpFranList[j].usedYn;
				var userNo = tmpFranList[j].userNo;
				
				if(frnchsNo == data.frnchsNo){
					selected = " selected";
				}else{
					selected = " ";
				}
				if(usedYn == "Y" && userNo != $("#userNo").val()){
					div2.append('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'(사용중)</option>');
				}else{
					div2.append('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'</option>');
				}
			}
			div1.append(div2);
						
			mTd.append(div1);
			brandAddSeq++;
		}
	}
}

function fnGetBrandHtml_backup(list){
	var html = [];
	var selected;
	if(list){
		for(var i = 0 ; i < list.length ; i++){
			var data = list[i];
			//대분류
			var tmpLclasList = fnSelectLclasList(data.hedofcNo);
			//중분류
			var tmpMlsfcList = fnChangeMlsfcList(data.hedofcNo, data.lclasIndutyCode, i);
			//프랜차이즈
			var tmpFranList = fnSelectFran(data.hedofcNo, data.mlsfcIndutyCode, i);
			if(i == 0){
			    html.push('<tr id=tr_addText>');
			    html.push('	    <th scope="col" rowspan="'+(list.length + 1)+'" id="brandTh">브랜드 명</th>                                          ');
			    html.push('     <td class="left" style="border-bottom:0;"> ');
				html.push('         <div class="hasBtn">');
				html.push('             <p class="msg" style="display:inline-block;">※ 브랜드명을 추가하시려면 오른쪽에 추가버튼을 눌러주세요.</p>');
				html.push('             <div class="box_btn w92 h40 white fs15 medium img add" id="btnAdd"><button>추가</button></div>');
				html.push('         </div>');
				html.push('     </td>');
				html.push('</tr>');
			}
			html.push('<tr id=tr_'+i+'>                                                                               ');
			/*if(i == 0){
				html.push('	<th scope="col" rowspan="'+(list.length + 1)+'" id="brandTh">브랜드 명</th>                                          ');
			}*/
			html.push('	<td class="left" style="border-top:0;border-bottom:0;">                                                                 ');
			
			html.push('		<div class="mFlex2">                                                          ');
			html.push('			<select class="select franchLclas" title="대분류 업종" name="franchLclas" id="franchLclas_'+i+'">                                  ');
			html.push('			<option>대분류 업종</option>                                                 ');
			for(var j = 0 ; j < tmpLclasList.length ; j++){
				if(tmpLclasList[j].lclasIndutyCode == data.lclasIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				html.push('			<option value="'+tmpLclasList[j].lclasIndutyCode+'" '+selected+'>'+tmpLclasList[j].lclasIndutyNm+'</option>                                                 ');
			}
			html.push('			</select>                                                                  ');
			html.push('			<select class="select frnchsMlsfc" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfc_'+i+'">                                  ');
			html.push('			<option>중분류 업종</option>                                                 ');
			for(var j = 0 ; j < tmpMlsfcList.length ; j++){
				if(tmpMlsfcList[j].mlsfcIndutyCode == data.mlsfcIndutyCode){
					selected = " selected";
				}else{
					selected = " ";
				}
				html.push('			<option value="'+tmpMlsfcList[j].mlsfcIndutyCode+'" '+selected+'>'+tmpMlsfcList[j].mlsfcIndutyNm+'</option>                                                 ');
			}
			html.push('			</select>                                                                  ');
			html.push('			<select class="select frnchsNo" title="프랜차이즈명" name="frnchsNo" id="frnchsNo_'+i+'">                                 ');
			html.push('			<option value="">프랜차이즈명</option>                                                ');
			for(var j = 0 ; j < tmpFranList.length ; j++){
				var frnchsNo = tmpFranList[j].frnchsNo;
				var bsnSgnal = tmpFranList[j].bsnSgnal;
				var usedYn = tmpFranList[j].usedYn;

				if(frnchsNo == data.frnchsNo){
					selected = " selected";
				}else{
					selected = " ";
				}
				if(usedYn == "Y"){
					html.push('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'(사용중)</option>');
				}else{
					html.push('<option value="'+frnchsNo+'"'+selected+'>'+bsnSgnal+'</option>');
				}
			}
			html.push('			</select>                                                                  ');
			if(i >= 0){
				html.push('			<a href="javascript:fnDelBrand('+i+')" class="mBtn1 lPrimary btnDelete" style="line-height:37px;height:37px;"><span>삭제</span></a>   ');
			}else{
				html.push('			<a href="javascript:fnAddBrand()" class="mBtn1 lPrimary btnAdd"><span>추가</span></a>   ');
			}
			html.push('		</div>                                                                         ');
			html.push('	</td>                                                                              ');
			html.push('</tr>                                                                               ');
		}
	}else{
		//대분류
		var tmpLclasList = fnSelectLclasList(gHedofcNo);
		var targetNum = $(".franchLclas").length;
		html.push('<tr id="tr_'+targetNum+'">                                                                               ');
		html.push('	<td class="left" style="border-top:0;border-bottom:0;">                                                                 ');
		html.push('		<div class="mFlex2">                                                          ');
		html.push('			<select class="select franchLclas" title="대분류 업종" name="franchLclas" id="franchLclas_'+targetNum+'">                                  ');
		html.push('			<option>대분류 업종</option>                                                 ');
		for(var i = 0 ; i < tmpLclasList.length ; i++){
			html.push('			<option value="'+tmpLclasList[i].lclasIndutyCode+'">'+tmpLclasList[i].lclasIndutyNm+'</option>                                                 ');
		}
		html.push('			</select>                                                                  ');
		html.push('			<select class="select frnchsMlsfc" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfc_'+targetNum+'">                                  ');
		html.push('			<option>중분류 업종</option>                                                 ');
		html.push('			</select>                                                                  ');
		html.push('			<select class="select frnchsNo" title="프랜차이즈명" name="frnchsNo" id="frnchsNo_'+targetNum+'">                                 ');
		html.push('			<option value="">프랜차이즈명</option>                                                ');
		html.push('			</select>                                                                  ');
		html.push('			<a href="javascript:fnDelBrand('+targetNum+')" class="mBtn1 lPrimary btnDelete" style="line-height:37px;height:37px;"><span>삭제</span></a>   ');
		html.push('		</div>                                                                         ');
		html.push('	</td>                                                                              ');
		html.push('</tr>											');
	}
	return html.join("");
}

/**
 * 대분류 조회
 * @returns
 */
function fnSelectLclasList(hedofcNo){
	var params = {};
	var resultList;
	params["hedofcNo"]  = gHedofcNo;
	fnGetSyncAjaxData("/fran/selectHedofcNoFranchLclasList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			resultList = _data.hedofcNoFranchLclasList;
		} else {
			alert(_data.resultMsg);
		}
	});

	return resultList;
}
/**
 * 중분류 조회
 * @returns
 */
function fnChangeMlsfcList(hedofcNo, lclasIndutyCode, targetNum){

	var params = {};
	var resultList;
	params["lclasIndutyCode"]  = lclasIndutyCode;
	params["hedofcNo"]  = hedofcNo;
	fnGetSyncAjaxData("/fran/selectHedofcNoFrnchsMlsfcList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			resultList = _data.hedofcNoFrnchsMlsfcList;
		} else {
			alert(_data.resultMsg);
		}
	});
	return resultList;
}
/**
 * 프랜차이즈 조회
 * @returns
 */
function fnSelectFran(hedofcNo, mlsfcIndutyCode, targetNum){
	var params = {};
	var resultList;
	params["hedofcNo"]  = hedofcNo;
	params["mlsfcIndutyCode"]  = mlsfcIndutyCode;
	fnGetSyncAjaxData("/fran/selectBsnSgnalList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			resultList = _data.bsnSgnalList;
		} else {
			alert(_data.resultMsg);
		}
	});
	return resultList;
}

function fnAddBrand(){
//	$(fnGetBrandHtml()).insertBefore($(".brandInfoStart"));
//	$("#brandTh").attr("rowspan",Number($("#brandTh").attr("rowspan"))+1);
	
	//대분류
	var tmpLclasList = fnSelectLclasList(gHedofcNo);
	
	var div1, div2, btn;
	
	div1 = $('<div class="hasBtn brandAdd brandAdd_'+brandAddSeq+'">');
	div2 = $('<select class="franchLclas" title="대분류 업종" name="franchLclas" id="franchLclas_'+brandAddSeq+'">');
	div2.append('  <option>대분류 업종</option>');
	for(var i = 0 ; i < tmpLclasList.length ; i++){
		div2.append('  <option value="'+tmpLclasList[i].lclasIndutyCode+'">'+tmpLclasList[i].lclasIndutyNm+'</option>');
	}
	div1.append(div2);
	
	div2 = $('<select class="frnchsMlsfc" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfc_'+brandAddSeq+'">');
	div2.append('  <option>중분류 업종</option>');
	div1.append(div2);
	
	div2 = $('<select class="frnchsNo" title="프랜차이즈명" name="frnchsNo" id="frnchsNo_'+brandAddSeq+'">');
	div2.append('	<option value="">프랜차이즈명</option>');
	div1.append(div2);
	
	div2 = $('<div class="box_btn w92 h40 white2 fs15 medium img del">');
	div2.append('<button>삭제</button>');
	div2.click(function(){
		if($("#brandArea").find(".brandAdd").length < 2){
			alert("이 이상 삭제할 수 없습니다.");
			return;
		}
		$(this).parent().remove();
	});
	div1.append(div2);
	
	brandAddSeq++;
	$("#brandArea").append(div1);
}
function fnAddMobBrand(){	
	//대분류
	var tmpLclasList = fnSelectLclasList(gHedofcNo);
	
	var div1, div2, div3;
	
	//모바일 행 입력
	div1 = $('<div class="brandAdd brandAdd_'+brandAddSeq+'">');
	div2 = $('<div class="tar">');
	div3 = $('<div class="box_btn h24 radius fs12 medium">');
	div3.append('<button>삭제</button>');
	div3.click(function(){
		if($("#mBrandArea").find(".brandAdd").length < 2){
			alert("이 이상 삭제할 수 없습니다.");
			return;
		}
		$(this).parent().parent().remove();
	});
	div2.append(div3);
	div1.append(div2);
	
	div2 = $('<select class="franchLclas w100p radius" title="대분류 업종" name="franchLclas" id="franchLclasMob_'+brandAddSeq+'">');
	div2.append('  <option>대분류 업종</option>');
	for(var i = 0 ; i < tmpLclasList.length ; i++){
		div2.append('  <option value="'+tmpLclasList[i].lclasIndutyCode+'">'+tmpLclasList[i].lclasIndutyNm+'</option>');
	}
	div1.append(div2);
	
	div2 = $('<select class="frnchsMlsfc w100p radius" title="중분류 업종" name="frnchsMlsfc" id="frnchsMlsfcMob_'+brandAddSeq+'">');
	div2.append('  <option>중분류 업종</option>');
	div1.append(div2);
	
	div2 = $('<select class="mFrnchsNo w100p radius" title="프랜차이즈명" name="frnchsNo" id="frnchsNoMob_'+brandAddSeq+'">');
	div2.append('	<option value="">프랜차이즈명</option>');
	div1.append(div2);
	
	$("#mBrandArea").append(div1);
	brandAddSeq++;
}

function fnDelBrand(rowNum){

	$("#brandTh").attr("rowspan",Number($("#brandTh").attr("rowspan"))-1);
	$("#tr_"+rowNum).remove();
	
	var tmpObj = $("#tr_0");

	for(var i = 0 ; i < $(".franchLclas").length ; i++){
		if(tmpObj.next().attr("class") != "brandInfoStart"){
			var tmpNum = i+1;
			tmpObj = tmpObj.next();
			tmpObj.attr("id","tr_"+ tmpNum);
			console.log(tmpObj.find(".franchLclas").attr("id","franchLclas_"+tmpNum));
			console.log(tmpObj.find(".frnchsMlsfc").attr("id","frnchsMlsfc_"+tmpNum));
			console.log(tmpObj.find(".frnchsNo").attr("id","frnchsNo_"+tmpNum));
			console.log(tmpObj.find("a").attr("href","javascript:fnDelBrand("+tmpNum+")"));
		}
	}
}

//이메일, 전화번호 유효성
function infoRule(telNo){
	/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	if(!emailRule.test(eMail)) {            
		alert("이메일 형식이 잘못되었습니다.")
		return false;
	}*/	
	if(telNo.length < 8){
		alert("올바른 전화번호를 입력해주세요.")
		return false;
	}
} 
