import React, { ReactNode } from "react"
import styles from "./sidebar.module.css"
import Image from "next/image"
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useNetwork, useSignMessage } from "wagmi"
import Link from "next/link"
import ConnectButton from "../../connectButton"
import {
  HomeOutlined,
  AccountBalanceWalletOutlined,
  AccountBalanceOutlined,
  NewspaperOutlined,
  CurrencyBitcoinOutlined,
  Logout

} from "@mui/icons-material/"


export interface ISidebarElementProps {
  selected: string
  name: string
  icon: ReactNode
  link: string
}

export function SidebarElement(props: ISidebarElementProps) {
  return (
    <Link href={props.link}>
      <div
        className={
          props.selected == props.name.toLowerCase()
            ? styles["sidebar__element--active"]
            : styles["sidebar__element"]
        }
      >
        {props.icon}
        <h2>{props.name}</h2>
      </div>
    </Link>
  )
}

export interface ISidebarComponentProps {
  selected: string
}

export default function SidebarComponent(props: ISidebarComponentProps) {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data: session, status } = useSession()
  const loading = status === "loading"

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
        nonce: await getCsrfToken()
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl
      })
    } catch (error) {
      window.alert(error)
    }
  }

  return (
    <div className={styles.sidebar}>
      <Link href="/">
        <div className={styles["sidebar__logo"]}>
          <Image
            src="https://res.cloudinary.com/droheqpxn/image/upload/v1642427743/ledger/LogoLarge_efgajx.png"
            width={233}
            height={80}
          />
        </div>
      </Link>
      <div className={styles["sidebar__elementWrapper"]}>
        <SidebarElement
          selected={props.selected}
          name="Dashboard"
          icon={<HomeOutlined />}
          link="/"
        />
        <SidebarElement
          selected={props.selected}
          name="Wallet"
          icon={<AccountBalanceWalletOutlined />}
          link="/wallet"
        />
        <SidebarElement
          selected={props.selected}
          name="Assets"
          icon={<AccountBalanceOutlined />}
          link="/assets"
        />
        <SidebarElement
          selected={props.selected}
          name="News"
          icon={<NewspaperOutlined />}
          link="/news"
        />
        <SidebarElement
          selected={props.selected}
          name="Cryptocurrencies"
          icon={<CurrencyBitcoinOutlined />}
          link="/cryptocurrencies"
        />
      </div>
      <div className={styles["sidebar__bottomBar"]}>

        {
          (address && session?.user) && 
          <>  
            <div className={styles['sidebar__logout']}>
              <h2>
                {address.slice(0,23)}...
              </h2>
              <a
              href={`/api/auth/signout`}
              className={styles['sidebar__logoutButton']}
              onClick={e => {
                e.preventDefault()
                signOut()
              }}
            >
                <Logout  />
            </a>
            </div>
          </>
        }

        {
           (address && !session?.user) && 
           <>
            <button
            onClick={e => {
              e.preventDefault()
              handleLogin()
            }}
            className={styles['sidebar__button']}
          >
            Please Sıgn In
          </button>
           </>
        }

        {
          (!address) && 
          <ConnectButton/>
        }

      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
