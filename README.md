# Microservices example with RabbitMQ and NodeJS


> Microservices environment simulation using nodejs applications as services communicating through RabbitMQ

Technologies used in the project:

- NodeJS
- Typescript
- Docker
- Docker Compose
- RabbitMQ

### To run all apps with docker compose

```bash
docker-compose up
```

This command will run:

- 1 rabbitmq service as a messenger.
- 1 nodejs server that will publish exchanges when receiving HTTP requests.
- 3 nodejs applications called "client0", "client1" and "client3" that will run your queues.

### To send messages to queues

Just send an POST request containing the name of the queue that will respond and a message.

```json
POST http://localhost:3333/publish-test
content-type: application/json

{
    "exchange": "sentMessages",
    "routingKey": "client1",
    "message": "Hello Client 1"
}
```