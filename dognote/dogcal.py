#!/usr/bin/env python

'''	Simple python backend for retrieving a block of days corresponding to a given month.
	Utilizes calendar and datetime modules to generate calendar.TextCalendar, which is formatted
		as a multidimensional array for passing from the server as a json object'''
		
import calendar
from datetime import datetime as dt
import sys
import cStringIO



def get_cal(year,month,c):
	'''grab and return output from calendar.TextCalendar (which otherwise prints to stdout)'''
	stdout_ = sys.stdout 		# Keep track of the previous value.
	stream = cStringIO.StringIO()
	sys.stdout = stream
	c.prmonth(year,month)
	sys.stdout = stdout_ 		# restore the previous stdout.
	cal = stream.getvalue()  	
	return cal

def format_cal(cal):
	'''create multidimensional array of calendar days'''
	cal = [x.strip() for x in cal.split('\n') if x]
	for line in range(len(cal)):
		if line > 0:
			cal[line] = [y for y in cal[line].split(' ') if y]
	return cal

def main(**kwargs):
	
	if kwargs:
		year = kwargs['year']
		month = kwargs['month']
	else:
		year,month,day = [int(x) for x in str(dt.now()).split(' ')[0].split('-')]
	
	c = calendar.TextCalendar(calendar.SUNDAY)
	
	'''get calendars for current, previous, and next month'''
	cal = get_cal(year,month,c)
	cal = format_cal(cal)
	
	prev_cal = get_cal(year if month != 1 else year - 1, month - 1 if month != 1 else 12, c)
	prev_cal = format_cal(prev_cal)
	
	next_cal = get_cal(year if month < 12 else year + 1, month + 1 if month < 12 else 1, c)
	next_cal = format_cal(next_cal)
	
	'''adjust cal to fill in month grid with extra days'''
	if len(cal[2]) < 7: 
		cal[2] = prev_cal[-1] + cal[2] 
	if len(cal[-1]) < 7:
		cal[-1] = cal[-1] + next_cal[2] 
	if len(cal) < 7:		#handle 28-day February where Feb 1 is Sunday
		cal.append(next_cal[2])
	
	cal[1] = cal[1]+cal[2]+cal[3]+cal[4]+cal[5]+cal[6]
	#cal = cal[0] + [x for x in cal[1:]]
	
	return cal

if __name__ == '__main__':
	main(**kwargs)