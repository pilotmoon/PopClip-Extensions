//
//  AppDelegate.m
//  MessageMaker2
//
//  Minimal app to bring up a Messages compose window via NSSharingService.
//  Accepts text via command line args or stdin.
//
//  Usage: MessageMager service-name <type> <text>
//
//  Created by Nicholas Moore on 01/08/2014.
//  Copyright (c) 2014 Pilotmoon Software. All rights reserved.
//

NSDictionary *_serviceNames=nil;

#import "AppDelegate.h"


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
    
    NSDictionary *lookup=@{@"message": NSSharingServiceNameComposeMessage,
                           @"facebook": NSSharingServiceNamePostOnFacebook,
                           @"linkedin": NSSharingServiceNamePostOnLinkedIn,
                           @"sinaweibo": NSSharingServiceNamePostOnSinaWeibo,
                           @"tencentweibo": NSSharingServiceNamePostOnTencentWeibo,
                           @"twitter": NSSharingServiceNamePostOnTwitter};
    
    NSString *resolved=lookup[serviceName];
    if (resolved) {
        serviceName=resolved;
        // otherwise use the raw string
    }
    //    NSString *text=@"chips tónite";
    //    NSString *dataType=@"text";
    //    NSString *serviceName=@"com.apple.share.Messages.compose";
    
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
    
    NSSharingService *service=[NSSharingService sharingServiceNamed:serviceName];
    if (data&&service)
    {
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
