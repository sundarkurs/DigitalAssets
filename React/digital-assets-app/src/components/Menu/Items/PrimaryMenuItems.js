import React from "react";
import CollectionsIcon from "@material-ui/icons/Collections";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppNavItem from "./AppNavItem";

export const primaryMenuItems = (
  <div>
    <AppNavItem
      to="/dashboard"
      text="Asset Types"
      icon={<DashboardIcon />}
    ></AppNavItem>

    <AppNavItem
      to="/asset-types"
      text="Dashboard"
      icon={<CollectionsIcon />}
    ></AppNavItem>
  </div>
);
