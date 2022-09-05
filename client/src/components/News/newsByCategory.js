import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../header";

const NewsByCategory = () => {
  const history = useHistory();
  const { categoryName } = useParams();
  const [newsByCategory, setNewsByCtegory] = useState();

  useEffect(() => {
    const getNewByCategory = async () => {
      const response = await fetch(`/api/category/${categoryName}`);
      const result = await response.json();
      setNewsByCtegory(result.data);
    };
    getNewByCategory();
  }, [categoryName]);

  return (
    <>
      <Header />
      <ProductsSectionTitle>
        <h2>{categoryName} News</h2>
        <Line />
      </ProductsSectionTitle>
      {newsByCategory &&
        newsByCategory.map((news, index) => {
          return (
            <Wrapper key={index}>
              <ImageSection>
                <Link to={`/news/${news._id}`}>
                  <Image src={`/image/${news.image}`} />
                </Link>
              </ImageSection>
              <DetailsSection>
                <Category>{news.category}</Category>
                <Title>{news.title}</Title>
                <Summary>{`${news.description.substring(0, 200)}...`}</Summary>
                <Button
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
                  }}
                >
                  Read more
                </Button>
              </DetailsSection>
            </Wrapper>
          );
        })}
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
  text-transform: uppercase;
  margin-top: 10px;
  & h2 {
    font-weight: 400;
    z-index: 1;
    background-color: #fff;
    padding: 0 30px;
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
  font-family: "Poppins", sans-serif;
  color: gray;
`;

const Title = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
`;

const Summary = styled.p`
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
`;

const Button = styled.button`
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

export default NewsByCategory;
