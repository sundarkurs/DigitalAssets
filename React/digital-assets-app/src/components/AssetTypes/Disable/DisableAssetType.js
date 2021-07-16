import React, { useContext, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../../store/DbContext/assets-db-context";
import AppContext from "../../../store/AppContext/app-context";
import { Typography } from "@material-ui/core";
import useShowMessage from "../../../hooks/use-show-message";

const DisableAssetType = (props) => {
  const [open, setOpen] = React.useState(true);
  const [nameMismatch, setNameMismatch] = useState(false);
  const nameRef = useRef(null);
  const { showSuccess, showError, showApiError } = useShowMessage();
  const appCtx = useContext(AppContext);

  const onDisableConfirmHandler = () => {
    if (props.assetType.name === nameRef.current.value) {
      axios
        .put(`/AssetType/${props.assetType.id}/disable`)
        .then((response) => {
          showSuccess(
            `Asset type "${props.assetType.name}" disabled successfully.`
          );
          appCtx.resetAssetTypes();
          props.onDisableEnd();
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
    props.onDisableEnd();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Disable asset type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will disable the{" "}
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
        <Button onClick={onDisableConfirmHandler} color="secondary">
          Disable
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisableAssetType;
