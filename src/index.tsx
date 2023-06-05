import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { $boolean, $object, $void } from "lizod";

import { Layout } from "./components/Layout";
import { ogp } from "./middlewares/ogp";
import { Applications, Category } from "./pages/Category";
import { Home } from "./pages/Home";
import { Submission } from "./pages/Submission";
import { categories, validateEntries } from "./utils";

const app = new Hono<{ Bindings: Env }>();

app
  .get("*", ogp())
  .get("/", async (c) =>
    c.html(
      <Layout
        title="Awesome Hono"
        description="A curated list of awesome stuff related to Hono"
      >
        <Home />
      </Layout>
    )
  )
  .get("/submission", (c) =>
    c.html(
      <Layout
        title="Submission guide | Awesome Hono"
        description="Guideline for submitting your work to Awesome Hono"
      >
        <Submission />
      </Layout>
    )
  )
  .get("/applications", async (c) => {
    const entries = await validateEntries(
      "applications",
      c,
      $object({ isHobby: $boolean })
    );
    return c.html(
      <Layout
        title="Applications | Awesome Hono"
        description={
          categories.find(({ id }) => id === "applications")?.description!
        }
      >
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
    const entries = await validateEntries(categoryId, c, $void);
    return c.html(
      <Layout
        title={`${category.name} | Awesome Hono`}
        description={category.description}
      >
        <Category name={category.name} entries={entries} />
      </Layout>
    );
  })
  .get("/static/*", serveStatic({ root: "./" }));

export default app;
