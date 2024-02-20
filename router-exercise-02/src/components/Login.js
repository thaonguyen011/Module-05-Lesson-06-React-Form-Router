import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  let navigate = useNavigate();

  const handleSubmit = () => {
    if (form.username === "admin@gmail.com" && form.password === "letmein") {
      navigate("/employees/list");
    } else {
      alert("Login fail");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
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
