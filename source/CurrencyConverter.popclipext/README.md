# Currency Converter

Convert currency amounts with real-time exchange rates directly in PopClip.

## Features

- 🌍 **Auto-detect currency symbols** - Recognizes $, €, £, ¥, and many more
- 🔤 **Support for currency codes** - Works with USD, EUR, TWD, JPY, etc.
- 💱 **Real-time exchange rates** - Fetches current rates from ExchangeRate API
- 🎯 **Customizable target currency** - Select from 24+ major currencies with flags
- 📊 **Smart number parsing** - Handles various formats (1,100 or 1.100 or 79,00)
- ⚡ **Instant results** - Shows converted amount directly in PopClip

## Usage

1. Select any text containing a currency amount:
   - `$1,100`
   - `€79,00`
   - `£50.25`
   - `100 USD`
   - `¥10,000`

2. Click the 💵 **Currency Converter** icon in PopClip

3. The converted amount appears instantly in PopClip's interface

## Configuration

### Setting Your Target Currency

1. Open PopClip Preferences
2. Go to **Extensions** tab
3. Find **Currency Converter**
4. Click the gear icon ⚙️
5. Select your preferred currency from the dropdown menu (e.g., 🇹🇼 TWD)

### Supported Currencies

The extension supports 24+ major world currencies:

- 🇹🇼 **TWD** - New Taiwan Dollar
- 🇺🇸 **USD** - US Dollar
- 🇪🇺 **EUR** - Euro
- 🇬🇧 **GBP** - British Pound
- 🇯🇵 **JPY** - Japanese Yen
- 🇨🇳 **CNY** - Chinese Yuan
- 🇭🇰 **HKD** - Hong Kong Dollar
- 🇸🇬 **SGD** - Singapore Dollar
- 🇦🇺 **AUD** - Australian Dollar
- 🇨🇦 **CAD** - Canadian Dollar
- 🇨🇭 **CHF** - Swiss Franc
- 🇸🇪 **SEK** - Swedish Krona
- 🇳🇿 **NZD** - New Zealand Dollar
- 🇰🇷 **KRW** - South Korean Won
- 🇮🇳 **INR** - Indian Rupee
- 🇧🇷 **BRL** - Brazilian Real
- 🇿🇦 **ZAR** - South African Rand
- 🇲🇽 **MXN** - Mexican Peso
- 🇷🇺 **RUB** - Russian Ruble
- 🇹🇭 **THB** - Thai Baht
- 🇲🇾 **MYR** - Malaysian Ringgit
- 🇮🇩 **IDR** - Indonesian Rupiah
- 🇵🇭 **PHP** - Philippine Peso
- 🇻🇳 **VND** - Vietnamese Dong

### Optional: API Key for Higher Rate Limits

The extension uses the free [ExchangeRate API](https://www.exchangerate-api.com) with a limit of 1,500 requests per month. For higher limits:

1. Sign up for a free account at [ExchangeRate-API.com](https://www.exchangerate-api.com)
2. Copy your API key
3. Paste it in the extension settings under "API Key (Optional)"

## Examples

### Basic Usage
Select: `$1,100`  
Result: `$1,100.00 = NT$34,100.00` (assuming TWD is your target currency)

### European Format
Select: `€79,00`  
Result: `€79.00 = NT$2,700.45`

### With Currency Code
Select: `100 USD`  
Result: `$100.00 = NT$3,100.00`

### Already in Target Currency
Select: `NT$5,000` (when TWD is target)  
Result: `Already in TWD: NT$5,000.00`

## Requirements

- **PopClip** 2021.11 or later
- **macOS** 10.13 or later
- **Internet connection** for real-time exchange rates

## Privacy & Network Usage

This extension requires network access to fetch real-time exchange rates from ExchangeRate API. No personal data is collected or transmitted. Only the currency codes and amounts are sent to the API endpoint for conversion calculations.

## Technical Details

- **Language**: JavaScript
- **API**: ExchangeRate API (free tier)
- **Update frequency**: Real-time on each conversion
- **Cache**: No caching (always fetches current rates)

## Troubleshooting

### Extension doesn't appear
- Make sure you've selected text containing a recognizable currency amount
- Check that the text matches one of the supported formats

### "API Error" message
- Verify your internet connection
- If using an API key, check that it's valid
- Free API may have reached monthly limit (1,500 requests)

### Wrong currency detected
- Try including the currency code explicitly (e.g., "100 USD" instead of just "$100")
- Some symbols like ¥ can represent multiple currencies (JPY/CNY)

## Credits

Created by [Loso Kao / GitHub: loliboso]

Uses the [ExchangeRate API](https://www.exchangerate-api.com) for real-time currency conversion.

## License

MIT License - feel free to modify and distribute

## Changelog

### Version 1.0.0 (2024-11-12)
- Initial release
- Support for 24+ major currencies
- Auto-detection of currency symbols and codes
- Real-time exchange rates
- Customizable target currency with flag icons
- Optional API key support

## Support

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/pilotmoon/PopClip-Extensions).

For general PopClip questions, visit the [PopClip Forum](https://forum.popclip.app).