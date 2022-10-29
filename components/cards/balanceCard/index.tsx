import * as React from 'react';
// import { LinearProgress } from '@mui/material';
import LinearProgress from '../../linearProgress'
import styles from './balanceCard.module.css'

export interface IBalanceCard {
    background:string;
    value:number;
}

export default function BalanceCard (props: IBalanceCard) {
  return (
    <div className={styles[`BalanceCard--${props.background}`]}>
      <h2>$ {props.value}</h2>
      <h3>Month Balance</h3>
      <LinearProgress/>
    </div>
  );
}
