"use client"

import { createContext, ReactNode, useContext, useState } from "react";

interface ToggleContextProps {
    navUserToggle: boolean;
    setNavUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
    taxToggle: boolean;
    setTaxToggle: React.Dispatch<React.SetStateAction<boolean>>;
    showSelectedOption: boolean;
    setShowSelectedOption: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleContext = createContext<ToggleContextProps | null>(null);

interface ToggleProviderProps {
    children: ReactNode;
}

const ToggleProvider: React.FC<ToggleProviderProps> = ({ children }) => {
    const [navUserToggle, setNavUserToggle] = useState(false);
    const [taxToggle, setTaxToggle] = useState(false);
    const [showSelectedOption, setShowSelectedOption] = useState(false);

    const contextValue: ToggleContextProps = {
        navUserToggle,
        setNavUserToggle,
        taxToggle,
        setTaxToggle,
        showSelectedOption, // Add this line
        setShowSelectedOption,
    };

    return (
        <ToggleContext.Provider value={contextValue}>
            {children}
        </ToggleContext.Provider>
    );
};

// Custom hook to consume the context
const useToggleContext = () => {
    const context = useContext(ToggleContext);

    if (!context) {
        throw new Error("useToggleContext must be used within a ToggleProvider");
    }

    return context;
};

export { ToggleProvider, useToggleContext };
