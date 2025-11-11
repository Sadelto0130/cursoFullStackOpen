import React from "react";
import Anecdote from "./Anecdote";
import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote, i) => (
          <li key={anecdote.id || i}>
            <Link to={`/anecdote/${anecdote?.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AnecdoteList;
