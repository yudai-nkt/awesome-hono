import { type UserConfig } from "vite";
import pages from "@hono/vite-cloudflare-pages";
import devServer, { defaultOptions } from "@hono/vite-dev-server";

import autoExcludeStaticRoutes from "./vite-plugins/auto-exclude-static-routes";

export default {
  plugins: [
    pages(),
    devServer({
      cf: { assets: true },
      exclude: [...defaultOptions.exclude, "/assets/**"],
      entry: "./src/index.tsx",
    }),
    autoExcludeStaticRoutes(),
  ],
} satisfies UserConfig;
