import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() => {
        window.localStorage.removeItem("LogIn");
        window.localStorage.removeItem("userID");
        logout({
          returnTo: window.location.origin,
        });
      }}
    >
      Log Out
    </Button>
  );
};

const Button = styled.button`
  font-family: Abel;
  font-size: 19px !important;
  width: 80px;
  height: 41px;
  margin-top: -21px;
  font-size: 16px;
  background-color: #eb1f28;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    font-size: 17px;
  }
`;

export default LogoutButton;
