import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectBooks } from "../redux/store";
import { setBooks } from "../redux/slices/bookshelfSlice";
import { getBooksFromStorage, setBooksInStorage } from "../storage";

export function useStorageBooks() {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // when the global state changes, we try to sync the storage state
  useEffect(() => {
    setError(false);

    books.length &&
      (async () => {
        const { error: storageError } = await setBooksInStorage(books);
        setError(storageError);
      })();
  }, [books]);

  // when this page first loads, we try to copy the data from localstorage to the global state
  useEffect(() => {
    setError(false);

    (async () => {
      const { data, error: storageError } = await getBooksFromStorage();
      !error && dispatch(setBooks(data));
      setError(storageError);
      setLoading(false);
    })();
  }, []);

  return { books, loading, error };
}
