var fObj = null;
var fObj = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
var addCnt = "S";
var maxFileSize = "500";
var fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
var fileType = "video";

$(document).ready(function() {
	
	fn_init();

	$("#btn_moidfy").click(function() {
		if($("input#type").val() == "insert") {
			fn_insertInfo();
		} else {
			fn_updateInfo();
		}
	});
});

function fn_init() {
	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
	fObj.init();
	$(".f1Txt").html(fileTxt);
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
}

function fn_insertInfo() {
	if(fn_isValid()) {
		if(confirm("등록하시겠습니까?")){
			$('#atchmnflNo').val(fObj.getatchmnflNo() == '' ? null : fObj.getatchmnflNo());
			var url = '/sysMngr/'+ $("input#type").val() +'fairTradeVideoInfo.ajax';
			
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
							
						location.href = '/sysMngr/video/fairTrade/fairTradeVideo.do';
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("에러가 발생하였습니다.");
				}
			});
			$("#dataForm").submit();
		}
	}
}

function fn_deleteNotice() {
	if (confirm("삭제하시겠습니까?")) {
		// 첨부파일
		$('#atchmnflNo').val(fObj.getatchmnflNo());

		var	url = "/sysMngr/deleteFairTradeVideList.ajax";

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
						
					location.href = '/sysMngr/video/fairTrade/fairTradeVideo.do';
				}
			},
			complete:function(dt){

			},error : function(data) {
				alert("에러가 발생하였습니다.");
			}
		});
		$("#dataForm").submit();
	}
}


function fn_updateInfo() {
	if(fn_isValid()) {
		if(confirm("수정하시겠습니까?")){
			$('#atchmnflNo').val(fObj.getatchmnflNo());
			
			var url = '/sysMngr/'+ $("input#type").val() +'fairTradeVideoInfo.ajax';
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
							
						location.href = '/sysMngr/video/fairTrade/fairTradeVideo.do';
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("에러가 발생하였습니다.");
				}
			});
			$("#dataForm").submit();
		}
	}
}

function fn_isValid() {
	if(!$.trim($("[name=sj]").val())) {
		alert("홍보동영상 제목을 입력해주세요.");
		$("[name=sj]").focus();
		return false;
	}
	
	if(!$("[name=fairTradeSeCode]").val()) {
		alert("동영상구분을 선택해주세요.");
		$("[name=fairTradeSeCode]").focus();
		return false;
	}
	
	if(!$("[name=pstSrtDt]").val()) {
		alert("게시 기간 시작일자를 입력해주세요.");
		$("[name=pstSrtDt]").focus();
		return false;
	}
	if(!$("[name=pstAndDt]").val()) {
		alert("게시 기간 종료일자를 입력해주세요.");
		$("[name=pstAndDt]").focus();
		return false;
	}
	
	//스마트에디터 textarea 유효성검사
	oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD", []);
    var cn = $("#cn").val();
    cn = cn.replace(/&nbsp;/gi,"");
    cn = cn.replace(/<p><br><\/p>/gi,"");
    cn = cn.replace(/ /gi,"");
    if( cn == ""  || cn == null || cn == '<p></p>')  {
         alert("게시내용을 입력해주세요.");
         oEditors.getById["cn"].exec("FOCUS"); //포커싱
         return false;
    }
	return true;
}
