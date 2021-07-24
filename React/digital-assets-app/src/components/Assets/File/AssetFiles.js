import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import ExplorerContext from "../../../store/ExplorerContext/explorer-context";
import { useContext } from "react";
import useRightPanelStyles from "../../Styles/right-panel-styles";

const AssetFiles = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const rpStyles = useRightPanelStyles();
  return (
    <>
      <Box display="flex" className={rpStyles.toolbar}>
        <Typography variant="h6">Asset files</Typography>
        <CloseIcon
          className={rpStyles.closeIcon}
          onClick={explorerCtx.closeDrawer}
        />
      </Box>
      <Divider className={rpStyles.divider}></Divider>
    </>
  );
};

export default AssetFiles;
