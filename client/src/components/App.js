import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./styles/Colors";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      {
        //this is where the header component will be placed
      }
      <Switch>
        <Route exact path="/">
          {
            //this is where the feed component will be placed
          }
          <div>test</div>
        </Route>
        <Route path="/item/:itemID">
          <div>item</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
