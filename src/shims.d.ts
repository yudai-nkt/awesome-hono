// TODO: remove this declaration when https://github.com/honojs/hono/pull/1139 gets published.
// this is a workaround until the PR above become available in stable releases.
import { type HtmlEscapedString } from "hono/utils/html";

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      children: HtmlEscapedString;
    }
  }
}
