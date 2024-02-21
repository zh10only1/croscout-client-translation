"use client"

import LoginForm from "@/components/AuthComponents/LoginForm";
import { useModalContext } from "@/providers/ModalProvider";
import GuestCounter from "../Inputs/GuestCounter";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useSearchContext } from "@/providers/SearchProvider";

const GuestModal = () => {
    const { guestModal, setGuestModal } = useModalContext();
    const { adultsCount, childrenCount, setAdultsCount, setChildrenCount } = useSearchContext();

    return (
        <div className={`fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${guestModal ? 'scale-100' : 'scale-0'}`}>
            <div className={`lg:w-[450px] bg-white rounded-lg text-black relative p-5 duration-300 ${guestModal ? 'scale-100' : 'scale-0'}`}>
                <div className="flex flex-col">
                    <div className="flex-between ">
                        <h1 className="text-center flex-1 text-xl font-semibold text-secondary ">Guests</h1>
                        <button
                            onClick={() => setGuestModal(false)}
                            type="button" className="text-3xl text-primary">
                            <IoIosCloseCircle />
                        </button>

                    </div>
                    <hr className="my-5" />
                    <div className="space-y-10">
                        <GuestCounter
                            onChange={(value) => setAdultsCount(value)}
                            value={adultsCount}
                            title="Adults"
                            subtitle="Ages 18 or above"
                        />
                        {/* <hr /> */}
                        <GuestCounter
                            onChange={(value) => setChildrenCount(value)}
                            value={childrenCount}
                            title="Children"
                            subtitle="Ages 0-17"
                        />
                    </div>
                </div>
                {/* Close Modal */}
                <button className="w-full bg-rose-500 select-none py-3 mt-10 rounded-full text-white hover:bg-rose-400 duration-100" onClick={() => setGuestModal(false)}>Continue</button>
            </div>
        </div>
    )
};

export default GuestModal;