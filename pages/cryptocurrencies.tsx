import * as React from 'react';
import Layout from '../components/layout/primaryLayout'
import { FetchCryptos } from '../helpers/fetchCrypto';
import { CryptoInterface } from '../interfaces/crypto.interface';
import CryptoView from '../views/crypto'
export interface IAppProps {
    cryptos:CryptoInterface[];
}

export default function App (props: IAppProps) {
  return (
    <Layout selected="cryptocurrencies">
        <CryptoView cryptos={props.cryptos}/>
  </Layout>
  );
}


export async function getStaticProps() {
    const cryptos = await FetchCryptos(100);
    return { props: { cryptos } };
  }