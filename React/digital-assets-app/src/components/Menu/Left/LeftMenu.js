import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { primaryMenuItems } from "../Items/PrimaryMenuItems";
import { secondaryMenuItems } from "../Items/SecondaryMenuItems";
import { Typography } from "@material-ui/core";
import useLeftMenuStyles from "./left-menu-styles";

const LeftMenu = (props) => {
  const classes = useLeftMenuStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.menuDrawerOpen && classes.drawerPaperClose
        ),
      }}
      open={props.menuDrawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <Typography
          className={classes.logoText}
          variant="h4"
          color="textSecondary"
        >
          assets
        </Typography>
        <IconButton onClick={props.onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{primaryMenuItems}</List>
      <Divider />
      <List>{secondaryMenuItems}</List>
    </Drawer>
  );
};

export default LeftMenu;
