import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";

const ManualLogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInHandler = () => {
    fetch("/api/signIn", {
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
          localStorage.setItem("userID", JSON.stringify({ id: result.id }));
          localStorage.setItem("LogIn", JSON.stringify({ user: "logIn" }));
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
        <Title>Login to your account</Title>

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
          <SignUpButton
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign up
          </SignUpButton>
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
  width: 100%;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-family: "Acme";
  font-size: 55px;
  text-align: center;
  margin-top: 10px;
  color: black;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 1px solid black;
  padding: 30px;
  border-radius: 10px;
`;

const Input = styled.input`
  height: 50px;
  width: 400px;
  font-size: 18px;
  margin-top: 10px;
  outline: none;
  border-radius: 10px;
  padding: 0 0 0 15px;
  border: 1px solid black;
  font-family: "Abel";
  font-size: 20px;
  color: #240d01;
  &::placeholder {
    color: #240d01;
    opacity: 0.5;
  }
  &:focus {
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
  width: 200px;
  font-size: 18px;
  margin: auto;
  margin-top: 25px;
  outline: none;
  border-radius: 10px;
  font-family: "Abel";
  font-size: 21px;
  background-color: #90caea;
  border: none;
  color: black;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const H2 = styled.h2`
  font-family: "Abel";
  font-size: 20px;
  text-align: center;
`;

const Error = styled.h2`
  font-family: "Acme";
  font-size: 17px;
  color: darkred;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const SignUpButton = styled.button`
  height: 50px;
  width: 200px;
  font-size: 18px;
  margin: auto;
  margin-top: 10px;
  outline: none;
  border-radius: 10px;
  font-family: "Abel";
  font-size: 21px;
  background-color: #acdf87;
  border: none;
  color: black;
  cursor: pointer;
`;

export default ManualLogIn;
