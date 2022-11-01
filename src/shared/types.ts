// item shown in the catalog page
export type SearchItem = {
  id: string;
  title: string;
  authors: string;
  thumb: string;
  link: string;
};

// item added to the bookshelf
export type BookshelfItem = {
  id: string;
  title: string;
  authors: string;
  thumb: string;
  link: string;
  progress: "completed" | "reading" | "new";
};
