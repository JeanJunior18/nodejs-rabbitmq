import { Router } from 'express';
import RabbibtmqServer from './services/RabbitmqServer';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world With Docker Change' });
});

router.post('/publish-test', async (req, res, next) => {
  const { exchange, routingKey, message } = req.body;
  try {
    const server = new RabbibtmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.onlyPublishInExchange(
      exchange,
      routingKey,
      JSON.stringify(message),
    );
    return res.json({ message: 'Message sent to exchange' });
  } catch (err) {
    return next(err);
  }
});

export default router;
