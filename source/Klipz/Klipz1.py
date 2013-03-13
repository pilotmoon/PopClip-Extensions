from sys import argv
from sys import stdout

import Klipz

ret = Klipz.main(argv[0][5])
stdout.write(ret)
