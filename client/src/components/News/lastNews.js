import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";

const LastNews = () => {
  const history = useHistory();
  const [lastNews, setLastNews] = useState([]);

  useEffect(() => {
    fetch("https://mynewsprojectapp.herokuapp.com/api/getLastNews").then(
      (response) => {
        return response.json().then((result) => {
          setLastNews(result.data);
        });
      }
    );
  }, []);

  return (
    <Wrapper>
      {lastNews.length !== 0 ? (
        lastNews.map((news, index) => {
          return (
            <NewsSection key={index}>
              <Image
                src={`https://mynewsprojectapp.herokuapp.com/image/${news.image}`}
              />
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
              <Category>{news.category}</Category>
              <Title>{news.title}</Title>
              <Summary>{`${news.description
                .substring(0, 100)
                .replace(/<\/?[^>]+(>|$)/g, " ")
                .replace("&nbsp;", " ")}...`}</Summary>
            </NewsSection>
          );
        })
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

const Button = styled.button`
  font-family: Abel;
  font-size: 19px !important;
  width: 150px;
  height: 50px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    background-color: gray;
    transition: all 400ms ease;
    color: white;
  }
`;

const Category = styled.h4`
  font-family: Abel;
  font-size: 18px;
  color: gray;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
`;

const NewsSection = styled.div`
  width: 30%;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 20px;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 500ms ease;
  }
  &:hover ${Button} {
    opacity: 1;
  }
  &:hover ${Category} {
    color: white;
  }

  &:hover ${Image} {
    opacity: 0.8;
  }
`;

const Title = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
`;

const Summary = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

export default LastNews;
