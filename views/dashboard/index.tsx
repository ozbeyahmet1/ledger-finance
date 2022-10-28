import * as React from 'react';
import styles from './dashboard.module.css'
import Link from 'next/link';
import BalanceCard from '../../components/cards/balanceCard'
import CryptoCard from '../../components/cards/cryptoCard'
import StatsCard from '../../components/cards/statsCard'
import NewsCard from '../../components/cards/newsCard'
import CategoriesCard from '../../components/cards/categoriesCard'
import TransferMoneyCard from '../../components/cards/transferMoneyCard'
import { CryptoInterface } from '../../interfaces/crypto.interface';
import { NewsInterface } from '../../interfaces/news.interface';

export interface IDashboardViewProps {
  cryptos:CryptoInterface[];
  news:NewsInterface[];
}

export default function App ({cryptos,news}:IDashboardViewProps) {
  const incomeStats = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 5 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 4 },
    { x: 9, y: 7 },
];

const outcomeStats = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 5 },
  { x: 3, y: 7 },
  { x: 4, y: 5 },
  { x: 5, y: 6 },
  { x: 6, y: 4 },
  { x: 7, y: 3 },
  { x: 8, y: 1 },
  { x: 9, y: 7 },
];

  return (
    <div className={styles["dashboard"]}>
      <div className={styles["dashboard__content"]}>
        
        {/* Greeting */}
        <div className={styles["dashboard__greeting"]}>
          <h1>Hello, Ahmet</h1>
          <h4>Welcome,back</h4>
        </div>

        {/* Balance Cards*/}
        <div className={styles["dashboard--top"]}>
          <BalanceCard background='green'/>
          <BalanceCard background='black'/>
          <BalanceCard background='black'/>
        </div>

        {/* Dashboard Top Body*/}
        <div className={styles["dashboard--middle"]}>
          <div className={styles["dashboard__crypto"]}>
            <h3>Cryptocurrencies</h3>
            <div className={styles['dashboard__cryptoWrapper']}>
              {cryptos.map((crypto, i) => {
                return <CryptoCard key={i} crypto={crypto} />;
              })}
              <Link href="/cryptocurrencies">
                <div className={styles["dashboard__loadMore"]}>
                  <h4>Load More </h4>
                </div>
              </Link>
            </div>
          </div>
          
          {/*Stats*/}
          <div>
            <div className={styles["dashboard__stats"]}>
              <div className={styles["dashboard__stats--single"]}>
                <h3>Income Stats</h3>
                <StatsCard color="#BD5AAD" data={incomeStats}/>
              </div>
              <div className={styles["dashboard__stats--single"]}>
                <h3>Outcome Stats</h3>
                <StatsCard color="#F16516" data={outcomeStats}/>
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Bottom Body*/}
        <div className={styles["dashboard--middle"]}>

          {/*News*/}
          <div className={styles["dashboard__crypto"]} style={{padding:"20px 30px"}}>
            <h3>News</h3>
            <NewsCard news={news?.[0]}/>
            <NewsCard news={news?.[2]}/>
            <NewsCard news={news?.[3]} />
            <Link href="/news">
              <div className={styles["dashboard__loadMore"]}>
                <h4>Load More </h4>
              </div>
            </Link>
          </div>

          {/*Categories*/}
          <div className={styles["dashboard__categories"]}>
            <div className={styles["dashboard__categories--single"]}>
              <h3>Categories</h3>
              <CategoriesCard/>
            </div>
            <div className={ styles["dashboard__categories--single"]}>
              <TransferMoneyCard />
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

