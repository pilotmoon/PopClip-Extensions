#!/bin/bash
# Get main domain URL(remove http(s):// and '/' path)
url="$POPCLIP_TEXT"
domain="$(echo $url | sed -e 's/.*:\/\/\([^ !\/]*\)\(.*\)/\1/' | sed -e 's/\([^ ]\)\/.*/\1/')"
# Get hosted IP address
ip=$(host $domain | awk '/has / {print $4;exit}')
[ "$ip+1" -eq "1" ] && exit 1 || echo "$ip"