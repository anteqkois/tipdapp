import amqp from 'amqplib';

declare global {
  var channel: amqp.Channel;
  var rabbitmq: amqp.Connection;
}

const EXCHANGE_NAME = 'blockchain';
type ExchangeName = typeof EXCHANGE_NAME;
type RoutingKeys =
  | 'userToken'
  | 'tipERC20'
  | 'tipETH'
  | 'withdrawERC20'
  | 'withdrawETH';

type ParsedMessage = { data: any; dateTime: Date };

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
  await channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(logDetails))
  );

  //TODO use Logger
  console.log(`The new ${routingKey} log is sent to exchange ${EXCHANGE_NAME}`);
};

export const parseMessageContent = (
  content: amqp.ConsumeMessage['content'] | undefined
) => JSON.parse(content as unknown as string) as ParsedMessage;

export async function consumeMessages(
  exchange: ExchangeName,
  queue: string,
  routingKey: RoutingKeys[]
) {
  !channel && (await connect());
  await channel.assertExchange(exchange, 'direct');

  const q = await channel.assertQueue(queue);

  routingKey.forEach(async (key) => {
    await channel.bindQueue(q.queue, exchange, key);
  });

  return {
    consume: (
      listener: (msg: amqp.ConsumeMessage | null) => void,
      options?: amqp.Options.Consume | undefined
    ) => channel.consume(q.queue, listener, options),
    ack: (msg: amqp.ConsumeMessage | null) => msg && channel.ack(msg),
    parseMessageContent,
  };
}