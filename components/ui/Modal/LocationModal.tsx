"use client"

import LoginForm from "@/components/AuthComponents/LoginForm";
import { useModalContext } from "@/providers/ModalProvider";
import { IoIosCloseCircle } from "react-icons/io";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import { useMemo, useState } from "react";
import { useSearchContext } from "@/providers/SearchProvider";
import dynamic from "next/dynamic";

const LocationModal = () => {
    const { locationModal, setLocationModal } = useModalContext();
    const { location, setLocation, locationObject, setLocationObject } = useSearchContext();



    const Map = useMemo(() => dynamic(() => import('../../Map'), {
        ssr: false
    }), [locationObject]);


    return (
        <div className={`fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${locationModal ? 'scale-100' : 'scale-0'}`}>
            <div className={`lg:w-[650px] bg-white rounded-lg text-black relative p-5 duration-300 ${locationModal ? 'scale-100' : 'scale-0'}`}>
                <div className="flex-between mb-5">
                    <h1 className="text-center flex-1 text-xl font-semibold text-secondary ">Location</h1>
                    <button
                        onClick={() => setLocationModal(false)}
                        type="button" className="text-3xl text-primary">
                        <IoIosCloseCircle />
                    </button>

                </div>
                <hr />
                <div className="py-5">
                    <h1 className="text-2xl mb-2 font-semibold text-secondary">Where do you wanna go?</h1>
                    <p className="text-gray-500">Find the perfect location!</p>
                </div>
                <CountrySelect
                    value={locationObject}
                    onChange={(value) => {
                        if (value) {
                            setLocation(value?.label);
                        }
                        setLocationObject(value);
                    }}
                    isAddProperty={false}
                />
                <hr className="my-5" />
                <Map
                    center={locationObject?.latlng}
                />
                {/* Close Modal */}
                <button className="w-full bg-rose-500 py-3 mt-10 rounded-full text-white hover:bg-rose-400 duration-100" onClick={() => setLocationModal(false)}>Continue</button>
            </div>
        </div>
    )
};

export default LocationModal;