export async function fetchNews() {
    const news = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c18a0322fd294ff5a78472569a057113')
    const dataNews = await news.json();
  
    return dataNews.articles
  }