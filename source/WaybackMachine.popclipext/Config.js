// #popclip
// name: Wayback Machine
// identifier: com.pilotmoon.popclip.extension.waybackmachine
// description: Get archived version of the selected URL from the Wayback Machine.
// keywords: archive.org
// app: { name: Wayback Machine, link: https://archive.org/web/ }
// icon: iconify:simple-icons:internetarchive
// requirements: [url]
// entitlements: [network]
// after: show-status
// popclip version: 4151
// language: javascript

const axios = require("axios");

// extract and encode URL from popclip.input.text

const targetURL = encodeURIComponent(popclip.input.data.urls[0]);

// Wayback Machine APIs: https://archive.org/help/wayback_api.php
// define the Wayback Machine API URL with the target URL as query parameter

const waybackMachineApiUrl = `https://archive.org/wayback/available?url=${targetURL}`;

// check Wayback Machine for the URL

async function checkWaybackMachine(url) {
  try {
    // GET request to the Wayback Machine API
    const response = await axios.get(url);
    const { archived_snapshots } = response.data;

    // check if a closest is snapshot available

    if (archived_snapshots.closest && archived_snapshots.closest.available) {
      // if snapshot available, show success message, copy URL to clipboard

      popclip.showSuccess();
      popclip.copyText(archived_snapshots.closest.url);

      // if snapshot available, show its details
      // popclip.showText(`Snapshot found: ${archived_snapshots.closest.url}`);

      // open archive URL in browser when option key is pressed
      if (popclip.modifiers.option) {
        popclip.openUrl(archived_snapshots.closest.url);
      }
    } else {
      popclip.showText("No snapshot available for this URL.");
    }
  } catch (error) {
    popclip.showText(`Error: ${error.message}`);
  }
}

// Call the function with the Wayback Machine API URL
checkWaybackMachine(waybackMachineApiUrl);
