
"use client";

import { usePrivy, useWallets, useConnectWallet } from "@privy-io/react-auth";

export default function WalletConnect() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const { connectWallet } = useConnectWallet();

  if (!ready) return null; // wait until Privy is ready

  return (
  <div className="flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center gap-6">
      {!authenticated ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to the DAO</h1>
          <p className="text-gray-500 text-center">
            Connect your wallet to get started and participate in governance.
          </p>
          <button
            onClick={login}
            className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Connect Wallet
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800">Wallet Connected</h2>
          <p className="text-gray-600 text-sm break-words bg-gray-100 px-3 py-2 rounded-lg w-full text-center">
            {user?.wallet?.address}
          </p>
          <button
            onClick={connectWallet}
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Use DAO
          </button>
          <button
            onClick={logout}
            className="w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
);

}
