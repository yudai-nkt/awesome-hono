import { readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { type Plugin, type ResolvedConfig } from "vite";

type StaticRoutes = { version: number; include: string[]; exclude: string[] };

const onBuild = (): Plugin => {
  let config: ResolvedConfig;
  let staticRoutes: StaticRoutes;

  return {
    name: "auto-exclude-static-routes:build",
    apply: "build",
    configResolved: async (resolvedConfig) => {
      config = resolvedConfig;
      const staticAssets = await readdir(config.publicDir, {
        withFileTypes: true,
      });
      staticRoutes = {
        version: 1,
        include: ["/*"],
        exclude: staticAssets.map((e) =>
          e.isDirectory() ? `/${e.name}/*` : `/${e.name}`
        ),
      };
    },
    writeBundle: () => {
      writeFile(
        resolve(config.build.outDir, "_routes.json"),
        JSON.stringify(staticRoutes)
      );
    },
  };
};

const autoExcludeStaticRoutes = (): Plugin[] => [onBuild()];

export default autoExcludeStaticRoutes;
