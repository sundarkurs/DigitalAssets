import React, { Fragment, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import CloseIcon from "@material-ui/icons/Close";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import axios from "../../../store/DbContext/assets-db-context";
import useShowMessage from "../../../hooks/use-show-message";
import AppImageFileList from "../../UI/AppImageFileList";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AddFile = (props) => {
  const classes = useStyles();
  const explorerCtx = useContext(ExplorerContext);
  const rpStyles = useRightPanelStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { showSuccess, showError, showApiError } = useShowMessage();

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("file", selectedFiles[i]);
      uploadFile(formData, selectedFiles[i].name);
    }
  };

  const uploadFile = (formData, name) => {
    console.log(formData);
    axios
      .post(`/${props.assetTypeCode}/${props.asset.id}/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        showSuccess(`File ${name} uploaded successfully.`);
      })
      .catch((error) => {
        showApiError(error);
      });
  };

  let filesToMap = [];
  for (let i = 0; i < selectedFiles.length; i++) {
    filesToMap.push(selectedFiles[i]);
  }

  return (
    <>
      {/* <Box display="flex" className={rpStyles.toolbar}>
        <Typography variant="h6">Upload files</Typography>
        <CloseIcon
          className={rpStyles.closeIcon}
          onClick={explorerCtx.closeDrawer}
        />
      </Box>
      <Divider className={rpStyles.divider}></Divider> */}
      <Box mt={2} display="flex" className={rpStyles.content}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={selectFile}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose files
          </Button>
        </label>

        <br />

        <AppImageFileList files={filesToMap}></AppImageFileList>

        <br />

        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </Button>
      </Box>
    </>
  );
};

export default AddFile;
