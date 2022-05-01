# coding=utf-8

# Copyright 2013 by David Hoerl
# For Usage see LICENSE in the same folder
# Version 1.0

import os
import sys
import syslog
import stat
import pickle
from collections import deque

keyShift =		131072
keyControl =	262144
keyOption =		524288
keyCommand =   1048576

# globals
path = ""
dict = {}
separator = ""
queueType = ""
enumerateFunction = reversed

def main(clipNum):
	global dict
	global path
	global queueType
	global separator
	global enumerateFunction

	# log(str(os.environ)) #useful helper

	s = os.environ['POPCLIP_TEXT']
	pasteIt = False if len(s) else True

	modifiers	= int(os.environ['POPCLIP_MODIFIER_FLAGS'])
	alternate	= (modifiers & keyShift) == keyShift
	popAll		= (modifiers & keyOption) == (keyOption if os.environ['POPCLIP_OPTION_POP_TYPE'] == "All" else 0)
	chooseOne	= (modifiers & keyControl) == keyControl
	deleteIt	= (modifiers & keyCommand) == 0
	deleteAll	= modifiers == (keyControl | keyOption | keyCommand)
	modifiers	= 0
	
	board = os.environ['POPCLIP_OPTION_DEFAULT_CLIPBOARD']
	#log("Board is " + board)

	if (board == "Global" and alternate) or (board == "Project" and not alternate):
		clipboard = os.popen('osascript script1.txt').read()
	else:
		clipboard = "Global"

	separator	= os.environ['POPCLIP_OPTION_SEPARATOR'].decode('unicode_escape')
	queueType	= os.environ['POPCLIP_OPTION_QUEUE_TYPE']	# fifo or lifo
	enumerateFunction = identity if queueType == 'FIFO' else reversed

	# OK, now lets do the real work!

	makeOrFetchDict(clipboard)
	
	try:
		clips = dict[clipNum]
	except KeyError:
		#log("y")
		clips = deque()
		dict[clipNum] = clips
	except Exception as e:
		#log("z")
		#log(e.__name__)
		pass

	#log("1 " + type(clips).__name__ )

	saveIt = False
	ret = ""

	if deleteAll:
		clips.clear()
		saveIt = True
		
	elif pasteIt and (not popAll or chooseOne):
		ret = getOne(clipNum, deleteIt, chooseOne)
		if deleteIt: saveIt = True

	elif pasteIt:
		#log("Try join")
		ret = separator.join(enumerateFunction(clips))
		if deleteIt:
			clips.clear()
			saveIt = True
		#log("Did join")
	elif not pasteIt:
		if len(s):
			clips.append(s)
			saveIt = True

	#log("Clip: %s dump: %s" % (clipNum, clips))

	if saveIt:
		saveClip()
	#log("Return: " + ret)
	return ret

def saveClip():
	try:
		#log("TRY WRITE")
		fp = open(path, "wb")
		#log("DID IT now dump!")
		try:
			pickle.dump(dict, fp, pickle.HIGHEST_PROTOCOL)
		except:
			log("pickle dump failed!")
		else:
			log("successfully dumped!")
		fp.close()
	except IOError:
		log("Failed to save Clip file")
	return

def makeOrFetchDict(clibBoard):
	global path
	path = os.getcwd() + "/../../Klipz"
	log("Path1: " + path)
	
	try:
		mode = os.stat(path).st_mode;
	except OSError:
		try:
			os.mkdir(path)
		except OSError:
			log("Failed to create directory at " + path)
			exit(1)

	path += "/" + clibBoard.strip() + ".pic"
	log("Path2: " + path)

	global dict
	dict = {}

	try:
		fp = open(path, "rb")
	except IOError:
		dict = {}
	else:
		try:
			dict = pickle.load(fp)
		except EOFError:
			log("EOFError on pickle.load")
		except IOError as e:
			log("IOError on pickle.load")
			#if e.errno != errno.ENOENT:
				#sys.exit("Can't open factors.dat for reading.")
		except PickleError:
			log("PickleError on load")
		except Exception as e:
			log("EXCEPT on pickle.load: " + e.__name__)
		except:
			log("EXCEPTION on pickle.load")
		fp.close()

	return

def getOne(clipNum, deleteIt, chooseOne):
	global enumerateFunction
	global queueType

	d = dict[clipNum]

	if len(d) == 0:
		beep()
		return "\n"
	
	idx = 0
	if chooseOne:
		l = []
		for s in d:
			s2 = snipper(s)
			l.append(s2)
		cmd = "osascript script0.txt " + "\"Clipboard " + str(clipNum) + "\" '" + "' '".join(enumerateFunction(l)) + "'"
		log("Cmd: %s" % cmd)

		option = os.popen(cmd).read().strip()
		if option == "false":
			return ""
		else:
			idx = l.index(option)
	else:
		idx = 0 if queueType == "FIFO" else len(d) - 1

	try:
		#log("Index: %d" % idx)
		d.rotate(-idx)
		s = d[0]
		#log("S: %s" % s)
		if deleteIt: d.popleft()
		d.rotate(idx)
		return s
	except Exception:
		return ""

def snipper(sx):
	s = sx.strip()
	ret = ""
	for i,c in enumerate(s):
		if c == '\n':
			ret += "…";
			break
		if i > 31: 
			ret += "…";
			break
		if c == "'":
			c = unicodeSingleQuote
		elif c == "\t":
			c = ' '
		ret += c
	return ret.strip()

def beep():
	os.system('osascript script2.txt')

def log(msg):
	syslog.openlog("Klipz")
	syslog.syslog(syslog.LOG_ALERT, msg)
	syslog.closelog()

def identity(arg):
	return arg

def handleException(excType, excValue, traceback):
	s = str(excType) + ' ' + str(excValue) + ' ' + str(traceback)
	log("EXCEPTION: " + s)

sys.excepthook = handleException

# Testing
#if __name__ == '__main__':
#	main()
