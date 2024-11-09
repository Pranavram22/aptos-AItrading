"use client";
import React, { useState, useEffect } from "react";
import { FaPlay, FaStop, FaWallet, FaArrowUp, FaArrowDown, FaDollarSign, FaClock } from "react-icons/fa";
import "./TradingPlatform.css";

interface TradeHistory {
  type: "BUY" | "SELL";
  amount: number;
  price: number;
  timestamp: string;
}

export default function TradingPlatform() {
  const [currentPrice, setCurrentPrice] = useState<number>(10);
  const [isTrading, setIsTrading] = useState(false);
  const [tradeAmount, setTradeAmount] = useState("1");
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>([]);
  const [profitLoss, setProfitLoss] = useState<number>(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [balance, setBalance] = useState("1000.00");

  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        setCurrentPrice((prev) => {
          const change = (Math.random() - 0.5) * 0.5;
          return Number((prev + change).toFixed(2));
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTrading]);

  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        const decision = Math.random() > 0.5 ? "BUY" : "SELL";
        const amount = parseFloat(tradeAmount);

        const newTrade: TradeHistory = {
          type: decision,
          amount: amount,
          price: currentPrice,
          timestamp: new Date().toLocaleTimeString(),
        };

        setTradeHistory((prev) => [newTrade, ...prev].slice(0, 10));

        const tradeValue = amount * currentPrice;
        const tradePL = decision === "BUY" ? -tradeValue : tradeValue;
        setProfitLoss((prev) => Number((prev + tradePL).toFixed(2)));
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isTrading, currentPrice, tradeAmount]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Trading Platform</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            <FaWallet /> Connect Wallet
          </button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-gray-400 mb-2 text-sm">Current Price</div>
            <div className="text-3xl font-bold">${currentPrice.toFixed(2)}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-gray-400 mb-2 text-sm">Balance</div>
            <div className="text-3xl font-bold">${balance}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="text-gray-400 mb-2 text-sm">Profit/Loss</div>
            <div
              className={`text-3xl font-bold ${profitLoss >= 0 ? "text-green-500" : "text-red-500"} transition-colors duration-500 flex items-center`}
            >
              {profitLoss >= 0 ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
              ${profitLoss.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Trading Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Trading Controls</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2 flex items-center">
                  <FaDollarSign className="mr-2" /> Trade Amount
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2 flex items-center">
                  <FaClock className="mr-2" /> Timeframe
                </label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full bg-gray-700 p-3 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="1h">1 Hour</option>
                  <option value="4h">4 Hours</option>
                  <option value="1d">1 Day</option>
                </select>
              </div>
              <div className="flex-1 flex items-end">
                <button
                  onClick={() => setIsTrading(!isTrading)}
                  className={`w-full p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-md ${
                    isTrading ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isTrading ? <><FaStop /> Stop Trading</> : <><FaPlay /> Start Trading</>}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Trading Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span>65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Trades</span>
                <span>{tradeHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Trade Size</span>
                <span>${(parseFloat(tradeAmount) * currentPrice).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade History */}
        <div className="bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Recent Trades</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {tradeHistory.map((trade, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <span className={`font-bold ${trade.type === "BUY" ? "text-green-500" : "text-red-500"}`}>
                    {trade.type}
                  </span>
                  <span>{trade.amount.toFixed(2)} Units</span>
                  <span>${trade.price.toFixed(2)}</span>
                  <span className="text-gray-400">{trade.timestamp}</span>
                </div>
              ))}
              {tradeHistory.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  No trades yet. Start trading to see your history.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
