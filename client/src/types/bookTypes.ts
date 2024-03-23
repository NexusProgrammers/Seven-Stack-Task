export interface AddBookResponse {
  message: string;
  book: {
    title: string;
    description: string;
    image: string;
    user: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AddBookFormValues {
  title: string;
  description: string;
  image: string;
}

export interface Book {
  title: string;
  description: string;
  image: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookState {
  book: Book | null;
  books: Book[];
  addBookLoading: boolean | false;
  addBookError: string | null;
  getBooksLoading: boolean | false;
  getBooksError: string | null;
  updateBookLoading: boolean | false;
  updateBookError: string | null;
  deleteBookLoading: boolean | false;
  deleteBookError: string | null;
  getBookLoading: boolean | false;
  getBookError: string | null;
}

export interface updateBookResponse {
  message: string;
  book: Book | null;
}

export interface UpdateBookFormValues {
  title: string;
  description: string;
  image: string;
}
