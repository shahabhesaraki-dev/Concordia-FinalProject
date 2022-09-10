import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa";

const Comments = ({ id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [messages, setMessages] = useState();

  const postComment = () => {
    const formData = {
      name: name,
      email: email,
      comment: comment,
      postId: id,
    };

    fetch("/api/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      });
    window.location.reload();
  };

  useEffect(() => {
    const getCommentsByPostId = async () => {
      const response = await fetch(`/api/getCommentsByPostId/${id}`);
      const result = await response.json();
      if (result.data) {
        setMessages(result.data);
      }
    };
    getCommentsByPostId();
  }, [id, messages]);

  return (
    <Wrapper>
      <FormSection>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Label>Comment</Label>
        <Textarea
          rows="6"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {name.length !== 0 && email.length !== 0 && comment.length !== 0 ? (
          <Button onClick={postComment}>Submit</Button>
        ) : (
          <>
            <Button>Submit</Button>
            <Warning>*All the fields are required!</Warning>
          </>
        )}
      </FormSection>
      <CommentSection>
        {messages ? <Title>All messages</Title> : null}
        {messages &&
          messages.map((message, index) => {
            return (
              <div key={index}>
                <ContentDiv>
                  <Name>
                    <FaUserTie size={20} />{" "}
                    {message.name.charAt(0).toUpperCase() +
                      message.name.slice(1)}
                  </Name>
                  <Comment>{message.comment}</Comment>
                </ContentDiv>
              </div>
            );
          })}
      </CommentSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 70px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 50%;
  min-height: 50vh;
  padding: 10px;
  background-color: #f5f5f5;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Label = styled.label`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: 200;
  font-size: 18px;
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
  border-radius: 5px;
  outline: none;
  border: 1px solid #a4a7ab;
`;

const Textarea = styled.textarea`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 50%;
  padding: 10px;
  margin-left: 20px;
  font-size: 15px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
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

const Title = styled.h2`
  font-size: 30px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
`;

const Name = styled.h3`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Comment = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 25px;
`;

const ContentDiv = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  background-color: #ececec;
  margin-top: 10px;
`;

const Warning = styled.h4`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: red;
`;
export default Comments;
