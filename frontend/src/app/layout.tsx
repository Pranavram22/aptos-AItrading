import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const inter = Inter({ subsets: ["latin"] });
const wallets = [new PetraWallet()];

export const metadata: Metadata = {
  title: "Aptos Trading Bot",
  description: "Simple trading bot for Aptos blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}