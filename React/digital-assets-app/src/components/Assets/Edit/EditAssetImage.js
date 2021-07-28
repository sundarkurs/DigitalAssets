import React, { Fragment, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../../Styles/right-panel-styles";
import axios from "../../../store/DbContext/assets-db-context";
import useShowMessage from "../../../hooks/use-show-message";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

let IS_FORM_VALID = true;

const EditAssetImage = (props) => {
  const rpStyles = useRightPanelStyles();
  const { showSuccess, showError, showApiError } = useShowMessage();

  const { asset } = props;

  const [name, setName] = useState(asset.name);
  const [country, setCountry] = useState(asset.countryCode);
  const [language, setLanguage] = useState(asset.languageCode);
  const [abstract, setAbstract] = useState(asset.abstract);

  const [nameValid, setNameValid] = useState(true);
  const [countryValid, setCountryValid] = useState(true);
  const [languageValid, setLanguageValid] = useState(true);
  const [abstractValid, setAbstractValid] = useState(true);

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
      abstract: abstract,
      folderId: props.asset.folderId,
    };

    axios
      .put(`/Image/${asset.id}`, updateAsset)
      .then((response) => {
        showSuccess(`Asset "${name}" updated successfully.`);
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

    if (abstract.trim().length === 0) {
      IS_FORM_VALID = false;
      setAbstractValid(false);
    } else {
      setAbstractValid(true);
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
          id="txtAbstract"
          variant="outlined"
          label="Abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          error={!abstractValid}
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

export default EditAssetImage;
