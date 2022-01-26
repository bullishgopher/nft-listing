import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Message from '../components/Message/Message'
import NFTBox from '../components/NFTBox/NFTBox'
import useAllAuctions from '../hooks/useAllAuctions'

const Home: NextPage = () => {
  const { isConnected, auctions } = useAllAuctions()
  console.log('aaaaaaaaaa', auctions)

  return (
    <div className="block">
      <Head>
        <title>Home - BrandCentralAuction</title>
        <meta
          name="description"
          content="Home page for Brand Central Auction"
        />
      </Head>

      {isConnected && auctions.length === 0 ? (
        <div className="flex items-center justify-center space-x-8">
          <Message text="There are no auctions yet." />
          <Link href="/mint">
            <a className="text-gray-600 hover:underline">Claim here</a>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col space-y-12">
          {auctions
            .filter((d) => !!d)
            .map(({ bidder }: any, index) => (
              <NFTBox
                key={index}
                description={bidder}
                name={bidder}
                width={250}
                height={250}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default Home
