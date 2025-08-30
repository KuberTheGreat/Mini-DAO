import { useEnsName } from 'wagmi';

export function useENS(address?: `0x${string}`) {
  const { data: ensName, isLoading, error } = useEnsName({
    address,
    chainId: 10143, // 1 = Ethereum mainnet, use 11155111 for Sepolia
  });

  return { ensName, isLoading, error };
}
