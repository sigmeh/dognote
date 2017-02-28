var options_box_showing = null;		//track currently-showing options_box by id of .note_bullet item

var arr_index = 0;

function show_options_box(c,e,id){
	$('#options_box').css({
		'display' 		:	'inline-block',
		'margin-left'	:	mouseX+'px',
		'margin-top'	:	mouseY+'px'	
	});
	options_box_showing = id;	
	con(options_box_showing+' haar');
	arr_index = c;
}



$(document).on('click','.options_icon',function(){
	var action = $(this).parent().attr('id').split('options_')[1];
	switch (action){
		case 'check':
			$('.nb_on').each(function(){
				
				//con( this.id );
				
				//this.id == options_box_showing ? $(this).addClass('nb_checked') : 1=1;
				//con(options_box_showing);
				if (this.id == options_box_showing){
					$(this).toggleClass('nb_checked');
					/*
					if ( $(this).hasClass('nb_checked') ){
						$(this).removeClass('nb_checked');
					}
					$(this).addClass('nb_checked');
					*/
					//$('#'+this.id).css({'background-color':'yellow'});
				}
				
			});
			
			break;
			
		case 'copy':
			
			break;
			
		case 'delete':
			con(arr_index);
			line_list.splice( arr_index , 1 )
			$('#note_lines').val( line_list.join('\n') );
			sections_check('pass');
			save_data();
			break;
	}
	//options_box_showing = null;
	
});