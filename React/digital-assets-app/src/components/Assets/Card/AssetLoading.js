import { Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

const AssetLoading = () => {
  return (
    <div>
      <Skeleton variant="rect" height={200} />
      <Typography component="div" variant={"h2"}>
        <Skeleton />
      </Typography>
    </div>
  );
};

export default AssetLoading;
