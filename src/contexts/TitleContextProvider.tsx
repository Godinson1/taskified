"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useTitle } from "@/app/hooks/useTitle";

const TitleContext = createContext<any>({});

export const TitleContextProvider = ({ children }: { children: ReactNode }) => {
  const { addToTitles, titles } = useTitle();

  return (
    <TitleContext.Provider
      value={{
        titles,
        addToTitles,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export const useTitleContext = () => useContext(TitleContext);