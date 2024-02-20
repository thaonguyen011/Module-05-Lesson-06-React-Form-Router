import React, { useContext } from "react";
import DataContext from "../data/DataContext";


export default function List({ onEdit }) {
  const { data, setData } = useContext(DataContext);

  let books = [...data];

  function edit(id) {
    let selectedBook;
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        selectedBook = books[i];
        break;
      }
    }
    onEdit(selectedBook); // Invoke the callback with the selected book
  }

  function deleteBook(id) {
    const updatedBooks = books.filter((book) => (book.id !== id));
    setData(updatedBooks);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => edit(book.id)}>Edit</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
