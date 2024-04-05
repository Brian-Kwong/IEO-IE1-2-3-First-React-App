import React, { useState } from "react";

function Form(props) {
    /* Person state object*/
  const [person, setPerson] = useState({
    name: "",
    job: "",
  });

  /* Handles form changes  Sets the states */
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job") setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }

  /* Submits forms and clears feilds */
  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  /* Returns the form obj */
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
export default Form;
