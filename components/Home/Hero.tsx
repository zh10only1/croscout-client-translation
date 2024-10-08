"use client"

import HeroSearchForm from "./HeroSearchForm";
import { useTranslation } from "@/app/i18n/client";

const Hero =  ({lng} : {lng: string;}) => {
    const { t } = useTranslation(lng, 'home');

    return (
        <section
            className=" bg-white bg-cover bg-no-repeat pt-10 lg:pt-[8.125rem] lg:h-[35.56rem] pb-20 lg:pb-0 px-2 lg:px-0"
            style={{
                backgroundImage: `url(/images/hero-bg-1.webp)`
            }}
        >
            <h1
                className="text-3xl lg:text-4xl select-none lg:text-[3.5rem] font-extrabold text-white text-center mt-0 lg:mt-5 mb-5"
            >
                {t("HOME_HERO_HEADING")}
            </h1>
            <p className=" text-white-50 select-none text-xl text-center"
            >
                {t("HOME_HERO_SUB_HEADING")}
            </p>

            {/* Wrapper */}
            <div className="wrapper">
                <div
                    className="bg-secondary py-4 px-4 md:py-[5.625rem] md:px-40 rounded-[10px] mt-[5.25rem] relative m-shadow "
                >
                    <HeroSearchForm lng={lng} />
                </div>
            </div>
        </section>
    );
};

export default Hero;