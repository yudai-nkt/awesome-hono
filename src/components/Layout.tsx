import { html } from "hono/html";
import { type FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { type HtmlEscapedString } from "hono/utils/html";

import { GitHubCorner } from "./GitHubCorner";

export const Layout: FC<{
  title: string;
  description: string;
}> = ({ title, description, children }) => {
  const {
    req: { url, path },
  } = useRequestContext();

  return prependDoctype(
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.0-alpha1/pico.min.css"
          integrity="sha512-tiGutJeoo2pgUWvQ+ePVgmyl3yU97QJn/aWEnViFLSzOjBvYkvtSFZTAUSbw1jDO5QOefPnB3/TJfxiCQfG9+g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="stylesheet" href="/assets/custom.css" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/assets/ogp-image.png" />
        <meta property="og:site_name" content="Awesome Hono" />
        <meta property="og:title" content={title} />
        <meta
          property="og:type"
          content={path === "/" ? "website" : "article"}
        />
        <meta property="og:url" content={url} />
      </head>
      <body>
        <header class="container">
          <hgroup>
            <h1>Awesome Hono</h1>
            <p>A curated list of awesome stuff related to Hono</p>
          </hgroup>
          <GitHubCorner />
        </header>
        <main class="container">{children}</main>
        <footer class="container">
          Built with Hono 🔥, curated by the community 👨‍👩‍👧‍👦
        </footer>
      </body>
    </html>
  );
};

const prependDoctype = (jsx: HtmlEscapedString) => html`<!DOCTYPE html>${jsx}`;
