"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { supportedLngs } from "@/constant";

type SelectedLanguageType = string | null;

// Interface of Modal Context Props
interface LocalizationContextProps {
  selectedLanguage: SelectedLanguageType;
  setSelectedLanguage: React.Dispatch<
    React.SetStateAction<SelectedLanguageType>
  >;
}

// Created Context
const LocalizationContext = createContext<LocalizationContextProps | null>(
  null
);

interface LocalizationProviderProps {
  children: ReactNode;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  //* States
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>("");

  useEffect(() => {
    const currentPathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const segments = currentPathname.split("/");
    const lng: string = segments[1] || "";

    let language: string = "";
    for (const key in supportedLngs) {
      if (supportedLngs[key] === lng) {
        language = key;
        break;
      }
    }
    setSelectedLanguage(language);
  }, []);

  // Context Values
  const contextValue: LocalizationContextProps = {
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to consume the context
const useLocalizationContext = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export { LocalizationProvider, useLocalizationContext };
