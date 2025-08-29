import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {PrivyProvider} from '@privy-io/react-auth';
// Make sure to import these from `@privy-io/wagmi`, not `wagmi`
import {WagmiProvider, createConfig} from '@privy-io/wagmi';

import {privyConfig} from '../utils/privyConfig';
import {wagmiConfig} from '../utils/wagmiConfig';

const queryClient = new QueryClient();

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider appId="cmetj7zgp012rky0cw478pwiq" config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}