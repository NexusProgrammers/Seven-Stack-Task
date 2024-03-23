import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../services/bookService";
import { useParams } from "react-router-dom";
import CardSkeletonLoader from "../components/CardSkeletonLoader";

const ViewBook: React.FC = () => {
  const dispatch = useDispatch();
  const { book, getBookLoading } = useSelector((state: any) => state.book);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch<any>(getBook(id));
    }
  }, [dispatch, id]);

  if (getBookLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CardSkeletonLoader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen py-96">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[60rem] h-auto md:flex-row">
        <div className="relative w-full md:w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl md:rounded-r-md md:rounded-l-xl md:shrink-0">
          <img
            src={book?.image}
            alt="card-image"
            className="object-cover w-full h-96 md:h-full"
          />
        </div>
        <div className="p-6">
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {book?.title}
          </h4>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {book?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
