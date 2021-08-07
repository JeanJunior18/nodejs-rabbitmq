import { Connection, Channel, connect, Message } from 'amqplib';

export default class RabbibtmqServer {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async connect(): Promise<void> {
    console.log('Start Channel');
    this.conn = await connect(this.uri);
    // this.channel = await this.conn.createChannel();
  }

  async getQueueMessages(callback: (message: Message | null) => void)  {
    if (!this.channel) throw new Error('Has not Channel');
    return this.channel.consume('teste', message => {
      callback(message);
      message && this.channel?.ack(message);
    })
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
