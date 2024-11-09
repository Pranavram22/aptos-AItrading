// src/services/api.ts

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const fetchMarketData = async (coinIds: string[]): Promise<CryptoPrice[]> => {
  const response = await fetch(
    `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
  );
  return await response.json();
};

export const fetchHistoricalData = async (coinId: string, days: number): Promise<MarketData> => {
  const response = await fetch(
    `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  return await response.json();
};

export const connectWebSocket = (onMessage: (data: any) => void) => {
  const ws = new WebSocket(BINANCE_WS_URL);
  const symbols = ['aptusdt', 'btcusdt', 'ethusdt'].map(s => `${s}@ticker`);

  ws.onopen = () => {
    console.log('WebSocket Connected');
    ws.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params: symbols,
      id: 1
    }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return ws;
};

// AI Trading Signal Generator
export const generateTradingSignals = (priceData: CryptoPrice) => {
  const prices = priceData.sparkline_in_7d.price;
  const MA7 = calculateMA(prices, 7);
  const MA14 = calculateMA(prices, 14);
  const RSI = calculateRSI(prices);
  
  return {
    trend: MA7[MA7.length - 1] > MA14[MA14.length - 1] ? 'BULLISH' : 'BEARISH',
    strength: RSI,
    confidence: calculateConfidence(RSI, MA7[MA7.length - 1], MA14[MA14.length - 1]),
    nextPricePrediction: predictNextPrice(prices),
    recommendedAction: getRecommendedAction(RSI, MA7[MA7.length - 1], MA14[MA14.length - 1])
  };
};

function calculateMA(prices: number[], period: number): number[] {
  const ma = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    ma.push(sum / period);
  }
  return ma;
}

function calculateRSI(prices: number[]): number {
  const changes = prices.slice(1).map((price, i) => price - prices[i]);
  const gains = changes.filter(change => change > 0);
  const losses = changes.filter(change => change < 0).map(loss => Math.abs(loss));
  
  const avgGain = gains.reduce((a, b) => a + b, 0) / 14;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / 14;
  
  const RS = avgGain / avgLoss;
  return 100 - (100 / (1 + RS));
}

function calculateConfidence(rsi: number, ma7: number, ma14: number): number {
  const trendStrength = Math.abs(ma7 - ma14) / ma14 * 100;
  const rsiConfidence = Math.abs(50 - rsi) / 50 * 100;
  return (trendStrength + rsiConfidence) / 2;
}

function predictNextPrice(prices: number[]): number {
  const lastPrice = prices[prices.length - 1];
  const priceChange = prices[prices.length - 1] - prices[prices.length - 2];
  const momentum = priceChange / prices[prices.length - 2];
  return lastPrice * (1 + momentum);
}

function getRecommendedAction(rsi: number, ma7: number, ma14: number): string {
  if (rsi > 70) return 'STRONG_SELL';
  if (rsi < 30) return 'STRONG_BUY';
  if (ma7 > ma14) return 'BUY';
  return 'SELL';
}