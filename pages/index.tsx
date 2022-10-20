import Layout from "../components/layout/primaryLayout"
import { FetchCryptos } from "../helpers/fetchCrypto";
import DashboardView from '../views/dashboard'
import { CryptoInterface } from "../interfaces/crypto.interface";
export interface IAppProps {
  cryptos:CryptoInterface[];
}

export default function App (props: IAppProps) {
  return (
    <Layout selected="dashboard">
      <DashboardView cryptos={props.cryptos}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const cryptos = await FetchCryptos(4);
  return { props: { cryptos } };
}