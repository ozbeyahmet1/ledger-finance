import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "../styles/styles.css"

import "@rainbow-me/rainbowkit/styles.css";

export const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.metaMask({ chains }),
    ],
  },
])

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
