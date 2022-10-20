import React from 'react'
import styles from './rightBar.module.css'
import Image from 'next/image'
// import DrawerComponent from '../../../UI/Drawer'
import Link from 'next/link'

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';



export interface ITransactionProps {

}

export function Transaction(props: ITransactionProps) {
  return (
    <div className={styles["rightBar__transaction"]}>
      <div className={styles["transaction__index"]}>
        <AccountBalanceWalletOutlined  className={styles["rightBar__icon"]} />
        <div>
          <h2>Apple Device</h2>
          <h4>11 Feb, 4:31 PM</h4>
        </div>
      </div>
      <h3>$ 365.98</h3>
    </div>
  );
}

function Index() {

  return (
    <div className={styles.rightBar}>
      <div className={styles['rightBar__user']}>
        <Link href="/profile">
          <div className={styles['rightBar__userIcon']}> 
            <Person2OutlinedIcon/>
          </div>
        </Link>
        <div className={styles['rightBar__index']}>
          <h2>Ahmet Özbey</h2>
          {/* {auth=="login" ? <h3>Verified Accounts🟢</h3> : <h3>Unverified Accounts🔴</h3>}  */}
        </div>
        {/* <DrawerComponent /> */}
      </div>
      <div>
        <h3 className={styles['rightBar__headline']}>Transactions</h3>
        <Transaction/>
        <Transaction/>
        <Transaction/>
        <Transaction/>
      </div>
      <div  className={styles['rightBar__image']}>
        <Image 
          src="https://res.cloudinary.com/droheqpxn/image/upload/v1642685679/ledger/commerce_o4y7pf.svg"
          width="402"
          height="270"
        />
      </div>
     
    </div>
  )
}

export default Index