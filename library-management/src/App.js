import "./App.css";
import { useState } from "react";
import Form from "./components/form";
import List from "./components/list";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
 
  const handleEdit = (book) => {
    setSelectedBook(book);
  };
  return (
    <div className="App">
      <h1>Library</h1>
      <Form />
      {selectedBook && <Form data={selectedBook} />}
      <List onEdit={handleEdit} />

      {/* {selectedBook ? <Form data={selectedBook} /> : <Form data={null}/>}
      <List onEdit={handleEdit} /> */}
    </div>
  );
}

export default App;
