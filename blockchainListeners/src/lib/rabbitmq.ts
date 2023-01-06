import amqp from 'amqplib';
import '../config/dotenv';

const EXCHANGE_NAME = 'blockchain';
type RoutingKeys = 'userToken' | 'tipERC20' | 'tipETH' | 'withdrawERC20' | 'withdrawETH';

declare global {
  var channel: amqp.Channel;
  var rabbitmq: amqp.Connection;
}

let channel: amqp.Channel;

// const connect = async () => {
// };

(async () => {
  const connection = global.rabbitmq || (await amqp.connect(process.env.AMQP_URL!));
  if (process.env.NODE_ENV !== 'production') global.rabbitmq = connection;

  channel = global.channel || (await connection.createChannel());
  // const channel = global.channel || (await rabbitmq.createChannel());
})();

export const publishMessage = async (routingKey: RoutingKeys, data: any) => {
  await channel.assertExchange(EXCHANGE_NAME, 'direct');

  const logDetails = {
    data,
    dateTime: new Date(),
  };
  await channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(logDetails)));

  console.log(`The new ${routingKey} log is sent to exchange ${EXCHANGE_NAME}`);
};

// connect();
