import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

import { Entries, type Entry } from "./components/Entries";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Stylesheet } from "./components/Stylesheet";
import { parseJSONFromKVAsset } from "./utils";

const app = new Hono<{ Bindings: Env }>();

app
  .get("/", async (c) => {
    // TODO: remove type assertions and validate at runtime.
    const applications = (await parseJSONFromKVAsset(
      "static/applications.json",
      c
    )) as (Entry & { isHobby: boolean })[];
    const officialResources = (await parseJSONFromKVAsset(
      "static/official-resources.json",
      c
    )) as Entry[];

    return c.html(
      <html>
        <head>
          <title>Awesome Hono</title>
          <Stylesheet />
        </head>
        <body>
          <Header />
          <main>
            <h2>Official resources</h2>
            <Entries entries={officialResources} />
            <h2>Applications</h2>
            <h3>Production-grade projects</h3>
            <Entries entries={applications.filter(({ isHobby }) => !isHobby)} />
            <h3>Hobby projects</h3>
            <Entries entries={applications.filter(({ isHobby }) => isHobby)} />
            <h2>Libraries</h2>
            <p>Submission welcome!</p>
            <h2>Articles</h2>
            <p>Submission welcome!</p>
          </main>
          <Footer />
        </body>
      </html>
    );
  })
  .get("/static/*", serveStatic({ root: "./" }));

export default app;
