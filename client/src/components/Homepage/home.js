import styled from "styled-components";
import Header from "../header";
import LastNews from "../News/lastNews";
import PopularNews from "../News/popularNews";
import Slider from "../Slider/slider";

const Homepage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Slider />
        <SectionTitle>
          <H2>Last News</H2>
          <Line />
        </SectionTitle>
        <LastNews />
        <SectionTitle>
          <H2>Popular News</H2>
          <Line />
        </SectionTitle>
        <PopularNews />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 70px;
`;

const SectionTitle = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin-top: 30px;
  & h2 {
    font-weight: 400;
    z-index: 1;
    background-color: #fff;
    padding: 0 30px;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid lightgray;
  position: absolute;
`;

const H2 = styled.h2`
  font-family: Acme;
  font-size: 30px;
`;

export default Homepage;
