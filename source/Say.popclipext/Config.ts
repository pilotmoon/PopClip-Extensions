// #popclip
// identifier: com.pilotmoon.popclip.extension.say
// name: Say
// popclipVersion: 6221
// description: Speak the selected text aloud using the macOS system voice.
// keywords: speak talk voice
// icon: speechicon.png
// entitlements: [script]

const sayOptions = [
  {
    identifier: "voice",
    label: "Voice",
    type: "string",
    description:
      "The voice to use for speaking the text. Leave blank for the system default voice.",
  },
  {
    identifier: "rate",
    label: "Rate",
    type: "string",
    description:
      "Speech rate in words per minute (1–1000). Leave blank for the system default rate.",
  },
  {
    identifier: "info",
    label: "Info",
    type: "heading",
    description:
      "Defaults are in System Settings → Accessibility → Spoken Content. Voices list: https://www.popclip.app/extensions/x/emvaxx",
  },
] as const;

type SayOptions = InferOptions<typeof sayOptions>;

function validateRate(value: string, min: number, max: number): number {
  const number = Number(value);
  if (value.trim() === "" || !Number.isFinite(number)) {
    throw popclip.settingsRequiredError("Rate must be a valid number.");
  }
  if (number < min || number > max) {
    throw popclip.settingsRequiredError(
      `Rate must be a number between ${min} and ${max} words per minute.`,
    );
  }
  return number;
}

async function say(text: string, options: SayOptions) {
  const args = [];
  if (options.voice) {
    args.push("-v", options.voice);
  }
  if (options.rate.trim() !== "") {
    const rate = validateRate(options.rate, 1, 1000);
    args.push("-r", Math.round(rate));
  }

  await $`say ${args} ${text}`;
}

defineExtension<SayOptions>({
  options: sayOptions,
  action: (input, options) => say(input.text, options),
});
