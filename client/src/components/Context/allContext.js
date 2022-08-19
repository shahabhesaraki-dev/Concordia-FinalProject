import { createContext, useState } from "react";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [allnews, setAllNews] = useState([]);
  return (
    <AllContext.Provider value={{ allnews, setAllNews }}>
      {children}
    </AllContext.Provider>
  );
};
