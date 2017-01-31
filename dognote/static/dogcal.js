function con(msg){console.log(msg)};
			
var months = {	January		:1,
				February	:2,
				March		:3,
				April		:4,
				May 		:5,
				June		:6,
				July 		:7,
				August 		:8,
				September 	:9,
				October 	:10,
				November 	:11,
				December 	:12
			}	


function generate_cal(cal){	
	//Add header (e.g. January 2017), and populate calendar boxes with week days and date numbers	
	
	$('#cal_header').html(cal[0]);
	
	for (i=0; i<42; i++){							//populate calendar
		if (i < 7){
			$('#cal_box'+i).html(cal[1][i]);		//process weekday names
		}
		else{
			$('#cal_box'+i).html(cal[2][i-7][1]);	//process all numbers
				
			$('#cal_box'+i).append(					
				'<div class="cal_box_date_data">'+String(cal[2][i-7])+'</div>'
			);	//store [month,day,year] in cal_box_date_data (child of cal_box) for each calendar day
		}	
	}	
}

	

$('.cal_arrow').click(function(){
	var data = $('#cal_header').html().split(' ');
	
	var month = months[data[0]];
	var year = Number(data[1]);
	var id = $(this).attr('id');

	switch (month,id){
		case 'cal_left':		//go to previous month
			if (month == 1){	//from january to december of previous year
				month = 12;
				year -=1;
			}
			else{				//not from january
				month -= 1;
			}
			break;
		
		case 'cal_right': 		//advance to next month 
			if (month == 12){	//from december to january of next year
				month = 1;
				year += 1;
			}
			else{				//not from december
				month += 1;
			}
			break;
		default:
			
			
	}
	
	$.ajax({					//get new calendar values on cal_arrow click
		method:'post',
		url:'dognote.py',
		data:{'package':
			JSON.stringify({
				'instructions':'get_cal',
				'month':month,
				'year':year
			}
		)},
		success:function(cal){
			generate_cal(JSON.parse(cal));
		}
	});
	
	
		
});	

function build_calendar(){
	for (i=0; i<42; i++){
		var id = 'cal_box'+i;
		$('#cal_inner').append('<div id='+id+' class="cal_box border"></div>');
		if ((i+1) % 7 == 0 && i != 0){
			$('#cal_inner').append('<br>');
		}
		if (i>6){
			$('#'+id).addClass('cal_box_numbered');
		}
	}
}



(function(){
	build_calendar();			
})();