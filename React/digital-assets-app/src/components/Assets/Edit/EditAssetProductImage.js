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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

let IS_FORM_VALID = true;

const EditAssetProductImage = (props) => {
  const classes = useStyles();
  const explorerCtx = useContext(ExplorerContext);
  const rpStyles = useRightPanelStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();

  const { asset } = props;

  const [name, setName] = useState(asset.name);
  const [country, setCountry] = useState(asset.countryCode);
  const [language, setLanguage] = useState(asset.languageCode);
  const [sku, setSku] = useState(asset.sku);
  const [product, setProduct] = useState(asset.product);

  const [nameValid, setNameValid] = useState(true);
  const [countryValid, setCountryValid] = useState(true);
  const [languageValid, setLanguageValid] = useState(true);
  const [skuValid, setSkuValid] = useState(true);
  const [productValid, setProductValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isFormVallid()) {
      return;
    }

    const updateAsset = {
      id: asset.id,
      name: name,
      countryCode: country,
      languageCode: language,
      folderId: props.folderId,
      sku: sku,
      product: product,
    };

    axios
      .put(`/ProductImage/${asset.id}`, updateAsset)
      .then((response) => {
        showSuccess(`Asset "${name}" UPDATED successfully.`);
        props.refreshAssets();
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

    if (country.trim().length === 0) {
      IS_FORM_VALID = false;
      setCountryValid(false);
    } else {
      setCountryValid(true);
    }

    if (language.trim().length === 0) {
      IS_FORM_VALID = false;
      setLanguageValid(false);
    } else {
      setLanguageValid(true);
    }

    if (sku.trim().length === 0) {
      IS_FORM_VALID = false;
      setSkuValid(false);
    } else {
      setSkuValid(true);
    }

    if (product.trim().length === 0) {
      IS_FORM_VALID = false;
      setProductValid(false);
    } else {
      setProductValid(true);
    }
  };

  const isFormVallid = () => {
    vlaidateForm();

    return IS_FORM_VALID;
  };

  return (
    <form onSubmit={submitHandler}>
      <Box display="flex" className={rpStyles.toolbar}>
        <Typography variant="h6">Update asset</Typography>
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
        <FormControl variant="outlined" className={rpStyles.inputs}>
          <InputLabel id="lblCountry">Country</InputLabel>
          <Select
            labelId="lblCountry"
            id="ddlCountry"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
            error={!countryValid}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="AU">Australia</MenuItem>
            <MenuItem value="IN">India</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={rpStyles.inputs}>
          <InputLabel id="lblLanguage">Language</InputLabel>
          <Select
            labelId="lblLanguage"
            id="ddlLanguage"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
            error={!languageValid}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="EN">English</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={rpStyles.inputs}
          id="txtSku"
          variant="outlined"
          label="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          error={!skuValid}
        />
        <TextField
          className={rpStyles.inputs}
          id="txtProduct"
          variant="outlined"
          label="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          error={!productValid}
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

export default EditAssetProductImage;
