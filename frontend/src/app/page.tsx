// app/page.tsx

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Aptos AI Trading App</h1>
      <p>Your gateway to automated trading on the Aptos blockchain.</p>
      
      <Link href="/tradingpage" style={{ fontSize: '20px', color: 'blue', textDecoration: 'underline' }}>
        Go to Trading Platform
      </Link>
    </div>
  )
}
