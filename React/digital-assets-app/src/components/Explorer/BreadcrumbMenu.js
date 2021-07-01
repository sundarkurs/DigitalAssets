import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const BreadcrumbMenu = (props) => {
  const menuItems = props.menuItems;

  const elementsList = menuItems.map((item, index) => {
    if (menuItems.length === index + 1) {
      return <Typography color="textPrimary">{item.name}</Typography>;
    } else {
      return (
        <Link color="inherit" onClick={props.onMenuClick}>
          {item.name}
        </Link>
      );
    }
  });

  return <Breadcrumbs aria-label="breadcrumb">{elementsList}</Breadcrumbs>;
};

export default BreadcrumbMenu;
