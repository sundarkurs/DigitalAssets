import React, { useContext, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../../store/DbContext/assets-db-context";
import { useSnackbar } from "notistack";
import AppContext from "../../../store/AppContext/app-context";
import { Typography } from "@material-ui/core";

const DeleteAssetType = (props) => {
  const [open, setOpen] = React.useState(true);
  const [nameMismatch, setNameMismatch] = useState(false);
  const nameRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const appCtx = useContext(AppContext);

  const onDeleteConfirmHandler = () => {
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
          appCtx.resetAssetTypes();
          props.onDeleteEnd();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
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
      <DialogTitle id="form-dialog-title">Delete asset type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone. This will permanently delete the{" "}
          <b>{props.assetType.name}</b> asset type.
          <p>
            Please type <b>{props.assetType.name}</b> to confirm.
          </p>
        </DialogContentText>
        <TextField
          inputRef={nameRef}
          autoFocus
          margin="dense"
          id="name"
          label="Asset type name"
          type="text"
          fullWidth
        />
        {nameMismatch && (
          <Typography color="secondary" variant="body2">
            Asset type name doesn't match.
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

export default DeleteAssetType;
