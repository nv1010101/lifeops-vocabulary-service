import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config";

export function registerPlatformRoutes(app: FastifyInstance, config: AppConfig): void {
  app.get("/meta", () => {
    return {
      module_id: config.moduleId,
      display_name: config.moduleDisplayName,
      description: "Vocabulary management and review workflow service",
      api_version: "1",
      module_version: config.moduleVersion
    };
  });

  app.get("/capabilities", () => {
    return {
      search: false,
      activity: false,
      widgets: false,
      views: false
    };
  });
}
