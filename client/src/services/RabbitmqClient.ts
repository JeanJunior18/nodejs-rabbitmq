import { Connection, Channel, connect, Message, Replies } from 'amqplib';

export default class RabbibtmqServer {
  private conn: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private uri: string) {}

  async connect(): Promise<void> {
    console.log('Start Channel');
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async getQueueMessages(
    queue: string,
    callback: (message: Message | null) => void,
  ): Promise<Replies.Consume | null> {
    if (!this.channel) throw new Error('Has not Channel');

    try {
      return await this.channel.consume(queue, (message) => {
        callback(message);
        message && this.channel?.ack(message);
      });
    } catch (e) {
      return null;
    }
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
