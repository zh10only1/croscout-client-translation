"use client";

interface IDateRange {
  startDate: Date;
  endDate: Date;
  key?: string;
}

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ShareActive from "@/public/icons/share-active.svg";
import { FaChevronDown, FaRegCopy } from "react-icons/fa";
import { differenceInDays, format } from "date-fns";
import { useAuthContext } from "@/providers/AuthProvider";
import { IPropertyData } from "../[id]/page";
import { IoIosCloseCircle } from "react-icons/io";
import { DateRange } from "react-date-range";
import toast from "react-hot-toast";
import GuestCounter from "./GuestCounter";
import { Tooltip } from "flowbite-react";
import { ImSpinner9 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/providers/ModalProvider";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import ImageCarousel from "./ImageCarousel";
import { getUser } from "@/lib/database/authUser";
import { getStoredToken } from "@/utils/tokenStorage";
import { useTranslation } from "@/app/i18n/client";
import { getCurrentLng } from "@/utils/translation";

interface PropertyHeroProps {
  singlePropertyDetails?: IPropertyData["property"];
}

export default function PropertyHero({
  singlePropertyDetails,
}: PropertyHeroProps) {
  const lng: string = getCurrentLng();
  const { t } = useTranslation(lng, "propertyDetail");
  const [calendarModal, setCalenderModal] = useState(false);
  const [guestModal, setGuestModal] = useState(false);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [selectedDate, setSelectedDate] = useState<IDateRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [heroImage, setHeroImage] = useState<string | undefined>();
  const [seeAllImage, setSeeAllImage] = useState(
    singlePropertyDetails?.propertyImages.slice(0, 4)
  );
  const router = useRouter();

  const [showInput, setShowInput] = useState(false);
  const [urlToCopy, setUrlToCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  let formattedStartDate: any;

  let formattedEndDate: any;

  const startDate = new Date(selectedDate[0].startDate);
  const endDate = new Date(selectedDate[0].endDate);
  formattedStartDate = format(startDate, "MMM dd, yyyy");
  formattedEndDate = format(endDate, "MMM dd, yyyy");

  const daysDifference = differenceInDays(endDate, startDate);
  let nightFeeCalculation: any;
  if (singlePropertyDetails) {
    nightFeeCalculation = daysDifference * singlePropertyDetails?.pricePerNight;
  }

  const crouscouteServiceFee = 0;
  const { user, setUser } = useAuthContext();
  const { setLoginModal } = useModalContext();
  let totalGuests = childrenCount + adultsCount;

  const adminOrAgent = user?.role === "admin" || user?.role === "agent";

  const handleBooking = async () => {
    setIsLoading(true);

    const guestId = user?._id;
    const propertyId = singlePropertyDetails?._id;
    const price = nightFeeCalculation + crouscouteServiceFee;

    if (!user) {
      setIsLoading(false);
      toast.error("Login first");
      return setLoginModal(true);
    }

    if (!user.isCompletedProfile) {
      setIsLoading(false);
      return toast.error(
        "At first complete your profile in your profile settings.",
        { duration: 5000 }
      );
    }

    if (!isSelectDate) {
      setIsLoading(false);
      return toast.error("Date is required");
    }

    if (totalGuests <= 0) {
      setIsLoading(false);
      return toast.error("Guest is required");
    }

    // Check if guestId and propertyId are available
    if (!guestId || !propertyId) {
      console.error("Guest ID or property ID is not available for booking");
      setIsLoading(false);
      return;
    }

    // Create the booking data object
    const bookingData = {
      ownerId:
        typeof singlePropertyDetails?.owner === "object"
          ? singlePropertyDetails?.owner?._id
          : undefined,
      price,
      guestId,
      propertyId,
      totalGuests,
      startDate: new Date(selectedDate[0]?.startDate),
      endDate: new Date(selectedDate[0]?.endDate),
    };

    const token = getStoredToken();
    if (!token) throw new Error("Token is required for post and bookings");
    // Make the POST request with the booking data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(bookingData),
      }
    );

    const responseData = await response.json();
    if (responseData.success) {
      setIsLoading(false);
      router.push("/dashboard/user/my-bookings");
      return toast.success(responseData?.message);
    } else {
      setIsLoading(false);
      return toast.error(responseData?.error);
    }
  };

  // function for get all dates and this dates will be disable
  const alreadBookingDates =
    singlePropertyDetails?.bookedDates.flatMap((date: any) => {
      const { startDate, endDate } = date;
      const datesArray = [];
      let currentDate = new Date(startDate);
      const endDateTime = new Date(endDate);

      while (currentDate <= endDateTime) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return datesArray;
    }) ?? [];

  const maximumGuest = singlePropertyDetails?.guests || 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const previousDates = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date;
  });

  const allDisabledDates = [...previousDates, ...alreadBookingDates];

  // handler for add to favourites item
  const handleSaveToFavourites = async (id: string) => {
    try {
      // Toggle the favorite state
      if (!user) {
        toast.error("Login first!");
        return setLoginModal(true);
      }

      const token = getStoredToken();
      if (!token) throw new Error("Token is required for get Favorites");

      // Call the API to toggle the favorite status
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${user?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ propertyId: id }),
        }
      );
      // check response status
      if (!response.ok) {
        throw new Error("Failed to toggle favorite status");
      }

      // Result
      const result = await response.json();

      // toast message
      if (result.isAdd) {
        toast.success(result.message);
        const { user: refetchUser } = await getUser({ token });
        setUser(refetchUser);
        setIsFav(true);
        return;
      } else {
        toast.success(result.message);
        const { user: refetchUser } = await getUser({ token });
        setUser(refetchUser);
        setIsFav(false);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  let isExist;
  useEffect(() => {
    isExist = user?.favoriteList?.find(
      (propId) => propId === singlePropertyDetails?._id
    );
    // Check iffavoriteList is an array
    if (isExist) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [user?._id]);

  const handleShareClick = () => {
    setUrlToCopy(window.location.href);
    setShowInput(true);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);
      toast.success("URL copied successfully!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCloseClick = () => {
    setShowInput(false);
  };

  return (
    <section className="wrapper">
      {/* Top section */}
      <div className="text-white mt-6 lg:mt-10">
        <h1 className="text-[2.625rem] font-bold">
          {singlePropertyDetails?.name}
        </h1>
        <div className="mt-6 lg:flex justify-between items-center">
          <p>
            {singlePropertyDetails?.state}, {singlePropertyDetails?.location}
          </p>
          <div className="flex items-center gap-16 mt-4 lg:mt-0">
            <div className="flex items-center gap-3 cursor-pointer">
              {showInput ? (
                <div className="flex gap-3 transition-all ease-in-out duration-300">
                  <input
                    type="text"
                    value={urlToCopy}
                    className="bg-white-50 text-black rounded-md border-none opacity-100 scale-100"
                  />
                  <button
                    onClick={handleCopyClick}
                    className={`text-xl ${
                      isCopied ? "text-green-500" : "text-[#25F299]"
                    }`}
                  >
                    <FaRegCopy />
                  </button>
                  <button onClick={handleCloseClick}>{t("CLOSE")}</button>
                </div>
              ) : (
                <button
                  onClick={handleShareClick}
                  className="flex gap-3 transition-all ease-in-out duration-300"
                >
                  <Image src={ShareActive} height={24} width={24} alt="" />
                  <div>{t("SHARE")}</div>
                </button>
              )}
            </div>
            {user?.role === "admin" || user?.role === "agent" ? (
              " "
            ) : (
              <div
                onClick={() => {
                  if (singlePropertyDetails?._id)
                    handleSaveToFavourites(singlePropertyDetails._id);
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                {isFav ? (
                  <IoMdHeart className="text-2xl rounded-full text-accent"></IoMdHeart>
                ) : (
                  <IoMdHeartEmpty className="text-2xl rounded-full text-accent"></IoMdHeartEmpty>
                )}
                <div>{isFav ? t("SAVED") : t("SAVE")}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="pt-[3.75rem]">
        <div className=" flex md:flex-row flex-col gap-6">
          <div className="flex-1 flex-grow block">
            {singlePropertyDetails?.propertyImages
              .slice(0, 1)
              .map((imageUrl: string, index: number) => (
                <>
                  <div className="h-full">
                    <Image
                      key={index}
                      src={heroImage || imageUrl}
                      width={725}
                      height={686}
                      className="w-full h-full hidden md:block object-cover object-center border-accent border-[2px] rounded-[10px]"
                      alt={`Property Image ${index + 1}`}
                    ></Image>
                  </div>
                  <div className="h-[15rem] w-full relative rounded-t-[4px] overflow-hidden md:hidden">
                    <ImageCarousel
                      propertyId={singlePropertyDetails?._id}
                      propertyImages={singlePropertyDetails?.propertyImages}
                    />
                  </div>
                </>
              ))}
          </div>
          <div className="text-white">
            <div
              // onSubmit={(e) => e.preventDefault()}
              className="border border-accent rounded-[10px] overflow-hidden"
            >
              <div className="lg:px-36 text-center font-bold text-[1.5rem] py-6 bg-accent">
                {t("SELECT_CHECK_IN_DATE")}
              </div>
              <div className="grid grid-cols-2 px-4 lg:px-[2.5rem] py-[1.25rem] gap-[1.25rem] bg-secondary">
                <div className="col-span-2">
                  {/*//? Check in and check out label */}
                  <div className="mb-3">
                    <label
                      htmlFor="checkIn"
                      className="text-[1.25rem] font-semibold"
                    >
                      {t("CHECK_IN_CHECK_OUT")}
                    </label>
                  </div>

                  {/*//? Check in and check out input section start */}
                  <div
                    onClick={() => setCalenderModal(true)}
                    className={
                      "mb-10 cursor-pointer border-accent col-span-2  lg:col-span-1 divide-x-2 py-3 bg-transparent border duration-100 rounded-[5px] grid grid-cols-2"
                    }
                  >
                    {/* Check In */}
                    <div className="flex  items-center gap-2 text-white px-2 lg:px-5 ">
                      <Image
                        src="/icons/bookingIcon.svg"
                        height={24}
                        width={24}
                        alt="img"
                      />
                      <div className="lg:leading-5">
                        {formattedStartDate !== formattedEndDate ? (
                          <>
                            <div className="text-sm lg:text-base lg:leading-5">
                              {format(
                                new Date(selectedDate[0].startDate),
                                "MMM dd, yyyy"
                              )}
                            </div>
                            <div className="text-sm lg:text-base lg:leading-5">
                              {format(
                                new Date(selectedDate[0].startDate),
                                "EEEE"
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm lg:text-base lg:leading-5">
                              {t("CHECK_IN")}
                            </div>
                            <div className="text-sm lg:leading-5 text-gray-300">
                              {t("ADD_DATES")}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Check Out */}
                    <div className="flex items-center gap-2 text-white px-2 lg:px-5  relative">
                      <Image
                        src="/icons/bookingIcon.svg"
                        height={24}
                        width={24}
                        alt="img"
                      />
                      <div>
                        {formattedStartDate !== formattedEndDate ? (
                          <>
                            <div className="text-sm lg:text-base lg:leading-5">
                              {format(
                                new Date(selectedDate[0].endDate),
                                "MMM dd, yyyy"
                              )}
                            </div>
                            <div className="text-sm lg:text-base lg:leading-5">
                              {format(
                                new Date(selectedDate[0].endDate),
                                "EEEE"
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm lg:text-base lg:leading-5">
                                {t("CHECK_OUT")}
                            </div>
                            <div className="text-sm lg:leading-5 text-gray-300">
                                {t("ADD_DATES")}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Down Arrow Button */}
                      <FaChevronDown
                        className={"absolute right-1 lg:right-4 text-xl "}
                      />
                    </div>
                  </div>
                  {/*//? Check in and check out input section End */}

                  {/* calendar modal start */}
                  <div
                    className={`lg:fixed absolute z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${
                      calendarModal ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div
                      className={`lg:w-[470px]  bg-white rounded-lg text-black relative py-5 px-2 lg:px-10 duration-300 ${
                        calendarModal ? "scale-100" : "scale-0"
                      }`}
                    >
                      <div className="flex-between mb-5">
                        <h1 className="text-center flex-1 text-xl font-semibold text-secondary ">
                          {t("CALENDER")}
                        </h1>
                        <button
                          onClick={() => setCalenderModal(false)}
                          type="button"
                          className="text-3xl text-primary"
                        >
                          <IoIosCloseCircle />
                        </button>
                      </div>
                      <hr className="my-5" />

                      <div className="full-width-date-range flex flex-col items-center w-full">
                        <DateRange
                          disabledDates={allDisabledDates}
                          editableDateInputs={true}
                          onChange={(item: any) => {
                            setSelectedDate([item.selection]);
                            setIsSelectDate(true);
                          }}
                          moveRangeOnFirstSelection={false}
                          ranges={selectedDate}
                          direction="vertical"
                        />
                      </div>

                      {/* Close Modal */}
                      <button
                        className="w-full bg-rose-500 py-3 rounded-full text-white hover:bg-rose-400 duration-100"
                        onClick={() => setCalenderModal(false)}
                      >
                        {t("CONTINUE")}
                      </button>
                    </div>
                  </div>
                  {/* calendar modal end */}

                  {/*//? Guest label */}
                  <div className="mb-3">
                    <label
                      htmlFor="guest"
                      className="text-[1.25rem] font-semibold"
                    >
                        {t("GUESTS")}
                    </label>
                  </div>

                  {/*//? Guest input section start */}
                  <div
                    onClick={() => setGuestModal(true)}
                    className={
                      " border-accent duration-100 mb-8 lg:mb-0 col-span-2 lg:col-span-1 divide-x-2 py-3 bg-transparent border rounded-[5px] cursor-pointer grid grid-cols-2 relative"
                    }
                  >
                    <div className="flex items-center gap-2 text-white px-5 ">
                      <Image
                        src="/icons/people.svg"
                        height={24}
                        width={24}
                        alt="img"
                      />
                      <div className="">
                        {adultsCount > 0 || childrenCount > 0 ? (
                          <>
                            {adultsCount > 0 && (
                              <span>
                                {adultsCount} Adult{adultsCount > 1 && "s"}
                              </span>
                            )}
                            {adultsCount > 0 && childrenCount > 0 && (
                              <span>, </span>
                            )}
                            {childrenCount > 0 && (
                              <span>
                                {childrenCount} Children
                                {childrenCount > 1 && "s"}
                              </span>
                            )}
                          </>
                        ) : (
                          <span>{t("SELECT_GUESTS")}</span>
                        )}
                      </div>
                      <FaChevronDown
                        className={"absolute right-1 lg:right-4 text-xl "}
                      />
                    </div>
                    {/* Down Arrow Button */}
                  </div>
                  {/*//? Guest input section End */}

                  {/* guest modal start */}
                  <div
                    className={`fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 right-0 ${
                      guestModal ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div
                      className={`lg:w-[450px] bg-white rounded-lg text-black relative p-5 duration-300 ${
                        guestModal ? "scale-100" : "scale-0"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex-between ">
                          <h1 className="text-center flex-1 text-xl font-semibold text-secondary ">
                            Guests
                          </h1>
                          <button
                            onClick={() => setGuestModal(false)}
                            type="button"
                            className="text-3xl text-primary"
                          >
                            <IoIosCloseCircle />
                          </button>
                        </div>
                        <hr className="my-5" />
                        <div className="space-y-10">
                          <GuestCounter
                            onChange={(value) => setAdultsCount(value)}
                            value={adultsCount}
                            title={t("ADULTS")}
                            subtitle="Ages 18 or above"
                            maximumGuest={maximumGuest}
                            totalGuests={totalGuests}
                          />
                          {/* <hr /> */}
                          <GuestCounter
                            onChange={(value) => setChildrenCount(value)}
                            value={childrenCount}
                            title={t("CHILDREN")}
                            subtitle="Ages 0-17"
                            totalGuests={totalGuests}
                            maximumGuest={maximumGuest}
                          />
                        </div>
                      </div>
                      {/* Close Modal */}
                      <button
                        className="w-full bg-rose-500 select-none py-3 mt-10 rounded-full text-white hover:bg-rose-400 duration-100"
                        onClick={() => setGuestModal(false)}
                      >
                        {t("CONTINUE")}
                      </button>
                    </div>
                  </div>
                  {/* guest modal end */}

                  {/* Amount Section */}
                  <div className="text-[1.25rem] font-semibold col-span-2 mt-6">
                    <span className="font-normal">{t("PER_NIGHT")}</span> - €
                    {singlePropertyDetails?.pricePerNight}
                  </div>

                  <div className="flex justify-between lg:text-xl font-semibold my-3">
                    <span>
                      ({daysDifference} {t("NIGHT")} X €
                      {singlePropertyDetails?.pricePerNight})
                    </span>
                    <span>€{nightFeeCalculation}</span>
                  </div>

                  <div className="border-y border-y-accent py-3 my-5 flex justify-between">
                    <span className="">{t("CROSCOUT_SERVICES_FEE")}</span>
                    <span className="">€{crouscouteServiceFee}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="font-medium">{t("TOTAL")}</div>
                    <div className="font-medium border border-accent px-3 py-1.5 rounded">
                      €
                      {nightFeeCalculation &&
                        nightFeeCalculation + crouscouteServiceFee}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {adminOrAgent ? (
                      <div className="mt-9">
                        <Tooltip content={t("ADMIN_AGENT_CANT_RESERVE")}>
                          <button
                            disabled={adminOrAgent}
                            onClick={handleBooking}
                            style={{
                              boxShadow: "0px 4px 13px 0px rgba(0, 0, 0, 0.25)",
                            }}
                            className="bg-accent w-full lg:w-auto text-[1.25rem] font-bold py-4 px-[6.25rem] rounded-[5px]"
                          >
                            {t("RESERVE")}
                          </button>
                        </Tooltip>
                      </div>
                    ) : (
                      <button
                        onClick={handleBooking}
                        disabled={isLoading}
                        style={{
                          boxShadow: "0px 4px 13px 0px rgba(0, 0, 0, 0.25)",
                        }}
                        className="bg-accent mt-9 w-full lg:w-auto text-[1.25rem] font-bold py-4 px-[6.25rem] rounded-[5px]"
                      >
                        {isLoading ? (
                          <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                        ) : (
                          t("RESERVE")
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi Images Section */}
      <div className="md:grid grid-cols-4 gap-6 mt-6 hidden">
        {seeAllImage?.map((imageUrl: string, index: number) => (
          <Image
            onClick={() => setHeroImage(imageUrl)}
            key={index}
            src={imageUrl}
            width={302}
            height={227}
            className="w-full h-full object-cover object-center border-accent border-[2px] rounded-[10px] cursor-pointer"
            alt={`Property Image ${index + 1}`}
          ></Image>
        ))}
      </div>

      {(singlePropertyDetails?.propertyImages?.length ?? 0) > 5 && (
        <div className="lg:flex justify-center mt-[3.75rem] hidden">
          {seeAllImage?.length === 4 ? (
            <button
              onClick={() =>
                setSeeAllImage(
                  singlePropertyDetails?.propertyImages.slice(
                    0,
                    singlePropertyDetails?.propertyImages.length
                  )
                )
              }
              className="py-4 px-[3.75rem] text-white bg-accent text-[1.25rem] font-bold rounded-[5px]"
            >
              {t("SEE_ALL_PICTURES")}
            </button>
          ) : (
            <button
              onClick={() =>
                setSeeAllImage(
                  singlePropertyDetails?.propertyImages.slice(0, 4)
                )
              }
              className="py-4 px-[3.75rem] text-white bg-accent text-[1.25rem] font-bold rounded-[5px]"
            >
              {t("SEE_LESS_PICTURES")}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
