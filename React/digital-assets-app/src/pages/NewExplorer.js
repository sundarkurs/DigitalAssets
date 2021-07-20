import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import PageSettings from "./Settings/PageSettings";
import AppSection from "../components/UI/AppSection";
import AssetsList from "../components/Assets/AssetsList";
import FoldersList from "../components/Folders/List/FoldersList";
import CreateFolder from "../components/Folders/Create/CreateFolder";
import RenameFolder from "../components/Folders/Rename/RenameFolder";
import DeleteFolder from "../components/Folders/Delete/DeleteFolder";
import BreadcrumbMenu from "../components/Explorer/BreadcrumbMenu";
import axios from "../store/DbContext/assets-db-context";
import AppDetailDrawer from "../components/UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerActions from "../components/Explorer/ExplorerActions";
import CreateAssetImage from "../components/Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../components/Assets/Create/CreateAssetProductImage";
import FolderExplorer from "../components/Explorer/Folder/FolderExplorer";
import AssetExplorer from "../components/Explorer/Asset/AssetExplorer";

const AssetType = {
  ProductImage: 1,
  Image: 2,
};

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: "400px",
  },
}));

const NewExplorer = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const params = useParams();

  const [currentFolderId, setCurrentFolderId] = useState(params.folderId);
  const [createAsset, setCreateAsset] = useState(false);

  const onAddAssetHandler = (folder) => {
    setCreateAsset(true);
  };

  return (
    <PageSettings title={`${params.assetTypeCode} Explorer`}>
      <AppSection>
        <ExplorerActions onAddAsset={onAddAssetHandler}></ExplorerActions>
        <Divider className={styles.divider} />
        <FolderExplorer></FolderExplorer>
        <div style={{ paddingTop: 50 }}></div>
        <AssetExplorer createAsset={createAsset}></AssetExplorer>
      </AppSection>
    </PageSettings>
  );
};

export default NewExplorer;
