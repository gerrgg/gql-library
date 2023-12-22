import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

const allAuthors = gql`
  query {
    allAuthors {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const authors = useQuery(allAuthors);

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/books">books</Link>
        <Link to="/">new book</Link>
      </div>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Authors authors={authors} />} />
      </Routes>
    </Router>
  );
};

export default App;
