import { Hono } from "hono";

import { renderer } from "./middleware/renderer";
import { Applications, Category } from "./pages/Category";
import { Home } from "./pages/Home";
import { Submission } from "./pages/Submission";
import { categories } from "./utils";

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
  .get("/applications", (c) => {
    const description = categories.find(({ id }) => id === "applications")
      ?.description!;
    return c.render(<Applications />, {
      title: "Applications | Awesome Hono",
      description,
    });
  })
  .get("/:categoryId", (c) => {
    const { categoryId } = c.req.param();
    const category = categories.find(({ id }) => id === categoryId);
    if (category === undefined) {
      return c.notFound();
    }
    return c.render(<Category category={category} />, {
      title: `${category.name} | Awesome Hono`,
      description: category.description,
    });
  });

export default app;
