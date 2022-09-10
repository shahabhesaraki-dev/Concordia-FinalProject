import { createContext, useEffect, useState } from "react";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [allNews, setAllNews] = useState([]);
  const [categories, setAllCategories] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allComments, setAllComments] = useState();

  useEffect(() => {
    const getAllNews = async () => {
      const response = await fetch("/api/getAllNews");
      const result = await response.json();
      setAllNews(result.data);
    };

    const getAllCategories = async () => {
      const response = await fetch("/api/getCategories");
      const result = await response.json();
      setAllCategories(result.data);
    };

    const getAllUsers = async () => {
      const response = await fetch("/api/users");
      const result = await response.json();
      setAllUsers(result.data);
    };

    const getAllComments = async () => {
      const response = await fetch("/api/getComments");
      const result = await response.json();
      setAllComments(result.data);
    };

    getAllNews();
    getAllCategories();
    getAllUsers();
    getAllComments();
  }, []);

  return (
    <AllContext.Provider
      value={{
        allNews,
        categories,
        userDetails,
        setUserDetails,
        allUsers,
        allComments,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
