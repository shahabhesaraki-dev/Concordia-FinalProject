import styled from "styled-components";
import Header from "../header";

const Homepage = () => {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Homepage;
