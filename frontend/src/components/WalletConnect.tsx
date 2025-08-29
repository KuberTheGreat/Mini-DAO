
"use client";

import { usePrivy, useWallets, useConnectWallet } from "@privy-io/react-auth";

export default function WalletConnect() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const { connectWallet } = useConnectWallet();

  if (!ready) return null; // wait until Privy is ready

  return (
    <div className="flex flex-col items-center gap-4">
      {!authenticated ? (
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          onClick={login}
        >
          Connect Wallet
        </button>
      ) : (
        <>
            <p>{user?.wallet?.address}</p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            onClick={connectWallet}
          >
            Use DAO
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
