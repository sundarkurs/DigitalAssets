import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import PageSection from "./Settings/PageSection";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/CreateAssetType";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  full: {
    width: "100%",
  },
  less: {
    width: "70%",
  },
  addOnPanel: {
    marginLeft: "10px",
    width: "30%",
  },
}));

const AssetTypes = (props) => {
  const classes = useStyles();

  const [panelOpen, setPanelOpen] = useState(false);

  const openPanelHandler = () => {
    setPanelOpen(true);
  };

  const closePanelHandler = () => {
    setPanelOpen(false);
  };

  return (
    <PageSettings title="Asset Types">
      <Box display="flex">
        <Box className={panelOpen ? classes.less : classes.full}>
          <PageSection>
            <AssetTypesList onOpenPanel={openPanelHandler} />
          </PageSection>
        </Box>
        {panelOpen && (
          <Box className={classes.addOnPanel}>
            <PageSection>
              <CreateAssetType
                onClosePanel={closePanelHandler}
              ></CreateAssetType>
            </PageSection>
          </Box>
        )}
      </Box>
    </PageSettings>
  );
};

export default AssetTypes;
