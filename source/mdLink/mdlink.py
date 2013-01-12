import os
from subprocess import Popen, PIPE

def copy(data):
    Popen(["pbcopy"], stdin=PIPE).communicate(str(data))
 
def paste():
    return Popen(["pbpaste"], stdout=PIPE).communicate()[0]

inputphrase = os.environ['POPCLIP_TEXT']
output = "[" + paste() + "](" + inputphrase + ")"
copy(output)
print output
