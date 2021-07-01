import { Fragment, useContext } from "react";
import FolderCard from "./FolderCard";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../../store/AppContext/app-context";

const FoldersList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appCtx = useContext(AppContext);

  const onFolderClickHandler = (asset) => {
    history.push(location.pathname + "/" + asset.id.toLowerCase());
  };

  const listItems = props.folders.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <FolderCard
          folder={item}
          onFolderClick={onFolderClickHandler}
        ></FolderCard>
      </Grid>
    );
  });

  return (
    <Fragment>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Fragment>
  );
};

export default FoldersList;
