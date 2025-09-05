import React, { useState } from 'react'
import { Dialog } from "radix-ui";
const styles = {
    spanButton: "w-10 h-10 rounded-lg  cursor-pointer inline-block bg-[url(/assets/images/header/toolbox.svg)] bg-center hover:bg-[url(/assets/images/header/toolbox-active.svg)] hover:bg-white/10 text-white ",
    searchBody: "fixed top-[10px] right-2 bottom-2 w-[352px] max-sm:w-[calc(80vw-16px)] h-[calc(100vh-88px)] z-50 outline-none bg-[#0f1f1b]/50 rounded-lg border border-white/10 backdrop-blur-[20px] animate-in slide-in-l--200 p-1 pt-5",
    search: "h-[60px] rounded-lg px-5 flex items-center justify-between gap-2 border border-white focus:bg-#192922",
    input: "flex-1 text-white text-sm font-normal font-['Norm'] leading-[14px] focus:outline-none",
    inputCancel: "opacity-40 text-white text-[13px] font-light cursor-pointer leading-[14px]",
}
export default function ConnectSearch() {
    const [showConnect, setShowConnect] = useState(false)
    return (
        <div className={`${styles.spanButton}`}>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <div className={styles.spanButton} onClick={() => setShowConnect(!showConnect)}></div>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content className="DialogContent DialogContentOpen">
                        <div className={styles.searchBody}>
                            <div className={styles.search}>
                                <img src="/assets/images/header/search.png" alt="" className='w-6' />
                                <input type="text" className={styles.input} placeholder='Search by transaction hash' />
                                <span className={styles.inputCancel}>Cancel</span>
                            </div>
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
