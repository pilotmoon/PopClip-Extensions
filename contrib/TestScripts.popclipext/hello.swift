import Foundation
if let text = ProcessInfo.processInfo.environment["POPCLIP_TEXT"] {
    print("Hello, \(text), from Swift")
}