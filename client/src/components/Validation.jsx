import React, { useState } from "react";
import axios from "axios";

export default function Validation() {
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <form
      id="registration"
      onSubmit={(e) => {
        e.preventDefault();
        axios({
          url: "http://localhost:5000/users/validate",
          method: "POST",
          data: formData,
        })
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      }}
    >
      <h2>
        <span className="icon">🥚</span> Validation
      </h2>

      <label htmlFor="username">User Name:</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
      />

      <label htmlFor="username">Email:</label>
      <input type="text" name="email" id="email" onChange={handleChange} />

      <label htmlFor="username">Password:</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={handleChange}
      />
      <button type="submit">Validate #1 (only works with older version)</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          axios({
            url: "http://localhost:5000/users/validate2",
            method: "POST",
            data: formData,
          })
            .then((response) => console.log(response, response.data.errors))
            .catch((err) => console.error(err));
        }}
      >
        Validate #2 (Validator Version 6+)
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          axios({
            url: "http://localhost:5000/users/validate3",
            method: "POST",
            data: formData,
          })
            .then((response) => console.log(response, response.data.errors))
            .catch((err) => console.error(err));
        }}
      >
        Validate #3 (Validator v6+, Custom Function, checks if name is "Frog")
      </button>
    </form>
  );
}
