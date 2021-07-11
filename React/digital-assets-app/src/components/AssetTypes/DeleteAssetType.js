import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../store/DbContext/assets-db-context";
import { useSnackbar } from "notistack";

const DeleteAssetType = (props) => {
  const [open, setOpen] = React.useState(true);
  const nameRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const onConfirmHandler = () => {
    if (props.assetType.name === nameRef.current.value) {
      axios
        .delete(`/AssetType/${props.assetType.id}`)
        .then((response) => {
          enqueueSnackbar(
            `Asset type "${props.assetType.name}" deleted successfully.`,
            {
              variant: "success",
            }
          );
          props.onDeleteEnd();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Not valid");
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
      <DialogTitle id="form-dialog-title">Delete asset type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To delete an asset type, please enter the name here to confirm the
          delete.
        </DialogContentText>
        <TextField
          inputRef={nameRef}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} color="default">
          Cancel
        </Button>
        <Button onClick={onConfirmHandler} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAssetType;
