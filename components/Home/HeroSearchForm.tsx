"use client"

import { useModalContext } from "@/providers/ModalProvider";
import Image from "next/image";
import PrimaryButton from "../ui/buttons/Button";
import { FaChevronDown } from "react-icons/fa";
import heroStyles from "./hero.module.css"
import { TextInput } from 'flowbite-react';
import { useSearchContext } from "@/providers/SearchProvider";
import { format } from "date-fns";
// import { searchProperties } from "@/utils/filterProperties";
import { goToSpecificSection } from "@/utils/goToSpecificSection";
import { calculateDuration } from "@/utils/calculateDuration";
import AddSearchValueBtn from "../ui/buttons/AddSearchValueBtn";
import '../ui/buttons/addSearchValueBtn.css'
import { MdLocationOn } from "react-icons/md";
import { setSearchQuery } from "@/utils/searchQuery";
import { useTranslation } from "@/app/i18n";


const HeroSearchForm = async ({lng} : {lng: string;}) => {
    
    const { setCalenderModal, setGuestModal, setLocationModal } = useModalContext();
    const { childrenCount, adultsCount, searchCalDate, location, setLocation, isSearchBtnClicked, setIsSearchBtnClicked } = useSearchContext();
    
    // Selection Date formatted
    // const formattedStartDate = format(searchCalDate[0].startDate, "MMM dd, yyyy");
    // const formattedEndDate = format(searchCalDate[0].endDate, "MMM dd, yyyy");
    const { t } = await useTranslation(lng, 'home');
    
    let formattedStartDate: any;

    let formattedEndDate: any;

    let duration: any = "Anywhere";

    const startDate = new Date(searchCalDate[0].startDate);
    const endDate = new Date(searchCalDate[0].endDate);
    formattedStartDate = format(startDate, "MMM dd, yyyy");
    formattedEndDate = format(endDate, "MMM dd, yyyy");

    duration = calculateDuration(searchCalDate[0].startDate, searchCalDate[0].endDate);

    // const formattedStartDate = format(new Date(searchCalDate[0].startDate), "MMM dd, yyyy");
    // const formattedEndDate = format(new Date(searchCalDate[0].endDate), "MMM dd, yyyy");


    // Use calculateDuration function to get the duration



    // Guest Calculation
    let guests = childrenCount + adultsCount;


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        goToSpecificSection('filter-section')
        setIsSearchBtnClicked(true);
        if (location) {
            setSearchQuery("location", location);
        }
        if (guests > 0) {
            setSearchQuery("guest", guests.toString());
        }

    }


    return (

        // Search Submission 
        <form onSubmit={handleSearch}>
            {/* Search Label */}
            <div className="flex select-none  justify-center absolute left-0 right-0 md:-top-10 -top-14">
                <div
                    className="flex py-2 px-2 cursor-pointer rounded-full active:scale-[.99] duration-200 text-white bg-primary text-sm md:text-lg "
                >
                    {/* Add Location */}
                    <AddSearchValueBtn
                        id="add-location"
                        onClick={() => setLocationModal(true)}
                    >
                        {location ? location : t("HOME_SEARCH_ANYWHERE")}
                    </AddSearchValueBtn>

                    {/* Add Dates */}
                    <AddSearchValueBtn
                        id="add-dates"
                        isBorderX={true}
                        onClick={() => setCalenderModal(true)}
                    >
                        {(duration === '0 week' || duration === '0 day') ? t("HOME_SEARCH_ANY_WEEK") : duration}
                    </AddSearchValueBtn>

                    {/* Add Guests */}
                    <AddSearchValueBtn
                        id="add-guests"
                        onClick={() => setGuestModal(true)}
                    >
                        {guests ? (`${guests} ${guests === 1 ? 'Guest' : 'Guests'}`) : t("HOME_SEARCH_ADD_GUESTS")}
                    </AddSearchValueBtn>
                </div>
            </div>

            {/* Search Form Values */}
            <div className="">

                {/* location */}
                <div
                    onClick={() => setLocationModal(true)}
                    className="p-4 relative hover:border-accent duration-200 flex items-center gap-2 cursor-pointer mt-6 lg:mt-0 md:p-5 bg-transparent outline-none border border-white-50 placeholder:text-gray-300 rounded-[5px] w-full text-white"
                >
                    <MdLocationOn className="text-2xl" />
                    <span>{location ? location : t("HOME_SEARCH_LOCATION_SELECT")}</span>
                    {/* Down Arrow Button */}
                    <FaChevronDown className={`absolute ${heroStyles.downArrow} right-1 lg:right-4 text-xl`} />
                </div>




                <div className="grid grid-cols-2 mt-5 gap-5">

                    {/* Date Selection */}
                    <div
                        onClick={() => setCalenderModal(true)}
                        className={`${heroStyles.dateSelectionButton} col-span-2  lg:col-span-1 divide-x-2 py-3 bg-transparent border duration-100 rounded-[5px] grid grid-cols-2`}>

                        {/* Check In */}
                        <div className="flex  items-center gap-2 text-white px-2 lg:px-5 ">
                            <Image src="/icons/bookingIcon.svg" height={24} width={24} alt="img" />
                            <div className="lg:leading-5">
                                {
                                    formattedStartDate !== formattedEndDate ? (
                                        <>
                                            <div className="text-sm lg:text-base lg:leading-5">
                                                {format(new Date(searchCalDate[0].startDate), "MMM dd, yyyy")}
                                            </div>
                                            <div className="text-sm lg:text-base lg:leading-5">
                                                {format(new Date(searchCalDate[0].startDate), "EEEE")}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm lg:text-base lg:leading-5">{t("HOME_SEARCH_CHECK_IN")}</div>
                                            <div className="text-sm lg:leading-5 text-gray-300">{t("HOME_SEARCH_ADD_PEOPLE")}</div>
                                        </>
                                    )
                                }
                            </div>

                        </div>

                        {/* Check Out */}
                        <div className="flex items-center gap-2 text-white px-2 lg:px-5  relative">
                            <Image src="/icons/bookingIcon.svg" height={24} width={24} alt="img" />
                            <div>
                                {
                                    formattedStartDate !== formattedEndDate ? (
                                        <>
                                            <div className="text-sm lg:text-base lg:leading-5">
                                                {format(new Date(searchCalDate[0].endDate), "MMM dd, yyyy")}
                                            </div>
                                            <div className="text-sm lg:text-base lg:leading-5">
                                                {format(new Date(searchCalDate[0].endDate), "EEEE")}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm lg:text-base lg:leading-5">{t("HOME_SEARCH_CHECK_OUT")}</div>
                                            <div className="text-sm lg:leading-5 text-gray-300">{t("HOME_SEARCH_ADD_PEOPLE")}</div>
                                        </>
                                    )
                                }

                            </div>

                            {/* Down Arrow Button */}
                            <FaChevronDown className={`absolute ${heroStyles.downArrow} right-1 lg:right-4 text-xl`} />

                        </div>

                    </div>

                    {/* Add Guest */}
                    <div
                        onClick={() => setGuestModal(true)}
                        className={`${heroStyles.dateSelectionButton} duration-100 mb-8 lg:mb-0 col-span-2 lg:col-span-1 divide-x-2 py-3 bg-transparent border rounded-[5px] cursor-pointer grid grid-cols-2 relative`}>
                        <div className="flex items-center gap-2 text-white px-5 ">
                            <Image src="/icons/people.svg" height={24} width={24} alt="img" />
                            <div className="">
                                {
                                    adultsCount > 0 || childrenCount > 0 ? (
                                        <>
                                            {adultsCount > 0 && <span>{adultsCount} Adult{adultsCount > 1 && 's'}</span>}
                                            {adultsCount > 0 && childrenCount > 0 && <span>, </span>}
                                            {childrenCount > 0 && <span>{childrenCount} Children{childrenCount > 1 && 's'}</span>}
                                        </>
                                    ) : (
                                        <span>{t("HOME_SEARCH_SELECT_GUESTS")}</span>
                                    )
                                }
                            </div>
                            <FaChevronDown className={`absolute ${heroStyles.downArrow} right-1 lg:right-4 text-xl `} />
                        </div>
                        {/* Down Arrow Button */}

                    </div>
                </div>
            </div>

            {/* Search Button */}
            <div
                className={`flex justify-center absolute left-0 right-0 -bottom-6 lg:-bottom-8 `}

            >
                <button
                    className={`py-2 lg:py-[15px]  px-20
                    rounded-[5px] border  duration-100 cursor-pointer  bg-primary border-white text-white font-semibold hover:border-accent`}

                >
                    {t("HOME_SEARCH_BUTTON")}
                </button>

            </div >
        </form>
    );
};

export default HeroSearchForm;