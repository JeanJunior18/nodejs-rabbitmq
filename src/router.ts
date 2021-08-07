import { Router } from 'express';
import RabbibtmqServer from './services/rabbitmq-server';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world With Docker Change' });
});

router.get('/rabbit', async (req, res) => {
  const server = new RabbibtmqServer('amqp://admin:admin@rabbitmq:5672');
  await server.start();
  await server.publishInQueue('teste', JSON.stringify(req.query));
  return res.json({ message: 'Message sent to queue' });
});

export default router;
