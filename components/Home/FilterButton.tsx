"use client"

import { useSearchContext } from "@/providers/SearchProvider";
import { useToggleContext } from "@/providers/ToggleProvider";
import { goToSpecificSection } from "@/utils/goToSpecificSection";
import Image from "next/image";
import filterButtonStyles from "./fiterbutton.module.css"
import { useEffect } from "react";
import { FaArrowDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { FaSortAlphaDown } from "react-icons/fa";
import { setSearchQuery } from "@/utils/searchQuery";
import { GiSettingsKnobs } from "react-icons/gi";
import { useTranslation } from "@/app/i18n/client";


const FilterButton = ({lng} : {lng: string}) => {
    const { taxToggle, setTaxToggle, filterToggle, setFilterToggle } = useToggleContext();
    const { isFilterSection, setIsFilterSection, currentFilter, setCurrentFilter } = useSearchContext();

    
    useEffect(() => {
        if (isFilterSection) {
            goToSpecificSection('filter-section');
        }
        setTimeout(() => {
            setIsFilterSection(false);
        }, 2000);
    }, [isFilterSection]);
    
    const { t } = useTranslation(lng, 'home');
    
    // function for remove search query
    const removeSearchQuery = (current: string) => {
        setCurrentFilter(current);
        setFilterToggle(false);
        goToSpecificSection('filter-section')
        if (current === "") {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete("newest");
            params.delete("price");
            params.delete("alphabate");
            url.search = params.toString();
            window.history.pushState(null, '', url.toString());
        }
    };

    // handler for newest filter
    const handleNewestFilter = () => {
        if (currentFilter === "newest") {
            return removeSearchQuery("")
        }
        removeSearchQuery("newest")
        setSearchQuery("newest", "true")
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.delete("alphabate");
        params.delete("price");
        url.search = params.toString();
        window.history.pushState(null, '', url.toString());
    }

    // handler for alphabatic filter
    const handleAphabaticFilter = (order: string) => {
        if (order === "asc") {
            if (currentFilter === "alphabateASC") {
                return removeSearchQuery("")
            }
            removeSearchQuery("alphabateASC")
            setSearchQuery("alphabate", order)
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete("newest");
            params.delete("price");
            url.search = params.toString();
            window.history.pushState(null, '', url.toString());
        }
        else if (order === "desc") {
            if (currentFilter === "alphabateDESC") {
                return removeSearchQuery("")
            }
            removeSearchQuery("alphabateDESC")
            setSearchQuery("alphabate", order)
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete("newest");
            params.delete("price");
            url.search = params.toString();
            window.history.pushState(null, '', url.toString());
        }
    }

    // handler for price filter
    const handlePriceFilter = (order: string) => {
        if (order === "asc") {
            if (currentFilter === "priceASC") {
                return removeSearchQuery("")
            }
            removeSearchQuery("priceASC");
            setSearchQuery("price", order)
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete("newest");
            params.delete("alphabate");
            url.search = params.toString();
            window.history.pushState(null, '', url.toString());
        }
        else if (order === "desc") {
            if (currentFilter === "priceDESC") {
                return removeSearchQuery("")
            }
            removeSearchQuery("priceDESC");
            setSearchQuery("price", order);
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.delete("newest");
            params.delete("alphabate");
            url.search = params.toString();
            window.history.pushState(null, '', url.toString());
        }
    }

    return (
        <>
            <div id="filter-section" className="mt-10 md:mt-[14rem]" />

            <section>
                <div className="flex gap-2 lg:gap-4 relative">
                    <button className="border px-[0.875rem] rounded-[3px] py-1 lg:py-3" onClick={() => setFilterToggle(pre => !pre)}>
                        <div className="flex items-center gap-2 text-white">
                            <GiSettingsKnobs className="rotate-90 text-xl" />
                            <div className=""> {t("HOME_FILTER_BUTTON")}</div>
                        </div>
                    </button>

                    <div className={`${filterButtonStyles.filterMenu} ${filterToggle ? "scale-y-100" : "scale-y-0"}`}>
                        <button
                            className={currentFilter === "newest" ? filterButtonStyles.activeButton : ""}
                            onClick={() => handleNewestFilter()}>
                            {t("HOME_FILTER_NEWEST")} <MdEvent className="inline" />
                        </button>
                        <button
                            className={currentFilter === "alphabateASC" ? filterButtonStyles.activeButton : ""}
                            onClick={() => handleAphabaticFilter("asc")}>
                            {t("HOME_FILTER_SORT_A_TO_Z")} <FaSortAlphaDown className="inline" />
                        </button>
                        <button
                            className={currentFilter === "alphabateDESC" ? filterButtonStyles.activeButton : ""}
                            onClick={() => handleAphabaticFilter("desc")}>
                            {t("HOME_FILTER_SORT_Z_TO_A")} <FaSortAlphaDownAlt className="inline" />
                        </button>
                        <button
                            className={currentFilter === "priceASC" ? filterButtonStyles.activeButton : ""}
                            onClick={() => handlePriceFilter("asc")}>
                            {t("HOME_FILTER_PRICE_L_TO_H")} <FaArrowUp className="inline" />
                        </button>
                        <button
                            className={currentFilter === "priceDESC" ? filterButtonStyles.activeButton : ""}
                            onClick={() => handlePriceFilter("desc")}>
                            {t("HOME_FILTER_PRICE_H_TO_L")} <FaArrowDown className="inline" />
                        </button>
                    </div>

                    {/* <div className="border px-[0.875rem] rounded-[3px] py-1 lg:py-3">
                        <div className="flex items-center gap-2 relative text-white">
                            <div className="">{t("HOME_FILTER_TAXES_TOGGLE")}</div>
                            <button
                                onClick={() => setTaxToggle((prev) => !prev)}
                                className={`relative w-11 h-6  rounded-full inline-flex items-center cursor-pointer duration-100 ${taxToggle ? 'bg-accent' : 'bg-gray-200'}`}
                            >
                                <div
                                    className={`w-5 absolute transform ${taxToggle ? 'translate-x-full' : 'translate-x-[3px]'
                                        } h-5 rounded-full bg-primary transition-all duration-200`}
                                ></div>
                            </button>
                        </div>
                    </div> */}

                </div>
            </section>
        </>
    );
};

export default FilterButton;