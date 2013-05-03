clang main.m -framework Cocoa -mmacosx-version-min=10.8 -Xlinker -sectcreate -Xlinker __TEXT -Xlinker __info_plist -Xlinker info.plist -o MessageMaker
codesign -i com.pilotmoon.MessageMaker --entitlements entitlements.plist -s "Developer ID Application: Nicholas Moore" ./MessageMaker
#codesign -dv --entitlements - ./MessageMaker