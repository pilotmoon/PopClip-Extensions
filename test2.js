const regexStr = "(?:[$€£¥₹₽฿₱₩₪₨₦₴₡₵¢円元]\\s*[\\d,.]+(?:[.,]\\d{2,})?)|(?:\\b(?:USD?|EUR?|GBP|JPY|CNY|TWD|HKD|SGD|AUD|CAD|CHF|SEK|NZD|KRW|INR|BRL|ZAR|MXN|RUB|THB|MYR|IDR|PHP|VND|AED|Dh|Dirham|Dhiram)\\b\\s+[\\d,.]+(?:[.,]\\d{2,})?)|(?:[\\d,.]+(?:[.,]\\d{2,})?\\s*(?:USD?|EUR?|GBP|JPY|CNY|TWD|HKD|SGD|AUD|CAD|CHF|SEK|NZD|KRW|INR|BRL|ZAR|MXN|RUB|THB|MYR|IDR|PHP|VND|AED|Dh|Dirham|Dhiram|円|元))";
const regex = new RegExp(regexStr);
console.log("Match 122,850:", !!'122,850'.match(regex));
console.log("Match 122,850JPY:", !!'122,850JPY'.match(regex));
