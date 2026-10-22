# TaskPaper extension for PopClip

Send the text to [TaskPaper 3](https://www.taskpaper.com) ("Plain text to-do
lists for Mac").

The extension has one action, which takes the selected plain text and adds it as
a new task in the Inbox project of the open TaskPaper document.

If no TaskPaper document is currently open, the extension will show an "X".

## About

Author: Nick Moore

The JSX script used is based on the one
[posted](https://support.hogbaysoftware.com/t/basic-script-to-add-selected-text-to-taskpaper-3-inbox/1681)
by Jesse Grosjean at the Hog Bay Software forum.

## Changelog

### 18 Mar 2026

- Add a hyphen prefix before items so that they appear as to-do items in the
  inbox.

### 5 May 2022

- Updated for compatibility with macOS Monterey.

### 8 Oct 2019

- Removed support for TaskPaper 2.

### 27 Jan 2017

- Updated to add support for the version of Taskpaper that comes with Setapp.

### 20 May 2016

- Updated to support TaskPaper 3. Required use of scripting interface because
  TP3 does not have the "send to inbox" service.

### 14 Nov 2012

- Initial release
