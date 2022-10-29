import React, { useEffect, useState } from 'react'
import styles from './assetCard.module.css'
import { AssetInterface } from '../../../interfaces/asset.interface';
import {  HomeOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
          FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
          TheaterComedyOutlined,KeyboardArrowUpOutlined,Verified,HistoryToggleOff} from '@mui/icons-material/';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
export interface IAssetCardProps {
  asset:AssetInterface;
  location:string;
}

  export default function AssetCard({asset,location}: IAssetCardProps) {
  const [show,setShow]=useState(false);

  const categories_options = [
    { value: "Cash", icon: <HomeOutlined className={styles['assetCard__icon--grey']}/>},
    { value: "Equity", icon: <DirectionsBusFilledOutlined className={styles['assetCard__icon--orange']}/> },
    { value: "Real Estate", icon:<FoodBankOutlined className={styles['assetCard__icon--red']}/> },
    { value: "Commodities", icon:<HandymanOutlined className={styles['assetCard__icon--yellow']}/>},
    { value: "Currencies", icon:<CheckroomOutlined className={styles['assetCard__icon--burgundy']}/> },
  ]


  const [icon,setIcon]=useState(<HomeOutlined/>)

  useEffect(()=>{
    categories_options.map((option)=>{
      if(option.value==asset?.category){
        setIcon(option.icon)
      }
    })
  },[asset])

  return (
    <div className={styles['assetCard']}>
        <div className={styles['assetCard--top']}>
          <div className={styles['assetCard--left']}>
            {icon}
            <div className={styles['asset__headline']}>
              <h2>{ asset?.headline}</h2>
              <h5>{ asset?.date}</h5>
            </div>
          </div>
          <div>
          </div>
            <h3 className={styles['asset__value']}>${ asset?.value}</h3>
            

            
            <div className={styles['transaction__iconWrapper']}>
              {location=="blockchain" ? <Verified color="success" /> : <HistoryToggleOff/>} 
            </div>
        </div>
     
        <div className={styles['asset__description']}>
          {(show &&  asset.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['asset__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowUpOutlined />
          </div>
          }
  
          {(!show &&  asset?.description!=="")  && 
          <div onClick={()=>setShow(prevState=>!prevState)} className={styles['asset__descriptionIcon']}>
            <h2>Description</h2>
            <KeyboardArrowDownOutlined/>
          </div>
          }

          {show ? <h3>{ asset?.description}</h3> :  ""}

          { asset?.description=="" && <h3>No description</h3>}
        </div>
        
    </div>
  )
}
