'''
Suboptimal Python3 port of https://chir.ag/projects/ntc/ntc.js by Chirag Mehta.

Writes color name to stdout for hexadecimal color code in environmental
variable POPCLIP_TEXT. To be used only in conjunction in 'Name Color' PopClip
extension.

This script is released under the MIT License.

Copyright 2020 oxxie

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
'''

import json
import os


def init():
    global names

    with open('colornames.json') as f:
        names = json.loads(f.read())

    for i, n in enumerate(names):
        names[i].extend(rgb(n[0]))
        names[i].extend(hsl(n[0]))


def nameColor(color):
    color = color.upper()

    if len(color) % 3 == 0:
        color = '#' + color

    if len(color) == 4:
        color = '#' + color[1] * 2 + color[2] * 2 + color[3] * 2

    rv, gv, bv = rgb(color)
    hv, sv, lv = hsl(color)
    ndf1, ndf2, ndf = 0, 0, 0
    cl, df = -1, -1

    for i, n in enumerate(names):
        if color == '#' + n[0]:
            return ['#' + n[0], n[1], True]

        ndf1 = (rv - n[2]) ** 2 + (gv - n[3]) ** 2 + (bv - n[4]) ** 2
        ndf2 = (hv - n[5]) ** 2 + (sv - n[6]) ** 2 + (lv - n[7]) ** 2
        ndf = ndf1 + ndf2 * 2

        if df < 0 or df > ndf:
            df = ndf
            cl = i

    return ['#??????', 'No matching color name', True] if cl < 0 else \
           ['#' + names[cl][0], names[cl][1], False]


def hsl(color):
    rv, gv, bv = [int(color[1:3], 16) / 255, int(color[3:5], 16) / 255,
                  int(color[5:7], 16) / 255]

    minv, maxv = min(rv, gv, bv), max(rv, gv, bv)
    delta = maxv - minv
    hv, sv, lv = 0, 0, (minv + maxv) / 2

    if lv > 0 and lv < 1:
        sv = delta / (2 * lv if lv < 0.5 else 2 - 2 * lv)

    if delta > 0:
        if maxv == rv and maxv != gv:
            hv += (gv - bv) / delta

        if maxv == gv and maxv != bv:
            hv += (2 + (bv - rv)) / delta

        if maxv == bv and maxv != rv:
            hv += (4 + (rv - gv)) / delta

        hv /= 6

    return [int(hv * 255), int(sv * 255), int(lv * 255)]


def rgb(color):
    return [int(color[1:3], 16), int(color[3:5], 16), int(color[5:7], 16)]


if __name__ == "__main__":
    init()
    n = nameColor(os.environ['POPCLIP_TEXT'])
    print(n[1] + (' (closest match)' if not n[2] else ''))
