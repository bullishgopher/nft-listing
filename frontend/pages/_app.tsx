import '../styles/globals.css'
import { ChainId, DAppProvider, Config } from '@usedapp/core'
import type { AppProps } from 'next/app'
import Layout from '../containers/Layout'

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  supportedChains: [ChainId.Mainnet],
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  )
}

export default MyApp
