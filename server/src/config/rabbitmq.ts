import amqp from 'amqplib';

// declare global {
//   var channel: amqp.Channel;
//   var rabbitmq: amqp.Connection;
// }
// const EXCHANGE_NAME = 'blockchain';
// type ExchangeName = typeof EXCHANGE_NAME;

// export const connection =
//   global.rabbitmq || (await amqp.connect(process.env.AMQP_URL));
// if (process.env.NODE_ENV !== 'production') global.rabbitmq = connection;

// export const channel = global.channel || (await rabbitmq.createChannel());

// type RoutingKeys =
//   | 'userToken'
//   | 'tipERC20'
//   | 'tipETH'
//   | 'withdrawERC20'
//   | 'withdrawETH';
const EXCHANGE_NAME = 'blockchain';
type ExchangeName = typeof EXCHANGE_NAME;
type RoutingKeys =
  | 'userToken'
  | 'tipERC20'
  | 'tipETH'
  | 'withdrawERC20'
  | 'withdrawETH';

declare global {
  var channel: amqp.Channel;
  var rabbitmq: amqp.Connection;
}

let channel: amqp.Channel;

const connect = async () => {
  const connection =
    global.rabbitmq || (await amqp.connect(process.env.AMQP_URL!));
  if (process.env.NODE_ENV !== 'production') global.rabbitmq = connection;

  channel = global.channel || (await connection.createChannel());
  // const channel = global.channel || (await rabbitmq.createChannel());
};

export const publishMessage = async (routingKey: RoutingKeys, data: any) => {
  !channel && await connect()
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
  // await channel.bindQueue(q.queue, exchange, 'Warning');
  // await channel.bindQueue(q.queue, exchange, 'Error');

  // return (listener: (msg: amqp.ConsumeMessage | null )=> void) => channel.consume(q.queue, listener);

  // If dev return message in consumer, it indicate to delete msg from queue
  return (
    listener: (msg: amqp.ConsumeMessage | null) => void,
    options?: amqp.Options.Consume | undefined
  ) => {
    channel.consume(q.queue, listener, options);
    return (msg: amqp.ConsumeMessage | null) => {
      msg && channel.ack(msg);
    };
  };

  // channel.consume(q.queue, (msg) => {
  //   const data = JSON.parse(msg.content);
  //   console.log(data);
  //   channel.ack(msg);
  // });
}
