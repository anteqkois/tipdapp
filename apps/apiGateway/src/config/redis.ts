import { dotenvConfig } from '@tipdapp/server';
import { createClient } from 'redis';

dotenvConfig();

const CONSTANTS = {
  NONCE_EXPIRE_S: 20 * 60, // 20 minutes
};

const client = createClient({
  url:
    process.env.NODE === 'prodeuction'
      ? `redis://${process.env.REDIS_USER_NAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`
      : `redis://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
  console.log('> Microservice connect to Redis database.');
})();

// const getOrCash = async (key: string, callback: Promise<() => any>) => {
const getOrCache = async (key: string, callback: () => Promise<any>) => async () => {
  const data = await client.get(key);
  if (data) return JSON.parse(data);
  const freshData = await callback();
  client.set(key, JSON.stringify(freshData));
  return freshData;
  // new Promise(async (resolve, reject) => {
  //   const data = await client.get(key);
  //   if (data) resolve(JSON.parse(data));
  //   const freshData = await callback();
  //   client.set(key, JSON.stringify(freshData));
  //   resolve(freshData);
};

export { client as redis, getOrCache, CONSTANTS };
