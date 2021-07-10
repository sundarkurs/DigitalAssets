import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const AppPageTitle = (props) => {
  const classes = useStyles();

  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      className={classes.title}
    >
      {props.title}
    </Typography>
  );
};

export default AppPageTitle;

AppPageTitle.propTypes = {
  title: PropTypes.string,
};
