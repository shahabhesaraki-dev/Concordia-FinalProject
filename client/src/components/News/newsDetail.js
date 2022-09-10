import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";
import Comments from "../comments";
import Spinner from "../spinner";
const NewsDetail = () => {
  const { id } = useParams();

  const userIsLogin = localStorage.getItem("LogIn");

  const [speceficNews, setSpeceficNews] = useState();
  const [finalText, setFinalText] = useState("");

  useEffect(() => {
    const getNewsById = async () => {
      const response = await fetch(`/api/getNews/${id}`);
      const result = await response.json();
      setSpeceficNews(result.data);
      const finalText = await result.data.description;
      setFinalText(finalText);
    };
    getNewsById();
    // eslint-disable-next-line
  }, []);

  const NewlineText = (props) => {
    const text = props.text;
    const detail = text
      .split("\\n")
      .map((str, index) => <Description key={index}>{str}</Description>);
    return detail;
  };

  return (
    <>
      <Header />
      {speceficNews ? (
        <Wrapper>
          <Title>{speceficNews.title}</Title>
          <Image src={`/image/${speceficNews.image}`} />
          <Category>{speceficNews.category}</Category>
          <NewlineText text={finalText} />
        </Wrapper>
      ) : (
        <Spinner />
      )}
      {userIsLogin ? (
        <ProductsSectionTitle>
          <H2>Leave a comment</H2>
          <Line />
        </ProductsSectionTitle>
      ) : null}
      {userIsLogin ? <Comments id={id} /> : null}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 70px;
`;

const Image = styled.img`
  width: 60%;
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
  width: 60%;
  min-width: 400px;
`;

const Description = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 60%;
  min-width: 400px;
  white-space: pre-line;
`;

const ProductsSectionTitle = styled.div`
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
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 25px;
`;

export default NewsDetail;
