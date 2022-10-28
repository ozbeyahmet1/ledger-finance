import Layout from "../components/layout/primaryLayout"
import { FetchCryptos } from "../helpers/fetchCrypto";
import DashboardView from '../views/dashboard'
import { CryptoInterface } from "../interfaces/crypto.interface";
import { fetchNews } from "../helpers/fetchNews";
import { NewsInterface } from "../interfaces/news.interface";
export interface IAppProps {
  cryptos:CryptoInterface[];
  news:NewsInterface[];
}

export default function App ({cryptos,news}: IAppProps) {
  return (
    <Layout selected="dashboard">
      <DashboardView cryptos={cryptos} news={news}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const cryptos = await FetchCryptos(4);
  const news = await fetchNews()
  return { props: { cryptos,news } };
}