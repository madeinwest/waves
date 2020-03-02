import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Auth from './hoc/auth';
import Home from "./components/Home";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register.js";
import UserDashboard from "./components/User";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exect component={Auth(UserDashboard, true)} />
        <Route path="/register" exect component={Auth(Register, false)} />
        <Route path="/register_login" exect component={Auth(RegisterLogin, false)} />
        <Route path="/" exect component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
