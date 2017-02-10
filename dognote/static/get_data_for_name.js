var dates_showing_id = null;
var date_list_data = null; 

$(document).on('click','*',function(e){	
// close #date_list_box when window is clicked elsewhere
	e.stopPropagation();
	if ( ! $(this).hasClass('date_list_date') && ! $(this).hasClass('importance_toggle') && ! $(this).hasClass('names_list_name') ){
		$('#date_list_box').remove();
		$('.names_list_name').removeClass('is_open');
		dates_showing_id = null;
		date_list_data = null; 
	}
});


//----------------PRINT HTML FROM RETRIEVED DATES DATA-----------------//
function print_html(date_list_data, name, add_to_id, _name, more){
	
	//---------------------SET PARAMETERS AND GENERATE DATE BOX
	var start = 0;
	var end = 3; 
	if (date_list_data.length < 3){
		end = date_list_data.length;
	}	
	if (more){
		start = 3;
		end = date_list_data.length;
	}else{
		var date_list_box = '<div id="date_list_box" class="inline-block"></div>'		
		$('#'+add_to_id).append(date_list_box);
	}
	
	//---------------------GENERATE HTML FOR EACH DATE
	for (i = start; i < end ; i++){
		var important = '';
		if ( date_list_data[i][1] == true ){
			important = 'important';
		}			
		$('#date_list_box').append(
			'<div class="date_list_date inline-block border">  	\
				<div class="border importance_toggle '+_name+'_importance '+important+'"></div>  			\
				<div class="center inline-block date_list_date_inner '+_name+'">'
					+date_list_data[i][0]+
				'</div>											\
			</div><br>'
		);
	}
	if ( date_list_data.length > 3 && !more){
		$('#date_list_box').append(
			'<div id="show_more" class="date_list_date inline-block border center '+_name+'">  \
			More...</div>'
		);
	}
}
//-----------------------------------------------------------------//

//----------------RETRIEVE DATES DATA-----------------//
function show_dates(name,add_to_id,_name){
	$.ajax({
		method:	'post',
		url:	'dognote.py',
		data:{
				'package': 
					JSON.stringify({
						'instructions' 	: 	'get_data_for_name', 
						'name' 			: 	_name
					})
		},
		success : function(data){
			date_list_data = JSON.parse(data);
			print_html(date_list_data, name, add_to_id, _name, more=false);	
		}
	});
}
//-----------------------------------------------------------------// 
 
//----------------SHOW NOTE FOR SELECTED DATE-----------------//
$(document).on('click','.date_list_date',function(){
	if ( $(this).attr('id') == 'show_more' ){
		return;
	}
	date_key = $(this).html();
});
//-----------------------------------------------------------------//

//----------------SHOW DATES FOR SELECTED NAME-----------------//
$(document).on('click','.names_list_name',function(){
	// select name from list to show available date data
	
	var name = $(this).html();
	if ( name == '--no saved data--' ){
		return;
	}
	var add_to_id = $(this).parent().attr('id');	
	$('#date_list_box').remove();
	
	if ( $(this).hasClass('is_open') ){
		$('.names_list_name').removeClass('is_open');
	}
	else{
		$('.names_list_name').removeClass('is_open');
		$(this).addClass('is_open');

		var _name = name.replace(' ','_');
		show_dates(name, add_to_id, _name);
	}
});
//-----------------------------------------------------------------//

//-----------------------SHOW MORE DATES---------------------------//
$(document).on('click','#show_more',function(){
	$('#show_more').remove();
	var classes = $(this).attr('class').split(' ');
	for(i = 0; i < classes.length; i++){
		if ( $.inArray(classes[i], names) != -1 ){
			_name = classes[i];	
		}
	}
	print_html(date_list_data, name, add_to_id = 'NA', _name, more=true);
});
//-----------------------------------------------------------------//

//-----------------------UPDATE IMPORTANCE---------------------------//
$(document).on('click','.importance_toggle',function(e){
	e.stopPropagation();
	$(this).toggleClass('important');
	var classes = $(this).attr('class').split(' ');
	for (i=0; i< classes.length; i++){
		if ( classes[i].indexOf('_importance') != -1 ){
			var this_name = classes[i].split('_importance')[0].replace(' ','_');
		}
	}
	var date_key = $(this).next().html();
	
	$.ajax({
		method:'post',
		url:'dognote.py',
		data: {'package':
			JSON.stringify(
				{	'instructions':'update_importance',
					'date_key':date_key,
					'this_name':this_name,
					'is_important': $(this).hasClass('important')
				}
		)},
		success:function(result){
			
		}
	});
	
});