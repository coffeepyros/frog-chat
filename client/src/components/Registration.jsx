import React, { useState } from "react";
import axios from "axios";

export default function Registration() {
  const [formData, setFormData] = useState();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  return (
    <form
      id="registration"
      onSubmit={(e) => {
        e.preventDefault();
        axios({
          url: "/users/add",
          method: "POST",
          data: formData,
        })
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      }}
    >
      <h2>
        <span className="icon">🥚</span> Registration
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
      <button>Register</button>
    </form>
  );
}
