import './src/config/dotenv';
import './src/eventListeners/index';
// import { publishMessage } from './src/lib/rabbitmq';

// setInterval(async () => {
//   await publishMessage('userToken', { data: 'test', dateTime: new Date() });
// }, 3000);

// const main = async () => {
//   await import('./src/eventListeners/index.js');
//   console.log(process.env.AMQP_URL);

//   setInterval(async () => {
//     await publishMessage('userToken', { data: 'test', dateTime: new Date() });
//   }, 3000);
// };

// main();
