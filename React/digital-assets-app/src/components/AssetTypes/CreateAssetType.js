import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const CreateAssetType = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <Box display="flex" flexDirection="row-reverse" component="div">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={props.onClosePanel}
          >
            Save
          </Button>
        </Box>
        <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue="Hello World"
        />
        <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue="Hello World"
        />
      </form>
    </Fragment>
  );
};

export default CreateAssetType;
