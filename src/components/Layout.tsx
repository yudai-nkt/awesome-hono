import { html } from "hono/html";
import { type HtmlEscapedString } from "hono/utils/html";

export const Layout = ({
  children,
  metadata,
}: {
  children: HtmlEscapedString;
  metadata: { title: string };
}) =>
  html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${metadata.title}</title>
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
        </header>
        <main class="container">${children}</main>
        <footer class="container">
          Built with Hono 🔥, curated by the community 👨‍👩‍👧‍👦
        </footer>
      </body>
    </html>`;
