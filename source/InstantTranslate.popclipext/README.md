Instant Translate
-----------------

The original Instant Translate (a.k.a. Better Translate) was developed by [harmy](http://harmy.github.io).

Some time in March/April 2015 Google changed their back end which stopped the original version from working. (To be fair to Google, the original was skirting around the paid API using some undocumented endpoints.)

This new version (21 Apr 2015) was modified from the original by [chenggiant](https://github.com/chenggiant), to use the official Microsoft Translator API.

Further modifications made by Nick Moore.

Further updated with server-issued credentials 22 Apr 2015.

April 30 2021: Furently not working- some kind of SSL error. Not a quick fix. Removed from index.

20 Apr 2022: Update for python3, thanks to [harrtho](https://github.com/harrtho).

20 Apr 2022: Further update, rewriting in JavaScript. Also ports to the Translation API V3 (was using V2). Improves response time by skipping the credentials access step and using the key directly instead of exchanging it for access token.

20 Apr 2022 Increased language list to latest supported

