"use client";

import React from "react";
import FooterLogo from "@/public/images/footer-logo.svg";
import Image from "next/image";
import { BiGlobe } from "react-icons/bi";
import Link from "next/link";
import footerStyles from "./footer.module.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import MultiCategory from "@/components/Home/MultiCategory";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useLocalizationContext } from "@/providers/LocalizationContext";

const Footer = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "footer");
  // footer will be hidden if them pathname matches the include pathname
  const pathname = usePathname();
  const isFooterHidden =
    /\/reset-password\/[^/]+$/.test(pathname) ||
    /\/dashboard\/[^/]+$/.test(pathname);
  const isDashboard = pathname.includes("/dashboard");
  const isVerifyEmail = pathname.includes("/verify-email");
  const { selectedLanguage } = useLocalizationContext();

  const currentYear = new Date().getFullYear();
  return (
    <div hidden={isFooterHidden || isDashboard || isVerifyEmail}>
      <MultiCategory lng={lng} />
      <footer className={`bg-primary pt-20 ${footerStyles.footer}`}>
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between text-white pb-[60px]">
            <div className="flex justify-center md:flex-start">
              <div className="flex flex-col items-center">
                <Image src={FooterLogo} alt="logo" />
                <div className="flex md:gap-3 mt-6">
                  <div className="flex items-center gap-1.5 text-neutral-100  transition  cursor-pointer">
                    <BiGlobe />
                    <div>{selectedLanguage}</div>
                  </div>
                  <div className="hidden md:block text-neutral-100  transition  cursor-pointer">
                    €EUR
                  </div>
                </div>
                {/* Socials */}
                <div
                  className={`flex items-center gap-2.5 mt-10 ${footerStyles.socialIcons}`}
                >
                  <Link href="#">
                    <FaFacebook />
                  </Link>
                  <Link href="#">
                    <AiFillTwitterCircle />
                  </Link>
                  <Link href="#">
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-20 md:mt-0">
              <div className="grid grid-cols-3 gap-10 md:gap-[120px]">
                <div className="col-span-3 md:col-span-1">
                  <h2 className="text-xl font-semibold">{t("TRAVEL")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"https://kroatien-flug.de"}>{t("FLIGHTS_TO_CROATIA")}</Link>
                    <Link href={"https://kroatien-mietwagen.eu"}>{t("CAR_RENTAL_FOR_CROATIA")}</Link>
                    <Link href={"https://kroatien-hotels.eu"}>{t("HOTELS_IN_CROATIA")}</Link>
                    <Link href={"https://croatia-guide.de"}>{t("TRAVEL_GUIDE_FOR_CROATIA")}</Link>
                    <Link href={"https://kroatien-tip.de"}>{t("TIPS_FOR_CROATIA")}</Link>
                    <Link href={"https://kroatien-ausflug.de"}>{t("ADVENTURE_IN_CROATIA")}</Link>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <h2 className="text-xl font-semibold">{t("TIPS")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"https://inselwelt-kroatien.de"}>{t("ISLANDS_IN_CROATIA")}</Link>
                    <Link href={"https://kroatien-bikes.de"}>{t("BIKE_TOURS_IN_CROATIA")}</Link>
                    <Link href={"https://wetter-kroatien.eu"}>{t("WEATHER_IN_CROATIA")}</Link>
                    <Link href={"https://kroatien-food.de"}>{t("CROATIAN_FOOD")}</Link>
                    <Link href={"https://echarging-kroatien.de"}>{t("E_CHARGING_STATIONS_IN_CROATIA")}</Link>
                    <Link href={"https://ultra-kroatien.de"}>{t("ULTRA_FESTIVAL_IN_SPLIT")}</Link>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <h2 className="text-xl font-semibold">{t("OFFERS")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"https://kroatien-angebote.de"}>{t("HOLIDAY_DEALS_IN_CROATIA")}</Link>
                    <Link href={"https://kroatien-vergleich.de"}>{t("TRAVEL_COMPARISON_FOR_CROATIA")}</Link>
                    <Link href={"https://croatia-portal.de"}>{t("HOLIDAY_OFFERS_FOR_CROATIA")}</Link>
                    <Link href={"https://kroatien-rabatt.de"}>{t("DISCOUNTS_IN_CROATIA")}</Link>
                    <Link href={"https://kroatien-trip.de"}>{t("CROATIAN_TRIPS")}</Link>
                    <Link href={"https://sex-kroatien.de"}>{t("EROTIC_GUIDE_FOR_CROATIA")}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#666060]"></div>
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between text-white py-5">
            <div className="text-lg font-medium">
              © {currentYear} Croscout, Inc.
            </div>
            <div className="flex gap-4 md:gap-[32px] text-sm md:text-lg text-[#CBC9C9] font-medium">
              <a href={`@/FAQ.html`}>{t("FAQ")}</a>
              <Link href={`/${lng}/imprint`}>{t("IMPRINT")}</Link>
              <Link href={`/${lng}/privacy-protection`}>{t("PRIVACY")}</Link>
              <Link href={`/${lng}/terms-conditions`}>{t("AGB")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
