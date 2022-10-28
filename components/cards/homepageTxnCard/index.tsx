import React from 'react'
import styles from './homepageTxnCard.module.css'

import { TransactionInterface } from '../../../interfaces/transaction.interface';
import {  HomeOutlined , AccountBalanceWalletOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
  FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
  TheaterComedyOutlined,KeyboardArrowUpOutlined,Verified,HistoryToggleOff} from '@mui/icons-material/';

export interface ITransactionProps {
  transaction:TransactionInterface;
}

export default function Transaction({transaction}: ITransactionProps) {

  const categories_options = [
    { value: "Housing", icon: <HomeOutlined className={styles['transactionCard__icon--grey']}/>},
    { value: "Transportation", icon: <DirectionsBusFilledOutlined className={styles['transactionCard__icon--orange']}/> },
    { value: "Food", icon:<FoodBankOutlined className={styles['transactionCard__icon--red']}/> },
    { value: "Utilities", icon:<HandymanOutlined className={styles['transactionCard__icon--yellow']}/>},
    { value: "Clothing", icon:<CheckroomOutlined className={styles['transactionCard__icon--burgundy']}/> },
    { value: "Medical/Healthcare", icon: <MedicalInformationOutlined className={styles['transactionCard__icon--blue']}/>},
    { value: "Personal", icon:<SpaOutlined className={styles['transactionCard__icon--green']}/> },
    { value: "Education", icon: <SchoolOutlined className={styles['transactionCard__icon--pink']}/> },
    { value: "Entertainment", icon:<TheaterComedyOutlined className={styles['transactionCard__icon--gold']}/> },
    { value: "NoData", icon:<TheaterComedyOutlined className={styles['transactionCard__icon--gold']}/> },
    { value: "HowItLooks", icon:<TheaterComedyOutlined className={styles['transactionCard__icon--gold']}/> },
  ]

  const [icon,setIcon]=React.useState(<HomeOutlined/>)

  React.useEffect(()=>{
    categories_options.map((option)=>{
      if(option.value==transaction?.category){
        setIcon(option.icon)
        console.log("asd")
      }
    })
  },[transaction])

  return (
    <div className={styles["rightBar__transaction"]}>
      <div className={styles["transaction__index"]}>
        {icon}
        <div className={styles['homepageTxnCard--right']}>
          <h2>{transaction.headline}</h2>
          <h4>{transaction.date.toLocaleString()}</h4>
        </div>
      </div>
      <h3>$ {transaction.value}</h3>
    </div>
  );
}
