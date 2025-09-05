
import { walletDataInterface } from "../walletData";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { handleTransactionError } from '@/utils/Utility';
import { ethers } from 'ethers';
export const ehtersMethod = async () => {
    let provider = null
    // let provider:ethers.BrowserProvider | null = null
    try {
        if (!window.ethereum) {
            alert('Please install the MetaMask wallet extension！');
            return;
        }
        // if (window.ethereum?.removeListener) {
        //     window.ethereum.removeAllListeners();
        //     await window.ethereum.request({
        //         method: 'wallet_revokePermissions',
        //         params: [{ eth_accounts: {} }]
        //     });
        // }
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
            console.log('钱包已连接，无需重复连接');
            return;
        }
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log('已连接钱包地址:', address);
    } catch (error) {
        const { message, code } = handleTransactionError(error, "ConnectWallet error");
        console.log(message, code);
        if (error.code === -32002) {
            alert('MetaMask is already processing a request. Please check your wallet.');
        }
        console.error('连接钱包失败:', error);
    }
}

export const wagmiMethod = async (connect, connectors, injected, reset) => {
    try {
        // const metaMaskConnector = connectors.find((c) => c.id === 'metaMaskSDK');
        // if (!metaMaskConnector) {
        //     alert('请安装 MetaMask 钱包扩展！');
        //     return;
        // }
        // await connect({ connector: metaMaskConnector });
        await connect({ connector: injected() });
    } catch (error) {
        reset()
        const { message, code } = handleTransactionError(error, "ConnectWallet error");
        console.log(message, code);
        if (error.code === -32002) {
            alert('MetaMask 正在处理其他请求，请检查钱包。');
        }
    }
}