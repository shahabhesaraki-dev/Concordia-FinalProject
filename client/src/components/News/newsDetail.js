import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";
const NewsDetail = () => {
  const { id } = useParams();

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
      ) : null}
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

export default NewsDetail;
