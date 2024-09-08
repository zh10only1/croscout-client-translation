"use client";
import React, { useState } from "react";
import styles from "./sidebar.module.css";
import userImg from "@/public/noavatar.png";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdEuroSymbol,
} from "react-icons/md";

import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import { useModalContext } from "@/providers/ModalProvider";
import { useAuthContext } from "@/providers/AuthProvider";
import MenuLink from "./MenuLink/MenuLink";
import Loading from "@/components/ui/Loading/Loading";
import { FaMagento, FaStar, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AiFillPropertySafety } from "react-icons/ai";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { SiCodereview } from "react-icons/si";
import { useTranslation } from "@/app/i18n/client";

export default function Sidebar({ lng }: { lng: string }) {
  const { sidebarToggle, setSidebarToggle } = useModalContext();
  const { user } = useAuthContext();
  const role = user?.role;
  const { t } = useTranslation(lng, "sidebar");

  // User Dashboard Menu Items
  const userMenuItems = [
    {
      title: t("PAGES"),
      list: [
        {
          title: t("MY_BOOKINGS"),
          path: `/${lng}/dashboard/user/my-bookings`,
          icon: <MdShoppingBag />,
        },
        {
          title: t("TRANSACTIONS"),
          path: `/${lng}/dashboard/user/transactions`,
          icon: <MdEuroSymbol />,
        },
        {
          title: t("FAVORITES"),
          path: `/${lng}/dashboard/user/favorites`,
          icon: <FaStar />,
        },
        // {
        //     title: t("FEEDBACK"),
        //     path: `/${lng}/dashboard/user/feedback`,
        //     icon: <SiCodereview />,
        // },
      ],
    },
    // {
    //     title: t("ANALYTICS"),
    //     list: [
    //         {
    //             title: t("REVENUE"),
    //             path: "#",
    //             icon: <MdWork />,
    //         }
    //     ],
    // },
    {
      title: t("USER"),
      list: [
        {
          title: t("PROFILE_SETTINGS"),
          path: `/${lng}/dashboard/user/profile`,
          icon: <MdOutlineSettings />,
        },
      ],
    },
  ];

  // Agent Dashboard Menu Items
  const agentMenuItems = [
    {
      title: t("PAGES"),
      list: [
        {
          title: t("DASHBOARD"),
          path: `/${lng}/dashboard`,
          icon: <MdDashboard />,
        },
        {
          title: t("ADD_PROPERTY"),
          path: `/${lng}/dashboard/agent/add-property`,
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: t("MANAGE_PROPERTIES"),
          path: `/${lng}/dashboard/agent/manage-properties`,
          icon: <MdShoppingBag />,
        },
        {
          title: t("CUSTOMER_BOOKINGS"),
          path: `/${lng}/dashboard/agent/bookings`,
          icon: <MdShoppingBag />,
        },
        {
          title: t("TRANSACTIONS"),
          path: `/${lng}/dashboard/agent/transactions`,
          icon: <MdEuroSymbol />,
        },
      ],
    },
    // {
    //     title: t("ANALYTICS"),
    //     list: [
    //         {
    //             title: t("REVENUE"),
    //             path: "#",
    //             icon: <MdWork />,
    //         }
    //     ],
    // },
    {
      title: t("USER"),
      list: [
        {
          title: t("PROFILE_SETTINGS"),
          path: `/${lng}/dashboard/agent/profile`,
          icon: <MdOutlineSettings />,
        },
      ],
    },
  ];

  // Admin Dashboard Menu Items
  const adminMenuItems = [
    {
      title: t("PAGES"),
      list: [
        {
          title: t("DASHBOARD"),
          path: `/${lng}/dashboard`,
          icon: <MdDashboard />,
        },
        {
          title: t("TRANSACTIONS"),
          path: `/${lng}/dashboard/admin/transactions`,
          icon: <MdEuroSymbol />,
        },
        {
          title: t("USERS"),
          path: `/${lng}/dashboard/admin/all-users`,
          icon: <FaUserAlt />,
        },
        {
          title: t("AGENTS"),
          path: `/${lng}/dashboard/admin/all-agents`,
          icon: <FaMagento />,
        },
        {
          title: t("ALL_BOOKINGS"),
          path: `/${lng}/dashboard/admin/all-bookings`,
          icon: <MdShoppingBag />,
        },
        {
          title: t("ALL_PROPERTIES"),
          path: `/${lng}/dashboard/admin/all-properties`,
          icon: <HiOutlineHomeModern />,
        },
      ],
    },
    // {
    //     title: t("ANALYTICS"),
    //     list: [
    //         {
    //             title: t("REVENUE"),
    //             path: "#",
    //             icon: <MdWork />,
    //         }
    //     ],
    // },
    {
      title: t("USER"),
      list: [
        {
          title: t("PROFILE_SETTINGS"),
          path: `/${lng}/dashboard/admin/profile`,
          icon: <MdOutlineSettings />,
        },
      ],
    },
  ];

  const router = useRouter();
  const handleToggleSidebar = () => {
    setSidebarToggle(false);
  };

  // Define a function to handle the navigation and sidebar toggle
  const handleNavigationAndToggle = () => {
    router.replace(`/${lng}/dashboard/${user?.role}/profile`);
    handleToggleSidebar();
  };

  return (
    <div>
      <div className={`${styles.container}`}>
        <div
          className="flex gap-4 items-center mb-4"
          onClick={() =>
            router.replace(`/${lng}/dashboard/${user?.role}/profile`)
          }
        >
          <Image
            src={user?.image || userImg}
            alt="userImage"
            width={200}
            height={100}
            className="rounded-full w-14 h-14 border-white border"
          />
          <div className="flex flex-col">
            <span>{user?.name}</span>
            <span className="text-sm text-gray-300">{user?.role}</span>
          </div>
        </div>

        <ul className={styles.list}>
          {role === "user" &&
            userMenuItems.map((cat) => (
              <li key={cat.title} className="mb-4">
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          {role === "agent" &&
            agentMenuItems.map((cat) => (
              <li key={cat.title} className="mb-4">
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          {role === "admin" &&
            adminMenuItems.map((cat) => (
              <li key={cat.title} className="mb-4">
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
        </ul>
      </div>

      {sidebarToggle && (
        <div
          onClick={() => setSidebarToggle((pre) => !pre)}
          className="text-3xl cursor-pointer block lg:hidden top-4 right-5 z-50 fixed "
        >
          <IoIosCloseCircle />
        </div>
      )}

      {/*//* ------Mobile Version-------*/}
      <div
        className={`z-40 pt-14 block lg:hidden fixed h-full bg-[#151c2c]  p-5 shadow-lg origin-left top-0 rounded-md ${
          !sidebarToggle ? "scale-x-0" : "scale-x-100 w-full"
        } duration-300 rounded-md`}
      >
        <div className="flex gap-4 items-center my-4">
          <Image
            onClick={handleNavigationAndToggle}
            src={user?.image || userImg}
            alt="userImage"
            width={200}
            height={100}
            className="rounded-full w-14 h-14 border-white border"
          />
          <div className="flex flex-col">
            <span onClick={handleNavigationAndToggle}>{user?.name}</span>
            <span
              onClick={handleNavigationAndToggle}
              className="text-sm text-gray-300"
            >
              {user?.role}
            </span>
          </div>
        </div>

        <ul className="space-y-3 text-[#b7bac1]" onClick={handleToggleSidebar}>
          <ul className={styles.list}>
            {role === "user" &&
              userMenuItems.map((cat) => (
                <li key={cat.title} className="mb-4">
                  <span className={styles.cat}>{cat.title}</span>
                  {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
                </li>
              ))}
            {role === "agent" &&
              agentMenuItems.map((cat) => (
                <li key={cat.title} className="mb-4">
                  <span className={styles.cat}>{cat.title}</span>
                  {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
                </li>
              ))}
            {role === "admin" &&
              adminMenuItems.map((cat) => (
                <li key={cat.title} className="mb-4">
                  <span className={styles.cat}>{cat.title}</span>
                  {cat.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
                </li>
              ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
