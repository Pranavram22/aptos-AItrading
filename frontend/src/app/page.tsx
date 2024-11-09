"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

interface Trade {
  type: "BUY" | "SELL";
  price: number;
  timestamp: string;
}

export default function Home() {
  const { connect, account, connected, disconnect } = useWallet();
  const [price, setPrice] = useState<number>(0);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isTrading, setIsTrading] = useState(false);
  const [balance, setBalance] = useState<string>("0");

  // Simulate price movement
  useEffect(() => {
    if (isTrading) {
      const interval = setInterval(() => {
        setPrice(prev => {
          const change = (Math.random() - 0.5) * 2;
          return Number((prev + change).toFixed(2));
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTrading]);

  // Simple trading algorithm
  useEffect(() => {
    if (isTrading && price > 0) {
      const interval = setInterval(() => {
        const tradeType: "BUY" | "SELL" = Math.random() > 0.5 ? "BUY" : "SELL";
        const newTrade: Trade = {
          type: tradeType,
          price: price,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setTrades(prev => [newTrade, ...prev].slice(0, 5));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isTrading, price]);

  // Fetch balance (mock)
  const fetchBalance = async () => {
    if (!account?.address) return;
    try {
      // This is a mock balance - replace with actual Aptos balance fetch
      const mockBalance = (Math.random() * 100).toFixed(2);
      setBalance(mockBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected]);

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Aptos Trading Bot
        </h1>

        {!connected ? (
          <div className="text-center">
            <button
              onClick={() => connect()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wallet Info */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Wallet Info</h2>
              <p className="text-gray-300 break-all">{account?.address}</p>
              <p className="mt-2">Balance: {balance} APT</p>
            </div>

            {/* Trading Controls */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Trading Controls</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsTrading(!isTrading)}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold ${
                    isTrading 
                      ? "bg-red-600 hover:bg-red-700" 
                      : "bg-green-600 hover:bg-green-700"
                  } transition-colors`}
                >
                  {isTrading ? "Stop Trading" : "Start Trading"}
                </button>
                <button
                  onClick={() => disconnect()}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg font-bold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Market Data */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Market Data</h2>
              <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            </div>

            {/* Recent Trades */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
              <div className="space-y-2">
                {trades.map((trade, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-2 rounded"
                  >
                    <span className={trade.type === "BUY" ? "text-green-500" : "text-red-500"}>
                      {trade.type}
                    </span>
                    <span>${trade.price.toFixed(2)}</span>
                    <span className="text-gray-400">{trade.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}