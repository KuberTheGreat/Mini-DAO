"use client";

import { useProposalCount, useProposal } from "@/contract/functions";

export default function ProposalList() {
  const { data: proposalCount, isLoading: countLoading} = useProposalCount();

  console.log(proposalCount);
  
  if (countLoading) return <p>Loading proposals...</p>;
  if (!proposalCount) return <p>No proposals found.</p>;

  return (
    <div className="space-y-4">
      {Array.from({ length: Number(proposalCount) }).map((_, i) => {
        const { data: proposal, isLoading } = useProposal(BigInt(i));

        if (isLoading) {
          return (
            <p key={i} className="italic">
              Loading proposal {i}...
            </p>
          );
        }

        if (!proposal) return null;

        const { id, description, voteCount, proposer, executed } = proposal;

        return (
          <div
            key={id.toString()}
            className="p-4 border rounded-lg shadow-sm space-y-1"
          >
            <h3 className="font-bold text-lg">Proposal #{id.toString()}</h3>
            <p>{description}</p>
            <p>Votes: {voteCount.toString()}</p>
            <p>Proposer: {proposer}</p>
            <p>Status: {executed ? "Executed ✅" : "Pending ⏳"}</p>
          </div>
        );
      })}
    </div>
  );
}
