import { defineConfig, mergeConfig } from "vitest/config";
// @ts-ignore
import viteConfig from "./vite.config.old.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      include: ["tests/**/*.spec.ts", "tests/**/*.spec.js"],
      setupFiles: ["./tests/setup.ts"], // Add global setup
      css: {
        modules: {
          classNameStrategy: "non-scoped",
        },
      },
      server: {
        deps: {
          inline: ["vuetify"],
        },
      },
    },
  })
);
