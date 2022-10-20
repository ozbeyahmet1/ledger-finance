import * as React from 'react';
import styles from './dashboard.module.css'
import Link from 'next/link';
import RightBar from '../../components/layout/rightBar'
import BalanceCard from '../../components/cards/balanceCard'
import CryptoCard from '../../components/cards/cryptoCard'
import StatsCard from '../../components/cards/statsCard'
import NewsCard from '../../components/cards/newsCard'
import CategoriesCard from '../../components/cards/categoriesCard'
import TransferMoneyCard from '../../components/cards/transferMoneyCard'
import { CryptoInterface } from '../../interfaces/crypto.interface';

export interface IDashboardViewProps {
  cryptos:CryptoInterface[];
}

export default function App (props: IDashboardViewProps) {

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
              {props.cryptos.map((crypto, i) => {
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
                <StatsCard color="#BD5AAD" />
              </div>
              <div className={styles["dashboard__stats--single"]}>
                <h3>Outcome Stats</h3>
                <StatsCard color="#F16516" />
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Bottom Body*/}
        <div className={styles["dashboard--middle"]}>

          {/*News*/}
          <div className={styles["dashboard__crypto"]} style={{padding:"20px 30px"}}>
            <h3>News</h3>
            <NewsCard />
            <NewsCard />
            <NewsCard />
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
              <CategoriesCard color="#BD5AAD" />
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

