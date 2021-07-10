import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CollectionsIcon from "@material-ui/icons/Collections";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { NavLink } from "react-router-dom";

export const primaryMenuItems = (
  <div>
    <NavLink
      to="/dashboard"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/asset-types"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem button>
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Asset Types" />
      </ListItem>
    </NavLink>
  </div>
);
