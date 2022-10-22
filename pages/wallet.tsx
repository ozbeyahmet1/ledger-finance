import * as React from 'react';
import Layout from '../components/layout/primaryLayout'
import WalletView from '../views/wallet'
export interface IAppProps {
}

export default function App (props: IAppProps) {
    return (
      <Layout selected="wallet">
        <WalletView/>
      </Layout>
    )
  }