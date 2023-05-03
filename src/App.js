import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }

  useEffect(() => {
    fetchBooks();
  }, [])

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

  return (
      <div className="app">
        <h1>Reading List</h1>
        <BookList onEdit={editBookById} books={books} onDelete={deleteBookById}/>
        <BookCreate onCreate={createBook} />
      </div>
  );
}

export default App;
