import { ethers } from 'ethers';
import * as React from 'react';
import { contractAbi,contractAddress } from '../../constants';
import styles from './wallet.module.css'
import Web3Modal from 'web3modal';
import TransactionCard from "../../components/cards/transactionCard"
import BalanceCard from '../../components/cards/balanceCard'
import {Add,CloseOutlined,AccessTimeOutlined,ErrorOutline} from '@mui/icons-material';
import { TransactionInterface } from "../../interfaces/transaction.interface";
import { Tooltip } from '@mui/material';

export interface IAppProps {
}

export default function App (props: IAppProps) {
    const [tasks,setTasks]=React.useState<any[]>([])
    const [input, setInput]=React.useState('');
    const [transaction, setTransaction] = React.useState("");
    const [transactions, setTransactions] = React.useState<any[]>([]);
    const current = new Date().toLocaleString();


    //Adding stashing transactions to local storage
    const AddTxnToLocal = (e:any) => {
      const newTransaction = {   
        type: formInfo.type,
        category:formInfo.category,
        date: formInfo.date,
        description: formInfo.description,
        headline: formInfo.headline,
        value: formInfo.value,
        location:formInfo.location,
      };
      setTransactions([...transactions, newTransaction]);
      localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
      setTransaction("");
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

    const ClearTxnInLocal=()=>{
      setTransactions([]);
      localStorage.removeItem("transactions");
  }

    //Adding stashing transactions in local storage to blockchain
    const AddTxnToBlockchain = async ()=>{    
      let task = {
        'taskText': JSON.stringify(transactions),
      };
      
      try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
          const TaskContract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          )
          TaskContract.addTransaction(task.taskText)
      } catch(error) {
        console.log("Error submitting new Tweet", error);
      }
      setInput('')
    };

    //Getting transactions from blockchain
    const getAllTasks = async() => {
    try {  
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
    } catch(error) {
      console.log(error);
    }
  }
    
  React.useEffect(() => {
    getAllTasks()
  },[]);



    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(new Date());

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
  
      const [formInfo, setFormInfo] = React.useState({
        type: "Income",
        category:"Housing",
        date: current,
        description: "",
        headline: "",
        value: "",
        location:"localStorage",
      });
  
  
  const PushToBlockchain = () => {
    setFormInfo({ ...formInfo,location: "blockchain" })
    AddTxnToBlockchain().then(ClearTxnInLocal)
  }
  
  console.log(tasks)
  const jsonStrings = tasks.map(item=>JSON.parse(item.taskText))
  console.log(jsonStrings)

 
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

    <div className={styles["wallet"]}>

    <div className={styles["wallet__content"]}>

      {/*Left side of wallet**/}
      <div className={styles["wallet--left"]}>
        <BalanceCard background="purple" />
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
        <div className={styles["wallet__filters"]}>
          <h3>Sort By : Asc</h3>
          <h3>Sort By : Asc</h3>
          <h3>Sort By : Asc</h3>
          <h3>Sort By : Asc</h3>
        </div>
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
            <div className={styles["wallet--right"]}>
              <div className={styles["wallet__time"]}>
                <AccessTimeOutlined/>
                <h4>{current}</h4>
              </div>

              <div className={styles["wallet__selectWrapper"]}>
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
                <input
                  type="number"
                  placeholder="Value"
                  onChange={(e:any) => setFormInfo({ ...formInfo,value: e?.target?.value })}
                  value={formInfo.value}
                  min={0}
                />
              </div>

              <div className={styles['wallet__input']}>
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e:any) => setFormInfo({ ...formInfo,description: e?.target?.value })}
                  value={formInfo.description}
                />
              </div>

              <div className={styles['wallet__input']}>
                <input
                  type="text"
                  placeholder="headline"
                  onChange={(e:any) => setFormInfo({ ...formInfo,headline: e?.target?.value })}
                  value={formInfo.headline}
                />
              </div>
             
              <h4 className={styles["wallet__button"]} onClick={()=>AddTxnToLocal(formInfo)}>Post</h4> 
            </div>
          </div>
        </> 
        </div>
      }
    {/*Modal Ends**/}

  </div>
  );
}
