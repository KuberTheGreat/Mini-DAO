"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ABI, ADDRESS } from "@/utils/contract_data"; // <-- adjust import path

export default function JoinDao() {
  const [amount, setAmount] = useState(""); // input in ETH
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({ hash });

  function joinDAO() {
    if (!amount) return;
    const value = BigInt(Math.floor(Number(amount) * 1e18)); // convert ETH -> wei
    writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "joinDAO",
      value,
    });
  }

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white text-gray-900 space-y-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">Join DAO</h2>

      <input
        type="number"
        placeholder="Enter ETH amount"
        className="border rounded-xl px-3 py-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={joinDAO}
        disabled={isPending || !amount}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
      >
        {isPending ? "Confirm in Wallet..." : "Join DAO"}
      </button>

      {hash && (
        <p className="text-sm font-mono break-words">
          Tx Hash: {hash}
        </p>
      )}

      {receipt.isSuccess && (
        <p className="text-green-600">✅ Joined DAO successfully!</p>
      )}

      {error && <p className="text-red-600">⚠️ {error.message}</p>}
    </div>
  );
}
