import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { BookshelfItem } from "../../shared/types";

type bookshelfSliceState = {
  books: Array<BookshelfItem>;
};

const initialState: bookshelfSliceState = {
  books: [],
};

const bookshelfSlice = createSlice({
  name: "bookShelf",
  initialState,
  reducers: {
    add: (state: bookshelfSliceState, action: PayloadAction<BookshelfItem>) => {
      // index of the book to move
      const index = state.books.findIndex(({ id }) => id === action.payload.id);

      // we should only a new book, if it isn't already on the bookshelf
      if (index === -1) {
        state.books = [action.payload, ...state.books];
      }
    },
    remove: (state: bookshelfSliceState, action: PayloadAction<string>) => {
      state.books = state.books.filter(({ id }) => id !== action.payload);
    },
    moveUp: (state: bookshelfSliceState, action: PayloadAction<string>) => {
      // index of the book to move
      const index = state.books.findIndex(({ id }) => id === action.payload);
      const newBooks = [...state.books];
      const temp = newBooks[index - 1];
      newBooks[index - 1] = newBooks[index];
      newBooks[index] = temp;

      state.books = newBooks;
    },
    moveDown: (state: bookshelfSliceState, action: PayloadAction<string>) => {
      // index of the book to move
      const index = state.books.findIndex(({ id }) => id === action.payload);
      const newBooks = [...state.books];
      const temp = newBooks[index + 1];
      newBooks[index + 1] = newBooks[index];
      newBooks[index] = temp;

      state.books = newBooks;
    },
  },
});

export const { add, remove, moveUp, moveDown } = bookshelfSlice.actions;

const bookshelfReducer = bookshelfSlice.reducer;

export default bookshelfReducer;
