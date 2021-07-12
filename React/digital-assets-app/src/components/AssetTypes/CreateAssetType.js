import React, { Fragment, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import axios from "../../store/DbContext/assets-db-context";
import { useSnackbar } from "notistack";
import AppContext from "../../store/AppContext/app-context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
  closeIcon: {
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "column",
  },
  divider: {
    marginTop: theme.spacing(2.5),
  },
  inputs: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

let IS_FORM_VALID = true;

const CreateAssetType = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const appCtx = useContext(AppContext);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "/images/asset-type-images/product-image.png"
  );

  const [nameValid, setNameValid] = useState(true);
  const [codeValid, setCodeValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [imageUrlValid, setImageUrlValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormVallid()) {
      return;
    }

    const newAssetType = {
      name: name,
      code: code,
      description: description,
      imageUrl: imageUrl,
    };

    console.log(newAssetType);

    axios
      .post("/AssetType", newAssetType)
      .then((response) => {
        enqueueSnackbar(`Asset type "${name}" created successfully.`, {
          variant: "success",
        });

        appCtx.resetAssetTypes();
        setName("");
        setCode("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
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

    if (code.trim().length === 0) {
      IS_FORM_VALID = false;
      setCodeValid(false);
    } else {
      setCodeValid(true);
    }

    if (description.trim().length === 0) {
      IS_FORM_VALID = false;
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }

    if (imageUrl.trim().length === 0) {
      IS_FORM_VALID = false;
      setImageUrlValid(false);
    } else {
      setImageUrlValid(true);
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
        <TextField
          className={classes.inputs}
          id="code"
          variant="outlined"
          label="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={!codeValid}
        />
        <TextField
          className={classes.inputs}
          id="description"
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!descriptionValid}
        />
        <TextField
          className={classes.inputs}
          id="imageUrl"
          variant="outlined"
          label="Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          error={!imageUrlValid}
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

export default CreateAssetType;
