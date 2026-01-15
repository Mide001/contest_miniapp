"use client";
import { useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Contest App</h1>
      <p>Welcome to the future of contests.</p>
    </div>
  );
}
