// #popclip
// name: StoreBundleID
// identifier: com.pilotmoon.popclip.extension.store-bundle-id
// description: Get app's Bundle Identifier from App Store URL
// popclip version: 4151
// entitlements: [network]
// language: typescript
// module: true

// based on https://forums.ivanti.com/s/article/How-to-find-Bundle-ID-of-any-iOS-App

import axios from "axios";
export const action: Action = {
  regex: /apps\.apple\.com\/.+\/id(\d+)$/,
  after: "preview-result",
  async code(input) {
    return await getBundleId(input.regexResult![1]);
  },
};

async function getBundleId(appStoreUrl: string) {
  const { data } = await axios.get(
    `https://itunes.apple.com/lookup?id=${appStoreUrl}`,
  );
  return data.results[0].bundleId;
}

export async function test() {
  await getBundleId("1493198199");
}
