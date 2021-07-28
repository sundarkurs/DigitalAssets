import React, { Fragment, useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import axios from "../../../store/DbContext/assets-db-context";
import AppContext from "../../../store/AppContext/app-context";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import useShowMessage from "../../../hooks/use-show-message";

let IS_FORM_VALID = true;

const EditAssetType = (props) => {
  const rpStyles = useRightPanelStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();
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
        showSuccess(
          `Asset type "${props.assetType.name}" updated successfully.`
        );
        appCtx.resetAssetTypes();
      })
      .catch((error) => {
        showApiError(error);
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
      <Box mt={2} display="flex" className={rpStyles.content}>
        <TextField
          className={rpStyles.inputs}
          id="name"
          variant="outlined"
          label="Name"
          disabled={true}
          value={props.assetType.name}
        />
        <TextField
          className={rpStyles.inputs}
          id="code"
          variant="outlined"
          label="Code"
          disabled={true}
          value={props.assetType.code}
        />
        <TextField
          className={rpStyles.inputs}
          id="description"
          variant="outlined"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!descriptionValid}
        />
        <TextField
          className={rpStyles.inputs}
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
          className={rpStyles.button}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default EditAssetType;
