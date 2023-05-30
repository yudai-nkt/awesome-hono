import { Entries, type Entry } from "../components/Entries";

export const Category = ({
  name,
  entries,
}: {
  name: string;
  entries: Entry[];
}) => (
  <>
    <h2>{name}</h2>
    <Entries entries={entries} />
  </>
);

export const Applications = ({
  entries,
}: {
  entries: (Entry & { isHobby: boolean })[];
}) => (
  <>
    <h2>Applications</h2>
    <h3>Production-grade projects</h3>
    <Entries entries={entries.filter(({ isHobby }) => !isHobby)} />
    <h3>Hobby projects</h3>
    <Entries entries={entries.filter(({ isHobby }) => isHobby)} />
  </>
);
