import { ethers } from 'ethers';
import * as React from 'react';
import Web3Modal from 'web3modal';
import { contractAbi,contractAddress } from '../constants';
//toDoListABI = contractAbi
export interface IAppProps {
}

export default function App (props: IAppProps) {
    const [allAddress,setAllAddress]=React.useState([]);
    const allToDoList = [];
    const [myList,setMyList]=React.useState([])

    const fetchContract = (signerOrProvider:any) =>
        new ethers.Contract(contractAddress,contractAbi,signerOrProvider);


    const toDoList = async (message:any) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);
            const createList = await contract.createList(message);
            createList.wait();
            console.log(createList);

        } catch (error) {
            console.log(error)
        }
    }

    //get data
    const getToDoList = async()=>{
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);
            const getAllAddress = await contract.getAddress();
            setAllAddress(getAllAddress);

            getAllAddress.map(async (element:any)=>{
                const getSingleData=await contract.getCreatorData(element);
                allToDoList.push(getToDoList);
                console.log("singleData",getSingleData);
            });
            
            const allMessage = await contract.getMessage();
            setMyList(allMessage);
            console.log("MYLİST",myList)
            console.log("addresses",allAddress)

        } catch (error) {
            console.log(error)
        }
    }

    //change state of todolist to false to true
    const change = async(address:any) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);
            const state = await contract.toggle(address);
            state.wait()
            console.log(state)

        } catch (error) {
            
        }
    }

  return (
    <div>
      <h2 onClick={()=>toDoList("deneme")}>deneeeee</h2>
      <h3 onClick={getToDoList}>get</h3>
      {myList.map((element)=>{
        return <h2>{element}</h2>
      })}
    </div>
  );
}
