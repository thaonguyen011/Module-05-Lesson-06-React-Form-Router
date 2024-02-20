import "./App.css";
import { Formik } from "formik";
import { useState } from "react";

function App() {
  let [form, setForm] = useState({});

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9+-]+$/,
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleValidate = () => {
    const errors = {};

    if (!form.to) {
      errors.to = "Required";
    } else if (!REGEX.email.test(form.to)) {
      errors.to = "Invalid email";
    }
    if (!form.title) {
      errors.title = "Required";
    }
    if (!form.message) {
      errors.message = "Required";
    }

    return errors;
  };

  const handleSubmit = () => {
    alert("Sent successfully!!!");
  };
  return (
    <div>
      <h1>Mail form</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`custom-input ${
                errors.to ? "custom-input-error" : ""
              }`}
            >
              <label>To</label>
              <input
                type="email"
                name="to"
                value={form.to || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.to}</p>
            </div>
            <div
              className={`custom-input ${
                errors.title ? "custom-input-error" : ""
              }`}
            >
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.title}</p>
            </div>
            <div
              className={`custom-input ${
                errors.message ? "custom-input-error" : ""
              }`}
            >
              <label>Message</label>
              <input
                type="text"
                name="message"
                value={form.message || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.message}</p>
            </div>
            <input
              type="file"
              name="file"
              value={form.file || ""}
              onChange={handleChange}
            />
            <br></br>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
