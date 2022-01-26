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

  const tokenIds = useContractCalls(
    data && (data as any).tickers.length > 0 ? (data as any).tickers.map((d: any) => ({
      abi: BrandCentralAuctionInterface,
      address: CA,
      method: 'lowerTickerToTokenId',
      args: [d.id],
    })) : [],
  )

  // let tokenIdNumbers: number[] = []

  // if (data) {
  //   tokenIdNumbers = (data as any).tickers
  //     .map(({ticker}:any, id: number) => (Number(id.toString())))
  //     .filter((id: number) => id >= 0)
  // }

  const tokenURIs = useContractCalls(
    tokenIds.map((id) => ({
      abi: BrandCentralAuctionInterface,
      address: CA,
      method: 'tokenURI',
      args: [id?.toString()],
    }))
  )

  return {
    isConnected: !!account,
    numberOfTickersBeingAuctioned,
    auctions,
    tickers: data ? (data as any).tickers : [],
    tokenURIs: tokenURIs || [],
  }
}
