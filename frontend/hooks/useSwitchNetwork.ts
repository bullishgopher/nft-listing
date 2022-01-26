import { useEffect } from "react"
import { useEthers, ChainId } from "@usedapp/core"

const ALLOWED_NETWORK = ChainId.Mainnet

const MainnetInfo = {
  blockExplorerUrls: ['https://etherscan.io/'],
  chainName: 'Ethereum Mainnet',
  rpcUrls: [''],
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  }
}

function switchNetwork(chainId: ChainId, info: any) {
  return new Promise(async (resolve) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      resolve(true)
    } catch (error: any) {
      
      if (error.code === 4902) {
        try {
          console.log('error', error);
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...info,
                chainId: `0x${chainId.toString(16)}`,
              },
            ],
          })
          resolve(true)
        } catch (error) {
          resolve(false)
        }
      } else {
        resolve(false)
      }
    }
  })
}

export default function useSwitchWalletNetwork() {
  const { account, active } = useEthers()

  useEffect(() => {
    if (active && !account) {
      console.log('switch network')
      switchNetwork(ALLOWED_NETWORK, MainnetInfo)
    }
  }, [account, active])
}
