import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Homepage from "./Homepage/home";
import Auth0ProviderWithHistory from "./Context/auth0Context";
import AllNews from "./News/allNews";
import NewsDetail from "./News/newsDetail";
import NewsByCategory from "./News/newsByCategory";
import SearchPage from "./Search/searchPage";
import DashHome from "./Dashboard/dashHome";
import DashAddNews from "./Dashboard/dashAddNews";
import DashAllNews from "./Dashboard/dashAllNews";
import DashEditNews from "./Dashboard/dashEditNews";
import ManualLogIn from "./ManualAuth/login";
import SignUp from "./ManualAuth/signUp";

const App = () => {
  return (
    <BrowserRouter>
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
            <Route path="/login">
              <ManualLogIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/category/:categoryName">
              <NewsByCategory />
            </Route>
            <Route path="/dashboard/addNews">
              <DashAddNews />
            </Route>
            <Route path="/dashboard/home">
              <DashHome />
            </Route>
            <Route path="/dashboard/allNews">
              <DashAllNews />
            </Route>
            <Route path="/dashboard/editNews">
              <DashEditNews />
            </Route>
            <Route path="/search/:searchContent">
              <SearchPage />
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
