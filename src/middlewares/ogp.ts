import { type MiddlewareHandler } from "hono";

class OpenGraphConfigurator implements HTMLRewriterElementContentHandlers {
  #url: URL;
  constructor(url: URL) {
    this.#url = url;
  }
  element(element: Element): void {
    element.append(
      `<meta property="og:type" content=${
        this.#url.pathname === "/" ? "website" : "article"
      } />`,
      { html: true }
    );
    element.append(
      `<meta property="og:url" content=${this.#url.toString()} />`,
      { html: true }
    );
  }
}

export const ogp = (): MiddlewareHandler => async (context, next) => {
  await next();
  if (context.res.headers.get("Content-Type")?.includes("text/html")) {
    context.res = new HTMLRewriter()
      .on("head", new OpenGraphConfigurator(new URL(context.req.url)))
      .transform(context.res);
  }
};
