

interface walletDataInterface {
    name: string,
    image: string,
    http?: string,
}
interface tokenEntity { 
    address: string,
    name: string,
    symbol: string,
    decimals: number,
    chain_id: number,
}
interface linkEntity {
    chainId: number,
    chainName: string,
    defaultIcon: string,
    icon: string,
    nativeCurrency: {
        name: string,
        symbol: string,
        decimals: number

    },
    address: string,
    rpcUrls: string[],
}
const walletData: walletDataInterface[]= [
    {
        name: "MetaMask",
        image: "/assets/images/wallets/logo-MetaMask.png",
    },
    {
        name: "OKX Wallet",
        image: "/assets/images/wallets/logo-okx.png",
        http: "https://chromewebstore.google.com/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge"
    },
    {
        name: "Bitget Wallet",
        image: "/assets/images/wallets/logo-Bitget.png",
    },
    {
        name: "Coinbase Wallet",
        image: "/assets/images/wallets/logo-coinbase.png",
    },
    {
        name: "ONTO Wallet",
        image: "/assets/images/wallets/logo-onto.png",
    },
    {
        name: "Clover Wallet",
        image: "/assets/images/wallets/logo-clover.png",
    },
]
export { walletData }
export type { walletDataInterface, tokenEntity, linkEntity }
