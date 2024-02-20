import "./App.css";
import React, { useState } from "react";

function App() {
  const MESSAGE_ERROR = {
    username: "Username error",
    email: "Email error",
    password: "Password error",
    confirmPassword: "Password must be the same",
  };

  const REGEX = {
    username: /^[a-zA-Z0-9]{2,}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-Z0-9!@#%*+=._-]{6,}$/,
  };

  const [form, setForm] = useState({});

  // function handleChange(event) {
  //   let error = "";

  //   if (event.target.name === "password") {
  //     if (form.confirmPassword && form.confirmPassword.value) {
  //       error =
  //         event.target.value === form.confirmPassword.value
  //           ? ""
  //           : MESSAGE_ERROR[event.target.name];
  //     } else {
  //       error = REGEX[event.target.name].test(event.target.value)
  //         ? ""
  //         : MESSAGE_ERROR[event.target.name];
  //     }
  //   } else if (event.target.name === "confirmPassword") {
  //     error =
  //       event.target.value === form.password.value
  //         ? ""
  //         : MESSAGE_ERROR[event.target.name];
  //     console.log("pass: " + form.password.value);
  //     console.log("confirm pass: " + event.target.value);
  //   } else {
  //     error = REGEX[event.target.name].test(event.target.value)
  //       ? ""
  //       : MESSAGE_ERROR[event.target.name];
  //   }

  //   setForm({
  //     ...form,
  //     [event.target.name]: { value: event.target.value, error: error },
  //   });
  // }
function handleChange(event) {
  const { name, value } = event.target;

  setForm((prevForm) => {
    let error = "";

    if (name === "password") {
      error =
        prevForm.confirmPassword &&
        prevForm.confirmPassword.value !== "" &&
        value !== prevForm.confirmPassword.value
          ? MESSAGE_ERROR["confirmPassword"]
          : REGEX[name].test(value)
          ? ""
          : MESSAGE_ERROR[name];
    } else if (name === "confirmPassword") {
      error =
        prevForm.password && value !== prevForm.password.value
          ? MESSAGE_ERROR[name]
          : "";
    } else {
      error = REGEX[name].test(value) ? "" : MESSAGE_ERROR[name];
    }

    return {
      ...prevForm,
      [name]: { value: value, error: error },
    };
  });
}



  function handleSubmit() {
    const isFilled =
      form.username &&
      form.username.value &&
      form.email &&
      form.email.value &&
      form.password &&
      form.password.value &&
      form.confirmPassword &&
      form.confirmPassword.value;

    const isError =
      isFilled &&
      (form.username.error ||
        form.email.error ||
        form.password.error ||
        form.confirmPassword.error);

    alert(
      isFilled && !isError
        ? "Sign up successfully!!!"
        : "Please fill out all the fields!!!"
    );
  }
  return (
    <div className="App">
      <h1>Sign up</h1>
      <form>
        <div
          className={`custom-input ${
            form.username && form.username.error && "custom-input-error"
          }`}
        >
          <label>Username</label>
          <input
            name="username"
            type="text"
            value={form.username && form.username.value}
            onChange={handleChange}
          />
          {form.username && form.username.error && (
            <p className="error">{form.username.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${
            form.email && form.email.error && "custom-input-error"
          }`}
        >
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={form.email && form.email.value}
            onChange={handleChange}
          />
          {form.email && form.email.error && (
            <p className="error">{form.email.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${
            form.password && form.password.error && "custom-input-error"
          }`}
        >
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={form.password && form.password.value}
            onChange={handleChange}
          />
          {form.password && form.password.error && (
            <p className="error">{form.password.error}</p>
          )}
        </div>
        <div
          className={`custom-input ${
            form.confirmPassword &&
            form.confirmPassword.error &&
            "custom-input-error"
          }`}
        >
          <label>Confirm password</label>
          <input
            type="text"
            name="confirmPassword"
            value={form.confirmPassword && form.confirmPassword.value}
            onChange={handleChange}
          />
          {form.confirmPassword && form.confirmPassword.error && (
            <p className="error">{form.confirmPassword.error}</p>
          )}
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
