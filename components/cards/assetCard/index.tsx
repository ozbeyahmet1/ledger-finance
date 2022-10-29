import React, { useEffect, useState } from 'react'
import styles from './assetCard.module.css'
import { AssetInterface } from '../../../interfaces/asset.interface';
import { HomeOutlined,KeyboardArrowDownOutlined,KeyboardArrowUpOutlined,HolidayVillage,Verified,CurrencyBitcoin,LocalAtm,HistoryToggleOff} from '@mui/icons-material/';

export interface IAssetCardProps {
  asset:AssetInterface;
  location:string;
}

export default function AssetCard({asset,location}: IAssetCardProps) {
  const [show,setShow]=useState(false);
  const [icon,setIcon]=useState(<HomeOutlined/>)

  const categories_options = [
    { value: "Cash", icon: <LocalAtm className='icon--grey'/>},
    { value: "Digital Assets", icon: <img src="https://cdn-icons-png.flaticon.com/512/6699/6699362.png" className='svgIcon--purple'/> },
    { value: "Real Estate", icon:<HolidayVillage className='icon--green'/> },
    { value: "Commodities", icon:<img src="https://cdn-icons-png.flaticon.com/512/2640/2640565.png" className='svgIcon--yellow'/>},
    { value: "Currencies", icon: <CurrencyBitcoin className='icon--burgundy'/> },
  ]

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
            <h3 className={styles['asset__value']}>${+asset?.value}</h3>
            
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
          
        </div>
        
    </div>
  )
}
