import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../spinner";

const RandomNewsByCategory = ({ category, id }) => {
  const history = useHistory();
  const [allNewsByCategory, setAllNewsByCategory] = useState();

  useEffect(() => {
    const getRandomNews = async () => {
      const response = await fetch(`/api/getRandomNewsByCategory/${category}`);
      const result = await response.json();
      setAllNewsByCategory(result.data);
    };

    getRandomNews();
  }, [category]);

  return (
    <Wrapper>
      {allNewsByCategory ? <H2>Related News</H2> : null}
      {allNewsByCategory && allNewsByCategory.length === 1 ? (
        <NoNews>There are no related posts for this news!</NoNews>
      ) : null}
      {allNewsByCategory ? (
        allNewsByCategory.map((news, index) => {
          if (news._id !== id) {
            return (
              <div key={index}>
                <Image
                  onClick={() => {
                    fetch(`/api/${news._id}`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then((result) => {
                      return result.json();
                    });

                    history.push(`/news/${news._id}`);
                    window.location.reload();
                  }}
                  src={`/image/${news.image}`}
                />
                <Title>{news.title}</Title>
              </div>
            );
          } else {
            return null;
          }
        })
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const Image = styled.img`
  width: 80%;
  margin-left: 40px;
  height: 200px;
  margin-top: 15px;
`;

const H2 = styled.h2`
  font-family: Acme;
  font-size: 35px;
  text-align: center;
`;

const Title = styled.h4`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 40px;
  width: 80%;
  text-align: center;
  position: relative;
  top: -10px;
`;

const NoNews = styled.h4`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 40px;
  width: 80%;
  text-align: center;
  position: relative;
  top: -10px;
  color: gray;
`;

export default RandomNewsByCategory;
