// src/MyApp.jsx

import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  /* Removes char */
  function removeOneCharacter(index) {
    /* Finds the user */
    const findUserId = characters.filter((character, i) => {
      return i === index;
    })[0]["_id"];
    function removeUserDB(id) {
      return fetch(`Http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });
    }
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    removeUserDB(findUserId)
      .then((res) => {
        if (res.status == 204) {
          console.log("Ok");
          setCharacters(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* Adds new char */
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  /* Fetches all users from DB */
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => (res.status == 201 ? res.json() : undefined))
      .then((json) => {
        if (json) setCharacters([...characters, json]);
        else throw new Error("Bad response");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* Calls fetch user at the start of app */
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* Returns the table and form  */
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
