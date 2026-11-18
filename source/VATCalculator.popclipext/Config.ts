// #popclip
// name: VAT Calculator
// identifier: com.pilotmoon.popclip.extension.vat-calculator
// description: Add or remove VAT (or GST, sales tax, etc.) on an amount.
// icon: iconify:tabler:receipt-tax
// keywords: vat gst sales tax tva iva mwst
// popclipVersion: 6221
// entitlements: [dynamic]

const options = [
  {
    identifier: "taxName",
    label: "Tax name",
    type: "multiple",
    values: ["VAT", "GST", "TVA", "IVA", "MwSt", "Sales Tax"],
    defaultValue: "VAT",
    allowOther: true,
    description:
      "Name shown in the menu and results. Choose Other to type your own.",
  },
  {
    identifier: "rate",
    label: "Tax rate (%)",
    type: "string",
    defaultValue: "20",
    description: "Tax percentage, for example 20 or 7.5.",
  },
] as const;

type VatOptions = InferOptions<typeof options>;

function taxName(options: VatOptions): string {
  const n = options.taxName.trim();
  return n === "" ? "VAT" : n;
}

function parseAmount(text: string): number {
  let s = text.replace(/[^\d.,-]/g, "");
  if (/,\d{1,2}$/.test(s)) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else {
    s = s.replace(/,/g, "");
    // Dots that only separate groups of three digits are thousands separators,
    // as in "1.234" or "1.234.567".
    if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(s)) {
      s = s.replace(/\./g, "");
    }
  }
  return Number(s);
}

function calculate(
  text: string,
  options: VatOptions,
  inclusive: boolean,
): string {
  const rateText = options.rate.trim();
  const rate = rateText === "" ? 20 : Number(rateText);
  if (!Number.isFinite(rate) || rate < 0) {
    throw popclip.settingsRequiredError("Invalid tax rate");
  }
  const amount = parseAmount(text);
  if (!Number.isFinite(amount)) {
    throw new Error("No valid number in selection");
  }
  const factor = 1 + rate / 100;
  const net = inclusive ? amount / factor : amount;
  const gross = inclusive ? amount : amount * factor;
  const tax = gross - net;
  return `Net ${net.toFixed(2)} + ${taxName(options)} ${tax.toFixed(2)} (${rate}%) = Gross ${gross.toFixed(2)}`;
}

defineExtension<VatOptions>({
  options,
  actions: (_input, options) => {
    const name = taxName(options);
    return [
      {
        title: name,
        regex: /\d/,
        submenu: [
          {
            title: `Add ${name}`,
            regex: /\d/,
            after: "show-result",
            code: (input) => calculate(input.text, options, false),
          },
          {
            title: `Remove ${name}`,
            regex: /\d/,
            after: "show-result",
            code: (input) => calculate(input.text, options, true),
          },
        ],
      },
    ];
  },
});
