clang main.m -framework Cocoa -mmacosx-version-min=10.6 -Xlinker -sectcreate -Xlinker __TEXT -Xlinker __info_plist -Xlinker info.plist -o SelectApp
codesign -i com.pilotmoon.SelectApp --entitlements entitlements.plist -s "Developer ID Application: Nicholas Moore" ./SelectApp
codesign -dvvvv --entitlements - ./SelectApp