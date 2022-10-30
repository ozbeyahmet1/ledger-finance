import React from 'react'
import styles from './rightbar.module.css'
import Image from 'next/image'
import Web3Modal from 'web3modal';
import { contractAbi,contractAddress } from '../../../constants';
import HomepageTxnCard from '../../cards/homepageTxnCard'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { ethers } from 'ethers';
import Link from 'next/link';
import { TransactionInterface } from '../../../interfaces/transaction.interface';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';

export default function RightBar() {

  const current = new Date();
  const [tasks,setTasks]=React.useState<any[]>([])
  const { address } = useAccount()
  const { data: session, status } = useSession()
  const getAllTransactions = async() => {
    try {
      if (address) {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
          const TaskContract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          )
          let allTasks = await TaskContract.fetchMyTransactions();
          setTasks(allTasks);
      }  
    } catch(error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getAllTransactions();
  },[address]);

  const jsonStrings = tasks.slice(0,4).map(item=>JSON?.parse(item.data))

  function sliceIntoChunks(arr:any) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        for (let index = 0; index < arr[i].length; index++) {
          res.push(arr[i][index]);
        }
    }
    return res;
  }

  const concatedJsonStrings = sliceIntoChunks(jsonStrings)
  
  return (
    <div className={styles.rightBar}>
      <div className={styles['rightBar__user']}>
        <div className={styles['rightBar__userIcon']}> 
          <Person2OutlinedIcon/>
        </div>
        <div className={styles['rightBar__index']}>
          <h2>Ahmet Ozbey</h2>
          <h3>Verified Account🟢</h3>
        </div>
      </div>
      <div>
        <h3 className={styles['rightBar__headline']}>Transactions</h3>
          {(tasks && address && session) && concatedJsonStrings.slice(0,4).map((element:TransactionInterface,id:number)=>{
            return <HomepageTxnCard transaction={element}/> })}

          {(concatedJsonStrings.length==0 || !address || !session) && 
            <>
              <HomepageTxnCard 
                transaction={{headline:"How it looks?",date:current,value:500,category:"Clothing",type:"income",description:""}}/> 
                <HomepageTxnCard 
                transaction={{headline:"How it looks?",date:current,value:500,category:"Education",type:"income",description:""}}/> 
                <HomepageTxnCard 
                transaction={{headline:"How it looks?",date:current,value:500,category:"Food",type:"income",description:""}}/> 
                <HomepageTxnCard 
                transaction={{headline:"How it looks?",date:current,value:500,category:"Medical/Healthcare",type:"income",description:""}}/> 
                <div className={styles['rightBar__noRecord']}>
                <h3>Your transactions will look like the examples above. <Link href="/wallet"><u>Click to add a transaction.</u></Link></h3>
                </div>
                </>
              }
          
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

