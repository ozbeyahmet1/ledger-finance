import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { NewsInterface } from '../../../interfaces/news.interface';
import styles from './newsCard.module.css'

export interface INewsCardProps {
  news:NewsInterface;
}

export default function NewsCard({news}: INewsCardProps) {
  return (
      <div className={styles['newscard']}>
      <img 
          src={news?.urlToImage}
          width={80}
          height={80}
      />
      <div>
      <Link href={news.url}><h2>{news.title.slice(0,30)}...</h2></Link>
          <h5>{news?.content?.slice(0,80)}...</h5>
      </div>
  </div>

  );
}
