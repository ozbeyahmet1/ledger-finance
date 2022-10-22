import React, { useEffect, useState } from 'react'
import styles from './TransactionCard.module.css'
import {  HomeOutlined , AccountBalanceWalletOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
          FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
          TheaterComedyOutlined,KeyboardArrowUpOutlined} from '@mui/icons-material/';

export interface IAppProps {
    date:string;
    headline:string;
    value:number;
    type:string;
    description:string;
    category:string;
}



  export default function App (props: IAppProps) {
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
      if(option.value==props.category){
        setIcon(option.icon)
        console.log("asd")
      }
    })
  },[props])

  return (
    <div className={styles['transactionCard']}>
        <div className={styles['transactionCard--top']}>
          <div className={styles['transactionCard--left']}>
            {icon}
            <div className={styles['transaction__headline']}>
              <h2>{props.headline}</h2>
              <h5>{props.date}</h5>
            </div>
          </div>
          <div>
          </div>
            <h3 className={styles['transaction__value']}>₺{props.value}</h3>
            <div className={styles['transaction__type']}>
              <h2 >{props.type}</h2>
              <div className={styles['transaction__type--resp']}><AccountBalanceWalletOutlined/></div>
            </div>
            <div className={styles['transacion__iconWrapper']}>
              <HomeOutlined/>
            </div>
        </div>
     
        <div className={styles['transaction__description']}>
          {(show && props.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['transaction__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowUpOutlined />
          </div>
          }
  
          {(!show && props.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['transaction__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowDownOutlined/>
          </div>
          }

          {show ? <h3>{props.description}</h3> :  ""}

          {props.description=="" && <h3>No description</h3>}
        </div>
        
    </div>
  )
}
