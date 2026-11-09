# Instant Translate

Translate the selected word or short phrase instantly within PopClip, using Microsoft Translator.

## Setting up your Microsoft Translator key

Instant Translate needs your own Microsoft Translator key. The free tier allows 2 million characters per month. When the quota runs out, translation simply stops until the next month — you will not be charged.

You need a Microsoft Azure account. If you don't have one, [sign up here](https://azure.microsoft.com/free/). Microsoft asks for a credit card to verify your identity, even for free services.

First, create a resource group (a folder that holds Azure resources):

1. Open the [Create a resource group](https://portal.azure.com/#create/Microsoft.ResourceGroup) page.
2. Fill in the form:
   - **Subscription**: leave as is.
   - **Resource group**: enter any name, e.g. `popclip`.
   - **Region**: choose any region near you, e.g. East US or West Europe.
3. Click **Review + create**, then **Create**.

Then create the Translator resource:

4. Open the [Create Translator](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextTranslation) page.
5. Fill in the form:
   - **Subscription**: leave as is.
   - **Resource group**: choose the group you just created, e.g. `popclip`. Don't use **Create new** here, because it doesn't work with the Global region.
   - **Region**: choose **Global**.
   - **Name**: enter any name, e.g. `popclip-translate-yourname`. It must be unique across Azure.
   - **Pricing tier**: choose **Free F0**.
6. Click **Review + create**, then **Create**. Wait for the deployment to finish (about a minute).
7. Click **Go to resource**.
8. In the left sidebar, open **Resource Management → Keys and Endpoint**.
9. Copy **KEY 1**.
10. In PopClip's settings, click the Instant Translate extension's settings button, and paste the key into **Translator Key**. Leave **Region** blank.

Notes:

- Each Azure subscription can have only one free (F0) Translator resource. If Free F0 is not offered, you may already have one; use its key instead.
- If you chose a region other than Global, enter that region (e.g. `westeurope`) in the extension's **Region** setting.

## Changelog

- 9 Nov 2026: The extension now uses your own Microsoft Translator key, entered in its settings. The previous shared key has been withdrawn. Converted to the modern Config.ts format, with clearer error messages.
- 20 Apr 2022: Increased the language list to the latest supported languages.
- 20 Apr 2022: Rewrote the extension in JavaScript and moved to version 3 of the Translator API (it was using version 2). Response times are faster because the key is now used directly, instead of first being exchanged for an access token.
- 20 Apr 2022: Updated for Python 3, thanks to [harrtho](https://github.com/harrtho).
- 30 Apr 2021: Stopped working because of an SSL error that couldn't be fixed quickly, so the extension was removed from the index.
- 22 Apr 2015: Updated to use credentials issued by a server.
- 21 Apr 2015: [chenggiant](https://github.com/chenggiant) modified the original to use the official Microsoft Translator API. Further modifications by Nick Moore.
- The original Instant Translate (a.k.a. Better Translate) was developed by [harmy](http://harmy.github.io). Around March/April 2015 Google changed their back end, which broke it. The original relied on undocumented Google endpoints rather than the paid API.
