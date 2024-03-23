import { ChangeEvent, useState, useEffect } from "react";
import { Avatar, Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import {
  DescriptionRoundedIcon,
  ImageRoundedIcon,
  SubtitlesRoundedIcon,
} from "../icons";
import { BookSchema } from "../schema/bookSchema";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBooks, updateBook } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "./ButtonSpinner";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: {
    _id: string;
    title: string;
    description: string;
    image: string;
  };
}

const BookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  onClose,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addBookLoading, updateBookLoading } = useSelector(
    (state: any) => state.book
  );
  const isLoading = addBookLoading || updateBookLoading;

  const [imagePreview, setImagePreview] = useState<string>(
    initialValues?.image || ""
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      image: "",
    },
    validationSchema: BookSchema,
    onSubmit: async (values) => {
      if (initialValues) {
        const response = await dispatch<any>(
          updateBook({ id: initialValues._id, values })
        );
        if (response.payload.book) {
          onClose();
          resetForm();
          await dispatch<any>(getBooks());
          navigate("/");
        }
      } else {
        const response = await dispatch<any>(addBook(values));
        if (response.payload.book) {
          onClose();
          resetForm();
          await dispatch<any>(getBooks());
          navigate("/");
        }
      }
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      setImagePreview(initialValues.image);
    }
  }, [initialValues, setValues]);

  const { title, description } = values;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setValues({ ...values, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center px-6"
    >
      <div className="w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md">
        <h2 className="text-xl font-semibold mb-8 flex items-center gap-3 justify-center">
          {initialValues ? "Update Book" : "Add Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <Avatar
              src={imagePreview || ""}
              alt="Profile Img"
              sx={{ width: "180px", height: "180px" }}
            />
          </div>
          <div className="mb-4 h-[5rem]">
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.title && touched.title
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                <SubtitlesRoundedIcon />
              </button>
            </div>
            {errors.title && touched.title && (
              <p className="text-red-500 text-sm h-4">{errors.title}</p>
            )}
          </div>
          <div className="mb-4 h-[5rem]">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <div className="relative">
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                <DescriptionRoundedIcon />
              </button>
            </div>
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm h-4">{errors.description}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onBlur={handleBlur}
              onChange={handleImageChange}
              className={`w-full border rounded py-2 px-3 ${
                errors.image && touched.image
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
              <ImageRoundedIcon className="w-5 h-5 mt-2" />
            </span>
            {errors.image && touched.image && (
              <p className="text-red-500 text-sm h-4">{errors.image}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => onClose()}
              size="small"
              type="button"
              variant="contained"
              color="info"
              sx={{ textTransform: "none" }}
            >
              Close
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="info"
              sx={{ textTransform: "none" }}
            >
              {isLoading ? <ButtonSpinner /> : initialValues ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookModal;
