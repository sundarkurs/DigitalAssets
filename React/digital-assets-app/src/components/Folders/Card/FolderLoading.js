import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

const FolderLoading = () => {
  return (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rect" height={200} />
    </div>
  );
};

export default FolderLoading;
