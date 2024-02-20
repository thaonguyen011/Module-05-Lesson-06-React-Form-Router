import "./App.css";
import React, { useState } from "react";
import { Formik } from "formik";

export default function App() {
  const [form, setForm] = useState({});

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/,
  };

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleValidate() {
    const errors = {};
    if (!form.name) {
      errors.name = "Required";
    }

    if (!form.email) {
      errors.email = "Required";
    } else if (!REGEX.email.test(form.email)) {
      errors.email = "Invalid email address";
    }

    if (!form.phone) {
      errors.phone = "Required";
    }

    //  if (!form.message) {
    //    errors.message = "Required";
    //  }
    return errors;
  }

  function handleSubmit() {
    alert("Add new contact successfully");
  }
  return (
    <div>
      <h1>Contact Form</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`custom-input ${errors.name ? "custom-input" : ""}`}
            >
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.name}</p>
            </div>
            <div
              className={`custom-input ${errors.email ? "custom-input" : ""}`}
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
            </div>
            <div
              className={`custom-input ${errors.phone ? "custom-input" : ""}`}
            >
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.phone}</p>
            </div>
            <div>
              <label>Message</label>
              <input
                type="text"
                name="message"
                value={form.message || ""}
                onChange={handleChange}
              ></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}


