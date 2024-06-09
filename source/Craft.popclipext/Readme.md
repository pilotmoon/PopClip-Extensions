# Craft PopClip Extension

Capture text to a [Craft](https://www.craft.do/) document.

The clipping is added as a new document within a specified folder. When clipping from a supported browser, the source URL is also added.

The extension requires the Craft macOS app to be installed locally.

## Configuration

The extension has the following settings:

- **Space ID**: This is the ID of the space you want to add the new document in. It looks something like this: `6035f4d1-43da-a41e-e344-9d7e5b612d9c`. You can get it by right clicking the document in the Craft app and selecting "Copy Link". The link will look something like this: `https://docs.craft.do/editor/d/6035f4d1-43da-a41e-e344-9d7e5b612d9c/C4B330D1-3322-4BDE-95CA-FCEA9BF467E` and the space ID is the part after `/d/`.

- **Folder Name**: The name of an existing folder to create the new document in. If left blank or if the folder does not exist, Craft will create the document the current selected folder.

## Notes

Author: Nick Moore

Links:

- [Craft URL Scheme docs](https://support.craft.do/hc/en-us/articles/360020168838-Using-URL-Scheme)
- Icon from [Craft Brand Assets](https://www.craft.do/brand) page.

## Changelog

- 9 Jun 2024: Initial release
