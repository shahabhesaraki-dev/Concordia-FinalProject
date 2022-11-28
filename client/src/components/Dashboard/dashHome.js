import styled from "styled-components";
import Header from "../header";
import DashHeader from "./dashHeader";

const DashHome = () => {
  return (
    <PrimeDiv>
      <Header />
      <MainSection>
        <DashHeader />
        <TitleDiv>
          <Title>Welcome to Dashboard</Title>
        </TitleDiv>
      </MainSection>
    </PrimeDiv>
  );
};

const PrimeDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainSection = styled.div`
  display: flex;
  max-width: 100%;
  padding: 50px 30px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  background-color: pink;
  height: 50vh;
`;

const Title = styled.h1`
  font-family: Acme;
  font-size: 80px;
  margin-top: 50px;
  text-align: center;
`;

export default DashHome;
