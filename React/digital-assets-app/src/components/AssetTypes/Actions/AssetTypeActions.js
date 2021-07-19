import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const AssetTypeActions = (props) => {
  const styles = useStyles();
  return (
    <Box display="flex" flexDirection="row-reverse" component="div">
      <Button
        variant="contained"
        color="default"
        className={styles.button}
        startIcon={<ImportExportIcon />}
      >
        Export
      </Button>
    </Box>
  );
};

export default AssetTypeActions;
