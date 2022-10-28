import * as React from 'react';
import Layout from '../components/layout/primaryLayout'
import { fetchNews } from '../helpers/fetchNews';
import { NewsInterface } from '../interfaces/news.interface';
import NewsView from '../views/news'
export interface IAppProps {
    news:NewsInterface[];
}

export default function App ({news}: IAppProps) {
  return (
    <Layout selected='news'>
      <NewsView news={news.slice(0,8)}/>
    </Layout>
  );
}


export async function getStaticProps() {
    const news = await fetchNews()
    return { props: { news} }
  }