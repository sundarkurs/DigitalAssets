import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "../../store/DbContext/assets-db-context";
import FileGallery from "./FileGallery";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../Styles/right-panel-styles";
import useShowMessage from "../../hooks/use-show-message";

const AssetFiles = (props) => {
  const [files, setFiles] = useState([]);
  const rpStyles = useRightPanelStyles();
  const { asset, assetTypeCode } = props;
  const { showSuccess, showError, showApiError } = useShowMessage();

  useEffect(() => {
    getAssetFiles(asset.id);
  }, [asset.id]);

  const getAssetFiles = (assetId) => {
    axios
      .get(`${assetTypeCode}/${assetId}/files`)
      .then((response) => {
        setFiles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileDeleteHandler = (file) => {
    axios
      .delete(`/${assetTypeCode}/${asset.id}/file/${file.id}/delete`)
      .then((response) => {
        showSuccess(`File ${file.name} deleted successfully.`);
        getAssetFiles(asset.id);
      })
      .catch((error) => {
        showApiError(error);
      });
  };

  const setDefaultFileHandler = (file) => {
    axios
      .put(`/${assetTypeCode}/${asset.id}/file/${file.id}/default`)
      .then((response) => {
        showSuccess(`File ${file.name} updated successfully.`);
        getAssetFiles(asset.id);
      })
      .catch((error) => {
        showApiError(error);
      });
  };

  return (
    <>
      <Box mt={2} display="flex" className={rpStyles.content}>
        {files.length == 0 && <Typography>No files found</Typography>}
        {files.length > 0 && (
          <FileGallery
            files={files}
            assetTypeCode={assetTypeCode}
            onFileDelete={fileDeleteHandler}
            onDefaultSet={setDefaultFileHandler}
          ></FileGallery>
        )}
      </Box>
    </>
  );
};

export default AssetFiles;
