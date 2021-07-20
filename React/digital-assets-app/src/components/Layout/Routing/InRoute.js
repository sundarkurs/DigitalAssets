import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../../../pages/Dashboard";
import Profile from "../../../pages/Profile";
import MySettings from "../../../pages/MySettings";
import NotFound from "../../../pages/NotFound";
import AssetTypes from "../../../pages/AssetTypes";
import Explorer from "../../../pages/Explorer";
import { ExplorerContextProvider } from "../../../store/ExplorerContext/explorer-context-provider";

const InRoute = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="dashboard"></Redirect>
      </Route>
      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>
      <Route path="/asset-types" exact>
        <AssetTypes />
      </Route>
      <Route path="/asset-types/:assetTypeCode/:folderId">
        <ExplorerContextProvider>
          <Explorer />
        </ExplorerContextProvider>
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/my-settings" exact>
        <MySettings />
      </Route>
      <Route path="/login" exact>
        <Redirect to="dashboard"></Redirect>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default InRoute;
