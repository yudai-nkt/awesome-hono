import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

import { type Entry } from "./components/Entries";
import { Layout } from "./components/Layout";
import { Applications, Category } from "./pages/Category";
import { Home } from "./pages/Home";
import { Submission } from "./pages/Submission";
import { categories, parseJSONFromKVAsset } from "./utils";

const app = new Hono<{ Bindings: Env }>();

// TODO: remove type assertions against parsed JSONs and validate at runtime.
app
  .get("/", async (c) =>
    c.html(
      <Layout metadata={{ title: "Awesome Hono" }}>
        <Home />
      </Layout>
    )
  )
  .get("/submission", (c) =>
    c.html(
      <Layout metadata={{ title: "Submission guide | Awesome Hono" }}>
        <Submission />
      </Layout>
    )
  )
  .get("/applications", async (c) => {
    const entries = (await parseJSONFromKVAsset(
      "static/applications.json",
      c
    )) as (Entry & { isHobby: boolean })[];
    return c.html(
      <Layout metadata={{ title: "Applications | Awesome Hono" }}>
        <Applications entries={entries} />
      </Layout>
    );
  })
  .get("/:categoryId", async (c) => {
    const { categoryId } = c.req.param();
    const category = categories.find(({ id }) => id === categoryId);
    if (category === undefined) {
      return c.notFound();
    }
    const entries = (await parseJSONFromKVAsset(
      `static/${categoryId}.json`,
      c
    )) as Entry[];
    return c.html(
      <Layout metadata={{ title: `${category.name} | Awesome Hono` }}>
        <Category name={category.name} entries={entries} />
      </Layout>
    );
  })
  .get("/static/*", serveStatic({ root: "./" }));

export default app;
