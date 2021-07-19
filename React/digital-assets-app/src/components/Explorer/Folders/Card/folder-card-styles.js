import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useFolderCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  folderImg: {
    maxWidth: 200,
    height: 150,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  center: {
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useFolderCardStyles;