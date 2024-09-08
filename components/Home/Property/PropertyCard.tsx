"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import StarIcon from "@/public/icons/start.svg";
import FavOutline from "@/public/icons/love-outline.svg";
import FavFilled from "@/public/icons/love-filled.svg";
import ImageCarousel from "./ImageCarousel";
import { useRouter } from "next/navigation";
import { Property } from "@/constant";
import propertyStyles from "./property.module.css"
import { getPropertyById } from "@/lib/database/getProperties";
import { useAuthContext } from "@/providers/AuthProvider";
import { checkFavoriteProperty } from "@/lib/database/checkFavoriteProperty";
import toast from "react-hot-toast";
import { useModalContext } from "@/providers/ModalProvider";
import Link from "next/link";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { getStoredToken } from "@/utils/tokenStorage";
import { getUser } from "@/lib/database/authUser";
import { useTranslation } from "@/app/i18n/client";



interface Event {
    startDate: string;
    endDate: string;
    _id: string;
}

export default function PropertyCard({ property, lng }: Property & any,) {
    const { setLoginModal } = useModalContext();
    const { user, setUser } = useAuthContext();
    const [isActive, setIsActive] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isProgressive, setIsProgressive] = useState(false);

    const { t } = useTranslation(lng, "properties")

    const {
        _id,
        name,
        description,
        amenities,
        pricePerNight,
        location,
        state,
        propertyType,
        startDate,
        endDate,
        guests,
        propertyImages,
        bookedDates,
        ratings,
    } = property;



    let isExist;

    useEffect(() => {
        isExist = user?.favoriteList?.find(propId => propId === _id);

        // Check iffavoriteList is an array
        if (isExist) {
            setIsFav(true);
        } else {
            setIsFav(false);
        }
    }, [user?._id]);


    // Find next free days
    function findNextFreeDays(bookingDates: Event[]): string {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let freeDaysCount = 0;
        let startDate: Date, endDate: Date;

        for (const booking of bookingDates) {
            const bookingStartDate = new Date(booking.startDate);
            const bookingEndDate = new Date(booking.endDate);
            if (currentDate < bookingStartDate) {
                const daysDifference = Math.ceil((bookingStartDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

                if (freeDaysCount + daysDifference >= 3) {
                    endDate = new Date(currentDate.getTime() + (3 - freeDaysCount - 1) * 24 * 60 * 60 * 1000);
                    break;
                }

                freeDaysCount += daysDifference;
                currentDate.setTime(bookingEndDate.getTime() + 24 * 60 * 60 * 1000);
            } else {
                currentDate.setTime(bookingEndDate.getTime() + 24 * 60 * 60 * 1000);
            }
        }

        startDate = new Date(currentDate.getTime());
        endDate = new Date(currentDate.getTime() + (3 - freeDaysCount) * 24 * 60 * 60 * 1000);

        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        const formattedStartDate = startDate.toLocaleDateString('en-US', options);
        const formattedEndDate = endDate.toLocaleDateString('en-US', options);

        return `${formattedStartDate} - ${formattedEndDate}`;
    }

    const nextFreeDays: string = findNextFreeDays(property?.bookedDates);


    const handleFavorite = async () => {
        try {
            // Toggle the favorite state
            if (!user) {
                toast.error("Login first!")
                return setLoginModal(true);
            }

            setIsProgressive(true);

            const token = getStoredToken();
            if (!token) throw new Error('Token is required for handle favourite');

            // Call the API to toggle the favorite status
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${user?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ propertyId: _id }),
            });
            // console.log(56, response);

            // check response status
            if (!response.ok) {
                throw new Error('Failed to toggle favorite status');
            }

            // Result
            const result = await response.json();

            // Set the favorite status
            setIsFav(result.isAdd);
            setIsProgressive(false);
            // toast message
            if (result.isAdd) {
                toast.success(result.message);
                const { user: refetchUser } = await getUser({ token });
                setUser(refetchUser)
            } else {
                toast.success(result.message);
                const { user: refetchUser } = await getUser({ token });
                setUser(refetchUser)
            }

        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };



    const handleHover = () => {
        setIsActive(true);
    };

    const handleHoverOut = () => {
        setIsActive(false);
    };


    return (
        <div
            // onMouseEnter={handleHover}
            // onMouseLeave={handleHoverOut}

            className={`cursor-pointer relative border border-accent p-[5px] bg-secondary rounded-[8px] text-white `}
        >
            <div className="h-[15rem] w-full relative rounded-t-[4px] overflow-hidden">
                <ImageCarousel lng={lng} propertyId={_id} propertyImages={propertyImages} />
            </div>
            <Link href={`/${lng}/property-details/${_id}`}>
                <div
                    className="p-2 "
                // onClick={() => router.push(`/property-details/${_id}`)}
                >
                    <div
                        className={"mt-5"}>

                        {/* Location and State */}
                        <h1 className="text-xl font-bold">
                            {`${state.substring(0, 13)}, ${location.substring(0, 10)}`}
                        </h1>
                        {/* Location and State */}
                        {/* <h1 className="text-xl font-bold">
                        {`${name}`}
                    </h1> */}

                        {/* Property Type */}
                        <p className="mt-[10px]">{propertyType}</p>

                        {/* StartDate and End Date */}
                        <div>{nextFreeDays}</div>

                        {/* Price and Ratings */}
                        <div className="flex justify-between mt-[10px]">
                            {/* Price */}
                            <div className="text-accent font-semibold">€ {pricePerNight} {t("NIGHT")}</div>
                            <div className="flex items-center gap-1.5 border-b border-b-accent">
                                <div className="">
                                    <Image src={StarIcon} height={14} width={14} alt="img" />
                                </div>
                                {/* Ratings */}
                                <div className="font-semibold text-accent leading-[100%]">
                                    {(
                                        property?.feedbacks?.reduce((sum: any, feedback: any) => sum + feedback?.rating, 0) / property?.feedbacks?.length || 0
                                    )?.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {
                (user?.role === "admin" || user?.role === "agent") ? " " :

                    <button
                        type="button"
                        className="absolute z-10 top-5 right-5 cursor-pointer"
                        onClick={handleFavorite}
                        disabled={isProgressive}
                    >

                        <>
                            <span className='text-2xl text-white'>
                            </span>
                            <span className=''>
                                {
                                    isFav ?
                                        <IoMdHeart className="text-3xl text-accent p-1 rounded-full bg-white/50" />
                                        :
                                        <IoMdHeartEmpty className="text-3xl text-white-50 p-1 rounded-full bg-black/30" />
                                }
                            </span>
                        </>
                    </button>
            }

        </div>

    );
}
