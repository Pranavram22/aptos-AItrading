"use client"
import React, { useState } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import './crypto-dashboard.css'

// Types remain the same
interface HistoricalDataPoint {
  date: string;
  price: number;
}

interface CryptoData {
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  historicalData: HistoricalDataPoint[];
  change24h: number;
  volume24h: number;
  marketCap: number;
}

// Sample data remains the same
const cryptoData: CryptoData[] = [
  {
    name: "Bitcoin",
    currentPrice: 65420,
    predictedPrice: 72000,
    confidence: 85,
    change24h: 2.5,
    volume24h: 28500000000,
    marketCap: 1280000000000,
    historicalData: [
      { date: '2024-01', price: 42000 },
      { date: '2024-02', price: 48000 },
      { date: '2024-03', price: 52000 },
      { date: '2024-04', price: 58000 },
      { date: '2024-05', price: 65420 },
      { date: '2024-06', price: 72000 },
    ]
  },
];

const Page = () => {
  const [selectedCrypto] = useState<CryptoData>(cryptoData[0]);
  
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-8">Crypto Market Overview</h1>
      
      <div className="alert-warning">
        <div className="alert-title">
          <AlertTriangle className="h-5 w-5" />
          Price Prediction Disclaimer
        </div>
        <div className="alert-description">
          Predictions are based on historical data and market analysis. 
          Cryptocurrency markets are highly volatile - always do your own research.
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">Current Price</div>
          <div className="stat-card-content">
            <div className="price-value">{formatNumber(selectedCrypto.currentPrice)}</div>
            <div className={`price-change ${selectedCrypto.change24h > 0 ? 'positive' : 'negative'}`}>
              {selectedCrypto.change24h > 0 ? 
                <ArrowUp className="w-4 h-4" /> : 
                <ArrowDown className="w-4 h-4" />
              }
              {formatPercentage(selectedCrypto.change24h)}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">Predicted Price</div>
          <div className="stat-card-content">
            <div className="price-value">{formatNumber(selectedCrypto.predictedPrice)}</div>
            <div className="text-sm text-gray-500">
              Confidence: {selectedCrypto.confidence}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">24h Volume</div>
          <div className="stat-card-content">
            <div className="price-value">{formatNumber(selectedCrypto.volume24h)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">Market Cap</div>
          <div className="stat-card-content">
            <div className="price-value">{formatNumber(selectedCrypto.marketCap)}</div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h2 className="text-lg font-semibold">Price Prediction Chart</h2>
        </div>
        <div className="chart-content">
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={selectedCrypto.historicalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--primary-color)"
                strokeWidth={2}
                dot={{ fill: 'var(--primary-color)', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer> */}
        </div>
      </div>

      <div className="market-analysis">
        <div className="stat-card-header">
          <h2 className="text-lg font-semibold">Market Analysis</h2>
        </div>
        <div className="stat-card-content">
          <div className="trend-indicator">
            {selectedCrypto.predictedPrice > selectedCrypto.currentPrice ? (
              <TrendingUp className="text-success-color" />
            ) : (
              <TrendingDown className="text-danger-color" />
            )}
            <span className="trend-value">
              Predicted Movement: {' '}
              {formatPercentage(
                ((selectedCrypto.predictedPrice - selectedCrypto.currentPrice) / selectedCrypto.currentPrice) * 100
              )}
            </span>
          </div>
          <p className="text-text-secondary">
            Based on current market trends, technical analysis, and historical data patterns,
            our AI model predicts a {selectedCrypto.predictedPrice > selectedCrypto.currentPrice ? 'bullish' : 'bearish'} trend
            with {selectedCrypto.confidence}% confidence. Key factors include market sentiment,
            trading volume, and broader market conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;