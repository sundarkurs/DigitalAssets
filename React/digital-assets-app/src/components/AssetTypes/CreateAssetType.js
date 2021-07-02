import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
  closeIcon: {
    curson: "pointer",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "column",
  },
}));

const CreateAssetType = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box display="flex" className={classes.toolbar}>
          <Typography variant="h6">Create</Typography>
          <CancelIcon
            className={classes.closeIcon}
            onClick={props.onClosePanel}
          />
        </Box>

        <Box display="flex" className={classes.content}>
          <TextField id="name" label="Name" />
          <TextField id="code" error label="Code" />
          <TextField id="description" error label="Description" />
        </Box>
    </Fragment>
  );
};

export default CreateAssetType;
