import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes?.find((a) => a.id === Number(id));

  if (!anecdote) return <p>Anecdote not found.</p>;
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Votes: {anecdote.votes}</p>
      <a href={anecdote.info} target="_blank" rel="noreferrer">
        More info
      </a>
    </div>
  );
};

export default Anecdote;
