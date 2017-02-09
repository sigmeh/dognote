#!/usr/bin/env python
import json
import operator

def main(name):
	with open('ref/people/'+name,'r') as f:
		data = json.loads(f.read())
	dates = data['dates'].keys()

	meeting_order = sorted( [x for x in data['dates']] , key=lambda k: data['dates'][k]['meeting_date_epoch_time'] , reverse=True )

	return meeting_order
	
if __name__ == '__main__':
	main(name)