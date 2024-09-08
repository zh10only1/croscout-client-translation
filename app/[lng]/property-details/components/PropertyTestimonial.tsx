"use client";

import React, { useEffect, useState } from "react";
// Import Swiper styles
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
// import Slider from "react-slick";
import PropertyTestimonialCard from "./PropertyTestimonailCard";
import { getPropertyTestimonials, translatePropertyTestimonials } from "@/lib/database/getProperties";
import { Carousel } from "flowbite-react";
import { useTranslation } from "@/app/i18n/client";


export default function PropertyTestimonial({ id, lng }: { id: string; lng: string }) {
    const [testimonials, setTestimonials] = useState([]);
    const { t } = useTranslation(lng, "propertyDetail");

    // const [activeTab, setActiveTab] = useState(0)

    // const CustomPrevArrow = (props: any) => (
    //     <div
    //         className="hidden custom-next-arrow bg-gray-300 cursor-pointer -left-[10px] lg:-left-[40px] h-[24px] w-[24px] rounded-full lg:flex justify-center items-center"
    //         onClick={props.onClick}
    //         style={{ position: "absolute", top: "31%", zIndex: 1 }}
    //     >
    //         {/* Your custom arrow content for previous */}
    //         <BiLeftArrow />
    //     </div>
    // );

    // const CustomNextArrow = (props: any) => (
    //     <div
    //         className="hidden custom-next-arrow bg-gray-300 cursor-pointer -right-[10px] lg:-right-[40px] h-[24px] w-[24px] rounded-full lg:flex justify-center items-center"
    //         onClick={props.onClick}
    //         style={{ position: "absolute", top: "31%", zIndex: 1 }}
    //     >
    //         {/* Your custom arrow content for next */}
    //         <BiRightArrow />
    //     </div>
    // );

    // let settings = {
    //     customPaging: function (i: any) {
    //         return (
    //             <a onClick={() => setActiveTab(i)}>
    //                 <div
    //                     className={`h-[15px] w-[15px] rounded-full ${activeTab === i ? "bg-accent" : "bg-[#4F6871]"
    //                         } mt-[3rem]`}
    //                 ></div>
    //             </a>
    //         );
    //     },
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     prevArrow: <CustomPrevArrow />,
    //     nextArrow: <CustomNextArrow />,
    //     beforeChange: (current: number, next: number) => {
    //         console.log({ current, next })
    //         setActiveTab(next);
    //     },
    // };

    useEffect(() => {
        const fetchData = async () => {
            const dbResponse = await getPropertyTestimonials(id);
            if (dbResponse.success) {
                const translationResponse = await translatePropertyTestimonials(dbResponse.feedbacks, lng);
                if(translationResponse.success) {
                    setTestimonials(translationResponse.translatedFeedbacks);
                }
                else {
                    setTestimonials(dbResponse.feedbacks);
                }
            }
        };

        fetchData();
    }, [])

    // console.log(testimonials);
    return (
        <div className="bg-secondary pb-10 pt-[1.5rem]">
            {
                testimonials.length > 0 ?
                    <div className="wrapper">
                        <h1 className="text-[2.625rem] font-bold text-center text-white">
                            {t("OUR_REVIEWS")}
                        </h1>
                        <div className="mt-[4.25rem] grid grid-cols-1 gap-[1.875rem] w-full">
                            <Carousel slide={false}>
                                {
                                    testimonials?.map(testimonial => <PropertyTestimonialCard testimonial={testimonial} />)
                                }
                            </Carousel>
                        </div>
                    </div>
                    :
                    <div className="text-[2.625rem] font-bold text-center text-white min-h-[40vh] flex items-center justify-center">{t("NO_PROPERTY_REVIEWS")}</div>
            }

        </div>
    );
}
