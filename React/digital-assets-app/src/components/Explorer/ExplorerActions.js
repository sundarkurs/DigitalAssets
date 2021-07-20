import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const ExplorerActions = (props) => {
  const styles = useStyles();
  return (
    <Box display="flex" flexDirection="row-reverse" component="div">
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={props.onAddAsset}
        startIcon={<AddBoxIcon />}
      >
        Add asset
      </Button>
    </Box>
  );
};

export default ExplorerActions;
