import useIpfs from 'hooks/useIpfs';
import Image from 'next/image'

interface Props {
  /**
   * Name of the NFT
   */
  name?: string
  /**
   * End block of the NFT
   */
  endBlock: string
  /**
   * Address of the winner
   */
   winner: string
   shbClaimed: boolean
  /**
   * Image of the NFT
   */
  image?: string
  /**
   * Class names to be added to the root element.
   */
  className?: string
  /**
   * Width of the image
   */
  width: number
  /**
   * Height of the image
   */
  height: number
}

const ETHERSCAN_URL = 'https://etherscan.io/'

function NFTBox({ className, endBlock, image, name, winner, shbClaimed, width, height }: Props) {
  const { ipfsData } = useIpfs(image);
  const textCenterEllipsis = (str: string, from: number, to: number) => {
    return `${str.substr(0, from)}...${str.substr(str.length - to, str.length)}`;
  };

  return (
    <div className={`flex items-center flex-col p-2 nft-box ${className || ''}`}>
      <div className="block shadow-md mt-5">
        {image && ipfsData && <Image src={ipfsData} alt={name} width={width} height={height} />}
      </div>
      <div className={`flex flex-col space-y-6 p-2`} style={{width: '100%'}}>
        {image && <h1 className="text-xl text-indigo-700">{name}</h1>}
        {!image && <h1 className="text-center text-indigo-700 mb-10" style={{fontSize: '60px'}}>{name}</h1>}
        <div className="flex items-center justify-between">
          <div>End Block</div>
          <div className="text-gray-700"><a href={`${ETHERSCAN_URL}block/${endBlock}`}>{endBlock}</a></div>
        </div>
        <div className="flex items-center justify-between">
          <div>Winner</div>
          <div className="text-gray-700"><a href={`${ETHERSCAN_URL}address/${winner}`}>{textCenterEllipsis(winner, 4, 4)}</a></div>
        </div>
        {!shbClaimed && <button disabled>Bidding Closed</button>}
      </div>
    </div>
  )
}

export default NFTBox
