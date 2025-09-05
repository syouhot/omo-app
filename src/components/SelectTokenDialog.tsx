import React, { useEffect, useState } from 'react'
import { Dialog } from "radix-ui";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { getChainList } from "@/utils/hooks/getData"
import { useRoot } from "@/context/RootProvider"
import { linkEntity, tokenEntity } from "@/utils/walletData"
const imageIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAAAXNSR0IArs4c6QAAAvdJREFUWEftl09IFGEUwN+bnW/bRZNAEewgBJ26FEIEdQmiUxCymxuS2oyEQhCJIHUpvAR5kYIoLHHWPxCRu4UQdQm6FIQgdQmCLoEhFXVyU+eb+V58YyPjMuPM2ra7hHuane/9+c1733vf+xBq/Ic1zgcVAcwVulpEnO37qbL5frzPSwlKJEDpAONqDxC2EULSzwESrADSApnWVLpuZsmVmaLuunpbfUAE9Qrgu3a1dRhxWESFDAV04Bi7FQRW7EiCEucDLuTMj3MNyYZdkwAUk7JE8PxM3LhXNsA8164Q4LGoBqUcAr1OseyIqzO71ptBhbrc/wh0N8WyL6LYDI1g3tQfRY3eBgDBSipunPUC5Lk2SIDH19+hjQTDqfjE+zDIUMAc1+fCjPitp5lx2vt+jPpYI+cjiLDfQURYtmL2UAanvmxlPzJgscMgo+4H+ck/IW0PcRzbyAjBYoFZQz04XQiyVzHAp6Z+xAboB4QmL0xYZVcEMGdqhwHxWlCUBMDNDma88W1fYftrq5T56frJ51a1cYhhMyJ8VQSMSz0boBcQWuSzsMTtjuTky6oA5qmnkayYIZ3HCG60x4238jnPtZMEeGkHsDgtvik2tXHAzSkWCuhEsLfqEZQAoUVSjj0YVkzF68V90IF02gw2u6eJez6XpUhKBSQBD0mBz8sqLeiYXXX1ZbMWv6ykUGIHFFW5XLYUlwroysvWQmv8uncEk2uPV86fqAnAP+n8kGYTV70fWX1Abl5UGOsTgIckWEG1Or1nbtUBZZHMrumdqECnM72o1oUUTn9zo7gDGFY0/1cEgUY7WPbVXw0LYRHza9TegcA7KEhZ7/60bT6YScx8qjjgHHW3cku94zgmWLIFjmYSEx/l8CoABuVkLW+B3xnrCrovRx5YtxPB9XNYl1P0qUB9W4ylE5PPgtb/OaBBWmK3CQOo4NHNEPJmR3OpuOHMitsGLDVyQfJ5s/cgALUJpCYQuCiIzwftO6+N0AiWC3C7dmoe8DdG/ugwpHy8/QAAAABJRU5ErkJggg=="
export default function SelectTokenDialog() {
    const { tokenData, setTokenInPrice, tokenInPrice, tokenOutEntity, setTokenOutEntity, ratesData, setRatesData } = useRoot()
    const [dialog, setDialog] = useState(false);
    const [mouseActive, setMouseActive] = useState(false);
    const [activeChainId, setActiveChainId] = useState(1)
    const [oldActiveChainId, setOldActiveChainId] = useState(1)
    const [oldTokenInEntity, setOldTokenInEntity] = useState<tokenEntity>()
    const [search, setSearch] = useState("")
    const [tokenList, setTokenList] = useState<tokenEntity[]>([])
    const [chainList, setChainList] = useState<linkEntity[]>([])
    const handlerToken = (item: tokenEntity) => {
        setTokenOutEntity(item)
        setDialog(false)
    }
    useEffect(() => {
        const initData = () => {
            setChainList(getChainList())
        }
        initData()
    }, [])
    useEffect(() => {
        if (dialog) {
            setOldTokenInEntity(tokenOutEntity)
            setOldActiveChainId(activeChainId)
        } else {
            if (tokenOutEntity.address == oldTokenInEntity?.address) {
                setActiveChainId(oldActiveChainId)
            } else {
                setActiveChainId(activeChainId)
            }
        }
    }, [dialog])
    useEffect(() => {
        const id = activeChainId ? activeChainId : 1
        if (tokenData) {
            setTokenList(tokenData.filter((item: tokenEntity) =>
                item.chain_id === id && item.symbol.includes(search)
            ))
            if (!tokenOutEntity?.name) setTokenOutEntity(tokenData[0])
        }
    }, [tokenOutEntity, tokenData, search, activeChainId])
    return (
        <Dialog.Root open={dialog} onOpenChange={() => { setDialog(!dialog) }}>
            <Dialog.Trigger asChild>

                <button className="flex items-center gap-2 h-10 text-white/20 text-[24px] font-normal font-['Onest'] px-2 rounded-lg border border-transparent hover:border-white/12" >
                    {
                        tokenOutEntity ? (
                            <span className='text-white'>{tokenOutEntity.symbol}</span>
                        ) : (
                            <span>Select Token</span>
                        )
                    }
                    <img src="/assets/images/omo/subscript.png" alt="" className='w-2' />
                </button>

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content className='DialogContentOpen2 fixed w-full h-full backdrop-blur top-[1px]'>
                    <div className='mt-[100px] flex items-center justify-center flex-col'>
                        <div className='bg-[#0b1a13] opacity-98 m-w-[90%] w-[408px] min-h-[500px] flex items-center flex-col relative rounded-xl border-[#2b3632] border-1 text-white'>
                            <div className="relative py-5 text-center text-white text-xl font-bold font-['Norm'] leading-tight w-full ">
                                <Dialog.Title asChild>
                                    <div className='text-white font'>Choose Token</div>
                                </Dialog.Title>
                                <Dialog.Close asChild>
                                    <span className="IconButton cursor-pointer absolute top-5 right-[18px]" aria-label="Close" >
                                        <HiMiniArrowUturnLeft />
                                    </span>
                                </Dialog.Close>
                            </div>
                            <ul className='px-5 flex flex-wrap gap-2 items-start justify-start' onMouseEnter={() => setMouseActive(true)} onMouseLeave={() => setMouseActive(false)}>
                                {
                                    chainList.map(item => (
                                        <li className={`w-[52px] h-[52px] p-3 my-1 rounded-[10px] cursor-pointer hover:border-white border 
                                            ${activeChainId === item.chainId ? "border-white" : "border-white/20"}`}
                                            data-tooltip={item.chainName}
                                            key={item.chainId}
                                            onClick={() => setActiveChainId(item.chainId)}
                                        >
                                            <img src={mouseActive || activeChainId === item.chainId ? item.icon : item.defaultIcon} alt="" className='w-full h-full rounded-none border-none' />
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className='px-5 w-full'>
                                <hr className=' bg-white opacity-8 my-2 ' />
                                <div className='mt-4 h-[52px] pl-3 rounded-lg border border-white/20 justify-between items-center gap-2 flex w-full'>
                                    <FaSearch className='text-white' />
                                    <input type="text" className="placeholder:text-white/20 text-sm font-normal font-['Onest'] leading-[14px] flex-1 focus:outline-none" placeholder='Search name or contract address'
                                        value={search}
                                        onChange={e => setSearch(e.target.value)} />
                                    {
                                        search && <span className='group inline-flex items-center justify-center w-8 h-full bg-white/5 rounded-lg cursor-pointer'>
                                            <CgClose className='opacity-60 group-hover:opacity-100' onClick={() => setSearch("")} />
                                        </span>
                                    }
                                </div>
                                <ul className='mt-3 flex flex-wrap gap-2'>
                                    {
                                        tokenList.map((item, index) => (
                                            index < 5 && <li className='h-8 px-2 py-1 border border-white/10 rounded-lg inline-flex gap-2 cursor-pointer text-white text-sm font-medium hover:bg-white/8'
                                                key={index}
                                                onClick={() => handlerToken(item)}>
                                                <img src="https://cdn.omoswap.xyz/token-profile/1/0x0000000000000000000000000000000000000000/logo.png" alt="" className='rounded-full' />
                                                {item.symbol}
                                            </li>
                                        )
                                        )
                                    }
                                </ul>
                            </div>
                            <ul className='mt-4 px-1 h-[360px] overflow-y-auto scrollbar w-full backdrop-blur'>
                                {
                                    tokenList.map((item, index) => (
                                        <li className=' group mb-2 px-6 py-2 rounded-lg justify-between items-center flex gap-3 text-white cursor-pointer border border-transparent hover:border-[#fff3] hover:bg-[#1fdb2c1f]'
                                            key={index}
                                            onClick={() => handlerToken(item)}
                                        >
                                            <img src="https://cdn.omoswap.xyz/token-profile/1/0x0000000000000000000000000000000000000000/logo.png" alt="" className='w-8 h-8 rounded-full' />
                                            <div className='flex-1 font-medium'>
                                                <p className='inline-flex items-center gap-1'>
                                                    {item.symbol}
                                                    {index == 0 && <img src={imageIcon} alt="" className='w-5' />}
                                                </p>
                                                <p className='text-[#8e9c98] text-[13px] block group-hover:hidden'>{item.name}</p>
                                                <p className='text-[#8e9c98] text-[13px] hidden group-hover:block'>{`${item.address.slice(0, 8)}...${item.address.slice(-6)}`}</p>
                                            </div>
                                            <div className='inline-flex items-center gap-1'>
                                                <span>--</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <Dialog.Description />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
