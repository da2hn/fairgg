$(document).ready(function() {

	$(".jsBtnShow1").on("click", function(){
		$( $(this).attr("href") ).show();
		return false;
	});
	$(".jsBtnClose1").on("click", function(){
		$( $(this).attr("href") ).hide();
		return false;
	});
	
});

