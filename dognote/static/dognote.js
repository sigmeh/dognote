//---------------------- testing functions --------------------//
	function print(msg){$('#msgbox').append(msg);}	
	function con(msg){console.log(msg)};
	
//----------------------------------------------------------//
//------------------ VARIABLE DECLARATIONS -----------------//
//----------------------------------------------------------//
	var cal_showing = false;
	var mouseX = 0, mouseY = 0;
	var white_space_chars = [' ','\n','\t','\r'];
	var line_list = [];
	
	$(document).ready(function(){
		var note_height = $('#note_lines').height();
	});

//----------------------------------------------------------//
//-------------------- CALENDAR LOAD/SHOW ------------------//
//----------------------------------------------------------//	

	//--------------------- LOAD CALENDAR -------------------//	
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

	//--------------------- SHOW CALENDAR -------------------//	
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


//----------------------------------------------------------//
//--------------------- HELPER FUNCTIONS -------------------//
//----------------------------------------------------------//
	function clear_data(){
		$('#name_ta').val('Name');
		$('#set_meeting').val('Date (Open)');
		$('#note_lines').val('');
	}

	function insert_text(text, el){
		//inserts '    ' when tab is pressed and places cursor at the end of the insertion
		var cursorPos = el.prop('selectionStart');
		var line = el.val();
		line = line.substring(0, cursorPos) +text+ line.substring(cursorPos, line.length);
	
		el.val( line );
		el.selectRange(cursorPos+text.length);
	}
	
	function populate_checkbox_ribbon(){
		// fill visible checkbox_ribbon with clickable .note_bullet(s)
		var counter = 0;
		while( true ){	
			$('#checkbox_ribbon').append('<div class="note_bullet" id="line'+String(counter)+'"></div>');
			$('#line'+String(counter)).addClass( 'nb_top'+$('#line'+String(counter))[0].getBoundingClientRect().top );
			if( $('.note_bullet').length > $('#note_outer').height() / 14 ){
				break;
			}
			counter++;
		}
		$( $('.note_bullet')[0] ).addClass('nb_on');
	}
	
	// 	selectRange can set cursor position in text element by supplying a single number (vs. a range)
	//	from mpen https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
	$.fn.selectRange = function(start, end) {
		if ( end === undefined ) {
			end = start;
		}
		return this.each(function() {
			if ('selectionStart' in this) {
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

//----------------------------------------------------------//
//---------------------- EVENT HANDLERS --------------------//
//----------------------------------------------------------//

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
		
		for (i=0; i< $('.dummy_text').length; i++){
			
			if ( $('.dummy_text')[i].getBoundingClientRect().top > $('#note_outer')[0].getBoundingClientRect().bottom ){

			}
		}
		
		sections_check('pass');
		
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
	

//----------------------------------------------------------//
//--------- SECTIONS CHECK - EVALUATE NOTE LINES -----------//
//----------------------------------------------------------//
function sections_check(key){
	var pos = $('#note_lines').prop('selectionStart');
	
	if (	pos > 1 									&& 
			key != 8 									&& 
			key != 'pass' 								&&
			$('#note_lines').val()[pos-2] != '\n' 		&& 
			note_height == $('#note_lines').height() 	//&&
			//key != 13
		){ 
		return;
	}
	
	note_height = $('#note_lines').height();

	var lines = $('#note_lines').val().split('\n') ;
	line_list = [ lines[0] ];

	// Determine whether each new line should be appended to the last
	for (i = 1; i < lines.length; i++){

		if ( i == lines.length - 1 && lines[i].length == 0 ){		
			break
		} 		
		if ( white_space_chars.indexOf( lines[i].substring(0,1) ) != -1 || lines[i].length == 0 ){	// line has leading whitespace character
			line_list[line_list.length - 1] += '\n'+lines[i] ;

		}else{
			line_list.push(lines[i]);
		}
	}
	
	// autosize currently functions to adopt each line's height only when re-appended to the document
	var last_line = 0;
	$('.note_bullet').removeClass('nb_on');
	for (i = 0; i < line_list.length; i++){	
		$('#dummy_text').remove();
		$('#note_inner').append(" \
			<textarea id='dummy_text' class='dummy_text' autocomplete='off'>"
				+ line_list[i] +	
			"</textarea>" 
		);
		$('#dummy_text').width( $('#note_lines').width() );
		autosize( $('#dummy_text') );
		
		line_height = $('#dummy_text').height();
		$('#line'+last_line).addClass('nb_on');
			
		//track the position of the last #dummy_text vis-a-vis number of lines
		var lines_per_section = $('#dummy_text').val(line_list[i]).height() / 14;
		last_line += lines_per_section;	
	}	
}

//----------------------------------------------------------//
//--------------- BUTTON CLICK EVENT HANDLERS ----------------//
//----------------------------------------------------------//

	//-------------- clear_data --------------//
	$(document).on('click','#clear_data',function(){
		clear_data();
	});

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
	
	
	function show_options_box( c,e ){
		var x = e.pageX;
		var y = e.pageY;
		con( line_list[c] );
		
	}
	//display note options on checkbox click; get array position of note and send to show_options_box
	$(document).on('click','.note_bullet',function(e){
		if ( $(this).hasClass('nb_on') ){
			sections_check('pass');
			var this_id = this.id;
			var c = 0;
			$('.nb_on').each(function(){
				this_id == this.id ? show_options_box(c,e) : c++;
			});	
		}
	});

//----------------------------------------------------------//
//--------------- KEYBOARD EVENT HANDLERS ----------------//
//----------------------------------------------------------//

	//handle escape keypress (hide dogcal if open)
	$(document).keydown(function(e){
		switch (e.which){
			case 27:	// ESC key
				$('#dogcal_popup').hide();
				cal_showing = false;
		}
	});

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
		}
	});

//----------------------------------------------------------//
//-------------------- AUTO-RUN AT STARTUP------------------//	
//----------------------------------------------------------//

	$(document).ready(function(){
		
		$('#note_lines').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
		$('#note_lines').focus();
		autosize($('#note_lines'));		//Cause vertical propagation of note	
	
		$('#checkbox_ribbon').height( $('#note_outer').height() );
		$('#dummy_text').width( $('#note_lines').width() );
		autosize( $('#dummy_text') );
	
		populate_checkbox_ribbon();
	
		load_cal_html();
	});