import styled from "styled-components";
import { AllContext } from "../Context/allContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";

const Slider = () => {
  const history = useHistory();
  const { categories } = useContext(AllContext);

  const [randomNews, setRandomNews] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getRandomNews = async () => {
      const response = await fetch(
        `https://mynewsprojectapp.herokuapp.com/api/getRandomNews`
      );
      const result = await response.json();
      setRandomNews(result.data);
    };
    getRandomNews();
  }, [categories]);

  useEffect(() => {
    const slider = setInterval(() => {
      if (currentIndex < 3) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [currentIndex]);

  return (
    <Section>
      {randomNews && currentIndex > 0 ? (
        <MinusButton onClick={() => setCurrentIndex(currentIndex - 1)}>
          {`<`}
        </MinusButton>
      ) : (
        <MinusButton disabled onClick={() => setCurrentIndex(currentIndex - 1)}>
          {`<`}
        </MinusButton>
      )}
      {randomNews ? (
        <Wrapper>
          <Image
            src={`https://mynewsprojectapp.herokuapp.com/image/${randomNews[currentIndex].image}`}
            onClick={() => {
              fetch(
                `https://mynewsprojectapp.herokuapp.com/api/${randomNews[currentIndex]._id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((result) => {
                return result.json();
              });

              history.push(`/news/${randomNews[currentIndex]._id}`);
            }}
          />
          <Title>{randomNews[currentIndex].title}</Title>
          <Category>{randomNews[currentIndex].category}</Category>
        </Wrapper>
      ) : (
        <Spinner />
      )}
      {currentIndex < 3 ? (
        <PlusButton onClick={() => setCurrentIndex(currentIndex + 1)}>
          {`>`}
        </PlusButton>
      ) : (
        <PlusButton disabled onClick={() => setCurrentIndex(currentIndex + 1)}>
          {`>`}
        </PlusButton>
      )}
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  position: relative;
  right: 40px;
  z-index: 1;
  font-size: 20px;
  border: none;
  border-radius: 50%;
`;

const MinusButton = styled.button`
  width: 30px;
  height: 30px;
  position: relative;
  left: 40px;
  z-index: 1;
  font-size: 20px;
  border: none;
  border-radius: 50%;
`;

const Title = styled.h3`
  font-family: Open Sans;
  position: absolute;
  top: 58%;
  left: 15%;
  opacity: 0;
  z-index: 1;
  font-weight: bold;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Category = styled.h4`
  font-family: Open Sans;
  position: absolute;
  top: 54%;
  left: 15%;
  opacity: 0;
  z-index: 1;
  color: grey;
  font-weight: bold;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 400px;
  &:hover ${Title} {
    opacity: 1;
  }
  &:hover ${Category} {
    opacity: 1;
  }
  &:hover ${Image} {
    opacity: 0.4;
  }
`;

export default Slider;
