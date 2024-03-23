import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../services/bookService";
import BookCard from "../components/BookCard";
import { Book } from "../types/bookTypes";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state: any) => state.book);

  useEffect(() => {
    dispatch<any>(getBooks());
  }, []);

  return (
    <div>
      <div></div>
      <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-14">
        {books.map((item: Book) => {
          return <BookCard item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
