import * as React from 'react';
// import { LinearProgress } from '@mui/material';
import LinearProgress from '../../ui/linearProgress'
import styles from './balanceCard.module.css'

export interface IAppProps {
    background:string;
}

export default function App (props: IAppProps) {
  return (
    <div className={styles[`BalanceCard--${props.background}`]}>
      <h2>$ 9 843</h2>
      <h3>Month Balance</h3>
      <LinearProgress/>
    </div>
  );
}
