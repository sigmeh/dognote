//---------------------- testing functions --------------------//
function print(msg){$('#msgbox').append(msg);}	
function con(msg){console.log(msg)};
	
//---------------------- variable definitions --------------------//	
var cal_showing = false;
var mouseX = 0, mouseY = 0;
var note_height = $('.current_note').height();

//---------------------- load dogcal.html --------------------//		
function load_cal_html(){
	info = {'instructions':'load_html dogcal.html'};
	
	$.ajax({
		method:'post',
		url:'dognote.py',
		data: {'package': JSON.stringify(info)},
		success:function(result){
			result = JSON.parse(result);
			
			html = result['html'];
			cal = result['cal'];
			
			$('#dogcal_popup').append(html);
			generate_cal(cal);		
		}
	});
}

//---------------------- show calendar --------------------//	
function show_cal(id){
	
	if (!cal_showing){
		$('#'+id).select();
		
		$('#calendar').css({
			'margin-left':mouseX+'px',
			'margin-top':mouseY+'px'
		});
		
		$('#dogcal_popup').show();
		cal_showing = true;			
	}
}

//		
//---------------------- BUTTON CLICK EVENT HANDLERS --------------------//
//	
	$(document).on('click','#new_note',function(){			//new_note
		$(this).addClass('note_expanded');
		$('#new_note').css({'text-align':'left'});
	});

	//-------------- expand_note --------------//
	$(document).on('click','#expand_note',function(){	
		$('#note_outer').toggleClass('note_expanded');
		$('.note_line').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-6 );
		
		//$('#note_outer').css({'height':'500px'});
		/*
		$('#new_note').toggleClass('note_expanded');
		note_ribbon_height_match();	
		if ( $('#new_note').hasClass('note_expanded') ){
			$('#new_note').css({'text-align':'left'});
		}
		else{
			if ( $('#new_note').val() == 'Note'){
				$('#new_note').css({'text-align':'center'});
			}	
		}
		*/
		
	});
	
	/*
	$(document).on('resize','#note_outer',function(){
		con('resized');
	});
	*/

	//-------------- cal_box_numbered --------------//	
	$(document).on('click','.cal_box_numbered',function(){	//calendar day clicked
		d = $(this).children()[0].innerHTML.split(',')
	
		month = d[0];
		day = d[1];
		year = d[2];
	
		$('#set_meeting').val(month+' / '+day+' / '+year);
		$('#dogcal_popup').hide();
		cal_showing = false;
	});

	//-------------- mousemove --------------//
	$(document).on('mousemove',function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
	});	

	//-------------- textarea keylogger and keydown functions --------------//
	
	//$(document).ready(function(){
	
	
	$(document).on('keydown','.note_line',function(e){
		switch (e.which){
			case 9:							//simulate tab-spacer behavior
				e.preventDefault();
				$(this).val( $(this).val()+'    ' );
				break;
			
		}
	});
	
	$(document).keydown(function(e){
		con(e.which);
		
		
		switch (e.which){
			case 27:
				$('#dogcal_popup').hide();
		}
		
	});
	
	
	
	/*
	$(document).keydown(function(e){
		
		if ($('.note_line').is(':focus')){
			con($(this).attr('id'));
			if (e.which == 13){
				e.preventDefault();
				h = $(this).height();
				//con( $(this) );
				$(this).css({'height': h + $('#note_line_orig').css('height') });
				//e.preventDefault();
				
			}
			
			if (e.which == 9){
				//con('here');
				e.preventDefault();
				var note_val = $(this).val();
				con(note_val);
				$(this).val(note_val+'    ');
				
			}
			con(e.which);
		}
		
		if (e.which == 27 && cal_showing){	//if esc key pressed when cal_showing
			$('#dogcal_popup').hide();		//then hide cal
			cal_showing = false;
		}
		
		
		if (e.which == 9 && $('.note_line').is(':focus')){			
			//if tab key pressed when textarea ('.note') has focus:
			//insert four spaces (prevent default)
			e.preventDefault();
			
			
			var note_val = $(this).val();
			con(note_val);
			$(this).val(note_val+'    ');
		
		}
		
	});
	*/
	//});
//		
//---------------------- BUTTON CLICK EVENT HANDLERS  --------------------//
//	




//---------------------- auto-run load_cal_html --------------------//	
(function(){	
	load_cal_html();

})();


$(document).ready(function(){
	//$('.note_line').width( $('#note_outer').width()-4 );				//------------------------------------------
	$('.note_line').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-6 );
	autosize($('.note_line'));
	
	$('#checkbox_ribbon').height( $('#note_outer').height() );
});


//---------------------- match checkbox_ribbon height with note height --------------------//	

/*
var mouse_down_on_note = false;
function note_ribbon_height_match(){
	$('#checkbox_ribbon').height( 
		$('.note').height()+3+'px'	
	);
}
$(document).ready(function(){	
	//note_ribbon_height_match();
	note_expander_position();
	$('#note_expander').mousedown(function(e){	
		var noteX = e.pageX;
		var noteY = e.pageY;
		mouse_down_on_note = true;
		
		$(this).mousemove(function(){
			if (mouse_down_on_note){
				var note_outer_width = $('#note_outer').width();
				var note_outer_height = $('#note_outer').height();
				$('#note_outer').width(note_outer_width);
						
				//note_ribbon_height_match();
				setTimeout(function(){
					//note_ribbon_height_match();
					note_expander_position();
				},200);
			}
		});
	});
	$(this).mouseup(function(){
		mouse_down_on_note = false;
	});
});
*/

/*
$(document).ready(function(){	
	//note_ribbon_height_match();
	note_expander_position();
	$('.note').mousedown(function(){	
		mouse_down_on_note = true;
		$(this).mousemove(function(){
			if (mouse_down_on_note){		
				note_ribbon_height_match();
				setTimeout(function(){
					//note_ribbon_height_match();
					note_expander_position();
				},200);
			}
		});
	});
	$(this).mouseup(function(){
		mouse_down_on_note = false;
	});
});


*/


//---------------------- note typing event handler --------------------//

function note_expander_position(){
	
	//var offset = $('#note_outer').height() - $('.note_line').height()*$('.note_line').length - $('#note_expander').height();
	
	//var offset = $('#note_outer').height() - 16;
	//$('#note_expander').css({'margin-top':offset+'px'});
}

$(document).ready(function(){
	//con( $('#note_expander').css('border-top') );
	//$('#note_expander').css({'margin-top':})
});

$(document).keydown(function(e){
	
});
























