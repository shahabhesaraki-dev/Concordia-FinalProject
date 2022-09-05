import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../header";

const AddNews = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const postNews = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);

    fetch("/dashboard/addNews", {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((response) => {
        return response;
      });

    history.push("/");
  };

  return (
    <>
      <Header />
      <Section>
        <Wrapper>
          <Title>Add News</Title>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Label>Category</Label>
          <Input
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <Label>Description</Label>
          <Textarea
            rows="6"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Label>Image</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button onClick={postNews}>Submit</Button>
        </Wrapper>
      </Section>
    </>
  );
};

const Section = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 70%;
  min-height: 80vh;
  background-color: azure;
`;

const Title = styled.h1`
  font-size: 50px;
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 5px;
`;

const Input = styled.input`
  font-family: "Poppins", sans-serif;
  width: 50%;
  padding: 10px;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 15px;
  border-radius: 5px;
  outline: none;
`;

const FileInput = styled.input`
  font-family: "Poppins", sans-serif;
  width: 25%;
  padding: 10px;
  margin-left: 20px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  font-family: "Poppins", sans-serif;
  width: 50%;
  padding: 10px;
  margin-left: 20px;
  font-size: 15px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  padding: 10px 40px;
  width: 140px;
  text-align: center;
  background-color: #4681b6;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  margin-left: 25px;
  margin-top: 20px;
`;

export default AddNews;
