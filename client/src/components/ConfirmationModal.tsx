import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useSelector } from "react-redux";
import ButtonSpinner from "./ButtonSpinner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { deleteBookLoading } = useSelector((state: any) => state.book);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xs"
        open={isOpen}
        onClose={onConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you absolutely sure you wish to proceed with the deletion of
            this book? Please be advised that this action is irreversible and
            will permanently remove the book from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose()}
            size="small"
            type="button"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            size="small"
            type="button"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            {deleteBookLoading ? <ButtonSpinner /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationModal;
