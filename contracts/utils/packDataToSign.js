const { parseUnits, formatUnits } = ethers.utils;
const { signerAdmin, provider } = require('../server/ethersProvider');
const { ERC20_TOKEN_ADDRESS } = require('./constant');

const packDataToSign = (tokenAmount, tokenQuote, addressToDonate) => {
  // get price token/ get from DB
  // const price = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
  //   headers: {
  //     'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
  //   },
  //   params: {
  //     symbol: tokenQuote,
  //     convert: 'USD',
  //   },
  // });
  // console.log(price.data.data.SAND[0].quote.USD.price);

  const price = 2.1262470976845336;
  // const sandPriceBN = parseUnits(sandPrice.data.data.SAND[0].quote.USD.price.toString());
  const priceBN = parseUnits(price.toString());

};


const p = 2.1262470976845336;
// console.log(parseUnits(p.toString()));
// const sandPriceBN = parseUnits(sandPrice.data.data.SAND[0].quote.USD.price.toString());
const sandPriceBN = parseUnits(p.toString());
module.exports = { packDataToSign };