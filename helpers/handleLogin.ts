import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { getCsrfToken, signIn } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useNetwork, useSignMessage } from "wagmi"

type Props = {}

const handleLogin = (props: Props) => {
    const { signMessageAsync } = useSignMessage()
    const { chain } = useNetwork()
    const { address } = useAccount()
  
    const handleLogin = async () => {
      try {
        const callbackUrl = "/protected"
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
          nonce: await getCsrfToken(),
        })
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })
        signIn("credentials", {
          message: JSON.stringify(message),
          redirect: false,
          signature,
          callbackUrl,
        })
      } catch (error) {
        window.alert(error)
      }
    }
}