for file in source/*; do  
  extname=${file:t};  
  extname=${extname%.popclipext.popclipext};
  git mv -v $file source/$extname.popclipext
done