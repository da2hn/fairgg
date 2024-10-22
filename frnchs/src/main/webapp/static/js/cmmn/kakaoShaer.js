try {
  function sendLinkDefault(title, params, description, imgUrl) {
	  var key, link;
	  fnGetAjaxData("/fran/selectKakaoConfig.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			key = _data.kakaoConfig.key;
			link = _data.kakaoConfig.link;
		} else {
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
	
    try {
        if (Kakao) {
        	Kakao.init(key)
        };
    } catch(e) {};
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        'title': title,
        'description': "정보공개서 데이터", //(임시)해시태그 등 세부내용 작성
        'imageUrl': "/static/images/img_keymain1.jpg", //(임시)공유된 대상에서 표시될 이미지경로
        link: {
          'mobileWebUrl': linkUrl,
          'webUrl': linkUrl,
        },
      },
// 소설정보
// 최대 3가지 정보 표출 가능(우선순위 : 1.좋아요 2.댓글 3.공유 4.조회 5.구독)
//      social: {
//        likeCount: 286,      //콘텐츠의 좋아요 수
//        commentCount: 45,    //콘첸츠의 댓글 수
//        sharedCount: 845,    // 콘텐츠의 공유수
//        viewCount: 111,      // 콘텐트의 조회 수
//        subscriberCount:1111 // 콘텐츠의 구독수
//      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            'mobileWebUrl': linkUrl,
            'webUrl': linkUrl,
          },
        }
//        다중버튼 생성
//        ,
//        {
//          title: '앱으로 보기',
//          link: {
//            mobileWebUrl: 'https://developers.kakao.com',
//            webUrl: 'https://developers.kakao.com',
//          },
//        },
      ],
    })
  }; 
  window.kakaoDemoCallback && window.kakaoDemoCallback() 
}
catch(e) {
  window.kakaoDemoException && window.kakaoDemoException(e)
}