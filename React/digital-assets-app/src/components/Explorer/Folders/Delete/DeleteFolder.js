import React, { useContext, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../../../store/DbContext/assets-db-context";
import { Typography } from "@material-ui/core";
import useShowMessage from "../../../../hooks/use-show-message";

const DeleteFolder = (props) => {
  const [open, setOpen] = React.useState(true);
  const [nameMismatch, setNameMismatch] = useState(false);
  const nameRef = useRef(null);
  const { showSuccess, showError, showApiError } = useShowMessage();

  const onDeleteConfirmHandler = () => {
    if (props.folder?.name === nameRef.current.value) {
      axios
        .delete(`/Folder/${props.folder.id}`)
        .then((response) => {
          showSuccess(`Folder "${props.folder.name}" deleted successfully.`);
          props.onDeleteEnd();
          setOpen(false);
        })
        .catch((error) => {
          showApiError(error);
        });
    } else {
      setNameMismatch(true);
    }
  };

  const onCloseHandler = () => {
    props.onDeleteEnd();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete folder</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will delete the <b>{props.folder.name}</b> folder permanently.
          <p>
            Please type <b>{props.folder.name}</b> to confirm.
          </p>
        </DialogContentText>
        <TextField
          inputRef={nameRef}
          autoFocus
          margin="dense"
          id="name"
          label="Folder name"
          type="text"
          fullWidth
        />
        {nameMismatch && (
          <Typography color="secondary" variant="body2">
            Folder name doesn't match.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} color="default">
          Cancel
        </Button>
        <Button onClick={onDeleteConfirmHandler} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFolder;
