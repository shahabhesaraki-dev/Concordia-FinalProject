import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";
import DashHeader from "./dashHeader";
import EditNews from "./editNews";

const DashEditNews = () => {
  const location = useLocation();

  return (
    <PrimeDiv>
      <Header />
      <MainSection>
        <DashHeader />
        <EditNews id={location.state.id} />
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

export default DashEditNews;
