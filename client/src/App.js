import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const style = { padding: 5 };

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <div>
        <Link style={style} to="/">
          Home
        </Link>
        <Link style={style} to="/books">
          Books
        </Link>
        <Link style={style} to="/books/create">
          New Book
        </Link>
      </div>
      <Routes>
        <Route path="/books" element={<Books books={books.data.allBooks} />} />
        <Route
          path="/"
          element={<Authors authors={authors.data.allAuthors} />}
        />
        <Route path="/books/create" element={<NewBook />} />
      </Routes>
    </Router>
  );
};

export default App;
