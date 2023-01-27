import api from "../config/apiConfig";
import handledTokens from '../config/handledTokens.json'

const tokensIds = handledTokens.map(token => token.coingeckoIds).join();

const dataFeed = async () => {
 const data = await api.get('/coins/markets', {
   params: {
     vs_currency: 'usd',
     ids: tokensIds,
     order: 'market_cap_desc',
     per_page: 100,
     page: 1,
     sparkline: false,
   },
 });

 console.log(data);
 return data;
// ds=the-sandbox%2Ctether%2Cshiba-inu%2Cbinancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false
};

export const cryptocurrencyService = { dataFeed };
// vs_currency: 
// usd
// ids: 
// the-sandbox%2Ctether%2Cshiba-inu%2Cbinancecoin
// order: 
// market_cap_desc
// per_page: 
// 100
// page: 
// 1
// sparkline: 
// false