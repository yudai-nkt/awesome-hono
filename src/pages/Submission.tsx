const topLevelKeys = [
  {
    name: "id",
    description:
      "Identifier of the entry. Must be unique within the same category.",
    type: "string",
    required: true,
  },
  {
    name: "name",
    description: "Concise name of the entry.",
    type: "string",
    required: true,
  },
  {
    name: "summary",
    description: "Short description of the entry.",
    type: "string",
    required: true,
  },
  {
    name: "url",
    description: "URL of the entry.",
    type: "string",
    required: true,
  },
  {
    name: "properties",
    description:
      "Additional information of the entry. Required by some categories.",
    type: "Record<string, string>",
    required: false,
  },
];

export const Submission = () => (
  <>
    <h2>Submission guide</h2>
    <p>
      First of all, thank you for making an application with Hono and taking the
      time to submit! In this page, we will give you an instruction on how you
      can add your work to our list.
    </p>
    <p>
      Awesome Hono is open-sourced at a GitHub repository and the list is
      managed as JSON files in the{" "}
      <a
        href="https://github.com/yudai-nkt/awesome-hono/tree/main/assets/static"
        target="_blank"
      >
        <code>assets/static</code> directory
      </a>
      . Submission is basically done through the following steps.
    </p>
    <ol>
      <li>Fork the repository.</li>
      <li>Check out a new branch with a comprehensive name.</li>
      <li>Append your project to the category it fits best.</li>
      <li>
        Run <code>npm test</code> to make sure the submission is well-formed.
      </li>
      <li>Commit the change and create a pull request.</li>
    </ol>
    <p>
      In the next section, we will describe what information about your project
      needs to be added in step 3.
    </p>
    <h3>Required information</h3>
    <p>
      Each entry is represented as a JSON object containing the following keys:
    </p>
    <table>
      <thead>
        <tr>
          <th scope="col">Key name</th>
          <th scope="col">Description</th>
          <th scope="col">Required</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        {topLevelKeys.map(({ name, description, type, required }) => (
          <tr>
            <th scope="row">
              <code>{name}</code>
            </th>
            <td>{description}</td>
            <td>{required ? "Yes" : "No"}</td>
            <td>
              <code>{type}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>
      The <code>properties</code> key is optional, meaning that some categories
      require it to be present while others do not. Categories that require the{" "}
      <code>properties</code> key and its contents are explained below.
    </p>
    <h3>Applications</h3>
    Applications category's <code>properties</code> key consists of the
    following JSON object. All keys are required.
    <table>
      <thead>
        <tr>
          <th scope="col">Key name</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>isHobby</code>
          </th>
          <td>
            <code>true</code> if the entry is a small-scale hobby app,{" "}
            <code>false</code> otherwise.
          </td>
          <td>
            <code>boolean</code>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);
