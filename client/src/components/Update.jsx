import React, { useState } from "react";
import axios from "axios";

export default function Update(props) {
  const [formData, setFormData] = useState();
  const [updatedUser, setUpdatedUser] = useState(false);
  function handleChange(e) {
    setFormData({
      ...formData,
      username: props.userInfo.username,
      [e.target.id]: e.target.value,
    });
  }
  return (
    <form
      id="registration"
      onSubmit={(e) => {
        e.preventDefault();
        axios({
          url: "/users/update",
          method: "PUT",
          data: formData,
        })
          .then((response) => {
            console.log(response);
            if (response.data.update) setUpdatedUser(true);
          })
          .catch((err) => console.log(err));
      }}
    >
      <h2>
        <span className="icon">🐛</span> Update
      </h2>

      <label htmlFor="username">User Name:</label>
      <input
        type="text"
        name="username"
        id="username"
        defaultValue={props.userInfo ? props.userInfo.username : ""}
        onChange={handleChange}
      />

      <label htmlFor="username">Email:</label>
      <input
        type="text"
        name="email"
        id="email"
        defaultValue={props.userInfo ? props.userInfo.email : ""}
        onChange={handleChange}
      />

      <label htmlFor="username">Password:</label>
      <input
        type="text"
        name="password"
        id="password"
        defaultValue={props.userInfo ? props.userInfo.password : ""}
        onChange={handleChange}
      />
      <button>Update</button>

      <p className="success">{updatedUser ? "User info updated." : ""}</p>
    </form>
  );
}
