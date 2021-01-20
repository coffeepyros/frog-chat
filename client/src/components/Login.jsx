import axios from "axios";
import React, { useState } from "react";

export default function Login(props) {
  const [formData, setFormData] = useState();
  const [loggedInUser, setLoggedInUser] = useState(false);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  return (
    <form
      id="login"
      onSubmit={(e) => {
        e.preventDefault();
        axios({
          url: "/users/login",
          method: "POST",
          data: formData,
        })
          .then((response) => {
            console.log("RESPONSE DATA:", JSON.stringify(response.data));
            if (response.data.login) {
              setLoggedInUser(true);
              props.setUserInfo({
                ...formData,
                email: response.data.user[0].email,
              });
            }
          })
          .catch((err) => console.log(err));
      }}
    >
      <h2>
        <span className="icon">🌺</span> Login
      </h2>
      <p>Test user: ABC / 123</p>

      <label htmlFor="username">User Name:</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleChange}
      />

      <label htmlFor="username">Password:</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={handleChange}
      />
      <button>Login</button>

      <p className="success">{loggedInUser ? "User logged in" : null}</p>
    </form>
  );
}
