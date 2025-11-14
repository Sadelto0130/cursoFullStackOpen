import { useEffect, useState } from "react";
import { useApolloClient, useQuery, useMutation, useSubscription } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries/queries";
import Login from "./components/Login";
import Recommended from "./components/Recommended";
import Notification from "./queries/Notification";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null )
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()
  const dataBooks = useQuery(ALL_BOOKS) 
  const dataAuthors = useQuery(ALL_AUTHORS)

  if(dataAuthors.loading) {
    return <div>Loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Notification />  
      <Authors show={page === "authors"} authorsData={dataAuthors.data}/>
      <Books show={page === "books"} bookData={dataBooks.data}/>
      <NewBook show={page === "add"} />
      {!token && <Login show={page === "login"} setToken={setToken} setError={setError}/>}
      <Recommended show={page === "recommended"} bookData={dataBooks.data}/>
    </div>
  );
};

export default App;
