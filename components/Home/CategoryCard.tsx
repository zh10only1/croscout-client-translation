"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getCurrentLng } from "@/utils/translation";
import { useTranslation } from "@/app/i18n";

type IProps = {
  category: { name: string; icon: string; active: string };
  activeCat: string;
};

export default async function CategoryCard({ category, activeCat }: IProps) {
  const [isHovered, setIsHovered] = useState(false);
  // console.log(activeCat);
  const handleHover = () => {
    setIsHovered(true);
  };
  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const lng: string = getCurrentLng();
  const { t } = await useTranslation(lng, "home");

  return (
    <div className="">
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
        className={`text-white relative px-2 lg:px-4 py-2 border rounded-[3px] bg-secondary hover:border-accent flex flex-col items-center hover:text-accent ${
          activeCat === category.name && "border-accent"
        } hover:shadow-xl cursor-pointer transition-all duration-300`}
      >
        <Image
          src={
            isHovered || activeCat === category.name
              ? category.active
              : category.icon
          }
          alt="l"
          height={24}
          width={24}
        />
        {activeCat === category.name ? (
          <div
            className="
            text-sm
            mt-0.5
            text-accent
            "
          >
            {t(`${category.name}`)}
          </div>
        ) : (
          <div
            className="
            text-sm
            mt-0.5
            "
          >
            {t(`${category.name}`)}
          </div>
        )}
      </div>
    </div>
  );
}
