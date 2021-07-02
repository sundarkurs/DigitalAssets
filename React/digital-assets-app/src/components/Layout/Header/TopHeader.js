import { useContext } from "react";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import Notification from "./Notification";
import PageTitle from "./PageTitle";
import ProfileIcon from "./ProfileIcon";
import ThemeSelector from "./ThemeSelector";
import AppContext from "../../../store/AppContext/app-context";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    backgroundColor: (props) =>
      props.isDarkTheme ? theme.palette.background.default : "",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
}));

const TopHeader = (props) => {
  const appCtx = useContext(AppContext);

  const styleProps = {
    isDarkTheme: appCtx.isDarkTheme,
  };

  const classes = useStyles(styleProps);

  return (
    <AppBar
      position="absolute"
      className={clsx(
        classes.appBar,
        props.menuDrawerOpen && classes.appBarShift
      )}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.onDrawerOpen}
          className={clsx(
            classes.menuButton,
            props.menuDrawerOpen && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <PageTitle pageTitle={props.pageTitle} />
        <ThemeSelector />
        <Notification />
        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;

TopHeader.propTypes = {
  menuDrawerOpen: PropTypes.bool,
  onDrawerOpen: PropTypes.func,
  pageTitle: PropTypes.string,
};
