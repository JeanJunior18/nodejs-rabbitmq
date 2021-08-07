import { Connection, Channel, connect } from 'amqplib';

export default class RabbibtmqServer {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    console.log('Start Channel');
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async onlyPublishInQueue(queue: string, message: string): Promise<void> {
    connect(this.uri).then((conn) => {
      conn
        .createChannel()
        .then(async (channel) => {
          console.log('Sending to queue', queue, message);
          await channel.assertQueue(queue);
          channel.sendToQueue(queue, Buffer.from(message));
          return channel.close();
        })
        .catch((err) => err)
        .finally(() => conn.close());
    });
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    if (!this.channel) throw new Error('Has not Channel');
    console.log('Sending to queue', queue, message);
    await this.channel.assertQueue(queue);
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  closeChannel(): void {
    if (!this.channel) throw new Error('Has not Channel');
    console.log('Close Channel');
    this.channel.close();
  }

  closeConnection(): void {
    if (!this.conn) throw new Error('Has not Connection');
    if (this.channel) this.channel.close();
    console.log('Close Connection');
    this.conn.close();
  }
}
