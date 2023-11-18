import { Hono } from "hono";
import { $boolean, $object, $void } from "lizod";

import { renderer } from "./middleware/renderer";
import { Applications, Category } from "./pages/Category";
import { Home } from "./pages/Home";
import { Submission } from "./pages/Submission";
import { categories, validateEntries } from "./utils";

const app = new Hono();

app
  .get("*", renderer())
  .get("/", (c) =>
    c.render(<Home />, {
      title: "Awesome Hono",
      description: "A curated list of awesome stuff related to Hono",
    })
  )
  .get("/submission", (c) =>
    c.render(<Submission />, {
      title: "Submission guide | Awesome Hono",
      description: "Guideline for submitting your work to Awesome Hono",
    })
  )
  .get("/applications", async (c) => {
    const entries = await validateEntries(
      "applications",
      c,
      $object({ isHobby: $boolean })
    );
    const description = categories.find(({ id }) => id === "applications")
      ?.description!;
    return c.render(<Applications entries={entries} />, {
      title: "Applications | Awesome Hono",
      description,
    });
  })
  .get("/:categoryId", async (c) => {
    const { categoryId } = c.req.param();
    const category = categories.find(({ id }) => id === categoryId);
    if (category === undefined) {
      return c.notFound();
    }
    const entries = await validateEntries(categoryId, c, $void);
    return c.render(<Category name={category.name} entries={entries} />, {
      title: `${category.name} | Awesome Hono`,
      description: category.description,
    });
  });

export default app;
