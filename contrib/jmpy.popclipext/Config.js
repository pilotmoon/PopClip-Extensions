// #popclip
// name: Jmpy
// identifier: com.jmpy.popclipext
// icon: jmpy-logo.png
// description: Create short links and dynamic QR codes using Jmpy.
// entitlements: [network]
// module: true

const axios = require("axios");

/**
 * Validates and normalizes the selected text into a proper URL.
 * Prepend protocol if missing, and check URL validity.
 */
function validateAndNormalizeUrl(text) {
  let urlStr = text.trim();
  if (!urlStr) {
    throw new Error("No URL selected.");
  }

  // Prepend protocol if user selected a domain without one (e.g., "example.com")
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = "https://" + urlStr;
  }

  try {
    // Basic structural validation using URL constructor
    new URL(urlStr);
  } catch (e) {
    throw new Error("Selected text is not a valid URL.");
  }

  return urlStr;
}

/**
 * Validates the Jmpy API Key format.
 */
function validateApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== "string") {
    throw new Error("API Key is required. Set it in PopClip options.");
  }
  const cleanKey = apiKey.trim();
  if (!cleanKey.startsWith("jmpy_")) {
    throw new Error("Invalid API Key format. It should start with 'jmpy_'.");
  }
  return cleanKey;
}

/**
 * Formats API errors for display in the PopClip tooltip.
 */
function handleApiError(error) {
  if (error.response) {
    const apiMessage = error.response.data?.message || error.response.data?.error || "";
    const status = error.response.status;
    if (status === 401 || status === 403) {
      return "Authentication failed: Please check your Jmpy API Key.";
    }
    return `Jmpy API Error (${status}): ${apiMessage || "Request failed"}`;
  } else if (error.request) {
    return "Network error: Unable to reach Jmpy.me. Check internet connection.";
  }
  return error.message || "An unexpected error occurred.";
}

module.exports = {
  app: {
    name: "Jmpy",
    link: "https://jmpy.me"
  },
  options: [
    {
      identifier: "apikey",
      type: "secret",
      label: "API Key",
      description: "Create an API key in your Jmpy.me dashboard → API Settings."
    },
    {
      identifier: "domain",
      type: "string",
      label: "API Domain",
      description: "Defaults to https://jmpy.me",
      defaultValue: "https://jmpy.me"
    }
  ],
  actions: [
    {
      title: "Jmpy Short URL",
      icon: "symbol:link.circle.fill",
      requirements: ["url"],
      after: "copy-result",
      code: async (input, options) => {
        try {
          const url = validateAndNormalizeUrl(input.text);
          const apiKey = validateApiKey(options.apikey);
          const apiDomain = (options.domain || "https://jmpy.me").trim().replace(/\/+$/, "");

          const response = await axios.post(`${apiDomain}/api/v1/short-urls`, {
            url: url,
            channel: 'popclip'
          }, {
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json'
            },
            timeout: 10000 // 10s timeout
          });

          if (response.data && response.data.data && response.data.data.short_url) {
            return response.data.data.short_url;
          } else {
            throw new Error("Invalid response format received from Jmpy.");
          }
        } catch (error) {
          throw new Error(handleApiError(error));
        }
      }
    },
    {
      title: "Jmpy QR Code",
      icon: "symbol:qrcode",
      requirements: ["url"],
      code: async (input, options) => {
        try {
          const url = validateAndNormalizeUrl(input.text);
          const apiKey = validateApiKey(options.apikey);
          const apiDomain = (options.domain || "https://jmpy.me").trim().replace(/\/+$/, "");

          const response = await axios.post(`${apiDomain}/api/v1/qr-codes/generate`, {
            content_type: 'url',
            content_data: { url: url },
            is_dynamic: true,
            tracking_enabled: true,
            use_short_url: true,
            source: 'EXTENSION',
            channel: 'popclip',
            qr_format: 'json'
          }, {
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json'
            },
            timeout: 10000 // 10s timeout
          });

          if (response.data && response.data.data && response.data.data.qr_code_url) {
            popclip.openUrl(response.data.data.qr_code_url);
          } else {
            throw new Error("Invalid response format received from Jmpy.");
          }
        } catch (error) {
          throw new Error(handleApiError(error));
        }
      }
    }
  ]
};
