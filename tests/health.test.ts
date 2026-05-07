import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { testConfig } from "./fixtures";

describe("GET /health", () => {
  it("returns the exact platform health payload", async () => {
    const app = createApp(testConfig);

    await app.ready();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/health"
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ status: "ok" });
    } finally {
      await app.close();
    }
  });
});
