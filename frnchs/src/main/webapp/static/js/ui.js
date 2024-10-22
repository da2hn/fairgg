$(document).ready(function() {
	
	$(".iDel").on("click", function(){
		$(this).parent().remove();
	});
	
	$(".jsBtnShow1").on("click", function() {
		/* [M 2022-01-20] 수정 */
		$($(this).attr("href")).removeClass("hidden").show();

		/* [M 2022-01-20] 추가 S */
		var wW = window.innerWidth;
		if (wW < 751) { // mo
			if ($($(this).attr("href")).find('.con').length > 0) {
				var height = $($(this).attr("href")).find('.cont').height();
				var titleH = $($(this).attr("href")).find('h3').outerHeight(true);
				var inner = $($(this).attr("href")).find('.con');
				var btn = $($(this).attr("href")).find('.mButton1').outerHeight(true);

				inner.css({ 'height': height - titleH - btn });
				inner.mCustomScrollbar();
			}
		}
		/* [M 2022-01-20] 추가 E */

		return false;
	});
	
	$(".jsBtnClose1").on("click", function(){
		$( $(this).attr("href") ).hide();
		return false;
	});
	
	$(".iTop").on("click", function(){
		$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
		return false;
	});
	
	/* add20201229 */
	$("input[id='hamburger']").on("click", function(){
		if ( $("input[id='hamburger']").is(":checked") == true )
			$(".header").addClass("all");
		else
			$(".header").removeClass("all");
	});
	/* //add20201229 */

	$(".mSelect1 .sel").on("click", function(){
		if ( $(this).parent().hasClass("selected") )
			$(this).parent().removeClass("selected");
		else
			$(this).parent().addClass("selected");
		return false;
	});

	$(".iFavor").on("click", function(){
		if ( $(this).hasClass("selected") )
			$(this).removeClass("selected");
		else
			$(this).addClass("selected");
		return false;
	});

	$(".mList4 dt .sel").on("click", function(){
		if ( $(this).parent().hasClass("selected") )
		{
			$(this).parent().removeClass("selected");
			$(this).parent().next().removeClass("selected");
		}
		else
		{
			$(this).parent().addClass("selected");
			$(this).parent().next().addClass("selected");
		}
		return false;
	});

	$(".gBtn1 a").on("click", function(){
		$(this).parent().children().removeClass("selected");
		$(this).addClass("selected");
		return false;
	});

	$(".lRule2 a").on("click", function(){
		$(this).parent().children().removeClass("selected");
		$(this).addClass("selected");
		return false;
	});
	
	/* add20210202 */
	$(".jsTab1 a").on("click", function(){
		$(this).parent().children().removeClass("selected");
		$(this).addClass("selected");
		$(this).parent().parent().children(".tabCont").addClass("hidden");
		$( $(this).attr("href") ).removeClass("hidden");
		return false;
	});
	/* //add20210202 */


});