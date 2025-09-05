"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import MyConnectButton from '@/components/MyConnectButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ConnectPopover from './ConnectPopover';
import ConnectSearch from './ConnectSearch';
import ConnectWallet from './ConnectWallet';
const styles = {
    header: "w-full h-16 bg-white/5 rounded-xl border border-white/20",
    headerBody: "h-full pl-[120px] pr-[50px] m-x-auto flex items-center justify-between max-xl:px-4",
    headermiddle: "flex flex-1 items-center gap-5 text-center ml-10 max-sm:hidden",
    link: "w-[120px] group relative text-[15px] font-['Onest'] leading-tight hover:text-white max-lg:w-auto text-white ",
    linkBottom: "w-16 h-4 absolute top-[14px] left-[50%] translate-x-[-50%] bg-center bg-no-repeat bg-[url(/assets/images/header/leaf-full.svg)] block ",
    headerRight: "inline-flex items-center",
    connectButton: "absolute left--1 top--1 w-[calc(100%+8px)] h-[calc(100%+8px)] max-w-none max-h-none cursor-default animate-in fade-in",
}

export default function Header() {
    const [active, setActive] = useState(0)
    const headerLink = [
        {
            name: "Swap",
            link: "/"
        },
        {
            name: "Gas Station",
            link: "/gas-station"
        },
        {
            name: "Governance",
            link: "https://snapshot.org/#/o3dao.eth"
        }
    ]

    return (
        <header className={styles.header}>
            <div className={styles.headerBody}>
                <div className='flex items-center'>
                    <Link href={"/"}>
                        <img src={"/logo.png"} alt="logo" className='h-[30px]' />
                    </Link>
                    <span className='w-[1px] h-3 ml-6 bg-white/20'></span>
                </div>
                <div className={styles.headermiddle}>
                    {
                        headerLink.map((item, index) => (
                            <Link onClick={() => setActive(index)} className={`${styles.link}, ${active === index ? "font-extrabold" : ""}`} href={item.link} key={index}>{item.name}
                                <span className={`${styles.linkBottom}, ${active === index ? "block" : "hidden"}`}></span>
                            </Link>
                        ))
                    }
                </div>
                <div className={styles.headerRight}>
                    <div className='flex items-center max-md:hidden'>
                        <ConnectWallet />
                    </div>
                    <ConnectSearch />
                    <ConnectPopover />
                </div>
            </div>
        </header>
    )
}
