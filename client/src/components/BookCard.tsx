import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Book } from "../types/bookTypes";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteRoundedIcon, EditRoundedIcon } from "../icons";
import BookModal from "./BookModal";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBook, getBooks } from "../services/bookService";

interface BookCardProps {
  item: Book;
}

const BookCard: React.FC<BookCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [showAddBookModal, setShowAddBookModal] =
    React.useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState<boolean>(false);

  const formattedTimestamp = moment(item.createdAt).format("MMMM DD, YYYY");

  const handleDeleteBook = async () => {
    await dispatch<any>(deleteBook(item._id));
    await dispatch<any>(getBooks());
    setShowConfirmationModal(false);
  };

  return (
    <>
      <Card sx={{ width: 350, height: 500 }}>
        <CardHeader
          avatar={
            <Link to={"/profile"} title="profile">
              <Avatar
                src={user?.image}
                sx={{ bgcolor: red[500] }}
                arpia-label="recipe"
              ></Avatar>
            </Link>
          }
          action={
            <>
              <IconButton onClick={() => setShowAddBookModal(true)}>
                <EditRoundedIcon color="info" titleAccess="Update" />
              </IconButton>
              <IconButton onClick={() => setShowConfirmationModal(true)}>
                <DeleteRoundedIcon color="warning" titleAccess="delete" />
              </IconButton>
            </>
          }
          title={user?.name}
          subheader={formattedTimestamp}
        />
        <CardMedia
          component="img"
          image={item.image}
          sx={{ width: "100%", height: "300px" }}
          alt="ImageCard"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.description.length > 220
              ? `${item?.description.substring(0, 220)}...`
              : item.description}
          </Typography>
        </CardContent>
      </Card>
      <BookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        initialValues={item}
      />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleDeleteBook}
      />
    </>
  );
};

export default BookCard;
