import Link from 'next/link'
import React from 'react'
import { BsDiscord } from "react-icons/bs";

export default function OutLink() {
  return (
      <div className='fixed left-0 bottom-[90px] flex flex-col items-center justify-center gap-5 w-[76px] h-[188px] bg-[url(/assets/images/contacts/bg.svg)] max-sm:hidden'>
          <Link href="https://discord.gg/bzUR2pXss6" target='_blank' className="w-9 h-9" >
              <img src="assets/images/contacts/discord.svg" className='w-9 cursor-pointer hover:content-[url(/assets/images/contacts/discord-active.svg)]'/>
          </Link>
          <Link href="https://x.com/OMOSwapX" target='_blank' className="w-9 h-9" >
              <img src="assets/images/contacts/twitter.svg" className='w-9 cursor-pointer hover:content-[url(/assets/images/contacts/twitter-active.svg)]'/>
          </Link>
      </div>
  )
}
