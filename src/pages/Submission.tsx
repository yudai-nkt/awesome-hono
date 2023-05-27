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
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <code>id</code>
          </th>
          <td>
            Identifier of the entry. Must be unique within the same category.
          </td>
        </tr>
        <tr>
          <th scope="row">
            <code>name</code>
          </th>
          <td>Concise name of the entry.</td>
        </tr>
        <tr>
          <th scope="row">
            <code>summary</code>
          </th>
          <td>Short description of the entry.</td>
        </tr>
        <tr>
          <th scope="row">
            <code>url</code>
          </th>
          <td>URL of the entry.</td>
        </tr>
      </tbody>
    </table>
    <p>
      All of these keys are required and some categories require additional keys
      (to be documented later).
    </p>
  </>
);
