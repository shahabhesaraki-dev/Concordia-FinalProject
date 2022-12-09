import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AllContext } from "../Context/allContext";
import Header from "../header";
import DashHeader from "./dashHeader";

const DashAddNews = () => {
  const history = useHistory();
  const { allNews } = useContext(AllContext);

  const [firstNumber, setFirstNumber] = useState(1);
  const [secondNumber, setSecondNumber] = useState(5);

  return (
    <PrimeDiv>
      <Header />
      <MainSection>
        <DashHeader />
        <TableDiv>
          <Table>
            <tbody>
              <tr>
                <TH>Image</TH>
                <TH>Title</TH>
                <TH>Category</TH>
                <TH>Action</TH>
              </tr>

              {allNews
                ? allNews
                    .slice(firstNumber - 1, secondNumber)
                    .map((news, index) => {
                      return (
                        <tr key={index}>
                          <TD>
                            <Imgage
                              src={`https://mynewsprojectapp.herokuapp.com/image/${news.image}`}
                            />
                          </TD>
                          <TD>{news.title}</TD>
                          <TD style={{ textAlign: "center" }}>
                            {news.category}
                          </TD>
                          <TD style={{ textAlign: "center" }}>
                            <Edit
                              onClick={() => {
                                history.push({
                                  pathname: "/dashboard/editNews",
                                  state: { id: news._id },
                                });
                              }}
                            >
                              Edit
                            </Edit>
                            <Delete
                              onClick={() => {
                                fetch(
                                  `https://mynewsprojectapp.herokuapp.com/api/delete/${news._id}`,
                                  {
                                    method: "Delete",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                )
                                  .then((respond) => {
                                    respond.json();
                                  })
                                  .then((result) => {
                                    return result;
                                  })
                                  .then(() => {
                                    window.location.reload();
                                  });
                              }}
                            >
                              Delete
                            </Delete>
                          </TD>
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </Table>
          {allNews.length > 0 ? (
            <PaginationDiv>
              <Page
                onClick={() => {
                  if (firstNumber !== 1) {
                    setFirstNumber(firstNumber - 5);
                    setSecondNumber(secondNumber - 5);
                  }
                }}
              >
                -
              </Page>
              <NumberPage>
                {firstNumber} to {secondNumber}
              </NumberPage>
              <Page
                onClick={() => {
                  if (
                    allNews.length >= secondNumber + 5 ||
                    (allNews.length < secondNumber + 5 &&
                      allNews.length > firstNumber + 5)
                  ) {
                    setFirstNumber(firstNumber + 5);
                    setSecondNumber(secondNumber + 5);
                  }
                }}
              >
                +
              </Page>
            </PaginationDiv>
          ) : null}
        </TableDiv>
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

const TableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const Table = styled.table`
  width: 90%;
`;

const TH = styled.th`
  font-family: Acme;
  padding: 20px;
`;

const TD = styled.td`
  font-family: Abel;
  font-weight: 600;
  border: 1px solid black;
  padding: 20px;
`;

const Imgage = styled.img`
  width: 100px;
  height: 100px;
`;

const Edit = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: green;
  border: 1px solid black;
  padding: 5px 12px;
  margin-right: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const Delete = styled.a`
  font-family: Abel;
  font-size: 18px;
  font-weight: 100;
  color: white;
  background-color: #eb1f28;
  border: 1px solid black;
  padding: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.a`
  text-align: center;
  font-family: Abel;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const NumberPage = styled.h4`
  font-family: Abel;
  margin-right: 5px;
`;
export default DashAddNews;
