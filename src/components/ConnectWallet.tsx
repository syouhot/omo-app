import React, { useEffect, useState } from 'react'
import { Dialog } from "radix-ui";
import { walletData, walletDataInterface } from "@/utils/walletData"

import { ehtersMethod, wagmiMethod } from '@/utils/hooks/connect';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors'
import { useRoot } from '@/context/RootProvider';
import DisconnectDialog from './DisconnectDialog';
import ChangeLinkDialog from './ChangeLinkDialog';
const styles = {
    walletBody: "fixed top-[10px] right-2 bottom-2 w-[352px] max-sm:w-[calc(80vw-16px)] h-[calc(100vh-88px)] z-50 outline-none bg-[#0f1f1b]/50 rounded-lg border border-white/10 backdrop-blur-[20px] animate-in slide-in-l--200 flex flex-col pt-5",
    title: "py-5 px-6 text-white text-xl font-bold font-['Norm'] leading-tight",
    input: "flex-1 text-white text-sm font-normal font-['Norm'] leading-[14px] focus:outline-none",
    inputCancel: "opacity-40 text-white text-[13px] font-light cursor-pointer leading-[14px]",
    connectBtn: "cursor-pointer relative w-[168px] h-10 rounded-xl border border-green-500 flex-center gap-2 text-white text-[15px] font-bold font-['Onest'] hover:text-green-500 hover:bg-green-500/10",
    chainBtn: "cursor-pointer relative w-[128px] mr-2 h-10 rounded-xl border border-green-500 gap-2 text-white text-[15px] font-bold font-['Onest'] hover:text-green-500 hover:bg-green-500/10 flex items-center justify-center",
    walletButton: "group w-full h-[60px] flex-shrink-0 p-1 border border-white/20 rounded-lg justify-start items-center gap-[14px] flex cursor-pointer hover:border-[#1fdb2c] ",
    img: "w-[30px] h-[30px] ml-4 rounded-full",
    connect: "flex-1 h-full px-5 rounded-lg text-white text-base font-normal inline-flex items-center bg-[#1f2d27] group-hover:bg-[#1fdb2c]/10"

}
export default function ConnectSearch() {
    const [showConnect, setShowConnect] = useState(false)
    const controller = new AbortController();
    const { isConnected, chainId } = useAccount();
    const { connect, connectors, reset, status } = useConnect();
    const { openWallet, setOpenWallet, disconnect, setDisconnect ,setChainId} = useRoot();

    const handleButtonClick = async (data: walletDataInterface) => {
        if (data.http) {
            window.open(data.http, '_blank')
        } else {
            switch (data.name) {
                case "MetaMask":
                    // ehtersMethod()
                    wagmiMethod(connect, connectors, injected, reset)
                    break;
            }
        }
    }
    useEffect(() => {
        setOpenWallet(false)
    }, [isConnected])
    return (
        <div>
            <Dialog.Root onOpenChange={() => { !isConnected ? setOpenWallet(!openWallet) : setOpenWallet(false) }} open={openWallet}>
                <Dialog.Trigger asChild>
                    <span>
                        {!isConnected ? (
                            <span>
                                <button className={styles.connectBtn} >
                                    <span>Connect Wallet</span>
                                </button>
                                <span className='w-[1px] h-3 mx-6 bg-white/20'></span>
                            </span>
                        ) : (
                            <span>
                                <span className='flex items-center h-10 mt-5'>
                                    <ChangeLinkDialog />
                                    <DisconnectDialog />
                                </span>
                                <span className='w-[1px] h-3 mx-6 bg-white/20'></span>
                            </span>
                        )}

                    </span>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content className="DialogContent">
                        <div className={styles.walletBody}>
                            <div className={styles.title}>
                                Connect Wallet
                            </div>
                            <hr className='bg-white opacity-10 my-1 mx-6' />
                            <ul className='flex-1 flex flex-col gap-3 my-2 px-6 overflow-auto'>
                                {
                                    walletData.map((item, index) => (
                                        <button className={styles.walletButton} key={index} onClick={() => handleButtonClick(item)}>
                                            <img src={item.image} alt="" className={styles.img} />
                                            <div className={styles.connect}>{item.name}</div>
                                        </button>
                                    ))
                                }
                            </ul>
                            <Dialog.Title />
                            <Dialog.Description />
                            <Dialog.Close />
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>

    )
}
