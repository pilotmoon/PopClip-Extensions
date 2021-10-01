$text = $ENV{"POPCLIP_TEXT"};
$text =~ s/(\d\d\d\d)(\d\d)(\d\d)/$1_$2_$3/g;
print $text;