import { utils } from 'ethers'
import BrandCentralAuctionAbi from './abis/BrandCentralAuction.json'

const { Interface } = utils

export const BrandCentralAuctionInterface = new Interface(BrandCentralAuctionAbi.abi)

