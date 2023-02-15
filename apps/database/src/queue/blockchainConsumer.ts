import { consumeMessages } from '@config/rabbitmq';
import { userTokenService } from '@services/userTokenService';

export const userTokenCreate = async () => {
  const { consume, ack, parseMessageContent } = await consumeMessages(
    'blockchain',
    'userTokenCreate',
    ['userToken']
  );

  consume(async (msg) => {
    const data = parseMessageContent(msg?.content);
    // TODO dave to db and if success ack, other create logic to retry
    try {
      await userTokenService.create(data.data);
      ack(msg);
    } catch (error) {
      // TODO create queueu error logger
    }
  });
};
