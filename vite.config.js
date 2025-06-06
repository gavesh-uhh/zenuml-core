import { resolve } from "path";
import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue";
import { execSync } from "child_process";
import svgLoader from "vite-svg-loader";
import { readFileSync, readdirSync } from "fs";

process.env.VITE_APP_GIT_HASH = process.env.DOCKER
  ? ""
  : execSync("git rev-parse --short HEAD").toString().trim();
process.env.VITE_APP_GIT_BRANCH = process.env.DOCKER
  ? ""
  : execSync("git branch --show-current").toString().trim();

// Read version from package.json
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8"),
);

export default defineConfig(({ mode }) => ({
  base: "/",
  build: {
    rollupOptions: {
      input: [resolve(__dirname, "index.html")],
    },
  },
  resolve: {
    alias: {
      vue: "@vue/compat",
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    createVuePlugin({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
    svgLoader(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    "process.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
    "process.env.VITE_VERSION": JSON.stringify(packageJson.version),
  },
  test: {
    // used by vitest: https://vitest.dev/guide/#configuring-vitest
    environment: "jsdom",
    reportOnFailure: true,
    globals: true,
    coverage: {
      provider: "v8", // or 'v8'
    },
    deps: {
      inline: ["@vue/test-utils"],
    },
  },
}));
