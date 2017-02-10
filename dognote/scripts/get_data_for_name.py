#!/usr/bin/env python
'''
get_data_for_name.py retrieves date data for selected name, as well as "important" (a boolean)

'''

import json
import operator

def main(name):
	with open('ref/people/'+name,'r') as f:
		data = json.loads(f.read())
	dates = data['dates'].keys()

	
	m = sorted( [  x for x in data['dates']] , key=lambda k: data['dates'][k]['meeting_date_epoch_time'] , reverse=True )
	#meeting order
	
	i = [ data['dates'][x]['important'] for x in m ] 
	#importance order
	
	
	final = [(m[x],i[x]) for x in range(len(m))]
	return final
	
	
if __name__ == '__main__':
	main(name)