function autosave(){
	setInterval(function(){
		var save_name = $('#name_ta_dummy').val();
		var save_date = $('#set_meeting_dummy').val();
		var save_note = $('#note_lines').val();
		var nb_checked_list = [];
		
		$('.nb_on').each(function(){
			if ( $(this).hasClass('nb_checked') ){
				nb_checked_list.push( this.id );
			}
		});
		
		var data = {
			'instructions'	: 'auto_save',	
			'name'			: save_name,
			'date'			: save_date,
			'note' 			: save_note,
			'nb_checked_line_id_list'	: nb_checked_list
		}
		
		var response = submit_data(data);
		
	},2000);
}