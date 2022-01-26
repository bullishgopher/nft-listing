import { useContractCalls, useEthers, useTokenBalance } from '@usedapp/core'
import { useSubgraphData } from '../hooks'
import { BrandCentralAuctionInterface } from '../contracts/interfaces'
import { BrandCentralAuction as CA } from '../contracts/address.json'

export default function useAllAuctions() {
  const { account } = useEthers()
  const { data } = useSubgraphData()

  const numberOfTickersBeingAuctioned = useContractCalls(
    [{
      abi: BrandCentralAuctionInterface,
      address: CA,
      method: 'numberOfTickersBeingAuctioned',
      args: [],
    }]
  )

  const auctions = useContractCalls(
    data && (data as any).tickers.length > 0 ? (data as any).tickers.map((d: any) => ({
      abi: BrandCentralAuctionInterface,
      address: CA,
      method: 'auctions',
      args: [d.id],
    })) : [],
  )

  // let tokenIdNumbers: number[] = []

  // try {
  //   tokenIdNumbers = tokenIds
  //     .map((id) => (id ? Number(id.toString()) : -1))
  //     .filter((id) => id > 0)
  // } catch (e) {
  //   console.log(e)
  // }

  // const tokenURIs = useContractCalls(
  //   tokenIdNumbers.map((id) => ({
  //     abi: BrandCentralAuctionInterface,
  //     address: CA,
  //     method: 'tokenURI',
  //     args: [id],
  //   }))
  // )

  return {
    isConnected: !!account,
    numberOfTickersBeingAuctioned,
    auctions,
    tickers: data ? (data as any).tickers : []
  }
}
