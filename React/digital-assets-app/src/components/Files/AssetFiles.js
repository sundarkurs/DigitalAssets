import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "../../store/DbContext/assets-db-context";
import FileGallery from "./FileGallery";
import Box from "@material-ui/core/Box";
import useRightPanelStyles from "../Styles/right-panel-styles";

const AssetFiles = (props) => {
  const [files, setFiles] = useState([]);
  const rpStyles = useRightPanelStyles();
  const { asset, assetTypeCode } = props;

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

  return (
    <>
      <Box mt={2} display="flex" className={rpStyles.content}>
        {files.length == 0 && <Typography>No files found</Typography>}
        {files.length > 0 && <FileGallery files={files}></FileGallery>}
      </Box>
    </>
  );
};

export default AssetFiles;
