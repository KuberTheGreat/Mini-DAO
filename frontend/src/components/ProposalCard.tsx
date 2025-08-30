"use client";

type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
};

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <h3 className="font-semibold">{proposal.title}</h3>
      <p className="text-gray-800">{proposal.description}</p>
      <div className="flex justify-between mt-3">
        <button className="px-3 py-1 bg-green-500 text-black rounded-xl hover:bg-green-600">
          Vote For ({proposal.votesFor})
        </button>
        <button className="px-3 py-1 bg-red-500 text-black rounded-xl hover:bg-red-600">
          Vote Against ({proposal.votesAgainst})
        </button>
      </div>
    </div>
  );
}
