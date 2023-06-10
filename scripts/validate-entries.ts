import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { $array, $boolean, $object, $string, type Validator } from "lizod";

const directory = join(
  dirname(fileURLToPath(import.meta.url)),
  "../assets/static/data"
);
const categories = readdirSync(directory);
const validateEntries = <T>(entries: unknown, subSchema?: Validator<T>) => {
  return $array(
    $object({
      ...{
        id: $string,
        name: $string,
        summary: $string,
        url: $string,
      },
      ...(subSchema ? { properties: subSchema } : {}),
    })
  )(entries);
};

let isAllValid = true;

for (const category of categories) {
  const { default: entries } = await import(join(directory, category), {
    assert: { type: "json" },
  });

  switch (category) {
    case "applications.json":
      if (!validateEntries(entries, $object({ isHobby: $boolean }))) {
        console.error(`${category} is malformed.`);
        if (isAllValid) {
          isAllValid = false;
        }
      }
      break;

    default:
      if (!validateEntries(entries)) {
        console.error(`${category} is malformed.`);
        if (isAllValid) {
          isAllValid = false;
        }
      }
      break;
  }
}

if (!isAllValid) {
  process.exit(1);
}
