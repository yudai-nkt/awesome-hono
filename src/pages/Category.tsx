import { type FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { $boolean, $object, $void } from "lizod";

import { Entries } from "../components/Entries";
import { categories, validateEntries } from "../utils";

export const Category: FC<{ category: (typeof categories)[number] }> = async ({
  category,
}) => {
  const entries = await validateEntries(
    category.id,
    useRequestContext(),
    $void
  );
  return (
    <>
      <h2>{category.name}</h2>
      <Entries entries={entries} />
    </>
  );
};

export const Applications = async () => {
  const entries = await validateEntries(
    "applications",
    useRequestContext(),
    $object({ isHobby: $boolean })
  );
  return (
    <>
      <h2>Applications</h2>
      <h3>Production-grade projects</h3>
      <Entries
        entries={entries.filter(({ properties }) => !properties.isHobby)}
      />
      <h3>Hobby projects</h3>
      <Entries
        entries={entries.filter(({ properties }) => properties.isHobby)}
      />
    </>
  );
};
