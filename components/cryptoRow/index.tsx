import * as React from "react"
import { CryptoInterface } from "../../interfaces/crypto.interface";
import styles from './cryptoRow.module.css'

export interface IAppProps {
    cryptos:CryptoInterface;
}

export default function App({cryptos}: IAppProps) {
  return (
    <div className={styles["row"]}>
      <div className={styles["row__index"]}>
        <img src={cryptos.image} alt="" style={{ width: 40, height: 40 }} />
        <h4>{cryptos.name}</h4>
        <h5>{cryptos.symbol}</h5>
      </div>

      <h4 className={styles["row__price"]}>{cryptos.current_price.toFixed(2)}$</h4>
      <h4 className={styles["row__price"]}>{cryptos.high_24h.toFixed(2)}$</h4>
      <h4 className={styles["row__price"]}>{cryptos.low_24h.toFixed(2)}$</h4>
      {cryptos.price_change_percentage_24h > 0 ? (
        <h4 className={styles["row__price--positive"]}>
          +{cryptos.price_change_percentage_24h.toFixed(2)}
        </h4>
      ) : (
        <h4 className={styles["row__price--negative"]}>
          {cryptos.price_change_percentage_24h.toFixed(2)}
        </h4>
      )}
    
    </div>
  )
}
