type Service = Record<
  string,
  { name: string; host: string; port: number; url: string; protocol: 'http' | 'https'; routes: string[] }
>;

export const services: Service = {
  database: {
    host: 'localhost',
    name: 'database',
    port: 3002,
    protocol: 'http',
    url: 'http://localhost:3002/',
    routes: ['/api/page', '/api/user', '/api/tip', '/api/tokenInfo', '/api/userToken'],
  },
  blockchainDataFeed: {
    host: 'localhost',
    name: 'blockchainDataFeed',
    port: 3003,
    protocol: 'http',
    url: 'http://localhost:3003/',
    routes: ['/api/token'],
  },
};
