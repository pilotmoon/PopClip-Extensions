#import <Cocoa/Cocoa.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        NSString *service=nil;
        NSString *text=nil;
        
        if (argc>1) {
            // service name is first parameter
            service=[NSString stringWithCString:argv[1] encoding:NSUTF8StringEncoding];
            
            if (argc>2) { // get text from 2nd parameter, if available
                text=[NSString stringWithCString:argv[2] encoding:NSUTF8StringEncoding];
            }
            else { // get text from stdin
                text=[[NSString alloc] initWithData:[[NSFileHandle fileHandleWithStandardInput] readDataToEndOfFile] encoding:NSUTF8StringEncoding];
            }
        }
    
        if ([service length]>0&&[text length]>0) {
            NSLog(@"Performing service '%@' with %@ characters of text.\n", service, @([text length]));
            
            NSPasteboard *const pboard=[NSPasteboard pasteboardWithName:@"com.pilotmoon.PerformService.pasteboard"];
            [pboard declareTypes:@[NSStringPboardType] owner:nil];
            [pboard setString:text forType:NSStringPboardType];
            const BOOL result=NSPerformService(service, pboard);
            NSLog(@"Service call result: %d", result);
        }
        else {
            NSLog(@"Specify service name and text.");
        }
    }
    return 1;
}
