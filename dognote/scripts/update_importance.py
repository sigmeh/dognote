#!/usr/bin/env python
''' Update importance ("starred data") for single date, for selected name'''

import json

def main(name,date,is_important):
	with open('ref/people/'+name,'r') as f:
		data = json.loads(f.read())
	data['dates'][date]['important'] = is_important
	with open('ref/people/'+name,'w') as f:
		f.write(json.dumps(data))
		
		
if __name__ == '__main__':
	main(name,date,is_important)