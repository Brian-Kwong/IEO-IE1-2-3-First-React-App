// src/MyApp.jsx

import React, { useState } from "react";
import Table from "./Table";
import Form from "./form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  /* Removes char */
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  /* Adds new char */
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  /* Returns the table and form  */  
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
