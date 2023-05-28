export type Entry = { id: string; name: string; summary: string; url: string };

export const Entries = ({ entries }: { entries: Entry[] }) =>
  entries.length === 0 ? (
    <p>Submission welcome!</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Summary</th>
          <th scope="col">URL</th>
        </tr>
      </thead>
      <tbody>
        {entries
          .sort((a, b) => a.id.localeCompare(b.id))
          .map(({ name, summary, url }) => (
            <tr>
              <th scope="row">{name}</th>
              <td>{summary}</td>
              <td>
                <a href={url} target="_blank">
                  {url}
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
