import * as React from "react"
import Image from "next/image"
import styles from "./transferMoneyCard.module.css"

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className={styles["sendMoney"]}>
      <div className={styles["sendMoney__top"]}>
        <h2>Transfer Money</h2>
        <h4>Send and recieve MATIC with Ledger </h4>
      </div>
      <Image
        src="https://res.cloudinary.com/atlasozbey/image/upload/v1661510920/Saly-7_bfam6a.png"
        width={100}
        height={180}
      />
    </div>
  )
}
