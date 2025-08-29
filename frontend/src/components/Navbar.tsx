"use client";

import { useState } from "react";

export default function Navbar() {
  const [connected, setConnected] = useState(false);

  
  
  return (
    <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-2xl mb-6">
      <h1 className="text-xl font-bold text-indigo-600">My DAO</h1>
      <button
        onClick={() => setConnected(!connected)}
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        {connected ? "Disconnect" : "Connect Wallet"}
      </button>
    </nav>
  );
}
