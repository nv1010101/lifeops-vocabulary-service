export type AppConfig = {
  port: number;
  internalBearerToken: string;
  moduleId: string;
  moduleDisplayName: string;
  moduleVersion: string;
};

const REQUIRED_ENV_KEYS = [
  "PORT",
  "INTERNAL_BEARER_TOKEN",
  "MODULE_ID",
  "MODULE_DISPLAY_NAME",
  "MODULE_VERSION"
] as const;

type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const values = Object.fromEntries(
    REQUIRED_ENV_KEYS.map((key) => [key, readRequired(env, key)])
  ) as Record<RequiredEnvKey, string | undefined>;
  const missing = REQUIRED_ENV_KEYS.filter((key) => !values[key]);

  if (missing.length > 0) {
    throw new ConfigError(`Missing required environment variables: ${missing.join(", ")}`);
  }

  const port = Number(values.PORT);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new ConfigError("PORT must be an integer between 1 and 65535");
  }

  return {
    port,
    internalBearerToken: values.INTERNAL_BEARER_TOKEN as string,
    moduleId: values.MODULE_ID as string,
    moduleDisplayName: values.MODULE_DISPLAY_NAME as string,
    moduleVersion: values.MODULE_VERSION as string
  };
}

function readRequired(env: NodeJS.ProcessEnv, key: RequiredEnvKey): string | undefined {
  const value = env[key];
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}
