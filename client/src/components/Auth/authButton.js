import React, { useEffect } from "react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { user: currentUser } = useAuth0();

  useEffect(() => {
    if (currentUser) {
      fetch("/api/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: currentUser.sub,
          email: currentUser.email,
        }),
      }).then((result) => {
        return result.json();
      });
      // .then((response) => {
      //   console.log(response.data);
      // });
      localStorage.setItem("LogIn", JSON.stringify({ user: "logIn" }));
      localStorage.setItem("userID", JSON.stringify({ id: currentUser.sub }));
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const userLogin = localStorage.getItem("LogIn");

  return userLogin ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
