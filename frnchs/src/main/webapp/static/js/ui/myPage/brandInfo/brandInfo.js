var fObj = null;
var m_fObj = null;

$(document).ready(function() {

	fn_init();

	$("#btn_insert").click(function() {
		fn_modifyFrnchsInfo();
	});
	
	$("#btnDropMob").click(function(){
		location.href = "/myPage/brandInfo/brandInfoList.do";
	});
	$("#btnModifyMob").click(function(){
		fn_mobModifyFrnchsInfo()
	});

	$("#frnchsImageFile").on("change", function() {
		readURL(this);
	});
	$("#mFrnchsImageFile").on("change", function() {
		readMobURL(this);
	});
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imgArea').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function readMobURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#mImgArea').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

function fn_init() {

	// 첨부파일
	var bEntrprsIntrcnFileNo = $("#entrprsIntrcnFileNo").val() == null ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M3", filePath:"basic", maxFileSize:"3", fileType:"normal", tmpDel:bEntrprsIntrcnFileNo});
	fObj.init();

	fObj.getFileList($("#entrprsIntrcnFileNo").val(), "FS02");
	
	m_fObj = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#mAtchFileDiv"), readOnly:false, addCnt:"M3", filePath:"basic", maxFileSize:"3", fileType:"normal", tmpDel:bEntrprsIntrcnFileNo});
	m_fObj.init();
	
	m_fObj.getFileList($("#entrprsIntrcnFileNo").val(), "FS02");

}

function fn_modifyFrnchsInfo() {
	if (fn_isValid()) {
		// 첨부파일
		$('#entrprsIntrcnFileNo').val(fObj.getatchmnflNo() == '' || fObj.getatchmnflNo() == 0 ? null : fObj.getatchmnflNo());

		$("#dataForm").ajaxForm({
			url: '/myPage/expr/frnchsInfo/modifyFrnchsInfo.ajax',
			dataType:"json",
			beforeSend:function(){
			},
			success : function(data, status, request) {
				alert(data.resultMsg);
				if(data.resultCode == 'success'){
					if (fObj != null) {
						// 첨부파일 업로드 완료 처리
						fObj.updateComplete();
						fObj.getFileList($("input[name='entrprsIntrcnFileNo']").val(), "FS02");
					}
//					fn_refresh();
				}
			},
			complete:function(dt){

			},error : function(data) {
				alert("에러가 발생하였습니다.");
			}
		}).submit();
	}
}
function fn_mobModifyFrnchsInfo() {
	if (fn_mobIsValid()) {
		// 첨부파일
		$('#mEntrprsIntrcnFileNo').val(m_fObj.getatchmnflNo() == '' || m_fObj.getatchmnflNo() == 0 ? null : m_fObj.getatchmnflNo());
		
		$("#mDataForm").ajaxForm({
			url: '/myPage/expr/frnchsInfo/modifyFrnchsInfo.ajax',
			dataType:"json",
			beforeSend:function(){
			},
			success : function(data, status, request) {
				alert(data.resultMsg);
				if(data.resultCode == 'success'){
					if (m_fObj != null) {
						// 첨부파일 업로드 완료 처리
						m_fObj.updateComplete();
						m_fObj.getFileList($("#mEntrprsIntrcnFileNo").val(), "FS02");
					}
				}
			},
			complete:function(dt){
				
			},error : function(data) {
				alert("에러가 발생하였습니다.");
			}
		}).submit();
	}
}

function fn_isValid() {
	if(!$.trim($("[name=frnchsInfo]").val())) {
		alert("브랜드 정보을 입력해주세요.");
		$("#frnchsInfo").focus();
		return false;
	}
	if(!$("#imgY").val() && !$("#fileName").val()) {
		alert("브랜드 이미지를 입력해주세요.");
		return false;
	}
	return true;
}
function fn_mobIsValid() {
	if(!$.trim($("#mFrnchsInfo").val())) {
		alert("브랜드 정보을 입력해주세요.");
		$("#mFrnchsInfo").focus();
		return false;
	}
	if(!$("#imgY").val() && !$("#mFileName").val()) {
		alert("브랜드 이미지를 입력해주세요.");
		return false;
	}
	return true;
}

function fn_refresh() {
	$("#dataForm").attr("action","/myPage/brandInfo/brandInfo.do");
	$("#dataForm").submit();
}