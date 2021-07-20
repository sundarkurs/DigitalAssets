import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../../../store/DbContext/assets-db-context";
import AppDetailDrawer from "../../UI/AppDetailDrawer";
import { makeStyles } from "@material-ui/core/styles";
import ExplorerActions from "../../Explorer/ExplorerActions";
import CreateAssetImage from "../../Assets/Create/CreateAssetImage";
import CreateAssetProductImage from "../../Assets/Create/CreateAssetProductImage";
import { Fragment } from "react";
import AssetsList from "../../Assets/AssetsList";

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

const AssetExplorer = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const params = useParams();

  const [showDrawer, setShowDrawer] = useState(false);
  const [mode, setMode] = useState("");

  const [currentFolderId, setCurrentFolderId] = useState(params.folderId);
  const [folderInfo, setFoderInfo] = useState({
    folder: null,
    parent: null,
    childrens: [],
  });
  const [assets, setAssets] = useState([]);

  const [actionFolder, setActionFolder] = useState(null);

  useEffect(() => {
    getAssets(currentFolderId);
  }, [currentFolderId]);

  const getAssets = (id) => {
    axios
      .get(`${params.assetTypeCode}/folder/${id}`)
      .then((response) => {
        setAssets(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeDetailsPanelHandler = () => {
    setMode("");
    setShowDrawer(false);
  };

  const toggleDrawer = (open) => {
    setShowDrawer(open);
  };

  const refreshAssetsHandler = () => {
    getAssets(currentFolderId);
  };

  const onAddAssetHandler = (folder) => {
    setShowDrawer(true);
    setMode("add-asset");
  };

  var drawerContent = "";
  if (showDrawer) {
    if (mode === "add-asset") {
      debugger;
      if (folderInfo.folder.assetType === AssetType.ProductImage) {
        drawerContent = (
          <CreateAssetProductImage
            folderId={folderInfo.folder.id}
            assetType={folderInfo.folder.assetType}
            closeDetailsPanel={closeDetailsPanelHandler}
            refreshAssets={refreshAssetsHandler}
          ></CreateAssetProductImage>
        );
      } else if (folderInfo.folder.assetType === AssetType.Image) {
        drawerContent = (
          <CreateAssetImage
            folderId={folderInfo.folder.id}
            assetType={folderInfo.folder.assetType}
            closeDetailsPanel={closeDetailsPanelHandler}
            refreshAssets={refreshAssetsHandler}
          ></CreateAssetImage>
        );
      }
    }
  }

  return (
    <Fragment>
      <AssetsList assets={assets}></AssetsList>
      <AppDetailDrawer
        drawerClass={styles.drawer}
        show={showDrawer}
        onClose={() => toggleDrawer(false)}
      >
        {drawerContent}
      </AppDetailDrawer>
    </Fragment>
  );
};

export default AssetExplorer;
