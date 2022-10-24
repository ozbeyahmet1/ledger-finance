import * as React from "react"
import TransactionCard from "../../components/cards/transactionCard"
import styles from "./wallet.module.css"
import BalanceCard from '../../components/cards/balanceCard'
import {Add,CloseOutlined,AccessTimeOutlined} from '@mui/icons-material';
import DatePicker from '../../components/ui/datepicker'
import Inputs from '../../components/ui/input'
import { TransactionInterface } from "../../interfaces/transaction.interface";

export interface IAppProps {}

export default function App(props: IAppProps) {
    const [clicked,setClicked]=React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(new Date());

    const type_options = [
      { value: "Income", text: "Income" },
      { value: "Outcome", text: "Outcome" },
    ];
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    const categories_options = [
      { value: "Housing", text: "Housing" },
      { value: "Transportation", text: "Transportation" },
      { value: "Food", text: "Food" },
      { value: "Utilities", text: "Utilities" },
      { value: "Clothing", text: "Clothing" },
      { value: "Medical/Healthcare", text: "Medical/Healthcare" },
      { value: "Personal", text: "Personal" },
      { value: "Education", text: "Education" },
      { value: "Entertainment", text: "Entertainment" },
    ]
    console.log("value",value)

    const [formInfo, setFormInfo] = React.useState({
      type: "Income",
      category:"Housing",
      date: "",
      description: "",
      headline: "",
      value: "",
    });

const [transaction, setTransaction] = React.useState("");
const [transactions, setTransactions] = React.useState<any[]>([]);

const localTxns = localStorage.getItem("transactions") || "";
const localTxnsJson= localTxns && JSON.parse(localTxns);
React.useEffect(()=>{
    if(localStorage.getItem("transactions")){
        const storedList = JSON.parse(localTxns);
        setTransactions(storedList);
    }
},[])

const sendPost = (e:any) => {
    const newTransaction = {   
      type: formInfo.type,
      category:formInfo.category,
      date: formInfo.date,
      description: formInfo.description,
      headline: formInfo.headline,
      value: formInfo.value,
    };
    setTransactions([...transactions, newTransaction]);
    localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
    setTransaction("");
};

const handleDelete = (transaction:any)=>{
    const deleted = transactions.filter((t:any)=>t.id !== transaction.id);
    setTransactions(deleted);
    localStorage.setItem("transactions", JSON.stringify(deleted))
}

const handleClear=()=>{
    setTransactions([]);
    localStorage.removeItem("transactions");
}

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
            <h4>Stashing Transactions</h4>

                  {localTxns ? localTxnsJson.map((element:TransactionInterface,id:number)=>{
                    return <TransactionCard
                    date={element.headline}
                    headline={element.headline}
                    value={300}
                    type={element.type}
                    description={element.description}
                    category={element.category}
                    key={id}
                />
                  }): <h2>No transaction recorded</h2>}
             
            <h3 className={styles["wallet__pushButton"]} onClick={()=>handleClear()}>Push to Blockchain</h3>
          </div>
        </div>
      </div>

      {/*Modal Starts**/}
      {open && 
          <div
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles['walletModal']}
          >
          <>
          <div className={styles["walletModal--top"]}>
              <h2>Add New Transaction</h2>
              <CloseOutlined
                onClick={()=>setOpen(false)}
                className={styles["walletModal__icon"]}
              />
            </div>
            <div className={styles["walletModal--bottom"]}>
              <DatePicker date={value} setDate={setValue}/>
             
              <div className={styles["walletModal--right"]}>

                <div className={styles["walletModal__time"]}>
                  <AccessTimeOutlined/>
                  <h4>16:59:03 21/11/2021</h4>
                </div>

                <div className={styles["selectWrapper"]}>
                  <select
                    value={formInfo.type}
                    onChange={(event: any)=>setFormInfo({ ...formInfo,type: event?.target?.value })}
                    className={styles[`select`]}
                  >
                    {type_options.map((option) => {
                      return <option key={option.value} value={option.value}>
                      {option.text} 
                    </option>
                    })}
                  </select>
                </div>

                <div className={styles["selectWrapper"]}>
                  <select
                    value={formInfo.category}
                    onChange={(event: any)=>setFormInfo({ ...formInfo,category: event?.target?.value })}
                    className={styles[`select`]}
                  >
                    {categories_options.map((option) => {
                      return <option key={option.value} value={option.value}>
                      {option.text} 
                    </option>
                    })}
                  </select>
                </div>
                
                {formInfo.category}
                {/* <Inputs 
                  func={(e:any) => setFormInfo({ ...formInfo,headline: e?.target?.value })}
                  value={formInfo.headline}
                  placeholder="Please enter the headline"
                  disabled={false}
                  inputClass=""
                /> */}
  

              <div className={styles['profile__input']}>
                  <input
                    type="text"
                    placeholder="value"
                    onChange={(e:any) => setFormInfo({ ...formInfo,value: e?.target?.value })}
                    value={formInfo.value}
                  />
                </div>

                <div className={styles['profile__input']}>
                  <input
                    type="text"
                    placeholder="description"
                    onChange={(e:any) => setFormInfo({ ...formInfo,description: e?.target?.value })}
                    value={formInfo.description}
                  />
                </div>

                <div className={styles['profile__input']}>
                  <input
                    type="text"
                    placeholder="headline"
                    onChange={(e:any) => setFormInfo({ ...formInfo,headline: e?.target?.value })}
                    value={formInfo.headline}
                  />
                </div>

                <h4 className={styles["model__button"]} onClick={()=>sendPost(formInfo)}>Post</h4> 
              </div>
            </div>
          </> 
          </div>
        }
      {/*Modal Ends**/}

    </div>
  )
}
