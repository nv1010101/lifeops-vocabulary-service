import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { testConfig } from "./fixtures";

describe("platform contract endpoints", () => {
  it("returns module metadata from config", async () => {
    const app = createApp(testConfig);

    await app.ready();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/meta"
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        module_id: "vocabulary",
        display_name: "Vocabulary",
        description: "Vocabulary management and review workflow service",
        api_version: "1",
        module_version: "0.1.0"
      });
    } finally {
      await app.close();
    }
  });

  it("returns factual disabled capabilities for the bootstrap slice", async () => {
    const app = createApp(testConfig);

    await app.ready();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/capabilities"
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        search: false,
        activity: false,
        widgets: false,
        views: false
      });
    } finally {
      await app.close();
    }
  });
});
