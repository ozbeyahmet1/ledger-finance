import React from 'react'
import styles from './homepageTxnCard.module.css'
import { TransactionInterface } from '../../../interfaces/transaction.interface';
import {  HomeOutlined,DirectionsBusFilledOutlined,FoodBankOutlined,HandymanOutlined,CheckroomOutlined,
  MedicalInformationOutlined,SpaOutlined,SchoolOutlined,TheaterComedyOutlined} from '@mui/icons-material/';

export interface IHomepageTxnCardProps {
  transaction:TransactionInterface;
}

export default function HomepageTxnCard({transaction}: IHomepageTxnCardProps) {

  const categories_options = [
    { value: "Housing", icon: <HomeOutlined className={styles['icon--grey']}/>},
    { value: "Transportation", icon: <DirectionsBusFilledOutlined className={styles['icon--orange']}/> },
    { value: "Food", icon:<FoodBankOutlined className={styles['icon--red']}/> },
    { value: "Utilities", icon:<HandymanOutlined className={styles['icon--yellow']}/>},
    { value: "Clothing", icon:<CheckroomOutlined className={styles['icon--burgundy']}/> },
    { value: "Medical/Healthcare", icon: <MedicalInformationOutlined className={styles['icon--blue']}/>},
    { value: "Personal", icon:<SpaOutlined className={styles['icon--green']}/> },
    { value: "Education", icon: <SchoolOutlined className={styles['icon--pink']}/> },
    { value: "Entertainment", icon:<TheaterComedyOutlined className={styles['icon--gold']}/> },
    { value: "NoData", icon:<TheaterComedyOutlined className={styles['icon--gold']}/> },
    { value: "HowItLooks", icon:<TheaterComedyOutlined className={styles['icon--gold']}/> },
  ]

  const [icon,setIcon]=React.useState(<HomeOutlined/>)

  React.useEffect(()=>{
    categories_options.map((option)=>{
      if(option.value==transaction?.category){
        setIcon(option.icon)
      }
    })
  },[transaction])

  return (
    <div className={styles["homepageTxnCard"]}>
      <div className={styles["homepageTxncard__index"]}>
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
