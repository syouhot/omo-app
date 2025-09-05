export const getChainList = () => {
    return [
        {
            chainId: 1,
            chainName: 'Ethereum',
            defaultIcon: "/assets/images/chain/ethereum-d.png",
            icon: "/assets/images/chain/ethereum.png",
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            address: "0x0000000000000000000000000000000000000000",
            rpcUrls: ['https://mainnet.infura.io/v3/'],
        },
        {
            chainId: 11155111,
            chainName: 'Sepolia',
            defaultIcon: "/assets/images/chain/ethereum-d.png",
            icon: "/assets/images/omo/ethereum.png",
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            address: "0x0000000000000000000000000000000000000000",
            rpcUrls: ['https://mainnet.infura.io/v3/'],
        },
        {
            chainId: 56,
            chainName: 'BSC',
            defaultIcon: "/assets/images/chain/bsc-d.png",
            icon: "/assets/images/chain/bsc.png",
            address: "0x0000000000000000000000000000000000000000",
            nativeCurrency: {
                name: 'BSC',
                symbol: 'BNB',
                decimals: 18


            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
        },
        {
            chainId: 137,
            chainName: 'Polygon',
            defaultIcon: "/assets/images/chain/polygon-d.png",
            icon: "/assets/images/chain/polygon.png",
            nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18

            },
            address: "0x0000000000000000000000000000000000000000",
            rpcUrls: ['https://polygon-rpc.com/'],
        },
        {
            chainId: 42161,
            chainName: 'Base',
            defaultIcon: "/assets/images/chain/base-d.png",
            icon: "/assets/images/chain/base.png",
            address: "0x0000000000000000000000000000000000000000",
            nativeCurrency: {
                name: 'Base',
                symbol: 'BASE',
                decimals: 18
            },
            rpcUrls: ['https://base-rpc.basescan.com/'],
        },
        {
            chainId: 43114,
            chainName: 'Optimism',
            defaultIcon: "/assets/images/chain/optimism-d.png",
            icon: "/assets/images/chain/optimism.png",
            nativeCurrency: {
                name: 'Optimism',
                symbol: 'Optimism',
                decimals: 18
            },
            address: "0x0000000000000000000000000000000000000000",
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        }
    ]
}