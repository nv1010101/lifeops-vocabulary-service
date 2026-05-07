import Fastify, { type FastifyInstance } from "fastify";

import type { AppConfig } from "./config";
import { registerHealthRoutes } from "./routes/health";
import { registerPlatformRoutes } from "./routes/platform";

export function createApp(config: AppConfig): FastifyInstance {
  const app = Fastify({
    logger: false
  });

  app.decorate("config", config);

  registerHealthRoutes(app);
  registerPlatformRoutes(app, config);

  return app;
}
