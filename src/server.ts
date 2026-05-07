import "dotenv/config";

import { createApp } from "./app";
import { ConfigError, loadConfig } from "./config";

async function main(): Promise<void> {
  const config = loadConfig();
  const app = createApp(config);

  await app.listen({
    host: "0.0.0.0",
    port: config.port
  });
}

main().catch((error: unknown) => {
  if (error instanceof ConfigError) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});
