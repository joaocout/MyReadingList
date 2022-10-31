import { configureStore } from "@reduxjs/toolkit";

import bookshelfReducer from "./slices/bookshelfSlice";

const store = configureStore({
  reducer: {
    books: bookshelfReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectBooks = (state: RootState) => state.books.books;

export default store;
