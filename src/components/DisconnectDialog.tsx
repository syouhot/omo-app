
import React, { useEffect } from 'react'
import { Dialog } from "radix-ui";
import { useRoot } from '@/context/RootProvider';
import { useEnsAvatar, useBalance, useAccount ,useDisconnect} from 'wagmi'
import { normalize } from 'viem/ens'
import { CgCloseO } from "react-icons/cg";
const styles = {
    connectBtn: "cursor-pointer relative w-[190px] h-10 rounded-xl border border-green-500 flex-center gap-2 text-white text-[15px] font-bold font-['Onest'] hover:text-green-500 hover:bg-green-500/10",
    disconnectBtn: "bg-[#052511] border-[#00c950] border-1 p-3 text-white rounded-xl w-[160px] hover:bg-[#00c950] hover:border-[#052511] hover:text-[#052511] cursor-pointer"
}
export default function DisconnectDialog() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const result = useEnsAvatar({
        name: normalize('wevm.eth'),
    })
    const res = useBalance({ address: address });
    const { disconnectDialog, setDisconnectDialog } = useRoot();
    const handlerDisconnect = async () => {
        await disconnect()
        setDisconnectDialog(false)
    }
    const showDisconnectDialog = () => {
        setDisconnectDialog(!disconnectDialog)
    }
    useEffect(() => {
        console.log(address);
        
    }, [address])
    return (
        <div className='flex items-center justify-center'>
            <Dialog.Root open={disconnectDialog} onOpenChange={showDisconnectDialog}>
                <Dialog.Trigger asChild>
                    <span>
                        <span>
                            <button className={styles.connectBtn}>
                                <span>{res.data?.value}</span>
                                <span className='mx-2'>{res.data?.symbol}</span>
                                <span>{address?.slice(0, 10)}</span>
                            </button>
                            <span className='w-[1px] h-3 mx-6 bg-white/20'></span>
                        </span>

                    </span>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content className="DialogContent DialogContentDisconnect fixed w-full h-full backdrop-blur">
                        <div className='mt-[100px] h-[300px] flex items-center justify-center flex-col'>
                            <div className='bg-[#052511] w-[380px] h-full flex items-center justify-center flex-col relative'>
                                <div className='absolute right-5 top-5 w-3 text-white'>
                                    <Dialog.Close >
                                        <span className="IconButton cursor-pointer hover:text-[#00c950]" aria-label="Close" >
                                            <CgCloseO />
                                        </span>
                                    </Dialog.Close>
                                </div>
                                {result.data && <img src={result.data} alt="" className='w-15 h-15 rounded-full' />}
                                <div className='text-white text-[20px] mt-1 font-bold'>{address?.slice(0, 10)}</div>
                                <div className='text-gray-400'>{res.data?.value}{res.data?.symbol}</div>
                            </div>
                            <div className='flex items-center w-[380px] h-[100px] justify-around gap-2 bg-[#052511] pb-5'>
                                <button className={styles.disconnectBtn}>copy address</button>
                                <button className={styles.disconnectBtn} onClick={handlerDisconnect}>disconnect</button>
                            </div>
                            <Dialog.Title />
                            <Dialog.Description />
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
