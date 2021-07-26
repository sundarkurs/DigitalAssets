import React, { Fragment, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import axios from "../../../store/DbContext/assets-db-context";
import useShowMessage from "../../../hooks/use-show-message";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";

let IS_FORM_VALID = true;

const AddFile = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const rpStyles = useRightPanelStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();

  const [name, setName] = useState("");

  const [nameValid, setNameValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormVallid()) {
      return;
    }

    const newAsset = {
      name: name,
      countryCode: country,
      languageCode: language,
      folderId: props.folderId,
      abstract: abstract,
    };

    axios
      .post("/Image", newAsset)
      .then((response) => {
        showSuccess(`Asset "${name}" created successfully.`);
        setName("");
        props.refreshAssets();
      })
      .catch((error) => {
        showApiError(error);
      });
  };

  const vlaidateForm = () => {
    IS_FORM_VALID = true;
  };

  const isFormVallid = () => {
    vlaidateForm();

    return IS_FORM_VALID;
  };

  return (
    <form onSubmit={submitHandler}>
      <Box display="flex" className={rpStyles.toolbar}>
        <Typography variant="h6">Upload file</Typography>
        <CloseIcon
          className={rpStyles.closeIcon}
          onClick={explorerCtx.closeDrawer}
        />
      </Box>
      <Divider className={rpStyles.divider}></Divider>
      <Box mt={2} display="flex" className={rpStyles.content}>
        <TextField
          className={rpStyles.inputs}
          id="txtName"
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
          className={rpStyles.button}
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default AddFile;
