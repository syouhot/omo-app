
import React, { useEffect, useState } from 'react'
import { Dialog } from "radix-ui";
import { setChainIconMethod, setChainNameMethod } from '@/utils/hooks/setData';
import { getChainList } from '@/utils/hooks/getData';
import { useAccount } from 'wagmi';
import { CgCloseO } from "react-icons/cg";
import { useRoot } from "@/context/RootProvider"
import { useSwitchChain } from "wagmi";
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
export default function ChangeLinkDialog() {
    const { isConnected, chainId } = useAccount();
    const { chains, switchChain } = useSwitchChain();
    const [chainName, setChainName] = useState("");
    const [chainIcon, setChainIcon] = useState("");
    const [ dialogOpen ,setDialogOpen] = useState(false);
    useEffect(() => {
        setChainName(setChainNameMethod(chainId))
        setChainIcon(setChainIconMethod(chainId))
        setDialogOpen(false)
    }, [chainId])
    const handlerChangeLink = (chainId:number) => {
        switchChain({chainId})
    }
    return (
        <div>
            <Dialog.Root open={dialogOpen} onOpenChange={() => { setDialogOpen(!dialogOpen) }}>
                <Dialog.Trigger asChild>
                    <span>
                        {
                            <button className={styles.chainBtn} >
                                {chainIcon &&<img src={chainIcon} alt="" className='w-5' />}
                                <span>{chainName}</span>
                            </button>
                        }
                    </span>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                 
                    <Dialog.Content className="DialogContent DialogContentDisconnect fixed w-full h-full backdrop-blur">
                        <div className='mt-[100px] h-[300px] flex items-center justify-center flex-col'>
                            <div className='bg-[#052511] w-[580px] h-full flex items-center justify-center flex-col relative'>
                            <Dialog.Title >
                                <span className='text-white font'>change network</span>
                            </Dialog.Title>
                                <div className='absolute right-5 top-5 w-3 text-white'>
                                    <Dialog.Close >
                                        <span className="IconButton cursor-pointer hover:text-[#00c950]" aria-label="Close" >
                                            <CgCloseO />
                                        </span>
                                    </Dialog.Close>
                                </div>
                                <div className='grid grid-cols-2 gap-4 p-10 w-full'>
                                    {getChainList().map((item, index) => (
                                        <button className={`text-white border-[#00c950] border-1 p-3 rounded-xl flex items-center justify-around hover:bg-[#00c950]/10 cursor-pointer ${chainId === item.chainId ? 'bg-[#00c950]/50' : ''}`} key={item.chainId}
                                            onClick={() => handlerChangeLink(item.chainId)}>
                                            <img src={item.icon} alt="" className='w-6 h-6' />
                                            <span className='text-xl'>{item.chainName}</span>
                                        </button>
                                    ))}

                                </div>
                            </div>
                        
                            <Dialog.Description />
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>

    )
}
