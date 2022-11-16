import axios from "axios";

import type { Book } from "../shared/types";

// json from the api
type SearchResponseItem = {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
    imageLinks: {
      thumbnail: string;
    };
    canonicalVolumeLink: string;
  };
};

// return type of the 'getBooks' function
type GetBooksResult = {
  books: Book[];
  totalPages: number;
  error: boolean;
};

async function getBooks(query: string, page: number): Promise<GetBooksResult> {
  console.log("getting books");
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query.replace(
        " ",
        "+"
      )}&projection=lite&maxResults=6&startIndex=${page * 6}`
    );
    const result: Array<Book> = data.items.map(
      (book: SearchResponseItem) =>
        ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors?.join("\n"),
          coverLink: book.volumeInfo.imageLinks?.thumbnail,
          googleLink: book.volumeInfo.canonicalVolumeLink,
          progress: "new",
        } as Book)
    );
    return {
      books: result,
      totalPages: Math.ceil(data.totalItems / 6),
      error: false,
    };
  } catch (error) {
    return { books: [], totalPages: 0, error: true };
  }
}

export { getBooks };
