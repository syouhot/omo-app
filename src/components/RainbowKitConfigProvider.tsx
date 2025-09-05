"use client"
import { darkTheme, lightTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { mainnet, polygon, sepolia, base, bsc, hardhat } from 'viem/chains';
import { WagmiProvider } from 'wagmi'

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '68e753dff86fd5f078a9f4cba672b339',
    chains: [mainnet, polygon, sepolia, base, bsc, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
export default function RainbowKitConfigProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider >
    )
}

