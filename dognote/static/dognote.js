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
//---------------------- button click event handlers --------------------//
//	
	$(document).on('click','#new_note',function(){			//new_note
		$(this).addClass('note_expanded');
		$('#new_note').css({'text-align':'left'});
	});

	//-------------- expand_note --------------//
	$(document).on('click','#expand_note',function(){		
		$('#new_note').toggleClass('note_expanded');
		if ( $('#new_note').hasClass('note_expanded') ){
			$('#new_note').css({'text-align':'left'});
			
		}
		else{
			if ( $('#new_note').val() == 'Note'){
				$('#new_note').css({'text-align':'center'});
			}	
		}
	});

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

	//--------------keydown --------------//
	$(document).keydown(function(e){

		if (e.which == 27 && cal_showing){	//if esc key pressed when cal_showing
			$('#dogcal_popup').hide();		//then hide cal
			cal_showing = false;
		}
		
		if (e.which == 9 && $('.note').is(':focus')){			
			//if tab key pressed when textarea ('.note') has focus:
			//insert four spaces (prevent default)
			e.preventDefault();
			var note_val = $('.note').val();
			$('.note').val(note_val+'    ');
		
		}
	});
//		
//---------------------- button click event handlers	--------------------//
//	




//---------------------- auto-run load_cal_html --------------------//	
(function(){	
	load_cal_html();
	
	var checking_note = setInterval(function(){
		if ( $('.note').is(':focus') ){
			
		}
	},1000);
})();

$(document).ready(function(){
	$('.current_note').on('mouseup',function(){
		note_height = $('.current_note').height();
		con(note_height);
		$('#checkbox_ribbon').css({'height':note_height+'px'});
	});

});

