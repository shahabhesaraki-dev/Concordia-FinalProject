import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DashHeader = () => {
  return (
    <Wrapper>
      <nav>
        <ul>
          <Li>
            <StyledNavLink
              to="/dashboard/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink
              to="/dashboard/allNews"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              All News
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink
              to="/dashboard/addNews"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add News
            </StyledNavLink>
          </Li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  /* position: fixed; */
  left: 10px;
  top: 100px;
`;

const Li = styled.li`
  text-decoration: none;
  padding: 10px 20px;
  margin-bottom: 2px;
`;

const StyledNavLink = styled(NavLink)`
  font-family: "Abel";
  font-weight: 600;
  font-size: 22px;
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &.active {
    font-weight: bold;
    color: #eb1f28;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default DashHeader;
