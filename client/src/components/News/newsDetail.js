import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";
import Comments from "../comments";
import Spinner from "../spinner";
import RandomNewsByCategory from "./randomNewsByCategory";

const NewsDetail = () => {
  const { id } = useParams();

  const userIsLogin = localStorage.getItem("LogIn");

  const [speceficNews, setSpeceficNews] = useState();

  useEffect(() => {
    const getNewsById = async () => {
      const response = await fetch(`/api/getNews/${id}`);
      const result = await response.json();
      setSpeceficNews(result.data);
    };
    getNewsById();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        {speceficNews ? (
          <SpeceficNewsSection>
            <Title>{speceficNews.title}</Title>
            <Image src={`/image/${speceficNews.image}`} />
            <Category>{speceficNews.category}</Category>
            <Description
              dangerouslySetInnerHTML={{ __html: speceficNews.description }}
            />
          </SpeceficNewsSection>
        ) : (
          <Spinner />
        )}
        <RandomNewsSection>
          {speceficNews ? (
            <RandomNewsByCategory
              category={speceficNews.category}
              id={speceficNews._id}
            />
          ) : (
            <RandomNewsByCategory />
          )}
        </RandomNewsSection>
      </Wrapper>
      {speceficNews ? (
        userIsLogin ? (
          <>
            <CommentSectionTitle>
              <H2>Leave a comment</H2>
              <Line />
            </CommentSectionTitle>
            <Comments id={id} />
          </>
        ) : (
          <H4>
            Please log in if you want to add a comment or read all of the
            comments.
          </H4>
        )
      ) : null}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const RandomNewsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 100px;
  margin-right: 50px;
`;

const SpeceficNewsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 70px;
  width: 70%;
`;

const Image = styled.img`
  width: 90%;
  min-width: 400px;
  height: 400px;
`;

const Category = styled.h4`
  font-family: "Poppins", sans-serif;
  color: gray;
  min-width: 400px;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 45px;
  width: 90%;
  min-width: 400px;
`;

const Description = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 90%;
  white-space: pre-line;
`;

const CommentSectionTitle = styled.div`
  height: 80px;
  position: relative;
  right: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  & h2 {
    font-weight: 400;
    z-index: 1;
    background-color: #fff;
    padding: 0 30px;
  }
`;

const Line = styled.hr`
  width: 60%;
  border: 1px solid lightgray;
  position: absolute;
`;

const H2 = styled.h2`
  font-family: Acme;
  font-size: 28px;
`;

const H4 = styled.h4`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 2px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: grey;
  width: 40%;
  text-align: center;
  margin-left: 140px;
`;

export default NewsDetail;
