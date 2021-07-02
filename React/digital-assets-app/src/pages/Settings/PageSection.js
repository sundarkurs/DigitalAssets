import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const PageSection = (props) => {
  const classes = useStyles();
  return <Paper className={clsx(classes.paper)}>{props.children}</Paper>;
};
export default PageSection;
