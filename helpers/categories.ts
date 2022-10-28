import styles from './homepageTxnCard.module.css'

import {  HomeOutlined , AccountBalanceWalletOutlined , KeyboardArrowDownOutlined ,DirectionsBusFilledOutlined,
  FoodBankOutlined,HandymanOutlined,CheckroomOutlined,MedicalInformationOutlined,SpaOutlined,SchoolOutlined,
  TheaterComedyOutlined,KeyboardArrowUpOutlined,Verified,HistoryToggleOff} from '@mui/icons-material/';

  export const categories_options = 
    { value: "Housing",icon:<h2><h2/>}
    { value: "Transportation", icon: <DirectionsBusFilledOutlined className={styles['transactionCard__icon--orange']}/> },
    { value: "Food", icon:<FoodBankOutlined className={styles['transactionCard__icon--red']}/> },
    { value: "Utilities", icon:<HandymanOutlined className={styles['transactionCard__icon--yellow']}/>},
    { value: "Clothing", icon:<CheckroomOutlined className={styles['transactionCard__icon--burgundy']}/> },
    { value: "Medical/Healthcare", icon: <MedicalInformationOutlined className={styles['transactionCard__icon--blue']}/>},
    { value: "Personal", icon:<SpaOutlined className={styles['transactionCard__icon--green']}/> },
    { value: "Education", icon: <SchoolOutlined className={styles['transactionCard__icon--pink']}/> },
    { value: "Entertainment", icon:<TheaterComedyOutlined className={styles['transactionCard__icon--gold']}/> },
  