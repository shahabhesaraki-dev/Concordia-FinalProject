import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SignUp from "./signUp";
import Header from "../header";

const ManualLogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInHandler = () => {
    fetch("https://mynewsprojectapp.herokuapp.com/api/addNewUser", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("userId", JSON.stringify(result.id));
          history.push("/");
          window.location.reload();
        } else {
          setError(result.message);
        }
      });
  };

  const splitEmail = email.split("");

  return (
    <Section>
      <Header />
      <FormSection>
        <Title>Join and take care of animals</Title>

        <InputBox>
          {error.length !== 0 ? <Error>{`* ${error}`}</Error> : null}

          <Input
            type="email"
            placeholder="Email"
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                password.length !== 0 &&
                email.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signInHandler();
              }
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                password.length !== 0 &&
                email.length !== 0 &&
                splitEmail.includes("@")
              ) {
                return signInHandler();
              }
            }}
          />
          {email.length !== 0 &&
          password.length !== 0 &&
          splitEmail.includes("@") ? (
            <SigninButton onClick={signInHandler}>Sign in</SigninButton>
          ) : (
            <SigninButton disabled>Sign in</SigninButton>
          )}
        </InputBox>
        <SignupBox>
          <H2>Are you a new user?</H2>
          <SignUp />
        </SignupBox>
      </FormSection>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 60px 10px;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 55px;
  text-align: center;
  margin-top: 50px;
  color: #5f4024;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-left: 20px;
`;

const Input = styled.input`
  height: 50px;
  width: 50%;
  font-size: 18px;
  margin-top: 10px;
  outline: none;
  border-radius: 30px;
  padding: 0 0 0 15px;
  border: 2px solid #825e3a;
  font-family: "Abel";
  font-size: 20px;
  color: #240d01;
  &::placeholder {
    color: #240d01;
    opacity: 0.5;
  }
  &:focus {
    border: 2px solid #240d01;
    &::placeholder {
      position: absolute;
      transition: 400ms ease-in-out;
      top: -3px;
      margin-left: 5px;
      font-size: 17px;
      opacity: 0.7;
    }
  }
`;

const SigninButton = styled.button`
  height: 50px;
  width: 40%;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 5px;
  outline: none;
  border-radius: 30px;
  font-family: "Abel";
  font-size: 21px;
  background-color: #825e3a;
  border: none;
  color: white;
  &:hover:enabled {
    background-color: #240d01;
    transition: 200ms ease-in-out;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-top: 100px;
  margin-left: 15px;
`;

const H2 = styled.h2`
  font-family: "Abel";
  font-size: 20px;
  margin-left: 10px;
`;

const Error = styled.h2`
  font-family: "Acme";
  font-size: 17px;
  color: darkred;
  margin-left: 5px;
  margin-bottom: 5px;
`;

export default ManualLogIn;
