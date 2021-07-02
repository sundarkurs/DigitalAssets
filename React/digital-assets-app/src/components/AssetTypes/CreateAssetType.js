import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
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
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  inputs: {
    marginTop: "5px",
  },
}));

const CreateAssetType = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box display="flex" className={classes.toolbar}>
        <Typography variant="h6">Create asset type</Typography>
        <CancelIcon
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
        />
        <TextField
          className={classes.inputs}
          id="code"
          variant="outlined"
          label="Code"
        />
        <TextField
          className={classes.inputs}
          id="description"
          variant="outlined"
          label="Description"
        />
        <TextField
          className={classes.inputs}
          id="imageUrl"
          variant="outlined"
          label="Image Url"
        />
      </Box>
    </Fragment>
  );
};

export default CreateAssetType;
