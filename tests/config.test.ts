import { describe, expect, it } from "vitest";

import { ConfigError, loadConfig } from "../src/config";

describe("loadConfig", () => {
  it("loads required environment variables", () => {
    expect(
      loadConfig({
        PORT: "8000",
        INTERNAL_BEARER_TOKEN: "test_internal_token",
        MODULE_ID: "vocabulary",
        MODULE_DISPLAY_NAME: "Vocabulary",
        MODULE_VERSION: "0.1.0"
      })
    ).toEqual({
      port: 8000,
      internalBearerToken: "test_internal_token",
      moduleId: "vocabulary",
      moduleDisplayName: "Vocabulary",
      moduleVersion: "0.1.0"
    });
  });

  it("normalizes whitespace around required string values", () => {
    expect(
      loadConfig({
        PORT: " 8000 ",
        INTERNAL_BEARER_TOKEN: " test_internal_token ",
        MODULE_ID: " vocabulary ",
        MODULE_DISPLAY_NAME: " Vocabulary ",
        MODULE_VERSION: " 0.1.0 "
      })
    ).toEqual({
      port: 8000,
      internalBearerToken: "test_internal_token",
      moduleId: "vocabulary",
      moduleDisplayName: "Vocabulary",
      moduleVersion: "0.1.0"
    });
  });

  it("fails fast when a required environment variable is missing", () => {
    expect(() =>
      loadConfig({
        PORT: "8000",
        MODULE_ID: "vocabulary",
        MODULE_DISPLAY_NAME: "Vocabulary",
        MODULE_VERSION: "0.1.0"
      })
    ).toThrow(ConfigError);
  });

  it("fails fast when PORT is invalid", () => {
    expect(() =>
      loadConfig({
        PORT: "not-a-port",
        INTERNAL_BEARER_TOKEN: "test_internal_token",
        MODULE_ID: "vocabulary",
        MODULE_DISPLAY_NAME: "Vocabulary",
        MODULE_VERSION: "0.1.0"
      })
    ).toThrow("PORT must be an integer between 1 and 65535");
  });
});
