import { ethers } from 'ethers';
import * as React from 'react';
import { contractAbi,contractAddress } from '../../constants';
import styles from '../wallet/wallet.module.css';
import Web3Modal from 'web3modal';
import AssetCard from "../../components/cards/assetCard"
import BalanceCard from '../../components/cards/balanceCard'
import {Add,CloseOutlined,AccessTimeOutlined,ErrorOutline,Close} from '@mui/icons-material';
import { AssetInterface } from "../../interfaces/asset.interface";
import { Tooltip } from '@mui/material';
import Link from 'next/link';

export default function App () {
    const [tasks,setTasks]=React.useState<any[]>([])
    const [asset, setAsset] = React.useState("");
    const [assets, setAssets] = React.useState<any[]>([]);
    const current = new Date().toLocaleString();
    const [hash,setHash]=React.useState("");
    const [open, setOpen] = React.useState(false);
    const [statue,SetStatue]=React.useState("initial");
    const [warning,setWarning]=React.useState(false);
    const [formInfo, setFormInfo] = React.useState({
      category:"Cash",
      date: current,
      description: "",
      headline: "",
      value: 0,
    });

    //Adding stashing assets to local storage
    const AddAssetToLocal = (e:any) => {
      const newAsset = {   
        category:formInfo.category,
        date: formInfo.date,
        description: formInfo.description,
        headline: formInfo.headline,
        value: formInfo.value,
      };
      if (newAsset.description==""||newAsset.headline=="" || newAsset.value.toString().length==0) {
        setWarning(true)
      } else {
        setWarning(false);
        setAssets([...assets, newAsset]);
        localStorage.setItem("assets", JSON.stringify([...assets, newAsset]));
        setAsset("");
        setOpen(false);
        setFormInfo({
          category:"Cash",
          date: current,
          description: "",
          headline: "",
          value: 0,
        });
      }
      
    };

    //Getting stashing assets from local storage
    const localAssets = localStorage.getItem("assets") || "";
    const localAssetsJson= localAssets && JSON.parse(localAssets);
    React.useEffect(()=>{
        if(localStorage.getItem("assets")){
            const storedList = JSON.parse(localAssets);
            setAssets(storedList);
        }
    },[])

    //Clear all assets in local storage
    const ClearAssetInLocal=()=>{
      setAssets([]);
      localStorage.removeItem("assets");
    }

    //Adding stashing assets in local storage to blockchain
    const AddAssetsToBlockchain = async ()=>{    
      let task = {
        'data': JSON.stringify(assets),
      };
      try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
          const AssetsContract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
        )
          
        let asset = await AssetsContract.addAsset(task.data);
        ClearAssetInLocal();
        SetStatue("waiting")
        const txn = await asset.wait();
        setHash(txn.transactionHash);
        SetStatue("completed")
      
      } catch(error) {
        console.log("Error in AddAssetsToBlockchain Function", error);
      }
    };

    //Getting assets from blockchain
    const getAllAssets = async() => {
    try {  
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
        const AssetsContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        )
        let allAssets = await AssetsContract.fetchMyAssets();
        setTasks(allAssets);
    } catch(error) {
      console.log(error);
    }
  }
    
  React.useEffect(() => {
    getAllAssets()
  },[hash]);

  const categories_options = [
      { value: "Cash"},
      { value: "Digital Assets"},
      { value: "Real Estate" },
      { value: "Commodities" },
      { value: "Currencies"},
    ]
  
  const PushToBlockchain = () => {
    setFormInfo({ ...formInfo})
    AddAssetsToBlockchain().then(ClearAssetInLocal)
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

let addIncome=0;

for (var i = 0; i< concatedJsonStrings.length; i++)
{
  addIncome += parseFloat(concatedJsonStrings[i].value)
}

  return (

    <div className={styles["wallet"]}>

    <div className={styles["wallet__content"]}>

      {/*Left side of wallet**/}
      <div className={styles["wallet--left"]}>
        <BalanceCard background="red" value={addIncome}/>
        <div
          className={styles["wallet__addNewTransaction"]}
          onClick={()=>setOpen(true)}
        >
          <Add />
          <h3>Add New Transaction </h3>
        </div>
      </div>
      
      {/*Right side of wallet*/} {/*Approve stashing assets*/}
      <div className={styles["wallet--right"]}>


      {statue=="initial" &&
        <div className={styles["wallet__transactionWrapper"]}>
          <div className={styles['wallet__headline']}>
            <h4>Stashing Transactions</h4>
            <Tooltip title={
              <div>
                <h2>Why do we stash assets?</h2>
                <h4>Every transaction to be made on the blockchain will cause a cost. For this reason, we send a maximum of 10 assets to the blockchain in bundles.</h4>
              </div>
            } >
              <ErrorOutline/>
            </Tooltip>
          </div>
            {localAssets ? localAssetsJson.map((element:AssetInterface,id:number)=>{
              return <AssetCard
              location='localStorage'
                asset={element}
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
      
        {tasks ? concatedJsonStrings.map((element:AssetInterface,id:number)=>{
                    return <AssetCard
                    location='blockchain'
                    asset={element}
                />
                  }): <h2>No asset recorded</h2> }
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
             
              <h4 className={styles["wallet__button"]} onClick={()=>AddAssetToLocal(formInfo)}>Post</h4> 
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
