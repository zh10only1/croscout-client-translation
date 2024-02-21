import { useEffect, useState } from "react"

export const useSelectedLanguage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("English");
    useEffect(() => {
        setSelectedLanguage(localStorage.getItem('selectedLanguage'));
    }, [selectedLanguage]);

    return { selectedLanguage, setSelectedLanguage };
}