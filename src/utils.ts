import { type Context } from "hono";
import { getContentFromKVAsset } from "hono/utils/cloudflare";
// @ts-expect-error
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

export const parseJSONFromKVAsset = async (
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
