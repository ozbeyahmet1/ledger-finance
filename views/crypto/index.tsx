import * as React from 'react';
import Row from '../../components/cryptoRow'
import { CryptoInterface } from '../../interfaces/crypto.interface';
import styles from './crypto.module.css'

export interface IAppProps {
    cryptos:CryptoInterface[];
}

export default function App (props: IAppProps) {
 const [input, setInput] = React.useState("");
      //Search Feature
  const filteredData = props.cryptos.filter((item) => {
    return Object.values(item.name)
      .join("")
      .toLowerCase()
      .includes(input.toLowerCase());
  });

  return (
    <div className={styles["cryptocurrencies"]}>
    <div className={styles["cryptocurrencies__content"]}>
      <div className={styles["cryptocurrencies__portfolio"]}>
        <h2>PORTFOLIO</h2>
        <div className={styles['cryptocurrencies__inputWrapper']}>
            <input
            type="text"
            placeholder="Search coins..."
            onChange={(e) => setInput(e.target.value)}
            />
        </div>
      </div>
      <div className={styles['cryptocurrencies__row']}>
        <h2 className={styles['cryptocurrencies__coin']}>Coin</h2>
        <h2 className={styles['cryptocurrencies__price']}>Value in USD</h2>
        <h2 className={styles['cryptocurrencies__price']}>High Price (24h)</h2>
        <h2 className={styles['cryptocurrencies__price']}>Low Price (24h)</h2>
        <h2 className={styles['cryptocurrencies__price']}>Change (24h)</h2>
      </div>
      <div>
        {filteredData.map((singleData:CryptoInterface,id:number)=>{
          return <Row 
                cryptos={singleData}
                />
        })}
      </div>
    </div>
  </div>
  );
}
