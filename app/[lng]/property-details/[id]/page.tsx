"use client";

import { useEffect, useState } from "react";
import PropertyAbout from "../components/PropertyAbout";
import PropertyHero from "../components/PropertyHero";
import PropertyReviews from "../components/PropertyReviews";
import PropertyTestimonial from "../components/PropertyTestimonial";
import { useParams } from "next/navigation";
import { getPropertyById } from "@/lib/database/getProperties";
import Loading from "@/components/ui/Loading/Loading";
import PropertyDescription from "../components/PropertyDescription";
import { translateProperties } from "@/lib/database/getProperties";

// Interface of Properties Data
export interface IPropertyData {
    property: {
        name: string;
        description: string;
        amenities: string[];
        pricePerNight: number;
        bookedDates: object[];
        location: string;
        state: string;
        propertyType: string;
        propertyImages: string[];
        owner: string | { _id: string };
        ratings: number;
        guests: number;
        _id: string;
    };
    owner: {
        _id: string;
    };
}

export default function PropertyDetails({
    params: { lng },
}: {
    params: {
        lng: string;
    };
}) {
    const [singlePropertyDetails, setSinglePropertyDetails] = useState<IPropertyData>();
    const [loading, setLoading] = useState(true);

    const images = singlePropertyDetails?.property?.propertyImages;
    const lastIndex = images ? images.length - 1 : -1;

    useEffect(() => {
        const navbarId = document.getElementById("topbar");
        if (navbarId) {
            navbarId.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            // if (typeof id === 'string') {
            //     const propertiesData = await getPropertyById(id);
            //     setLoading(false);
            //     setSinglePropertyDetails(propertiesData);
            //     // Set the state with the fetched data
            //     // ...
            // }

            if (typeof id === "string") {
                const propertiesData = await getPropertyById(id);
                const { translatedProperties } = await translateProperties([propertiesData.property], lng, true);
                propertiesData.property = translatedProperties[0];
                // Transform the owner property if necessary
                if (typeof propertiesData.property.owner === "string") {
                    propertiesData.property.owner = {
                        _id: propertiesData.property.owner,
                    } as IPropertyData["property"]["owner"];
                }
                setLoading(false);
                setSinglePropertyDetails({
                    ...propertiesData,
                    property: {
                        ...propertiesData.property,
                        owner: propertiesData.property
                            .owner as IPropertyData["property"]["owner"],
                    },
                });
                // Update the metadata with the property details
                document.title = `${propertiesData.property.name} | Croscout`;
                const descriptionMeta = document.querySelector(
                    'meta[name="description"]'
                );
                if (descriptionMeta) {
                    descriptionMeta.setAttribute(
                        "content",
                        propertiesData.property.description
                    );
                }
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }
    // console.log(singlePropertyDetails);
    return (
        <div className="">
            <PropertyHero singlePropertyDetails={singlePropertyDetails?.property} />
            <PropertyAbout aboutDetails={singlePropertyDetails?.property} />
            <PropertyDescription
                description={singlePropertyDetails?.property?.description || ""}
                image={
                    (singlePropertyDetails?.property?.propertyImages || [])[lastIndex] ||
                    ""
                }
            />
            <PropertyTestimonial id={singlePropertyDetails?.property._id || ""} />
            <PropertyReviews />
        </div>
    );
}
