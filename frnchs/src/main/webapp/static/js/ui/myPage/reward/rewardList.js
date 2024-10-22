$(document).ready(function() {
	//상점부여 이동
	/*$("#btnInfo").click(function(){
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chk']:checked").val();
		var checkCount = $("input:checkbox[name='chk']:checked").length;
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(checkCount > 1) {
			alert("1개의 항목만 선택해주세요.");
			return;
		}

		$("#hedofcNo").val(checkedVal);
		$("#reqForm").attr("action", '/myPage/fran/reward/rewardInfo.do');
		$("#reqForm").submit();	
	});*/
	
	$("#mtltyNm").on("keypress",function(event){
		if(event.keyCode == 13) {
			fn_selectRewardList(1);
		}
	});
	
	$("#mtltyNmMob").on("keypress",function(event){
		$("#mIdClass").val($("#ldClassMob option:selected").val());
		$("#mMdClass").val($("#mdClassMob option:selected").val());
		$("#mMtltyNm").val($("#mtltyNmMob").val());
		if(event.keyCode == 13) {
			$("#dataTbodyMob").empty();
			fn_selectMobRewardList(1);
		}
	});
	
	$("#btnSearch").click(function(){
		fn_selectRewardList(1);
	});
	
	//삭제처리
	$("#btnApprove").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 프랜차이즈 본사의 상벌을 삭제하시겠습니까?")) {
			var params = {};
			params["hedofcNoArr"] = checkedValArr.join(",");

			fnGetAjaxData("/myPage/fran/reward/updateRewardDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectRewardList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	//모바일 상점부여 이동
	/*$("#btnInfoMob").click(function(){
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chkM']:checked").val();
		var checkCount = $("input:checkbox[name='chkM']:checked").length;
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(checkCount > 1) {
			alert("1개의 항목만 선택해주세요.");
			return;
		}
		
		$("#hedofcNo").val(checkedVal);
		$("#reqForm").attr("action", '/myPage/fran/reward/rewardInfo.do');
		$("#reqForm").submit();	
	});*/
	
	$("#btnSearchMob").click(function(){
		$("#mIdClass").val($("#ldClassMob option:selected").val());
		$("#mMdClass").val($("#mdClassMob option:selected").val());
		$("#mMtltyNm").val($("#mtltyNmMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobRewardList(1);
	});
	
	//모바일 삭제처리
	$("#btnApproveMob").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 프랜차이즈 본사의 상벌을 삭제하시겠습니까?")) {
			var params = {};
			params["hedofcNoArr"] = checkedValArr.join(",");
			
			fnGetAjaxData("/myPage/fran/reward/updateRewardDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_selectMobRewardList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnMobSearch").click(function() {
		$("#mIdClass").val($("#ldClassMob option:selected").val());
		$("#mMdClass").val($("#mdClassMob option:selected").val());
		$("#mMtltyNm").val($("#mtltyNmMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobTradeList(1);
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobRewardList(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	//대분류 중분류
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		$("#ldClass").empty();

		_data.franchLclasList.forEach(function(row,idx){
			if( row.lclasIndutyCode == "LC00" ){
				$("#ldClass").append('<option value="">' + row.lclasIndutyNm + '</option>');
			}else{
				$("#ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});

		$("#ldClass").off("change").on("change",function(e){
			$("#mdClass").empty();

			var selectedVal = $('#ldClass:visible').val();
			$("#ldClass").val( selectedVal );
			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
				if (selectedVal == ''){
					$("#mdClass").append('<option value=""> 중분류 전체 </option>');
				}
				_data.frnchsMlsfcList.forEach(function(row,idx){
					if( row.mlsfcIndutyCode == "Z1" || row.mlsfcIndutyCode == "Z2" || row.mlsfcIndutyCode == "Z3"){
						$("#mdClass").append('<option value="">' + row.mlsfcIndutyNm + '</option>');
					}else{
						$("#mdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
					}
				});

				/*$("#mdClass").off("change").on("change",function(e){
					fn_selectRewardList();
				});

				fn_selectRewardList();*/
			});
		});
	});
	
	//모바일 분류
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		$("#ldClassMob").empty();
		
		_data.franchLclasList.forEach(function(row,idx){
			if( row.lclasIndutyCode == "LC00" ){
				$("#ldClassMob").append('<option value="">' + row.lclasIndutyNm + '</option>');
			}else{
				$("#ldClassMob").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
			
		});
		
		
		$("#ldClassMob").off("change").on("change",function(e){
			$("#mdClassMob").empty();
			
			var selectedVal = $('#ldClassMob:visible').val();
			$("#ldClassMob").val( selectedVal );
			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
				if (selectedVal == ''){
					$("#mdClassMob").append('<option value=""> 중분류 전체 </option>');
				}
				_data.frnchsMlsfcList.forEach(function(row,idx){
					if( row.mlsfcIndutyCode == "Z1" || row.mlsfcIndutyCode == "Z2" || row.mlsfcIndutyCode == "Z3"){
						$("#mdClassMob").append('<option value="">' + row.mlsfcIndutyNm + '</option>');
					}else{
						$("#mdClassMob").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
					}
				});
				
				/*$("#mdClassMob").off("change").on("change",function(e){
					fn_selectMobRewardList();
				});
				
				fn_selectMobRewardList();*/ 
			});
		});
	});
	
	//조회
	fn_selectRewardList(1);
	fn_selectMobRewardList(1);
});

//목록 조회
function fn_selectRewardList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/fran/reward/rewardList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				
				dataList.forEach(function(data,idx){
					var rewardDt = data.rewardDt == null ? '-' : data.rewardDt;
					var dataTr = "";
					dataTr += '<tr>';
					if($("#hedofcNoCheck").val() == data.hedofcNo){
						dataTr += '<td>-</td>';
					}else{
						dataTr += '<td><span class="mCheckbox notext"><input type="checkbox" id="chk'+data.hedofcNo+'_'+i+'" name="chk" title="선택" value="'+data.hedofcNo+'"><label for="chk'+data.hedofcNo+'_'+i+'">선택</label></span></td>';
					}
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+data.lclasIndutyNm+'</td>';
					dataTr += '<td>'+data.mlsfcIndutyNm+'</td>';
					dataTr +=  '<td><a href="javascript:void(0);" onclick="fn_rewardInfo('+data.hedofcNo+')" class="ul" style="padding:0px 0px 0px 0px">';
					dataTr += data.mtltyNm+'</td></a>';
					dataTr += '<td>'+data.adres+'</td>';
					dataTr += '<td>'+data.rewardCount+'회</td>';
					dataTr += '<td>'+rewardDt+'</td>';
					dataTr += '</tr>';
					$("#hedofcNoCheck").val(data.hedofcNo);
					$("#dataTbody").append(dataTr);
				})
			} else {
				$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

function fn_selectMobRewardList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/fran/reward/rewardList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					//var rewardDt = data.rewardDt == null ? '-' : data.rewardDt;
					dataMobTr += '<li>';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 30px">';
					if($("#hedofcNoCheck").val() == data.hedofcNo){
						dataMobTr += '<p class="check" style="padding-left:3px">';
						dataMobTr += '-';
					}else{
						dataMobTr += '<p class="check">';
						dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.hedofcNo+'" value="'+data.hedofcNo+'" class="hidden notxt">';
						dataMobTr += '    <label for="chkM'+data.hedofcNo+'"></label>';
					}
					dataMobTr += '  </p>';
					dataMobTr += '<a href="javascript:void(0);" onclick="fn_rewardInfo('+data.hedofcNo+')" class="ul" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					dataMobTr += '</div>';
					dataMobTr += '    <p class="subject"> '+data.lclasIndutyNm+' - '+data.mlsfcIndutyNm+'</p>'; 
					dataMobTr += '    <p class="subject">'+data.mtltyNm+'</p>'; 
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>수상횟수 </strong>'+data.rewardCount+'회</span>';
					if(data.rewardDt != null){
					dataMobTr += '      <span><strong>최근 수상일 </strong>'+data.rewardDt+'</span>';
					}
					dataMobTr += '    </p>';
					dataMobTr += '  </a>';
					dataMobTr += '</div>';
					dataMobTr += '</li>';
					$("#hedofcNoCheck").val(data.hedofcNo);
				})
				$("#dataTbodyMob").append(dataMobTr);
			} else {
				$("#dataTbodyMob").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_rewardInfo(checkedVal) {
	$("#hedofcNo").val(checkedVal);
	$("#reqForm").attr("action", '/myPage/fran/reward/rewardInfo.do');
	$("#reqForm").submit();
}