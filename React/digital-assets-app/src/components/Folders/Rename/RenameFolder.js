import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import axios from "../../../store/DbContext/assets-db-context";
import useShowMessage from "../../../hooks/use-show-message";

let IS_FORM_VALID = true;

const RenameFolder = (props) => {
  const rpStyles = useRightPanelStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();
  const [name, setName] = useState(props.folder?.name);
  const [nameValid, setNameValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormVallid()) {
      return;
    }

    const updateFolder = { id: props.folder.id, name: name };

    axios
      .put(`/Folder/${props.folder.id}`, updateFolder)
      .then((response) => {
        showSuccess(`Folder "${name}" renamed successfully.`);
        props.refreshFolders();
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
      <Box mt={2} display="flex" className={rpStyles.content}>
        <TextField
          className={rpStyles.inputs}
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
          className={rpStyles.button}
          onClick={props.openDetailsPanel}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default RenameFolder;
