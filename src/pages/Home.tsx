import { categories } from "../utils";

export const Home = () => (
  <>
    <p>
      Awesome Hono curates awesome stuff around Hono's ecosystem. This website
      itself is also built using Hono and showcases how you can build a small
      application with Hono.
    </p>
    <p>
      Want your projects to be listed here? We welcome your submission! Please
      follow <a href="/submission">the submission guide</a>.
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
  </>
);
