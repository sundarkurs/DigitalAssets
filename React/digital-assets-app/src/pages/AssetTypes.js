import React, { useState } from "react";
import PageSettings from "./Settings/PageSettings";
import AssetTypesList from "../components/AssetTypes/AssetTypesList";
import CreateAssetType from "../components/AssetTypes/CreateAssetType";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  full: {
    width: "100%",
  },
  less: {
    width: "70%",
  },
}));

const AssetTypes = (props) => {
  const styles = useStyles();

  const [panelOpen, setPanelOpen] = useState(false);

  const openPanelHandler = () => {
    setPanelOpen(true);
  };

  const closePanelHandler = () => {
    setPanelOpen(false);
  };

  return (
    <Box display="flex">
      <Box className={panelOpen ? styles.less : styles.full}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={clsx(styles.paper)}>
              <AssetTypesList
                onOpenPanel={openPanelHandler}
                onClosePanel={closePanelHandler}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {panelOpen && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={clsx(styles.paper)}>
                <CreateAssetType></CreateAssetType>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AssetTypes;
