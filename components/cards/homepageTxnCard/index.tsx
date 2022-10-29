import React from 'react'
import styles from './homepageTxnCard.module.css'
import { TransactionInterface } from '../../../interfaces/transaction.interface';
import {  HomeOutlined,DirectionsBusFilledOutlined,FoodBankOutlined,HandymanOutlined,CheckroomOutlined,
  MedicalInformationOutlined,SpaOutlined,SchoolOutlined,TheaterComedyOutlined} from '@mui/icons-material/';
import { Tooltip } from '@mui/material';
export interface IHomepageTxnCardProps {
  transaction:TransactionInterface;
}

export default function HomepageTxnCard({transaction}: IHomepageTxnCardProps) {
  const [icon,setIcon]=React.useState(<HomeOutlined/>)

 
  const categories_options = [
    { value: "Housing", icon: <Tooltip title="Housing"><HomeOutlined className='icon--grey'/></Tooltip> },
    { value: "Transportation", icon:<Tooltip title="Transportation"><DirectionsBusFilledOutlined className='icon--orange'/></Tooltip> },
    { value: "Food", icon:<Tooltip title="Food"><FoodBankOutlined className='icon--red'/></Tooltip> },
    { value: "Utilities", icon:<Tooltip title="Utiilities"><HandymanOutlined className='icon--yellow'/></Tooltip>},
    { value: "Clothing", icon:<Tooltip title="Clothing"><CheckroomOutlined className='icon--burgundy'/></Tooltip> },
    { value: "Medical/Healthcare", icon:<Tooltip title="Medical/Healthcare"><MedicalInformationOutlined className='icon--blue'/></Tooltip> },
    { value: "Personal", icon:<Tooltip title="Personal"><SpaOutlined className='icon--green'/></Tooltip> },
    { value: "Education", icon: <Tooltip title="Education"><SchoolOutlined className='icon--pink'/></Tooltip> },
    { value: "Entertainment", icon:<Tooltip title="Entertainment"><TheaterComedyOutlined className='icon--gold'/></Tooltip> },
    { value: "NoData", icon:<Tooltip title="No Data"><TheaterComedyOutlined className='icon--gold'/></Tooltip> },
    { value: "HowItLooks", icon:<Tooltip title="How It Looks?"><TheaterComedyOutlined className='icon--gold'/></Tooltip>},
  ]

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
      <h3>$ {+transaction.value}</h3>
    </div>
  );
}
