result=`ruby -I gemoji/lib -I gemoji-parser/lib doemoji.rb "$POPCLIP_TEXT"`
/bin/echo -n "$result"