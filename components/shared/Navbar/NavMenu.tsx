"use client";

import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { VscGlobe } from "react-icons/vsc";
import Avatar from "./Avatar";
import { useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import navbarStyles from "./navbar.module.css";
import { useToggleContext } from "@/providers/ToggleProvider";
import { useModalContext } from "@/providers/ModalProvider";
import { useLocalizationContext } from "@/providers/LocalizationContext";
import { useTranslation } from "@/app/i18n/client";

const NavMenu = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "navbar");
  const [currentUser, setCurrent] = useState(false);
  const { navUserToggle, setNavUserToggle } = useToggleContext();
  const { languageModal, setLanguageModal, setSidebarToggle, sidebarToggle } =
    useModalContext();
  const { selectedLanguage } = useLocalizationContext();

  return (
    <ul
      className={`hidden md:flex items-center font-bold gap-7 text-[#f5f5f5] ${navbarStyles.navMenu}`}
    >
      <li>
        <Link href="#">{t('CROSCOUT_YOUR_HOME')}</Link>
      </li>
      <li>
        <Link
          onClick={() => setLanguageModal(true)}
          href={""}
          className="flex-center space-x-2"
        >
          <span>
            <VscGlobe />{" "}
          </span>
          <span>{selectedLanguage ? selectedLanguage : "English"}</span>
        </Link>
      </li>
      <li>
        <Link href="#">€EUR</Link>
      </li>

      {/* User Menu Icon */}
      <div
        onClick={() => setNavUserToggle((prev) => !prev)}
        className={navbarStyles.navMenuButton}
      >
        <AiOutlineMenu color="white" />
        <div className="hidden md:block">
          {currentUser ? (
            <Avatar />
          ) : (
            <div className="w-7 h-7 rounded-full bg-accent flex-center text-secondary text-sm">
              <FaUser />
            </div>
          )}
        </div>
      </div>
    </ul>
  );
};

export default NavMenu;
