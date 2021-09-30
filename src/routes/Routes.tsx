import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MemeGenerator } from "@pages/index";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <div>홈</div>} />
      <Route path="/meme-generator" component={MemeGenerator} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default Routes;
