import Book from "../classes/Book";
import React, { createContext, useState } from 'react';

const DataContext = createContext();

const books = [
  new Book(1, "book1", 1),
  new Book(2, "book2", 2),
  new Book(3, "book3", 3),
];

export const DataProvider = ({children}) => {
  const [data, setData] = useState(books);
  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;