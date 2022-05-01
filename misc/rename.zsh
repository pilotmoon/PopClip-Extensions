for file in source/*; do  
  extname=${file:t};  
  git mv -v $file source/$extname.popclipext
done