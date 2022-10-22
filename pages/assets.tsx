import * as React from 'react';
import Layout from '../components/layout/primaryLayout'
import AssetsView from '../views/assets'
export interface IAppProps {
}

export default function App (props: IAppProps) {
    return (
      <Layout selected="assets">
        <AssetsView/>
      </Layout>
    )
  }