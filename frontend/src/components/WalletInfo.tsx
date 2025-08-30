import { useAccount } from 'wagmi';
import { useENS } from '@/utils/useEns';

export default function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { ensName, isLoading } = useENS(address);

  if (!isConnected) return <p>Not connected</p>;

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-900 text-white">
      <p className="text-sm">Wallet:</p>
      <p className="text-lg font-semibold">
        {isLoading ? "Resolving ENS..." : ensName ?? address}
      </p>
    </div>
  );
}
