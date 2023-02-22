import { dotenvConfig } from '@tipdapp/server';
import amqp from 'amqplib';
dotenvConfig();

declare global {
  var channel: amqp.Channel;
  var rabbitmq: amqp.Connection;
}

const EXCHANGE_NAME = 'blockchain';
type RoutingKeys =
  | 'userToken'
  | 'tipERC20'
  | 'tipETH'
  | 'withdrawERC20'
  | 'withdrawETH';

let channel: amqp.Channel;

const connect = async () => {
  const connection =
    global.rabbitmq || (await amqp.connect(process.env.AMQP_URL!));
  if (process.env.NODE_ENV !== 'production') global.rabbitmq = connection;

  channel = global.channel || (await connection.createChannel());
};

export const publishMessage = async (routingKey: RoutingKeys, data: any) => {
  !channel && (await connect());
  await channel.assertExchange(EXCHANGE_NAME, 'direct');

  const logDetails = {
    data,
    dateTime: new Date(),
  };

  //TODO implememt logic to retry publish if from some reason no success
  await channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(logDetails))
  );

  console.log(`The new ${routingKey} log is sent to exchange ${EXCHANGE_NAME}`);
};
