"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";



import React from 'react'

export default function ImageCarousel({ propertyImages, propertyId }: any) {

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
                    propertyImages.map((img: any, i: number) => <Image key={i}
                        src={img}
                        alt="Property Image"
                        width={300}
                        height={300}
                        className={"cursor-pointer h-full hover:scale-105 duration-200 w-full carouselImage object-cover"}/>)
                }
            </Carousel>
        </div>
    );
}
