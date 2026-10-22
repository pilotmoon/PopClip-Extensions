// #popclip
// name: Unix Time
// identifier: com.pilotmoon.popclip.extension.unix-time
// description: Convert Unix timestamps to formatted dates and times.
// keywords: convert seconds milliseconds epoch timestamp
// icon: UnixTime.png
// show as: text
// entitlements: [dynamic]
// popclipVersion: 5155

const UTC_TIME_ZONE = "UTC";
const INTERNATIONAL_LOCALE = "zu";
const SYSTEM_SETTING = "";
const MAX_UINT32 = 2 ** 32 - 1;
const UNIX_TIME_PATTERN = /^\d[\d ]{3,15}\d$/u;

const unixTimeOptions = [
  {
    identifier: "locale",
    label: "Date & Time Format",
    type: "multiple",
    values: [INTERNATIONAL_LOCALE, SYSTEM_SETTING],
    valueLabels: ["International Standard", "System"],
    defaultValue: INTERNATIONAL_LOCALE,
  },
  {
    identifier: "timeZone",
    label: "Time Zone",
    type: "multiple",
    values: [UTC_TIME_ZONE, SYSTEM_SETTING],
    valueLabels: ["Coordinated Universal Time", "System"],
    defaultValue: UTC_TIME_ZONE,
  },
  {
    identifier: "handleMilliseconds",
    label: "Automatically handle milliseconds",
    type: "boolean",
    defaultValue: true,
  },
] as const;

type UnixTimeOptions = InferOptions<typeof unixTimeOptions>;

function parseUnixTime(
  input: string,
  handleMilliseconds: boolean,
): Date | undefined {
  const value = Number(input.replaceAll(" ", ""));
  const milliseconds =
    handleMilliseconds && value > MAX_UINT32 ? value : value * 1000;
  const date = new Date(milliseconds);

  return Number.isNaN(date.valueOf()) ? undefined : date;
}

function formatUtc(date: Date): string {
  return date
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/u, ` ${UTC_TIME_ZONE}`);
}

function formatUnixTime(
  input: string,
  { handleMilliseconds, locale, timeZone }: UnixTimeOptions,
): string | undefined {
  const date = parseUnixTime(input, handleMilliseconds);
  if (date === undefined) {
    return undefined;
  }

  if (locale === INTERNATIONAL_LOCALE && timeZone === UTC_TIME_ZONE) {
    return formatUtc(date);
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  };
  if (timeZone !== SYSTEM_SETTING) {
    formatOptions.timeZone = timeZone;
  }

  return new Intl.DateTimeFormat(
    locale === SYSTEM_SETTING ? undefined : locale,
    formatOptions,
  ).format(date);
}

defineExtension<UnixTimeOptions>({
  options: unixTimeOptions,
  actions: (input, options) => {
    if (!UNIX_TIME_PATTERN.test(input.text)) {
      return;
    }

    const result = formatUnixTime(input.text, options);
    if (result === undefined) {
      return;
    }

    return {
      title: result,
      icon: null,
      after: "copy-result",
      code: () => result,
    };
  },
  test: testUnixTime,
});

/*
Run with:
  /Applications/PopClip.app/Contents/MacOS/PopClip run Config.ts test
*/
function testUnixTime(): void {
  const utcOptions: UnixTimeOptions = {
    timeZone: UTC_TIME_ZONE,
    locale: INTERNATIONAL_LOCALE,
    handleMilliseconds: false,
  };
  const testCases: readonly [
    input: string,
    options: UnixTimeOptions,
    expected: string,
  ][] = [
    ["1535438729", utcOptions, "2018-08-28 06:45:29 UTC"],
    ["2 147 483 647", utcOptions, "2038-01-19 03:14:07 UTC"],
    ["4294967295", utcOptions, "2106-02-07 06:28:15 UTC"],
    ["2147483647000", utcOptions, "+070021-01-17 19:16:40 UTC"],
    ["4294967295000", utcOptions, "+138072-02-04 14:50:00 UTC"],
    [
      "2147483647000",
      { ...utcOptions, handleMilliseconds: true },
      "2038-01-19 03:14:07 UTC",
    ],
    [
      "4294967295000",
      { ...utcOptions, handleMilliseconds: true },
      "2106-02-07 06:28:15 UTC",
    ],
  ];

  let failures = 0;
  for (const [input, testOptions, expected] of testCases) {
    const result = formatUnixTime(input, testOptions);
    const passed = result === expected;
    print(`${input} -> ${result ?? "invalid"} ${passed ? "OK" : "FAIL"}`);
    if (!passed) {
      failures += 1;
    }
  }

  if (failures > 0) {
    throw new Error(`${failures} test(s) failed`);
  }
}
