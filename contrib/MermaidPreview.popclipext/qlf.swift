#!/usr/bin/env swift

import Cocoa
import QuickLookUI

class FloatingPreview: NSObject, QLPreviewPanelDataSource, QLPreviewPanelDelegate {
  let urls: [URL]

  init(paths: [String]) {
    self.urls = paths.compactMap { path -> URL? in
      let url = URL(fileURLWithPath: path)
      guard FileManager.default.fileExists(atPath: path) else {
        return nil
      }
      return url
    }
    super.init()
  }

  func numberOfPreviewItems(in panel: QLPreviewPanel!) -> Int {
    return urls.count
  }

  func previewPanel(_ panel: QLPreviewPanel!, previewItemAt index: Int) -> QLPreviewItem! {
    return urls[index] as QLPreviewItem
  }

  @objc private func panelWillClose(_ notification: Notification) {
    NSApp.terminate(nil)
  }

  func previewPanel(_ panel: QLPreviewPanel!, handle event: NSEvent!) -> Bool {
    guard event.type == .keyDown else { return false }
    switch event.keyCode {
    case 49, 53:  // Space, Esc
      panel.close()
      return true
    default:
      return false
    }
  }

  func run() {
    guard !urls.isEmpty else {
      exit(1)
    }

    let app = NSApplication.shared
    app.setActivationPolicy(.accessory)

    guard let panel = QLPreviewPanel.shared() else {
      exit(1)
    }
    panel.dataSource = self
    panel.delegate = self
    panel.level = .floating  // This makes it float above full-screen apps
    panel.hidesOnDeactivate = false
    panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(panelWillClose(_:)),
      name: NSWindow.willCloseNotification,
      object: panel
    )
    panel.makeKeyAndOrderFront(nil)

    app.activate(ignoringOtherApps: true)
    app.run()
  }
}

guard CommandLine.arguments.count > 1 else {
  print("Usage: qlf <file> [file2] ...")
  exit(1)
}

let paths = Array(CommandLine.arguments.dropFirst())
let preview = FloatingPreview(paths: paths)
preview.run()
