
export async function FetchCryptos(number:number) {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=' + number + '&page=1&sparkline=false')
    const dataCrypto = await res.json();
  
    return dataCrypto
  }