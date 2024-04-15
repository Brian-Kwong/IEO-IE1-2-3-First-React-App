// src/Table.jsx
function TableHeader() {
  /* Creates the table header */
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>UId</th>
        <th>Delete Item</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  /* Creates the body table */
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row.id}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

/* Assembles the table */
function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
export default Table;
