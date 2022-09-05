import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Homepage from "./Homepage/home";
import Auth0ProviderWithHistory from "./Context/auth0Context";
import AddNews from "./Dashboard/addNews";
import AllNews from "./News/allNews";
import NewsDetail from "./News/newsDetail";
import NewsByCategory from "./News/newsByCategory";
// import GlobalStyle from "./GlobalStyle";

const App = () => {
  return (
    <BrowserRouter>
      {/* <GlobalStyle /> */}
      <Auth0ProviderWithHistory>
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/allNews">
              <AllNews />
            </Route>
            <Route path="/news/:id">
              <NewsDetail />
            </Route>
            <Route path="/category/:categoryName">
              <NewsByCategory />
            </Route>
            <Route path="/dashboard/addNews">
              <AddNews />
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
