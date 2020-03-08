import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Auth from './hoc/auth';

import Home from "./components/Home";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register.js";
import Shop from './components/Shop';
import Product from './components/Product'

import UserDashboard from "./components/User";
import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories'
import UserCart from './components/User/cart'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exect component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exect component={Auth(UserCart, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
        <Route path="/register" exect component={Auth(Register, false)} />
        <Route path="/product_detail/:id" exect component={Auth(Product, null)} />
        <Route path="/register_login" exect component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exect component={Auth(Shop, null)} />
        <Route path="/" exect component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
