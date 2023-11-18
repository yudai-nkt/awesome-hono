import { type Context } from "hono";
import { $array, $object, $string, type Validator } from "lizod";

import { type Entry } from "./components/Entries";

export const categories = [
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
    id: "scaffolds",
    name: "Scaffolds",
    description:
      "Templates or boilerplates to easily start developing with Hono.",
  },
  {
    id: "articles",
    name: "Articles",
    description: "Blog posts or other reading materials about Hono.",
  },
];

export const validateEntries = async <T>(
  category: string,
  context: Context,
  // TODO: make subScheme optional w/o compile error
  subSchema: Validator<T>
): Promise<Entry<T>[]> => {
  const env = context.env as { ASSETS: { fetch: typeof fetch } };
  const entries = await env.ASSETS.fetch(
    // Path has to be absolute here.
    // cf. https://github.com/cloudflare/workers-sdk/issues/165#issuecomment-1290538864
    new URL(`/assets/data/${category}.json`, context.req.url)
  ).then((r) => r.json());

  const schema = $array(
    $object({
      id: $string,
      name: $string,
      summary: $string,
      url: $string,
      properties: subSchema,
    })
  );

  if (schema(entries)) {
    return entries;
  }
  throw new Error("Validation failed.");
};
