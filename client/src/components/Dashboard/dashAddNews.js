import styled from "styled-components";
import Header from "../header";
import AddNews from "./addNews";
import DashHeader from "./dashHeader";

const DashAddNews = () => {
  return (
    <PrimeDiv>
      <Header />
      <MainSection>
        <DashHeader />
        <AddNews />
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

export default DashAddNews;
