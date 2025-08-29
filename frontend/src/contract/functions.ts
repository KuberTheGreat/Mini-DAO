import {ADDRESS, ABI} from "../utils/contract_data";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

// --- READ HOOKS ---

export function useProposal(proposalId: bigint) {
  const result =  useReadContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "getProposal",
    args: [proposalId],
  });

  let data = undefined;
  if (result.data) {
    const [id, description, voteCount, proposer, executed] = result.data as [
      bigint,
      string,
      bigint,
      string,
      boolean
    ];

    data = { id, description, voteCount, proposer, executed };
  }

  return { ...result, data };
}


export function useProposalCount() {
  return useReadContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "getProposalCount",
  });
}

export function useDaoBalance() {
  return useReadContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "getBalance",
  });
}

export function useIsMember(address?: `0x${string}`) {
  return useReadContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "members",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}

export function useOwner() {
  return useReadContract({
    abi: ABI,
    address: ADDRESS,
    functionName: "owner",
  });
}

// --- WRITE HOOKS ---

export function useJoinDao() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function join(value: bigint) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "joinDAO",
      value, // e.g. BigInt(1e17) for 0.1 ETH
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { join, hash, error, isPending, receipt };
}

export function useCreateProposal() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function create(description: string, recipient: `0x${string}`, amount: bigint) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "createProposal",
      args: [description, recipient, amount],
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { create, hash, error, isPending, receipt };
}

export function useVote() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function vote(proposalId: bigint, support: boolean) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "vote",
      args: [proposalId, support],
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { vote, hash, error, isPending, receipt };
}

export function useEndVoting() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function end(proposalId: bigint) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "endVoting",
      args: [proposalId],
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { end, hash, error, isPending, receipt };
}

export function useExecuteProposal() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function execute(proposalId: bigint) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "executeProposal",
      args: [proposalId],
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { execute, hash, error, isPending, receipt };
}

export function useWithdraw() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  function withdraw(to: `0x${string}`) {
    return writeContract({
      abi: ABI,
      address: ADDRESS,
      functionName: "withdraw",
      args: [to],
    });
  }

  const receipt = useWaitForTransactionReceipt({ hash });
  return { withdraw, hash, error, isPending, receipt };
}
