import React, { Fragment, useContext, useEffect, useState } from "react";
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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  inputs: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

let IS_FORM_VALID = true;

const EditAssetType = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const appCtx = useContext(AppContext);

  const [description, setDescription] = useState(props.assetType.description);
  const [imageUrl, setImageUrl] = useState(props.assetType.imageUrl);

  const [descriptionValid, setDescriptionValid] = useState(true);
  const [imageUrlValid, setImageUrlValid] = useState(true);

  useEffect(() => {
    setDescription(props.assetType.description);
    setImageUrl(props.assetType.imageUrl);
  }, [props.assetType.description, props.assetType.imageUrl]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormVallid()) {
      return;
    }

    const editAssetType = {
      id: props.assetType.id,
      name: props.assetType.name,
      code: props.assetType.code,
      description: description,
      imageUrl: imageUrl,
    };

    axios
      .put(`/AssetType/${props.assetType.id}`, editAssetType)
      .then((response) => {
        const message = `Asset type "${props.assetType.name}" updated successfully.`;
        enqueueSnackbar(message, {
          variant: "success",
        });
        appCtx.resetAssetTypes();
      })
      .catch((error) => {
        const message = "Error occurred while updating the asset type.";
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  const vlaidateForm = () => {
    IS_FORM_VALID = true;

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
        <Typography variant="h6">Edit asset type</Typography>
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
          disabled={true}
          value={props.assetType.name}
        />
        <TextField
          className={classes.inputs}
          id="code"
          variant="outlined"
          label="Code"
          disabled={true}
          value={props.assetType.code}
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
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default EditAssetType;
