"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SelectedLanguageType = string | null;

// Interface of Modal Context Props
interface LocalizationContextProps {
    selectedLanguage: SelectedLanguageType;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<SelectedLanguageType>>;
}

// Created Context
const LocalizationContext = createContext<LocalizationContextProps | null>(null);

interface LocalizationProviderProps {
    children: ReactNode;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {

    //* States
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("");

    useEffect(() => {
        setSelectedLanguage(localStorage.getItem('selectedLanguage'))
    }, []);


    // Context Values
    const contextValue: LocalizationContextProps = {
        selectedLanguage,
        setSelectedLanguage
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
