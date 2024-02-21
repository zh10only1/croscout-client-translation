"use client"

import LoginForm from "@/components/AuthComponents/LoginForm";
import { languages } from "@/constant";
import { useLocalizationContext } from "@/providers/LocalizationContext";
import { useModalContext } from "@/providers/ModalProvider";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const LanguageModal = () => {
    const { languageModal, setLanguageModal } = useModalContext();
    const { setSelectedLanguage, selectedLanguage } = useLocalizationContext();
    const [language, setLanguage] = useState('');


    return (
        <div className={`fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${languageModal ? 'scale-100' : 'scale-0'}`}>
            <div className={`lg:w-[450px] bg-white rounded-lg text-black relative p-5 duration-300 ${languageModal ? 'scale-100' : 'scale-0'}`}>

                {/* Title */}
                {/* Close Modal */}
                <div className="flex justify-end items-center ">
                    <h3 className="text-3xl  flex-1 text-center font-semibold text-secondary">Language</h3>
                    <button className="text-4xl" onClick={() => setLanguageModal(false)}><IoIosCloseCircle /></button>
                </div>

                <hr className="my-5" />
                <div className="grid grid-cols-3 gap-7">
                    {
                        languages.map((lang, index) => (
                            <button
                                className={`select-none text-primary hover:underline ${language === lang && 'font-bold'}`}
                                key={index}
                                onClick={() => {
                                    setLanguage(lang);
                                }}
                            >{lang}</button>
                        ))
                    }
                </div>
                {/* Close Modal */}
                <button className="w-full bg-rose-500 py-3 mt-10 rounded-full text-white hover:bg-rose-400 duration-100" onClick={() => {
                    setLanguageModal(false);
                    localStorage.setItem('selectedLanguage', language);
                    setSelectedLanguage(language);
                }}>Update</button>
            </div>
        </div>
    )
};

export default LanguageModal;