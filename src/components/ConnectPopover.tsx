"use client"
import React, { useState } from 'react'
import { Popover } from "radix-ui";
import { PopoverContent } from '@radix-ui/react-popover';
import { CgChevronDoubleRight } from "react-icons/cg"
import { BsCaretRightFill } from "react-icons/bs";
import Link from 'next/link';
const styles = {
    divButton: "relative ml-4 w-10 h-10 rounded-lg cursor-pointer inline-block bg-[url(/assets/images/header/menu.svg)] bg-center hover:bg-[url(/assets/images/header/menu-active.svg)] hover:bg-white/10",
    PopoverContent: "absolute top-5 -right-2 w-[320px] h-auto outline-none p-1 z-50 bg-green-950/20 rounded-lg border border-white/10 backdrop-blur-[20px]",
    contentItem: "group cursor-pointer h-[56px] w-full flex items-center justify-between px-4 rounded-lg text-white text-sm font-normal font-['Onest'] hover:bg-white/10",
    contentLink: "group cursor-pointer h-[56px] w-full flex items-center justify-between px-4 rounded-lg text-white text-sm font-normal font-['Onest'] hover:bg-white/10",
    contentLinkImage: "cursor-pointer h-[56px] w-full flex items-center gap-3 px-4 rounded-lg text-white text-sm font-normal font-['Onest'] hover:bg-white/10",
    button: "w-[calc(100%-32px)] h-[60px] py-[18px] my-3 mx-4 bg-[#1b541f] rounded-lg text-center text-center text-[#1fdb2c] text-base font-bold font-['Onest'] leading-normal hover:bg-[#1fdb2c] hover:text-[#232323]"
}
export default function ConnectPopover() {
    const [showConnect, setShowConnect] = useState(false)
    return (
        <Popover.Root>
            <div className={styles.divButton}>
                <Popover.Trigger >
                    <div className='absolute ml-4 w-10 h-10 rounded-lg cursor-pointer inline-block z-10' onClick={() => setShowConnect(!showConnect)}></div>
                </Popover.Trigger>
                <Popover.Anchor />
                <Popover.Portal>
                    <Popover.Content sideOffset={15} align='end'>
                        <div className={styles.PopoverContent} >
                            <div className={styles.contentItem}>
                                <span className='group-hover:text-green-500 group-hover:font-medium'>Language</span>
                                <span className='inline-flex items-center gap-[6px]'>
                                    EN
                                    <span className='transform rotate-45 translate-x-1 translate-y-1'><BsCaretRightFill /></span> 
                                </span>
                            
                            </div>
                            <div className={styles.contentLink}>
                                <Link href={"https://docs.omoswap.xyz"} className='group-hover:text-green-500 group-hover:font-medium'>Docs</Link>
                                <span className='inline-flex items-center gap-[6px]'>
                                    <CgChevronDoubleRight />
                                </span>
                            </div>
                            <div className={styles.contentLink}>
                                <Link href={"https://docs.omoswap.xyz"} className='group-hover:text-green-500 group-hover:font-medium'>About OMO</Link>
                                <span className='inline-flex items-center gap-[6px]'>
                                </span>
                            </div>
                            <div className='h-[1px] bg-white/10 mx-2 my-1'></div>
                            <Link href={"https://docs.omoswap.xyz"} className={styles.contentLinkImage}>
                                <img src="/assets/images/header/twitter.png" alt="" className='w-6' />
                                Twitter</Link>
                            <Link href={"https://discord.com/invite/bzUR2pXss6"} className={styles.contentLinkImage}>
                                <img src="/assets/images/header/discord.png" alt="" className='w-6' />
                                Discord</Link>
                            <Link href={"https://discord.com/invite/bzUR2pXss6"} target='blank'>
                                <button className={styles.button}>Get Support</button>
                            </Link>

                        </div>
                        <Popover.Close />
                    </Popover.Content>
                </Popover.Portal>

            </div>
        </Popover.Root >
    )
}
