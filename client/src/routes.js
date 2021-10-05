import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Home } from "./components";

const Routes = (props) => {

  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default withRouter(connect(null, null)(Routes));
