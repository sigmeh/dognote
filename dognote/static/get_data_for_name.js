
var dates_showing_id = null;
var date_list_data = null; 

$(document).on('click','*',function(e){	

	if ( ! $(this).hasClass('date_list_date') ){
		$('#date_list_box').remove();
		dates_showing_id = null;
		date_list_data = null; 
	}
});

$(document).on('click','.important',function(){
	
});

function show_dates(name,add_to_id){
	$.ajax({
		method:'post',
		url:'dognote.py',
		data:{
			'package': 
				JSON.stringify(
					{
						'instructions' : 'get_data_for_name', 
						'name' : name.replace(' ','_')
					}
				)
		},
		success : function(data){
			date_list_data = JSON.parse(data);

			var date_list_box = '<div id="date_list_box" class="inline-block"></div>'
			
			$('#'+add_to_id).append(date_list_box);
	
			for (i=0; i < date_list_data.length ; i++){
				if ( i < 3 ){				
					$('#date_list_box').append(
						'<div class="date_list_date inline-block border">  	\
							<div class="border important"></div>  			\
							<div class="center inline-block date_list_date_inner">'
								+date_list_data[i]+
							'</div>											\
						</div><br>'
					);
				}
			}
			if ( date_list_data.length > 3){
				$('#date_list_box').append(
					'<div id="show_more" class="date_list_date inline-block border center">  \
					More...</div>'
				);
			}
			dates_showing_id = add_to_id;
		}
	});
}

$(document).on('click','.date_list_date',function(){
	if ( $(this).attr('id') == 'show_more' ){
		return
	}
	date_key = $(this).html();
	con(date_key);	
	
});

$(document).on('click','.names_list_name',function(){
	// select name from list to show available date data
	
	var name = $(this).html();
	if ( name == '--no data saved--' ){
		return;
	}
	var add_to_id = $(this).parent().attr('id');
	$('#date_list_box').remove();
	
	if ( ! dates_showing_id || $(this).parent().attr('id') != dates_showing_id ){
		//con( dates_showing_id);
	// load dates data for selected name
		show_dates(name, add_to_id);
			
	}else{
	//dates are showing and the same name is clicked		
		dates_showing_id = null;
	}	
	
});

$(document).on('click','#show_more',function(){
	$('#show_more').remove();
	
	for (i=3; i < date_list_data.length; i++){
			$('#date_list_box').append(
				'<div class="date_list_date inline-block border">  	\
					<div class="border important"></div>  			\
					<div class="center inline-block date_list_date_inner">'
						+date_list_data[i]+
					'</div>											\
				</div><br>'
			);
		}
	setTimeout(function(){
		
	},10);
});