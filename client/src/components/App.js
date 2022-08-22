import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Homepage from "./Homepage/home";
import Auth0ProviderWithHistory from "./Context/auth0Context";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
          </Switch>
        </Wrapper>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
`;

export default App;
