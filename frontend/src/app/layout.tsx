"use client";

import Providers from "@/components/Provider";
import { PrivyProvider } from "@privy-io/react-auth";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
