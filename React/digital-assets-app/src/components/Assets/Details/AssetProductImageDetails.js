import React, { Fragment, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import useShowMessage from "../../../hooks/use-show-message";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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

const AssetProductImageDetails = (props) => {
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

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
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
            </Box>
          </Grid>
          <Grid item xs>
            <Box mt={2} display="flex" className={rpStyles.content}>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={rpStyles.button}
                onClick={props.openDetailsPanel}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AssetProductImageDetails;
