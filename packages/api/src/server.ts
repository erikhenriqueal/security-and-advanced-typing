import "dotenv/config";
import Fastify from "fastify";
import { LoggerOptions } from "pino";

const envToLogger: Record<string, boolean | LoggerOptions> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const fastify = Fastify({
  logger: envToLogger[process.env.NODE_ENV ?? "production"],
});

fastify.get("/", async (req, reply) => {
  return { hello: "world!" };
});

async function start() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
