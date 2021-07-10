import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AppNavItem from "../../UI/AppNavItem";

export const secondaryMenuItems = (
  <div>
    <ListSubheader inset>Settings</ListSubheader>
    <AppNavItem
      to=""
      text="Current month"
      icon={<AssignmentIcon />}
    ></AppNavItem>
  </div>
);
