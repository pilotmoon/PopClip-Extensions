//
//  Minimal app to bring up a Messages compose window via NSSharingService.
//  Accepts text via command line args or stdin.
//  Usage: MessageMager service-name <type> <text>
//
// Types
// text
// url
//
// Service names (10.8.3):
// com.apple.share.Twitter.post
// com.apple.share.SinaWeibo.post
// com.apple.share.Mail.compose
// com.apple.share.Messages.compose
// com.apple.share.AirDrop.send
// com.apple.share.System.add-to-safari-reading-list
// com.apple.share.System.add-to-iphoto
// com.apple.share.System.add-to-aperture
// com.apple.share.Facebook.post
// com.apple.share.Twitter.set-profile-image
// com.apple.share.System.set-desktop-image
// com.apple.share.Video.upload-image-Flickr
// com.apple.share.Video.upload-Vimeo
// com.apple.share.Video.upload-Youku
// com.apple.share.Video.upload-Tudo

#import <Cocoa/Cocoa.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSSharingServiceDelegate>

@end

@implementation AppDelegate

- (NSString *)serviceName
{
    NSArray *const args=[[NSProcessInfo processInfo] arguments];

    if ([args count]>1) {        
        return args[1];
    }
    else {
        return nil;
    }
}

- (NSString *)dataType
{
    NSArray *const args=[[NSProcessInfo processInfo] arguments];

    if ([args count]>2) {        
        return args[2];
    }
    else {
        return nil;
    }
}

- (NSString *)text
{
    NSArray *const args=[[NSProcessInfo processInfo] arguments];
    if ([args count]>3) {
        // return 2nd argument if available
        return args[3];
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
    id data=nil;
    
    NSString *text=[self text];
    NSString *dataType=[self dataType];
    NSString *serviceName=[self serviceName];
    //NSLog(@"Text: %@", text);
    //NSLog(@"Data: %@", dataType);
    //NSLog(@"Service: %@", serviceName);
    
    if (text&&dataType&&serviceName)
    {        
        if ([dataType isEqualToString:@"url"])
        {
            data=[NSURL URLWithString:text];
        }
        else if ([dataType isEqualToString:@"text"])
        {
            data=text;
        }
    }

    if (data)
    {
        NSSharingService *service=[NSSharingService sharingServiceNamed:serviceName];
        service.delegate=self;
        //NSLog(@"About to perform service with %@: %@", dataType, data);
        [service performWithItems:@[data]];
    }       
    else {
        //NSLog(@"Quitting soon");
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