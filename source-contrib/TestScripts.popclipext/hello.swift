import Foundation
guard let text = ProcessInfo.processInfo.environment["POPCLIP_TEXT"] {
    print("Hello, \(text), from Swift")
}