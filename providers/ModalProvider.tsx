"use client"

import { createContext, ReactNode, useContext, useState } from "react";

// Interface of Modal Context Props
interface ModalContextProps {
    loginModal: boolean;
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
    signupModal: boolean;
    setSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
    calenderModal: boolean;
    setCalenderModal: React.Dispatch<React.SetStateAction<boolean>>;
    guestModal: boolean;
    setGuestModal: React.Dispatch<React.SetStateAction<boolean>>;
    locationModal: boolean;
    setLocationModal: React.Dispatch<React.SetStateAction<boolean>>;
    languageModal: boolean;
    setLanguageModal: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarToggle: boolean;
    setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
    isForgotMode: boolean;
    setIsForgotMode: React.Dispatch<React.SetStateAction<boolean>>;

}

// Created Context
const ModalContext = createContext<ModalContextProps | null>(null);

interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

    //* States
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [calenderModal, setCalenderModal] = useState(false);
    const [guestModal, setGuestModal] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [languageModal, setLanguageModal] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [isForgotMode, setIsForgotMode] = useState(false);


    // Context Values
    const contextValue: ModalContextProps = {
        loginModal,
        setLoginModal,
        signupModal,
        setSignupModal,
        calenderModal,
        setCalenderModal,
        guestModal,
        setGuestModal,
        locationModal,
        setLocationModal,
        languageModal,
        setLanguageModal,
        sidebarToggle,
        setSidebarToggle,
        isForgotMode,
        setIsForgotMode
    };

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to consume the context
const useModalContext = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }

    return context;
};

export { ModalProvider, useModalContext };
