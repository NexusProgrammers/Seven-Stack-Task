import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../services/bookService";
import BookCard from "../components/BookCard";
import { Book } from "../types/bookTypes";
import CardSkeletonLoader from "../components/CardSkeletonLoader";
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { books, getBooksLoading } = useSelector((state: any) => state.book);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch<any>(getBooks());
  }, []);

  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (getBooksLoading) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-14">
        {[...Array(8)].map((_, index) => (
          <CardSkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="py-6">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-14">
        {filteredBooks.map((item: Book) => (
          <BookCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
