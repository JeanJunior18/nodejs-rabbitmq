import { Router } from 'express';
import RabbibtmqServer from './services/RabbitmqServer';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world With Docker Change' });
});

router.post('/publish-test', async (req, res) => {
  const server = new RabbibtmqServer('amqp://admin:admin@rabbitmq:5672');
  await server.onlyPublishInQueue('teste', JSON.stringify(req.body));
  return res.json({ message: 'Message sent to queue' });
});

export default router;
