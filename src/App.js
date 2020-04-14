import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import { connect } from "react-redux";
import MainContainer from "./components/Main/mainContainer";
import { Switch, Route } from "react-router-dom";
import AdminContainer from "./components/Admin/AdminContainer";

let App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <MainContainer></MainContainer>
        </Route>
        <Route path="/admin">
          <AdminContainer></AdminContainer>
        </Route>
      </Switch>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(App);
