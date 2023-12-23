import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    // console.log(name);
    // edit
    if (name !== "") {
      editAuthor({
        variables: { name, born: parseInt(born) },
      });
    }

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          author
          <select onChange={(e) => setName(e.target.value)}>
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            type={"number"}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">edit author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
