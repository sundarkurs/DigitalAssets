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
  detailsPanel: {
    marginLeft: "10px",
    width: "30%",
  },
}));

const AssetTypes = (props) => {
  const classes = useStyles();

  const [panelOpen, setPanelOpen] = useState(false);

  const openDetailsPanelHandler = () => {
    setPanelOpen(true);
  };

  const closeDetailsPanelHandler = () => {
    setPanelOpen(false);
  };

  return (
    <PageSettings title="Asset Types">
      <Box display="flex">
        <Box className={panelOpen ? classes.less : classes.full}>
          <PageSection>
            <AssetTypesList openDetailsPanel={openDetailsPanelHandler} />
          </PageSection>
        </Box>
        {panelOpen && (
          <Box className={classes.detailsPanel}>
            <PageSection>
              <CreateAssetType
                closeDetailsPanel={closeDetailsPanelHandler}
              ></CreateAssetType>
            </PageSection>
          </Box>
        )}
      </Box>
    </PageSettings>
  );
};

export default AssetTypes;
