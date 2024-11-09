'use client' // This will make this component a Client Component

import { useState } from 'react'
import Link from 'next/link'

export default function RiskManagement() {
  const [tradeAmount, setTradeAmount] = useState(0)
  const [stopLoss, setStopLoss] = useState(0)
  const [riskLevel, setRiskLevel] = useState('')

  // Function to calculate risk level
  const calculateRisk = (amount: number, stopLoss: number) => {
    if (amount <= 0 || stopLoss <= 0) {
      setRiskLevel('Invalid inputs')
      return
    }
    const risk = (stopLoss / amount) * 100
    if (risk < 5) {
      setRiskLevel('Low Risk')
    } else if (risk >= 5 && risk < 15) {
      setRiskLevel('Medium Risk')
    } else {
      setRiskLevel('High Risk')
    }
  }

  return (
    <>
      <style jsx>{`
        /* Base Styles */
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #0a0a0a;
          color: #e0e0e0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        /* Page Container */
        .min-h-screen {
          background: linear-gradient(145deg, #1a1a1a, #1c1c1c);
          color: #fff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        h1 {
          color: #ffffff;
          font-size: 2.5rem;
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        button {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        button:hover {
          transform: scale(1.05);
        }

        /* Card Layout */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .grid .bg-gray-800 {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          color: #e0e0e0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .grid .bg-gray-800:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-6px);
        }

        .text-gray-400 {
          color: #b3b3b3;
        }

        /* Form Elements */
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        input,
        select {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          color: #f1f1f1;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 1rem;
        }

        input:focus,
        select:focus {
          border-color: #007acc;
          outline: none;
          box-shadow: 0 0 8px rgba(0, 122, 204, 0.6);
        }

        /* Start/Stop Trading Button */
        button.bg-green-600,
        button.bg-red-600 {
          font-weight: bold;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          color: #ffffff;
          transition: background-color 0.3s ease, transform 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }

        button.bg-green-600 {
          background: linear-gradient(145deg, #23c483, #20af75);
        }

        button.bg-red-600 {
          background: linear-gradient(145deg, #e05d5d, #cc5252);
        }

        button.bg-green-600:hover {
          background: linear-gradient(145deg, #20af75, #1e9f69);
        }

        button.bg-red-600:hover {
          background: linear-gradient(145deg, #cc5252, #ba4848);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="min-h-screen">
        <div className="container">
          <h1>Risk Management in AI Trading</h1>
          <p>Evaluate and manage your trading risks with the help of AI-powered tools.</p>

          {/* Risk Assessment Calculator */}
          <div className="card">
            <h2>Risk Assessment Calculator</h2>
            <p>Use this tool to assess the risk level of your trades based on trade amount and stop-loss settings.</p>
            
            <label htmlFor="tradeAmount">Trade Amount</label>
            <input
              id="tradeAmount"
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(Number(e.target.value))}
              placeholder="Enter trade amount"
            />
            
            <label htmlFor="stopLoss">Stop Loss (%)</label>
            <input
              id="stopLoss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              placeholder="Enter stop loss percentage"
            />
            
            <button onClick={() => calculateRisk(tradeAmount, stopLoss)}>Calculate Risk</button>
            
            {riskLevel && <p className="text-gray-400">Risk Level: {riskLevel}</p>}
          </div>

          {/* AI Risk Management */}
          <div className="card">
            <h2>AI Risk Management</h2>
            <p>
              Our AI trading system adapts in real-time to minimize risk. It uses advanced algorithms to automatically adjust stop-loss settings and trade position sizes based on market conditions.
            </p>
            <ul>
              <li><strong>Stop-loss Settings:</strong> AI adjusts stop-loss to protect your portfolio in volatile markets.</li>
              <li><strong>Trade Position Sizing:</strong> The system calculates optimal trade size to balance risk and reward.</li>
            </ul>
          </div>

          {/* Leverage and Margin */}
          <div className="card">
            <h2>Leverage and Margin</h2>
            <p>
              Leverage allows you to control a larger position with a smaller amount of capital, but it increases both potential returns and risk.
            </p>
            <p>
              Our AI system provides guidance on managing leverage and margin to ensure that you do not overextend yourself in risky trades.
            </p>
            <ul>
              <li><strong>Leverage:</strong> The AI recommends appropriate leverage levels based on market conditions.</li>
              <li><strong>Margin:</strong> The AI ensures you maintain adequate margin to avoid liquidation during market downturns.</li>
            </ul>
          </div>

      
        </div>
      </div>
    </>
  )
}