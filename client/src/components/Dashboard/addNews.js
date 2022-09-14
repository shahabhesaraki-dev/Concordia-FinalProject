import React, { useState } from "react";
import styled from "styled-components";
import Header from "../header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const newPostApproved = localStorage.getItem("newPost");

  const postNews = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);

    fetch("/api/dashboard/addNews", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        localStorage.setItem("newPost", JSON.stringify(result.reservedId));
        return result;
      })
      .then(() => {
        setTitle("");
        setCategory("");
        setDescription("");
        setFile("");
        window.location.reload();
      });
  };

  return (
    <>
      <Header />
      <Section>
        <Wrapper>
          <Title>Add News</Title>
          {newPostApproved ? (
            <Success>A new post was successfully published.</Success>
          ) : null}
          <Label>Title</Label>
          <Input
            type="text"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Label>Category</Label>
          <Input
            type="text"
            value={category || ""}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <Label>Description</Label>
          {/* <Textarea
            rows="6"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          /> */}
          <StyledReactQuill
            theme="snow"
            value={description || ""}
            onChange={setDescription}
          />
          <ImageLabel>Image</ImageLabel>
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {title.length !== 0 &&
          category.length !== 0 &&
          description.length !== 0 &&
          file ? (
            <Button onClick={postNews}>Submit</Button>
          ) : (
            <>
              <Button>Submit</Button>
              <Warning>*All the fields are required!</Warning>
            </>
          )}
        </Wrapper>
      </Section>
    </>
  );
};

const Section = styled.div`
  display: flex;
  padding: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 70%;
  padding: 30px 10px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
  margin-top: -15px;
`;

const Label = styled.label`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: 200;
  font-size: 17px;
  margin-left: 20px;
  margin-top: 5px;
`;

const Input = styled.input`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 50%;
  padding: 10px;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 15px;
  outline: none;
  border: 1px solid #ccc;
`;

const ImageLabel = styled.label`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: 200;
  font-size: 17px;
  margin-left: 20px;
  margin-top: 25px;
`;

const FileInput = styled.input`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 25%;
  padding: 10px;
  margin-left: 20px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
`;

const StyledReactQuill = styled(ReactQuill)`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 90%;
  /* padding: 10px; */
  margin-left: 20px;
  margin-top: 10px;
  height: 250px;
  background-color: white;
`;

const Button = styled.button`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  padding: 10px 40px;
  width: 140px;
  text-align: center;
  background-color: #413d3e;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  margin-left: 25px;
  margin-top: 20px;
`;

const Warning = styled.h4`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: red;
`;

const Success = styled.h4`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: green;
`;

export default AddNews;
