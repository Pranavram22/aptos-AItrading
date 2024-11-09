// src/app/layout.tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Trading Platform</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}