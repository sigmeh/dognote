#!/usr/bin/env python
import subprocess as sp
import time
import requests
import kill_server

def check_localhost():
	'''404 message implies a server at port 8000 is running with a root directory elsewhere'''
	'''if so, kill it'''
	r = requests.get('http://127.0.0.1:8000/dognote')
	if r.status_code == 404:
		print 'Got 404 message; attempting server kill'
		kill_server.main()
	else:
		print 'Returned status code:',r.status_code
		
	start()

def start():
	try:
		print 'Starting new python server on port 8000'
		cmd = 'python server.py &'.split()
		sp.Popen(cmd)
		time.sleep(.5)	
		
		cmd = 'open http://localhost:8000/dognote'.split()
		sp.Popen(cmd)	#open in default browser
		
	except:
		time.sleep(.5)
		print 'Cannot start server.'
		
		
def main():
	try:
		check_localhost()
		
	except:
		'''no connection to localhost found; start server'''
		start()
	
	
		
if __name__ == '__main__':
	main()

