"use client";
import { getBookingDetails } from "@/lib/database/getBookingDetails";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { translateBookings } from "@/lib/database/getBookings";
import { useTranslation } from "@/app/i18n/client";

export interface IPropertyDetailsData {
  property: {
    name: string;
    description: string;
    amenities: string[];
    pricePerNight: number;
    location: string;
    state: string;
    propertyType: string;
    propertyImages: string[];
    owner: string;
    status: string;
    guests: string;
  };
  guest: {
    name: string;
  };
  owner: {
    name: string;
  };
  totalGuests: string;
  startDate: string;
  endDate: string;
  status: string;
  price: string;
  // ... other properties if needed
}

export interface IBooking {
  _id: string;
  // ... other fields that belong to a booking
}

const page = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  // State variable for booking details
  const [bookingDetails, setBookingDetails] = useState<IPropertyDetailsData>();

  // Retrieving booking ID from route parameters
  const { id } = useParams();

  const { t } = useTranslation(lng, "bookingDetails");

  // Initializing router
  const router = useRouter();

  // Effect hook to fetch booking details on component mount
  useEffect(() => {
    // Function to fetch booking details
    const fetchData = async () => {
      if (typeof id === "string") {
        // Fetching booking details by ID
        const bookingData = await getBookingDetails(id);
        const translationResponse = await translateBookings(
          [bookingData.booking],
          lng
        );
        if (translationResponse.success) {
          bookingData.booking = translationResponse.translatedBookings[0];
        }
        // Setting booking details
        setBookingDetails(bookingData.booking);
      }
    };

    // Calling fetchData function
    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      {bookingDetails && (
        <div className="flex flex-col gap-4 p-4 lg:p-16 bg-primary-50 text-secondary-50">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="font-semibold text-gray-300 text-lg md:text-xl">
              {t("RESERVATION_DETAILS")}
            </h1>
          </div>
          <div
            className="rounded-lg border border-gray-600 lg:p-6 bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <span className="font-normal text-gray-500 dark:text-gray-400 capitalize">
                {t("BOOKING_STATUS")} -{" "}
                <span className="font-semibold italic">
                  ({bookingDetails?.status})
                </span>
              </span>
            </div>
            <div className="lg:p-6 flex md:flex-row flex-col md:gap-6 gap-3">
              {bookingDetails?.property?.propertyImages &&
              bookingDetails?.property?.propertyImages?.length > 0 ? (
                <>
                  {bookingDetails?.property?.propertyImages
                    .slice(0, 4)
                    .map((imgSrc, index) => (
                      <Image
                        key={index}
                        className="rounded-md"
                        src={imgSrc}
                        alt={`${t("PROPERTY_IMAGE")} ${index + 1}`}
                        width={300}
                        height={250}
                      />
                    ))}
                </>
              ) : (
                <p>{t("NO_IMAGE_AVAILABLE")}</p>
              )}
            </div>
            <div className="p-6 grid gap-4 md:grid-cols-3">
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("GUEST_NAME")}
                </div>
                <div>{bookingDetails?.guest?.name}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("OWNER_NAME")}
                </div>
                <div>{bookingDetails?.owner?.name}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("CONFIRMATION_STATUS")}
                </div>
                <div>{bookingDetails?.status}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("CHECK_IN")}
                </div>
                <div>
                  {format(new Date(bookingDetails?.startDate), "MMM dd, yyyy")}
                </div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("CHECK_OUT")}
                </div>
                <div>
                  {format(new Date(bookingDetails?.endDate), "MMM dd, yyyy")}
                </div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("LOCATION")}
                </div>
                <div>{bookingDetails?.property?.location}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("ROOM_TYPE")}
                </div>
                <div>{bookingDetails?.property?.propertyType}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("NUMBER_OF_GUESTS")}
                </div>
                <div>
                  {t("GUESTS")}: {bookingDetails?.totalGuests}
                </div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("TOTAL_PRICE")}
                </div>
                <div>€ {bookingDetails?.price}</div>
              </div>
              <div className="grid gap-1">
                <div className="font-semibold text-gray-300 text-xl">
                  {t("SPECIAL_REQUESTS")}
                </div>
                <div>{t("NO_SMOKING_ROOM")}</div>
              </div>
            </div>
            <div className="lg:w-2/3 md:p-6">
              <div className="font-semibold text-gray-300 text-xl">
                {t("DESCRIPTION")}
              </div>
              <p className=" w-full">{bookingDetails?.property?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
