import { createContext, useEffect, useState } from "react";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem("userID"));
  const [allNews, setAllNews] = useState([]);
  const [categories, setAllCategories] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allComments, setAllComments] = useState();
  const [speceficUser, setSpeceficUser] = useState();

  useEffect(() => {
    const getAllNews = async () => {
      const response = await fetch("/api/getAllNews");
      const result = await response.json();
      setAllNews(result.data);
    };
    getAllNews();

    const getAllCategories = async () => {
      const response = await fetch("/api/getCategories");
      const result = await response.json();
      setAllCategories(result.data);
    };
    getAllCategories();

    const getAllUsers = async () => {
      const response = await fetch("/api/users");
      const result = await response.json();
      setAllUsers(result.data);
    };
    getAllUsers();

    const getAllComments = async () => {
      const response = await fetch("/api/getComments");
      const result = await response.json();
      setAllComments(result.data);
    };
    getAllComments();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getUserFromDb = async () => {
      const response = await fetch(`/api/user/${userId.id}`);
      const result = await response.json();
      setSpeceficUser(result.data);
    };
    getUserFromDb();
    // eslint-disable-next-line
  }, [allUsers]);

  return (
    <AllContext.Provider
      value={{
        allNews,
        categories,
        userDetails,
        setUserDetails,
        allUsers,
        allComments,
        speceficUser,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
