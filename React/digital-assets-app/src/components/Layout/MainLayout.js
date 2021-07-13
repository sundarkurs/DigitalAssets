import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TopHeader from "../Header/TopHeader";
import LeftMenu from "../Menu/Left/LeftMenu";
import AppContext from "../../store/AppContext/app-context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const appCtx = useContext(AppContext);

  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const openMenuDrawerHandler = () => {
    setMenuDrawerOpen(true);
  };
  const closeMenuDrawerHandler = () => {
    setMenuDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopHeader
        pageTitle={appCtx.pageTitle}
        menuDrawerOpen={menuDrawerOpen}
        onDrawerOpen={openMenuDrawerHandler}
      />
      <LeftMenu
        menuDrawerOpen={menuDrawerOpen}
        onDrawerClose={closeMenuDrawerHandler}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xlg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;
