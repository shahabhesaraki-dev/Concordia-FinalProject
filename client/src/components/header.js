import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import logo from "../assets/CBC-News-Logo.jpg";
import { AllContext } from "./Context/allContext";
import { useContext, useEffect, useState } from "react";
import AuthNav from "../components/Auth/auth-nav";

const Header = () => {
  const history = useHistory();
  const { categories } = useContext(AllContext);
  const [speceficUser, setSpeceficUser] = useState();
  const [serachInput, setSearchInput] = useState();

  const userId = JSON.parse(localStorage.getItem("userID"));

  useEffect(() => {
    if (userId) {
      const getUserFromDb = async () => {
        const response = await fetch(`/api/user/${userId.id}`);
        const result = await response.json();
        setSpeceficUser(result.data);
      };
      getUserFromDb();
    } else {
      return null;
    }
    // eslint-disable-next-line
  }, [categories]);

  return (
    <Wrapper>
      <Navigation>
        <Link to="/">
          <ImageLogo src={logo} />
        </Link>
        <LinkDiv>
          {speceficUser && speceficUser.admin ? (
            <StyledLink
              onClick={() => {
                window.localStorage.removeItem("newPost");
              }}
              to="/dashboard/addNews"
              style={{ color: "#eb1f28" }}
            >
              Dashboard
            </StyledLink>
          ) : null}
          {categories.length !== 0 ? (
            <StyledLink to="/allNews">All</StyledLink>
          ) : null}
          {categories.map((category, index) => {
            return (
              <StyledLink to={`/category/${category}`} key={index}>
                {category.replace(/^./, category[0].toUpperCase())}
              </StyledLink>
            );
          })}
        </LinkDiv>
      </Navigation>
      <SearchContainer>
        <SearchInput
          value={serachInput || ""}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              history.push(`/search/${serachInput}`);
            }
          }}
          placeholder="Search the news"
        />
        <SearchButton
          onClick={() => {
            if (serachInput.length !== 0) {
              history.push(`/search/${serachInput}`);
            }
          }}
        />
      </SearchContainer>
      <AuthNav />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  min-width: 100%;
  height: 40px;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const LinkDiv = styled.div`
  margin-left: 30px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #292929;
  font-family: "Poppins", sans-serif;
  margin-left: 16px;
  letter-spacing: -0.05em;
  display: inline-block;
  font-weight: bold;

  &:hover {
    color: #db6a86;
  }
`;

const ImageLogo = styled.img``;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 260px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  right: 0;
  margin-right: 100px;
  margin-bottom: 22px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 220px;
  text-indent: 12px;
  color: #292929;
  border-radius: none;
  border-width: 0 1px 0 0;
  border-style: solid;
  border-color: gray;
  outline: none;
  font-size: 14px;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: #c1c1c1;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 100%;
  overflow: hidden;
  border: none;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
`;

export default Header;
