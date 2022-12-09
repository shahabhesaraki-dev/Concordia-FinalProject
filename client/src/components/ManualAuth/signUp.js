import styled from "styled-components";
const SignUp = () => {
  // const signInHandler = () => {
  //     fetch("https://mynewsprojectapp.herokuapp.com/api/addNewUser", {
  //       method: "Post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((result) => {
  //         if (result.status === 200) {
  //           localStorage.setItem("userId", JSON.stringify(result.id));
  //           localStorage.setItem("LogIn", JSON.stringify({ user: "logIn" }));
  //           history.push("/");
  //           window.location.reload();
  //         } else {
  //           setError(result.message);
  //         }
  //       });
  //   };
  return <MainDiv></MainDiv>;
};
const MainDiv = styled.div``;
export default SignUp;
