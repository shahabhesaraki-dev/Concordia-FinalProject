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
        <ProductsSectionTitle>
          <h2>Last News</h2>
          <Line />
        </ProductsSectionTitle>
        <LastNews />
        <ProductsSectionTitle>
          <h2>Popular News</h2>
          <Line />
        </ProductsSectionTitle>
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

const ProductsSectionTitle = styled.div`
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

export default Homepage;
