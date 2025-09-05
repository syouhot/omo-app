"use client"
import React, { createContext, useContext, useState } from "react";

const RootContext = createContext();

export const RootProvider = ({ children }) => {
    const [openWallet, setOpenWallet] = useState(false)
    const [disconnectDialog, setDisconnectDialog] = useState(false)
    const [ratesData, setRatesData] = useState({})
    const [tokenData, setTokenData] = useState([])
    const [tokenInPrice, setTokenInPrice] = useState({})
    const [tokenInEntity, setTokenInEntity] = useState({})
    const [tokenOutPrice, setTokenOutPrice] = useState({})
    const [tokenOutEntity, setTokenOutEntity] = useState({})
    return <RootContext.Provider value={{
        openWallet, setOpenWallet,
        disconnectDialog, setDisconnectDialog,
        ratesData, setRatesData,
        tokenData, setTokenData,
        tokenInPrice, setTokenInPrice,
        tokenInEntity, setTokenInEntity,
        tokenOutPrice, setTokenOutPrice,
        tokenOutEntity, setTokenOutEntity
    }}>{children}</RootContext.Provider>
}

export const useRoot = () => {
    const context = useContext(RootContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context;
}