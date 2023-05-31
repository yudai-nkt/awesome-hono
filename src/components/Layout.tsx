import { html } from "hono/html";
import { type HtmlEscapedString } from "hono/utils/html";

import { GitHubCorner } from "./GitHubCorner";

export const Layout = ({
  children,
  metadata,
}: {
  children: HtmlEscapedString;
  metadata: {
    title: string;
    og: { title: string; description: string };
    url: URL;
  };
}) =>
  html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>${metadata.title}</title>
        <meta property="og:description" content="${metadata.og.description}" />
        <meta property="og:site_name" content="Awesome Hono" />
        <meta property="og:title" content="${metadata.og.title}" />
        <meta
          property="og:type"
          content=${metadata.url.pathname === "/" ? "website" : "article"}
        />
        <meta property="og:url" content="${metadata.url.toString()}" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.0-alpha1/pico.min.css"
          integrity="sha512-tiGutJeoo2pgUWvQ+ePVgmyl3yU97QJn/aWEnViFLSzOjBvYkvtSFZTAUSbw1jDO5QOefPnB3/TJfxiCQfG9+g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="stylesheet" href="/static/custom.css" />
      </head>
      <body>
        <header class="container">
          <hgroup>
            <h1>Awesome Hono</h1>
            <p>A curated list of awesome stuff related to Hono</p>
          </hgroup>
          ${(<GitHubCorner />)}
        </header>
        <main class="container">${children}</main>
        <footer class="container">
          Built with Hono 🔥, curated by the community 👨‍👩‍👧‍👦
        </footer>
      </body>
    </html>`;
