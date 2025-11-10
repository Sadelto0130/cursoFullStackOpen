import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = {
  allAnecdotes: [],
  filtered: [],
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAdded(state, action) {
      const id = action.payload;
      state.allAnecdotes = state.allAnecdotes.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
      state.filtered = state.allAnecdotes;
    },

    appendAnecdote(state, action) {
      state.allAnecdotes.push(action.payload);
      state.filtered.push(action.payload);
    },

    filterAnecdotes(state, action) {
      const textFilter = action.payload.toLowerCase();
      state.filtered = textFilter
        ? state.allAnecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(textFilter)
          )
        : state.allAnecdotes;
    },

    setAnecdotes(state, action) {
      state.allAnecdotes = action.payload;
      state.filtered = action.payload
    },
  },
});

export const {
  voteAdded,
  filterAnecdotes,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote);
    dispatch(voteAdded(votedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
