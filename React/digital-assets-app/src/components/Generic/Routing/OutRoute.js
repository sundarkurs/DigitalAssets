import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../../pages/Login";

const OutRoute = () => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="*">
        <Redirect to="login"></Redirect>
      </Route>
    </Switch>
  );
};

export default OutRoute;
