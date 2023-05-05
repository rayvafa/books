import { createContext, useState, useCallback } from 'react';
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle
    });

    setBooks(books.map(book => {
      if(book.id === id){
        return { ...book, ...response.data};
      }

      return book;
    }))
  }

  const deleteBookById = async (id) => {
    axios.delete(`http://localhost:3001/books/${id}`);
    setBooks(books.filter(book => {
      return book.id !== id;
    }));
  };
  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books',{
      title
    });

    setBooks([
      ...books,
      response.data
    ]);
  };

  const valueToShare = {
    books,
    createBook,
    deleteBookById,
    editBookById,
    fetchBooks
  };
  return (
    <BooksContext.Provider value={ valueToShare }>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
