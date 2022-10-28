import React, { useEffect, useState } from 'react'
import styles from './transactionCard.module.css'
import {  HomeOutlined , AccountBalanceWalletOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
          FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
          TheaterComedyOutlined,KeyboardArrowUpOutlined,Verified,HistoryToggleOff} from '@mui/icons-material/';
import { TransactionInterface } from '../../../interfaces/transaction.interface';



export interface IAppProps {
  transaction:TransactionInterface;
  location:string;
}


  export default function App ({transaction,location}: IAppProps) {
  const [show,setShow]=useState(false);


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
  ]

  const [icon,setIcon]=useState(<HomeOutlined/>)

  useEffect(()=>{
    categories_options.map((option)=>{
      if(option.value==transaction?.category){
        setIcon(option.icon)
        console.log("asd")
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
            <h3 className={styles['transaction__value']}>₺{ transaction?.value}</h3>
            <div className={styles['transaction__type']}>
              <h2 >{ transaction?.type}</h2>
              <div className={styles['transaction__type--resp']}><AccountBalanceWalletOutlined/></div>
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

          { transaction?.description=="" && <h3>No description</h3>}
        </div>
        
    </div>
  )
}
