"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import propertyStyles from "./property.module.css"


import React from 'react'
import Link from "next/link";

export default function ImageCarousel({ propertyImages, propertyId, lng }: any) {
    const router = useRouter();

    const customLeftControl = (
        <div className="custom-left-control">
            {/* Your custom left control content goes here */}
            <button onClick={() => console.log("Custom Left Control Clicked")}>
                Left
            </button>
        </div>
    );

    const customRightControl = (
        <div className="custom-right-control">
            {/* Your custom right control content goes here */}
            <button onClick={() => console.log("Custom Right Control Clicked")}>
                Right
            </button>
        </div>
    );

    return (
        <div className="h-full">
            <Carousel slide={false}>
                {
                    propertyImages.map((img: any, i: number) => <Link className="h-full w-full" href={`/${lng}/property-details/${propertyId}`}><Image key={i}
                        // onClick={() => router.push(`/property-details/${propertyId}`)}
                        src={img}
                        alt="Property Image"
                        width={300}
                        height={300}
                        // layout="fill"
                        className={"cursor-pointer h-full hover:scale-105 duration-200 w-full carouselImage object-cover"}
                    /> </Link>)
                }
            </Carousel>
        </div>
    );
}
