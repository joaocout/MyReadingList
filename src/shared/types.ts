export interface Book {
  id: string;
  title: string;
  authors: string;
  coverLink: string;
  googleLink: string;
  progress: "completed" | "reading" | "new";
}
