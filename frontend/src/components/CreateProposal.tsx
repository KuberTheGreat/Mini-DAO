"use client";

import { useState } from "react";
import { useCreateProposal } from "@/contract/functions";

export default function CreateProposalForm() {
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { create, hash, error, isPending, receipt } = useCreateProposal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !recipient || !amount) return;

    try {
      create(description, recipient as `0x${string}`, BigInt(amount));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white/10 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Create Proposal</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Proposal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 bg-transparent"
        />

        <input
          type="text"
          placeholder="Recipient address (0x...)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 bg-transparent"
        />

        <input
          type="number"
          placeholder="Amount (wei)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded-xl border border-gray-300 bg-transparent"
        />

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Submit Proposal"}
        </button>
      </form>

      {hash && <p className="mt-3 text-green-400">Tx Hash: {hash}</p>}
      {error && <p className="mt-3 text-red-400">Error: {error.message}</p>}
      {receipt?.status === "success" && (
        <p className="mt-3 text-green-500">✅ Proposal created!</p>
      )}
    </div>
  );
}
