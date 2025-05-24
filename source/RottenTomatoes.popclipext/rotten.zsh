#!/bin/zsh
term=$(echo $POPCLIP_TEXT | tr '.' ' ')
url="https://www.rottentomatoes.com/search/?search=$term"
open $url