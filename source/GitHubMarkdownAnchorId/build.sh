#!/usr/bin/env bash

wget https://github.com/primer/octicons/raw/master/icons/link.svg
inkscape -z -w 250 -h 250 link.svg -o link.png
rm link.svg