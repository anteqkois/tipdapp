import amqp from 'amqplib';

declare global {
  // eslint-disable-next-line no-var
  // var rabbitmq: amqp.Connection | undefined;
  // var channel: amqp.Channel | undefined;
  var rabbitmq: amqp.Connection;
  var channel: amqp.Channel;
}
// const connect = await amqp.connect(process.env.AMQP_URL);

export const connection = global.rabbitmq || (await amqp.connect(process.env.AMQP_URL));
if (process.env.NODE_ENV !== 'production') global.rabbitmq = connection;

export const channel = global.channel || (await rabbitmq?.createChannel());

// connect();
// async function connect() {
//   try {
//     const amqpServer = 'amqp://localhost:5672';
//     const connection = await amqp.connect(amqpServer);
//     const channel = await connection.createChannel();
//     await channel.assertQueue('jobs');
//     await channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
//     console.log(`Job sent successfully ${msg.number}`);
//     await channel.close();
//     await connection.close();
//   } catch (ex) {
//     console.error(ex);
//   }
// }
