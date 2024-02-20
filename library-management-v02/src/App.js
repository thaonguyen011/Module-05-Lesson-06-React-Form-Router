import "./App.css";
import { useState } from "react";
import { Formik } from "formik";

function App() {
  const data = [
    { id: 1, title: "book1", quantity: 2 },
    { id: 2, title: "book2", quantity: 1 },
    { id: 3, title: "book3", quantity: 3 },
  ];

  const [form, setForm] = useState({});
  const [books, setBooks] = useState(data);
  const [indexSelected, setIndexSelected] = useState(-1);

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
      errors.quantity = "Invalid number";
    }
    return errors;
  };

  const handleSelect = (book, index) => {
    setForm(book);
    setIndexSelected(index);
  };

  const handleDelete = (index) => {
    let newBooks = JSON.parse(JSON.stringify(books));
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const handleSubmit = () => {
    let newBooks = JSON.parse(JSON.stringify(books));
    if (indexSelected > -1) {
      newBooks.splice(indexSelected, 1, form);
    } else {
      let lastBook = newBooks[newBooks.length - 1];
      newBooks.push({
        id: lastBook.id + 1,
        title: form.title,
        quantity: form.quantity,
      });
    }
    setBooks(newBooks);
    setForm({});
    setIndexSelected(-1);
  };

  return (
    <div>
      <h1>Library</h1>
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => handleSelect(book, book.id - 1)}>Edit</button>
                <button onClick={() => handleDelete(book.id - 1)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
