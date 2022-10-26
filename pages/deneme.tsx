import { ethers } from 'ethers';
import * as React from 'react';
import { contractAbi,contractAddress } from '../constants';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  const getContract = () => {
    const {ethereum} = window
    const provider= new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress,contractAbi,signer)
    console.log(contract)
    return contract;
  }

  const deneme = async () => {
    const res = await getContract().getCreatorData()
    await res.wait()
  }

  return (
    <div>
      <h2 onClick={deneme} style={{background:"red"}}>deneme</h2>
    </div>
  );
}
