//Global variable names is referenced elsewhere (get_data_for_name.js)
//	_names is name.replace(' ','_') for each name in names
var names = [];

//show namebox when #name_ta is clicked
$(document).on('click','#name_ta',function(){
	$('#namebox').show();
});

//hide namebox when other page element is clicked
$(document).on('click','*',function(e){
	e.stopPropagation();
	$('#namebox').hide();
	var id = $(this).attr('id');
	if( id == 'name_ta' ||  id == 'namebox' || $(this).hasClass('namebox_name') ){
		$('#namebox').show();
	}
});

//auto-populate namebox on load (hidden until clicked) for selecting a previously-saved name
//also populate #names_list for retrieval of previous notes for previous names
$(document).ready(function(){
	$.ajax({
		method:'post',
		url:'dognote.py',
		data:{'package': 
			JSON.stringify({ 
				'instructions': 'get_names'
			}) 
		},	
		success:function(result){
			names = JSON.parse(result);
			if (names.length == 0){
				$('#names_list').append(
					'\
					<div class="border names_list_name">--no saved data--</div>   \
					'
				);		
			}
			
			//populate namebox 
			for (i=0; i<names.length; i++){
				var name = names[i];
				$('#namebox').append(
					'<div id="'+name+'" class="namebox_name">	\
					</div>'
				);
				$('#'+name).html(name.replace('_',' '));
				$('#names_list').append(
//ADDED ID TO NAMES_LIST_NAME	
					'\
					<div id="'+name+'_names_list">\
						<div class="border names_list_name inline-block">'
							+name.replace('_',' ')+
						'</div>\
					</div>'
				);
			}		
		}
	});
});

$(document).on('click','.namebox_name',function(){
	var id = $(this).attr('id');
	if ( id != 'no_saved_names'){
		$('#name_ta').val( id.replace('_',' ') );	
	}
	$('#namebox').hide();
});

$(document).on('keydown','#name_ta',function(e){
	switch (e.which){
		case 13: e.preventDefault();
	}
});