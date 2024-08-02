"use client"

import { Property } from "@/constant";
import CheckmarkText from "./CheckmarkText";
import { useState } from "react";
import { IPropertyData } from "../[id]/page";
import { useTranslation } from "@/app/i18n/client";

interface PropertyAboutProps {
  singlePropertyDetails?: IPropertyData["property"];
  amenities?: string[];
  propertyImages?: string[]; 
}

export default function PropertyAbout({
  aboutDetails,
  lng
}: {
  aboutDetails?: PropertyAboutProps;
  lng: string;
}) {
  const { t } = useTranslation(lng, "propertyDetail");
  const [showAll, setShowAll] = useState(false);

  const maxDisplayedAmenities = 6;
  const amenitiesPerRow = 5;
  const showAllButton =
    (aboutDetails?.amenities?.length ?? 0) > maxDisplayedAmenities;

  const displayedAmenities = showAll
    ? aboutDetails?.amenities
    : (aboutDetails?.amenities || []).slice(0, maxDisplayedAmenities);

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="bg-secondary py-[6.875rem] mt-[6.875rem] text-white text-center">
      <div className="wrapper">
        <h1 className="text-[2.625rem] font-bold">{t("ABOUT_THIS_PLACE")}</h1>
        <p className="mt-3 leading-[1.625rem]">
          {t("CHARMING_PLACE_DESCRIPTION")}
        </p>
        <div className="mt-[3.75rem] grid grid-cols-2 gap-[5.25rem]">
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center">
            <div className="">
              <div className="col-span-2 lg:col-span-1">
                {displayedAmenities &&
                  displayedAmenities.map((amenity: string, index: number) => (
                    <CheckmarkText key={index}>{amenity}</CheckmarkText>
                  ))}
              </div>
            </div>
            {showAllButton && (
              <div className="col-span-2 lg:col-span-1 flex items-start m-0 p-0 mt-5">
                <button
                  onClick={handleShowAllClick}
                  className={`${
                    showAll && "px-12"
                  } w-full lg:w-auto btn-shadow text-white bg-accent py-3 px-[14px] rounded-[5px] font-bold text-[1.25rem]`}
                >
                  {showAll ? t("SHOW_LESS_AMENITIES") : t("SHOW_ALL_AMENITIES")}
                </button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            {(aboutDetails?.propertyImages || [])
              .slice(0, 1)
              .map((imageUrl: string, index: number) => (
                <img
                  key={index}
                  className="w-full h-full border-accent border-[2px] rounded-[10px]"
                  src={imageUrl}
                  alt={`Property Image ${index + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
