"use client";

import { useEffect, useState } from "react";
import { createConfig, http, injected, readContract, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { ABI, ADDRESS } from "@/utils/contract_data";
import { monadTestnet } from "viem/chains";
import { useVote } from "@/contract/functions";

const config = createConfig({
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
      [monadTestnet.id]: http()
  },
})

export default function ProposalList() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const {vote, hash, error, isPending} = useVote();

  useEffect(() => {
    async function fetchProposals() {
      setLoading(true);
      try {
        // 1. Get proposal count
        const count = await readContract(config, {
          abi: ABI,
          address: ADDRESS,
          functionName: "getProposalCount",
        });

        // 2. Fetch each proposal
        const fetched: any[] = [];
        for (let i = 1; i <= Number(count); i++) {
          const proposal = await readContract(config, {
            abi: ABI,
            address: ADDRESS,
            functionName: "proposals",
            args: [BigInt(i)],
          });
          fetched.push(proposal);
        }

        setProposals(fetched);
      } catch (err) {
        console.error("Error fetching proposals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, []);

  if (loading) return <p>Loading proposals...</p>;

  return (
    // <div className="space-y-4">
    //   <h2 className="text-xl font-bold">Proposals</h2>
    //   {proposals.length === 0 ? (
    //     <p>No proposals yet.</p>
    //   ) : (
    //     proposals.map((p, idx) => (
    //       <div key={idx} className="p-4 border rounded-lg shadow">
    //         <p><b>ID:</b> {String(p[0])}</p>
    //         <p><b>Description:</b> {p[1]}</p>
    //         <p><b>Deadline:</b> {String(p[2])}</p>
    //         <p><b>Yes Votes:</b> {String(p[3])}</p>
    //         <p><b>No Votes:</b> {String(p[4])}</p>
    //         <p><b>Executed:</b> {String(p[5])}</p>
    //         <p><b>Recipient:</b> {p[6]}</p>
    //         <p><b>Amount:</b> {String(p[7])}</p>
    //         <p><b>Creator:</b> {p[8]}</p>
    //       </div>
    //     ))
    //   )}
    // </div>

    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">DAO Proposals</h2>

      {loading && <p>Loading proposals...</p>}

      {!loading && proposals.length === 0 && (
        <p className="text-gray-500">No proposals yet</p>
      )}

      {proposals.map((p, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <h3 className="font-semibold">Proposal #{p[0]}</h3>
          <p>{p[1]}</p>
          <p>
            <span className="font-medium">Yes Votes:</span>{" "}
            {p[3]}
          </p>
          <p>
            <span className="font-medium">No Votes:</span>{" "}
            {p[4]}
          </p>
          <p>
            <span className="font-medium">Creator:</span> {p[8]}
          </p>
          <p>
            <span className="font-medium">Executed:</span>{" "}
            {p[5] ? "✅" : "❌"}
          </p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => vote(p[0], true)}
              className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Vote Yes
            </button>
            <button
              onClick={() => vote(p[0], false)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Vote No
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}





