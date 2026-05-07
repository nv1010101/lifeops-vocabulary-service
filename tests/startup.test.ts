import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { testConfig } from "./fixtures";

describe("application startup", () => {
  it("starts and shuts down cleanly", async () => {
    const app = createApp(testConfig);

    await expect(app.ready()).resolves.toBe(app);
    await app.close();
  });
});
