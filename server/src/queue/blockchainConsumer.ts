import { consumeMessages } from '@config/rabbitmq';

export const userTokenCreate = async () => {
  const consumer = await consumeMessages('blockchain', 'userTokenCreate', [
    'userToken',
  ]);

  consumer((msg) => {
    // console.log(msg)
    console.log(JSON.parse(msg?.content as unknown as string));
    // console.log(JSON.parse(msg as unknown as string));
    return msg;
  });

  // // await channel.assertExchange('logExchange', 'direct');
  // const q = await channel.assertQueue('userToken');

  // await channel.bindQueue(q.queue, 'logExchange', 'Warning');
  // await channel.bindQueue(q.queue, 'logExchange', 'Error');

  // channel.consume(q.queue, (msg) => {
  //   const data = JSON.parse(msg.content);
  //   console.log(data);
  //   channel.ack(msg);
  // });
};
