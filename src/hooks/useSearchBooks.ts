import { useCallback, useEffect, useState } from "react";

import { getBooks } from "../api";

import { Book } from "../shared/types";

// Search book custom hook
export function useSearchBooks(query: string, page: number) {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");

  useEffect(() => {
    searchBooks();
  }, [page]);

  const searchBooks = useCallback(() => {
    setError(false);
    query.length &&
      (async () => {
        setLoading(true);
        const searchResponse = await getBooks(query, page);

        setTotalPages(searchResponse.totalPages);
        setError(searchResponse.error);
        setBooks(searchResponse.books);
        setLoading(false);
        setLastSearchedQuery(query);
      })();
  }, [query, page]);

  return { lastSearchedQuery, loading, books, totalPages, error, searchBooks };
}
