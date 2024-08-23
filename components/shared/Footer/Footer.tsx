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
                  <h2 className="text-xl font-semibold">{t("SUPPORT")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"#"}>{t("HELP_CENTER")}</Link>
                    <Link href={"#"}>{t("AIRCOVER")}</Link>
                    <Link href={"#"}>{t("ANTI_DISCRIMINATION")}</Link>
                    <Link href={"#"}>{t("DISABILITY_SUPPORT")}</Link>
                    <Link href={"#"}>{t("CANCELLATION_OPTIONS")}</Link>
                    <Link href={"#"}>{t("REPORT_NEIGHBORHOOD_CONCERN")}</Link>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <h2 className="text-xl font-semibold">{t("HOSTING")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"#"}>{t("CROSCOUT_YOUR_HOME")}</Link>
                    <Link href={"#"}>{t("CROSCOUT_FOR_HOSTS")}</Link>
                    <Link href={"#"}>{t("HOSTING_RESOURCES")}</Link>
                    <Link href={"#"}>{t("COMMUNITY_FORUM")}</Link>
                    <Link href={"#"}>{t("HOSTING_RESPONSIBLY")}</Link>
                    <Link href={"#"}>{t("CROSCOUT_FRIENDLY_APARTMENTS")}</Link>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1">
                  <h2 className="text-xl font-semibold">{t("CROSCOUT")}</h2>
                  <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                    <Link href={"#"}>{t("NEWSROOM")}</Link>
                    <Link href={"#"}>{t("NEW_FEATURES")}</Link>
                    <Link href={"#"}>{t("CAREERS")}</Link>
                    <Link href={"#"}>{t("INVESTORS")}</Link>
                    <Link href={"#"}>{t("GIFT_CARDS")}</Link>
                    <Link href={"#"}>{t("CROSCOUT_EU_EMERGENCY_STAYS")}</Link>
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
              <Link href="#">{t("FAQ")}</Link>
              <Link href="#">{t("IMPRINT")}</Link>
              <Link href="#">{t("PRIVACY")}</Link>
              <Link href="#">{t("AGB")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
