"use client";

import { defaultStates, multiCategory } from "@/constant";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import PrimaryButton from "../ui/buttons/Button";
import { useSearchContext } from "@/providers/SearchProvider";
import { setSearchQuery } from "@/utils/searchQuery";
import { goToSpecificSection } from "@/utils/goToSpecificSection";

export default function MultiCategory() {
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const { setLocation } = useSearchContext();




    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleLocationSearch = (state: string) => {
        setLocation(state);
        setSearchQuery("location", state);
        goToSpecificSection('filter-section')
    }

    return (
        <div className="py-20 bg-secondary">
            <div className="wrapper">
                <p className="text-white font-semibold text-xl">
                    Inspiration for future getaways
                </p>
                {/* <div className="mt-10 flex max-w-screen lg:max-w-full overflow-x-scroll">
                    {multiCategory.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveCat(item.title)}
                            className={`pb-4 font-semibold border-b ${activCat === item.title && "border-accent"
                                } pr-14 text-white whitespace-nowrap cursor-pointer text-left`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div> */}
                <div className="grid grid-cols-6 mt-20 gap-5 lg:gap-20">
                    {defaultStates.map((state, index) => (
                        <div
                            key={index}
                            className="col-span-3 lg:col-span-1 text-lg font-semibold cursor-pointer text-white whitespace-nowrap"
                        >
                            <div className="flex items-center gap-2" onClick={() => handleLocationSearch(state)}>
                                {state}
                            </div>
                            {/* <div className="font-normal text-sm">{item?.subCat}</div> */}
                        </div>
                    )).slice(0, !showMoreClicked ? 18 : undefined)}
                </div>

                <div className="flex-center mt-20">
                    <PrimaryButton
                        onClick={() => setShowMoreClicked(prev => !prev)}
                        className="flex-center gap-x-3 bg-transparent px-7">
                        <span>{showMoreClicked ? 'See less' : 'See  more'}</span>
                        {!showMoreClicked ? <BsArrowRight /> : <BsArrowLeft />}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
