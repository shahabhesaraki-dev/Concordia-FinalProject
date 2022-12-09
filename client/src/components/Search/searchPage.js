import styled from "styled-components";
import Header from "../header";
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from "../spinner";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const history = useHistory();
  const { searchContent } = useParams();

  const [searchedNews, setSearchNews] = useState();

  useEffect(() => {
    const getSearchItems = async () => {
      const response = await fetch(
        `https://mynewsprojectapp.herokuapp.com/api/searchedNews/${searchContent}`
      );
      const result = await response.json();
      setSearchNews(result.data);
    };
    getSearchItems();
    // eslint-disable-next-line
  }, [searchContent]);

  console.log(searchedNews);

  return (
    <>
      <Header />
      <ProductsSectionTitle>
        <H4>Search results for "{searchContent}"</H4>
        <Line />
      </ProductsSectionTitle>
      {searchedNews ? (
        searchedNews.length !== 0 ? (
          searchedNews.map((news, index) => {
            return (
              <Wrapper key={index}>
                <ImageSection>
                  <Link to={`/news/${news._id}`}>
                    <Image
                      src={`https://mynewsprojectapp.herokuapp.com/image/${news.image}`}
                    />
                  </Link>
                </ImageSection>
                <DetailsSection>
                  <Category>{news.category}</Category>
                  <Title>{news.title}</Title>
                  <Summary>{`${news.description
                    .substring(0, 100)
                    .replace(/<\/?[^>]+(>|$)/g, " ")
                    .replace("&nbsp;", " ")}...`}</Summary>
                  <Button
                    onClick={() => {
                      fetch(
                        `https://mynewsprojectapp.herokuapp.com/api/${news._id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      ).then((result) => {
                        return result.json();
                      });

                      history.push(`/news/${news._id}`);
                    }}
                  >
                    Read more
                  </Button>
                </DetailsSection>
              </Wrapper>
            );
          })
        ) : (
          <H3>Sorry! We couldn't find any news regarding "{searchContent}"</H3>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ProductsSectionTitle = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  margin-top: 10px;
  & h4 {
    font-weight: 400;
    z-index: 1;
    background-color: #fff;
    padding: 0 30px;
    text-transform: uppercase;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid lightgray;
  position: absolute;
`;

const ImageSection = styled.div`
  width: 30%;
  padding: 10xp;
`;

const Image = styled.img`
  width: 70%;
  height: 200px;
  margin-left: 40px;
`;

const DetailsSection = styled.div`
  width: 60%;
  padding: 10xp;
  margin-top: -10px;
`;

const Category = styled.h4`
  font-family: Open Sans;
  color: gray;
`;

const Title = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
`;

const Summary = styled.p`
  font-family: "Poppins", sans-serif;
`;

const Button = styled.button`
  font-family: Abel;
  font-size: 19px !important;
  width: 120px;
  height: 45px;
  padding: 5px;
  font-size: 15px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background-color: gray;
    font-size: 17px;
    color: white;
    transition: all 400ms ease;
  }
`;

const H3 = styled.h2`
  padding: 20px;
  text-align: center;
  font-family: Open Sans;
  color: darkgray;
`;

const H4 = styled.h4`
  font-family: Acme;
  font-size: 20px;
`;

export default SearchPage;
