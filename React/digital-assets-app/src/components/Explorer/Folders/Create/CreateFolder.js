import React, { Fragment, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import useStyles from "../../RightPanelStyles";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import axios from "../../../../store/DbContext/assets-db-context";
import useShowMessage from "../../../../hooks/use-show-message";

let IS_FORM_VALID = true;

const CreateFolder = (props) => {
  const classes = useStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
debugger;
    if (!isFormVallid()) {
      return;
    }

    const newFolder = {
      name: name,
      parentId: props.parentId,
      assetType: props.assetType,
    };

    axios
      .post("/Folder", newFolder)
      .then((response) => {
        showSuccess(`Folder "${name}" created successfully.`);
        setName("");
      })
      .catch((error) => {
        showApiError(error);
      });
  };

  const vlaidateForm = () => {
    IS_FORM_VALID = true;

    if (name.trim().length === 0) {
      IS_FORM_VALID = false;
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const isFormVallid = () => {
    vlaidateForm();

    return IS_FORM_VALID;
  };

  return (
    <form onSubmit={submitHandler}>
      <Box display="flex" className={classes.toolbar}>
        <Typography variant="h6">Create asset type</Typography>
        <CloseIcon
          className={classes.closeIcon}
          onClick={props.closeDetailsPanel}
        />
      </Box>
      <Divider className={classes.divider}></Divider>
      <Box mt={2} display="flex" className={classes.content}>
        <TextField
          className={classes.inputs}
          id="name"
          variant="outlined"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!nameValid}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={props.openDetailsPanel}
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default CreateFolder;
