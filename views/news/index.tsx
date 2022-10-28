import Link from 'next/link';
import * as React from 'react';
import { NewsInterface } from '../../interfaces/news.interface';
import styles from './news.module.css'

export interface IAppProps {
    news:NewsInterface[];
}

export default function App ({news}: IAppProps) {
    console.log(news.slice(2,5))
  return (
    <div className={styles['news']}>
      {/* {news.map(()=>{
        return <h2>ad</h2>
      })} */}
      <div className={styles['news--left']}>
        <img
            src={news[0].urlToImage}
            width={950}
        />
        <Link href={news[0].url}><h2>{news[0].title}</h2></Link>
        <h3>{news[0].content}</h3>
      </div>
      <div className={styles['news--right']}>
        {news.slice(1,6).map((element,i)=>{
            return (
            <div className={styles['news__singleNews']}>
                <img
                    src={news[i+1].urlToImage}
                    width={450}
                />
                <Link href={news[i+1].url}><h2>{news[i+1].title.slice(0,48)}...</h2></Link> 
            </div>
            )
        })}
       
      
      </div>
    </div>
  );
}
