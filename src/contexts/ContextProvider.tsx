"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

const initialState = {
  chat: false,
  cart: false,
  profile: false,
  notification: false,
};

const StateContext = createContext<any>({});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (clicked: string) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
