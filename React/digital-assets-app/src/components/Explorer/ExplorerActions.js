import { useContext } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExplorerContext from "../../store/ExplorerContext/explorer-context";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const ExplorerActions = (props) => {
  const explorerCtx = useContext(ExplorerContext);
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="row-reverse" component="div">
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={explorerCtx.addAsset}
        startIcon={<AddBoxIcon />}
      >
        Add asset
      </Button>
    </Box>
  );
};

export default ExplorerActions;
