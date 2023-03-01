type Service = Record<
  string,
  {
    name: string;
    host: string;
    port: number;
    url: string;
    protocol: 'http' | 'https';
    routes: string[];
  }
>;

export const services: Service = {
  blockchainDataFeed: {
    host: 'localhost',
    name: 'blockchain',
    port: 3003,
    protocol: 'http',
    url: 'http://localhost:3003/',
    routes: ['/api/token', '/api/tip/signature'],
  },
  database: {
    host: 'localhost',
    name: 'database',
    port: 3002,
    protocol: 'http',
    url: 'http://localhost:3002/',
    routes: [
      '/api/page',
      '/api/user',
      '/api/tip',
      '/api/tokenBasicInfo',
      '/api/userToken',
    ],
  },
};
