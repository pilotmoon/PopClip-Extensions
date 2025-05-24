# Wayback Machine

This extension checks if an archived version of a website is available from the [Wayback Machine](https://web.archive.org/) (Wikipedia: [Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine)) which is run by the [Internet Archive](https://archive.org/).

It copies the URL of the most recent archived version to the clipboard. The extension calls the [Wayback Machine API](https://archive.org/help/wayback_api.php), which is faster than other methods.

**Modifier:** When holding the Option key while invoking the extension, the returned URL is also opened in the browser.

Rarely does the API incorrectly state that there is no archive version. In this case, this should be checked via [Wayback Machine](https://web.archive.org/) website.

### Example

Input:

> https://www.popclip.app/

Output:

> [https://web.archive.org/web/20240515192607/https://www.popclip.app/](https://web.archive.org/web/20240515192607/https://www.popclip.app/)

### About

Contributed by user [Kolkrabe](https://forum.popclip.app/t/get-archive-link-from-the-wayback-machine/2316) from the PopClip forum.

## Changelog

- 20 May 2024: Initial release
