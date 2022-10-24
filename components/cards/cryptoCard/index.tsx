import Image from 'next/image';
import * as React from 'react';
import styles from './cryptoCard.module.css'
import { Icon } from '@iconify/react'
import { CryptoInterface } from '../../../interfaces/crypto.interface';
export interface IAppProps {
    crypto:CryptoInterface;  
}

export default function App (props: IAppProps) {
  return (
    <div className={styles['crypto']}>
    <div className={styles['crypto--left']}>
      <div className={styles['crypto__currency']}>
          <Icon icon={`cryptocurrency:${props.crypto.symbol}`}  width="40" height="50" color="#C5C5C5" className={styles.currencyIcon}/>
        </div>
        <div className={styles['crypto__index']}>
            <div>
              <h2>{props.crypto.name}</h2>
              <h5 className={(props.crypto.price_change_percentage_24h > 0) 
              ? styles['crypto__percantage--positiveResp'] 
              : styles['crypto__percantage--negativeResp'] }>
                {props.crypto.price_change_percentage_24h.toFixed(2)} %</h5>
            </div>
            <div className={styles['crypto__stats']}>
              <Image 
                src="https://res.cloudinary.com/atlasozbey/image/upload/v1661098321/Frame_1341_csz1q5.png"
                width={105}
                height={40}
              />
            </div>
            <h4>{parseFloat(props.crypto.current_price).toFixed(2)} USD</h4>
        </div>
    </div>
    
      <h5 className={(props.crypto.price_change_percentage_24h > 0) 
          ? styles['crypto__percantage--positive'] 
          : styles['crypto__percantage--negative'] }>
            {props.crypto.price_change_percentage_24h.toFixed(2)} %</h5>
  </div>
  );
}
