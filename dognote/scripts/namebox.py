#!/usr/bin/env python
import subprocess as sp
def main():
	names = [x for x in sp.Popen('ls ref/people'.split(),stdout=sp.PIPE).communicate()[0].split('\n') if x]
	# with open('ref/people') as f:
	#	names = f.read().split('\n')
	if len(names) == 1 and names[0] == '':
		names = ['no_saved_names']
	return names
if __name__ == '__main__':
	main()