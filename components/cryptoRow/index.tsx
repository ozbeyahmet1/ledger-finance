import * as React from "react"
import { CryptoInterface } from "../../interfaces/crypto.interface";
import styles from './cryptoRow.module.css'

export interface IAppProps {
    cryptos:CryptoInterface;
}

export default function App(props: IAppProps) {
  return (
    <div className={styles["row"]}>
      <div className={styles["row__index"]}>
        <img src={props.cryptos.image} alt="" style={{ width: 40, height: 40 }} />
        <h4>{props.cryptos.name}</h4>
        <h5>{props.cryptos.symbol}</h5>
      </div>

      <h4 className={styles["row__price"]}>{props.cryptos.current_price.toFixed(2)}$</h4>
      <h4 className={styles["row__price"]}>{props.cryptos.high_24h.toFixed(2)}$</h4>
      <h4 className={styles["row__price"]}>{props.cryptos.low_24h.toFixed(2)}$</h4>
      {props.cryptos.price_change_percentage_24h > 0 ? (
        <h4 className={styles["row__price--positive"]}>
          +{props.cryptos.price_change_percentage_24h.toFixed(2)}
        </h4>
      ) : (
        <h4 className={styles["row__price--negative"]}>
          {props.cryptos.price_change_percentage_24h.toFixed(2)}
        </h4>
      )}
    
    </div>
  )
}
