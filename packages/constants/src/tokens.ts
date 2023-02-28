const handledTokens = [
  {
    address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    coinGeckoId: 'the-sandbox',
    symbol: 'sand',
    name: 'The Sandbox',
    chainId: 1,
    imageUrl: '/coins/sand.png',
  },
  {
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    coinGeckoId: 'shiba-inu',
    symbol: 'shib',
    name: 'Shiba Inu',
    chainId: 1,
    imageUrl: '/coins/shib.png',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    coinGeckoId: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    chainId: 1,
    imageUrl: '/coins/usdt.png',
  },
  {
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    coinGeckoId: 'matic-network',
    symbol: 'matic',
    name: 'Polygon',
    chainId: 1,
    imageUrl: '/coins/matic.png',
  },
  {
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    coinGeckoId: 'binancecoin',
    symbol: 'bnb',
    name: ' BNB',
    chainId: 1,
    imageUrl: '/coins/bnb.png',
  },

  {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    coinGeckoId: 'usd-coin',
    symbol: 'usdc',
    name: ' USD Coin',
    chainId: 1,
    imageUrl: '/coins/usdc.png',
  },
  {
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    coinGeckoId: 'uniswap',
    symbol: 'uni',
    name: ' Uniswap',
    chainId: 1,
    imageUrl: '/coins/uni.png',
  },
  {
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
    coinGeckoId: 'chainlink',
    symbol: 'link',
    name: ' Chainlink',
    chainId: 1,
    imageUrl: '/coins/link.png',
  },
  {
    address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
    coinGeckoId: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    chainId: 56,
    imageUrl: '/coins/doge.png',
  },
] as const;

// const tokenQuotes = ['sand', 'shib', 'usdt', 'matic', 'bnb', 'usdc', 'uni', 'link', 'doge'] as const

export { handledTokens };