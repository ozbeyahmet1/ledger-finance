import React, { useEffect, useState } from 'react'
import styles from './transactionCard.module.css'
import {  HomeOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
          FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
          TheaterComedyOutlined,KeyboardArrowUpOutlined,Verified,HistoryToggleOff} from '@mui/icons-material/';
import { TransactionInterface } from '../../../interfaces/transaction.interface';
import { Tooltip } from '@mui/material';

export interface ITransactionCardProps {
  transaction:TransactionInterface;
  location:string;
}

  export default function TransactionCard({transaction,location}: ITransactionCardProps) {
  const [show,setShow]=useState(false);
  const [icon,setIcon]=useState(<HomeOutlined/>)

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

  useEffect(()=>{
    categories_options.map((option)=>{
      if(option.value==transaction?.category){
        setIcon(option.icon)
      }
    })
  },[transaction])

  return (
    <div className={styles['transactionCard']}>
        <div className={styles['transactionCard--top']}>
          <div className={styles['transactionCard--left']}>
            {icon}
            <div className={styles['transaction__headline']}>
              <h2>{ transaction?.headline}</h2>
              <h5>{ transaction?.date}</h5>
            </div>
          </div>
          <div>
          </div>
            <h3 className={styles['transaction__value']}>${ +transaction?.value}</h3>
            
            <div className={ transaction?.type=="Outcome" ?  styles['transaction__type--outcome'] : styles['transaction__type--income']}>
              <h2 >{ transaction?.type}</h2>
            </div>
            
            <div className={styles['transacion__iconWrapper']}>
              {location=="blockchain" ? <Verified color="success" /> : <HistoryToggleOff/>} 
            </div>
        </div>

        <div className={styles['transaction__description']}>
          {(show &&  transaction.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['transaction__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowUpOutlined />
          </div>
          }
  
          {(!show &&  transaction?.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['transaction__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowDownOutlined/>
          </div>
          }

          {show ? <h3>{ transaction?.description}</h3> :  ""}

        </div>
        
    </div>
  )
}
