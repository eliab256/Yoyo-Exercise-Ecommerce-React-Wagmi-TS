import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { anvil, sepolia } from 'wagmi/chains';

const rainbowkitConfig = getDefaultConfig({
    appName: 'Yoyo Exercice Marketplace',
    projectId: import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [anvil, sepolia],
    ssr: false,
});

export default rainbowkitConfig;
