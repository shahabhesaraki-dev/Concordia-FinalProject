import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const history = useHistory();
  // const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => history.push("/login")}>Log In</Button>;
};

const Button = styled.button`
  font-family: Abel;
  font-size: 19px !important;
  width: 80px;
  height: 41px;
  margin-top: -21px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #acdf87;
  cursor: pointer;
  &:hover {
    font-size: 17px;
    background-color: #68bb59;
    color: white;
    transition: all 500ms ease;
  }
`;

export default LoginButton;
