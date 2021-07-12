import React from "react";
import CollectionsIcon from "@material-ui/icons/Collections";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppNavItem from "../../UI/AppNavItem";

export const primaryMenuItems = (
  <div>
    <AppNavItem
      to="/dashboard"
      text="Dashboard"
      icon={<DashboardIcon />}
    ></AppNavItem>

    <AppNavItem
      to="/asset-types"
      text="Asset Types"
      icon={<CollectionsIcon />}
    ></AppNavItem>
  </div>
);
