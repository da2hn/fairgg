var fileObj = {
	fileConfig: {
		 objId:"f3"
		,windowMode:"full"
		,divId:null
		,readOnly:true
		,addCnt:"M"
		,filePath:"basic"
		,maxFileSize:"5"
		,fileType:"normal"
	},

	/*
	 * 파일 객체 초기화
	 */
	init: function(config) {
		if (typeof config ==="object") {
			this.fileConfig = config;
			this.fileConfig.maxFileSize = fileObj.calcMaxFileSize(this.fileConfig.maxFileSize);
			var superObj = this;
			var vObjId = this.fileConfig.objId;
			var html = [];
			if (this.fileConfig.windowMode == "full") {
//				html.push("<div>");
			} else {
//				html.push("<div class=\""+this.fileConfig.windowMode+"\">");
			}
			html.push("	<form class=\"form-inline\" name=\"fileForm_"+vObjId+"\" id=\"fileForm_"+vObjId+"\" method=\"post\" enctype=\"multipart/form-data\">");
			html.push("		<input type=\"hidden\" name=\"atchmnflNo\" id=\"atchmnflNo_"+vObjId+"\"/>");
			html.push("		<input type=\"hidden\" name=\"delFileSn\" id=\"delFileSn_"+vObjId+"\"/>");
			if (this.fileConfig.readOnly == false) {
//				html.push("	<div class=\"form-group  file-input\">");
//				html.push("	<label for=\"atchFile_"+vObjId+"\">파일첨부<input type=\"file\" id=\"atchFile_"+vObjId+"\" name=\"atchFile\"/></label>");
//				html.push("		<label class=\"blind bgnone\" for=\"atchFileNm_"+vObjId+"\" >파일명</label><input type=\"text\" id=\"atchFileNm_"+vObjId+"\" name=\"atchFileNm_"+vObjId+"\" readonly=\"readonly\" class=\"form-control\" />");
//				html.push("		<button id=\"btnAddFile_"+vObjId+"\" class=\"btn btn-default btn-sm bdr0\" type=\"button\">추가</button>");
//				html.push("	</div>");


				html.push("	<div class=\"mFile1\">");
				html.push("		<div class=\"gIt\"><input type=\"text\" name=\"atchFileNm_"+vObjId+"\" id=\"atchFileNm_"+vObjId+"\" class=\"it\" readonly title=\"파일첨부\"></div>");
				html.push("		<div class=\"btn\">");
				html.push("			<a href=\"javascript:void(0)\" class=\"mBtn1\">첨부파일</a>");
				html.push("			<input type=\"file\" name=\"atchFile\" id=\"atchFile_"+vObjId+"\" class=\"fileHidden\" >");
				html.push("		</div>");
				html.push("		<a href=\"javascript:void(0)\" id=\"btnAddFile_"+vObjId+"\" class=\"mBtn1 lGray btnAdd\">+ 추가</a>");
				html.push("	</div>");
				html.push("	<div class=\"mInfo1 "+vObjId+"Txt\"></div>");
			}
			html.push("	</form>");
			html.push("	<div id=\"fileList_"+vObjId+"\">");
			html.push("	</div>");
//			html.push("</div>");
			this.fileConfig.divId.html(html.join(""));
			if (this.fileConfig.readOnly == false) {
				//파일 첨부
				$(document).on("click", "#btnAddFile_"+vObjId, function() {
//					console.log("config.addCnt :: " + config.addCnt);
					if(config.addCnt == "S"){
						if($( "#fileList_"+config.objId + " div" ).length > 0){
							alert("파일은 하나만 등록 가능 합니다.");
							return;
						}
					}
					if(config.addCnt == "M3"){
						if($( "#fileList_"+config.objId + " div" ).length > 2){
							alert("파일은 3개까지 등록 가능합니다.");
							return;
						}
					}
//					console.log("config.filePath :: " + config.filePath)
					if(config.filePath == "basic"){
						fileObj.fileUpload(superObj);
					} else if (config.filePath == "dataSubm"){
						fileObj.fileUploadDataSubm();
					}

				});
				//파일 등록
				$(document).on("change", "#atchFile_"+vObjId, function() {
					if($(this).val() != ""){
						fileObj.fileConfig = superObj.fileConfig;
						//파일
						var vFile = this.files[0];
						//확장자 체크
						if(fileObj.fileConfig.fileType == "image"){
							var ext = $(this).val().split(".").pop().toLowerCase();
							if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){
								alert("gif, jpg, jpeg, png 파일만 업로드 해주세요.");
								$(this).val("");
								return;
							}
							//가로세로 길이
							var _URL = window.URL || window.webkitURL;
							var vImg = new Image();

							vImg.src = _URL.createObjectURL(vFile);
							vImg.onload = function(){
								console.log(vImg.width + " // " + vImg.height);
								if(vImg.width > 200 || vImg.height > 200){
									alert("이미지 크기를 확인해주세요.");
									$(this).val("");
									return;
								}
							}
						}
						//파일 용량체크
						if(vFile.size > fileObj.fileConfig.maxFileSize){
							alert("파일용량이 초과하였습니다.");
							$(this).val("");
							return;
						}

						var fileName = $(this).val();
						fileObj.setFileName(fileName);
					}
				});
			}

			/*
			 * 파일삭제 클릭
			 */
			$(document).on("click", ".btnDel_"+vObjId, function() {
			    var fileSn = $(this).attr("fileSn");
			    fileObj.delFile($(this), fileSn);
			});
		}

		return this;
	},

	/*
	 * maxFileSize 계
	 */
	calcMaxFileSize:function(paramFileSize){
		var returnVal;
		if(paramFileSize != null){
			returnVal = Number(paramFileSize) * 1024 * 1024;
		}
		return returnVal;
	},
	/*
	 * 선택한 파일명 설정
	 */
	setFileName: function(fileName) {
		$("#atchFileNm_"+this.fileConfig.objId).val(fileName);
	},

	/*
	 * GET 첨부파일 ID
	 */
	getatchmnflNo: function() {
		return $("#atchmnflNo_"+this.fileConfig.objId).val();
	},

	/*
	 * GET 첨부파일 ID
	 */
	setatchmnflNo: function(atchmnflNo) {
		$("#atchmnflNo_"+this.fileConfig.objId).val(atchmnflNo);
	},

	/*
	 * 첨부파일 업로드
	 */
	fileUpload: function(paramObj) {
		fileObj.fileConfig = paramObj.fileConfig;
		var $file 			= $("#atchFile_"+this.fileConfig.objId);
		var $atchmnflNo 	= $("#atchmnflNo_"+this.fileConfig.objId);
		var $delFileSn 		= $("#delFileSn_"+this.fileConfig.objId);
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		var $form			= $("#fileForm_"+this.fileConfig.objId);

		var fileUrl = $file.val();
		if(fileUrl == null || fileUrl == ""){
			alert("선택된 파일이 없습니다.");
			return;
		}

		console.log("fileUrl :: " + fileUrl);


		$form.ajaxForm({
			url: contextPath + "/file/uploadFile.do",
				dataType:"json",
				async: "false",
				beforeSend:function(){
				},
				success : function(data, status, request) {
					if(data.resultCode == 'success'){
//						alert("정상적으로 저장되었습니다.");
						$atchmnflNo.val(data.atchmnflNo);
						console.log("fileObj :: " + fileObj.fileConfig.objId);
						fileObj.getFileList(data.atchmnflNo, "FS01,FS02");
					}else{
						alert("파일 저장중 에러가 발생하였습니다.");
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("파일 저장중 에러가 발생하였습니다.");
				}
		});

		$form.submit();

	},


	/*
	 * 첨부파일 업로드
	 */
	fileUploadDataSubm: function() {
		var $file 			= $("#atchFile_"+this.fileConfig.objId);
		var $atchmnflNo 	= $("#atchmnflNo_"+this.fileConfig.objId);
		var $delFileSn 		= $("#delFileSn_"+this.fileConfig.objId);
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		var $form			= $("#fileForm_"+this.fileConfig.objId);

		var fileUrl = $file.val();
		if(fileUrl == null || fileUrl == ""){
			alert("선택된 파일이 없습니다.");
			return;
		}

		$form.ajaxForm({
			url: contextPath + "/file/dataSubmUploadFile.do",
				dataType:"json",
				async: "false",
				beforeSend:function(){
				},
				success : function(data, status, request) {
					if(data.resultCode == 'success'){
						//alert("정상적으로 저장되었습니다.");
						$atchmnflNo.val(data.atchmnflNo);
						fileObj.getFileList(data.atchmnflNo, "ALL");
					}else{
						alert("파일 저장중 에러가 발생하였습니다.");
					}
				},
				complete:function(dt){

				},error : function(data) {
					alert("파일 저장중 에러가 발생하였습니다.");
				}
		});

		$form.submit();

	},

	/*
	 * 첨부파일 목록 조회
	 */
	getFileList : function(atchmnflNo, atchmnflSttusCode) {
		console.log("getFileList==");
		console.log(this.fileConfig.objId);
		console.log("getFileList==");
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
//		console.log("this.fileConfig.objId :: " + this.fileConfig.objId )
		if (fnIsEmpty(atchmnflNo)) {
			return;
		}
		$("#atchmnflNo_"+this.fileConfig.objId).val(atchmnflNo);
		var params = {};
		params["atchmnflNo"] = atchmnflNo;	// 첨부파일번호
		params["atchmnflSttusCode"] = atchmnflSttusCode;	// 상태
		fnGetAjaxData("/file/getFileList.do", params, function(data) {
			var html = [];
//			html.push('<ul class="style-none">');
//			$(data.fileList).each(function() {
//				if (!fileObj.checkDel(this.fileSn)) {
//					html.push('<li class="bg-cyan file-box">');
//					if (fileObj.fileConfig.readOnly == false) {
//						html.push('	<button type="button" fileSn="'+this.fileSn+'" class="btnDel_'+fileObj.fileConfig.objId+' close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
//					}
//					html.push('	<a class="fileDownload"');
//					html.push(' 	href="'+contextPath+'/file/downloadFile.do?atchmnflNo='+this.atchmnflNo+'&fileSn='+this.fileSn+'&fileKey='+encodeURIComponent(this.fileKey)+'">');
//					html.push('<span>'+this.inputFileNm+'</span>');
//					html.push('	</a>');
//					html.push('</li>');
//				}
//			});
//			html.push('</ul>');
			$(data.fileList).each(function() {
				if (!fileObj.checkDel(this.fileSn)) {
					html.push('<div class="mAttach1">');
					html.push('	<span class="ls">');
					html.push('		<a href="'+contextPath+'/file/downloadFile.do?atchmnflNo='+this.atchmnflNo+'&fileSn='+this.fileSn+'&fileKey='+encodeURIComponent(this.fileKey)+'" class="ul">'+this.inputFileNm+'</a>');
					if (fileObj.fileConfig.readOnly == false) {
						html.push('		<a href="javascript:void(0)" fileSn="'+this.fileSn+'" class="iDel btnDel_'+fileObj.fileConfig.objId+'">삭제</a>');
					}
					html.push('	</span>');
					html.push('</div>');
				}
			});
			$fileListArea.html(html.join(""));
			$fileListArea.trigger('contentchanged');
		});
	},

	/*
	 * 파일삭제(서버전송)
	 */
	deleteServerFile : function() {
		if (fnIsEmptyObj($("#atchmnflNo_"+this.fileConfig.objId))) {
			return;
		}
		if (fnIsEmptyObj($("#delFileSn_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNo_"+this.fileConfig.objId).val();
		params['delFileSn'] = $("#delFileSn_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/deleteFile.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 삭제중 에러가 발생하였습니다.");
			} else {
				$("#delFileSn_"+fileObj.fileConfig.objId).val("");
			}
		}, false, "");
	},

	/*
	 * 파일삭제
	 */
	delFile : function(obj, fileSn) {

		var delFileSn = $("#delFileSn_"+this.fileConfig.objId).val();
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		if (delFileSn == "") {
			delFileSn = fileSn;
		} else {
			delFileSn += ","+fileSn;
		}

		if (this.fileConfig.filePath == "dataSubm"){
			$("#delFileSn_"+this.fileConfig.objId).val("");
		} else {
			$("#delFileSn_"+this.fileConfig.objId).val(delFileSn);
		}

//		$("#atchmnflNo_"+this.fileConfig.objId).val("");
		//obj.parentElement.style.display='none';
		$(obj).parent().parent().remove();
		$fileListArea.trigger('contentchanged');

	},

	/*
	 * 삭제파일인지 체크
	 */
	checkDel : function(fileSn) {
		var delFileSn = $("#delFileSn_"+this.fileConfig.objId).val();
		if (delFileSn == "") {
			return false;
		} else {
			var splitFileSn = delFileSn.split(",");
			for (var i = 0; i < splitFileSn.length; i++) {
				if (splitFileSn[i] == fileSn) {
					return true;
				}
			}
			return false;
		}
	},

	/*
	 * 파일상태를 정상으로 변경
	 */
	updateTmpFileToNoraml : function() {
		if (fnIsEmptyObj($("#atchmnflNo_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNo_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/updateTmpFileToNoraml.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");
	},

	/*
	 * 임시저장파일을 삭제로 변경
	 */
	updateTmpFileToDelete : function() {
		if (fnIsEmptyObj($("#atchmnflNo_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNo_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/updateTmpFileToDelete.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");

		$("#fileList_"+this.fileConfig.objId).html("");
		$("#atchFileNm_"+this.fileConfig.objId).val("");
	},

	/*
	 * 파일 업로드 완료 처리
	 */
	updateComplete : function() {
		this.deleteServerFile();
		this.updateTmpFileToNoraml();
	},

	/*
	 * 파일 업로드 목록 개수 조회
	 */
	uploadFileCount : function() {

		if($( "#fileList_"+this.fileConfig.objId + " li" ).length > 1) {
			return true;
		} else {
			return false;
		}
	}
}

