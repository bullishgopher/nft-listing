import Image from 'next/image'

interface Props {
  /**
   * Name of the NFT
   */
  name?: string
  /**
   * End block of the NFT
   */
  endBlock?: string
  /**
   * Address of the winner
   */
   winner?: string
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

function NFTBox({ className, endBlock, image, name, winner, width, height }: Props) {
  return (
    <div className={`flex items-center ${className || ''}`} style={{background: '#010101', borderRadius: '8px', padding: '8px', margin: '8px', width: '300px', height: '300px'}}>
      <div className="block shadow-md">
        {image && <Image src={image} alt={name} width={width} height={height} />}
      </div>
      <div className={`flex flex-col space-y-6 p-2`} style={{width: '100%', color: 'white'}}>
        <h1 className="text-xl text-indigo-700">{name}</h1>
        <div className="flex items-center" style={{justifyContent: 'space-between'}}>
          <div>End Block</div>
          <div className="text-gray-700">{endBlock}</div>
        </div>
        <div className="flex items-center" style={{justifyContent: 'space-between'}}>
          <div>Winner</div>
          <div className="text-gray-700">{winner?.slice(0, 8)}</div>
        </div>
      </div>
    </div>
  )
}

export default NFTBox
