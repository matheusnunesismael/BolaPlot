import React, { useContext, createContext, useState, ReactNode } from "react";

const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  return (
    <GlobalContext.Provider
      value={{
        theme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
