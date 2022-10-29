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
      <div className={styles['news--left']}>
        <img
            src={news[0].urlToImage ? news[0].urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
            width="100%"
        />
        <Link href={news[0].url}><h2>{news[0].title}</h2></Link>
      </div>
      <div className={styles['news--right']}>
        {news.slice(1,6).map((element,i)=>{
            return (
            <div className={styles['news__singleNews']}>
                <img
                   src={news[i+1].urlToImage ? news[i+1].urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
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
