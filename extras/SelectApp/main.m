#import <Foundation/Foundation.h>

// we are weak linking so ignore these warnings
#pragma clang diagnostc push
#pragma clang diagnostic ignored "-Wunreachable-code"
#pragma clang diagnostic ignored "-Wdeprecated"

static BOOL exists(CFStringRef bid) {
    BOOL result=NO;
    
    if (LSCopyApplicationURLsForBundleIdentifier!=NULL) {
        CFArrayRef array=LSCopyApplicationURLsForBundleIdentifier(bid, NULL);
        if (array) {
            result=YES;
            CFRelease(array);
        }
    }
    else if (LSFindApplicationForInfo!=NULL) {
        CFURLRef urlref=NULL;
        LSFindApplicationForInfo(kLSUnknownCreator, bid, NULL, NULL, &urlref);
        if (urlref) {
            result=YES;
            CFRelease(urlref);
        }
    }
    
    return result;
}

#pragma clang diagnostc pop

int main(int argc, const char * argv[]) {
    @autoreleasepool {

        // bundle identifiers are supplied on the command line
        int result=0;
        for (int i=1; i<argc; i+=1) {
            // if the bundle identifier exists, stop and return it
            if(exists((__bridge CFStringRef)[NSString stringWithCString:argv[i] encoding:NSUTF8StringEncoding])) {
                result=i;
                break;
            }
        }
        
        if (result>0) {
            // print the winning bundle id and code 0
            puts(argv[result]);
            return 0;
        }
    }
    
    // print nothing and code 1
    return 1;
}
