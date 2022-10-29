import { ethers } from 'ethers';
import * as React from 'react';
import { contractAbi,contractAddress } from '../../constants';
import styles from './wallet.module.css'
import Web3Modal from 'web3modal';
import TransactionCard from "../../components/cards/transactionCard"
import BalanceCard from '../../components/cards/balanceCard'
import {Add,CloseOutlined,AccessTimeOutlined,ErrorOutline,Close, ModeStandby, Warning} from '@mui/icons-material';
import { TransactionInterface } from "../../interfaces/transaction.interface";
import { Tooltip } from '@mui/material';
import Link from 'next/link';

export default function App () {
    const [tasks,setTasks]=React.useState<any[]>([])
    const [transaction, setTransaction] = React.useState("");
    const [transactions, setTransactions] = React.useState<any[]>([]);
    const current = new Date().toLocaleString();
    const [hash,setHash]=React.useState("");
    const [open, setOpen] = React.useState(false);
    const [statue,SetStatue]=React.useState("initial");
    const [warning,setWarning]=React.useState(false);
    const [formInfo, setFormInfo] = React.useState({
      type: "Income",
      category:"Housing",
      date: current,
      description: "",
      headline: "",
      value: 0,
    });
 

    //Adding stashing transactions to local storage
    const AddTxnToLocal = (e:any) => {
      const newTransaction = {   
        type: formInfo.type,
        category:formInfo.category,
        date: formInfo.date,
        description: formInfo.description,
        headline: formInfo.headline,
        value: formInfo.value,
      };
      if (newTransaction.description==""||newTransaction.headline=="" || newTransaction.value.toString().length==0) {
        setWarning(true)
      } else {
        setWarning(false);
        setTransactions([...transactions, newTransaction]);
        localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
        setTransaction("");
        setOpen(false);
        setFormInfo({
          type: "Income",
          category:"Housing",
          date: current,
          description: "",
          headline: "",
          value: 0,
        });
      }
      
    };


    //Getting stashing transactions from local storage
    const localTxns = localStorage.getItem("transactions") || "";
    const localTxnsJson= localTxns && JSON.parse(localTxns);
    React.useEffect(()=>{
        if(localStorage.getItem("transactions")){
            const storedList = JSON.parse(localTxns);
            setTransactions(storedList);
        }
    },[])


    //Clear all transactions in local storage
    const ClearTxnInLocal=()=>{
      setTransactions([]);
      localStorage.removeItem("transactions");
    }


    //Adding stashing transactions in local storage to blockchain
    const AddTxnToBlockchain = async ()=>{    
      let task = {
        'data': JSON.stringify(transactions),
      };
      try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
          const TransactionsContract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
        )
          
        let transaction = await TransactionsContract.addTransaction(task.data);
        ClearTxnInLocal();
        SetStatue("waiting")
        const txn = await transaction.wait();
        setHash(txn.transactionHash);
        SetStatue("completed")
      
      } catch(error) {
        console.log("Error in AddTxnToBlockchain Function", error);
      }
    };


    //Getting transactions from blockchain
    const getAllTasks = async() => {
    try {  
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
        const TransactionsContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        )
        let allTasks = await TransactionsContract.fetchMyTransactions();
        setTasks(allTasks);
    } catch(error) {
      console.log(error);
    }
  }
    
  React.useEffect(() => {
    getAllTasks()
  },[hash]);


    const type_options = [
      { value: "Income" },
      { value: "Outcome" },
    ];

    const categories_options = [
        { value: "Housing"},
        { value: "Transportation"},
        { value: "Food" },
        { value: "Utilities" },
        { value: "Clothing"},
        { value: "Medical/Healthcare" },
        { value: "Personal"},
        { value: "Education"},
        { value: "Entertainment"},
      ]
  
  const PushToBlockchain = () => {
    setFormInfo({ ...formInfo})
    AddTxnToBlockchain().then(ClearTxnInLocal)
  }

  const jsonStrings = tasks.map(item=>JSON.parse(item.data))

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
  console.log(concatedJsonStrings);

const incomes = concatedJsonStrings.filter(element=> element.type=="Income")
const outcomes  = concatedJsonStrings.filter(element=> element.type=="Outcome")


let addIncome=0;
let addOutcome=0;
for (var i = 0; i< incomes.length; i++)
{
  addIncome += parseFloat(incomes[i].value)
}
for (var i = 0; i< outcomes.length; i++)
{
  addOutcome += parseFloat(outcomes[i].value)
}


  return (

    <div className={styles["wallet"]}>

    <div className={styles["wallet__content"]}>

      {/*Left side of wallet**/}
      <div className={styles["wallet--left"]}>
        <BalanceCard background="purple" value={addIncome-addOutcome}/>
        <div
          className={styles["wallet__addNewTransaction"]}
          onClick={()=>setOpen(true)}
        >
          <Add />
          <h3>Add New Transaction </h3>
        </div>
      </div>
      
      {/*Right side of wallet*/} {/*Approve stashing transactions*/}
      <div className={styles["wallet--right"]}>


      {statue=="initial" &&
        <div className={styles["wallet__transactionWrapper"]}>
          <div className={styles['wallet__headline']}>
            <h4>Stashing Transactions</h4>
            <Tooltip title={
              <div>
                <h2>Why do we stash transactions?</h2>
                <h4>Every transaction to be made on the blockchain will cause a cost. For this reason, we send a maximum of 10 transactions to the blockchain in bundles.</h4>
              </div>
            } >
              <ErrorOutline/>
            </Tooltip>
          </div>
            {localTxns ? localTxnsJson.map((element:TransactionInterface,id:number)=>{
              return <TransactionCard
              location='localStorage'
                transaction={element}
            />
            }): <h2>No transaction recorded</h2>}
          <h3 className={styles["wallet__pushButton"]} onClick={()=>PushToBlockchain()}>Push to Blockchain</h3>
        </div>
        }

      {statue=="waiting" && 
        <div className={styles["wallet__transaction"]}>
            <span className={styles['wallet__loading']}></span>
          <h2>Adding to blockchain. Please wait</h2>
        </div>
      }

      {statue=="completed" && 
        <div className={styles["wallet__success"]}>
          <Close onClick={()=>SetStatue("initial")} fontSize="large" style={{cursor:"pointer"}}/>
          {hash}
          <h2>Successfull</h2>
          <Link href={`https://mumbai.polygonscan.com/tx/${hash}`}>
            <a target='_blank'>
              <h3>View on PolygonScan</h3>
            </a>
          </Link> 
        </div>
      }
      
      <div>
      
        {tasks ? concatedJsonStrings.map((element:TransactionInterface,id:number)=>{
                    return <TransactionCard
                    location='blockchain'
                    transaction={element}
                />
                  }): <h2>No transaction recorded</h2> }
        </div>
      </div>
    </div>

    {/*Modal Starts**/}
    {open && 
        <div className={styles['wallet__modal']}>
        <>
        <div className={styles["wallet--top"]}>
            <h2>Add New Transaction</h2>
            <CloseOutlined
              onClick={()=>setOpen(false)}
              className={styles["wallet__icon"]}
            />
          </div>
          <div className={styles["wallet--bottom"]}>         
            <div className={styles["wallet__modal--right"]}>
              <div className={styles["wallet__time"]}>
                <AccessTimeOutlined/>
                <h4>{current}</h4>
              </div>

              <div className={styles["wallet__selectWrapper"]}>
                <h4>Type</h4>
                <select
                  value={formInfo.type}
                  onChange={(event: any)=>setFormInfo({ ...formInfo,type: event?.target?.value })}
                  className={styles[`wallet__select`]}
                >
                  {type_options.map((option) => {
                    return <option key={option.value} value={option.value}>
                    {option.value} 
                  </option>
                  })}
                </select>
              </div>

              <div className={styles["wallet__selectWrapper"]}>
              <h4>Category</h4>
                <select
                  value={formInfo.category}
                  onChange={(event: any)=>setFormInfo({ ...formInfo,category: event?.target?.value })}
                  className={styles[`wallet__select`]}
                >
                  {categories_options.map((option) => {
                    return <option key={option.value} value={option.value}>
                    {option.value} 
                  </option>
                  })}
                </select>
              </div>

              <div className={styles['wallet__input']}>
                <h4>Value in USD</h4>
                <input
                  type="number"
                  placeholder="Value"
                  onChange={(e:any) => setFormInfo({ ...formInfo,value: e?.target?.value })}
                  value={formInfo.value}
                  min={0}
                />
              </div>

              <div className={styles['wallet__input']}>
                <h4>Description</h4>
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e:any) => setFormInfo({ ...formInfo,description: e?.target?.value })}
                  value={formInfo.description}
                />
              </div>

              <div className={styles['wallet__input']}>
                <h4>Headline</h4>
                <input
                  type="text"
                  placeholder="headline"
                  onChange={(e:any) => setFormInfo({ ...formInfo,headline: e?.target?.value })}
                  value={formInfo.headline}
                />
              </div>
             
              <h4 className={styles["wallet__button"]} onClick={()=>AddTxnToLocal(formInfo)}>Post</h4> 
              {warning && <h3 className={styles['wallet__warning']}>Please fill the all fields</h3>}
            </div>
          </div>
        </> 
        </div>
      }
    {/*Modal Ends**/}

  </div>
  );
}
