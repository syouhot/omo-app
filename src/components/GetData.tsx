"use client"
import React, { useEffect } from 'react'
import { useRoot } from '@/context/RootProvider';
export default function GetData() {
    const { openWallet, setOpenWallet, ratesData, setRatesData, tokenData, setTokenData } = useRoot();
    useEffect(() => {
        const getRatesData = async () => {
            const response = await fetch("/api/rates")
            const res = await response.json()
            setRatesData(res.data.data)
        }
        const getTokenData = async () => {
            const response = await fetch("/api/tokens_all")
            const res = await response.json();
            setTokenData(res.data.data)
        }
        getRatesData()
        getTokenData()
    }, [])
    return (
        <></>
    )
}
