var fObj = null;
var mfObj = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
//var addCnt = "M3";
var addCnt = "S";
var maxFileSize = "5";
/*var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';*/
var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하의 파일만 등록 가능합니다.</p>';
var fileType = "normal";

$(document).ready(function(){
	
	if($("#atchmnflNo").val() == "0") {
		$("#atchmnflNo").val("");
	}
	//파일첨부 세팅
	fn_init();
 	
	fn_mobInit();
	
	$(".ldClass").empty();
	$(".ldClass").append('<option value="">- 대분류 -</option>');
	//대분류 조회
	if($("#userSeCode").val() == "US03"){
		fnGetSyncAjaxData("/fran/selectHedofcNoFranchLclasList.ajax", {hedofcNo:$("#hedofcNo").val()}, function(_data) {
			_data.hedofcNoFranchLclasList.forEach(function(row,idx){
				$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			});
		});
	} else {
		fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
			_data.franchLclasList.forEach(function(row,idx){
				if( !~row.lclasIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
					$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
				}
			});
		});
	}
	
	//수정시 데이터 조회 되있을 경우
	fn_infoDcsDataSet();
	
	//대분류 변경시
	$("#infoLdClass").off("change").on("change",function(e){
		fnChangeLd();
	});
	
	//중분류 변경시
	$("#brandMdClass").off("change").on("change",function(e){
		$("#infoFrcClass").html('');
		$("#infoFrcClass").append('<option value="">- 프랜차이즈 -</option>');		
		
		if($("#userSeCode").val() == "US03"){
			fnGetSyncAjaxData("/fran/selectBsnSgnalList.ajax", {mlsfcIndutyCode: $("#brandMdClass:visible").val(), hedofcNo:$("#hedofcNo").val()}, function(_data) {
				_data.bsnSgnalList.forEach(function(row,idx){
					$("#infoFrcClass").append('<option value="' + row.frnchsNo + '">' + row.bsnSgnal + '</option>');
				});
			});
		} else {
			openFrchsPop();
		}
	});
	
	$("#infoFrcClass").click(function(){
		if($(".mdClass").val()){
			if($("#userSeCode").val() != "US03"){
				openFrchsPop();
			}
		}
	});
	
	//대분류 변경시
	$("#infoLdClassM").off("change").on("change",function(e){
		fnChangeLdMob();
	});
	
	//브랜드중분류 변경시---------------------------------------------------------------------------------------------------------------------
	$("#brandMdClassM").off("change").on("change",function(e){
		$("#infoFrcClassM").html('');
		$("#infoFrcClassM").append('<option value="" selected disabled hidden>- 프랜차이즈 -</option>');		

		
		if(!$("#brandMdClassM").val()){
			$("#infoFrcClassM").attr('disabled', 'disabled');
		}else{
			$("#infoFrcClassM").attr('disabled', false);
		}

		var params = {};//업종이랑 프랜차이즈명 like로
		params.jobCode  = $('#brandMdClassM:visible').val();
//		params.frchsNm  = $("#searchFrchsNmMob").val();
		params.frchsNm  = '';
		fnGetAjaxData("/stat/selectFrchsList.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
					var tmpHtml = [];
					if(_data.dataList.length > 0){
						_data.dataList.forEach(function(row,idx){
							$("#infoFrcClassM").append('<option value="' + row.frnchsNo + '">' + row.bsnSgnal + '</option>');
						});
					} 
			} else {
				console.log("fail msg",_data.resultMsg);
			}
		});
	});
/*	//중분류 변경시
	$("#brandMdClassM").off("change").on("change",function(e){
		openFrchsPopMob();
	});*/
	
	$("#infoFrcClassM").click(function(){
		if($("brandMdClassM").val()){
			openFrchsPopMob();
		}
	});
	
	function fn_updateInfoDcs(type) {
		var url = "";
		if(confirm(type == "insert" ? "등록하시겠습니까?" : "수정하시겠습니까?")){
			$('#atchmnflNo').val(fObj.getatchmnflNo() == '' || fObj.getatchmnflNo() == 0 ? null : fObj.getatchmnflNo());
			
			if(type == "insert") {
				url = "/insertInfoDcsEnrol.ajax";
			} else {
				url = "/updateInfoDcsEnrol.ajax";
			}
			
			$("#dataForm").ajaxForm({
				url: url,
				dataType:"json",
				async: "false",
				beforeSend:function(){
				},
				success : function(data, status, request) {
					if(data.resultCode == 'success'){
						alert(data.resultMsg);
						if (fObj != null) {
							// 첨부파일 업로드 완료 처리
							fObj.updateComplete();
							fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
						}
							
						location.href = '/myPage/board/infoDcsInfo/infoDcsInfo.do';
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("에러가 발생하였습니다.");
				}
			});
			$("#dataForm").submit();
		}
	};
	
	function fn_updateInfoDcsMob(type) {
		var url = "";
		if(confirm(type == "insert" ? "등록하시겠습니까?" : "수정하시겠습니까?")){
			$('#atchmnflNo').val(fObj.getatchmnflNo() == '' || fObj.getatchmnflNo() == 0 ? null : fObj.getatchmnflNo());
			
			if(type == "insert") {
				url = "/insertInfoDcsEnrol.ajax";
			} else {
				url = "/updateInfoDcsEnrol.ajax";
			}
			
			$("#mDataForm").ajaxForm({
				url: url,
				dataType:"json",
				async: "false",
				beforeSend:function(){
				},
				success : function(data, status, request) {
					if(data.resultCode == 'success'){
						alert(data.resultMsg);
						if (fObj != null) {
							// 첨부파일 업로드 완료 처리
							fObj.updateComplete();
							fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
						}
							
						location.href = '/myPage/board/infoDcsInfo/infoDcsInfo.do';
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("에러가 발생하였습니다.");
				}
			}).submit();
		}
	};
	
	//등록
	$("#btn_insert").click(function(){
		if(fn_infoDcs("w")) {
			fn_updateInfoDcs("insert");
		}
	});
	$("#btn_insertMob").click(function(){
		if(fn_infoDcs("m")) {
			fn_updateInfoDcsMob("insert");
		}
	});
	
	//수정
	$("#btn_update").click(function(){
		if(fn_infoDcs("w")) {
			fn_updateInfoDcs("update");
		}
	});
	$("#btn_updateMob").click(function(){
		if(fn_infoDcs("m")) {
			fn_updateInfoDcsMob("update");
		}
	});
	
	//모든 종류의 이진 데이터 타입만 등록 가능하도록 해둠  type : "application"
	$("input[name=atchFile]").change(function(fileInput){
		var files = fileInput.target.files;
		 for (var i = 0; i < files.length; i++) {
		    var name = files[i].name;
		    var type = files[i].type;
		    if(type.indexOf("application") == -1) {
		    	alert("pdf 및 문서 파일만 업로드 해주세요.");
		    	return false;
		    }
		  }
	});
});

//수정시 데이터 세팅 
function fn_infoDcsDataSet() {
	if($("#infoData").val()) {
		var mNm = $("#mlsfcIndutyNm").val();
		var mCode = $("#mlsfcIndutyCode").val();
		var lNm = $("#lclasIndutyNm").val();
		var lCode = $("#lclasIndutyCode").val();
		var frnchsNm = $("#frnchsNm").val();
		var frnchsNo = $("#frnchsNo").val();
		var year = $("#year").val();
		
		$(".mdClass").append('<option value="' + mCode + '">' + mNm + '</option>');
		$(".ldClass").append('<option value="' + lCode + '">' + lNm + '</option>');
		$(".frcClass").append('<option value="' + frnchsNo + '">' + frnchsNm + '</option>');

		$(".mdClass").val(mCode).prop("selected", true).prop('disabled',true);
		$(".ldClass").val(lCode).prop("selected", true).prop('disabled',true);
		$(".frcClass").val(frnchsNo).prop("selected", true).prop('disabled',true);
		
	}
};

function fn_init() {
	//초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	
	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
	fObj.init();
	$(".f1Txt").html(fileTxt);
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
}

function fn_mobInit() {
	//초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	mfObj = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#mAtchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
	mfObj.init();
	$(".f1Txt").html(fileTxt);
	mfObj.getFileList($("#atchmnflNo").val(), "FS02");
}

function fnChangeLd(){
	$("#brandMdClass").empty();
	$("#brandMdClass").append('<option value="">- 중분류 -</option>');

	$("#infoFrcClass").html('');
	$("#infoFrcClass").append('<option value="">- 프랜차이즈 -</option>');

	var selectedVal = $('#infoLdClass:visible').val();
	$("#infoLdClass").val(selectedVal);
	if($("#userSeCode").val() == "US03"){
		fnGetSyncAjaxData("/fran/selectHedofcNoFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal, hedofcNo:$("#hedofcNo").val()}, function(_data) {
			_data.hedofcNoFrnchsMlsfcList.forEach(function(row,idx){
				if( !~row.mlsfcIndutyNm.indexOf("전체") ){
					$("#brandMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
				}
			});
		});
	} else {
		fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
			_data.frnchsMlsfcList.forEach(function(row,idx){
				if( !~row.mlsfcIndutyNm.indexOf("전체") ){
					$("#brandMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
				}
			});
		});
	}
}

function fnChangeLdMob(){
	$("#brandMdClassM").empty();
	$("#brandMdClassM").append('<option value="">- 중분류 -</option>');
	
	$("#infoFrcClassM").html('');
	$("#infoFrcClassM").append('<option value="">- 프랜차이즈 -</option>');
	
	if(!$("#infoLdClassM").val()){
		$("#brandMdClassM").attr('disabled', 'disabled');
		$("#infoFrcClassM").attr('disabled', 'disabled');
	}else{
		$("#brandMdClassM").attr('disabled', false);
	}
	
	var selectedVal = $('#infoLdClassM:visible').val();
	$("#infoLdClassM").val(selectedVal);
	fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
		_data.frnchsMlsfcList.forEach(function(row,idx){
			if( !~row.mlsfcIndutyNm.indexOf("전체") ){
				$("#brandMdClassM").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
			}
		});
	});
}

//등록(체크)
function fn_infoDcs(type) {
	if(!$(".ldClass:visible").val()){
		alert("대분류를 선택해주세요.");
		return;
	}
	if(!$(".mdClass:visible").val()){
		alert("중분류를 선택해주세요.");
		return;
	}
	if(!$(".frcClass:visible").val()){
		alert("프랜차이즈를 선택해주세요.");
		return;
	}
	
	if(type == "m") {
		if(!$("#infoYearM option:selected").val()){
			alert("년도를 선택해주세요.");
			return;
		}
		if($("#fileListMob_f2").find('li').length == 0) {
			alert("정보공개서를 첨부해주세요.");
			return;
		}
	} else {
		if(!$("#infoYear option:selected").val()){
			alert("년도를 선택해주세요.");
			return;
		}
		if($("#fileList_f1").find('div').length == 0) {
			alert("정보공개서를 첨부해주세요.");
			return;
		}
	}
	return true;
};