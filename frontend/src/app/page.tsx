// "use client";

// import { usePrivy, useWallets, useConnectWallet } from "@privy-io/react-auth";
// import { ethers } from "ethers";

// export default function Home() {
//   const { ready, authenticated, login, logout } = usePrivy();
//   const { wallets } = useWallets();

//   const {connectWallet} = useConnectWallet();

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen gap-4">
//       {!authenticated ? (
//         <button
//           className="px-4 py-2 bg-purple-600 text-white rounded-xl"
//           onClick={login}
//         >
//           Connect Wallet
//         </button>
//       ) : (
//         <>
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-xl"
//             onClick={connectWallet}
//           >
//             Use DAO
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded-xl"
//             onClick={logout}
//           >
//             Logout
//           </button>
//         </>
//       )}
//     </main>
//   );
// }

"use client";

import WalletConnectButton from "@/components/WalletConnect";
import CreateProposalForm from "@/components/CreateProposal";
import ProposalList from "@/components/ProposalList";
import JoinDao from "@/components/Join";

export default function Home() {
  const handleCreateProposal = (title: string, description: string) => {
    console.log("🚀 New Proposal:", { title, description });
    // TODO: Call your smart contract here with ethers.js
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100">
      <WalletConnectButton />
      <JoinDao/>
      <CreateProposalForm />
      <ProposalList/>
    </main>
  );
}
