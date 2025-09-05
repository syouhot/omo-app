"use client"
import React, { useEffect, useState } from 'react'
import { BsExclamationTriangleFill } from "react-icons/bs";
import AutoSlippage from './AutoSlippage';
import { useRoot } from '@/context/RootProvider';
import { useAccount, useDisconnect } from "wagmi"
import { getChainList } from "@/utils/hooks/getData"
import ChooseTokenDialog from './ChooseTokenDialog';
import SelectTokenDialog from './SelectTokenDialog';
const styles = {
    swapBody: "relative w-full max-w-[472px] mx-auto mt-[100px] h-auto px-4 py-6 bg-green-950/60 border border-white/10 rounded-xl",
    swapHeader: "flex justify-between items-center",
    headerLeft: "inline-flex items-center gap-[6px] pl-2 text-white text-[22px] font-bold font-['Onest']",
    headerLeftPoint: "w-2 h-2 rounded-full point",
    headerRight: "h-10 px-4 bg-green-500/10 rounded-xl items-center inline-flex gap-2 text-green-500 text-sm font-medium font-['Norm'] cursor-pointer",
    swapContent: "w-full h-[252px] mt-5 p-1 bg-black/20 rounded-xl border border-white/20",
    contentTop: "relative h-[128px] bg-white/7 rounded-xl px-3 py-5",
    content1: "absolute left-0 bottom-[-42px] w-full h-[42px] pointer-events-none bg-[url(/assets/images/omo/switch-container.png)] bg-[position:center_bottom_18] bg-no-repeat bg-contain",
    content2: "w-9 h-9 absolute left-[50%] ml-[-18px] bottom-[-20px] flex items-center justify-center border border-white/16 rounded-xl bg-[#031003] cursor-pointer",
    content3: "text-neutral-400 text-[13px] font-normal font-['Onest'] flex gap-2",
    content4: "mt-[10px] text-right text-white/30 text-sm font-normal font-['Norm'] leading-[14px]",
    contentMiddle: "flex items-end justify-between gap-2",
    contentButton: "flex items-center gap-2 h-10 text-[24px] font-normal font-['Onest'] px-2 rounded-lg border border-transparent hover:border-white/12 text-white",
    contentInput: "w-full flex-1 mt-2 h-[32px] text-right text-white text-[32px] font-light font-['Norm'] leading-7 focus:outline-none",
    contentMiddle1: "text-neutral-400 text-[13px] font-normal font-['Onest']",
    contentMiddle2: "mt-[10px] text-right text-white/30 text-sm font-normal font-['Norm'] leading-[14px]",
    contentButton2: "flex items-center gap-2 h-10 text-white/20 text-[24px] font-normal font-['Onest'] px-2 rounded-lg border border-transparent hover:border-white/12",
    contentMiddle3: "flex-1 mt-2 h-[32px] text-right text-[32px] font-light font-['Norm'] leading-7 overflow-hidden text-white/12",
    floor: "flex items-center gap-2 mt-5 pl-2 text-white text-sm font-normal font-['Onest'] leading-[14px]",
    contentFloor: "w-10 h-5 flex items-center rounded-[15px] border border-white/40 cursor-pointer",
    contentFloorSwitch: "w-4 h-4 ml-[1px] rounded-[14px] bg-[#9aaca4] transition-transform",
    contentButton3: "w-full h-[52px] mt-10 rounded-lg border border-green-500 text-white text-[17px] font-medium font-['Onest'] cursor-pointer",
    contentAdd: "fixed right-[25px] bottom-[25px] sm:hidden",
    address: "absolute inset-0 bottom-0 z-1 rounded-5 backdrop-blur-[12px]",
    close: "absolute right-[18px] top-[18px] cursor-pointer hover:content-[url(/assets/images/activity/close-active.svg)]",
    addressTitle: "px-5 py-[18px] border-b border-white/10 text-white text-lg font-semibold font-['Onest'] leading-snug",
    addressContent: "relative mt-2 text-white/70 text-sm font-normal font-['Norm'] border border-white/12 rounded-lg",
    addressInput: "w-full h-8 pl-4 pr-[65px] text-white/70 text-sm font-normal font-['Norm'] focus:outline-none",
    addressButton: "w-full h-[52px] bg-white/10 rounded-lg text-center text-white text-[17px] font-medium font-['Onest'] hover:text-#1fdb2c"
}
export default function Swap() {
    const { chainId, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [showAddress, setShowAddress] = useState(false)
    const [showSlippage, setShowSlippage] = useState(false)
    const [slippage, setSlippage] = useState("Auto")
    const [linkPrice, setLinkPrice] = useState({
        price: "",
        symbol: ""
    })
    const [price, setPrice] = useState("")
    const { openWallet, setOpenWallet, ratesData, setRatesData, tokenInPrice, tokenInEntity, tokenOutEntity } = useRoot();
    const handlerChangeSelectSlippages = (selectSlippages: number, maxSlippage: string) => {
        if (selectSlippages === 0) {
            {
                setSlippage("Auto")
            }
        } else {
            {
                setSlippage(maxSlippage.toString() + "%")
            }
        }
    }
    const handlerOpenWallet = () => {
        setOpenWallet(!openWallet)
    }
    const handlerDisconnect = async () => {
        await disconnect()
    }
    const calculatePrice = (data: string) => {
        let result = "0"
        if (data && linkPrice.price) {
            result = (Number(data) * Number(linkPrice.price)).toFixed(2)
        }
        return result ? result : "--"
    }
    const inputPriceChange = (value: string) => {
        const filtered = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPrice(filtered)
    }
    useEffect(() => {
        const linkList = getChainList()
        let link = null
        const symbol = tokenInPrice?.symbol?? "eth"
        if (chainId) {
            link = linkList.find(item => item.chainId === chainId)
        } else {
            link = linkList.find(item => item.chainId === 1)
        }
        for (const key in ratesData) {
            if (key.toString() == link?.chainId.toString()) {
                for (const k in ratesData[key]) {
                    if (k.toString() == tokenInEntity?.address.toString()) { 
                        setLinkPrice(ratesData[key][k])
                        break
                    }

                }
            }
        }
    }, [chainId, ratesData, tokenInPrice,tokenInEntity])
    return (
        <div className='absolute w-full h-full'>
            <div className={styles.swapBody}>
                <div className={styles.swapHeader}>
                    <div className={styles.headerLeft}>
                        Swap
                        <div className={styles.headerLeftPoint}></div>
                    </div>
                    <div className='relative'>
                        <div className={styles.headerRight} onClick={() => setShowSlippage(!showSlippage)}>
                            {slippage} &nbsp;
                            Slippage
                            <img src="assets/images/header/header-right.png" alt="" className='w-[18px]' />
                        </div>
                        {showSlippage && <AutoSlippage handlerChangeSelectSlippages={handlerChangeSelectSlippages} />}
                    </div>
                </div>
                <div className={styles.swapContent}>
                    {/* content top */}
                    <div className={styles.contentTop}>
                        <div className={styles.content1}>
                        </div>
                        <div className={styles.content2}>
                            <img src="/assets/images/omo/swap.png" alt="" className='w-4' />
                        </div>
                        <div className={styles.content3}>
                            <p>
                                Balance：
                                <span>--</span>
                                {tokenInEntity?.symbol}
                            </p>
                            <span className='text-white/80 font-medium cursor-pointer'>MAX</span>
                        </div>
                        <p className={styles.content4}>
                            ＄
                            {calculatePrice(price)}
                        </p>
                        <div className={styles.contentMiddle}>
                            <div className='flex items-center gap-2'>
                                <div className='w-10 h-10 relative'>
                                    <img src="/assets/images/omo/ethereum.png" alt="" className='w-full h-full rounded-full' />
                                    <img src="/assets/images/omo/ethereum-s.svg" alt="" className='w-5 h-5 border-2 rounded-full border-[#031404eb] absolute left-[22px] top-[22px] bg-white' />
                                </div>
                                <ChooseTokenDialog />
                            </div>
                            <input type="text" maxLength={18} className={styles.contentInput} placeholder='0' value={price} onChange={e => inputPriceChange(e.target.value)} />
                        </div>
                    </div>
                    {/* content middle */}
                    <div className="px-3 py-5">
                        <div className={styles.contentMiddle1}>
                            Balance：
                            --
                            {tokenOutEntity?.symbol}
                        </div>
                        <p className={styles.contentMiddle2}>＄--</p>
                        <div className='flex items-end justify-between gap-2'>
                            <div className='flex items-center gap-2'>
                                <SelectTokenDialog />
                            </div>
                            <div className={styles.contentMiddle3}>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.floor}>
                    Recipient Address
                    <div className={styles.contentFloor} onClick={() => setShowAddress(true)}>
                        <div className={styles.contentFloorSwitch} ></div>
                    </div>
                </div>
                {
                    showAddress &&
                    <>
                        <div className={styles.address}>
                            <div className='absolute inset-x-0 bottom-0 rounded-t-4 rounded-b-5 bg-#0E2615'>
                                <img src="/assets/images/activity/close-active.svg" alt="" className={styles.close} onClick={() => setShowAddress(false)} />
                                <p className={styles.addressTitle}>Edit Recipient Address</p>
                                <div className='px-4 pt-[18px] pb-6'>
                                    <div className={styles.addressContent}>
                                        <input type="text" className={styles.addressInput} placeholder='Recipient Address' />
                                    </div>
                                    <p className='h-[76px] mt-3 text-[12px] text-warning'>
                                        <span className='flex items-center gap-[5px]'>
                                            <BsExclamationTriangleFill className='w-[18px]' />
                                            This address is correct and not an exchange wallet. Any tokens sent to the wrong address will be impossible to retrieve.
                                        </span>
                                    </p>
                                    <button className={styles.addressButton}>Confirm Recipient Address</button>
                                </div>
                            </div>
                        </div>
                        <div className='fixed inset-0'></div>
                    </>
                }
                {
                    showSlippage &&
                    <div className='absolute inset-x-0 bottom-0 z-1 top-[64px] rounded-5 backdrop-blur-[12px]'></div>
                }
                {!isConnected ? (
                    <button className={styles.contentButton3} onClick={handlerOpenWallet}>Connect Wallet</button>
                ) : (
                    <button className={styles.contentButton3} onClick={handlerDisconnect}>Disconnect</button>
                )}
            </div>
            <div className='fixed right-[25px] bottom-[25px] sm:hidden'>
                <img src="/assets/images/omo/content-add.webp" alt="" className='w-[50px] h-[50px]' />
            </div>
        </div>
    )
}
