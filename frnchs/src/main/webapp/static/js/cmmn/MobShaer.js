function sendLinkDefault(title, params, description, imgUrl) {
	var key, link;
	fnGetAjaxData("/fran/selectKakaoConfig.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
//			key = _data.kakaoConfig.key;
			link = _data.kakaoConfig.link;
		}else {
			console.log("fail msg",_data.resultMsg);
		}  
	});
	var linkUrl = link;
	if(params.frnchsNo){
		linkUrl += params.frnchsNo;
	}
	if(params.brandYear){
		linkUrl += "&brandYear=" + params.brandYear;
	}	  
	if(navigator.share) {
		alert('Thanks for sharing! yee');
		navigator.share({
		      title: title,
		      text: "정보공개서 데이터",
		      url: linkUrl
		}).then(() => {
//			alert('Thanks for sharing!');
		}).catch(alert(error));
	 }else {
//		alert('Thanks for sharing! fuck');
	 }
};