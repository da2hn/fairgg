<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 팝업 미리보기 */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>팝업 미리보기</title>
	<link type="text/css" rel="stylesheet" href="/css/egovframework/sample.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
	<script type="text/javascript" src="/js/jquery/js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="/js/cmmn/common.js"></script>
	<script type="text/javascript" src="/js/cmmn/pagination.js"></script>
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	
	<!-- jExcel -->
	<script src="https://bossanova.uk/jexcel/v3/jexcel.js"></script>
	<script src="https://bossanova.uk/jsuites/v2/jsuites.js"></script>
	<link rel="stylesheet" href="https://bossanova.uk/jexcel/v3/jexcel.css" type="text/css" />
	<link rel="stylesheet" href="https://bossanova.uk/jsuites/v2/jsuites.css" type="text/css" />
	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<!-- defer를 boolean으로 설정하지 않으면 false인데 이게 true이면 페이지가 모두 로드된 후에 이 스크립트가 실행됨을 얘기함. -->
	<!-- src가 명시되지 않은 inline스크립트인 경우에는 사용하면 안됨. 그런데 지금 그 상황임 -->
	<!-- 스크립트가 서로 실행되는 순서가 중요하다면 defer를 쓰고 그게 아니면 async를 쓴다 -->
	
	<style>
	.clickable{}
	
	</style>
	<script type="text/javaScript" language="javascript" defer="defer">
	
	</script>
</head>

<body>

<div id="container">
	<img src="${resultData.filePath }"></img>
</div>
	


</body>
</html>
