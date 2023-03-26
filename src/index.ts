import chalk from "chalk";
import consola from "consola";
import { createClient } from "redis";
import { HANDLERS, PATTERNS } from "./constants";
import { generateResponse, parseEventDataFromGateway } from "./utils";
const service = chalk.blue("[Render Service]");

console.clear();
consola.info(`${service} Service starting...`);

const client = createClient();
const subscriber = client.duplicate();
const publisher = client.duplicate();
Promise.all([subscriber.connect(), publisher.connect()]).then(() => {
  consola.success(`${service} Redis connected`);
});

Object.keys(PATTERNS).forEach((key) => {
  consola.info(`${service} Registing to ${chalk.italic(key)}`);
  subscriber.subscribe(
    PATTERNS[key as keyof typeof PATTERNS],
    async (message) => {
      const { id, data, pattern, isEmitter } =
        parseEventDataFromGateway(message);
      consola.info(
        `${service} ${chalk.blue(`Received ${pattern} +++ << ${id}`)}`
      );
      const handler = HANDLERS[key](id, data, pattern, isEmitter);
      const returns = handler ? generateResponse(id, handler) : "";
      if (isEmitter) {
        if (returns)
          publisher.publish(pattern, returns).then(() => {
            consola.info(`${service} Sent ${pattern} --- ${id}`);
          });
        else {
          consola.info(`${service} Sent ${pattern} --- ${id}`);
        }
      } else {
        if (returns)
          publisher.publish(`${pattern}.reply`, returns).then(() => {
            consola.info(
              `${service} ${chalk.blue(`Sent ${pattern}.reply --- >> ${id}`)}`
            );
          });
        else {
          consola.info(
            `${service} ${chalk.blue(`Sent ${pattern}.reply --- >> ${id}`)}`
          );
        }
      }
    }
  );
});
