import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
  width: 80px;
  height: 41px;
  margin-top: -21px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #acdf87;
  &:hover {
    font-size: 17px;
    background-color: #68bb59;
    color: white;
    transition: all 500ms ease;
  }
`;

export default LoginButton;
