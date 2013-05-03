//
//  Minimal app to bring up a Messages compose window via NSSharingService.
//  Accepts text via command line args or stdin.
//

#import <Cocoa/Cocoa.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSSharingServiceDelegate>

@end

@implementation AppDelegate

- (NSString *)text
{
    NSArray *const args=[[NSProcessInfo processInfo] arguments];
    if ([args count]>1) {
        // return first argument if available
        return args[1];
    }
    else {
        // get text from stdin
        return [[NSString alloc] initWithData:[[NSFileHandle fileHandleWithStandardInput] availableData] encoding:NSASCIIStringEncoding];
    }
}

- (void)quitSoon
{
    [NSApp performSelector:@selector(terminate:) withObject:nil afterDelay:1];
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    NSString *text=[self text];
    //NSLog(@"Text: %@", text);
    if (text) {
        NSSharingService *service=[NSSharingService sharingServiceNamed:NSSharingServiceNameComposeMessage];
        service.delegate=self;
        [service performWithItems:@[text]];
    }
    else {
        [self quitSoon];
    }
}

- (void)sharingService:(NSSharingService *)sharingService willShareItems:(NSArray *)items
{
    //NSLog(@"Will Share Items: %@", items);
}

- (void)sharingService:(NSSharingService *)sharingService didShareItems:(NSArray *)items
{
    //NSLog(@"Did Share Items: %@", items);
    [self quitSoon];
}

- (void)sharingService:(NSSharingService *)sharingService didFailToShareItems:(NSArray *)items error:(NSError *)error
{
    //NSLog(@"Failed To Share Items: %@\nError: %@", items, error);
    [self quitSoon];
}

@end


int main(int argc, char *argv[])
{
    @autoreleasepool {
        AppDelegate *ad=[[AppDelegate alloc] init];
        [NSApplication sharedApplication];
        [NSApp setActivationPolicy:NSApplicationActivationPolicyAccessory];
        [NSApp setDelegate:ad];
        [NSApp activateIgnoringOtherApps:YES];
        [NSApp run];
    }
    return 0;
}