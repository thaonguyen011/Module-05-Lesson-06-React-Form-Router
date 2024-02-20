import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  let navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    if (form.username === "admin@gmail.com" && form.password === "letmein") {
      navigate("/home", {state: {account: form}})
    //   navigate(`/home/${form.username}`);
    } else {
      alert("login fail");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label id="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username || ""}
          onChange={handleChange}
        />
        <label id="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
