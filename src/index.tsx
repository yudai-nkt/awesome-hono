import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

import { Entries, type Entry } from "./components/Entries";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Stylesheet } from "./components/Stylesheet";
import { Submission } from "./pages/Submission";
import { parseJSONFromKVAsset } from "./utils";

const app = new Hono<{ Bindings: Env }>();

const categories = [
  {
    id: "official-resources",
    name: "Official resources",
    description: "Docs, repos and other resources managed by Hono officially.",
  },
  {
    id: "applications",
    name: "Applications",
    description:
      "Applications that are developed using Hono. Scale does not matter.",
  },
  {
    id: "libraries",
    name: "Libraries",
    description: "Community-developed libraries that extend Hono's capability.",
  },
  {
    id: "articles",
    name: "Articles",
    description: "Blog posts or other reading materials about Hono.",
  },
];

// TODO: remove type assertions against parsed JSONs and validate at runtime.
app
  .get("/", async (c) =>
    c.html(
      <html>
        <head>
          <title>Awesome Hono</title>
          <Stylesheet />
          <link rel="stylesheet" href="/static/custom.css" />
        </head>
        <body>
          <Header />
          <main class="container">
            <p>
              Awesome Hono curates awesome stuff around Hono's ecosystem. This
              website itself is also built using Hono and showcases how you can
              build a small application with Hono.
            </p>
            <p>
              Want your projects to be listed here? We welcome your submission!
              Please follow <a href="/submission">the submission guide</a>.
            </p>
            <div class="grid category-list">
              {categories.map(({ id, name, description }) => (
                <a href={id}>
                  <article>
                    <h2>{name}</h2>
                    <p>{description}</p>
                  </article>
                </a>
              ))}
            </div>
          </main>
          <Footer />
        </body>
      </html>
    )
  )
  .get("/submission", (c) =>
    c.html(
      <html>
        <head>
          <title>Submission guide | Awesome Hono</title>
          <Stylesheet />
        </head>
        <body>
          <Header />
          <main class="container">
            <Submission />
          </main>
          <Footer />
        </body>
      </html>
    )
  )
  .get("/applications", async (c) => {
    const entries = (await parseJSONFromKVAsset(
      "static/applications.json",
      c
    )) as (Entry & { isHobby: boolean })[];
    return c.html(
      <html>
        <head>
          <title>Awesome Hono</title>
          <Stylesheet />
          <link rel="stylesheet" href="/static/custom.css" />
        </head>
        <body>
          <Header />
          <main class="container">
            <h2>Applications</h2>
            <h3>Production-grade projects</h3>
            <Entries entries={entries.filter(({ isHobby }) => !isHobby)} />
            <h3>Hobby projects</h3>
            <Entries entries={entries.filter(({ isHobby }) => isHobby)} />
          </main>
          <Footer />
        </body>
      </html>
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
      <html>
        <head>
          <title>Awesome Hono</title>
          <Stylesheet />
          <link rel="stylesheet" href="/static/custom.css" />
        </head>
        <body>
          <Header />
          <main class="container">
            <h2>{category.name}</h2>
            <Entries entries={entries} />
          </main>
          <Footer />
        </body>
      </html>
    );
  })
  .get("/static/*", serveStatic({ root: "./" }));

export default app;
