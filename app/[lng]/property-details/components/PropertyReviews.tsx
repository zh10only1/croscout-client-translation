import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { useTranslation } from "@/app/i18n";

export default async function PropertyReviews({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, "propertyDetail");

  return (
    <div className="">
      <div className="wrapper">
        <div className="py-[6.875rem] text-white">
          <h1 className="text-[2.625rem] font-bold text-white">
            {t("THINGS_TO_KNOW")}
          </h1>
          <div className="mt-[3.75rem] grid grid-cols-3 gap-6">
            {/* Item 1 */}
            <div className="col-span-3 lg:col-span-1">
              <div className="text-xl leading-[220%] font-medium">
                {t("HOUSE_RULES")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("GUESTS_MAXIMUM")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("PETS_ALLOWED")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("SELF_CHECKIN")}
              </div>
              <div className="flex gap-3 items-center text-accent">
                <div className="text-xl text-accent font-medium leading-[220%]">
                  {t("SHOW_MORE")}
                </div>
                <BiChevronRight size={20} />
              </div>
            </div>

            {/* Item 2 */}
            <div className="col-span-3 lg:col-span-1">
              <div className="text-xl leading-[220%] font-medium">
                {t("SAFETY_AND_PROPERTY")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("NO_CARBON_MONOXIDE_ALARM")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("NO_SMOKE_ALARM")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("HEIGHTS_WITHOUT_RAILS")}
              </div>
              <div className="flex gap-3 items-center text-accent">
                <div className="text-xl text-accent font-medium leading-[220%]">
                  {t("SHOW_MORE")}
                </div>
                <BiChevronRight size={20} />
              </div>
            </div>

            {/* Item 3 */}
            <div className="col-span-3 lg:col-span-1">
              <div className="text-xl leading-[220%] font-medium">
                {t("CANCELLATION_POLICY")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("ADD_TRIP_DATES")}
              </div>
              <div className="text-xl leading-[220%] font-medium">
                {t("CANCELLATION_DETAILS")}
              </div>
              <div className="flex gap-3 items-center text-accent">
                <div className="text-xl text-accent font-medium leading-[220%]">
                  {t("ADD_DETAILS")}
                </div>
                <BiChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
