"use client"
import React, { useEffect, useState } from 'react'
import { CgDanger } from "react-icons/cg";
import { BsCaretRightFill } from "react-icons/bs";
export default function AutoSlippage({ handlerChangeSelectSlippages }: { handlerChangeSelectSlippages: (selectSlippages: number, maxSlippage: string) => void }) {
    const [selectSlippages, setSelectSlippages] = useState(0)
    const [selectDeadline, setSelectDeadline] = useState(0)
    const [maxSlippage, setMaxSlippage] = React.useState("2")
    const [deadline, setDeadline] = React.useState("10")
    const [select, setSelect] = React.useState(1)
    useEffect(() => {
        handlerChangeSelectSlippages(selectSlippages, maxSlippage)
    }, [selectSlippages, maxSlippage])
    return (
        <div className='absolute top-[44px] right-0 w-[320px] z-2 flex flex-col gap-1'>
            <div className={`bg-white/4 border-1 border-white/16 p-4 text-white text-sm rounded-t-xl rounded-b-sm backdrop-blur-[35px] ${select === 0 ? 'hover:bg-[#1B541F66]' : ''}`} onClick={() => setSelect(1)}>
                <div className='flex items-center justify-between'>
                    <span className="inline-flex gap-1 items-center font-bold font-['Basically A Sans Serif'] leading-[18px]">
                        Max Slippage
                        <CgDanger className='w-3 h-3 cursor-pointer opacity-70 hover:opacity-100' />
                    </span>
                    <span className="inline-flex gap-1 items-center font-light font-['Norm'] leading-none">
                        {selectSlippages == 1 ? `${maxSlippage}%` : 'Auto'}
                        <span className='transform rotate-45 translate-x-1 translate-y-1'><BsCaretRightFill /></span>
                    </span>
                </div>
                {
                    select === 1 &&
                    <div className='flex items-center justify-between mt-4'>
                        <div className='relative rounded-lg border-1 border-white/12 w-[168px] h-10 p-1'>
                            <div className={`absolute top-1 w-[79px] h-[30px] rounded-lg bg-[#1B541F] -z-1 transition-left ${selectSlippages === 0 ? 'left-1' : 'right-1'}`}></div>
                            <button className={`w-1/2 h-full rounded-lg text-[13px] font-normal font-['Yukita Sans'] leading-[14px]  cursor-pointer ${selectSlippages === 0 ? 'text-[#1fdb2c]' : 'text-white/10'}`} onClick={() => setSelectSlippages(0)}>Auto</button>
                            <button className={`w-1/2 h-full rounded-lg text-[13px] font-normal font-['Yukita Sans'] leading-[14px]  cursor-pointer ${selectSlippages === 1 ? 'text-[#1fdb2c]' : 'text-white/10'}`} onClick={() => setSelectSlippages(1)}>Custom</button>
                        </div>
                        <div className='rounded-lg border-1 border-white/12 w-[104px] h-10 p-1 flex items-center justify-center'>
                            <input type="text" className='max-w-[50px] focus:outline-none' max={100} min={0} defaultValue={maxSlippage} onChange={e => setMaxSlippage(e.target.value)} />
                            %
                        </div>
                    </div>
                }
            </div>
            <div className={`bg-white/4 border-1 border-white/16 p-4 text-white text-sm rounded-b-xl rounded-t-sm backdrop-blur-[35px] ${select === 1 ? 'hover:bg-[#1B541F66]' : ''}`} onClick={() => setSelect(0)}>
                <div className='flex items-center justify-between'>
                    <span className="inline-flex gap-1 items-center font-bold font-['Basically A Sans Serif'] leading-[18px]">
                        Transaction deadline
                        <CgDanger className='w-3 h-3 cursor-pointer opacity-70 hover:opacity-100' />
                    </span>
                    <span className="inline-flex gap-1 items-center font-light font-['Norm'] leading-none">
                        {deadline} m
                        <span className='transform rotate-45 translate-x-1 translate-y-1'><BsCaretRightFill /></span>
                    </span>

                </div>
                {
                    select === 0 &&
                    <div className='flex items-center justify-between mt-4'>
                        <div className='relative rounded-lg border-1 border-white/12 w-[168px] h-10 p-1'>
                                <div className={`absolute top-1 w-[79px] h-[30px] rounded-lg bg-[#1B541F] -z-1 transition-left ${selectDeadline === 0 ? 'left-1' : 'right-1'}`}></div>
                                <button className={`w-1/2 h-full rounded-lg text-[13px] font-normal font-['Yukita Sans'] leading-[14px]  cursor-pointer ${selectDeadline === 0 ? 'text-[#1fdb2c]' : 'text-white/10'}`} onClick={() => setSelectDeadline(0)}>Auto</button>
                                <button className={`w-1/2 h-full rounded-lg text-[13px] font-normal font-['Yukita Sans'] leading-[14px]  cursor-pointer ${selectDeadline === 1 ? 'text-[#1fdb2c]' : 'text-white/10'}`} onClick={() => setSelectDeadline(1)}>Custom</button>
                        </div>
                        <div className='rounded-lg border-1 border-white/12 w-[104px] h-10 p-1 flex items-center justify-center'>
                                <input type="text" className='max-w-[50px] focus:outline-none' max={100} min={0} defaultValue={deadline} onChange={e => setDeadline(e.target.value ? e.target.value : "10")} />
                            m
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
