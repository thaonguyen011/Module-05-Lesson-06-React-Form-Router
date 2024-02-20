import { useContext, useState } from "react";
import { Formik } from "formik";
import DataContext from "../data/DataContext";
import Book from "../classes/Book";

export default function Form(props) {
  const [form, setForm] = useState(props.data ? props.data : {});

  const { data, setData } = useContext(DataContext);
  let books = [...data];

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleValidate = () => {
    const errors = {};
    if (!form.title) {
      errors.title = "Required";
    }

    if (!form.quantity) {
      errors.quantity = "Required";
    } else if (form.quantity <= 0) {
      errors.quantity = "Enter a positive number";
    }

    return errors;
  };

  const handleSubmit = () => {
    let isExisted = false;
    let lastBookId = books[books.length - 1].id;
    for (let i = 0; i < books.length; i++) {
      if (form.title === books[i].title) {
        books[i].quantity =
          parseInt(books[i].quantity) + parseInt(form.quantity);
        setData(books);
        console.log(data);
        isExisted = true;
        break;
      }
    }

    if (!isExisted) {
      books.push(new Book(lastBookId + 1, form.title, parseInt(form.quantity)));
      setData(books);
      console.log(data);
    }
  };

  return (
    <div>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
                errors.quantity ? "custom-input-error" : ""
              }`}
            >
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.quantity}</p>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
