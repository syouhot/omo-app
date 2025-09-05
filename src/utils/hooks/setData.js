import { getChainList } from "./getData";

export const setChainNameMethod = (chainId) => {
    return getChainList().find(item => chainId == item.chainId).chainName
}
export const setChainIconMethod = (chainId) => {
    return getChainList().find(item => chainId == item.chainId).icon

}
