import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            {/* Image removed */}
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tradingpage">Trading-Platform</a></li>
            <li><a href="/marketoverview">Market Overview</a></li>
            <li><a href="/riskmanage">Risk Management</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <h1 className="title">Welcome to the Aptos AI Trading Platform</h1>
        <p>
        The Aptos Trading Platform offers a seamless and efficient trading experience, built on the secure and scalable Aptos blockchain. It features an intuitive Trading Platform with real-time data, customizable charts, and fast order execution for a wide range of assets. The Market Overview provides traders with up-to-date market trends, asset performance, and in-depth analytics to make informed decisions. With robust Risk Management tools, including stop-loss orders, trailing stops, and personalized risk analysis, the platform helps safeguard your investments and reduce exposure to market volatility.</p>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Aptos AI Trading Platform</p>
      </footer>
    </div>
  );
};

export default Home;
