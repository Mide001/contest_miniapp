import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import { RootProvider } from "./rootProvider";
import BottomNav from "../components/layout/BottomNav";
import TopNav from "../components/layout/TopNav";
import AppInitializer from "../components/layout/AppInitializer";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaseArena",
  description: "Join and win contests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RootProvider>
          <AppInitializer />
          <TopNav />
          <div style={{ paddingBottom: '80px' }}>
            {children}
          </div>
          <BottomNav />
        </RootProvider>
      </body>
    </html>
  );
}
