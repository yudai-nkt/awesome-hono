import { type Context } from "hono";
import { getContentFromKVAsset } from "hono/utils/cloudflare";
import { $array, $object, $string, type Validator } from "lizod";
// @ts-expect-error
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

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

const parseJSONFromKVAsset = async (
  path: string,
  context: Context<{ Bindings: Env }>
) => {
  const asset = await getContentFromKVAsset(path, {
    manifest: manifestJSON,
    namespace: context.env.__STATIC_CONTENT,
  });

  // Only known keys under the developers' control are passed to this function,
  // so use of non-nullish assertion would be justified for the time being.
  return JSON.parse(new TextDecoder().decode(asset!));
};

export const validateEntries = async <T>(
  category: string,
  context: Context<{ Bindings: Env }>,
  // TODO: make subScheme optional w/o compile error
  subSchema: Validator<T>
): Promise<Entry<T>[]> => {
  const entries = await parseJSONFromKVAsset(
    `static/data/${category}.json`,
    context
  );

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
