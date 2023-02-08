import { createClient } from 'redis';
import './dotenv';

const CONSTANTS = {
  KEY_HASH_TOKEN: 'token',
};

// export const CONSTANTS = {
//   REDIS: {
//     H_TOKEN_KEY: 'token',
//   },
// };

const client = createClient({
  url: `redis://${process.env.REDIS_USER_NAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
  console.log('> Microservice connect to Redis database.');
})();

// const getOrCash = async (key: string, callback: Promise<() => any>) => {
const getOrCache = async (key: string, callback: () => Promise<any>) => {
  return new Promise(async (resolve, reject) => {
    const data = await client.get(key);
    if (data) return resolve(JSON.parse(data));
    const freshData = await callback();
    client.set(key, JSON.stringify(freshData));
    resolve(freshData);
  });
};

// const getOrCacheHash = async (key: string, field: string, callback: () => Promise<any>) => {
//   return new Promise(async (resolve, reject) => {
//     const data = await client.hGet(key, field);
//     if (data) return resolve(JSON.parse(data));
//     const freshData = await callback();
//     client.set(key, JSON.stringify(freshData));
//     resolve(freshData);
//   });
// };

export { client as redis, getOrCache, CONSTANTS };
