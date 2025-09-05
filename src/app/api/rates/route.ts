import { NextResponse } from "next/server";

// const ROOT_DATA = "https://hub.omoswap.xyz/v1"
export async function GET(request: Request) {
    const data = await fetch(`https://hub.omoswap.xyz/v1/rates`)
    const result = await data.json()
    return NextResponse.json({
        data: result
    })
 }
export function Post(request: Request) {
    console.log(444);
    
 }