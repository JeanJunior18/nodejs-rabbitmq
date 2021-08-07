import { Connection, Channel, connect, Replies } from 'amqplib';

export default class RabbibtmqServer {
  private conn: Connection | undefined;
  private channel: Channel | undefined;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    console.log('Start Channel');
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  checkConnection(): boolean {
    return !!this.channel;
  }

  publishInQueue(queue: string, message: string): boolean {
    if (!this.channel) throw new Error('Has not Channel');
    console.log('Sending to queue', queue, message);
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }
}
