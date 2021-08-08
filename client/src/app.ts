import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './router';
import RabbibtmqClient from './services/RabbitmqClient';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.router();
    this.processor();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async processor() {
    const hostName = process.env.HOSTNAME;
    if (!hostName) throw new Error('Has not host name');
    const client = new RabbibtmqClient('amqp://admin:admin@rabbitmq:5672');
    await client.connect();
    client.getQueueMessages(hostName, (message) => {
      console.log('New message:', message?.content.toString());
    });
  }

  router() {
    this.app.use(router);
    this.app.use((req: Request, res: Response) => {
      return res.status(404).json({ error: 'Path Not Found' });
    });
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500);
        next(err.message);
        res.json({ error: err.message });
      },
    );
  }
}

export default new App().app;
