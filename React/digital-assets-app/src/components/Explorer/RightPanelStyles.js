import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
  closeIcon: {
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "column",
  },
  divider: {
    marginTop: theme.spacing(2.5),
  },
  inputs: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
