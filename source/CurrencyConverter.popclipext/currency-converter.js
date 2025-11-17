// 定義貨幣符號到代碼的對應
const CURRENCY_SYMBOLS = {
  '$': 'USD',
  '€': 'EUR',
  '£': 'GBP',
  '¥': 'JPY',
  '₹': 'INR',
  '₽': 'RUB',
  '฿': 'THB',
  '₱': 'PHP',
  '₩': 'KRW',
  '₪': 'ILS',
  '₨': 'PKR',
  '₦': 'NGN',
  '₴': 'UAH',
  '₡': 'CRC',
  '₵': 'GHS',
  '¢': 'USD'
};

// 解析文字中的貨幣和金額
function parseCurrency(text) {
  const cleanText = text.trim();
  
  let currency = null;
  for (const [symbol, code] of Object.entries(CURRENCY_SYMBOLS)) {
    if (cleanText.includes(symbol)) {
      currency = code;
      break;
    }
  }
  
  const currencyCodeMatch = cleanText.match(/\b(USD?|EUR?|GBP|JPY|CNY|TWD|HKD|SGD|AUD|CAD|CHF|SEK|NZD|KRW|INR|BRL|ZAR|MXN|RUB|THB|MYR|IDR|PHP|VND)\b/i);
  if (currencyCodeMatch) {
    currency = currencyCodeMatch[1].toUpperCase();
    if (currency === 'US') currency = 'USD';
    if (currency === 'EU') currency = 'EUR';
  }
  
  if (!currency) {
    currency = 'USD';
  }
  
  const numberMatch = cleanText.match(/[\d,]+(?:[.,]\d{2})?/);
  if (!numberMatch) {
    throw new Error('無法解析金額');
  }
  
  let amountStr = numberMatch[0];
  
  if (amountStr.match(/,\d{2}$/)) {
    amountStr = amountStr.replace(',', '.');
  }
  
  amountStr = amountStr.replace(/,/g, '');
  
  const amount = parseFloat(amountStr);
  
  if (isNaN(amount)) {
    throw new Error('金額格式無效');
  }
  
  return { currency, amount };
}

// 格式化貨幣顯示
function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// 獲取匯率
async function getExchangeRate(fromCurrency, toCurrency, apiKey) {
  const baseUrl = apiKey 
    ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
    : `https://open.er-api.com/v6/latest/${fromCurrency}`;
  
  const axios = require('axios');
  const response = await axios.get(baseUrl);
  
  if (response.data.result === 'error') {
    throw new Error(response.data['error-type'] || 'API 錯誤');
  }
  
  const rates = response.data.rates;
  
  if (!rates[toCurrency]) {
    throw new Error(`不支援的幣種: ${toCurrency}`);
  }
  
  return rates[toCurrency];
}

// 主要動作 - 完全比照 snippet 的格式
exports.actions = [{
  code: async (input, options) => {
    try {
      const text = input.text;
      // 從下拉選單的值中提取貨幣代碼（移除國旗emoji）
      const targetCurrency = options.targetCurrency.split(' ').pop().toUpperCase();
      
      const { currency: fromCurrency, amount } = parseCurrency(text);
      
      if (fromCurrency === targetCurrency) {
        popclip.showText(`Already in ${targetCurrency}: ${formatCurrency(amount, targetCurrency)}`);
        return;
      }
      
      const rate = await getExchangeRate(fromCurrency, targetCurrency, options.apiKey);
      const convertedAmount = amount * rate;
      
      const result = `${formatCurrency(amount, fromCurrency)} = ${formatCurrency(convertedAmount, targetCurrency)}`;
      popclip.showText(result, { preview: true });
      
    } catch (error) {
      popclip.showText(`錯誤: ${error.message}`);
    }
  }
}];