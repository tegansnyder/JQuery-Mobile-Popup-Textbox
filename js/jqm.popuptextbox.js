$(document).on("pageinit",":jqmData(role='page')", function(){

	$(":jqmData(role='page')").prepend('<div id="tpop_overlay"></div>');
	$('body').prepend('<div class="tpop tp"><textarea name="textarea" placeholder="Enter your notes"></textarea></div>');

	$(document).on("click", ":jqmData(role='tpop')", function(event) {

		event.preventDefault();
		
		if (!$(":jqmData(role='tpop')").data('tpop_open')) {
			init_tpop();
			$('.tpop').show();
			$('#tpop_overlay').show();
			$(":jqmData(role='tpop')").data('tpop_open', true);
		} else {
			tpop_save($('.tpop textarea').val());
			$('.tpop').hide();
			$('#tpop_overlay').hide();
			$(":jqmData(role='tpop')").data('tpop_open', false);
		}
		
	});
	
	$(document).on("click", "#tpop_overlay", function(event) {
		$('.tpop').hide();
		$('#tpop_overlay').hide();
		$(":jqmData(role='tpop')").data('tpop_open', false);
		tpop_save($('.tpop textarea').val());
	});
	
	$(window).on('resize', function(){
		if ($(":jqmData(role='tpop')").data('tpop_open')) {
			init_tpop();	
		}
	});

});

function tpop_save(txt) {
	//do something like save to localStorage or ajax call
	//console.log(txt);
}

function init_tpop() {
	$('.tpop').width(viewport().width - 80);
	$('.tpop').css('top', $(":jqmData(role='tpop')").offset().top - $('.tpop').height() - 30 + 'px');
	$('.tpop').css('left', '40px');
	
	$('.tpop textarea').width($('.tpop').width() - 23);
	
	setTimeout(function() {
		$('#tpop_overlay').css('top', $(":jqmData(role='header')").height() + 'px');
		$('#tpop_overlay').height(viewport().height - $(":jqmData(role='footer')").height() - $(":jqmData(role='header')").height());
	}, 200);
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
