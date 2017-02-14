//---------------------- testing functions --------------------//
function print(msg){$('#msgbox').append(msg);}	
function con(msg){console.log(msg)};
	
//---------------------- variable definitions --------------------//	
var cal_showing = false;
var mouseX = 0, mouseY = 0;
var note_height = $('.current_note').height();
var white_space_chars = [' ','\n','\t','\r'];

//---------------------- LOAD CALENDAR --------------------//		
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

//---------------------- SHOW CALENDAR --------------------//	
//
// a delay in show_cal allows for key log before cal_showing == true
// in order to hide dogcal_popup when anything else is clicked
function show_cal(id){

	//Add functionality to show selected date(month) if date was previously selected when a hidden calendar is shown

	setTimeout(function(){
		if (!cal_showing){
			$('#'+id).select();
		
			$('#calendar').css({
				'margin-left':mouseX+'px',
				'margin-top':mouseY+'px'
			});
		
			$('#dogcal_popup').show();
			cal_showing = true;			
		}
	},1);
}

function clear_data(){
	$('#name_ta').val('Name');
	$('#set_meeting').val('Date (Open)');
	$('#note_lines').val('');
	$('#checkbox_ribbon').html('');
	$('.dummy_text').remove();
}

//----------------------------------------------------------//
//---------------------- EVENT HANDLERS --------------------//
//----------------------------------------------------------//
	
	//-------------- clear_data --------------//
	$(document).on('click','#clear_data',function(){
		clear_data();
	});
	
	//-------------- expand_note --------------//
	$(document).on('click','#new_note',function(){			
		$(this).addClass('note_expanded');
		$('#new_note').css({'text-align':'left'});
	});
	//-------------- expand_note --------------//
	$(document).on('click','#expand_note',function(){	
		$('#note_outer').toggleClass('note_expanded');
		$('#note_lines').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
		$('#checkbox_ribbon').height( $('#note_outer').height() );
		$('#note_lines').height( $('#note_outer') );
		$('.dummy_text').width( $('#note_lines').width() );
		//$('.dummy_text').show();
		
		for (i=0; i< $('.dummy_text').length; i++){
			//eliminate overflow .dummy_text and .checkbox
			
			//con($('.dummy_text')[i].getBoundingClientRect().top+' dummy');
			//con($('#note_outer')[0].getBoundingClientRect().bottom+' note_outer');
			
			if ( $('.dummy_text')[i].getBoundingClientRect().top > $('#note_outer')[0].getBoundingClientRect().bottom ){
				
				//$('.dummy_text').remove();
				//$('.dummy_text')[i].style.display = 'none';
				con('none');
				//con($('.dummy_text')[i].style.display);
			}
			//$('.dummy_text')[dtl-1].getBoundingClientRect().bottom;
		}
		
		sections_check('pass');
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

	//-------------- select date --------------//	
	//adjust the date input field based on new user-selected date
	$(document).on('click','.cal_box_numbered',function(){	
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
	

//inserts '    ' when tab is pressed and places cursor at the end of the insertion
function insert_text(text, el){
	var cursorPos = el.prop('selectionStart');
	var line = el.val();
	line = line.substring(0, cursorPos) +text+ line.substring(cursorPos, line.length);
	
	el.val( line );
	el.selectRange(cursorPos+text.length);
}




function sections_check(key){
	
	var pos = $('#note_lines').prop('selectionStart');
	//con(pos);
	if (	pos > 1 && 
			key != 8 && 
			key != 'pass' &&
			$('#note_lines').val()[pos-2] != '\n' && 
			note_height == $('#note_lines').height() ||
			key == 13
		){ 
		return;
	}
	//con('checking');
	
	note_height = $('#note_lines').height();
	
	//$('#checkbox_ribbon').html('');
	
	
	
	
	$('.dummy_text').remove();
	
	
	
	
	
	
	
	
	
	var lines = $('#note_lines').val().split('\n') ;
	con(lines.length);
	var line_list = [];
	var last_line = '';
	for (i = 0; i < lines.length; i++){
		if ( white_space_chars.indexOf( lines[i].substring(0,1) ) != -1 ){
			line_list.push(last_line);
			last_line = '';
			con('up');
		}else{
			last_line += lines[i]+'\n';
			con('down');
		}
	}
	con(line_list);
	return;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	for(i=0;i<lines.length;i++){
		con('line '+String(i)+' : '+lines[i].length);
	}
	*/
	//var is_new_section = [];
	$('.nb_on').removeClass('nb_on');
	
	for (i = 0; i < lines.length ; i++){
		//ensure each line has length and does not start with whitespace characters
		//var new_section = lines[i].length != 0 && [' ','\n','\t','\r'].indexOf( lines[i][0] ) == -1;
		
		var dummy_text = document.createElement('textarea');
		dummy_text.className = 'dummy_text';
		dummy_text.autocomplete = 'off';

		$('#note_inner').append(dummy_text);
		$('.dummy_text').width( $('#note_lines').width() );
		$('.dummy_text').last().val( lines[i] );
		autosize( $('.dummy_text') );
		
		dtl = $('.dummy_text').length;
		var topPos = $('.dummy_text')[dtl-1].getBoundingClientRect().top  ;
		var botPos = $('.dummy_text')[dtl-1].getBoundingClientRect().bottom ;
		//con( $( $('.dummy_text')[i]).val() );
		
		
		//-------------- Show note bullet for each unique note line
		if ( $( $('.dummy_text')[i]).val().length > 0 && [' ','\n','\t','\r'].indexOf( $($('.dummy_text')[i]).val().substring(0,1) ) == -1 ){
			$('.nb_top'+String(topPos)).addClass('nb_on');
		}
	
	}
	
	con( $('.dummy_text').length );
	
}

var num_checkboxes = 0;
var note_height = $('#note_lines').height();
var next_checkbox_height = 0;
$(document).on('keydown','#note_lines',function(e){
	
	switch (e.which){
		case 9:		//	(tab) -- insert four spaces
			e.preventDefault();
			insert_text('    ', $(this));
			sections_check('pass');
			break;
		default:
			setTimeout(function(){
				//event handler does not register final input character unless assayed after delay (1 ms)
				sections_check(e.which);
			},1);
		/*
		case 13:
		//  enter pressed (calculate number of lines)
			sections_check();
			break;	
		case 32:
		//  space pressed
			sections_check();
			break;
		case 224:
		// 	command key pressed
			sections_check();
			break;	
		*/	
	}
});
		
//handle escape keypress (hide dogcal if open
$(document).keydown(function(e){
	//con(e.which);
	switch (e.which){
		case 27:	// ESC
			$('#dogcal_popup').hide();
			cal_showing = false;
	}
});

//selectRange can set cursor position in text element by supplying a single number (vs. a range)
//	from mpen https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

//		
//---------------------- BUTTON CLICK EVENT HANDLERS  --------------------//
//	

$(document).ready(function(){
	
	$('#note_lines').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
	autosize($('#note_lines'));		//Cause vertical propagation of note
	$('#checkbox_ribbon').height( $('#note_outer').height() );
	
});

//----------------------------------------------------------//
//--------------- NOTE TYPING EVENT HANDLER ----------------//
//----------------------------------------------------------//

//set cursor to last position of #note_lines when the larger note_outer div is clicked
$(document).on('click','#note_outer',function(){
	$('#note_lines').focus();
	$('#note_lines').selectRange( $('#note_lines').val().length );
});


//prevent propagation firing of elements over #note_outer (to select for click on #note_outer only)
$(document).on('click','#note_lines, #checkbox_ribbon',function(e){
	e.stopPropagation();
});

//hide dogcal_popup if user clicks elsewhere in window
$(document).on('click','*',function(e){	
	if ( ! $(this).hasClass('cal_class')  ){
		$('#dogcal_popup').hide();	
		cal_showing = false;
	}
});

//----------------------------------------------------------//
//-------------------- AUTO-RUN AT STARTUP------------------//	
//----------------------------------------------------------//

(function(){	
	load_cal_html();
})();

$(document).ready(function(){
	$('#note_lines').focus();
	
	//----------------populate #checkbox_ribbon on load 
	var finished = false;
	var counter = 0;
	while( ! finished ){	
		$('#checkbox_ribbon').append('<div class="note_bullet" id="line'+String(counter)+'"></div>');
		$('#line'+String(counter)).addClass( 'nb_top'+$('#line'+String(counter))[0].getBoundingClientRect().top );
		//con(String(counter));
		//$('#line'+String(counter)).css({'margin-top': (topPos - $('#checkbox_ribbon')[0].getBoundingClientRect().top) +'px' });
		if( $('.note_bullet').length > $('#note_outer').height() / 14 ){
		//if( counter > 25 ){
			finished = true;
		}
		counter++;
	}
	$( $('.note_bullet')[0] ).addClass('nb_on');
	
});




