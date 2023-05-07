import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";

const AddNews = () => {
  const history = useHistory();
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
        history.push("/");
        window.location.reload();
      });
  };

  return (
    <>
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
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 65%;
  max-width: 100%;
  padding: 50px 50px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: Acme;
  text-align: center;
  margin-top: -15px;
  letter-spacing: 1px;
`;

const Label = styled.label`
  font-family: Abel;
  font-weight: 600;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 5px;
`;

const Input = styled.input`
  font-family: Open Sans;
  width: 50%;
  padding: 10px;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 15px;
  outline: none;
  border: 1px solid #ccc;
`;

const ImageLabel = styled.label`
  font-family: Abel;
  font-weight: 600;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 25px;
`;

const FileInput = styled.input`
  font-family: Abel;
  width: 25%;
  padding: 10px;
  margin-left: 20px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
`;

const StyledReactQuill = styled(ReactQuill)`
  font-family: Abel;
  width: 90%;
  margin-left: 20px;
  margin-top: 10px;
  height: 250px;
  background-color: white;
`;

const Button = styled.button`
  font-family: Abel;
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
  cursor: pointer;
`;

const Warning = styled.h4`
  font-family: Abel;
  font-size: 17px;
  color: red;
`;

const Success = styled.h4`
  font-family: Abel;
  color: green;
`;

export default AddNews;
